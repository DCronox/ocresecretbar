# OCRE · Cocina y Bar Oculto — sitio web público

Sitio estático (HTML, CSS y JavaScript sin dependencias en tiempo de ejecución) para OCRE, en Laureles, Medellín. Esta fase cubre solo la web pública: no hay panel administrativo, backend ni base de datos.

## Por qué un sitio estático

La página pública no necesita servidor propio: las reservas viven en Cluvi y el contacto en WhatsApp. Un sitio estático es rápido, barato de alojar, seguro (no hay nada que atacar en el servidor) y se publica en cualquier hosting (Netlify, Cloudflare Pages, Vercel, GitHub Pages o un hosting tradicional). El contenido está separado del diseño, así que un panel administrativo futuro puede generar los mismos archivos de `/content` sin rehacer la página.

## Estructura

```
index.html                 Página principal
legal/                     Aviso de privacidad, tratamiento de datos, cookies, condiciones, terceros
content/                   ← lo que se edita con frecuencia
  sitio.js                 Datos del local, enlaces, horario, calificación, datos legales
  carta.js                 Carta y precios
  galerias.js              Seis categorías del «ritual de los sentidos»
  sonidos.js               DJs, artistas, eventos (vacío hasta tener datos confirmados)
  experiencias.js          Ocasiones de «Noches Ocre»
  espacios.js              Dance Floor, Sombras y Sentidos
  resenas.js               Reseñas reales destacadas (vacío)
assets/css/base.css        Tokens de diseño, navegación, pie, consentimiento, páginas legales
assets/css/home.css        Secciones de la portada
assets/js/core.js          Utilidades, enlaces, navegación, pie, cookies, Schema.org
assets/js/home.js          Render de secciones, galerías, carta, formulario, mapa
assets/img/<categoría>/    Fotografías optimizadas
tools/                     Optimizador de imágenes e imagen Open Graph (solo desarrollo)
docs/                      Auditoría, rediseño (sistema visual), pendientes y guía de fotografías
_legado/ocre-v1.html       Sitio anterior, sin cambios, como referencia
_headers                   Cabeceras de seguridad para el hosting
```

## Ver el sitio en local

```bash
python -m http.server 5510 --bind 127.0.0.1
```

Luego abre <http://127.0.0.1:5510>. Conviene usar un servidor local en vez de abrir el archivo con doble clic, para que las rutas y la política de seguridad se comporten igual que en producción.

## Tareas habituales

- **Cambiar horario, enlaces o datos legales** → `content/sitio.js`.
- **Actualizar la carta** → `content/carta.js` (fecha en `consultado`).
- **Publicar un evento o un DJ** → `content/sonidos.js` (plantillas en el propio archivo).
- **Agregar fotos** → `docs/FOTOGRAFIAS.md`.
- **Ver qué falta para publicar** → `docs/PENDIENTES.md`.

## Principios de contenido

Nada se inventa: si un dato no está confirmado, el campo queda en `null` y el sitio muestra un marcador visible de «Pendiente» o un marco de foto provisional. Las fuentes de cada dato están anotadas en los archivos de `/content` y en `docs/AUDITORIA.md`.

## Calidad

- Accesibilidad (objetivo WCAG 2.2 AA): navegación por teclado, foco visible, enlace para saltar al contenido, diálogos con gestión de foco, contraste verificado (mínimo 4,8:1 en textos), `prefers-reduced-motion`.
- Rendimiento: sin librerías, JS diferido, imágenes AVIF/WebP adaptables con carga diferida, sin bloqueos al cargar.
- Seguridad: Content-Security-Policy sin scripts ni estilos en línea, enlaces externos con `rel="noopener noreferrer"`, sin secretos ni datos personales en el código, validación y saneamiento del formulario.
- Privacidad: ningún servicio opcional (mapa de Google, analítica) se carga sin consentimiento.
