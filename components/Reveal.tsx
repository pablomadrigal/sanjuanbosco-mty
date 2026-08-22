import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Retraso en segundos, para escalonar elementos de una misma fila. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "figure";
  /** true en la portada: entra al cargar en vez de al aparecer. */
  entrada?: boolean;
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
}: Props) {
  const estilo = delay ? ({ "--retraso": `${delay}s` } as CSSProperties) : undefined;
  const marca = entrada ? { "data-entrada": "" } : { "data-reveal": "" };
  return (
    <Etiqueta {...marca} className={className} style={estilo}>
      {children}
    </Etiqueta>
  );
}
