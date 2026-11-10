/* =====================================================================
   OCRE · Configuración general del sitio
   ---------------------------------------------------------------------
   Este es el ÚNICO lugar donde se editan datos del establecimiento,
   enlaces, horarios y datos legales. Todas las páginas los leen de aquí.

   Regla: si un dato no está confirmado por los propietarios, déjalo en
   `null`. El sitio mostrará un marcador visible de "pendiente" en lugar
   de inventarlo. Ver docs/PENDIENTES.md.
   ===================================================================== */
window.OCRE = window.OCRE || {};

OCRE.sitio = {
  nombre: "OCRE",
  nombreCompleto: "OCRE · Cocina y Bar Oculto",
  // Nombre con el que aparece el perfil en Google Maps (verificado 2026-11-09).
  nombreAlterno: "Ocre Secret Bar",
  lema: "Arte, sonido y gusto",           // Frase del sitio anterior.
  desde: 2025,                            // "Est. 2025" en el sitio anterior. Pendiente de confirmar.

  // Dominio definitivo. Mientras sea null no se publica <link rel=canonical>
  // ni URLs absolutas en Open Graph / Schema.org.
  dominio: null, // ej. "https://www.ocremde.com"

  direccion: {
    calle: "Tv 39D #39b-92",
    barrio: "Laureles – Estadio",
    ciudad: "Medellín",
    region: "Antioquia",
    pais: "CO",
    // Coordenadas del perfil de Google Maps (verificado 2026-11-09).
    lat: 6.246305,
    lng: -75.5950094
  },

  // Horario: coincide en el sitio anterior y en Google Maps (verificado 2026-11-09).
  // dias: 0 = domingo … 6 = sábado. Horas en formato 24 h.
  horario: [
    { dias: [0, 1, 2, 3], abre: "18:00", cierra: "01:00", etiqueta: "Domingo a miércoles" },
    { dias: [4, 5, 6],    abre: "18:00", cierra: "02:00", etiqueta: "Jueves a sábado" }
  ],

  enlaces: {
    // Sistema oficial de reservas. Verificado y funcionando el 2026-11-09.
    reservas: "https://ocre.cluvi.co/bookings/32410",
    whatsappNumero: "573127252045",       // Del sitio anterior. Pendiente de confirmar que es el WhatsApp oficial.
    instagram: "https://www.instagram.com/ocre_mde/",
    instagramUsuario: "@ocre_mde",
    email: "ocre2025@gmail.com",          // Del sitio anterior.
    googleMaps: "https://maps.google.com/?cid=1167090936965291906",
    // Mapa embebido: solo se carga si la persona lo pide (Google instala cookies).
    googleMapsEmbed: "https://www.google.com/maps?q=Ocre+Secret+Bar,+Tv+39D+%2339b-92,+Medell%C3%ADn&z=17&output=embed",
    telefono: null                        // Google muestra 304 470 7094: confirmar antes de publicarlo.
  },

  // Reserva en línea según el sistema Cluvi (consultado 2026-11-09).
  reservaEnLinea: { minimoPersonas: 2, maximoPersonas: 15 },

  // Calificación pública en Google. Es una instantánea: actualízala junto con la fecha.
  // Pon `null` en `valor` para ocultarla.
  google: {
    valor: 4.9,
    total: 557,
    consultado: "2026-11-09"
  },

  // Material audiovisual de portada. Mientras sea null, la portada usa
  // la composición tipográfica sin fotografía.
  portada: {
    video: null,     // ej. { mp4: "assets/img/ambiente/portada.mp4", webm: "…", poster: "assets/img/ambiente/portada-poster" }
    // Foto de portada: Negroni clásico de la carta de Ocre (foto publicada por Ocre en Cluvi).
    // Si cambias la imagen, actualiza también el <link rel="preload"> de index.html.
    imagen: "assets/img/cocteleria/negroni-clasico",
    leyenda: "Negroni clásico",
    alt: "Negroni clásico servido sobre una roca mineral, con luz cálida lateral",
    // Rotación: después de la primera imagen recorre todos los cócteles y platos
    // de la carta que tengan foto (content/carta.js), alternándolos.
    // Se pausa sola fuera de pantalla, en pestañas ocultas y con movimiento reducido.
    rotacion: { activa: true, intervalo: 6000 }
  },

  // Analítica: no se carga nada hasta que exista un ID Y la persona dé consentimiento.
  analitica: { proveedor: null, id: null },

  // Datos del responsable del tratamiento (Ley 1581 de 2012).
  // NO inventar. Los debe suministrar el propietario.
  legal: {
    razonSocial: null,
    nit: null,
    representanteLegal: null,
    domicilio: null,
    correoDatos: null,          // canal para consultas y reclamos de datos personales
    telefonoDatos: null,
    areaResponsable: null,      // persona o área que atiende peticiones
    fechaVigencia: null,        // fecha en que la política entra en vigencia
    ultimaActualizacion: "2026-11-09"
  }
};
