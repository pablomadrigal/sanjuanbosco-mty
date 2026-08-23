import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { BotonPrincipal, CabeceraPagina } from "@/components/ui";
import { enlaces, parroquia, sacramentos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sacramentos",
  description:
    "Bautizo, primera comunión, confirmación, confesión, matrimonio y unción de enfermos en la Parroquia Universitaria San Juan Bosco, Monterrey.",
};

export default function Sacramentos() {
  return (
    <>
      <CabeceraPagina
        rotulo="Sacramentos"
        titulo="Cómo empezar *el trámite*"
        entrada="Cada sacramento se aparta en la oficina parroquial. Aquí está lo que necesitas llevar y en qué orden, para que no hagas el viaje dos veces."
      />

      <section className="contenedor pb-20 md:pb-28">
        <ul className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {sacramentos.map((s, i) => (
            <Reveal key={s.slug} as="li" tipo={i % 2 ? "der" : "izq"} className="panel rounded-3xl p-6 sm:p-9">
              <article id={s.slug} className="scroll-mt-20 md:scroll-mt-28">
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className="indice">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl font-bold sm:text-2xl">{s.nombre}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-blanco/70 sm:text-base">{s.resumen}</p>
                {/* Los pasos van en orden porque el trámite lo tiene: la
                    numeración aquí es información, no adorno. */}
                <ol className="mt-5 space-y-3 md:mt-6">
                  {s.pasos.map((paso, n) => (
                    <li key={paso} className="flex gap-3 md:gap-4">
                      <span className="cifra rotulo shrink-0 pt-1">{n + 1}</span>
                      <span className="text-sm leading-relaxed text-blanco/65">{paso}</span>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal tipo="escala" className="panel-azul mt-6 rounded-3xl p-6 sm:p-10 md:mt-10">
          <h2 className="display-md text-balance">La oficina te resuelve lo demás</h2>
          <p className="prosa mt-3 md:mt-4">
            Lunes a viernes de 9:00 a 13:00 y de 15:00 a 19:00, sábado de 9:00 a 13:00, en{" "}
            {parroquia.direccion.completa}.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-8">
            <BotonPrincipal href={enlaces.whatsapp} externo>
              Preguntar por WhatsApp
            </BotonPrincipal>
          </div>
        </Reveal>
      </section>
    </>
  );
}
