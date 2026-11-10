# Pendientes para los propietarios de Ocre

Todo lo que aparece en el sitio como «Pendiente» o como marco «Fotografía oficial pendiente» depende de esta lista. Casi todos los datos se cambian en **un solo archivo: `content/sitio.js`**.

## 1. Antes de publicar (imprescindible)

| Dato | Dónde se cambia | Notas |
|---|---|---|
| Razón social, NIT, representante legal, domicilio | `content/sitio.js` → `legal` | Aparecen en las 5 páginas legales. No se inventaron. |
| Correo y teléfono para datos personales; persona o área responsable | `content/sitio.js` → `legal` | Canal obligatorio para consultas y reclamos (Ley 1581). |
| Fecha de entrada en vigencia de la política | `content/sitio.js` → `legal.fechaVigencia` | Formato `AAAA-MM-DD`. |
| **Revisión jurídica** de `legal/*.html` | Cada archivo | Son borradores. Quitar el recuadro «Borrador» solo después de la aprobación. |
| Dominio definitivo | `content/sitio.js` → `dominio`, `robots.txt`, `sitemap.xml` | Reemplazar `DOMINIO-PENDIENTE`. Activa la URL canónica y `og:url`. Poner una URL absoluta en `og:image` de `index.html`. |
| Confirmar el WhatsApp oficial | `content/sitio.js` → `enlaces.whatsappNumero` | Viene del sitio anterior. Google muestra otro número (304 470 7094). |
| Confirmar el correo | `content/sitio.js` → `enlaces.email` | Viene del sitio anterior. |

## 2. Contenido que falta

- **Fotos entregadas el 2026-11-09** (23): cocina (6), bar oculto (8), arte (3), sonoridad (1) y 5 platos servidos. Confirmar la **autorización de imagen** de las personas reconocibles (equipo de cocina, bartender, siluetas).
- **Fotos que aún faltan**:
  - Platos servidos de: Molcajete, Feta encurtido, Lomo duxelle, Chicken Sticky, Pollo & Brasa, Crudo de atún, Salmón Ocre y Sticky Pudding (hoy muestran la foto de ingredientes, con leyenda «Ingredientes de…»).
  - Sin ninguna foto: Papas Ocre, Caviar Ocre, Oishi, Selva y Ascua.
  - Sonoridad: cabina, noche con público y artistas. Arte: un muro u obra principal.
  - Video de portada (opcional).
- **Storytelling de cócteles**: incorporado para los 9 de autor desde el documento de Ocre. Los clásicos y mocktails no tienen relato; si se escribe, va en `content/carta.js` (campos `frase`, `perfil`, `historia`).
- Para agregar más fotos: ver `docs/FOTOGRAFIAS.md` (cada marco pendiente describe la toma prevista).
- **DJs y artistas** (residentes e invitados): nombre, foto, biografía aprobada, estilos y enlaces → `content/sonidos.js`.
- **Eventos**: nombre, fecha, horario, artista, afiche y descripción → `content/sonidos.js`. Los eventos pasados se ocultan solos.
- **Estilos musicales** de la casa → `content/sonidos.js` → `estilos`.
- **Reseñas destacadas**: solo textos literales de Google, con enlace → `content/resenas.js`.
- **Condiciones de reserva** (tolerancia, cancelación, depósitos, consumo mínimo) → `legal/terminos.html`, sección 3.
- **¿Los precios incluyen impuestos? ¿Cómo se informa la propina voluntaria?** → `legal/terminos.html`, sección 4.
- Confirmar «Desde 2025» (`content/sitio.js` → `desde`).

## 2b. Espacios (Dance Floor, Sombras, Sentidos)

- **Confirmar las fotos asignadas a Dance Floor** (`bar-umbral` y `bar-barra`): se eligieron porque muestran la barra y el equipo de sonido. Lo ideal es una foto frente a la cabina del DJ con ambiente de baile.
- **Capacidad de Sentidos**: en `content/espacios.js` está guardada como orientativa («alrededor de cinco mesas para 4 a 6 personas») y **no se muestra**. Para publicarla, confirmarla con el establecimiento y poner `confirmado: true`.
- Más fotos de **Sombras** (solo hay una) y de **Sentidos** con mesas servidas, con autorización de las personas que aparezcan.

## 3. Decisiones para el asesor legal

- Si Cluvi actúa como **encargado** del tratamiento y el contrato correspondiente.
- Transferencias o transmisiones internacionales (WhatsApp/Meta, Google, alojamiento).
- Si existe **videovigilancia** en el local (requiere aviso visible).
- Obligación de inscribir bases de datos en el **RNBD** de la SIC.
- Horarios y frecuencias de contacto comercial según la **Ley 2300 de 2023**.
- Períodos de conservación de cada base de datos.

## 4. Verificar cada cierto tiempo

- **Carta y precios**: se transcribieron de Cluvi el 9-nov-2026 (`content/carta.js`). Si cambian en Cluvi, actualizar aquí y cambiar `consultado`.
- **Calificación de Google**: 4,9 con 557 opiniones al 9-nov-2026 (`content/sitio.js` → `google`). Actualizar cifra y fecha, o poner `valor: null` para ocultarla.
- **Horario**: confirmar festivos y temporadas especiales.

## 5. Mejoras opcionales

- Alojar las tipografías en el propio servidor (evita enviar la IP de los visitantes a Google Fonts y mejora la velocidad).
- Si se quiere analítica: definir proveedor en `content/sitio.js` → `analitica` e integrarla en `assets/js/core.js` (`cargarAnalitica`). Ya se carga solo con consentimiento; habría que añadir su dominio a la CSP y a la política de cookies.
