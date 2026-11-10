# Auditoría del sitio anterior (9 de noviembre de 2026)

Archivo auditado: `Ocre · Cocina y Bar Oculto · Laureles, Medellín.html` (17,5 KB, un solo archivo con HTML, CSS y JS en línea). Se conserva sin cambios en `_legado/ocre-v1.html` como referencia.

## Qué tenía

| Sección | Funcionalidad | Decisión |
|---|---|---|
| Intro a pantalla completa «OCRE» | Bloqueaba la página ~2,9 s en cada visita | Reemplazada por una entrada de la palabra OCRE que no bloquea el contenido |
| Portada | Degradados y «orbes» animados, sin foto | Rediseñada; preparada para foto o video oficial |
| Marquesina | Palabras en bucle | Conservada (respeta `prefers-reduced-motion`) |
| Nosotros | Texto de marca y 3 pilares | Texto conservado y ampliado en «El universo Ocre» |
| «Dale una señal» (puerta) | `div` con `onclick`, no accesible por teclado | Conservada como `button` con `aria-expanded` |
| Carta | 6 platos «tomados de un directorio público, por confirmar» | Reemplazada por la carta publicada por Ocre en Cluvi (29 productos con precio + barra) |
| Galería | 6 recuadros con degradados que simulaban fotos | Reemplazada por «El ritual de los sentidos» con galerías y marcos provisionales identificados |
| Reseñas | «4.9 · más de 250 reseñas» escrito a mano; lista de reseñas vacía | Calificación verificada en Google (4,9 · 557) con fecha de consulta; estructura para reseñas reales |
| Reservas | Botón a Cluvi + formulario que abre WhatsApp | Ambos conservados; el formulario ahora pide autorización de datos |
| Pie | WhatsApp, Instagram, correo, Google Maps | Conservados y ampliados con páginas legales |

## Problemas encontrados

1. **Datos sin verificar presentados como reales**: la calificación «4.9 / más de 250 reseñas» no coincidía con Google (557 reseñas al 9-nov-2026) y la carta venía de un directorio de terceros.
2. **Fotografías simuladas** con degradados CSS.
3. **Sin menú en móvil**: los enlaces de navegación se ocultaban por debajo de 800 px y solo quedaba «Reservar».
4. **Accesibilidad**: `outline: 0` en campos (sin foco visible), etiquetas `label` sin asociar a su campo, puerta no operable por teclado, sin enlace para saltar al contenido, sin `main`.
5. **Error de fecha**: el mínimo del selector de fecha usaba UTC (`toISOString`), así que después de las 7 p. m. en Medellín no se podía elegir el día actual.
6. **Rendimiento**: intro de casi 3 s que retrasaba el contenido; animaciones infinitas (orbes, título flotante) y un efecto que seguía el cursor recalculando estilos en cada movimiento.
7. **Formulario sin autorización** de tratamiento de datos (Ley 1581 de 2012).
8. **Sin SEO**: sin `meta description`, Open Graph, datos estructurados, `robots.txt` ni `sitemap.xml`.
9. **Sin documentos legales** (privacidad, cookies, condiciones).
10. **Nombre de archivo no publicable** (espacios y caracteres especiales; no era `index.html`).
11. CSS con `!important` y estilos en línea que se contradecían (fondo de la carta).

## Verificación de enlaces (9-nov-2026)

| Enlace | Estado |
|---|---|
| `https://ocre.cluvi.co/bookings/32410` | Funciona. Muestra reservas para 2–15 personas, la dirección y la carta completa. |
| `https://maps.google.com/?cid=1167090936965291906` | Funciona. Perfil «Ocre Secret Bar», 4,9 (557), horario que coincide con el del sitio. |
| `https://www.instagram.com/ocre_mde/` | Funciona. Perfil «Ocre \| cocina y bar oculto». |
| `https://wa.me/573127252045` | Responde. No se pudo confirmar que sea el WhatsApp oficial (ver PENDIENTES). |
| `mailto:ocre2025@gmail.com` | No verificable automáticamente. |

## Información confirmada vs. provisional

- **Confirmada en dos fuentes**: dirección (Cluvi y Google), horario (sitio anterior y Google), Instagram.
- **Publicada por el propio establecimiento**: carta y precios (Cluvi).
- **Instantánea con fecha**: calificación de Google.
- **Provisional**: WhatsApp, correo, «Est. 2025», todos los datos legales, DJs y eventos (no hay), fotografías (no hay).
