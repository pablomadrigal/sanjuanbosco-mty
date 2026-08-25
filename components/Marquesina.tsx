import { marquesina } from "@/lib/site";

/**
 * La banda que no se detiene.
 *
 * Es lo único del sitio que se mueve sin que nadie haga nada, y en pantalla
 * grande son dos corriendo en sentidos opuestos: una sola se lee como un
 * adorno, dos cruzándose se leen como energía. El desfase entre ellas —la
 * segunda empieza por otra frase— es lo que evita que parezcan la misma línea
 * duplicada.
 *
 * En el teléfono corre una sola. La segunda iba al 45 % de opacidad sobre 390
 * px de ancho: no se leía, sólo emborronaba a la primera, y costaba una
 * segunda capa compuesta corriendo para siempre en una GPU de mano.
 *
 * Decorativas: todo lo que dicen ya está escrito en la portada y en el pie,
 * así que un lector de pantalla no tiene por qué oírlo doce veces.
 */
function Tira({ lineas, desde }: { lineas: string[]; desde: number }) {
  return (
    <ul className="flex shrink-0 items-center">
      {lineas.map((linea, i) => (
        <li key={linea} className="flex items-center gap-5 px-5 md:gap-8 md:px-8">
          <span
            className={
              (i + desde) % 2
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
}

export default function Marquesina({ vuelta = "38s" }: { vuelta?: string }) {
  // La segunda banda arranca a media lista para que no vaya diciendo lo mismo
  // que la primera al mismo tiempo.
  const mitad = Math.ceil(marquesina.length / 2);
  const vuelto = [...marquesina.slice(mitad), ...marquesina.slice(0, mitad)];

  return (
    <div aria-hidden className="marquesina py-4 md:py-6">
      {/* Cada pista lleva su tira dos veces y se desplaza medio ancho: cuando
          termina la primera copia, la segunda ya está exactamente donde
          estaba la primera y el bucle no tiene costura. */}
      <div className="marquesina-pista" style={{ "--vuelta": vuelta } as React.CSSProperties}>
        <Tira lineas={marquesina} desde={0} />
        <Tira lineas={marquesina} desde={0} />
      </div>
      {/* El `hidden` va en una envoltura y no en la pista: `.marquesina-pista`
          también declara `display`, y dejar que dos utilidades peleen por la
          misma propiedad es apostarle al orden en que Tailwind las ordene. */}
      <div className="hidden md:block">
        <div
          className="marquesina-pista mt-3 opacity-45"
          data-vuelta="revés"
          style={{ "--vuelta": "52s" } as React.CSSProperties}
        >
          <Tira lineas={vuelto} desde={1} />
          <Tira lineas={vuelto} desde={1} />
        </div>
      </div>
    </div>
  );
}
