import Image from "next/image";
import Link from "next/link";
import { enlaces, navegacion, parroquia } from "@/lib/site";

const redes = [
  { nombre: "Instagram", href: enlaces.instagram },
  { nombre: "Facebook", href: enlaces.facebook },
  { nombre: "YouTube", href: enlaces.youtube },
  { nombre: "WhatsApp", href: enlaces.whatsapp },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-tinta/55 backdrop-blur-xl">
      <div className="contenedor grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-horizontal-blanco.png"
            alt={parroquia.nombre}
            width={1400}
            height={442}
            className="h-14 w-auto"
          />
          <p className="prosa mt-7 max-w-sm">{parroquia.bio}</p>
          <Image
            src="/brand/siempre-alegres-blanco.png"
            alt={parroquia.hashtag}
            width={1600}
            height={1116}
            className="mt-8 h-20 w-auto opacity-80"
          />
        </div>

        <div>
          <h2 className="rotulo">Secciones</h2>
          <ul className="mt-5 space-y-3">
            {navegacion.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-blanco/70 transition-colors hover:text-blanco">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="rotulo">Encuéntranos</h2>
          <address className="mt-5 not-italic leading-relaxed text-blanco/70">
            {parroquia.direccion.calle}
            <br />
            {parroquia.direccion.colonia}, {parroquia.direccion.cp}
            <br />
            {parroquia.direccion.ciudad}
          </address>
          <ul className="mt-6 space-y-3">
            {redes.map((red) => (
              <li key={red.nombre}>
                <a
                  href={red.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blanco/70 transition-colors hover:text-blanco"
                >
                  {red.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="contenedor flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-blanco/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {parroquia.nombre} · {parroquia.diocesis}
        </p>
        <p>Fiesta patronal: {parroquia.fiesta}</p>
      </div>
    </footer>
  );
}
