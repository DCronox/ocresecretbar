# Fotografías: cómo reemplazar los marcos provisionales

> Estado al 2026-11-09: 45 fotos reales publicadas (22 de la carta de Cluvi + 23 entregadas por Ocre; 4 de Cluvi se reemplazaron por el plato servido). Las fotos de ingredientes llevan `ingredientes: true` en `content/carta.js`; al cambiarlas por el plato servido, quita ese campo. Las fotos que ya no se usan se guardan en `originales/_sin-uso/` (el optimizador ignora las carpetas que empiezan por `_`). El optimizador solo procesa fotos nuevas o modificadas; `npm run imagenes -- --todo` las regenera todas.

Hoy el sitio no tiene ninguna fotografía de Ocre. Cada espacio muestra un marco «Fotografía oficial pendiente» con la descripción de la toma prevista. **No usar fotos de bancos de imágenes, de Instagram de terceros ni generadas por IA haciéndolas pasar por fotos del lugar.**

## Estructura de carpetas

```
originales/            ← fotos sin procesar (no se publica; está en .gitignore)
  cocina/  platos/  cocteleria/  bar/  arte/  djs/  eventos/  ambiente/
assets/img/            ← versiones optimizadas que sí se publican
  cocina/  platos/  cocteleria/  bar/  arte/  djs/  eventos/  ambiente/  og/
```

## Paso a paso

1. Copia cada foto original (idealmente de 2400 px de ancho o más) en `originales/<categoría>/`. El nombre del archivo será su identificador, por ejemplo `originales/cocteleria/Moss.jpg`.
2. Ejecuta (requiere Node.js; la primera vez, `npm install`):
   ```bash
   npm run imagenes
   ```
   Se generan seis archivos por foto (AVIF, WebP y JPG en 800 y 1600 px), sin metadatos EXIF ni GPS. La consola imprime una línea como:
   `✔ foto: "assets/img/cocteleria/moss", ancho: 4, alto: 5`
3. Pega esos valores en el elemento correspondiente de `/content`:

| Qué | Archivo | Campo |
|---|---|---|
| Cocina, Arte, Sonoridad, El bar oculto | `content/galerias.js` | `foto`, `ancho`, `alto` de cada pieza; `portada` de la categoría |
| **Platos y cócteles** (galerías «Platos de autor» y «Tragos de autor» + carta) | `content/carta.js` | `foto`, `ancho`, `alto` en el producto. Una sola foto aparece en la galería y en la carta. |
| Portada (foto o video) | `content/sitio.js` | `portada.imagen`, `portada.leyenda`, `portada.alt` o `portada.video`. Si cambias la imagen, actualiza también el `<link rel="preload">` de `index.html`. |
| Imagen protagonista de cada categoría del ritual | `content/galerias.js` | `portada: { foto, ancho, alto, alt }`. Si es null se usa la primera pieza con foto. |
| Fotos del Universo y de Reservas | `index.html` | Atributo `data-foto` (y `data-ancho`, `data-alto`, `data-alt`) del elemento correspondiente. |
| DJs, eventos y noches anteriores | `content/sonidos.js` | `foto` |
| Ocasiones (Noches Ocre) | `content/experiencias.js` | `foto`, `leyenda` (qué se ve en la imagen) |

Ejemplo:

```js
{ titulo: "Moss", desc: "…", foto: "assets/img/cocteleria/moss", ancho: 4, alto: 5, alt: "Cóctel Moss servido en copa sobre la barra" }
```

4. Escribe un `alt` descriptivo (qué se ve, no «foto de…»). Si se omite, se usa el título.

## Qué hace el sitio automáticamente

- Sirve AVIF o WebP según el navegador, con JPG como respaldo.
- Elige 800 o 1600 px según el tamaño de pantalla (`srcset` / `sizes`).
- Carga diferida (`loading="lazy"`) fuera de la portada; la portada se carga con prioridad.
- Reserva el espacio con la proporción `ancho / alto` para evitar saltos de diseño.
- Muestra un estado de carga y, si un archivo falla, el aviso «No se pudo cargar la imagen».

## Recomendaciones de dirección de arte

- Luz cálida y lateral, sombras profundas, fondos oscuros; evitar flash directo.
- Paleta coherente con la marca: ocres, tierras, terracotas, negros cálidos.
- Retratos de cócteles y platos individuales, en formato vertical 4:5 o cuadrado.
- Personas reconocibles (equipo, público, artistas): solo con **autorización escrita** de imagen.
- Video de portada: 10–20 s en bucle, sin audio, MP4 (H.264) + WebM, menos de 4 MB, con una imagen `poster`.

## Imagen para redes sociales

`assets/img/og/ocre-og.png` (1200×630) es una composición tipográfica provisional generada con `npm run og`. Cuando haya fotos oficiales, conviene reemplazarla por una foto del lugar con el logotipo.
