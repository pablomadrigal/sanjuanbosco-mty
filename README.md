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
| Horarios de misa, confesiones, adoración, oficina | `misas` y `otrosHorarios` |
| Grupos y pastorales | `grupos` |
| Las comunidades de cada pastoral, con día, hora e Instagram | `comunidades`, dentro de cada grupo |
| Comedor Santa Martha y «Adopta un foráneo» | `obras` |
| Sacramentos y sus requisitos | `sacramentos` |
| Convocatorias de formación | `formacion` |
| Qué se junta en la sección de universitarios | `universitarios` |
| Redes, WhatsApp, calendarios, misal | `enlaces` |
| Dirección, misión, equipo sacerdotal | `parroquia`, `equipo` |

El indicador de **«Próxima misa»** de la portada se calcula solo a partir de `misas`, en la
zona horaria de Monterrey. Si cambian los horarios, se actualiza sin tocar nada más.

## La sección para universitarios

Somos parroquia universitaria y cada agosto llega gente que no conoce nada. Lo que se decide
en una tarde —a qué grupo entrar, si confirmarse, dónde comer— estaba repartido en cuatro
páginas, y el comedor Santa Martha y «Adopta un foráneo» no estaban en ninguna.

`/universitarios` junta todo eso en un índice, **sin duplicar una línea de texto**: cada ficha
se escribe una sola vez en su lista de siempre (`grupos`, `obras`, `sacramentos`, `formacion`) y
la sección sólo la referencia por su `slug`. `universitarios.bloques` dice qué se junta y en qué
orden, y `resolver()` va por el texto y el enlace. Si mañana cambia la descripción de Alpha,
cambia en los dos lados a la vez.

Las páginas por separado siguen intactas: **esto se suma, no sustituye**. Cada bloque de la
sección termina con un enlace a la página completa de la que salió, y las obras tienen además su
propio apartado en `/grupos#obras`.

Para agregar algo a la sección basta con una línea nueva en `universitarios.bloques`:
`{ lista: "grupos", slug: "liturgica" }`.

### Pastoral no es lo mismo que grupo

Nadie se junta con una pastoral: se junta con Semana U un sábado a las cuatro. La pastoral es la
puerta y la **comunidad** es a lo que llegas, así que el día, la hora y la cuenta de Instagram
viven en `comunidades`, dentro de la pastoral de la que cuelgan —que es como las clasifica el
directorio de la parroquia—. En `/grupos` se leen como una nota al margen de su pastoral y en
`/universitarios` se juntan las que llevan `uni: true`.

Estos datos salen del [directorio de grupos](https://sites.google.com/arquidiocesismty.org/grupos-sjb),
que se llena por ciclo escolar: **conviene repasarlos cada agosto**, cuando los grupos vuelven a
arrancar. No están todos —el directorio tiene apartados vacíos, entre ellos el de Pastoral
Universitaria— y los teléfonos personales de los coordinadores no se publicaron aquí a
propósito: están en el directorio, que es de la parroquia, no en una página indexable.

## Escalas

Todo lo que se repite tiene una escala corta y cerrada en `app/globals.css`. Antes no la tenía
—había siete grises de texto, cinco opacidades de regla, cuatro radios y tres duraciones,
elegidos a ojo— y una escala que cambia cada dos pantallas se lee como descuido.

| Escala | Valores | Nota |
| --- | --- | --- |
| Texto atenuado | `text-suave`, `text-tenue` | Los dos pasan 4.5:1 sobre el fondo. Debajo de `tenue` no hay nada |
| Reglas | `border-regla`, `border-regla-viva` | La que divide y la que rodea algo que se toca |
| Radios | `rounded-xs … rounded-xl` (6–22 px), `rounded-full` | Arranca chica: 24 px en una pantalla de 390 px se ve inflado |
| Duraciones | 120 ms al toque, 180 ms a la respuesta, 520 ms a la entrada | Nada que conteste al dedo pasa de 200 ms |
| Ritmo vertical | `seccion` | Una sola medida de aire entre secciones, más corta en el teléfono |

## Cómo se mueve

Somos una parroquia universitaria y la página tiene que sonar a eso. El principio es uno:
**el scroll es lo que avanza por el camino**. Pero una animación deja de deleitar la segunda vez
que la ves, y en un sitio de seis páginas cortas eso pasa antes de terminar la primera, así que
el presupuesto de movimiento es corto y cada gasto se justifica.

**Entrada.** Una sola: `Reveal` sube el bloque 10 px y lo desvanece. `tipo="escala"` es la
excepción y se reserva al bloque que cierra cada página. `<Palabras>` arma el titular palabra por
palabra **sólo en el H1**, por reloj: es el único de la pantalla, se ve una vez y no depende del
scroll. Lo decorativo lleva `data-deriva` y avanza a otra velocidad que el texto, que es de donde
sale la sensación de profundidad.

**Pulso.** Lo poco que se mueve sin que nadie haga nada: la marquesina (`Marquesina.tsx`) —una
sola pista en el teléfono, dos cruzándose en escritorio—, el latido de «próxima misa», que dice
que el dato está vivo, y la flecha de «desliza», que es la instrucción, no un adorno.

**Respuesta.** Todo lo que se toca contesta, en 120 ms. Cada estado `hover:` tiene su `active:`,
porque en un teléfono el primero no ocurre nunca.

Las tres se apagan solas con `prefers-reduced-motion: reduce`, y todo lo que depende del scroll
vive dentro de `@supports (animation-timeline: view())`: si el navegador no lo soporta, el
contenido simplemente ya está ahí. Verificado con el script apagado y con movimiento reducido.

> **Lo que se fue, y por qué.** Entradas laterales alternadas (36 px de vaivén horizontal en cada
> renglón de una lista de diez, uno para cada lado, mientras alguien lee en un teléfono);
> titulares armándose palabra por palabra en cada sección (ligados al scroll, dejaban el título
> medio transparente justo mientras se leía); un brillo cruzando el botón principal cada cinco
> segundos para siempre; el lema flotando; el bamboleo de la calcomanía —que se queda torcida y
> quieta, que es de donde venía la gracia—. Si vuelves a agregar movimiento, la pregunta no es si
> se ve bien la primera vez: es si molesta la décima.

La energía visual usa sólo la paleta de siempre: bloques en `panel-azul`, `numero` para la banda
de cifras —que se cuenta sola desde `misas`, `grupos` y `sacramentos`—, `indice` para numerar y
`acento` para las palabras en cursiva.

### Que no parezca hecho por una máquina

Lo que delata a una página generada no es el color: es que **todo sea una tarjeta redondeada en
una rejilla de columnas iguales**, que cada sección tenga la misma estructura y que el fondo sea
un degradado impecable. Contra eso:

- **Casi no quedan tarjetas.** La información vive sobre el fondo, separada por reglas. Listas
  largas —las diez pastorales, las tres puertas de la portada— van como el índice de un libro:
  número en el margen, nombre grande, una línea de qué hay detrás. La única caja que sobrevive
  es el bloque azul del cierre, y por eso funciona: es la excepción.
- **Una franja de día a media página.** `components/Cifras.tsx` es blanco y tinta —los dos del
  manual, ningún color nuevo— en medio de seis pantallas de azul noche. Seis pantallas del mismo
  tono con reglas de un píxel se leen serias y, de tanto parecerse entre sí, plantilla. El corte
  es uno solo, y por eso pega.
- **Las rejillas son asimétricas cuando el dato lo es.** El domingo tiene ocho misas y el sábado
  tres, así que el domingo ocupa una columna y media y los otros dos se apilan detrás de una
  regla. La jerarquía sale de `misas`, no de una decisión escrita a mano.
- **Grano encima de todo** (`grano`, en `app/layout.tsx`). Una capa fija de ruido al 5 %, texto
  incluido. Es lo que hace que una superficie parezca impresa en vez de renderizada.
- **Trazos a mano.** Dentro de un titular, `_palabra_` le pone un subrayado torcido que se dibuja
  al aparecer y `=palabra=` la remarca con plumón. La curva es irregular a propósito: una línea
  recta se lee como un borde de CSS. El plumón no se anima —aparece en varias páginas y un trazo
  que se dibuja solo se gasta—, el subrayado sí, porque va una vez por página.
- **Cosas pegadas torcidas.** `calcomania` rota un elemento cinco grados y lo deja así.
- **No todo lo que se ofrece es un botón.** Dos píldoras apiladas repetidas cinco veces son la
  firma de una plantilla. Cuando la segunda opción no compite con la primera, es un
  `EnlaceFlecha`: un enlace subrayado, sin marco.
- **Contraste de escala.** Los números de la banda de cifras son enormes y sus etiquetas
  diminutas; las horas del domingo son el triple que las del sábado. El H1 de la portada es
  tipografía compuesta, no una imagen: el lema de la marca firma abajo.

Cuidado al quitar cajas: son también lo que separaba el texto del camino. La viñeta de
`components/three/Camino.tsx` es ahora lo único que lo hace, así que si oscureces menos, revisa
que una hora de misa se siga leyendo encima de un faro.

**Lo que más ayudaría y no está en el código: fotos reales de la parroquia.** Ningún truco de
CSS sustituye una foto de la gente que va a misa el domingo.

## Mobile first

Casi todo el que entra al sitio lo hace desde el celular, así que el teléfono no es el caso
que hay que "soportar": es el caso base. Los estilos empiezan en la pantalla chica y los
`breakpoints` sólo **agregan** cuando hay ancho de sobra, nunca al revés.

Lo que eso significa en concreto:

| Decisión | Dónde |
| --- | --- |
| Barra de acciones al alcance del pulgar (horarios, cómo llegar, WhatsApp) | `components/AccionesMovil.tsx` |
| Menú de pantalla completa, con su propio scroll y sus botones abajo (hasta `xl`: siete destinos ya no caben en la barra a 1024 px) | `components/Nav.tsx` |
| Botones de ancho completo y objetivos táctiles de 44 px (`toque`) | `components/ui.tsx`, `app/globals.css` |
| Una sola pista de marquesina; la segunda sólo cuando hay ancho que la sostenga | `components/Marquesina.tsx` |
| «Próxima misa» en la primera pantalla: es el dato por el que casi todos llegan | `app/page.tsx` |
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

Se buscaron y no están. Lo que se revisó, para no repetir la búsqueda:

| Fuente | Qué se sacó |
| --- | --- |
| `sanjuanbosco.mx` | Cinco páginas en total (se enumeraron por su `wp-sitemap.xml`). La de horarios sigue publicando el horario viejo de confesiones |
| Directorio de grupos | Casi todas las comunidades, con día, hora e Instagram. Los apartados del comedor están vacíos |
| Linktree | Las convocatorias y el misal de la semana |
| YouTube | Quince descripciones de video. Nada del comedor; aparece un grupo «AmorEs», de talleres para mayores de 18, que no está en el directorio |
| Instagram | **Cerrado.** El perfil redirige y su API pública responde `require_login` |
| Facebook | **Cerrado.** Muro de inicio de sesión en las tres variantes, incluida la móvil |

O sea: **lo que sólo se anunció en las redes no se puede verificar desde fuera.** El lugar de las
confesiones y el día del comedor los pasó la parroquia; lo que sigue abajo, todavía no.

- **Comedor Santa Martha.** Ya se publica el día —lunes al mediodía, dato de la parroquia—.
  Falta para quién es y cómo se apunta quien quiera servir; su ficha en el directorio sigue
  vacía. En la misma lista están «Miércoles de Chilidogs», «Beatus» y «Entretejiendo Vidas», que
  no se publicaron aquí porque no se sabe nada de ellos.
- **Adopta un foráneo.** No aparece en ninguna fuente pública. Falta cuándo se abre la
  convocatoria del año y a dónde se escribe para entrar, como estudiante o como familia.
- **El sitio viejo dice otra cosa.** Mientras `sanjuanbosco.mx` siga en pie con el horario
  anterior, las dos páginas de la parroquia se contradicen. Hay que actualizarlo o apagarlo
  cuando éste lo sustituya.
- **Pastoral Universitaria.** Su página en el directorio está vacía. Lo que hoy sostiene la
  sección de universitarios son Semana U, Misiones Don Bosco, Mater Dei y Alpha; si la pastoral
  tiene sus propias juntas, faltan.
- **El misal caduca cada domingo.** `enlaces.misal` es un diseño de Canva distinto cada semana:
  el que estaba llevaba un mes en el domingo XIX. O se actualiza junto con el Linktree, o se
  apunta el botón al Linktree —un toque más, pero nunca viejo—.
- **Rosario.** El directorio lo pone de martes a viernes a las 18:15 en el templo. No se publicó
  por no llenar de renglones la tabla de horarios; si se quiere, es una línea en `otrosHorarios`.
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
