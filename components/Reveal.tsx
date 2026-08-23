import type { CSSProperties, ReactNode } from "react";

/** Cómo entra el bloque a escena. */
export type Entrada = "subir" | "izq" | "der" | "escala" | "girar";

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
  /** Por dónde entra. Alternar `izq` y `der` es lo que le da ritmo a la página. */
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
