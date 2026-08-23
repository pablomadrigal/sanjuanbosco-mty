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
 * Las palabras entre asteriscos van en la serif cursiva de la marca:
 * `"Hay misa a *cualquier hora* que puedas llegar"`.
 */
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
  // Los tramos impares son los que venían entre asteriscos.
  const palabras = texto.split("*").flatMap((tramo, t) =>
    tramo
      .split(/\s+/)
      .filter(Boolean)
      .map((palabra) => ({ palabra, acento: t % 2 === 1 })),
  );

  return (
    <>
      {palabras.map(({ palabra, acento }, i) => (
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
            className={acento ? "acento" : undefined}
          >
            {palabra}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}
