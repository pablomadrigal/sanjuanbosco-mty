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
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="rotulo">{rotulo}</p>
        <h2 className="display-md mt-4 max-w-2xl text-balance">{titulo}</h2>
        {descripcion && <p className="prosa mt-5">{descripcion}</p>}
      </div>
      {accion && (
        <Link
          href={accion.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-alba"
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
    <header className="contenedor pb-14 pt-36 md:pb-20 md:pt-44">
      <Reveal entrada>
        <p className="rotulo">{rotulo}</p>
        <h1 className="display-lg mt-5 max-w-4xl text-balance">{titulo}</h1>
        {entrada && <p className="prosa mt-7">{entrada}</p>}
      </Reveal>
    </header>
  );
}

export function BotonPrincipal({
  href,
  children,
  externo,
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
}) {
  const clases =
    "inline-flex items-center justify-center gap-2 rounded-full bg-blanco px-7 py-3.5 font-semibold text-noche transition-transform duration-300 hover:scale-[1.03]";
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
  const clases =
    "inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold text-blanco transition-colors duration-300 hover:border-white/60 hover:bg-white/5";
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
      <blockquote className="font-serif text-[clamp(1.5rem,1rem+2.4vw,3rem)] leading-[1.12] text-balance text-blanco/92">
        «{children}»
      </blockquote>
      <figcaption className="rotulo mt-6">{autor}</figcaption>
    </figure>
  );
}
