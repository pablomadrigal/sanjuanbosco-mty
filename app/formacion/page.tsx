import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { BotonSecundario, CabeceraPagina, Cita } from "@/components/ui";
import { formacion, frasesDonBosco } from "@/lib/site";

export const metadata: Metadata = {
  title: "Formación",
  description:
    "Diplomado en Teología para Jóvenes, Christianus Ductor y misal digital de la Parroquia Universitaria San Juan Bosco, Monterrey.",
};

export default function Formacion() {
  return (
    <>
      <CabeceraPagina
        rotulo="Formación"
        titulo="Estudia en serio lo que crees"
        entrada="Somos una parroquia universitaria: aquí la fe se piensa y se discute, no sólo se practica. Estas son las convocatorias abiertas."
      />

      <section className="contenedor pb-20 md:pb-28">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
          {formacion.map((f, i) => (
            <Reveal key={f.nombre} as="li" delay={i * 0.08} className="panel flex flex-col rounded-3xl p-6 sm:p-9">
              <h2 className="text-lg font-bold leading-tight text-balance sm:text-xl">{f.nombre}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-blanco/65 md:mt-4">{f.descripcion}</p>
              <div className="mt-6 md:mt-8">
                <BotonSecundario href={f.href} externo>
                  {f.cta}
                </BotonSecundario>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 md:mt-24">
          <Cita autor="San Juan Bosco">{frasesDonBosco[1]}</Cita>
        </Reveal>
      </section>
    </>
  );
}
