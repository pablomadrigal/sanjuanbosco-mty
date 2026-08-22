import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProximaMisa from "@/components/ProximaMisa";
import { BotonSecundario, CabeceraPagina } from "@/components/ui";
import { enlaces, misas, otrosHorarios } from "@/lib/site";

export const metadata: Metadata = {
  title: "Horarios",
  description:
    "Horarios de misa, confesiones, Hora Santa y oficina parroquial de la Parroquia Universitaria San Juan Bosco, Monterrey.",
};

export default function Horarios() {
  return (
    <>
      <CabeceraPagina
        rotulo="Horarios"
        titulo="A qué hora es la misa"
        entrada="Los horarios de misa, confesión y oficina. Si cambian por una fiesta o por Semana Santa, lo avisamos primero en Instagram."
      />

      <div className="contenedor pb-8 md:pb-10">
        <Reveal>
          <ProximaMisa />
        </Reveal>
      </div>

      <section className="contenedor pb-20 md:pb-28">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 md:grid-cols-3">
          {misas.map((bloque, i) => (
            <Reveal
              key={bloque.etiqueta}
              delay={i * 0.08}
              className="bg-noche/90 p-6 sm:p-8 md:bg-noche/70 md:p-10 md:backdrop-blur-xl"
            >
              <h2 className="rotulo">{bloque.etiqueta}</h2>
              {/* Rejilla en el teléfono: todos los horarios del día en una
                  sola mirada, sin recorrer la pantalla ocho veces. */}
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 md:mt-6 md:grid-cols-1">
                {bloque.misas.map((misa) => (
                  <li
                    key={misa.hora}
                    className="flex flex-col gap-0.5 md:flex-row md:flex-wrap md:items-baseline md:gap-x-4 md:gap-y-1"
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
            <Reveal key={item.titulo} delay={i * 0.06} className="panel rounded-2xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{item.titulo}</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-blanco/65">
                {item.lineas.map((linea) => (
                  <li key={linea}>{linea}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="panel mt-4 flex flex-col gap-5 rounded-2xl p-6 sm:p-8 md:mt-6 md:flex-row md:items-center md:justify-between md:gap-6">
          <div>
            <h2 className="text-lg font-semibold">¿Quién celebra?</h2>
            <p className="mt-2 text-sm text-blanco/60">
              El calendario parroquial dice qué sacerdote celebra cada misa.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <BotonSecundario href={enlaces.calendarioMisas} externo>
              Abrir calendario
            </BotonSecundario>
            <BotonSecundario href={enlaces.misal} externo>
              Misal digital
            </BotonSecundario>
          </div>
        </Reveal>
      </section>
    </>
  );
}
