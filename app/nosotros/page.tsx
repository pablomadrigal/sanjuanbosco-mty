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
        titulo="Un hogar alegre de puertas abiertas"
        entrada={parroquia.mision}
      />

      <section className="contenedor pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <p className="rotulo">Lema 2026</p>
            <Image
              src="/brand/lema-2026-blanco.png"
              alt={parroquia.lema}
              width={2000}
              height={546}
              className="mt-6 w-full max-w-2xl"
            />
            <p className="prosa mt-8">
              Dos personas caminando juntas hacia la cruz. Ese es el año: nadie recorre el camino
              solo, y el camino tiene una dirección. Todo lo que hacemos en la parroquia —la misa,
              los grupos, la formación, el servicio— es una parada de ese mismo camino.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <Image
              src="/brand/camino-icono-blanco.png"
              alt=""
              width={1200}
              height={1200}
              className="mx-auto w-full max-w-sm opacity-90"
            />
          </Reveal>
        </div>

        <Reveal className="mt-28">
          <p className="rotulo">Equipo sacerdotal</p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 md:grid-cols-3">
            {equipo.map((persona) => (
              <li key={persona.nombre} className="bg-noche/70 p-8 backdrop-blur-xl">
                <h2 className="text-xl font-bold leading-tight">{persona.nombre}</h2>
                <p className="rotulo mt-3">{persona.cargo}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-28 space-y-20">
          {frasesDonBosco.slice(1).map((frase, i) => (
            <Reveal key={frase} delay={i * 0.05}>
              <Cita autor="San Juan Bosco">{frase}</Cita>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-28 flex justify-center">
          <Image
            src="/brand/siempre-alegres-blanco.png"
            alt={parroquia.hashtag}
            width={1600}
            height={1116}
            className="w-full max-w-md opacity-90"
          />
        </Reveal>
      </section>
    </>
  );
}
