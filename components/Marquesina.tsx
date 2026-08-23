import { marquesina } from "@/lib/site";

/**
 * La banda que no se detiene.
 *
 * Es lo único del sitio que se mueve sin que nadie haga nada, y es a
 * propósito: le pone pulso a la página aunque quien la abrió se haya quedado
 * quieto. Corre en bucle porque el lema también es un bucle —el camino no
 * empieza ni termina en la pantalla.
 *
 * Decorativa: todo lo que dice ya está escrito en la portada y en el pie, así
 * que un lector de pantalla no tiene por qué oírlo seis veces.
 */
export default function Marquesina({ vuelta = "38s" }: { vuelta?: string }) {
  const tira = (
    <ul className="flex shrink-0 items-center">
      {marquesina.map((linea, i) => (
        <li key={linea} className="flex items-center gap-6 px-6 md:gap-10 md:px-10">
          <span
            className={
              i % 2
                ? "font-serif text-2xl italic text-alba-tenue md:text-4xl"
                : "text-xl font-extrabold uppercase tracking-[-0.02em] md:text-3xl"
            }
          >
            {linea}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-alba" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden className="marquesina my-16 py-5 md:my-24 md:py-7">
      {/* La pista lleva la tira dos veces y se desplaza medio ancho: cuando
          termina la primera copia, la segunda ya está exactamente donde
          estaba la primera y el bucle no tiene costura. */}
      <div className="marquesina-pista" style={{ "--vuelta": vuelta } as React.CSSProperties}>
        {tira}
        {tira}
      </div>
    </div>
  );
}
