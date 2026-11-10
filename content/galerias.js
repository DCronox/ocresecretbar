/* =====================================================================
   OCRE · El ritual de los sentidos — galerías
   ---------------------------------------------------------------------
   Seis categorías, en este orden. `portada` = imagen protagonista de la
   categoría ({ foto, ancho, alto, alt }); si es null se usa la primera pieza
   con foto y, si no hay ninguna, un marco provisional.
   Cada pieza tiene:
     titulo · desc (opcional) · foto (ruta base sin extensión, o null)
     ancho / alto (proporción de la foto; evita saltos de diseño)
     frase / historia (opcional): texto que se muestra en la galería y el visor
     encargo: descripción de la toma que falta (solo se muestra mientras
              la foto es null; sirve de guion para el fotógrafo).

   Las galerías "tragos" y "platos" NO tienen piezas escritas aquí: usan
   `desdeCarta` y muestran todos los productos de content/carta.js. Para
   ponerles foto, añade `foto` (y opcionalmente `ancho`/`alto`) al producto
   en la carta; así la foto aparece en la galería y en la carta a la vez.

   Mientras `foto` sea null se muestra un marco "Fotografía oficial
   pendiente". NUNCA usar fotos de terceros o de bancos haciéndolas pasar
   por fotos de Ocre. Ver docs/FOTOGRAFIAS.md.
   ===================================================================== */
window.OCRE = window.OCRE || {};

OCRE.galerias = [
  {
    id: "cocina", titulo: "Cocina", carpeta: "assets/img/cocina",
    linea: "Fuego, técnica y paciencia.",
    intro: "Lo que pasa antes de que el plato llegue a la mesa: el producto, el fuego, las manos.",
    portada: { foto: "assets/img/cocina/cocina-fuego", ancho: 3, alto: 4, alt: "Cocinero de Ocre en los fogones, en blanco y negro" },
    items: [
      { titulo: "En servicio", foto: "assets/img/cocina/cocina-fuego", ancho: 3, alto: 4, alt: "Cocinero de Ocre trabajando en los fogones bajo la campana, en blanco y negro" },
      { titulo: "Emplatado", foto: "assets/img/cocina/cocina-emplatado", ancho: 3, alto: 4, alt: "Manos emplatando con pinzas sobre un plato de cerámica, en blanco y negro" },
      { titulo: "Preparación", foto: "assets/img/cocina/cocina-preparacion", ancho: 3, alto: 4, alt: "Cocinero preparando ingredientes en la cocina, en movimiento" },
      { titulo: "Detalle", foto: "assets/img/cocina/cocina-detalle", ancho: 3, alto: 4, alt: "Detalle de una mano trabajando sobre la mesa de acero de la cocina" },
      { titulo: "La cocina", foto: "assets/img/cocina/cocina-sala", ancho: 3, alto: 4, alt: "Vista de la cocina de Ocre con sus lámparas, en blanco y negro" },
      { titulo: "Ritmo", foto: "assets/img/cocina/cocina-servicio", ancho: 3, alto: 4, alt: "Cocinero en pleno servicio, fotografía en movimiento" }
    ]
  },
  {
    id: "tragos", titulo: "Tragos de autor", carpeta: "assets/img/cocteleria",
    linea: "Cordiales, macerados y destilados de la casa.",
    intro: "Toda la coctelería de la carta, de autor y clásica, con su composición tal como la publica Ocre.",
    portada: { foto: "assets/img/cocteleria/dirty-wine", ancho: 2, alto: 3, alt: "Cóctel Dirty Wine sobre la barra de Ocre, con luz cálida" },
    // Se completa automáticamente con la carta (content/carta.js): cada cóctel es una pieza.
    desdeCarta: [{ seccion: "cocteles" }, { seccion: "sin-alcohol", solo: ["Mocktail de fresa", "Mocktail de lychees"] }],
    encargo: "Retrato individual del cóctel, fondo oscuro, luz lateral.",
    items: []
  },
  {
    id: "bar-oculto", titulo: "El bar oculto", carpeta: "assets/img/bar",
    linea: "Hay que saber dónde tocar.",
    intro: "El espacio, la penumbra y la barra. Lo que se descubre al cruzar.",
    portada: { foto: "assets/img/bar/bar-umbral", ancho: 4, alto: 5, alt: "Vista desde la penumbra hacia la barra iluminada de Ocre" },
    items: [
      { titulo: "Entrada", foto: "assets/img/bar/bar-entrada", ancho: 4, alto: 5, alt: "Escalera de acceso con apliques de luz cálida sobre el muro" },
      { titulo: "Dance Floor", foto: "assets/img/bar/bar-umbral", ancho: 4, alto: 5, alt: "Vista desde la penumbra hacia la barra iluminada, con una figura en movimiento" },
      { titulo: "La barra", foto: "assets/img/bar/bar-barra", ancho: 3, alto: 4, alt: "Silueta del bartender frente a los estantes iluminados en rojo" },
      { titulo: "Sentidos", frase: "Un espacio para compartir sin perder la intimidad.", historia: "Entre la calidez de la tierra y la complicidad de los encuentros, Sentidos nace como un refugio para compartir. Un espacio donde los grupos encuentran su propio universo, donde las conversaciones fluyen sin prisa y cada encuentro se convierte en un recuerdo. Porque hay momentos que merecen vivirse lejos del ruido exterior.", foto: "assets/img/bar/bar-salon", ancho: 4, alto: 5, alt: "Sentidos: espacio con mesa larga y sillas para grupos, bajo una luz roja cálida" },
      { titulo: "Sentidos", frase: "Un espacio para compartir sin perder la intimidad.", historia: "Entre la calidez de la tierra y la complicidad de los encuentros, Sentidos nace como un refugio para compartir. Un espacio donde los grupos encuentran su propio universo, donde las conversaciones fluyen sin prisa y cada encuentro se convierte en un recuerdo. Porque hay momentos que merecen vivirse lejos del ruido exterior.", foto: "assets/img/bar/bar-penumbra", ancho: 4, alto: 5, alt: "Sentidos en penumbra, con ventanales de luz cálida y una figura de pie" },
      { titulo: "Sombras", foto: "assets/img/bar/bar-rincon", ancho: 4, alto: 5, alt: "Rincón del bar con sillones y una lámpara pequeña encendida" },
      { titulo: "Sombras", foto: "assets/img/bar/bar-luz-baja", ancho: 4, alto: 5, alt: "Mesa con lámpara encendida y sillas tapizadas en rojo" },
      { titulo: "Oculto", foto: "assets/img/bar/bar-silueta", ancho: 4, alto: 5, alt: "Silueta de una persona en un pasillo iluminado por una línea de luz roja" }
    ]
  },
  {
    id: "sonoridad", titulo: "Sonoridad", carpeta: "assets/img/djs",
    linea: "La música como parte del menú.",
    intro: "Cabina, vinilos y noches. El sonido es uno de los ingredientes de Ocre.",
    portada: { foto: "assets/img/djs/sonoridad-vinilos", ancho: 4, alto: 5, alt: "Muro con portadas de vinilos iluminadas" },
    items: [
      { titulo: "Vinilos", foto: "assets/img/djs/sonoridad-vinilos", ancho: 4, alto: 5, alt: "Muro con portadas de vinilos iluminadas en luz cálida" },
      { titulo: "Cabina", encargo: "Equipo de sonido o cabina de DJ en penumbra.", foto: null, ancho: 3, alto: 2 },
      { titulo: "Noche", encargo: "Ambiente musical con público (de espaldas o con autorización).", foto: null, ancho: 16, alto: 9 },
      { titulo: "Artista", encargo: "Retrato de un artista que se haya presentado, con su autorización.", foto: null, ancho: 4, alto: 5 }
    ]
  },
  {
    id: "platos", titulo: "Platos de autor", carpeta: "assets/img/platos",
    linea: "Cada plato, una pieza.",
    intro: "Todos los platos de la carta actual: entradas, fuertes y postres, con la descripción que publica la cocina.",
    portada: { foto: "assets/img/platos/panceta-confitada-emplatado", ancho: 3, alto: 4, alt: "Panceta confitada servida sobre crema de ahuyama" },
    // Se completa automáticamente con la carta (content/carta.js).
    desdeCarta: [{ seccion: "entradas" }, { seccion: "fuertes" }, { seccion: "postres" }],
    encargo: "Retrato individual del plato, cenital o a 45°.",
    items: []
  },
  {
    id: "arte", titulo: "Arte", carpeta: "assets/img/arte",
    linea: "Texturas, materia y color.",
    intro: "Los materiales, los muros y los detalles que hacen del espacio una pieza más.",
    portada: { foto: "assets/img/arte/arte-luz", ancho: 4, alto: 5, alt: "Pasamanos iluminado en diagonal sobre un muro oscuro" },
    items: [
      { titulo: "Luz y línea", foto: "assets/img/arte/arte-luz", ancho: 4, alto: 5, alt: "Pasamanos iluminado que recorre en diagonal un muro oscuro" },
      { titulo: "Vidrio", foto: "assets/img/arte/arte-lampara", ancho: 4, alto: 5, alt: "Lámpara de vidrio tallado encendida sobre una mesa, en penumbra" },
      { titulo: "Materia", foto: "assets/img/arte/arte-materia", ancho: 4, alto: 5, alt: "Sillas de madera y rejilla junto a una mesa, con luz cálida" },
      { titulo: "Muro", encargo: "Textura de pared u obra principal del salón, luz rasante.", foto: null, ancho: 4, alto: 5 }
    ]
  }
];
