import Image from "next/image";
import Link from "next/link";
import Cifras from "@/components/Cifras";
import Marquesina from "@/components/Marquesina";
import Palabras from "@/components/Palabras";
import Reveal from "@/components/Reveal";
import ProximaMisa from "@/components/ProximaMisa";
import { BotonPrincipal, Cita, EncabezadoSeccion, EnlaceFlecha } from "@/components/ui";
import {
  enlaces,
  frasesDonBosco,
  misas,
  otrosHorarios,
  parroquia,
  portada,
  puertas,
} from "@/lib/site";

/**
 * La portada.
 *
 * Invita; no cuenta todo. Quien llega viene por el horario de misa —eso se
 * responde completo aquí mismo— y quien además quiere quedarse necesita una
 * puerta clara, no el catálogo de las diez pastorales antes de haber decidido
 * nada. Cada lista larga vive en su propia página.
 */
export default function Inicio() {
  // El bloque con más misas manda la sección. Sale del dato, no de una
  // decisión escrita a mano: si cambian los horarios, la jerarquía cambia.
  const principal = misas.reduce((a, b) => (b.misas.length > a.misas.length ? b : a));
  const secundarios = misas.filter((bloque) => bloque !== principal);

  return (
    <>
      {/* ── El punto de partida ─────────────────────────────────────────
             La portada arrancaba con el lema —una imagen— y seguía con
             párrafo, dos botones y una insignia: seis bloques apilados y
             centrados, que es el orden exacto de cualquier plantilla. Ahora
             abre con una frase compuesta en tipografía, del tamaño que se
             merece la única línea de la pantalla, y el lema de la marca entra
             debajo firmando. El dato por el que casi todos llegan —a qué hora
             es la próxima misa— sube a la primera pantalla. ─────────────── */}
      <section className="contenedor relative flex min-h-[100svh] flex-col justify-center pb-24 pt-24 sm:pt-28">
        <Reveal entrada>
          <p className="rotulo">
            Parroquia Universitaria
            <span
              aria-hidden
              className="mx-2.5 hidden h-1 w-1 rounded-full bg-alba/60 align-middle sm:inline-block"
            />
            <span className="block text-tenue sm:inline">{parroquia.diocesis}</span>
          </p>
        </Reveal>

        <h1 className="display-xl mt-5 max-w-[16ch] text-balance sm:mt-7">
          <Palabras texto={portada.titular} entrada desde={0.1} />
        </h1>

        <Reveal entrada delay={0.4} className="mt-7 max-w-xl sm:mt-9">
          <p className="prosa">{portada.entrada}</p>
        </Reveal>

        <Reveal entrada delay={0.48} className="mt-7 sm:mt-9">
          <ProximaMisa />
        </Reveal>

        <Reveal
          entrada
          delay={0.56}
          className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
        >
          <BotonPrincipal href="/horarios">Ver todos los horarios</BotonPrincipal>
          <EnlaceFlecha href={parroquia.direccion.maps} externo>
            Cómo llegar
          </EnlaceFlecha>
        </Reveal>

        {/* El lema del año firma la portada: es la marca, no el titular. */}
        <Reveal entrada delay={0.64} className="mt-10 sm:mt-14">
          <Image
            src="/brand/lema-2026-blanco.png"
            alt={parroquia.lema}
            width={2000}
            height={546}
            sizes="(min-width: 1024px) 30rem, 62vw"
            priority
            className="w-[62%] max-w-md opacity-85"
          />
        </Reveal>

        {/* El scroll es lo que avanza por el camino: hay que decirlo. */}
        <Reveal
          entrada
          delay={0.8}
          className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-center sm:flex"
        >
          <span className="flex flex-col items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-tenue">
            Desliza
            <span aria-hidden className="cae text-base leading-none text-alba">
              ↓
            </span>
          </span>
        </Reveal>
      </section>

      <div className="my-10 md:my-16">
        <Marquesina />
      </div>

      {/* ── Lo primero que la gente busca, y lo único que la portada
             responde completo: a qué hora es la misa. ──────────────────── */}
      <section id="esta-semana" className="contenedor seccion scroll-mt-20 md:scroll-mt-24">
        <EncabezadoSeccion
          rotulo="Esta semana"
          titulo="Hay misa a la hora que _puedas llegar_"
          accion={{ href: "/horarios", label: "Horario completo" }}
        />

        {/* Tres columnas iguales dicen que los tres días pesan lo mismo, y no
            es cierto: el domingo tiene ocho misas y el sábado tres. La
            asimetría no es un capricho de diseño, es el dato. */}
        <div className="mt-10 grid gap-8 border-t border-regla pt-8 md:mt-14 md:gap-12 md:pt-10 lg:grid-cols-[1.55fr_1fr]">
          <Reveal>
            <p className="rotulo">{principal.etiqueta}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 md:mt-7">
              {principal.misas.map((misa) => (
                <li key={misa.hora}>
                  <span className="cifra block text-[clamp(1.9rem,1.2rem+2.4vw,2.9rem)] font-extrabold leading-none tracking-[-0.03em]">
                    {misa.hora}
                  </span>
                  {misa.nota && (
                    <span className="mt-1.5 block text-[0.8125rem] leading-snug text-alba">
                      {misa.nota}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-8 border-t border-regla pt-8 sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {secundarios.map((bloque, i) => (
              <Reveal key={bloque.etiqueta} delay={i * 0.05}>
                <p className="rotulo">{bloque.etiqueta}</p>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-4 md:mt-5">
                  {bloque.misas.map((misa) => (
                    <li key={misa.hora}>
                      <span className="cifra block text-2xl font-bold leading-none tracking-[-0.02em]">
                        {misa.hora}
                      </span>
                      {misa.nota && (
                        <span className="mt-1 block max-w-[16ch] text-[0.75rem] leading-snug text-alba">
                          {misa.nota}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Confesiones, Hora Santa y oficina: tres renglones, no tres
            tarjetas. Es información de una línea; no necesita marco. */}
        <ul className="mt-10 border-t border-regla md:mt-14">
          {otrosHorarios.map((item, i) => (
            <Reveal
              key={item.titulo}
              as="li"
              delay={i * 0.04}
              className="flex flex-col gap-1 border-b border-regla py-5 md:flex-row md:items-baseline md:gap-10 md:py-6"
            >
              <h3 className="text-lg font-semibold md:w-56 md:shrink-0">{item.titulo}</h3>
              <p className="text-sm text-tenue md:text-base">{item.lineas.join(" · ")}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Las cifras dicen el tamaño de la parroquia sin listar nada, y de paso
          parten la página en dos: es la única franja de día del recorrido. */}
      <Cifras />

      {/* ── Quiénes somos, contado con la casa y con Don Bosco ───────────── */}
      <section id="la-casa" className="contenedor seccion scroll-mt-20 md:scroll-mt-24">
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Reveal>
              <p className="rotulo">La casa</p>
              <h2 className="display-md mt-4 text-balance">
                <Palabras texto="Un hogar *alegre* de puertas abiertas" />
              </h2>
              <p className="prosa mt-5 md:mt-6">{parroquia.mision}</p>
            </Reveal>
            <Reveal delay={0.08} className="mt-8 md:mt-10">
              <Cita autor="San Juan Bosco">{frasesDonBosco[0]}</Cita>
            </Reveal>
          </div>

          {/* La ilustración va a otra velocidad que el texto: es lo que da la
              sensación de estar pasando junto a ella, no de leerla quieta. */}
          <div className="relative" data-deriva style={{ "--deriva": "2rem" } as React.CSSProperties}>
            <Image
              src="/brand/templo.png"
              alt="Ilustración del templo parroquial de San Juan Bosco con la sierra de Monterrey detrás"
              width={1400}
              height={1400}
              sizes="(min-width: 1024px) 40vw, 70vw"
              className="mx-auto w-[70%] max-w-md lg:w-full lg:max-w-none"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
            />
            {/* Pegada al borde y torcida, como en un cuaderno. Va abajo del
                todo y hacia afuera: encima del templo tapaba la fachada, que
                es lo único que la ilustración tiene que enseñar. */}
            <Image
              src="/brand/siempre-alegres-blanco.png"
              alt={parroquia.hashtag}
              width={1600}
              height={1116}
              sizes="160px"
              className="calcomania absolute -bottom-6 left-0 w-24 sm:w-28 md:w-32 lg:-left-6 lg:-bottom-4"
            />
          </div>
        </div>
      </section>

      {/* ── Tres puertas ─────────────────────────────────────────────────
             Una tarjeta por camino, no el contenido de cada camino. Quien
             quiera el detalle da un toque y lo encuentra completo. ──────── */}
      <section id="da-un-paso" className="contenedor seccion scroll-mt-20 md:scroll-mt-24">
        <EncabezadoSeccion rotulo="Si te quieres quedar" titulo="Aquí empieza _lo que sigue_" />

        {/* Tres tarjetas iguales en fila son la forma más rápida de que algo
            parezca salido de una plantilla. Como renglones se leen como el
            índice de un libro: el número grande, el nombre enorme y la línea
            de qué hay detrás. */}
        <ul className="mt-10 border-t border-regla md:mt-14">
          {puertas.map((puerta, i) => (
            <Reveal key={puerta.href} as="li" delay={i * 0.04} className="border-b border-regla">
              <Link
                href={puerta.href}
                className="group relative flex flex-col gap-4 py-7 transition-colors duration-[120ms] hover:bg-white/4 active:bg-white/4 md:flex-row md:items-baseline md:gap-10 md:py-10"
              >
                {/* En el teléfono el número se colgaba solo en su renglón y
                    costaba 34 px por puerta. Va a la esquina, donde no ocupa
                    alto y sigue leyéndose como índice. */}
                <span
                  aria-hidden
                  className="indice absolute right-0 top-7 md:static md:w-10 md:shrink-0 md:pt-2"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="display-md block text-balance transition-transform duration-[180ms] ease-salida group-hover:translate-x-2 group-active:translate-x-2">
                    {puerta.titulo}
                  </span>
                  <span className="mt-3 block max-w-xl text-sm leading-relaxed text-tenue md:mt-4 md:text-base">
                    {puerta.texto}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-alba md:w-44 md:justify-end">
                  {puerta.cta}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-[120ms] ease-salida group-hover:translate-x-1.5 group-active:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Ven ──────────────────────────────────────────────────────────── */}
      <section id="ven" className="contenedor seccion scroll-mt-20 md:scroll-mt-24">
        <Reveal tipo="escala" className="panel-azul overflow-hidden rounded-xl p-6 sm:p-10 md:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12">
            <div>
              <p className="rotulo text-alba-tenue">Ven</p>
              <h2 className="display-md mt-4 text-balance">
                <Palabras texto={`Te esperamos en *${parroquia.direccion.calle}*`} />
              </h2>
              <address className="prosa mt-4 not-italic md:mt-5">
                {parroquia.direccion.colonia}, {parroquia.direccion.cp}
                <br />
                {parroquia.direccion.ciudad}
              </address>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 md:mt-9">
                <BotonPrincipal href={parroquia.direccion.maps} externo>
                  Abrir en Maps
                </BotonPrincipal>
                <EnlaceFlecha href={enlaces.whatsapp} externo>
                  Escríbenos por WhatsApp
                </EnlaceFlecha>
              </div>
            </div>

            <div>
              <p className="rotulo text-alba-tenue">Síguenos</p>
              <ul className="mt-3 md:mt-5">
                {[
                  { href: enlaces.instagram, texto: "Instagram · @sanjuanboscomty" },
                  { href: enlaces.youtube, texto: "YouTube · San Juan Bosco MTY" },
                  { href: enlaces.facebook, texto: "Facebook · SanJuanBoscoMTY" },
                ].map((red) => (
                  <li key={red.href}>
                    <a
                      href={red.href}
                      target="_blank"
                      rel="noreferrer"
                      className="toque group gap-2 text-lg transition-colors duration-[120ms] hover:text-alba-tenue active:text-alba-tenue"
                    >
                      {red.texto}
                      <span
                        aria-hidden
                        className="inline-block opacity-0 transition-all duration-[120ms] ease-salida group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
