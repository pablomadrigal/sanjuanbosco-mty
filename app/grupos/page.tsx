import type { Metadata } from "next";
import Marquesina from "@/components/Marquesina";
import Reveal from "@/components/Reveal";
import { BotonPrincipal, CabeceraPagina, EnlaceFlecha } from "@/components/ui";
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
        titulo="Encuentra *tu lugar*"
        entrada="Un grupo es una comunidad donde hay pertenencia, amistad, formación y oración. Se organizan por edad, por intereses o por el servicio que hacen. Escribe por WhatsApp y te decimos cuándo se reúne el que te toca."
      />

      <section className="contenedor pb-20 md:pb-28">
        {/* Diez pastorales eran diez cajas idénticas apiladas dentro de un
            marco: la pantalla más de plantilla del sitio, y la que más se
            recorre. Van como el índice de un libro —el mismo patrón que las
            tres puertas de la portada—: el número en el margen, el nombre
            grande y la línea de qué hay detrás. Sin marco, la lista respira y
            el nombre puede crecer, que es lo que se viene a leer. */}
        <ul className="border-t border-regla">
          {grupos.map((grupo, i) => (
            <Reveal key={grupo.slug} as="li" className="border-b border-regla">
              <article
                id={grupo.slug}
                className="scroll-mt-20 py-7 md:scroll-mt-28 md:py-9"
              >
                <div className="grid gap-3 md:grid-cols-[1.1fr_1fr] md:items-baseline md:gap-10">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span aria-hidden className="indice">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="rotulo">{grupo.para}</p>
                    </div>
                    <h2 className="mt-2.5 text-[clamp(1.5rem,1.15rem+1.6vw,2.25rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-balance md:mt-3">
                      {grupo.nombre}
                    </h2>
                  </div>
                  <p className="max-w-prose text-sm leading-relaxed text-suave sm:text-base">
                    {grupo.descripcion}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="my-14 md:my-20">
          <Marquesina />
        </div>

        <Reveal tipo="escala" className="panel-azul mt-6 flex flex-col gap-6 rounded-xl p-6 sm:p-10 md:mt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display-md text-balance">¿No sabes cuál es el tuyo?</h2>
            <p className="prosa mt-3 md:mt-4">
              Escríbenos y te orientamos según tu edad y tus horarios. También puedes ver el
              directorio completo de grupos y equipos de servicio.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <BotonPrincipal href={enlaces.whatsapp} externo>
              Escríbenos
            </BotonPrincipal>
            <EnlaceFlecha href={enlaces.grupos} externo>
              Directorio completo
            </EnlaceFlecha>
          </div>
        </Reveal>
      </section>
    </>
  );
}
