/* =====================================================================
   OCRE · Núcleo compartido (portada y páginas legales)
   Utilidades, enlaces desde la configuración, navegación, pie,
   consentimiento de cookies y datos estructurados.
   Sin dependencias externas.
   ===================================================================== */
(function () {
  "use strict";
  var O = window.OCRE = window.OCRE || {};
  var S = O.sitio || {};
  var raiz = document.documentElement.getAttribute("data-raiz") || "";   // "../" en páginas legales

  /* ---------- Utilidades ---------- */
  function h(tag, attrs, hijos) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k === "style") el.style.cssText = v;   // CSSOM: compatible con la CSP (sin estilos en línea)
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
    [].concat(hijos || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return el;
  }
  O.h = h;

  O.precio = function (n) {
    if (n === null || n === undefined) return "";
    return "$" + Number(n).toLocaleString("es-CO", { maximumFractionDigits: 0 });
  };

  O.fechaLarga = function (iso) {
    var p = String(iso).split("-");
    var d = new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1);
    return d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  };

  O.hora12 = function (hhmm) {
    var p = hhmm.split(":"), hh = +p[0], mm = p[1];
    var suf = hh < 12 ? "a. m." : "p. m.";
    var h12 = hh % 12 === 0 ? 12 : hh % 12;
    return h12 + (mm === "00" ? "" : ":" + mm) + " " + suf;
  };

  O.aLas = function (hhmm) { var h1 = O.hora12(hhmm); return (h1.indexOf("1 ") === 0 || h1.indexOf("1:") === 0 ? "a la " : "a las ") + h1; };

  O.pendiente = function (que) {
    return h("span", { class: "pendiente", title: "Dato pendiente de suministrar por el establecimiento" }, "Pendiente: " + que);
  };

  O.enlace = function (clave, mensaje) {
    var e = S.enlaces || {};
    switch (clave) {
      case "whatsapp": return e.whatsappNumero ? "https://wa.me/" + e.whatsappNumero + (mensaje ? "?text=" + encodeURIComponent(mensaje) : "") : null;
      case "email": return e.email ? "mailto:" + e.email : null;
      default: return e[clave] || null;
    }
  };

  /* Fotografía adaptable o marco provisional.
     base: ruta sin extensión. Se esperan archivos base-800 y base-1600 en .avif, .webp y .jpg
     (los genera tools/optimizar-imagenes.mjs). */
  O.anchos = [800, 1600];
  O.foto = function (base, o) {
    o = o || {};
    var proporcion = (o.ancho && o.alto) ? o.ancho + " / " + o.alto : null;
    if (!base) {
      var m = h("div", { class: "marco", role: o.decorativa ? null : "img",
        "aria-label": o.decorativa ? null : "Espacio para fotografía oficial: " + (o.alt || "pendiente"),
        "aria-hidden": o.decorativa ? "true" : null }, [
        h("span", { class: "marco__etiqueta" }, "Fotografía oficial pendiente"),
        o.encargo ? h("span", { class: "marco__encargo" }, o.encargo) : null
      ]);
      if (proporcion) m.style.aspectRatio = proporcion;
      return m;
    }
    var srcset = function (ext) { return O.anchos.map(function (w) { return raiz + base + "-" + w + "." + ext + " " + w + "w"; }).join(", "); };
    var sizes = o.sizes || "(max-width: 760px) 100vw, 60vw";
    var img = h("img", {
      src: raiz + base + "-" + O.anchos[O.anchos.length - 1] + ".jpg",
      srcset: srcset("jpg"), sizes: sizes, alt: o.alt || "",
      width: o.ancho ? o.ancho * 400 : null, height: o.alto ? o.alto * 400 : null,
      loading: o.prioridad ? "eager" : "lazy", decoding: "async", fetchpriority: o.prioridad ? "high" : null
    });
    var cont = h("div", { class: "foto is-cargando" }, h("picture", null, [
      h("source", { type: "image/avif", srcset: srcset("avif"), sizes: sizes }),
      h("source", { type: "image/webp", srcset: srcset("webp"), sizes: sizes }),
      img
    ]));
    if (proporcion) cont.style.aspectRatio = proporcion;
    function lista() { cont.classList.remove("is-cargando"); cont.classList.add("is-lista"); }
    img.addEventListener("load", lista);
    img.addEventListener("error", function () {
      var err = h("div", { class: "marco marco--error", role: "img", "aria-label": "No se pudo cargar la imagen" }, [
        h("span", { class: "marco__etiqueta" }, "No se pudo cargar la imagen"),
        h("span", { class: "marco__encargo" }, o.alt || "")
      ]);
      if (proporcion) err.style.aspectRatio = proporcion;
      cont.replaceWith(err);
    });
    if (img.complete && img.naturalWidth) lista();
    return cont;
  };

  /* Fotos declaradas en el HTML: <div data-foto="ruta/base" data-ancho="2" data-alto="3" data-alt="…" data-sizes="…"> */
  O.hidratarFotos = function (ambito) {
    (ambito || document).querySelectorAll("[data-foto]").forEach(function (el) {
      var d = el.dataset;
      el.appendChild(O.foto(d.foto, { ancho: +d.ancho || null, alto: +d.alto || null, alt: d.alt || "", sizes: d.sizes, prioridad: d.prioridad === "true" }));
      el.removeAttribute("data-foto");
    });
  };

  /* Revelado al entrar en pantalla. Sin IntersectionObserver o con movimiento
     reducido no se oculta nada: el contenido siempre es visible. */
  var observadorRevela = null;
  O.revelar = function (ambito) {
    if (!observadorRevela) return;
    (ambito || document).querySelectorAll(".revela:not(.is-visible), .revela-texto:not(.is-visible), .revela-titulo:not(.is-visible)").forEach(function (el) { observadorRevela.observe(el); });
  };
  function iniciarRevelado() {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("js-revela");
    observadorRevela = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); observadorRevela.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    O.revelar(document);
  }

  /* ---------- Horario ---------- */
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function aMin(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  O.estadoHorario = function (ahora) {
    var hor = S.horario || [];
    if (!hor.length) return null;
    // Hora actual en Medellín (America/Bogota), sin depender de la zona del visitante.
    var partes = new Intl.DateTimeFormat("en-US", { timeZone: "America/Bogota", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(ahora || new Date());
    var get = function (t) { return (partes.filter(function (p) { return p.type === t; })[0] || {}).value; };
    var dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    var min = +get("hour") * 60 + +get("minute");
    function tramo(d) { return hor.filter(function (t) { return t.dias.indexOf(d) > -1; })[0]; }
    var hoy = tramo(dia), ayer = tramo((dia + 6) % 7);
    if (ayer && aMin(ayer.cierra) < aMin(ayer.abre) && min < aMin(ayer.cierra)) return { abierto: true, texto: "Abierto ahora: cierra " + O.aLas(ayer.cierra) };
    if (hoy) {
      var a = aMin(hoy.abre), c = aMin(hoy.cierra);
      var abierto = c < a ? min >= a : (min >= a && min < c);
      if (abierto) return { abierto: true, texto: "Abierto ahora: cierra " + O.aLas(hoy.cierra) };
      if (min < a) return { abierto: false, texto: "Cerrado ahora: abre hoy " + O.aLas(hoy.abre) };
    }
    for (var i = 1; i <= 7; i++) {
      var t = tramo((dia + i) % 7);
      if (t) return { abierto: false, texto: "Cerrado ahora: abre el " + DIAS[(dia + i) % 7] + " " + O.aLas(t.abre) };
    }
    return null;
  };

  /* ---------- Datos y enlaces desde la configuración ---------- */
  function direccionTexto() {
    var d = S.direccion || {};
    return [d.calle, d.barrio, d.ciudad].filter(Boolean).join(", ");
  }
  O.direccionTexto = direccionTexto;

  function aplicarDatos(ambito) {
    ambito = ambito || document;
    ambito.querySelectorAll("[data-enlace]").forEach(function (a) {
      var url = O.enlace(a.getAttribute("data-enlace"), a.getAttribute("data-mensaje"));
      if (url) a.href = url;
      else { a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); a.hidden = true; }
    });
    ambito.querySelectorAll("[data-dato]").forEach(function (el) {
      var k = el.getAttribute("data-dato"), e = S.enlaces || {};
      if (k === "direccion") el.textContent = direccionTexto();
      else if (k === "instagramUsuario" && e.instagramUsuario) el.textContent = e.instagramUsuario;
      else if (k === "email" && e.email) el.textContent = e.email;
      else if (k === "rangoPersonas" && S.reservaEnLinea) el.textContent = "de " + S.reservaEnLinea.minimoPersonas + " a " + S.reservaEnLinea.maximoPersonas + " personas";
      else if (k === "horario") {
        el.textContent = "";
        (S.horario || []).forEach(function (t) {
          el.appendChild(h("li", null, [h("span", null, t.etiqueta), h("span", null, O.hora12(t.abre) + " – " + O.hora12(t.cierra))]));
        });
      }
    });
    ambito.querySelectorAll("[data-legal]").forEach(function (el) {
      var k = el.getAttribute("data-legal"), v = (S.legal || {})[k];
      el.textContent = "";
      if (v) el.textContent = k.indexOf("fecha") === 0 || k === "ultimaActualizacion" ? O.fechaLarga(v) : v;
      else el.appendChild(O.pendiente(el.getAttribute("data-etiqueta") || k));
    });
  }
  O.aplicarDatos = aplicarDatos;

  /* ---------- Pie de página ---------- */
  function pie() {
    var cont = document.getElementById("pie");
    if (!cont) return;
    var l = raiz + "legal/";
    var inicio = raiz ? raiz + "index.html" : "";
    function li(href, txt, ext) { return h("li", null, h("a", { href: href, target: ext ? "_blank" : null, rel: ext ? "noopener noreferrer" : null }, txt)); }
    var grid = h("div", { class: "pie__grid" }, [
      h("div", null, [
        h("p", { class: "pie__marca", "aria-label": "OCRE" }, "OCRE"),
        h("p", { class: "pie__lema" }, "Cocina y bar oculto. " + (S.lema || "") + "."),
      ]),
      h("div", null, [
        h("h2", null, "Visítanos"),
        h("address", null, direccionTexto()),
        h("ul", { class: "horario", "data-dato": "horario", style: "margin-top:.8rem" }),
        h("p", { style: "margin-top:.8rem" }, h("a", { href: O.enlace("googleMaps"), target: "_blank", rel: "noopener noreferrer" }, "Cómo llegar"))
      ]),
      h("div", null, [
        h("h2", null, "Contacto"),
        h("ul", null, [
          li(O.enlace("reservas"), "Reservar en Cluvi", true),
          O.enlace("whatsapp") ? li(O.enlace("whatsapp"), "WhatsApp", true) : null,
          O.enlace("instagram") ? li(O.enlace("instagram"), "Instagram " + ((S.enlaces || {}).instagramUsuario || ""), true) : null,
          O.enlace("email") ? li(O.enlace("email"), (S.enlaces || {}).email) : null
        ])
      ]),
      h("div", null, [
        h("h2", null, "Legal"),
        h("ul", null, [
          li(l + "privacidad.html", "Aviso de privacidad"),
          li(l + "tratamiento-datos.html", "Tratamiento de datos personales"),
          li(l + "cookies.html", "Política de cookies"),
          li(l + "terminos.html", "Condiciones de uso"),
          li(l + "terceros.html", "Servicios de terceros"),
          h("li", null, h("button", { type: "button", onclick: function () { O.consentimiento.abrir(true); } }, "Preferencias de cookies"))
        ])
      ])
    ]);
    var base = h("div", { class: "pie__base" }, [
      h("p", null, "© " + new Date().getFullYear() + " " + (S.nombreCompleto || "OCRE") + ". Medellín, Colombia."),
      h("p", { class: "pie__alcohol" }, "El exceso de alcohol es perjudicial para la salud. Prohíbese el expendio de bebidas embriagantes a menores de edad (Ley 124 de 1994)."),
      inicio ? h("p", null, h("a", { href: inicio }, "Volver al inicio")) : null
    ]);
    cont.appendChild(grid);
    cont.appendChild(base);
    aplicarDatos(cont);
  }

  /* ---------- Navegación ---------- */
  function navegacion() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("menu");
    var solida = function () { nav.classList.toggle("is-solida", window.scrollY > 40 || nav.hasAttribute("data-siempre-solida")); };
    solida();
    window.addEventListener("scroll", solida, { passive: true });

    if (toggle && menu) {
      var cerrar = function (enfocar) {
        nav.classList.remove("is-abierta");
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector(".sr").textContent = "Abrir menú";
        document.body.classList.remove("sin-scroll");
        if (enfocar) toggle.focus();
      };
      toggle.addEventListener("click", function () {
        var abrir = toggle.getAttribute("aria-expanded") !== "true";
        if (!abrir) return cerrar(false);
        nav.classList.add("is-abierta");
        toggle.setAttribute("aria-expanded", "true");
        toggle.querySelector(".sr").textContent = "Cerrar menú";
        document.body.classList.add("sin-scroll");
        var primero = menu.querySelector("a");
        if (primero) primero.focus();
      });
      menu.addEventListener("click", function (e) { if (e.target.closest("a")) cerrar(false); });
      document.addEventListener("keydown", function (e) {
        if (!nav.classList.contains("is-abierta")) return;
        if (e.key === "Escape") return cerrar(true);
        if (e.key === "Tab") {   // mantener el foco dentro del menú abierto
          var f = [toggle].concat([].slice.call(menu.querySelectorAll("a")));
          var i = f.indexOf(document.activeElement);
          if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
          else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
        }
      });
      window.matchMedia("(min-width: 961px)").addEventListener("change", function (m) { if (m.matches) cerrar(false); });
    }

    // Sección activa en el menú
    var enlaces = [].slice.call(document.querySelectorAll('.nav__menu a[href^="#"]'));
    if ("IntersectionObserver" in window && enlaces.length) {
      var io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) {
          if (!en.isIntersecting) return;
          enlaces.forEach(function (a) { a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + en.target.id); if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "true"); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      enlaces.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) io.observe(s); });
    }
  }

  /* ---------- Consentimiento de cookies ----------
     Categorías:
       necesarias — siempre activas (solo guardan esta elección en el navegador).
       terceros   — contenido embebido de Google Maps.
       analitica  — solo aparece si content/sitio.js → analitica.id está definido.
     Nada opcional se carga antes de obtener el consentimiento. */
  var CLAVE = "ocre-consentimiento", VERSION = 1;
  var oyentes = [];
  function leer() {
    try { var v = JSON.parse(localStorage.getItem(CLAVE)); return v && v.v === VERSION ? v : null; } catch (e) { return null; }
  }
  function guardar(pref) {
    var v = { v: VERSION, fecha: new Date().toISOString(), terceros: !!pref.terceros, analitica: !!pref.analitica };
    try { localStorage.setItem(CLAVE, JSON.stringify(v)); } catch (e) { /* almacenamiento no disponible: se respeta en esta visita */ }
    O.consentimiento.estado = v;
    oyentes.forEach(function (fn) { fn(v); });
    return v;
  }
  var hayAnalitica = !!(S.analitica && S.analitica.id);
  O.consentimiento = {
    estado: leer(),
    tiene: function (cat) { return !!(this.estado && this.estado[cat]); },
    alCambiar: function (fn) { oyentes.push(fn); },
    otorgar: function (cat) { var p = Object.assign({ terceros: false, analitica: false }, this.estado || {}); p[cat] = true; guardar(p); },
    abrir: function (configurar) { banner(configurar); }
  };

  function banner(configurar) {
    var raizC = document.getElementById("consentimiento-raiz") || document.body.appendChild(h("div", { id: "consentimiento-raiz" }));
    raizC.textContent = "";
    var actual = O.consentimiento.estado || {};
    var cerrar = function (pref) { guardar(pref); raizC.textContent = ""; };
    var opciones = h("fieldset", { hidden: configurar ? null : true }, [
      h("legend", null, "Elige qué permites"),
      h("label", { class: "consent__opcion" }, [h("input", { type: "checkbox", checked: true, disabled: true }), "Necesarias", h("small", null, "Guardan esta elección en tu navegador. No se pueden desactivar.")]),
      h("label", { class: "consent__opcion" }, [h("input", { type: "checkbox", name: "terceros", checked: actual.terceros ? true : null }), "Contenido de terceros", h("small", null, "Mapa de Google Maps. Google puede instalar cookies y recibir tu IP.")]),
      hayAnalitica ? h("label", { class: "consent__opcion" }, [h("input", { type: "checkbox", name: "analitica", checked: actual.analitica ? true : null }), "Analítica", h("small", null, "Estadísticas de uso anónimas para mejorar el sitio.")]) : null
    ]);
    var btnConfig = h("button", { class: "btn btn--linea", type: "button" }, configurar ? "Guardar selección" : "Configurar");
    btnConfig.addEventListener("click", function () {
      if (opciones.hidden) { opciones.hidden = false; btnConfig.textContent = "Guardar selección"; opciones.querySelector("input[name]").focus(); return; }
      var t = opciones.querySelector('[name="terceros"]'), a = opciones.querySelector('[name="analitica"]');
      cerrar({ terceros: t && t.checked, analitica: a && a.checked });
    });
    var caja = h("section", { class: "consent", role: "region", "aria-labelledby": "consent-titulo" }, [
      h("h2", { id: "consent-titulo" }, "Tu privacidad"),
      h("p", null, [
        "Este sitio solo usa almacenamiento técnico necesario. Con tu permiso cargamos contenido de terceros, como el mapa de Google. ",
        h("a", { href: raiz + "legal/cookies.html" }, "Política de cookies"), "."
      ]),
      opciones,
      h("div", { class: "consent__acciones" }, [
        h("button", { class: "btn btn--linea", type: "button", onclick: function () { cerrar({ terceros: false, analitica: false }); } }, "Solo necesarias"),
        btnConfig,
        h("button", { class: "btn btn--linea", type: "button", onclick: function () { cerrar({ terceros: true, analitica: hayAnalitica }); } }, "Aceptar todas")
      ])
    ]);
    raizC.appendChild(caja);
    if (configurar) caja.querySelector("button, input:not([disabled])").focus();
  }

  /* Analítica: no hay proveedor configurado. Si en el futuro se define
     sitio.analitica, cargar aquí el script SOLO cuando tiene("analitica"). */
  function cargarAnalitica() {
    if (!hayAnalitica || !O.consentimiento.tiene("analitica")) return;
    // Integración pendiente: añadir el script del proveedor y su dominio a la CSP.
  }

  /* ---------- Datos estructurados (Schema.org) ---------- */
  function datosEstructurados() {
    if (!document.body.hasAttribute("data-schema")) return;
    var d = S.direccion || {}, dom = S.dominio;
    var mapaDias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var r = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: S.nombreCompleto,
      alternateName: S.nombreAlterno,
      description: "Cocina y bar oculto en Laureles, Medellín: cocina de autor, coctelería de autor, arte y música.",
      address: { "@type": "PostalAddress", streetAddress: d.calle, addressLocality: d.ciudad, addressRegion: d.region, addressCountry: d.pais },
      geo: (d.lat && d.lng) ? { "@type": "GeoCoordinates", latitude: d.lat, longitude: d.lng } : undefined,
      openingHoursSpecification: (S.horario || []).map(function (t) {
        return { "@type": "OpeningHoursSpecification", dayOfWeek: t.dias.map(function (i) { return mapaDias[i]; }), opens: t.abre, closes: t.cierra };
      }),
      acceptsReservations: (S.enlaces || {}).reservas,
      hasMenu: dom ? dom + "/#carta" : undefined,
      url: dom || undefined,
      email: (S.enlaces || {}).email || undefined,
      telephone: (S.enlaces || {}).telefono || undefined,
      sameAs: [(S.enlaces || {}).instagram].filter(Boolean)
    };
    var grafo = [r];
    var eventos = ((O.sonidos || {}).eventos || []).filter(function (e) { return e.fecha >= hoyISO(); });
    eventos.forEach(function (e) {
      grafo.push({
        "@type": "Event", name: e.nombre, startDate: e.fecha + "T" + (e.inicio || "21:00") + ":00-05:00",
        description: e.descripcion,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled",
        location: { "@type": "Place", name: S.nombreCompleto, address: r.address },
        performer: e.artista ? { "@type": "PerformingGroup", name: e.artista } : undefined,
        organizer: { "@type": "Organization", name: S.nombreCompleto }
      });
    });
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": grafo });
    document.head.appendChild(s);
    if (dom) {
      document.head.appendChild(h("link", { rel: "canonical", href: dom + "/" }));
      document.head.appendChild(h("meta", { property: "og:url", content: dom + "/" }));
    }
  }

  function hoyISO() {
    // Fecha de hoy en Medellín (evita el error de usar UTC, que tras las 7 p. m. daba el día siguiente).
    return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  }
  O.hoyISO = hoyISO;

  /* ---------- Arranque ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    aplicarDatos(document);
    O.hidratarFotos(document);
    iniciarRevelado();
    navegacion();
    pie();
    datosEstructurados();
    document.querySelectorAll("[data-abrir-consentimiento]").forEach(function (b) {
      b.addEventListener("click", function () { O.consentimiento.abrir(true); });
    });
    if (!O.consentimiento.estado) banner(false);
    O.consentimiento.alCambiar(cargarAnalitica);
    cargarAnalitica();
  });
})();
