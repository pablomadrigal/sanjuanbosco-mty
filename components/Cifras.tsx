import Reveal from "./Reveal";
import { cifras, grupos, misasPorSemana, sacramentos } from "@/lib/site";

/**
 * La parroquia en números, a sangre y sin cajas.
 *
 * Cuatro tarjetas iguales en una rejilla es la forma más rápida de que algo
 * se vea salido de una plantilla. Aquí no hay tarjeta: hay números enormes
 * sobre el fondo, separados por una regla, y una etiqueta diminuta debajo. El
 * contraste de tamaño es todo el diseño.
 *
 * Ninguna cifra está escrita a mano: se cuentan desde los mismos datos que
 * arman los horarios, así que si mañana se abre una pastoral o se mueve una
 * misa, la banda se actualiza sola.
 */
export default function Cifras() {
  const datos = [
    { n: misasPorSemana(), pie: cifras.misas },
    { n: grupos.length, pie: cifras.grupos },
    { n: sacramentos.length, pie: cifras.sacramentos },
    { n: 1, pie: cifras.camino },
  ];

  return (
    <section className="border-y border-white/10 py-10 md:py-14">
      <div className="contenedor">
        <Reveal>
          <p className="rotulo">{cifras.rotulo}</p>
        </Reveal>
        <dl className="mt-7 grid grid-cols-2 gap-y-9 md:mt-10 md:grid-cols-4 md:gap-y-0">
          {datos.map((dato, i) => (
            <Reveal
              key={dato.pie}
              tipo="escala"
              delay={i * 0.05}
              /* Regla vertical entre columnas, no un borde alrededor de cada
                 número: la separación es una línea, no una caja. */
              className={[
                "pr-4 md:pr-8",
                i % 2 === 1 ? "border-l border-white/10 pl-5" : "",
                i > 0 ? "md:border-l md:border-white/10 md:pl-8" : "md:pl-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <dt className="numero text-blanco">{dato.n}</dt>
              <dd className="mt-3 max-w-[14ch] text-sm leading-snug text-blanco/55 md:mt-5">
                {dato.pie}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
