import { Fragment } from "react";
import type { CSSProperties } from "react";

/**
 * Un titular con marcas de mano.
 *
 * Tres marcas dentro del texto:
 * - `*palabra*` va en la serif cursiva de la marca.
 * - `_palabra_` lleva un subrayado trazado a mano que se dibuja al aparecer.
 * - `=palabra=` va remarcada con plumón, como en un cuaderno de clase.
 *
 * `"Hay misa a *cualquier hora* que _puedas llegar_"`.
 *
 * Con `entrada`, el titular llega palabra por palabra. Eso se reserva al H1
 * de cada página: es el único de la pantalla, se ve una vez y lo marca el
 * reloj, no el scroll. Los títulos de sección llegan enteros —hacerlos entrar
 * palabra por palabra cuatro veces por página no era un detalle, era un
 * retraso, y ligado al scroll dejaba el título medio transparente justo
 * mientras alguien lo leía.
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

/**
 * La mancha del plumón. Bordes desiguales y esquinas romas: un rectángulo
 * redondeado se ve como un `<mark>` de navegador, no como tinta.
 */
function Mancha() {
  return (
    <svg
      aria-hidden
      className="resaltado"
      viewBox="0 0 300 44"
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <path d="M5.4 33.6C3.1 22.4 4.8 11.6 10.2 8.4 24 5.1 52 6.4 96 5.2c52-1.4 118 .6 158-1.1 20.4-.9 33.6.4 35.4 5.6 2.9 8.6 1.4 20.4-3.2 26.2-14.6 4.2-52 2.4-104 3.4-46 .9-104-.5-142 .9-19.6.7-32.2-1.2-34.8-6.6Z" />
    </svg>
  );
}

export default function Palabras({
  texto,
  /** true en el H1 de la página: llega palabra por palabra, por reloj. */
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
      trozo.split("=").flatMap((pedazo, v) =>
        pedazo
          .split(/\s+/)
          .filter(Boolean)
          .map((palabra) => ({
            palabra,
            acento: t % 2 === 1,
            trazo: u % 2 === 1,
            mancha: v % 2 === 1,
          })),
      ),
    ),
  );

  return (
    <>
      {palabras.map(({ palabra, acento, trazo, mancha }, i) => (
        // El espacio va FUERA del span: dentro de una caja inline-block se
        // colapsa contra el borde y las palabras terminan pegadas.
        <Fragment key={`${i}-${palabra}`}>
          <span
            data-palabra={entrada ? "" : undefined}
            style={entrada ? ({ "--retraso": `${desde + i * 0.05}s` } as CSSProperties) : undefined}
            className={
              `${acento ? "acento" : ""}${trazo || mancha ? " relative inline-block" : ""}`.trim() ||
              undefined
            }
          >
            {/* La mancha va ANTES que la palabra: las dos están posicionadas,
                así que el orden del marcado es el que decide cuál se pinta
                encima. Con `z-index: -1` se colaría detrás de la sección. */}
            {mancha && <Mancha />}
            {mancha ? <span className="relative">{palabra}</span> : palabra}
            {trazo && <Trazo />}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}
