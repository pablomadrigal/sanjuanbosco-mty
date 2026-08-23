# Parroquia Universitaria San Juan Bosco · Monterrey

Sitio web de la Parroquia Universitaria San Juan Bosco, Arquidiócesis de Monterrey.

El lema 2026 de la parroquia es **«Camino de encuentro que forma discípulos»**, así que la
página entera *es* ese camino: una carretera en 3D que serpentea hacia una cruz encendida en
el horizonte, y el scroll es lo que avanza por ella. Cada sección es una parada del camino, y
al llegar al final aparece la cruz.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** — los tokens de marca viven en `app/globals.css`
- **three.js** vía `@react-three/fiber` — la escena está en `components/three/CaminoScene.tsx`
- **Lenis** para el scroll suave
- Animaciones de entrada en **CSS puro** (`animation-timeline: view()`), sin JavaScript:
  si el script no carga, el contenido igual se lee

## Correr en local

```bash
pnpm install
pnpm dev
```

## Editar el contenido

Casi todo el texto del sitio está en un solo archivo: **`lib/site.ts`**.

| Qué | Dónde |
| --- | --- |
| Horarios de misa, confesiones, oficina | `misas` y `otrosHorarios` |
| Grupos y pastorales | `grupos` |
| Sacramentos y sus requisitos | `sacramentos` |
| Convocatorias de formación | `formacion` |
| Redes, WhatsApp, calendarios, misal | `enlaces` |
| Dirección, misión, equipo sacerdotal | `parroquia`, `equipo` |

El indicador de **«Próxima misa»** de la portada se calcula solo a partir de `misas`, en la
zona horaria de Monterrey. Si cambian los horarios, se actualiza sin tocar nada más.

## Cómo se mueve

Somos una parroquia universitaria y la página tiene que sonar a eso. El principio es uno:
**el scroll es lo que avanza por el camino**, así que la página entera reacciona a él.

Hay tres capas de movimiento, y ninguna depende de JavaScript:

**Ritmo.** Los bloques no entran todos igual. `Reveal` acepta `tipo`: `izq`, `der`, `escala`
—que se pasa de largo y regresa— y `girar` —que llega ladeado y se endereza—. Alternarlos es lo
que hace que recorrer la página no se sienta como pasar diapositivas. Los titulares entran
palabra por palabra con `<Palabras>`, y lo que va entre asteriscos se compone en la serif
cursiva de la marca: `titulo="Hay misa *casi a cualquier hora* que puedas llegar"`.
Lo decorativo lleva `data-deriva` y avanza a otra velocidad que el texto, que es de donde sale
la sensación de profundidad.

**Pulso.** Lo poco que se mueve sin que nadie haga nada: la marquesina que nunca se detiene
(`components/Marquesina.tsx`), el brillo que cruza el botón principal cada cinco segundos —en un
teléfono no hay cursor que lo despierte—, el latido de «próxima misa» y la flecha de «desliza».

**Respuesta.** Todo lo que se toca contesta: las flechas corren, las tarjetas cambian de fondo,
los botones se hunden. Cada estado `hover:` tiene su `active:`, porque en un teléfono el primero
no ocurre nunca.

Las tres se apagan solas con `prefers-reduced-motion: reduce`, y todo lo que depende del scroll
vive dentro de `@supports (animation-timeline: view())`: si el navegador no lo soporta, el
contenido simplemente ya está ahí. Verificado con el script apagado y con movimiento reducido.

La energía visual usa sólo la paleta de siempre: bloques en `panel-azul` para romper la
seguidilla de tarjetas oscuras, `numero` para la banda de cifras —que se cuenta sola desde
`misas`, `grupos` y `sacramentos`—, `indice` para numerar las pastorales y `acento` para las
palabras en cursiva.

## Mobile first

Casi todo el que entra al sitio lo hace desde el celular, así que el teléfono no es el caso
que hay que "soportar": es el caso base. Los estilos empiezan en la pantalla chica y los
`breakpoints` sólo **agregan** cuando hay ancho de sobra, nunca al revés.

Lo que eso significa en concreto:

| Decisión | Dónde |
| --- | --- |
| Barra de acciones al alcance del pulgar (horarios, cómo llegar, WhatsApp) | `components/AccionesMovil.tsx` |
| Menú de pantalla completa, con su propio scroll y sus botones abajo | `components/Nav.tsx` |
| Botones de ancho completo y objetivos táctiles de 44 px (`toque`) | `components/ui.tsx`, `app/globals.css` |
| Horarios en rejilla de dos columnas en el teléfono, uno por renglón en escritorio | `app/page.tsx`, `app/horarios/page.tsx` |
| Márgenes que respetan el notch y la barra de gestos (`env(safe-area-inset-*)`) | `contenedor` en `app/globals.css` |
| Se puede guardar en la pantalla de inicio y abre en los horarios | `app/manifest.ts` |

Y lo que **no** se le cobra a un teléfono:

- **La escena 3D no siempre se enciende.** `components/three/Camino.tsx` la salta si el aparato
  tiene poca memoria, pocos núcleos, red lenta o el ahorro de datos activado. El degradado de
  CSS ya pinta la noche y el alba, así que la página no pierde nada esencial.
- **Cuando sí se enciende, gasta menos.** En pantallas chicas la escena baja la densidad de
  píxeles a 1.25×, apaga el suavizado y recorta estrellas y segmentos (`presupuesto()` en
  `CaminoScene.tsx`). Con la pestaña en segundo plano deja de dibujarse.
- **El desenfoque de fondo es de escritorio.** `backdrop-filter` cuesta una capa de composición
  por tarjeta; en el teléfono las superficies son opacas y se ven igual.
- **Lenis no corre en el dedo.** El scroll suave existe para la rueda del mouse. El teléfono ya
  trae su propia inercia, mejor calibrada, y sustituirla sólo gasta batería.

Al tocar el diseño, la regla es la de siempre: escribe el estilo del teléfono sin prefijo y usa
`sm:`, `md:`, `lg:` para lo que se agrega en pantallas grandes.

## Identidad visual

Paleta oficial del manual *Identidad Visual SJB 2021*, definida en `app/globals.css`:

| Token | Hex | Uso |
| --- | --- | --- |
| `blanco` | `#FFFFFF` | Texto principal |
| `azul-claro` | `#2C5D90` | |
| `azul` | `#2A4A82` | Color primario de marca |
| `azul-profundo` | `#20486B` | Fondo bajo |
| `noche` | `#232038` | Fondo del sitio |
| `tinta` | `#1B1C1B` | Negro de marca |

`alba` (`#7FB2E5`) y `alba-tenue` no son colores nuevos: son aclarados del azul de marca y se
usan sólo para luz, brillos y estados de foco. La energía del sitio viene de la luz, no de un
segundo color.

Los logotipos, el lema 2026, la firma *Siempre Alegres* y la ilustración del templo están en
`public/brand/`, en versión azul y blanca, tomados de los originales del manual.

### Tipografía

La tipografía de marca es **Gotham**, cuya licencia no permite publicarla en un repositorio
abierto, así que **no está incluida en este repo**. El sitio usa **Archivo**, que comparte su
geometría y su altura de x, más **Instrument Serif** en cursiva para las citas de Don Bosco.

Para usar la Gotham real (la parroquia ya tiene los archivos):

1. Compra o confirma la licencia web de Gotham y coloca los `.woff2` en `app/fonts/`.
2. Cambia `Archivo` por `localFont` en `app/layout.tsx`, manteniendo la variable
   `--font-archivo`.
3. Añade `app/fonts/` al `.gitignore` si el repositorio sigue siendo público.

Las frases *«Camino de encuentro»* y *«Siempre Alegres»* no dependen de esto: se muestran con
los archivos originales de marca, no con una fuente sustituta.

## Pendientes de confirmar con la parroquia

- **Teléfono de la oficina.** No se publicó ninguno porque el número que aparece en
  directorios externos está mal formado. Hoy el contacto es por WhatsApp.
- **Dirección.** `Bogotá 211, Col. Alta Vista, 64840` viene de directorios de misas, no del
  sitio oficial. Vale la pena verificarla antes de difundir el sitio.
- **Requisitos de sacramentos.** Son los usuales de la Arquidiócesis; conviene que la oficina
  revise cada lista en `lib/site.ts`.
- **Historia de la parroquia.** No se incluyó fecha de fundación porque las fuentes públicas
  se contradicen.

## Despliegue

Cada push a `main` despliega en Vercel. No hay variables de entorno obligatorias;
`NEXT_PUBLIC_SITE_URL` sólo sirve para fijar el dominio en el sitemap y las tarjetas de
Open Graph si se usa un dominio propio.
