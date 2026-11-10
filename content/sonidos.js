/* =====================================================================
   OCRE · Ocre Sounds — DJs, artistas y eventos
   ---------------------------------------------------------------------
   IMPORTANTE: hoy NO hay información confirmada de residentes, artistas
   ni eventos. Las listas están vacías a propósito; la página muestra un
   estado vacío honesto. No agregar datos sin confirmación del local.

   ── Plantilla de DJ / artista ─────────────────────────────────────────
   {
     nombre: "Nombre artístico",
     rol: "residente" | "invitado",
     estilos: ["House", "Afro"],
     bio: "Biografía breve aprobada por el artista (máx. ~300 caracteres).",
     foto: "assets/img/djs/nombre",          // ruta base sin extensión
     enlaces: [{ etiqueta: "SoundCloud", url: "https://…" }]
   }

   ── Plantilla de evento ───────────────────────────────────────────────
   {
     nombre: "Nombre del evento",
     fecha: "2026-12-05",          // AAAA-MM-DD. Los eventos pasados se ocultan solos.
     inicio: "21:00", fin: "02:00",
     artista: "Nombre del artista",
     descripcion: "Texto breve.",
     foto: "assets/img/eventos/archivo",   // o null
     accion: "reservar" | "whatsapp"       // reservar → Cluvi; whatsapp → solicitar información
   }
   ===================================================================== */
window.OCRE = window.OCRE || {};

OCRE.sonidos = {
  // Texto de concepto: describe la intención, sin afirmar programación concreta.
  concepto: "En Ocre la música no acompaña: marca el pulso de la noche. La cocina abre con calma y, a medida que la noche avanza, el sonido sube con ella.",
  estilos: [],     // ej. ["House", "Disco", "Afro"] — pendiente de confirmar
  djs: [],         // residentes e invitados (ver plantilla arriba)
  eventos: [],     // próximas fechas (ver plantilla arriba)
  archivo: []      // fotos de noches anteriores: { titulo, fecha, foto, ancho, alto }
};
