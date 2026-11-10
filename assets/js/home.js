/* =====================================================================
   OCRE · Portada: renderizado de secciones a partir de /content
   ===================================================================== */
(function () {
  "use strict";
  var O = window.OCRE, h = O.h, S = O.sitio || {};

  document.addEventListener("DOMContentLoaded", function () {
    portada();
    puerta();
    marquesina();
    ritual();
    espacios();
    sounds();
    noches();
    carta();
    resenas();
    solicitud();
    visitanos();
    barraMovil();
    revelarComposiciones();
    profundidad();
  });

  /* ---------- Portada: foto o video si existen ---------- */
  function portada() {
    var p = S.portada || {}, cont = document.getElementById("hero-media");
    if (!cont) return;
    var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (p.video && !reducido) {
      var v = h("video", { autoplay: true, muted: true, loop: true, playsinline: true, preload: "metadata",
        poster: p.video.poster ? p.video.poster + "-1600.jpg" : null }, [
        p.video.webm ? h("source", { src: p.video.webm, type: "video/webm" }) : null,
        h("source", { src: p.video.mp4, type: "video/mp4" })
      ]);
      cont.appendChild(h("div", { class: "foto is-lista" }, v));
    } else if (p.imagen || (p.video && p.video.poster)) {
      return portadaRotativa(p, cont, reducido);
    }
    if (!cont.firstChild) cont.hidden = true;
  }

  /* Portada rotativa: la primera imagen es la configurada (precargada para el LCP);
     luego alterna cócteles y platos de la carta con foto. Fundido cruzado con un
     acercamiento lento. Control de pausa (WCAG 2.2.2), se detiene fuera de pantalla
     o con la pestaña oculta, y no arranca sola con movimiento reducido. */
  var SIZES_PORTADA = "(max-width: 760px) 100vw, 42vw";
  function diapositivasPortada(p) {
    var primera = { foto: p.imagen || p.video.poster, nombre: p.leyenda, alt: p.alt || "", tipo: "coctel" };
    var lista = [primera];
    if (!(p.rotacion && p.rotacion.activa) || !O.carta) return lista;
    var cocteles = [], platos = [];
    O.carta.secciones.forEach(function (s) {
      (s.items || []).forEach(function (it) {
        if (!it.foto || it.foto === primera.foto) return;
        var esBebida = s.id === "cocteles" || s.id === "sin-alcohol";
        (esBebida ? cocteles : platos).push({ foto: it.foto, nombre: it.nombre, frase: it.frase, tipo: esBebida ? "coctel" : "plato", ingredientes: !!it.ingredientes,
          alt: it.alt || (esBebida ? "Cóctel " + it.nombre + " de la carta de Ocre" : "Ingredientes de " + it.nombre) });
      });
    });
    platos.sort(function (x, y) { return (x.ingredientes ? 1 : 0) - (y.ingredientes ? 1 : 0); });
    // Alterna: plato, cóctel, plato, cóctel… (primero los platos servidos)
    for (var i = 0; i < Math.max(cocteles.length, platos.length); i++) {
      if (platos[i]) lista.push(platos[i]);
      if (cocteles[i]) lista.push(cocteles[i]);
    }
    return lista;
  }

  function portadaRotativa(p, cont, reducido) {
    var diapos = diapositivasPortada(p);
    var escenario = h("div", { class: "hero__escenario" });
    function capa(d, primera) {
      return h("div", { class: "hero__diapo" + (primera ? " is-activa" : "") },
        O.foto(d.foto, { prioridad: true, ancho: 2, alto: 3, sizes: SIZES_PORTADA, alt: d.alt }));
    }
    var actual = capa(diapos[0], true);
    escenario.appendChild(actual);
    cont.appendChild(escenario);

    var texto = h("span", { class: "hero__leyenda-texto" });
    var contador = h("span", { class: "hero__contador", "aria-hidden": "true" });
    var progreso = h("span", { class: "hero__progreso", "aria-hidden": "true" }, h("i"));
    var pausa = h("button", { class: "hero__pausa", type: "button", "aria-pressed": "false" }, "Pausar");
    cont.appendChild(h("figcaption", { class: "leyenda hero__leyenda" }, [texto, diapos.length > 1 ? h("span", { class: "hero__controles" }, [contador, progreso, pausa]) : null]));

    var i = 0;
    function pintarLeyenda() {
      var d = diapos[i];
      texto.textContent = "";
      texto.appendChild(document.createTextNode(d.ingredientes ? "Ingredientes de " : "En la imagen: "));
      texto.appendChild(h("em", null, d.nombre || ""));
      contador.textContent = String(i + 1).padStart(2, "0") + " / " + String(diapos.length).padStart(2, "0");
    }
    pintarLeyenda();
    if (diapos.length < 2) return;

    var intervalo = Math.max(3500, (p.rotacion && p.rotacion.intervalo) || 6000);
    var pausado = reducido, enPantalla = true, temporizador = null, cambiando = false;
    cont.style.setProperty("--intervalo", intervalo + "ms");
    function actualizarPausa() {
      pausa.textContent = pausado ? "Reproducir" : "Pausar";
      pausa.setAttribute("aria-pressed", String(pausado));
      cont.classList.toggle("is-pausada", pausado);
    }
    function programar() {
      clearTimeout(temporizador);
      progreso.firstChild.classList.remove("is-corriendo"); void progreso.offsetWidth;
      if (pausado || !enPantalla || document.hidden) return;
      progreso.firstChild.classList.add("is-corriendo");
      temporizador = setTimeout(siguiente, intervalo);
    }
    function siguiente() {
      if (cambiando) return;
      cambiando = true;
      var n = (i + 1) % diapos.length, nueva = capa(diapos[n], false);
      escenario.appendChild(nueva);
      var img = nueva.querySelector("img");
      var hecho = false;
      function mostrar() {
        if (hecho) return; hecho = true;
        requestAnimationFrame(function () {
          void nueva.offsetWidth;   // fija el estado inicial para que el barrido se anime
          nueva.classList.add("is-activa");
          actual.classList.remove("is-activa");
          actual.classList.add("is-saliendo");
          var vieja = actual; actual = nueva; i = n;
          pintarLeyenda();
          setTimeout(function () { vieja.remove(); }, 1600);
          cambiando = false; programar();
        });
      }
      function fallo() { if (hecho) return; hecho = true; nueva.remove(); i = n; cambiando = false; programar(); }
      if (!img) return fallo();
      if (img.complete && img.naturalWidth) mostrar();
      else { img.addEventListener("load", mostrar, { once: true }); img.addEventListener("error", fallo, { once: true }); }
    }
    pausa.addEventListener("click", function () { pausado = !pausado; actualizarPausa(); if (pausado) programar(); else siguiente(); });
    document.addEventListener("visibilitychange", programar);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { enPantalla = e[0].isIntersecting; programar(); }, { threshold: .2 }).observe(cont);
    }
    actualizarPausa();
    programar();
  }

  /* ---------- Puerta ---------- */
  function puerta() {
    var b = document.getElementById("puerta-boton"), dentro = document.getElementById("puerta-dentro");
    if (!b) return;
    b.addEventListener("click", function () {
      var abierta = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", String(abierta));
      document.getElementById("puerta").classList.toggle("is-abierta", abierta);
      dentro.hidden = !abierta;
      b.querySelector(".puerta__llamado").firstChild.textContent = abierta ? "Cerrar la puerta. " : "Dale una señal. ";
    });
  }

  function marquesina() {
    var m = document.getElementById("marquesina");
    if (!m) return;
    var w = ["Arte", "Sonido", "Gusto", "Cocina", "Tragos de autor", "Bar oculto", "Laureles"];
    w.concat(w).forEach(function (x) { m.appendChild(h("span", null, x)); });
  }

  /* ---------- El ritual de los sentidos ---------- */
  var galeria, cuerpo, visor, categoriaActual, indiceActual = 0, origenFoco;

  function ritual() {
    var lista = document.getElementById("estratos");
    if (!lista || !O.galerias) return;
    var visorRitual = document.getElementById("ritual-visor");
    var capas = [];
    function activar(i) {
      capas.forEach(function (c, j) { c.classList.toggle("is-activa", j === i); });
      lista.querySelectorAll(".ritual__item").forEach(function (li, j) { li.classList.toggle("is-activa", j === i); });
    }
    O.galerias.forEach(function (g, i) {
      if (g.desdeCarta) g.items = piezasDeCarta(g);
      var n = g.items.length, conFoto = g.items.filter(function (x) { return x.foto; }).length;
      var cubierta = portadaDe(g);
      var opciones = { ancho: 2, alto: 3, alt: cubierta.alt || "", encargo: cubierta.foto ? null : "Imagen protagonista de " + g.titulo.toLowerCase() + " en producción.", sizes: "(max-width: 760px) 40vw, 34vw", decorativa: !cubierta.foto };
      var btn = h("button", { class: "ritual__boton", type: "button", "aria-haspopup": "dialog" }, [
        h("span", { class: "ritual__media", "aria-hidden": "true" }, O.foto(cubierta.foto, Object.assign({}, opciones, { decorativa: true }))),
        h("span", { class: "ritual__texto" }, [
          h("span", { class: "ritual__nombre" }, g.titulo),
          h("span", { class: "ritual__linea" }, g.linea),
          h("span", { class: "ritual__meta" }, n + (n === 1 ? " pieza" : " piezas") + (conFoto ? "" : ", fotografías en producción"))
        ])
      ]);
      btn.addEventListener("click", function () { abrirGaleria(g, btn); });
      btn.addEventListener("pointerenter", function () { activar(i); });
      btn.addEventListener("focus", function () { activar(i); });
      lista.appendChild(h("li", { class: "ritual__item", id: "ritual-" + g.id }, btn));
      if (visorRitual) {
        var capa = h("figure", { class: "ritual__capa" }, [
          O.foto(cubierta.foto, opciones),
          h("figcaption", { class: "ritual__capa-texto" }, [h("span", null, g.titulo), g.intro])
        ]);
        capas.push(capa); visorRitual.appendChild(capa);
      }
    });
    // Empieza mostrando la primera categoría que ya tiene imagen protagonista
    var primeraConFoto = O.galerias.map(portadaDe).findIndex(function (c) { return !!c.foto; });
    activar(primeraConFoto > -1 ? primeraConFoto : 0);

    galeria = document.getElementById("galeria");
    cuerpo = document.getElementById("galeria-cuerpo");
    visor = document.getElementById("visor");
    galeria.querySelector("[data-cerrar]").addEventListener("click", function () { galeria.close(); });
    galeria.addEventListener("close", function () {
      document.body.classList.remove("sin-scroll");
      visor.hidden = true;
      if (location.hash.indexOf("#galeria-") === 0) history.replaceState(null, "", location.pathname + location.search + "#ritual");
      if (origenFoco) origenFoco.focus();
    });
    galeria.addEventListener("cancel", function (e) {   // Esc: primero cierra el visor
      if (!visor.hidden) { e.preventDefault(); cerrarVisor(); }
    });
    visor.querySelector("[data-visor-cerrar]").addEventListener("click", cerrarVisor);
    visor.querySelectorAll("[data-visor]").forEach(function (b) {
      b.addEventListener("click", function () { mover(+b.getAttribute("data-visor")); });
    });
    galeria.addEventListener("keydown", function (e) {
      if (visor.hidden) return;
      if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
    });
    // Deslizar en móvil
    var x0 = null;
    visor.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    visor.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
    });

    // Enlace directo a una galería: #galeria-cocina
    var m = location.hash.match(/^#galeria-(.+)$/);
    if (m) {
      var g = O.galerias.filter(function (x) { return x.id === m[1]; })[0];
      if (g) abrirGaleria(g, document.querySelector("#ritual-" + g.id + " button"));
    }
  }

  /* Imagen protagonista: portada declarada, o la primera pieza con foto */
  function portadaDe(g) {
    if (g.portada && g.portada.foto) return g.portada;
    var p = g.items.filter(function (x) { return x.foto; })[0];
    return p ? { foto: p.foto, ancho: p.ancho, alto: p.alto, alt: p.alt || p.titulo } : { foto: null };
  }

  /* Galerías que se alimentan de la carta: una pieza por producto, con sección como contexto */
  function piezasDeCarta(g) {
    var secciones = ((O.carta || {}).secciones) || [], piezas = [];
    g.desdeCarta.forEach(function (ref) {
      var s = secciones.filter(function (x) { return x.id === ref.seccion; })[0];
      if (!s || !s.items) return;
      s.items.forEach(function (it) {
        if (ref.solo && ref.solo.indexOf(it.nombre) < 0) return;
        piezas.push({
          titulo: it.nombre, desc: it.desc, foto: it.foto || null, alt: it.alt || it.nombre,
          frase: it.frase, perfil: it.perfil, historia: it.historia,
          ancho: it.ancho || 4, alto: it.alto || 5,
          encargo: g.encargo, seccion: s.titulo
        });
      });
    });
    return piezas;
  }

  function abrirGaleria(g, origen) {
    categoriaActual = g; origenFoco = origen;
    cuerpo.textContent = "";
    var pendientes = g.items.filter(function (i) { return !i.foto; }).length;
    var cab = h("header", { class: "galeria__cabecera" }, [
      h("h2", { id: "galeria-titulo" }, g.titulo),
      h("p", null, g.intro),
      pendientes ? h("p", { class: "galeria__aviso" }, pendientes === g.items.length
        ? "Las fotografías oficiales de esta sección están en producción. Cada marco describe la toma prevista."
        : pendientes + " fotografías oficiales en producción.") : null
    ]);
    var piezas = h("ol", { class: "piezas" });
    g.items.forEach(function (it, i) {
      var b = h("button", { class: "pieza__boton", type: "button", "aria-label": "Ver " + it.titulo + " a pantalla completa" }, [
        h("figure", null, [
          h("div", { class: "pieza__marco" }, O.foto(it.foto, { ancho: it.ancho, alto: it.alto, alt: it.alt || it.titulo, encargo: it.encargo, sizes: "(max-width: 760px) 100vw, 55vw" })),
          h("figcaption", null, [
            h("span", { class: "pieza__n", "aria-hidden": "true" }, String(i + 1)),
            h("h3", null, it.titulo),
            it.seccion ? h("p", { class: "pieza__desc pieza__seccion" }, it.seccion) : null,
            it.frase ? h("p", { class: "pieza__desc pieza__frase" }, it.frase) : (it.desc ? h("p", { class: "pieza__desc" }, it.desc) : null)
          ])
        ])
      ]);
      b.addEventListener("click", function () { abrirVisor(i, b); });
      piezas.appendChild(h("li", { class: "pieza" }, b));
    });
    cuerpo.appendChild(cab);
    cuerpo.appendChild(piezas);
    cuerpo.scrollTop = 0;
    revelarPiezas(piezas);
    galeria.querySelector(".galeria__migas").textContent = "El ritual de los sentidos / " + g.titulo;
    if (!galeria.open) galeria.showModal();
    document.body.classList.add("sin-scroll");
    history.replaceState(null, "", "#galeria-" + g.id);
    galeria.querySelector("[data-cerrar]").focus();
  }

  var focoPieza;
  function abrirVisor(i, desde) { focoPieza = desde; visor.hidden = false; pintarVisor(i); visor.querySelector("[data-visor='1']").focus(); }
  function cerrarVisor() { visor.hidden = true; if (focoPieza) focoPieza.focus(); }
  function mover(d) {
    var n = categoriaActual.items.length;
    document.getElementById("visor-figura").dataset.dir = d > 0 ? "siguiente" : "anterior";
    pintarVisor((indiceActual + d + n) % n);
  }
  function pintarVisor(i) {
    indiceActual = i;
    var it = categoriaActual.items[i], fig = document.getElementById("visor-figura");
    fig.textContent = "";
    fig.classList.remove("is-entrando"); void fig.offsetWidth; fig.classList.add("is-entrando");
    fig.appendChild(O.foto(it.foto, { alt: it.alt || it.titulo, encargo: it.encargo, sizes: "100vw", prioridad: true }));
    fig.appendChild(h("figcaption", null, [
      h("h3", null, it.titulo),
      it.frase ? h("p", { class: "visor__frase" }, it.frase) : null,
      it.historia ? h("p", { class: "visor__historia" }, it.historia) : null,
      it.desc ? h("p", null, (it.historia ? "Composición: " : "") + it.desc) : null,
      it.perfil && it.perfil.length ? h("p", { class: "visor__perfil" }, "Perfil: " + it.perfil.join(", ").toLowerCase()) : null
    ]));
    document.getElementById("visor-contador").textContent = (i + 1) + " de " + categoriaActual.items.length;
    // Precarga de la siguiente imagen real
    var sig = categoriaActual.items[(i + 1) % categoriaActual.items.length];
    if (sig && sig.foto) { var im = new Image(); im.src = sig.foto + "-1600.jpg"; }
  }

  /* ---------- Ocre Sounds ---------- */
  function vacio(titulo, texto) {
    return h("div", { class: "vacio" }, [
      h("p", null, [h("strong", null, titulo), texto]),
      O.enlace("instagram") ? h("a", { class: "btn btn--linea", href: O.enlace("instagram"), target: "_blank", rel: "noopener noreferrer" }, ["Ver Instagram", h("span", { class: "sr" }, " (abre en una pestaña nueva)")]) : null
    ]);
  }

  function sounds() {
    var D = O.sonidos || {};
    var c = document.getElementById("sounds-concepto");
    if (c) c.textContent = D.concepto + (D.estilos && D.estilos.length ? " Estilos: " + D.estilos.join(", ") + "." : "");

    var ev = document.getElementById("sounds-eventos");
    var proximos = (D.eventos || []).filter(function (e) { return e.fecha >= O.hoyISO(); })
      .sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; });
    if (!proximos.length) {
      ev.appendChild(h("div", { class: "cartel cartel--vacio" }, [
        h("p", { class: "cartel__fecha", "aria-hidden": "true" }, ["—", h("small", null, "Fecha por anunciar")]),
        h("div", { class: "cartel__cuerpo" }, [
          h("h4", null, "Agenda en preparación"),
          h("p", null, "Cuando haya fechas confirmadas, las verás aquí con su artista, horario y opción de reserva. Mientras tanto, sigue nuestro Instagram.")
        ]),
        O.enlace("instagram") ? h("a", { class: "btn btn--linea", href: O.enlace("instagram"), target: "_blank", rel: "noopener noreferrer" }, ["Ver Instagram", h("span", { class: "sr" }, " (abre en una pestaña nueva)")]) : null
      ]));
    } else {
      var lista = h("ul", { class: "eventos" });
      proximos.forEach(function (e) {
        var p = e.fecha.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
        var accion = e.accion === "whatsapp"
          ? h("a", { class: "btn btn--linea", href: O.enlace("whatsapp", "Hola Ocre, quiero información sobre el evento " + e.nombre + " (" + e.fecha + ")."), target: "_blank", rel: "noopener noreferrer" }, "Pedir información")
          : h("a", { class: "btn btn--solido", href: O.enlace("reservas"), target: "_blank", rel: "noopener noreferrer" }, "Reservar");
        lista.appendChild(h("li", { class: "cartel" + (e.foto ? " cartel--foto" : "") }, [
          e.foto ? h("div", { class: "cartel__foto" }, O.foto(e.foto, { ancho: 4, alto: 5, alt: "Afiche de " + e.nombre, sizes: "(max-width: 760px) 100vw, 30vw" })) : null,
          h("p", { class: "cartel__fecha" }, [String(d.getDate()), h("small", null, d.toLocaleDateString("es-CO", { weekday: "long" }) + ", " + d.toLocaleDateString("es-CO", { month: "long" }))]),
          h("div", { class: "cartel__cuerpo" }, [
            h("h4", null, e.nombre),
            e.artista ? h("p", { class: "cartel__artista" }, e.artista) : null,
            e.inicio ? h("p", { class: "cartel__hora" }, O.hora12(e.inicio) + (e.fin ? " – " + O.hora12(e.fin) : "")) : null,
            e.descripcion ? h("p", null, e.descripcion) : null
          ]),
          accion
        ]));
      });
      ev.appendChild(lista);
    }

    var dj = document.getElementById("sounds-djs");
    if (!(D.djs || []).length) {
      dj.appendChild(vacio("Presentaremos aquí a nuestros residentes e invitados.", "Cada artista tendrá su ficha con fotografía, biografía y enlaces a su música."));
    } else {
      var grid = h("ul", { class: "artistas" });
      D.djs.forEach(function (a) {
        grid.appendChild(h("li", { class: "artista" }, [
          O.foto(a.foto, { ancho: 4, alto: 5, alt: "Retrato de " + a.nombre, sizes: "(max-width: 760px) 100vw, 25vw" }),
          h("h4", null, a.nombre),
          h("p", { class: "artista__rol" }, (a.rol === "residente" ? "Residente" : "Artista invitado") + (a.estilos && a.estilos.length ? ". " + a.estilos.join(", ") : "")),
          a.bio ? h("p", null, a.bio) : null,
          (a.enlaces || []).length ? h("ul", null, a.enlaces.map(function (l) { return h("li", null, h("a", { href: l.url, target: "_blank", rel: "noopener noreferrer" }, l.etiqueta)); })) : null
        ]));
      });
      dj.appendChild(grid);
    }

    if ((D.archivo || []).length) {
      document.getElementById("sounds-archivo-bloque").hidden = false;
      var arc = h("ul", { class: "artistas" });
      D.archivo.forEach(function (f) { arc.appendChild(h("li", { class: "artista" }, [O.foto(f.foto, { ancho: f.ancho || 4, alto: f.alto || 5, alt: f.titulo }), h("p", null, f.titulo + (f.fecha ? ", " + O.fechaLarga(f.fecha) : ""))])); });
      document.getElementById("sounds-archivo").appendChild(arc);
    }
  }

  /* ---------- Noches Ocre ---------- */
  function noches() {
    var ul = document.getElementById("ocasiones");
    if (!ul || !O.experiencias) return;
    O.experiencias.forEach(function (x) {
      var a;
      if (x.accion === "whatsapp") a = h("a", { href: O.enlace("whatsapp", x.mensaje), target: "_blank", rel: "noopener noreferrer" }, ["Consultar por WhatsApp", h("span", { class: "sr" }, " sobre " + x.titulo + " (abre en una pestaña nueva)")]);
      else if (x.accion === "instagram") a = h("a", { href: O.enlace("instagram"), target: "_blank", rel: "noopener noreferrer" }, ["Ver Instagram", h("span", { class: "sr" }, " (abre en una pestaña nueva)")]);
      else a = h("a", { href: O.enlace("reservas"), target: "_blank", rel: "noopener noreferrer" }, ["Reservar en Cluvi", h("span", { class: "sr" }, " para " + x.titulo + " (abre en una pestaña nueva)")]);
      ul.appendChild(h("li", { class: "ocasion" }, [
        h("figure", { class: "ocasion__foto" }, [
          O.foto(x.foto, { ancho: x.ancho || 2, alto: x.alto || 3, alt: x.leyenda ? x.leyenda + ", fotografía de la carta de Ocre" : x.titulo, encargo: x.foto ? null : "Imagen de " + x.titulo.toLowerCase() + " en producción.", sizes: "(max-width: 760px) 78vw, 30vw" }),
          x.leyenda ? h("figcaption", { class: "leyenda" }, ["En la imagen: ", h("em", null, x.leyenda)]) : null
        ]),
        h("h3", null, x.titulo), h("p", null, x.texto),
        h("p", { class: "ocasion__acciones" }, [a, x.enlace ? h("a", { class: "ocasion__enlace", href: x.enlace }, "Conocer el espacio") : null])
      ]));
    });
  }

  /* ---------- Carta ---------- */
  function carta() {
    var C = O.carta, tabs = document.getElementById("carta-tabs"), paneles = document.getElementById("carta-paneles");
    if (!C || !tabs) return;
    document.getElementById("carta-fuente").textContent = (C.mostrarPrecios ? C.notaPrecios + " " : "") + "Fuente: " + C.fuente + " (consultada el " + O.fechaLarga(C.consultado) + ").";
    document.getElementById("carta-legal").textContent = "El exceso de alcohol es perjudicial para la salud. Prohíbese el expendio de bebidas embriagantes a menores de edad. Si tienes alergias o restricciones alimentarias, infórmalo al equipo antes de ordenar.";
    var botones = [];
    C.secciones.forEach(function (s, i) {
      var b = h("button", { class: "carta__tab", type: "button", role: "tab", id: "tab-" + s.id, "aria-controls": "panel-" + s.id, "aria-selected": i === 0 ? "true" : "false", tabindex: i === 0 ? "0" : "-1" }, s.titulo);
      b.addEventListener("click", function () { seleccionar(i, false); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (e.key === "Home") { e.preventDefault(); seleccionar(0, true); }
        if (e.key === "End") { e.preventDefault(); seleccionar(botones.length - 1, true); }
        if (d) { e.preventDefault(); seleccionar((i + d + botones.length) % botones.length, true); }
      });
      botones.push(b); tabs.appendChild(b);

      var panel = h("div", { class: "carta__panel", role: "tabpanel", id: "panel-" + s.id, "aria-labelledby": "tab-" + s.id, tabindex: "0", hidden: i === 0 ? null : true }, [
        h("p", { class: "carta__intro" }, s.intro)
      ]);
      if (s.compacta) panel.appendChild(barra(s, C.mostrarPrecios));
      else {
        var ul = h("ul", { class: "platos" });
        s.items.forEach(function (it) {
          ul.appendChild(h("li", { class: it.foto ? "plato plato--foto" : "plato" }, [
            it.foto ? O.foto(it.foto, { ancho: it.ancho || 4, alto: it.alto || 5, alt: it.alt || it.nombre, sizes: "120px" }) : null,
            h("h3", null, it.nombre),
            C.mostrarPrecios && it.precio ? h("p", { class: "plato__precio" }, O.precio(it.precio)) : null,
            it.frase ? h("p", { class: "plato__frase" }, it.frase) : null,
            it.desc ? h("p", { class: "plato__desc" }, it.desc) : null,
            it.perfil && it.perfil.length ? h("p", { class: "plato__perfil" }, it.perfil.join(" · ")) : null,
            it.autor ? h("p", { class: "plato__autor" }, "De autor") : null
          ]));
        });
        panel.appendChild(ul);
      }
      paneles.appendChild(panel);
    });

    function seleccionar(i, foco) {
      botones.forEach(function (b, j) {
        var on = j === i;
        b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
      if (foco) botones[i].focus();
      botones[i].scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  function barra(s, conPrecios) {
    var wrap = h("div", { class: "barra-carta" });
    s.grupos.forEach(function (g) {
      var cols = g.columnas || s.columnas;
      var t = h("table", null, [
        h("caption", null, g.titulo),
        conPrecios ? h("thead", null, h("tr", null, [h("th", { scope: "col" }, h("span", { class: "sr" }, "Producto")), h("th", { scope: "col" }, cols[0] || h("span", { class: "sr" }, "Sin presentación")), h("th", { scope: "col" }, cols[1])])) : null,
        h("tbody", null, g.items.map(function (it) {
          return h("tr", null, [h("th", { scope: "row", style: "font-weight:300" }, it.nombre)].concat(conPrecios ? [
            h("td", null, it.precios[0] ? O.precio(it.precios[0]) : h("span", { "aria-label": "No disponible" }, "—")),
            h("td", null, it.precios[1] ? O.precio(it.precios[1]) : "—")
          ] : []));
        }))
      ]);
      wrap.appendChild(t);
    });
    return wrap;
  }

  /* ---------- Reseñas ---------- */
  function resenas() {
    var g = S.google, cal = document.getElementById("calificacion");
    if (cal && g && g.valor) {
      cal.appendChild(h("p", { class: "calificacion__valor" }, [String(g.valor).replace(".", ","), h("span", null, " / 5")]));
      cal.appendChild(h("p", null, "Calificación en Google con " + g.total + " opiniones, consultada el " + O.fechaLarga(g.consultado) + ". La cifra se actualiza en Google."));
    } else if (cal) cal.hidden = true;
    var R = O.resenas || [], ul = document.getElementById("testimonios");
    if (R.length && ul) {
      ul.hidden = false;
      R.forEach(function (r) {
        ul.appendChild(h("li", null, h("figure", null, [
          h("blockquote", { cite: r.url || null }, h("p", null, "“" + r.texto + "”")),
          h("figcaption", null, [r.autor + " en Google", r.fecha ? ", " + r.fecha : "", r.url ? h("span", null, [". ", h("a", { href: r.url, target: "_blank", rel: "noopener noreferrer" }, "Ver reseña")]) : null])
        ])));
      });
    }
  }

  /* ---------- Solicitud por WhatsApp ---------- */
  function solicitud() {
    var f = document.getElementById("solicitud");
    if (!f) return;
    if (!O.enlace("whatsapp")) { f.hidden = true; return; }
    var fecha = f.fecha, estado = document.getElementById("solicitud-estado");
    fecha.min = O.hoyISO();
    function err(campo, msj) {
      var p = document.getElementById("e-" + campo), input = f[campo];
      p.textContent = msj || "";
      if (msj) { input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", "e-" + campo); }
      else { input.removeAttribute("aria-invalid"); input.removeAttribute("aria-describedby"); }
      return !msj;
    }
    function limpiar(t) { return String(t || "").replace(/[\u0000-\u001F\u007F<>]/g, " ").replace(/\s+/g, " ").trim(); }
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      estado.textContent = "";
      var nombre = limpiar(f.nombre.value), personas = parseInt(f.personas.value, 10);
      var ok = [
        err("nombre", nombre.length < 2 ? "Escribe tu nombre (mínimo 2 caracteres)." : ""),
        err("fecha", !f.fecha.value ? "Elige una fecha." : f.fecha.value < O.hoyISO() ? "La fecha no puede ser anterior a hoy." : ""),
        err("personas", !(personas >= 1 && personas <= 200) ? "Indica un número de personas entre 1 y 200." : ""),
        err("autoriza", !f.autoriza.checked ? "Para enviar la solicitud necesitamos tu autorización para tratar los datos." : "")
      ].every(Boolean);
      if (!ok) { var inv = f.querySelector('[aria-invalid="true"]'); if (inv) inv.focus(); return; }
      var notas = limpiar(f.notas.value).slice(0, 400);
      var texto = [
        "Hola Ocre, quiero solicitar una reserva.",
        "Nombre: " + nombre,
        "Fecha: " + O.fechaLarga(f.fecha.value),
        "Hora aproximada: " + f.hora.value,
        "Personas: " + personas,
        "Ocasión: " + f.ocasion.value,
        notas ? "Notas: " + notas : null,
        "Autorizo el tratamiento de mis datos para gestionar esta solicitud.",
        "Comunicaciones comerciales: " + (f.comercial.checked ? "Sí, acepto recibirlas." : "No.")
      ].filter(Boolean).join("\n");
      // Sin "noopener" en las características: con él window.open devuelve siempre null
      // y no se podría detectar un bloqueo. Se corta la referencia manualmente.
      var w = window.open(O.enlace("whatsapp", texto), "_blank");
      if (w) { try { w.opener = null; } catch (er) { /* sin acceso */ } }
      estado.textContent = w === null
        ? "Tu navegador bloqueó la ventana. Permite ventanas emergentes o escríbenos directamente por WhatsApp."
        : "Se abrió WhatsApp con tu solicitud. Envía el mensaje desde allí; te responderemos para confirmar disponibilidad.";
    });
    ["nombre", "fecha", "personas", "autoriza"].forEach(function (c) {
      f[c].addEventListener("change", function () { err(c, ""); });
    });
  }

  /* ---------- Visítanos ---------- */
  function visitanos() {
    var est = document.getElementById("estado-abierto");
    if (est) {
      var s = O.estadoHorario();
      est.textContent = s ? s.texto + " (hora de Medellín). En festivos, confirma el horario por WhatsApp." : "";
    }
    var mapa = document.getElementById("mapa"), btn = document.getElementById("mapa-cargar");
    var url = O.enlace("googleMapsEmbed");
    if (!mapa || !url) { if (mapa) mapa.hidden = true; return; }
    function cargar() {
      if (mapa.querySelector("iframe")) return;
      mapa.appendChild(h("iframe", { src: url, title: "Mapa de Google con la ubicación de Ocre", loading: "lazy", referrerpolicy: "strict-origin-when-cross-origin", allowfullscreen: true }));
      var aviso = mapa.querySelector(".mapa__aviso"); if (aviso) aviso.remove();
    }
    btn.addEventListener("click", function () { O.consentimiento.otorgar("terceros"); cargar(); });
    if (O.consentimiento.tiene("terceros")) cargar();
    O.consentimiento.alCambiar(function (v) { if (v.terceros) cargar(); });
  }

  /* ---------- Barra móvil: aparece al dejar la portada ---------- */
  function barraMovil() {
    var b = document.getElementById("barra-movil"), hero = document.getElementById("inicio"), res = document.getElementById("reservas");
    if (!b || !("IntersectionObserver" in window)) { if (b) b.classList.add("is-visible"); return; }
    var enHero = true, enReservas = false;
    var act = function () { b.classList.toggle("is-visible", !enHero && !enReservas); b.inert = enHero || enReservas; };
    new IntersectionObserver(function (e) { enHero = e[0].isIntersecting; act(); }, { threshold: .15 }).observe(hero);
    new IntersectionObserver(function (e) { enReservas = e[0].isIntersecting; act(); }, { threshold: .2 }).observe(res);
  }

  /* ---------- Los espacios: Dance Floor, Sombras, Sentidos ----------
     Cada espacio tiene su propia composición (clase espacio--<id>). */
  function espacios() {
    var lista = document.getElementById("espacios-lista"), indice = document.getElementById("espacios-indice");
    if (!lista || !O.espacios) return;
    O.espacios.forEach(function (e, n) {
      var accion = e.accion && e.accion.tipo === "whatsapp"
        ? h("a", { class: "btn btn--linea", href: O.enlace("whatsapp", e.accion.mensaje), target: "_blank", rel: "noopener noreferrer" }, [e.accion.texto, h("span", { class: "sr" }, " sobre " + e.nombre + " por WhatsApp (abre en una pestaña nueva)")])
        : h("a", { class: "btn btn--solido", href: O.enlace("reservas"), target: "_blank", rel: "noopener noreferrer" }, [(e.accion && e.accion.texto) || "Reservar", h("span", { class: "sr" }, " en Cluvi (abre en una pestaña nueva)")]);
      var fotos = (e.fotos || []).map(function (f, j) {
        return h("figure", { class: "espacio__foto espacio__foto--" + (j + 1) + " revela", "data-parallax": j ? "-0.05" : "0.04" }, [
          O.foto(f.foto, { ancho: f.ancho, alto: f.alto, alt: f.alt, encargo: "Fotografía de " + e.nombre + " en producción.", sizes: "(max-width: 760px) 92vw, 46vw" }),
          f.leyenda ? h("figcaption", { class: "leyenda" }, ["En la imagen: ", h("em", null, f.leyenda)]) : null
        ]);
      });
      var cap = e.capacidad && e.capacidad.confirmado ? h("p", { class: "espacio__capacidad" }, e.capacidad.texto) : null;
      var ritmo = e.id === "dance-floor" ? h("span", { class: "espacio__ritmo", "aria-hidden": "true" }, [h("i"), h("i"), h("i"), h("i"), h("i"), h("i"), h("i")]) : null;
      var art = h("article", { class: "espacio espacio--" + e.id, id: "espacio-" + e.id, "aria-labelledby": "espacio-titulo-" + e.id }, [
        h("div", { class: "espacio__fotos" }, fotos),
        h("div", { class: "espacio__texto" }, [
          h("p", { class: "espacio__n", "aria-hidden": "true" }, String(n + 1).padStart(2, "0")),
          h("h3", { class: "espacio__nombre revela-titulo", id: "espacio-titulo-" + e.id }, [e.nombre, ritmo]),
          h("p", { class: "espacio__lema" }, e.lema),
          h("p", { class: "espacio__desc" }, e.texto),
          (e.notas || []).length ? h("ul", { class: "espacio__notas", "aria-label": "Características" }, e.notas.map(function (x) { return h("li", null, x); })) : null,
          cap,
          accion
        ])
      ]);
      lista.appendChild(art);
      if (indice) indice.appendChild(h("a", { href: "#espacio-" + e.id }, [h("span", { "aria-hidden": "true" }, String(n + 1).padStart(2, "0")), e.nombre]));
      if (e.id === "sombras") linterna(art.querySelector(".espacio__fotos"));
    });
  }

  /* Sombras: la foto está en penumbra y una luz cálida sigue al cursor.
     Sin puntero fino o con movimiento reducido, la luz queda fija y suave. */
  function linterna(cont) {
    if (!cont) return;
    cont.classList.add("linterna");
    var fino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fino || reducido) { cont.classList.add("linterna--fija"); return; }
    var pend = null;
    cont.addEventListener("pointermove", function (ev) {
      var r = (cont.querySelector(".foto") || cont).getBoundingClientRect();
      var x = ((ev.clientX - r.left) / r.width) * 100, y = ((ev.clientY - r.top) / r.height) * 100;
      if (pend) return;
      pend = requestAnimationFrame(function () { pend = null; cont.style.setProperty("--lx", x + "%"); cont.style.setProperty("--ly", y + "%"); });
    });
    cont.addEventListener("pointerenter", function () { cont.classList.add("is-iluminada"); });
    cont.addEventListener("pointerleave", function () { cont.classList.remove("is-iluminada"); });
  }

  /* Revelados al desplazarse: titulares, fotografías y piezas. */
  function revelarComposiciones() {
    document.querySelectorAll("main .titulo-seccion").forEach(function (t) { t.classList.add("revela-titulo"); });
    document.querySelectorAll(".ocasion__foto, .reservas__foto, .cartel, .trazo").forEach(function (f) { f.classList.add("revela"); });
    if (O.revelar) O.revelar(document);
  }
  function revelarPiezas(cont) {
    var items = cont.querySelectorAll(".pieza");
    if (!document.documentElement.classList.contains("js-revela") || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("is-visible"); io.unobserve(x.target); } });
    }, { root: document.getElementById("galeria-cuerpo"), rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (it, i) { it.classList.add("pieza--revela"); it.style.transitionDelay = (i % 2) * 0.12 + "s"; io.observe(it); });
  }

  /* Profundidad: un único bucle de desplazamiento (solo transformaciones).
     - Paralaje moderado en elementos con data-parallax
     - Profundidad de la foto de portada y progreso de lectura en la navegación
     - Luz ambiental que sigue al cursor en la portada (solo puntero fino) */
  function profundidad() {
    var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var nav = document.getElementById("nav"), hero = document.getElementById("inicio");
    var escenario = hero && hero.querySelector(".hero__escenario");
    var capas = [].slice.call(document.querySelectorAll("[data-parallax]"));
    var pendiente = false;
    function cuadro() {
      pendiente = false;
      var y = window.scrollY, vh = window.innerHeight;
      var total = document.documentElement.scrollHeight - vh;
      if (nav) nav.style.setProperty("--progreso", total > 0 ? (y / total).toFixed(4) : 0);
      if (reducido) return;
      if (escenario && y < vh * 1.2) escenario.style.transform = "translate3d(0," + (y * 0.08).toFixed(1) + "px,0)";
      capas.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var centro = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = "translate3d(0," + (centro * parseFloat(el.dataset.parallax) * -160).toFixed(1) + "px,0)";
      });
    }
    function pedir() { if (!pendiente) { pendiente = true; requestAnimationFrame(cuadro); } }
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    pedir();
    // Luz ambiental de la portada
    if (hero && !reducido && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      var p2 = null;
      hero.addEventListener("pointermove", function (ev) {
        if (p2) return;
        p2 = requestAnimationFrame(function () {
          p2 = null;
          var r = hero.getBoundingClientRect();
          hero.style.setProperty("--hx", ((ev.clientX - r.left) / r.width * 100).toFixed(1) + "%");
          hero.style.setProperty("--hy", ((ev.clientY - r.top) / r.height * 100).toFixed(1) + "%");
        });
      });
    }
  }
})();
