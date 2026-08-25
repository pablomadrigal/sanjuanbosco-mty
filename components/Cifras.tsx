import Image from "next/image";
import Reveal from "./Reveal";
import { cifras, grupos, misasPorSemana, sacramentos } from "@/lib/site";

/**
 * La parroquia en números, en una página blanca.
 *
 * Todo el sitio es texto claro sobre azul noche, y ese es el problema: seis
 * pantallas del mismo tono con reglas de un píxel se leen serias y, de tanto
 * parecerse entre sí, plantilla. Aquí el camino sale de la noche y pasa por
 * una franja de día —blanco y tinta, los dos del manual, ningún color
 * nuevo—. Es el único corte de la portada y por eso funciona: da un golpe a
 * media página, parte el scroll en dos y devuelve el contraste que un
 * degradado uniforme no puede dar.
 *
 * Tampoco hay tarjetas: cuatro cajas iguales en una rejilla es la forma más
 * rápida de que algo se vea salido de una plantilla. Hay números enormes
 * sobre el papel, separados por una regla, y una etiqueta diminuta debajo. El
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
    <section className="bg-blanco text-tinta">
      {/* Más apretada que una sección normal: es una franja, y el aire de una
          sección entera en blanco la dejaba vacía en pantalla grande. */}
      <div className="contenedor py-12 md:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <p className="rotulo text-azul">{cifras.rotulo}</p>
          {/* La firma de la marca en su color, sobre papel: es la única
              pantalla del sitio donde puede ir así. */}
          <Image
            src="/brand/siempre-alegres.png"
            alt=""
            width={1600}
            height={1116}
            sizes="(min-width: 768px) 140px, 104px"
            className="h-11 w-auto md:h-16"
          />
        </Reveal>

        <dl className="mt-8 grid grid-cols-2 gap-y-8 md:mt-12 md:grid-cols-4 md:gap-y-0">
          {datos.map((dato, i) => (
            <Reveal
              key={dato.pie}
              delay={i * 0.04}
              /* Regla vertical entre columnas, no un borde alrededor de cada
                 número: la separación es una línea, no una caja. */
              className={[
                "pr-4 md:pr-8",
                i % 2 === 1 ? "border-l border-tinta/15 pl-5" : "",
                i > 0 ? "md:border-l md:border-tinta/15 md:pl-8" : "md:pl-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <dt className="numero text-azul">{dato.n}</dt>
              <dd className="mt-3 max-w-[14ch] text-sm leading-snug text-tinta/65 md:mt-5">
                {dato.pie}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
