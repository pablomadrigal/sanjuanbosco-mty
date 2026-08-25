@AGENTS.md

## Este proyecto

Sitio de la Parroquia Universitaria San Juan Bosco (Monterrey). Ver `README.md`.

- Todo el contenido editable vive en `lib/site.ts`. No pongas textos sueltos en los componentes.
- La paleta está cerrada al manual de marca 2021 (`app/globals.css`). No agregues colores nuevos.
- Las escalas también están cerradas: `text-suave`/`text-tenue` para texto atenuado,
  `border-regla`/`border-regla-viva` para reglas, `rounded-xs…xl` para radios y `seccion`
  para el aire entre secciones. No inventes una opacidad, un radio ni un margen a ojo;
  si de verdad falta un escalón, agrégalo a la escala. Ver «Escalas» en `README.md`.
- Las animaciones de entrada son CSS puro para que el contenido se lea sin JavaScript.
  No las conviertas en `whileInView` ni en nada que dependa de hidratación. El kit de
  movimiento vive en `app/globals.css`: usa `Reveal`, `<Palabras>` y `data-deriva`
  antes de inventar una animación nueva. Ver «Cómo se mueve» en `README.md`.
- El presupuesto de movimiento es corto y ya se recortó una vez. Antes de agregar una
  animación, la pregunta no es si se ve bien la primera vez: es si molesta la décima.
  Nada que conteste a un toque pasa de 200 ms, y nada decorativo se repite en bucle
  para siempre. `<Palabras entrada>` es sólo para el H1 de una página.
- El sitio es mobile first, no sólo responsive: la mayoría entra desde el celular. Escribe el
  estilo del teléfono sin prefijo y deja `sm:`/`md:`/`lg:` para lo que se agrega en pantallas
  grandes; nunca al revés. Lo caro —WebGL, `backdrop-filter`, scroll suave— entra sólo cuando
  el aparato puede pagarlo. Ver «Mobile first» en `README.md`.
- No subas archivos de la tipografía Gotham: el repositorio es público y su licencia no lo permite.
