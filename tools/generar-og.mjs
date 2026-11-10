/* Genera la imagen para redes sociales (Open Graph) 1200×630 a partir de una
   composición tipográfica. Cuando existan fotografías oficiales, conviene
   reemplazarla por una foto del lugar con el logotipo.   npm run og */
import sharp from "sharp";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="luz" cx="72%" cy="10%" r="70%"><stop offset="0" stop-color="#B87835" stop-opacity=".24"/><stop offset="1" stop-color="#171614" stop-opacity="0"/></radialGradient>
    <linearGradient id="pig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D1A66B"/><stop offset=".5" stop-color="#B87835"/><stop offset="1" stop-color="#87502D"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#171614"/>
  <rect width="1200" height="630" fill="url(#luz)"/>
  <text x="80" y="150" font-family="Jost, Futura, Arial, sans-serif" font-size="30" fill="#B5AA98">Cocina y bar oculto en Laureles, Medellín</text>
  <text x="62" y="440" font-family="Cormorant Garamond, Georgia, serif" font-size="300" letter-spacing="6" fill="url(#pig)">OCRE</text>
  <text x="80" y="530" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-size="40" fill="#E8DDC9">Un lugar que se descubre</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("assets/img/og/ocre-og.png");
console.log("✔ assets/img/og/ocre-og.png");
