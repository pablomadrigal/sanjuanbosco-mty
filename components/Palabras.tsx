import { Fragment } from "react";
import type { CSSProperties } from "react";

/**
 * Un titular que llega palabra por palabra.
 *
 * Cada palabra entra un tramo después que la anterior, así que el título se
 * arma frente a quien lee en vez de aparecer de golpe. Como todo lo demás,
 * es CSS: si el navegador no soporta líneas de tiempo de scroll —o si
 * alguien pidió menos movimiento— el titular simplemente ya está escrito.
 *
 * Dos marcas dentro del texto:
 * - `*palabra*` va en la serif cursiva de la marca.
 * - `_palabra_` lleva un subrayado trazado a mano que se dibuja al aparecer.
 *
 * `"Hay misa a *cualquier hora* que _puedas llegar_"`.
 */
/**
 * El trazo del subrayado. La curva es irregular a propósito: una línea recta
 * se lee como un borde de CSS, y una torcida como una mano.
 */
function Trazo() {
  return (
    <svg
      aria-hidden
      className="subrayado"
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M3 11.5C46 5.5 92 3.4 143 6.2 189 8.7 243 12.6 296 6"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={320}
        strokeDasharray={320}
      />
    </svg>
  );
}

export default function Palabras({
  texto,
  /** true sobre el pliegue: el escalón lo marca el reloj, no el scroll. */
  entrada = false,
  /** Retraso inicial, en segundos, cuando la entrada es por reloj. */
  desde = 0,
}: {
  texto: string;
  entrada?: boolean;
  desde?: number;
}) {
  // Los tramos impares de cada partición son los que venían marcados.
  const palabras = texto.split("*").flatMap((tramo, t) =>
    tramo.split("_").flatMap((trozo, u) =>
      trozo
        .split(/\s+/)
        .filter(Boolean)
        .map((palabra) => ({ palabra, acento: t % 2 === 1, trazo: u % 2 === 1 })),
    ),
  );

  return (
    <>
      {palabras.map(({ palabra, acento, trazo }, i) => (
        // El espacio va FUERA del span: dentro de una caja inline-block se
        // colapsa contra el borde y las palabras terminan pegadas.
        <Fragment key={`${i}-${palabra}`}>
          <span
            data-palabra={entrada ? "reloj" : ""}
            style={
              entrada
                ? ({ "--retraso": `${desde + i * 0.055}s` } as CSSProperties)
                : // El escalón se detiene a las ocho palabras: más allá, la
                  // última llegaría cuando el título ya lleva rato en pantalla.
                  ({ "--escalon": `${Math.min(i * 3, 24)}%` } as CSSProperties)
            }
            className={`${acento ? "acento" : ""}${trazo ? " relative" : ""}`.trim() || undefined}
          >
            {palabra}
            {trazo && <Trazo />}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}
