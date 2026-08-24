import Image from "next/image";
import Link from "next/link";
import Cifras from "@/components/Cifras";
import Marquesina from "@/components/Marquesina";
import Palabras from "@/components/Palabras";
import Reveal from "@/components/Reveal";
import ProximaMisa from "@/components/ProximaMisa";
import { BotonPrincipal, BotonSecundario, Cita, EncabezadoSeccion } from "@/components/ui";
import { enlaces, frasesDonBosco, misas, otrosHorarios, parroquia, puertas } from "@/lib/site";

/**
 * La portada.
 *
 * Invita; no cuenta todo. Quien llega viene por el horario de misa —eso se
 * responde completo aquí mismo— y quien además quiere quedarse necesita una
 * puerta clara, no el catálogo de las diez pastorales antes de haber decidido
 * nada. Cada lista larga vive en su propia página.
 */
export default function Inicio() {
  return (
    <>
      {/* ── El punto de partida ─────────────────────────────────────────── */}
      <section className="contenedor relative flex min-h-[100svh] flex-col justify-center pb-24 pt-24 sm:pb-28 sm:pt-32">
        <Reveal entrada className="flex flex-wrap gap-2">
          <span className="panel rounded-full px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-alba">
            Parroquia Universitaria
          </span>
          <span className="panel rounded-full px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-blanco/60">
            {parroquia.diocesis}
          </span>
        </Reveal>

        <Reveal entrada delay={0.08} className="mt-6 sm:mt-8">
          <h1>
            <span className="sr-only">{parroquia.lema}</span>
            <Image
              src="/brand/lema-2026-blanco.png"
              alt=""
              width={2000}
              height={546}
              sizes="(min-width: 1024px) 56rem, 92vw"
              priority
              className="flota w-full max-w-4xl"
            />
          </h1>
        </Reveal>

        <Reveal entrada delay={0.16} className="mt-7 max-w-xl sm:mt-10">
          <p className="prosa">
            Somos San Juan Bosco: una comunidad de puertas abiertas en{" "}
            {parroquia.direccion.colonia.replace("Col. ", "")}, Monterrey. Llega a la misa que te
            acomode y quédate el tiempo que quieras.
          </p>
        </Reveal>

        <Reveal
          entrada
          delay={0.24}
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <BotonPrincipal href="/horarios">Ver horarios de misa</BotonPrincipal>
          <BotonSecundario href={parroquia.direccion.maps} externo>
            Cómo llegar
          </BotonSecundario>
        </Reveal>

        <Reveal entrada delay={0.34} className="mt-8 sm:mt-12">
          <ProximaMisa />
        </Reveal>

        {/* El scroll es lo que avanza por el camino: hay que decirlo. */}
        <Reveal
          entrada
          delay={0.5}
          className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center sm:bottom-9"
        >
          <span className="flex flex-col items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-blanco/40">
            Desliza
            <span aria-hidden className="cae text-base leading-none text-alba">
              ↓
            </span>
          </span>
        </Reveal>
      </section>

      <Marquesina />

      {/* ── Lo primero que la gente busca, y lo único que la portada
             responde completo: a qué hora es la misa. ──────────────────── */}
      <section id="esta-semana" className="contenedor scroll-mt-20 py-12 md:scroll-mt-24 md:py-20">
        <EncabezadoSeccion
          rotulo="Esta semana"
          titulo="Hay misa *casi a cualquier hora* que puedas llegar"
          accion={{ href: "/horarios", label: "Horario completo" }}
        />

        <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 md:mt-12 md:grid-cols-3">
          {misas.map((bloque, i) => (
            <Reveal
              key={bloque.etiqueta}
              tipo={i === 1 ? "escala" : i === 0 ? "izq" : "der"}
              delay={i * 0.05}
              className="bg-noche/90 p-6 sm:p-8 md:bg-noche/70 md:p-10 md:backdrop-blur-xl"
            >
              <p className="rotulo">{bloque.etiqueta}</p>
              {/* Ocho horarios de domingo, uno por renglón, son ocho pantallazos
                  de pulgar en un teléfono. En rejilla se leen de un vistazo. */}
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 md:mt-6 md:grid-cols-1 md:gap-y-4">
                {bloque.misas.map((misa) => (
                  <li
                    key={misa.hora}
                    className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-4"
                  >
                    <span className="cifra text-2xl font-bold tabular-nums md:text-[1.75rem]">
                      {misa.hora}
                    </span>
                    {misa.nota && (
                      <span className="text-[0.8125rem] leading-snug text-alba md:text-sm">
                        {misa.nota}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-3 md:gap-6">
          {otrosHorarios.map((item, i) => (
            <Reveal
              key={item.titulo}
              tipo="girar"
              delay={i * 0.06}
              className="panel rounded-2xl p-6 sm:p-7"
            >
              <h3 className="text-lg font-semibold">{item.titulo}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-blanco/65">
                {item.lineas.map((linea) => (
                  <li key={linea}>{linea}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Las cifras dicen el tamaño de la parroquia sin listar nada: es lo que
          antes hacían las diez tarjetas de pastorales. */}
      <Cifras />

      {/* ── Quiénes somos, contado con la casa y con Don Bosco ───────────── */}
      <section id="la-casa" className="contenedor scroll-mt-20 py-12 md:scroll-mt-24 md:py-20">
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Reveal tipo="izq">
              <p className="rotulo">La casa</p>
            </Reveal>
            <h2 className="display-md mt-3 text-balance md:mt-4">
              <Palabras texto="Un hogar *alegre* de puertas abiertas" />
            </h2>
            <Reveal delay={0.06}>
              <p className="prosa mt-5 md:mt-6">{parroquia.mision}</p>
            </Reveal>
            <Reveal tipo="izq" delay={0.1} className="mt-8 md:mt-10">
              <Cita autor="San Juan Bosco">{frasesDonBosco[0]}</Cita>
            </Reveal>
          </div>

          {/* La ilustración va a otra velocidad que el texto: es lo que da la
              sensación de estar pasando junto a ella, no de leerla quieta. */}
          <div data-deriva style={{ "--deriva": "2rem" } as React.CSSProperties}>
            <Image
              src="/brand/templo.png"
              alt="Ilustración del templo parroquial de San Juan Bosco con la sierra de Monterrey detrás"
              width={1400}
              height={1400}
              sizes="(min-width: 1024px) 40vw, 70vw"
              className="mx-auto w-[70%] max-w-md lg:w-full lg:max-w-none"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
            />
          </div>
        </div>
      </section>

      {/* ── Tres puertas ─────────────────────────────────────────────────
             Una tarjeta por camino, no el contenido de cada camino. Quien
             quiera el detalle da un toque y lo encuentra completo. ──────── */}
      <section id="da-un-paso" className="contenedor scroll-mt-20 py-12 md:scroll-mt-24 md:py-20">
        <EncabezadoSeccion
          rotulo="Y si te quieres quedar"
          titulo="Aquí empieza *lo que sigue*"
        />

        <ul className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {puertas.map((puerta, i) => (
            <Reveal
              key={puerta.href}
              as="li"
              tipo={i === 1 ? "escala" : i === 0 ? "izq" : "der"}
              delay={i * 0.05}
            >
              <Link
                href={puerta.href}
                className="group panel flex h-full flex-col rounded-3xl p-6 transition-colors duration-500 hover:bg-azul/40 active:bg-azul/40 sm:p-8 md:p-9"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="rotulo">{puerta.rotulo}</p>
                  <span aria-hidden className="indice">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-balance md:mt-4">
                  {puerta.titulo}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-blanco/60 md:mt-4">
                  {puerta.texto}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-alba md:mt-8">
                  {puerta.cta}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-active:translate-x-1.5"
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
      <section id="ven" className="contenedor scroll-mt-20 py-12 md:scroll-mt-24 md:py-20">
        <Reveal tipo="escala" className="panel-azul overflow-hidden rounded-3xl p-6 sm:p-10 md:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12">
            <div>
              <p className="rotulo text-alba-tenue">Ven</p>
              <h2 className="display-md mt-3 text-balance md:mt-4">
                <Palabras texto={`Te esperamos en *${parroquia.direccion.calle}*`} />
              </h2>
              <address className="prosa mt-4 not-italic md:mt-5">
                {parroquia.direccion.colonia}, {parroquia.direccion.cp}
                <br />
                {parroquia.direccion.ciudad}
              </address>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-9">
                <BotonPrincipal href={parroquia.direccion.maps} externo>
                  Abrir en Maps
                </BotonPrincipal>
                <BotonSecundario href={enlaces.whatsapp} externo>
                  Escríbenos
                </BotonSecundario>
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
                      className="toque group gap-2 text-lg transition-colors hover:text-alba-tenue active:text-alba-tenue"
                    >
                      {red.texto}
                      <span
                        aria-hidden
                        className="inline-block opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
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
