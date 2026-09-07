import type { Metadata } from "next";
import Marquesina from "@/components/Marquesina";
import Reveal from "@/components/Reveal";
import { BotonPrincipal, CabeceraPagina, EncabezadoSeccion, EnlaceFlecha } from "@/components/ui";
import { enlaces, grupos, obras } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grupos",
  description:
    "Las diez pastorales de la Parroquia Universitaria San Juan Bosco: infantil, juvenil, universitaria, profesionistas, familiar, litúrgica, social, devociones y Alpha, más el comedor Santa Martha y Adopta un foráneo.",
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
                  <div>
                    <p className="max-w-prose text-sm leading-relaxed text-suave sm:text-base">
                      {grupo.descripcion}
                    </p>

                    {/* La pastoral es la puerta; a lo que llegas un sábado a
                        las cuatro es a una comunidad con nombre propio. Van
                        detrás de una regla, no en tarjetas: es una nota al
                        margen de la pastoral, no otra lista. */}
                    {grupo.comunidades && (
                      <ul className="mt-5 space-y-3 border-l border-regla pl-4 md:mt-6">
                        {grupo.comunidades.map((comunidad) => (
                          <li
                            key={comunidad.slug}
                            id={comunidad.slug}
                            className="scroll-mt-24 md:scroll-mt-32"
                          >
                            <p className="text-sm font-semibold">
                              {comunidad.nombre}
                              <span className="font-normal text-tenue"> · {comunidad.para}</span>
                            </p>
                            <p className="mt-0.5 text-[0.8125rem] leading-snug text-tenue">
                              {/* Sin horario no se inventa uno: el que falta
                                  en el directorio se pregunta por su cuenta. */}
                              {comunidad.cuando}
                              {comunidad.instagram && (
                                <>
                                  {comunidad.cuando && " · "}
                                  <a
                                    href={`https://www.instagram.com/${comunidad.instagram}/`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-alba transition-colors duration-[120ms] hover:text-alba-tenue active:text-alba-tenue"
                                  >
                                    @{comunidad.instagram}
                                  </a>
                                </>
                              )}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Las obras no son pastorales: no te inscribes ni se reúnen los
            martes. Son una mesa y una familia, y a las dos se llega por la
            puerta de enfrente, así que van en su propia lista y con su propio
            encabezado —también las junta la sección de universitarios, que es
            donde más falta hacen. */}
        <section id="obras" className="scroll-mt-20 pt-14 md:scroll-mt-28 md:pt-20">
          <EncabezadoSeccion
            rotulo="Obras"
            titulo="Dos mesas *puestas*"
            descripcion="Lo que la parroquia sostiene todo el año y no necesita inscripción: llegas, comes, sirves o te dejas acompañar."
            accion={{ href: "/universitarios", label: "Si eres universitario" }}
          />

          <ul className="mt-10 border-t border-regla md:mt-14">
            {obras.map((obra, i) => (
              <Reveal key={obra.slug} as="li" delay={i * 0.04} className="border-b border-regla">
                <article id={obra.slug} className="scroll-mt-20 py-7 md:scroll-mt-28 md:py-9">
                  <div className="grid gap-3 md:grid-cols-[1.1fr_1fr] md:items-baseline md:gap-10">
                    <div>
                      <p className="rotulo">{obra.para}</p>
                      <h3 className="mt-2.5 text-[clamp(1.5rem,1.15rem+1.6vw,2.25rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-balance md:mt-3">
                        {obra.nombre}
                      </h3>
                      {obra.cuando && (
                        <p className="mt-2 text-[0.8125rem] font-semibold leading-snug text-alba">
                          {obra.cuando}
                        </p>
                      )}
                    </div>
                    <p className="max-w-prose text-sm leading-relaxed text-suave sm:text-base">
                      {obra.descripcion}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

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
