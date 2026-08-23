import Link from "next/link";
import type { ReactNode } from "react";
import Palabras from "./Palabras";
import Reveal from "./Reveal";

export function EncabezadoSeccion({
  rotulo,
  titulo,
  descripcion,
  accion,
}: {
  rotulo: string;
  /** Lo que va entre asteriscos se compone en la serif cursiva de la marca. */
  titulo: string;
  descripcion?: string;
  accion?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
      <div>
        <Reveal tipo="izq">
          <p className="rotulo">{rotulo}</p>
        </Reveal>
        {/* El título se anima palabra por palabra, así que va fuera del
            Reveal: si no, se desvanecería dos veces. */}
        <h2 className="display-md mt-3 max-w-2xl text-balance md:mt-4">
          <Palabras texto={titulo} />
        </h2>
        {descripcion && (
          <Reveal delay={0.06}>
            <p className="prosa mt-4 md:mt-5">{descripcion}</p>
          </Reveal>
        )}
      </div>
      {accion && (
        <Reveal tipo="der" className="shrink-0">
          <Link
            href={accion.href}
            className="group toque gap-2 text-sm font-semibold text-alba"
          >
            {accion.label}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-active:translate-x-1.5">
              →
            </span>
          </Link>
        </Reveal>
      )}
    </div>
  );
}

export function CabeceraPagina({
  rotulo,
  titulo,
  entrada,
}: {
  rotulo: string;
  titulo: string;
  entrada?: string;
}) {
  return (
    /* El relleno superior sólo tiene que librar la barra (4rem en el
       teléfono): de ahí para arriba es aire que le quita pantalla al título. */
    <header className="contenedor pb-10 pt-28 sm:pt-32 md:pb-20 md:pt-44">
      <Reveal entrada>
        <p className="rotulo">{rotulo}</p>
      </Reveal>
      <h1 className="display-lg mt-4 max-w-4xl text-balance md:mt-5">
        <Palabras texto={titulo} entrada desde={0.1} />
      </h1>
      {entrada && (
        <Reveal entrada delay={0.35}>
          <p className="prosa mt-5 md:mt-7">{entrada}</p>
        </Reveal>
      )}
    </header>
  );
}

/* Los botones ocupan el ancho completo en el teléfono: es lo que hace que se
   puedan tocar sin apuntar, y apilados dejan clarísimo cuál es el primero. */
const baseBoton =
  "relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-center font-semibold min-h-[3.25rem] transition-transform duration-300 ease-camino active:scale-[0.96] sm:w-auto";

export function BotonPrincipal({
  href,
  children,
  externo,
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
}) {
  const clases = `${baseBoton} destella bg-blanco text-noche hover:scale-[1.04]`;
  return externo ? (
    <a href={href} target="_blank" rel="noreferrer" className={clases}>
      {children}
    </a>
  ) : (
    <Link href={href} className={clases}>
      {children}
    </Link>
  );
}

export function BotonSecundario({
  href,
  children,
  externo,
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
}) {
  const clases = `${baseBoton} border border-white/25 text-blanco hover:border-white/60 hover:bg-white/5 active:bg-white/10`;
  return externo ? (
    <a href={href} target="_blank" rel="noreferrer" className={clases}>
      {children}
    </a>
  ) : (
    <Link href={href} className={clases}>
      {children}
    </Link>
  );
}

export function Cita({ children, autor }: { children: ReactNode; autor: string }) {
  return (
    <figure className="max-w-3xl">
      <blockquote className="font-serif text-[clamp(1.4rem,1rem+2.4vw,3rem)] leading-[1.16] text-balance text-blanco/92 md:leading-[1.12]">
        <span className="text-alba">«</span>
        {children}
        <span className="text-alba">»</span>
      </blockquote>
      <figcaption className="rotulo mt-5 md:mt-6">{autor}</figcaption>
    </figure>
  );
}
