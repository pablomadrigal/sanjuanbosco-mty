import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { BotonPrincipal, BotonSecundario, CabeceraPagina } from "@/components/ui";
import { enlaces, otrosHorarios, parroquia } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Dirección, horarios de oficina y redes de la ${parroquia.nombre}, Monterrey.`,
};

const canales = [
  { nombre: "WhatsApp", detalle: "La forma más rápida de preguntar algo", href: enlaces.whatsapp },
  { nombre: "Instagram", detalle: "@sanjuanboscomty", href: enlaces.instagram },
  { nombre: "Facebook", detalle: "SanJuanBoscoMTY", href: enlaces.facebook },
  { nombre: "YouTube", detalle: "Transmisiones y contenido", href: enlaces.youtube },
  { nombre: "Buzón de comentarios", detalle: "Sugerencias y quejas", href: enlaces.buzon },
  { nombre: "Todos los enlaces", detalle: "Linktree de la parroquia", href: enlaces.linktree },
];

export default function Contacto() {
  const oficina = otrosHorarios.find((o) => o.titulo === "Oficina parroquial");

  return (
    <>
      <CabeceraPagina
        rotulo="Contacto"
        titulo="*Aquí* estamos"
        entrada="Pasa a la oficina, escríbenos o simplemente llega a una misa. Cualquiera de las tres funciona."
      />

      <section className="contenedor pb-20 md:pb-28">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <Reveal tipo="izq" className="panel rounded-3xl p-6 sm:p-9">
            <h2 className="rotulo">Dirección</h2>
            <address className="mt-4 not-italic text-xl font-semibold leading-snug sm:text-2xl md:mt-5">
              {parroquia.direccion.calle}
              <br />
              {parroquia.direccion.colonia}, {parroquia.direccion.cp}
              <br />
              {parroquia.direccion.ciudad}
            </address>
            <div className="mt-7 md:mt-8">
              <BotonPrincipal href={parroquia.direccion.maps} externo>
                Abrir en Google Maps
              </BotonPrincipal>
            </div>
          </Reveal>

          <Reveal tipo="der" className="panel rounded-3xl p-6 sm:p-9">
            <h2 className="rotulo">Oficina parroquial</h2>
            <ul className="mt-4 space-y-1 text-lg md:mt-5 md:space-y-2">
              {oficina?.lineas.map((linea) => (
                <li key={linea}>{linea}</li>
              ))}
            </ul>
            <div className="mt-7 md:mt-8">
              <BotonSecundario href={enlaces.whatsapp} externo>
                Escríbenos por WhatsApp
              </BotonSecundario>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-4 md:mt-6">
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {canales.map((canal) => (
              <li
                key={canal.nombre}
                className="group bg-noche/90 transition-colors duration-500 hover:bg-azul/45 active:bg-azul/45 md:bg-noche/70 md:backdrop-blur-xl"
              >
                <a href={canal.href} target="_blank" rel="noreferrer" className="block p-6 sm:p-8">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    {canal.nombre}
                    <span
                      aria-hidden
                      className="text-alba opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-active:translate-x-1 group-active:opacity-100"
                    >
                      →
                    </span>
                  </h3>
                  <p className="mt-1.5 text-sm text-blanco/60 sm:mt-2">{canal.detalle}</p>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-4 overflow-hidden rounded-3xl border border-white/12 md:mt-6">
          <iframe
            title="Mapa de la Parroquia San Juan Bosco"
            src="https://www.google.com/maps?q=Bogot%C3%A1%20211%2C%20Alta%20Vista%2C%2064840%20Monterrey%2C%20N.L.&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[260px] w-full grayscale-[0.35] contrast-[1.05] sm:h-[340px] md:h-[420px]"
          />
        </Reveal>
      </section>
    </>
  );
}
