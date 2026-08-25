import type { CSSProperties, ReactNode } from "react";

/**
 * Cómo entra el bloque a escena.
 *
 * Son dos, no cinco. Había también `izq`, `der` y `girar`, y alternarlos por
 * fila parecía darle ritmo a la página; lo que hacían de verdad era mover
 * cada renglón de una lista de diez pastorales 36 px en horizontal, uno para
 * cada lado, mientras alguien intentaba leerlos en un teléfono. El ritmo lo
 * tiene que poner el diseño —el tamaño de la tipografía, las reglas, el
 * bloque claro a media página—, no un vaivén distinto cada dos elementos.
 */
export type Entrada = "subir" | "escala";

type Props = {
  children: ReactNode;
  /**
   * Escalona la entrada respecto a sus hermanos de fila.
   * En la portada son segundos de retraso; en el resto de la página, donde
   * la animación la manda el scroll y no el reloj, se traduce a un tramo del
   * recorrido: 0.08 → el bloque arranca un 8 % más tarde que el primero.
   */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "figure" | "header";
  /** true en la portada: entra al cargar en vez de al aparecer. */
  entrada?: boolean;
  /** `escala` se reserva para el bloque que cierra la página. Uno por página. */
  tipo?: Entrada;
};

/**
 * Marca un bloque para que entre en escena.
 * No lleva JavaScript: la animación es puramente CSS, así que el contenido
 * se lee aunque el script nunca cargue o el navegador no la soporte.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Etiqueta = "div",
  entrada = false,
  tipo = "subir",
}: Props) {
  const estilo = delay
    ? ({ [entrada ? "--retraso" : "--escalon"]: entrada ? `${delay}s` : `${delay * 100}%` } as CSSProperties)
    : undefined;
  const marca = entrada ? { "data-entrada": "" } : { "data-reveal": tipo === "subir" ? "" : tipo };
  return (
    <Etiqueta {...marca} className={className} style={estilo}>
      {children}
    </Etiqueta>
  );
}
