/* =====================================================================
   OCRE · Optimizador de fotografías
   ---------------------------------------------------------------------
   Uso:
     1. Copia las fotos originales en  originales/<categoria>/nombre.jpg
        categorías: cocina, platos, cocteleria, bar, arte, djs, eventos, ambiente
     2. npm run imagenes
   Genera en assets/img/<categoria>/ los archivos
     nombre-800.avif  nombre-1600.avif
     nombre-800.webp  nombre-1600.webp
     nombre-800.jpg   nombre-1600.jpg
   y elimina los metadatos (EXIF, GPS) por privacidad.
   Al final imprime la ruta base y la proporción para pegar en /content.
   ===================================================================== */
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const ORIGEN = process.argv[2] || "originales";
const DESTINO = "assets/img";
const ANCHOS = [800, 1600];
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".heic", ".avif"]);

// Proporción aproximada con números pequeños (p. ej. 2567×3850 → 2:3), tolerancia 1 %.
function proporcion(w, h) {
  for (let d = 1; d <= 20; d++) { const n = Math.round((w / h) * d); if (n && Math.abs(n / d - w / h) / (w / h) < 0.01) return [n, d]; }
  return [w, h];
}
const limpio = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function existe(p) { try { await stat(p); return true; } catch { return false; } }

if (!(await existe(ORIGEN))) {
  console.error(`No existe la carpeta "${ORIGEN}". Crea ${ORIGEN}/<categoria>/ y pon allí las fotos originales.`);
  process.exit(1);
}

let total = 0, omitidas = 0;
for (const categoria of await readdir(ORIGEN)) {
  if (categoria.startsWith("_")) continue;   // carpetas como _sin-uso no se publican
  const dirCat = join(ORIGEN, categoria);
  if (!(await stat(dirCat)).isDirectory()) continue;
  await mkdir(join(DESTINO, categoria), { recursive: true });
  for (const archivo of await readdir(dirCat)) {
    if (!EXT.has(extname(archivo).toLowerCase())) continue;
    const nombre = limpio(basename(archivo, extname(archivo)));
    // Omitir si ya existen todas las versiones y son más recientes que el original
    const origen = await stat(join(dirCat, archivo));
    const salidas = ANCHOS.flatMap((w) => ["avif", "webp", "jpg"].map((x) => join(DESTINO, categoria, `${nombre}-${w}.${x}`)));
    const vigentes = await Promise.all(salidas.map(async (s) => { try { return (await stat(s)).mtimeMs >= origen.mtimeMs; } catch { return false; } }));
    if (!process.argv.includes("--todo") && vigentes.every(Boolean)) { omitidas++; continue; }
    const entrada = sharp(join(dirCat, archivo)).rotate(); // respeta la orientación EXIF y luego la descarta
    const meta = await entrada.metadata();
    const giro = (meta.orientation || 1) >= 5;
    const w = giro ? meta.height : meta.width, h = giro ? meta.width : meta.height;
    const [pa, pb] = proporcion(w, h);
    for (const ancho of ANCHOS) {
      const base = join(DESTINO, categoria, `${nombre}-${ancho}`);
      const r = entrada.clone().resize({ width: Math.min(ancho, w), withoutEnlargement: true });
      await r.clone().avif({ quality: 52, effort: 5 }).toFile(base + ".avif");
      await r.clone().webp({ quality: 74 }).toFile(base + ".webp");
      await r.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(base + ".jpg");
    }
    total++;
    const aviso = w < 1600 ? "  (aviso: el original mide menos de 1600 px de ancho)" : "";
    console.log(`✔ foto: "${DESTINO}/${categoria}/${nombre}", ancho: ${pa}, alto: ${pb}${aviso}`);
  }
}
console.log(total ? `\n${total} foto(s) procesada(s). Copia la línea de cada foto en el archivo correspondiente de /content.` : "No hay fotos nuevas que procesar.");
if (omitidas) console.log(`${omitidas} foto(s) ya estaban optimizadas (usa --todo para regenerarlas).`);
