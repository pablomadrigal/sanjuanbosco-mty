import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { CabeceraPagina, Cita } from "@/components/ui";
import { equipo, frasesDonBosco, parroquia } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Misión, lema 2026 y equipo sacerdotal de la Parroquia Universitaria San Juan Bosco, Arquidiócesis de Monterrey.",
};

export default function Nosotros() {
  return (
    <>
      <CabeceraPagina
        rotulo="Nosotros"
        titulo="Un hogar *alegre* de puertas abiertas"
        entrada={parroquia.mision}
      />

      <section className="contenedor pb-20 md:pb-28">
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <p className="rotulo">Lema 2026</p>
            <Image
              src="/brand/lema-2026-blanco.png"
              alt={parroquia.lema}
              width={2000}
              height={546}
              sizes="(min-width: 1024px) 42rem, 92vw"
              className="mt-5 w-full max-w-2xl md:mt-6"
            />
            <p className="prosa mt-6 md:mt-8">
              Dos personas caminando juntas hacia la cruz. Ese es el año: nadie recorre el camino
              solo, y el camino tiene una dirección. Todo lo que hacemos en la parroquia —la misa,
              los grupos, la formación, el servicio— es una parada de ese mismo camino.
            </p>
          </Reveal>

          <div data-deriva style={{ "--deriva": "2rem" } as React.CSSProperties}>
            <Image
              src="/brand/camino-icono-blanco.png"
              alt=""
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 24rem, 60vw"
              className="mx-auto w-[60%] max-w-sm opacity-90 lg:w-full"
            />
          </div>
        </div>

        <Reveal className="mt-16 md:mt-24">
          <p className="rotulo">Equipo sacerdotal</p>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-regla bg-regla md:mt-8 md:grid-cols-3">
            {equipo.map((persona) => (
              <li key={persona.nombre} className="bg-noche/90 p-6 transition-colors duration-[180ms] hover:bg-azul/40 sm:p-8 md:bg-noche/70 md:backdrop-blur-xl">
                <h2 className="text-lg font-bold leading-tight sm:text-xl">{persona.nombre}</h2>
                <p className="rotulo mt-2 md:mt-3">{persona.cargo}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 space-y-12 md:mt-24 md:space-y-16">
          {frasesDonBosco.slice(1).map((frase) => (
            <Reveal key={frase}>
              <Cita autor="San Juan Bosco">{frase}</Cita>
            </Reveal>
          ))}
        </div>

        <Reveal tipo="escala" className="mt-16 flex justify-center md:mt-24">
          <Image
            src="/brand/siempre-alegres-blanco.png"
            alt={parroquia.hashtag}
            width={1600}
            height={1116}
            sizes="(min-width: 768px) 28rem, 70vw"
            className="w-[70%] max-w-md opacity-90 md:w-full"
          />
        </Reveal>
      </section>
    </>
  );
}
