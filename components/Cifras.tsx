import Reveal from "./Reveal";
import { cifras, grupos, misasPorSemana, sacramentos } from "@/lib/site";

/**
 * La parroquia en números.
 *
 * Ninguna cifra está escrita a mano: se cuentan desde los mismos datos que
 * arman los horarios y las tarjetas, así que si mañana se abre una pastoral
 * o se mueve una misa, la banda se actualiza sola y nunca contradice al
 * resto del sitio.
 */
export default function Cifras() {
  const datos = [
    { n: misasPorSemana(), pie: cifras.misas },
    { n: grupos.length, pie: cifras.grupos },
    { n: sacramentos.length, pie: cifras.sacramentos },
    { n: 1, pie: cifras.camino },
  ];

  return (
    <section className="contenedor py-4 md:py-8">
      <Reveal>
        <p className="rotulo">{cifras.rotulo}</p>
      </Reveal>
      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/12 bg-white/12 md:mt-8 md:grid-cols-4">
        {datos.map((dato, i) => (
          <Reveal
            key={dato.pie}
            tipo="escala"
            delay={i * 0.05}
            className="bg-noche/90 p-6 sm:p-8 md:bg-noche/70 md:backdrop-blur-xl"
          >
            <dt className="numero text-blanco">{dato.n}</dt>
            <dd className="mt-3 text-sm leading-snug text-blanco/60 md:mt-4">{dato.pie}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
