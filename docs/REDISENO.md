# Rediseño visual — dark luxury + tierra (9 de noviembre de 2026)

## Evolución v3 — OCRE Luxury Experience

**Portada (secuencia orquestada, una sola vez al cargar):** se enciende la luz ambiental → OCRE pasa de desenfocado y espaciado a nítido → un destello de luz recorre las letras (se repite al pasar el cursor) → la foto se descubre → textos escalonados. Los productos ahora entran con un **barrido de luz** de derecha a izquierda mientras la imagen anterior se apaga; paralaje moderado de la foto al desplazarse; luz cálida que sigue al cursor (solo con ratón).

**Los espacios (nueva sección, `content/espacios.js`):** tres composiciones distintas que comparten el mismo lenguaje.
- *Dance Floor*: diagonal con dos fotos superpuestas, haz de luz y un pulso rítmico junto al nombre (se detiene con movimiento reducido).
- *Sombras*: fondo carbón profundo; la foto en penumbra se ilumina donde está el cursor (en móvil, luz fija).
- *Sentidos*: composición amplia, dos fotos en paralelo y texto a dos columnas.
- Capacidad de Sentidos guardada como orientativa y **oculta** hasta confirmarla.

**Noches Ocre:** el bloque «Un rincón del bar con luz baja» ahora es **Sombras**, con texto propio y enlace «Conocer el espacio».

**Movimiento y detalle:** titulares que emergen como una línea al aparecer; fotos que se revelan; piezas de galería que entran al desplazarse; visor con dirección (anterior/siguiente); menú móvil con enlaces escalonados; hilo de progreso de lectura bajo la navegación; botón principal con barrido de luz; trazos de pigmento como separadores (uno funde el ocre de Noches con el papel de la carta). Un único bucle de desplazamiento con `requestAnimationFrame` y solo transformaciones. Todo se desactiva con `prefers-reduced-motion`.

## Actualización v2 — más ocre y viveza premium

- Fondos umbra y tierra cálida en lugar de negro (`--carbon` #2B1C10, `--tierra-oscura` #3B2716), ocre más luminoso (#D29447), ámbar #E6BC7A y caliza #F3E7D1.
- Banda de palabras en ocre con texto oscuro; sección Noches en ocre profundo (#6B4320).
- Botón principal con degradado dorado y brillo; bordes dorados sutiles en portada, formulario y carteles; luces ámbar en portada, universo, ritual y reservas; fotos con un punto más de saturación.
- **Portada rotativa**: empieza con el Negroni clásico y recorre los 26 cócteles y platos con foto, alternándolos, con su nombre debajo (en platos: «Ingredientes de…»). Fundido cruzado cada 6 s con acercamiento lento, barra de progreso, contador y botón Pausar/Reproducir. Se detiene fuera de pantalla, con la pestaña oculta y no arranca sola con movimiento reducido. Configurable en `content/sitio.js` → `portada.rotacion`.

Todos los pares de texto siguen en AA (mínimo 4,57:1).

## Sistema visual (v1)

| Token (`assets/css/base.css`) | Valor | Uso |
|---|---|---|
| `--carbon` | #171614 | Fondo principal |
| `--tierra-oscura` | #29241E | Superficies (Noches, Reservas, marcos) |
| `--tierra-alta` | #332C25 | Diálogos y avisos |
| `--arcilla` | #87502D | Acento profundo, frases sobre papel |
| `--ocre` | #B87835 | Botón principal, marcas |
| `--ambar` | #D1A66B | Acento de texto sobre oscuro |
| `--caliza` | #E8DDC9 | Texto principal / papel de la carta |
| `--caliza-suave` | #B5AA98 | Texto secundario |

Contraste mínimo de texto: 4,86:1 (AA). Tipografía: Cormorant Garamond (títulos, frases) + Jost (texto, navegación). Escalas `--t-*`, espaciado `--e-*`, `--seccion`, `--margen`. Botones: `.btn--solido` (reservar), `.btn--linea`, `.btn--texto`. Componentes reutilizables: `.foto` / `.marco` (provisional), `.leyenda`, `.revela` / `.revela-texto`, y fotos declaradas en HTML con `data-foto`.

## Qué cambió por sección

- **Portada**: fotografía protagonista (Negroni clásico sobre roca mineral) con la palabra OCRE entrando en la imagen; en móvil la foto ocupa toda la pantalla. Un solo momento animado al cargar. Precarga de la imagen para el LCP.
- **Universo Ocre**: composición editorial con dos fotos (ingredientes del Molcajete Ocre como «materia»; Moss como «luz de barra»), con leyenda.
- **El ritual de los sentidos**: índice tipográfico con visor de imagen protagonista que cambia al pasar el cursor o el foco (escritorio); franjas con imagen en móvil y tablet. Orden del brief: Cocina, Tragos, Bar oculto, Sonoridad, Platos, Arte.
- **Ocre Sounds**: componente de cartel para eventos (fecha grande, artista, horario, foto opcional) y estado vacío honesto con el mismo lenguaje.
- **Noches Ocre**: seis ocasiones con imagen y leyenda que dice qué producto aparece; carrusel deslizable en móvil.
- **Carta**: papel claro para la lectura; pestañas sobrias; miniaturas; en los 9 cócteles de autor, frase y perfil de sabor del documento de storytelling de Ocre.
- **Galerías**: el visor muestra la historia completa, la composición y el perfil de cada cóctel de autor.
- **Reservas / Visítanos / Reseñas / Pie**: recoloreados con el sistema; misma funcionalidad.

## Errores corregidos durante el rediseño

- Desbordamiento horizontal en móvil causado por el carrusel de Noches (la página se veía alejada).
- Número del día del cartel anulado por una regla más específica.
- «Fecha Por Anunciar» con mayúsculas en cada palabra.
- Botón de reservar partido en dos líneas en la portada móvil.
- Banda de palabras con animación constante: ahora estática.

## Conservado

Arquitectura modular (`/content` + `core.js` + `home.js`), Cluvi (7 enlaces, todos a `ocre.cluvi.co/bookings/32410`), solicitud por WhatsApp con autorización de datos, consentimiento de cookies, mapa solo con permiso, páginas legales, CSP, Schema.org, Open Graph, galerías y diálogos accesibles por teclado, `prefers-reduced-motion`.
