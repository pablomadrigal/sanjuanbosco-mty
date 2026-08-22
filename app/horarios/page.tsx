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

      <div className="contenedor pb-10">
        <Reveal>
          <ProximaMisa />
        </Reveal>
      </div>

      <section className="contenedor pb-28">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 md:grid-cols-3">
          {misas.map((bloque, i) => (
            <Reveal key={bloque.etiqueta} delay={i * 0.08} className="bg-noche/70 p-8 backdrop-blur-xl md:p-10">
              <h2 className="rotulo">{bloque.etiqueta}</h2>
              <ul className="mt-6 space-y-4">
                {bloque.misas.map((misa) => (
                  <li key={misa.hora} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="cifra text-2xl font-bold tabular-nums md:text-[1.75rem]">
                      {misa.hora}
                    </span>
                    {misa.nota && <span className="text-sm text-alba">{misa.nota}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {otrosHorarios.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 0.06} className="panel rounded-2xl p-7">
              <h2 className="text-lg font-semibold">{item.titulo}</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-blanco/65">
                {item.lineas.map((linea) => (
                  <li key={linea}>{linea}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="panel mt-6 flex flex-col gap-6 rounded-2xl p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">¿Quién celebra?</h2>
            <p className="mt-2 text-sm text-blanco/60">
              El calendario parroquial dice qué sacerdote celebra cada misa.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
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
