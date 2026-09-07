import type { Metadata } from "next";
import Link from "next/link";
import Marquesina from "@/components/Marquesina";
import Reveal from "@/components/Reveal";
import {
  BotonPrincipal,
  CabeceraPagina,
  EncabezadoSeccion,
  EnlaceFlecha,
} from "@/components/ui";
import {
  enlaces,
  misas,
  otrosHorarios,
  resolver,
  universitarios,
  type Ficha,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Universitarios",
  description:
    "Todo lo de la parroquia para estudiantes en un solo lugar: Pastoral Universitaria, Alpha, sacramentos, Diplomado en Teología, comedor Santa Marta y Adopta un foráneo.",
};

/**
 * La sección para universitarios.
 *
 * Es un índice, no una página nueva de contenido: cada ficha se escribe una
 * sola vez en `lib/site.ts` y aquí se junta. Lo que aporta es el orden —lo
 * primero es dónde comer y con quién, después el grupo, después los
 * sacramentos y la formación—, que es el orden en que se decide un semestre,
 * no el del organigrama de la parroquia.
 *
 * Las páginas por separado no se tocan: cada bloque termina en la suya.
 */
function Renglon({ ficha }: { ficha: Ficha }) {
  const clases =
    "group flex flex-col gap-2 py-6 transition-colors duration-[120ms] hover:bg-white/4 active:bg-white/4 md:flex-row md:items-baseline md:gap-10 md:py-7";
  const contenido = (
    <>
      <span className="flex items-baseline gap-2 text-lg font-bold leading-tight tracking-[-0.015em] sm:text-xl md:w-72 md:shrink-0">
        {ficha.nombre}
        {/* La flecha está siempre, no sólo al pasar el mouse: en un teléfono
            el hover no ocurre nunca y sin ella el renglón no se lee como un
            enlace, que es justo lo que es. */}
        <span
          aria-hidden
          className="text-alba transition-transform duration-[120ms] ease-salida group-hover:translate-x-1 group-active:translate-x-1"
        >
          →
        </span>
      </span>
      <span className="max-w-prose text-sm leading-relaxed text-suave sm:text-base">
        {ficha.texto}
      </span>
    </>
  );

  return ficha.externo ? (
    <a href={ficha.href} target="_blank" rel="noreferrer" className={clases}>
      {contenido}
    </a>
  ) : (
    <Link href={ficha.href} className={clases}>
      {contenido}
    </Link>
  );
}

export default function Universitarios() {
  // La misa juvenil sale del dato, no de una decisión escrita a mano: si el
  // domingo deja de tener una a las 17:30, esta sección deja de anunciarla.
  const juvenil = misas
    .flatMap((bloque) => bloque.misas.map((misa) => ({ ...misa, dia: bloque.etiqueta })))
    .find((misa) => misa.nota === "Juvenil");

  return (
    <>
      <CabeceraPagina
        rotulo="Universitarios"
        titulo={universitarios.titular}
        entrada={universitarios.entrada}
      />

      <section className="contenedor pb-20 md:pb-28">
        {/* Lo primero de la semana: a qué misa llegar y cuándo hay confesión.
            Es el único dato que alguien puede necesitar hoy mismo. */}
        <EncabezadoSeccion
          rotulo="Tu semana"
          titulo="La misa donde está *la banda*"
          accion={{ href: "/horarios", label: "Horario completo" }}
        />

        <div className="mt-10 grid gap-8 border-t border-regla pt-8 md:mt-14 md:gap-12 md:pt-10 lg:grid-cols-[1fr_1.15fr]">
          {juvenil && (
            <Reveal>
              <p className="rotulo">{juvenil.dia} · Misa juvenil</p>
              <p className="numero mt-4 md:mt-6">{juvenil.hora}</p>
              <p className="prosa mt-4 md:mt-6">
                Si vienes por primera vez y no sabes a cuál llegar, es a esta. Se sale tarde y
                casi nadie se va derecho a su casa.
              </p>
            </Reveal>
          )}

          <ul className="border-t border-regla lg:border-l lg:border-t-0 lg:pl-12">
            {otrosHorarios.map((item, i) => (
              <Reveal
                key={item.titulo}
                as="li"
                delay={i * 0.04}
                className="flex flex-col gap-1 border-b border-regla py-5 md:flex-row md:items-baseline md:gap-8 md:py-6"
              >
                <h3 className="text-lg font-semibold md:w-48 md:shrink-0">{item.titulo}</h3>
                <p className="text-sm text-tenue md:text-base">{item.lineas.join(" · ")}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Los cuatro bloques del índice. Cada uno termina en su página de
            siempre: esto junta, no sustituye. */}
        {universitarios.bloques.map((bloque) => {
          const fichas = bloque.fichas.map(resolver).filter((f): f is Ficha => f !== null);

          return (
            <div
              key={bloque.id}
              id={bloque.id}
              className="mt-16 scroll-mt-20 md:mt-24 md:scroll-mt-28"
            >
              <EncabezadoSeccion
                rotulo={bloque.rotulo}
                titulo={bloque.titulo}
                descripcion={bloque.texto}
                accion={bloque.accion}
              />
              <ul className="mt-8 border-t border-regla md:mt-12">
                {fichas.map((ficha, i) => (
                  <Reveal
                    key={ficha.href + ficha.nombre}
                    as="li"
                    delay={i * 0.04}
                    className="border-b border-regla"
                  >
                    <Renglon ficha={ficha} />
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}

        <div className="my-14 md:my-20">
          <Marquesina />
        </div>

        <Reveal
          tipo="escala"
          className="panel-azul mt-6 flex flex-col gap-6 rounded-xl p-6 sm:p-10 md:mt-10 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h2 className="display-md text-balance">{universitarios.cierre.titulo}</h2>
            <p className="prosa mt-3 md:mt-4">{universitarios.cierre.texto}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <BotonPrincipal href={enlaces.whatsapp} externo>
              Escríbenos
            </BotonPrincipal>
            <EnlaceFlecha href="/horarios">Ver los horarios</EnlaceFlecha>
          </div>
        </Reveal>
      </section>
    </>
  );
}
