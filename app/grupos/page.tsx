import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { BotonPrincipal, BotonSecundario, CabeceraPagina } from "@/components/ui";
import { enlaces, grupos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grupos",
  description:
    "Las diez pastorales de la Parroquia Universitaria San Juan Bosco: infantil, juvenil, universitaria, profesionistas, familiar, litúrgica, social, devociones y Alpha.",
};

export default function Grupos() {
  return (
    <>
      <CabeceraPagina
        rotulo="Grupos"
        titulo="Encuentra tu lugar"
        entrada="Un grupo es una comunidad donde hay pertenencia, amistad, formación y oración. Se organizan por edad, por intereses o por el servicio que hacen. Escribe por WhatsApp y te decimos cuándo se reúne el que te toca."
      />

      <section className="contenedor pb-20 md:pb-28">
        <ul className="space-y-px overflow-hidden rounded-3xl border border-white/12 bg-white/12">
          {grupos.map((grupo, i) => (
            <Reveal
              key={grupo.slug}
              as="li"
              delay={Math.min(i, 4) * 0.05}
              className="bg-noche/90 md:bg-noche/70 md:backdrop-blur-xl"
            >
              <article id={grupo.slug} className="scroll-mt-20 p-6 sm:p-8 md:scroll-mt-28 md:p-10">
                <div className="grid gap-3 md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-6">
                  <div>
                    <p className="rotulo">{grupo.para}</p>
                    <h2 className="mt-2 text-xl font-bold leading-tight text-balance sm:text-2xl md:mt-3">
                      {grupo.nombre}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-blanco/70 sm:text-base">{grupo.descripcion}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="panel mt-6 flex flex-col gap-6 rounded-3xl p-6 sm:p-10 md:mt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display-md text-balance">¿No sabes cuál es el tuyo?</h2>
            <p className="prosa mt-3 md:mt-4">
              Escríbenos y te orientamos según tu edad y tus horarios. También puedes ver el
              directorio completo de grupos y equipos de servicio.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <BotonPrincipal href={enlaces.whatsapp} externo>
              Escríbenos
            </BotonPrincipal>
            <BotonSecundario href={enlaces.grupos} externo>
              Directorio
            </BotonSecundario>
          </div>
        </Reveal>
      </section>
    </>
  );
}
