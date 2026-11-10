/* =====================================================================
   OCRE · Los espacios — Dance Floor, Sombras y Sentidos
   ---------------------------------------------------------------------
   Textos conceptuales aprobados por el cliente (2026-11-09).
   Cada espacio tiene su propia composición en la portada.

   capacidad: dato ORIENTATIVO. No se muestra en la web mientras
   `confirmado` sea false. Validar con el establecimiento antes de publicar.

   fotos: { foto, ancho, alto, alt, leyenda }
   PENDIENTE DE CONFIRMAR: que las fotos asignadas a Dance Floor
   correspondan efectivamente a esa zona (ver docs/PENDIENTES.md).
   ===================================================================== */
window.OCRE = window.OCRE || {};

OCRE.espacios = [
  {
    id: "dance-floor",
    nombre: "Dance Floor",
    lema: "Donde la noche encuentra su ritmo.",
    texto: "Frente a la cabina del DJ y junto a la barra, Dance Floor es el punto donde la música, la coctelería y el movimiento se encuentran. Un espacio para dejarse llevar por el ritmo, compartir y vivir la noche desde otra perspectiva.",
    notas: ["Música", "Coctelería", "Baile", "También para comer"],
    fotos: [
      { foto: "assets/img/bar/bar-umbral", ancho: 4, alto: 5, alt: "Barra iluminada con equipo de sonido y una figura en movimiento", leyenda: "Dance Floor" },
      { foto: "assets/img/bar/bar-barra", ancho: 3, alto: 4, alt: "Silueta del bartender frente a los estantes iluminados", leyenda: "La barra" }
    ],
    accion: { tipo: "reservar", texto: "Reservar mesa" }
  },
  {
    id: "sombras",
    nombre: "Sombras",
    lema: "Donde la intimidad encuentra su lugar.",
    texto: "Entre luces tenues y rincones que invitan a detenerse, Sombras ofrece una atmósfera íntima para compartir sin prisa. Un espacio donde las conversaciones toman protagonismo y cada encuentro encuentra su propio ritmo.",
    notas: ["Luz tenue", "Conversación", "Ideal para dos o tres personas"],
    fotos: [
      { foto: "assets/img/bar/bar-luz-baja", ancho: 4, alto: 5, alt: "Mesa con una lámpara pequeña encendida y sillas tapizadas en rojo, en penumbra", leyenda: "Sombras" }
    ],
    accion: { tipo: "reservar", texto: "Reservar mesa" }
  },
  {
    id: "sentidos",
    nombre: "Sentidos",
    lema: "Un espacio para compartir sin perder la intimidad.",
    texto: "Un ambiente más reservado donde los encuentros encuentran su propio espacio. Sentidos está pensado para grupos, celebraciones y momentos que merecen compartirse alrededor de la mesa, con la comodidad y privacidad que cada ocasión necesita.",
    notas: ["Grupos", "Celebraciones", "Reservas grandes"],
    capacidad: { texto: "Alrededor de cinco mesas para 4 a 6 personas cada una, según la configuración.", confirmado: false },
    fotos: [
      { foto: "assets/img/bar/bar-salon", ancho: 4, alto: 5, alt: "Sentidos: mesa larga con sillas bajo una luz roja cálida", leyenda: "Sentidos" },
      { foto: "assets/img/bar/bar-penumbra", ancho: 4, alto: 5, alt: "Sentidos en penumbra, con ventanales de luz cálida", leyenda: "Sentidos" }
    ],
    accion: { tipo: "whatsapp", texto: "Consultar disponibilidad", mensaje: "Hola Ocre, quiero consultar disponibilidad en Sentidos para un grupo." }
  }
];
