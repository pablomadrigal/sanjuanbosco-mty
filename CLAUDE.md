@AGENTS.md

## Este proyecto

Sitio de la Parroquia Universitaria San Juan Bosco (Monterrey). Ver `README.md`.

- Todo el contenido editable vive en `lib/site.ts`. No pongas textos sueltos en los componentes.
- La paleta está cerrada al manual de marca 2021 (`app/globals.css`). No agregues colores nuevos.
- Las animaciones de entrada son CSS puro para que el contenido se lea sin JavaScript.
  No las conviertas en `whileInView` ni en nada que dependa de hidratación. El kit de
  movimiento vive en `app/globals.css`: usa `Reveal tipo=…`, `<Palabras>` y `data-deriva`
  antes de inventar una animación nueva. Ver «Cómo se mueve» en `README.md`.
- El sitio es mobile first, no sólo responsive: la mayoría entra desde el celular. Escribe el
  estilo del teléfono sin prefijo y deja `sm:`/`md:`/`lg:` para lo que se agrega en pantallas
  grandes; nunca al revés. Lo caro —WebGL, `backdrop-filter`, scroll suave— entra sólo cuando
  el aparato puede pagarlo. Ver «Mobile first» en `README.md`.
- No subas archivos de la tipografía Gotham: el repositorio es público y su licencia no lo permite.
