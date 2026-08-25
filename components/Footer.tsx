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
    <footer className="relative mt-16 border-t border-regla bg-tinta/85 md:mt-24 md:bg-tinta/55 md:backdrop-blur-xl">
      <div className="contenedor grid gap-10 py-12 sm:gap-14 md:py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-horizontal-blanco.png"
            alt={parroquia.nombre}
            width={1400}
            height={442}
            sizes="(min-width: 768px) 220px, 180px"
            className="h-12 w-auto md:h-14"
          />
          <p className="prosa mt-6 max-w-sm md:mt-7">{parroquia.bio}</p>
          {/* Aquí iba otra vez la firma «Siempre Alegres», y en /nosotros
              quedaba a dos dedos de la que cierra la página: la misma marca
              dos veces en la misma pantalla. La firma es de las páginas; el
              pie se queda con el logotipo. */}
        </div>

        {/* La dirección va sola y a lo ancho antes de las dos columnas de
            enlaces: metida en media columna de 390 px partía «Monterrey,
            Nuevo León» en dos renglones, y una dirección rota se lee mal
            justo donde alguien la está copiando para llegar. */}
        <div className="grid gap-10 sm:gap-12 lg:col-span-2 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="rotulo">Encuéntranos</h2>
            <address className="mt-4 not-italic leading-relaxed text-suave md:mt-5">
              {parroquia.direccion.calle}
              <br />
              {parroquia.direccion.colonia}, {parroquia.direccion.cp}
              <br />
              {parroquia.direccion.ciudad}
            </address>
          </div>

          {/* Dos columnas desde el teléfono: los enlaces del pie son cortos y
              así se ven de una sin recorrer media pantalla. */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="rotulo">Secciones</h2>
              <ul className="mt-4 md:mt-5">
                {navegacion.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="toque text-suave transition-colors duration-[120ms] hover:text-blanco active:text-blanco"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="rotulo">Síguenos</h2>
              <ul className="mt-4 md:mt-5">
                {redes.map((red) => (
                  <li key={red.nombre}>
                    <a
                      href={red.href}
                      target="_blank"
                      rel="noreferrer"
                      className="toque text-suave transition-colors duration-[120ms] hover:text-blanco active:text-blanco"
                    >
                      {red.nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* El espacio de la barra de acciones del teléfono se reserva aquí:
          la última línea del pie nunca queda debajo de ella. */}
      <div className="contenedor flex flex-col gap-2 border-t border-regla py-6 pb-[calc(1.5rem+var(--acciones)+env(safe-area-inset-bottom))] text-sm text-tenue sm:flex-row sm:items-center sm:justify-between sm:gap-3 md:py-8 lg:pb-8">
        <p>
          {parroquia.nombre} · {parroquia.diocesis}
        </p>
        <p>Fiesta patronal: {parroquia.fiesta}</p>
      </div>
    </footer>
  );
}
