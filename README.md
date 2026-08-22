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
