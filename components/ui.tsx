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
  /**
   * Admite las marcas de `Palabras`: `*cursiva*`, `_subrayado_`, `=plumón=`.
   * El título entra entero, no palabra por palabra: hay cuatro por página.
   */
  titulo: string;
  descripcion?: string;
  accion?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
      <Reveal>
        <p className="rotulo">{rotulo}</p>
        <h2 className="display-md mt-4 max-w-2xl text-balance">
          <Palabras texto={titulo} />
        </h2>
        {descripcion && <p className="prosa mt-4 md:mt-5">{descripcion}</p>}
      </Reveal>
      {accion && (
        <Reveal className="shrink-0">
          <EnlaceFlecha href={accion.href}>{accion.label}</EnlaceFlecha>
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
    <header className="contenedor pb-10 pt-24 md:pb-16 md:pt-36">
      <Reveal entrada>
        <p className="rotulo">{rotulo}</p>
      </Reveal>
      <h1 className="display-lg mt-4 max-w-4xl text-balance md:mt-5">
        <Palabras texto={titulo} entrada desde={0.1} />
      </h1>
      {entrada && (
        <Reveal entrada delay={0.3}>
          <p className="prosa mt-5 md:mt-7">{entrada}</p>
        </Reveal>
      )}
    </header>
  );
}

/* Los botones ocupan el ancho completo en el teléfono: es lo que hace que se
   puedan tocar sin apuntar, y apilados dejan clarísimo cuál es el primero.

   Lo que responde al dedo dura 120 ms. Antes eran 300, más un brillo que
   cruzaba el botón principal cada cinco segundos para siempre: en la portada
   se ve una vez y entretiene, en la sexta pantalla ya es un tic. */
const baseBoton =
  "toque relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-center font-semibold min-h-[3.25rem] transition duration-[120ms] ease-salida active:scale-[0.97] sm:w-auto";

export function BotonPrincipal({
  href,
  children,
  externo,
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
}) {
  const clases = `${baseBoton} bg-blanco text-noche hover:bg-alba-tenue`;
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
  const clases = `${baseBoton} border border-regla-viva text-blanco hover:bg-white/8 active:bg-white/10`;
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

/**
 * La tercera acción.
 *
 * Dos píldoras apiladas eran la única forma de ofrecer algo en todo el sitio,
 * y repetidas cinco veces son justo lo que hace que una página parezca salida
 * de una plantilla. Cuando la segunda opción no compite con la primera —«ver
 * el horario completo», «abrir el directorio»— no necesita marco: es un
 * enlace, y se lee como tal.
 */
export function EnlaceFlecha({
  href,
  children,
  externo,
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
}) {
  /* `w-fit`: `toque` es `inline-flex`, y dentro de una columna flex se estira
     al ancho del contenedor. El subrayado se iba entonces de lado a lado del
     panel y se leía como una regla divisoria, no como un enlace. */
  const clases =
    "group toque w-fit gap-2 border-b border-alba/40 pb-0.5 text-sm font-semibold text-alba transition-colors duration-[120ms] hover:border-alba";
  const contenido = (
    <>
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-[120ms] ease-salida group-hover:translate-x-1 group-active:translate-x-1"
      >
        →
      </span>
    </>
  );
  return externo ? (
    <a href={href} target="_blank" rel="noreferrer" className={clases}>
      {contenido}
    </a>
  ) : (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  );
}

export function Cita({ children, autor }: { children: ReactNode; autor: string }) {
  return (
    <figure className="max-w-3xl">
      <blockquote className="font-serif text-[clamp(1.5rem,1rem+2.8vw,3.25rem)] leading-[1.14] text-balance text-blanco">
        <span className="text-alba">«</span>
        {children}
        <span className="text-alba">»</span>
      </blockquote>
      <figcaption className="rotulo mt-5 md:mt-6">{autor}</figcaption>
    </figure>
  );
}
