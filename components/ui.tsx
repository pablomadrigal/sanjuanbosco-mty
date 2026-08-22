import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function EncabezadoSeccion({
  rotulo,
  titulo,
  descripcion,
  accion,
}: {
  rotulo: string;
  titulo: ReactNode;
  descripcion?: string;
  accion?: { href: string; label: string };
}) {
  return (
    <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
      <div>
        <p className="rotulo">{rotulo}</p>
        <h2 className="display-md mt-3 max-w-2xl text-balance md:mt-4">{titulo}</h2>
        {descripcion && <p className="prosa mt-4 md:mt-5">{descripcion}</p>}
      </div>
      {accion && (
        <Link
          href={accion.href}
          className="group toque shrink-0 gap-2 text-sm font-semibold text-alba"
        >
          {accion.label}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      )}
    </Reveal>
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
        <h1 className="display-lg mt-4 max-w-4xl text-balance md:mt-5">{titulo}</h1>
        {entrada && <p className="prosa mt-5 md:mt-7">{entrada}</p>}
      </Reveal>
    </header>
  );
}

/* Los botones ocupan el ancho completo en el teléfono: es lo que hace que se
   puedan tocar sin apuntar, y apilados dejan clarísimo cuál es el primero. */
const baseBoton =
  "inline-flex w-full items-center justify-center gap-2 rounded-full px-7 text-center font-semibold min-h-[3.25rem] transition-transform duration-300 active:scale-[0.98] sm:w-auto";

export function BotonPrincipal({
  href,
  children,
  externo,
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
}) {
  const clases = `${baseBoton} bg-blanco text-noche hover:scale-[1.03]`;
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
        «{children}»
      </blockquote>
      <figcaption className="rotulo mt-5 md:mt-6">{autor}</figcaption>
    </figure>
  );
}
