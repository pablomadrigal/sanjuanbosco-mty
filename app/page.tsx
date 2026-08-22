import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProximaMisa from "@/components/ProximaMisa";
import { BotonPrincipal, BotonSecundario, Cita, EncabezadoSeccion } from "@/components/ui";
import {
  enlaces,
  formacion,
  frasesDonBosco,
  grupos,
  misas,
  otrosHorarios,
  parroquia,
  sacramentos,
} from "@/lib/site";

export default function Inicio() {
  return (
    <>
      {/* ── El punto de partida ─────────────────────────────────────────── */}
      <section className="contenedor flex min-h-[100svh] flex-col justify-center pb-24 pt-32">
        <Reveal entrada>
          <p className="rotulo">
            Parroquia Universitaria · {parroquia.diocesis}
          </p>
        </Reveal>

        <Reveal entrada delay={0.08} className="mt-8">
          <h1>
            <span className="sr-only">{parroquia.lema}</span>
            <Image
              src="/brand/lema-2026-blanco.png"
              alt=""
              width={2000}
              height={546}
              priority
              className="w-full max-w-4xl"
            />
          </h1>
        </Reveal>

        <Reveal entrada delay={0.16} className="mt-10 max-w-xl">
          <p className="prosa">
            Somos San Juan Bosco: una comunidad de puertas abiertas en {parroquia.direccion.colonia.replace("Col. ", "")},
            Monterrey. Llega a la misa que te acomode, encuentra un grupo donde te conozcan por tu
            nombre y da el siguiente paso cuando estés listo.
          </p>
        </Reveal>

        <Reveal entrada delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
          <BotonPrincipal href="/horarios">Ver horarios de misa</BotonPrincipal>
          <BotonSecundario href={parroquia.direccion.maps} externo>
            Cómo llegar
          </BotonSecundario>
        </Reveal>

        <Reveal entrada delay={0.34} className="mt-12">
          <ProximaMisa />
        </Reveal>
      </section>

      {/* ── Lo primero que la gente busca: a qué hora es la misa ─────────── */}
      <section id="esta-semana" className="contenedor scroll-mt-24 py-20 md:py-28">
        <EncabezadoSeccion
          rotulo="Esta semana"
          titulo="Hay misa casi a cualquier hora que puedas llegar"
          accion={{ href: "/horarios", label: "Horario completo" }}
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 md:grid-cols-3">
          {misas.map((bloque, i) => (
            <Reveal
              key={bloque.etiqueta}
              delay={i * 0.08}
              className="bg-noche/70 p-8 backdrop-blur-xl md:p-10"
            >
              <p className="rotulo">{bloque.etiqueta}</p>
              <ul className="mt-6 space-y-4">
                {bloque.misas.map((misa) => (
                  <li key={misa.hora} className="flex items-baseline gap-4">
                    <span className="cifra text-2xl font-bold tabular-nums md:text-[1.75rem]">
                      {misa.hora}
                    </span>
                    {misa.nota && (
                      <span className="text-sm text-alba">{misa.nota}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {otrosHorarios.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 0.06} className="panel rounded-2xl p-7">
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

      {/* ── Quiénes somos, contado con la casa y con Don Bosco ───────────── */}
      <section id="la-casa" className="contenedor scroll-mt-24 py-20 md:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <p className="rotulo">La casa</p>
            <h2 className="display-md mt-4 text-balance">
              Un hogar alegre de puertas abiertas
            </h2>
            <p className="prosa mt-6">{parroquia.mision}</p>
            <div className="mt-10">
              <Cita autor="San Juan Bosco">{frasesDonBosco[0]}</Cita>
            </div>
            <Image
              src="/brand/siempre-alegres-blanco.png"
              alt={parroquia.hashtag}
              width={1600}
              height={1116}
              className="mt-10 h-24 w-auto opacity-85"
            />
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <Image
              src="/brand/templo.png"
              alt="Ilustración del templo parroquial de San Juan Bosco con la sierra de Monterrey detrás"
              width={1400}
              height={1400}
              className="w-full"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Grupos: el motivo real por el que alguien se queda ───────────── */}
      <section id="grupos" className="contenedor scroll-mt-24 py-20 md:py-28">
        <EncabezadoSeccion
          rotulo="Encuentra tu lugar"
          titulo="Diez pastorales. Alguna es para ti."
          descripcion="Los grupos se organizan por edad, por intereses o por el servicio que hacen. En todos pasa lo mismo: amistad, formación y oración."
          accion={{ href: "/grupos", label: "Ver los grupos" }}
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
          {grupos.map((grupo, i) => (
            <Reveal
              key={grupo.slug}
              as="li"
              delay={(i % 3) * 0.07}
              className="group bg-noche/70 backdrop-blur-xl transition-colors duration-500 hover:bg-azul/45"
            >
              <Link href={`/grupos#${grupo.slug}`} className="flex h-full flex-col p-8">
                <p className="rotulo">{grupo.para}</p>
                <h3 className="mt-4 text-xl font-bold leading-tight text-balance">
                  {grupo.nombre}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-blanco/60">
                  {grupo.descripcion}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-alba transition-transform duration-300 group-hover:translate-x-1">
                  Conocer más →
                </span>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" className="bg-azul/35 backdrop-blur-xl transition-colors duration-500 hover:bg-azul/55">
            <a
              href={enlaces.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col p-8"
            >
              <p className="rotulo">Si ninguno te queda</p>
              <h3 className="mt-4 text-xl font-bold leading-tight text-balance">
                Te ayudamos a escoger
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-blanco/70">
                Dinos tu edad y tus horarios y te decimos cuál grupo te toca y cuándo se reúne.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blanco">
                Escríbenos →
              </span>
            </a>
          </Reveal>
        </ul>
      </section>

      {/* ── El siguiente paso ────────────────────────────────────────────── */}
      <section id="da-un-paso" className="contenedor scroll-mt-24 py-20 md:py-28">
        <EncabezadoSeccion
          rotulo="Da un paso"
          titulo="Sacramentos y formación"
          descripcion="Ya sea que vengas a bautizar, a confirmarte, a casarte o a estudiar en serio lo que crees, aquí empieza el trámite."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="panel rounded-3xl p-9">
            <h3 className="rotulo">Sacramentos</h3>
            <ul className="mt-7 divide-y divide-white/10">
              {sacramentos.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/sacramentos#${s.slug}`}
                    className="group flex items-baseline justify-between gap-6 py-4"
                  >
                    <span className="text-lg font-semibold">{s.nombre}</span>
                    <span className="shrink-0 text-alba opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="panel rounded-3xl p-9">
            <h3 className="rotulo">Formación</h3>
            <ul className="mt-7 space-y-7">
              {formacion.map((f) => (
                <li key={f.nombre}>
                  <h4 className="text-lg font-semibold">{f.nombre}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-blanco/60">{f.descripcion}</p>
                  <a
                    href={f.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-alba"
                  >
                    {f.cta} →
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Ven ──────────────────────────────────────────────────────────── */}
      <section id="ven" className="contenedor scroll-mt-24 py-20 md:py-28">
        <Reveal className="panel overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="rotulo">Ven</p>
              <h2 className="display-md mt-4 text-balance">
                Te esperamos en {parroquia.direccion.calle}
              </h2>
              <address className="prosa mt-5 not-italic">
                {parroquia.direccion.colonia}, {parroquia.direccion.cp}
                <br />
                {parroquia.direccion.ciudad}
              </address>
              <div className="mt-9 flex flex-wrap gap-4">
                <BotonPrincipal href={parroquia.direccion.maps} externo>
                  Abrir en Maps
                </BotonPrincipal>
                <BotonSecundario href={enlaces.whatsapp} externo>
                  Escríbenos
                </BotonSecundario>
              </div>
            </div>

            <div>
              <p className="rotulo">Síguenos</p>
              <ul className="mt-5 space-y-3 text-lg">
                <li>
                  <a href={enlaces.instagram} target="_blank" rel="noreferrer" className="hover:text-alba">
                    Instagram · @sanjuanboscomty
                  </a>
                </li>
                <li>
                  <a href={enlaces.youtube} target="_blank" rel="noreferrer" className="hover:text-alba">
                    YouTube · San Juan Bosco MTY
                  </a>
                </li>
                <li>
                  <a href={enlaces.facebook} target="_blank" rel="noreferrer" className="hover:text-alba">
                    Facebook · SanJuanBoscoMTY
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
