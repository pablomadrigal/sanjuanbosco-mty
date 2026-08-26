import Image from "next/image";
import Link from "next/link";
import { enlaces, navegacion, parroquia } from "@/lib/site";

const redes = [
  { nombre: "Instagram", href: enlaces.instagram },
  { nombre: "Facebook", href: enlaces.facebook },
  { nombre: "YouTube", href: enlaces.youtube },
  { nombre: "WhatsApp", href: enlaces.whatsapp },
];

/**
 * El pie.
 *
 * En el teléfono medía 888 px —una pantalla y pico, un tercio de la página de
 * contacto entera— y casi todo era una sola columna de seis enlaces apilados:
 * con 44 px de objetivo táctil cada uno, «Secciones» sola gastaba 264 px.
 *
 * La solución no es achicar los objetivos táctiles: es dejar de apilar. Las
 * etiquetas son cortas («Horarios», «Grupos») y en renglones que envuelven
 * caben tres por línea, así que la misma lista pasa de seis renglones a dos
 * sin quitarle un píxel a lo que se toca. Los enlaces siguen midiendo 44 px.
 */
function Enlaces({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="rotulo">{titulo}</h2>
      {/* `gap-x-5` no es decoración: es la separación que mantiene a dos
          enlaces vecinos como dos objetivos distintos para el dedo. */}
      <ul className="mt-1 flex flex-wrap items-center gap-x-5 md:mt-2">{children}</ul>
    </div>
  );
}

const enlacePie =
  "toque text-suave transition-colors duration-[120ms] hover:text-blanco active:text-blanco";

export default function Footer() {
  return (
    <footer className="relative mt-12 border-t border-regla bg-tinta/85 md:mt-24 md:bg-tinta/55 md:backdrop-blur-xl">
      <div className="contenedor grid gap-7 py-8 sm:gap-12 md:py-16 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
        <div>
          <Image
            src="/brand/logo-horizontal-blanco.png"
            alt={parroquia.nombre}
            width={1400}
            height={442}
            sizes="(min-width: 768px) 220px, 160px"
            className="h-10 w-auto md:h-14"
          />
          <p className="prosa mt-4 max-w-sm md:mt-7">{parroquia.bio}</p>
          {/* Aquí iba otra vez la firma «Siempre Alegres», y en /nosotros
              quedaba a dos dedos de la que cierra la página: la misma marca
              dos veces en la misma pantalla. La firma es de las páginas; el
              pie se queda con el logotipo. */}
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="rotulo">Encuéntranos</h2>
            {/* La dirección va a lo ancho: metida en media columna de 390 px
                partía «Monterrey, Nuevo León» en dos renglones, y una
                dirección rota se lee mal justo donde alguien la está copiando
                para llegar. */}
            <address className="mt-3 not-italic leading-relaxed text-suave md:mt-4">
              {parroquia.direccion.calle}
              <br />
              {parroquia.direccion.colonia}, {parroquia.direccion.cp}
              <br />
              {parroquia.direccion.ciudad}
            </address>
          </div>

          <Enlaces titulo="Secciones">
            {navegacion.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={enlacePie}>
                  {item.label}
                </Link>
              </li>
            ))}
          </Enlaces>

          <Enlaces titulo="Síguenos">
            {redes.map((red) => (
              <li key={red.nombre}>
                <a href={red.href} target="_blank" rel="noreferrer" className={enlacePie}>
                  {red.nombre}
                </a>
              </li>
            ))}
          </Enlaces>
        </div>
      </div>

      {/* El espacio de la barra de acciones del teléfono se reserva aquí:
          la última línea del pie nunca queda debajo de ella. */}
      <div className="contenedor flex flex-col gap-1 border-t border-regla py-5 pb-[calc(1.25rem+var(--acciones)+env(safe-area-inset-bottom))] text-sm text-tenue sm:flex-row sm:items-center sm:justify-between sm:gap-3 md:py-8 lg:pb-8">
        <p>
          {parroquia.nombre} · {parroquia.diocesis}
        </p>
        <p>Fiesta patronal: {parroquia.fiesta}</p>
      </div>
    </footer>
  );
}
