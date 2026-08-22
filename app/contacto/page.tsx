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
        titulo="Aquí estamos"
        entrada="Pasa a la oficina, escríbenos o simplemente llega a una misa. Cualquiera de las tres funciona."
      />

      <section className="contenedor pb-28">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="panel rounded-3xl p-9">
            <h2 className="rotulo">Dirección</h2>
            <address className="mt-5 not-italic text-2xl font-semibold leading-snug">
              {parroquia.direccion.calle}
              <br />
              {parroquia.direccion.colonia}, {parroquia.direccion.cp}
              <br />
              {parroquia.direccion.ciudad}
            </address>
            <div className="mt-8">
              <BotonPrincipal href={parroquia.direccion.maps} externo>
                Abrir en Google Maps
              </BotonPrincipal>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="panel rounded-3xl p-9">
            <h2 className="rotulo">Oficina parroquial</h2>
            <ul className="mt-5 space-y-2 text-lg">
              {oficina?.lineas.map((linea) => (
                <li key={linea}>{linea}</li>
              ))}
            </ul>
            <div className="mt-8">
              <BotonSecundario href={enlaces.whatsapp} externo>
                Escríbenos por WhatsApp
              </BotonSecundario>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {canales.map((canal) => (
              <li key={canal.nombre} className="bg-noche/70 backdrop-blur-xl transition-colors duration-500 hover:bg-azul/45">
                <a href={canal.href} target="_blank" rel="noreferrer" className="block p-8">
                  <h3 className="text-lg font-semibold">{canal.nombre}</h3>
                  <p className="mt-2 text-sm text-blanco/60">{canal.detalle}</p>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-6 overflow-hidden rounded-3xl border border-white/12">
          <iframe
            title="Mapa de la Parroquia San Juan Bosco"
            src="https://www.google.com/maps?q=Bogot%C3%A1%20211%2C%20Alta%20Vista%2C%2064840%20Monterrey%2C%20N.L.&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full grayscale-[0.35] contrast-[1.05]"
          />
        </Reveal>
      </section>
    </>
  );
}
