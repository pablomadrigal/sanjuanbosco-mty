/**
 * Contenido de la parroquia. Un solo lugar para editar textos, horarios y enlaces.
 * Fuentes: sanjuanbosco.mx, @sanjuanboscomty, linktr.ee/SanJuanBoscoMTY,
 * sites.google.com/arquidiocesismty.org/grupos-sjb
 *
 * Los datos de las comunidades —días, horas y cuentas de Instagram— salen del
 * directorio de grupos de la parroquia, que se llena por ciclo escolar.
 * Conviene repasarlos cada agosto, cuando los grupos vuelven a arrancar.
 */

export const parroquia = {
  nombre: "Parroquia Universitaria San Juan Bosco",
  nombreCorto: "San Juan Bosco",
  diocesis: "Arquidiócesis de Monterrey",
  lema: "Camino de encuentro que forma discípulos",
  hashtag: "#SiempreAlegres",
  bio: "Camino de encuentro que forma discípulos misioneros.",
  mision:
    "Somos un hogar alegre de puertas abiertas que posibilita el encuentro con Jesús, acompañando en las distintas etapas de la vida, creciendo en sabiduría, gracia y caridad, para formar discípulos misioneros para el mundo.",
  direccion: {
    calle: "Bogotá 211",
    colonia: "Col. Alta Vista",
    cp: "64840",
    ciudad: "Monterrey, Nuevo León",
    completa: "Bogotá 211, Col. Alta Vista, 64840, Monterrey, N.L.",
    maps: "https://maps.google.com/?q=Parroquia+San+Juan+Bosco+Bogot%C3%A1+211+Alta+Vista+Monterrey",
  },
  fiesta: "31 de enero",
} as const;

/**
 * La primera línea de la portada, compuesta en tipografía.
 *
 * Antes el H1 era la imagen del lema y el titular no existía: la pantalla
 * abría con un logotipo. El lema sigue firmando abajo, pero lo primero que se
 * lee ahora es una frase, y dice lo único que hace falta decir a alguien que
 * llega desde el celular buscando a qué hora es la misa.
 *
 * Admite las marcas de `Palabras`: `*cursiva*`, `_subrayado_`, `=plumón=`.
 */
export const portada = {
  titular: "Llega a la misa que =te acomode=",
  entrada:
    "Somos San Juan Bosco: una comunidad de puertas abiertas en Alta Vista, Monterrey. Quédate el tiempo que quieras.",
} as const;

export const enlaces = {
  instagram: "https://www.instagram.com/sanjuanboscomty/",
  facebook: "https://www.facebook.com/SanJuanBoscoMTY",
  youtube: "https://www.youtube.com/channel/UCNAAF6M488ekxYmgKREHcXg",
  whatsapp: "https://wa.me/message/OT3V5QRC4VTIG1",
  linktree: "https://linktr.ee/SanJuanBoscoMTY",
  grupos: "https://sites.google.com/arquidiocesismty.org/grupos-sjb",
  /* OJO: el misal es un diseño nuevo cada semana, no un enlace que se
     actualice solo. Éste es el del domingo XXIII del Tiempo Ordinario; el
     anterior llevaba un mes apuntando al XIX. Se cambia junto con el
     Linktree, o se apunta al Linktree y se pierde un toque a cambio de que
     nunca esté viejo. */
  misal: "https://canva.link/ncjtre0jbbmug8a",
  calendarioMisas:
    "https://calendar.google.com/calendar/u/0/embed?src=qi7vo2ui9bu0je4b1egu9fa334@group.calendar.google.com&ctz=America/Mexico_City",
  buzon: "https://forms.gle/YDxQoNPpw14d6wEQ7",
  diplomado:
    "https://docs.google.com/document/d/1ij_WNXUKSeQxiA_nj3u4Sxewj7Pc3K8NNQydGooNxms/edit",
  christianusDuctor:
    "https://docs.google.com/document/d/1rwG8bccwc_i2YDJU0hqO2N4nK1s51ohBlJo-flnNi68/edit",
} as const;

/** dia: 0 = domingo … 6 = sábado (igual que Date.getDay) */
export type Misa = { hora: string; nota?: string };
export type BloqueMisas = { dias: number[]; etiqueta: string; corta: string; misas: Misa[] };

export const misas: BloqueMisas[] = [
  {
    dias: [0],
    etiqueta: "Domingo",
    corta: "Dom",
    misas: [
      { hora: "7:00" },
      { hora: "8:30" },
      { hora: "10:00", nota: "Con niños" },
      { hora: "11:30" },
      { hora: "13:00" },
      { hora: "17:30", nota: "Juvenil" },
      { hora: "19:00" },
      { hora: "20:30" },
    ],
  },
  {
    dias: [1, 2, 3, 4, 5],
    etiqueta: "Lunes a viernes",
    corta: "L–V",
    misas: [{ hora: "7:00" }, { hora: "12:00" }, { hora: "19:00" }],
  },
  {
    dias: [6],
    etiqueta: "Sábado",
    corta: "Sáb",
    misas: [
      { hora: "7:00" },
      { hora: "17:30", nota: "Cumple el precepto dominical" },
      { hora: "19:00", nota: "Cumple el precepto dominical" },
    ],
  },
];

export const otrosHorarios = [
  {
    titulo: "Confesiones",
    lineas: ["Lunes a viernes · 18:00 a 19:00", "Jueves · 20:00 a 21:00, en la Hora Santa"],
  },
  { titulo: "Hora Santa", lineas: ["Jueves · 20:00 a 21:00"] },
  {
    titulo: "Capilla de Adoración",
    lineas: ["Abierta las 24 horas, los siete días de la semana"],
  },
  {
    titulo: "Oficina parroquial",
    lineas: ["Lunes a viernes · 9:00 a 13:00 y 15:00 a 19:00", "Sábado · 9:00 a 13:00"],
  },
];

/**
 * Una comunidad concreta dentro de una pastoral.
 *
 * La pastoral es la puerta —«Pastoral de Adolescentes y Jóvenes»—; la
 * comunidad es a lo que de verdad llegas un sábado a las cuatro. Nadie se
 * junta con una pastoral: se junta con Semana U. Por eso el día y la hora
 * viven aquí, que es la pregunta que sigue a «¿cuál es el mío?».
 */
export type Comunidad = {
  slug: string;
  nombre: string;
  para: string;
  /** Cuándo se juntan. Se omite en los que dependen del calendario del año. */
  cuando?: string;
  /** Cuenta propia del grupo, sin arroba. */
  instagram?: string;
  descripcion: string;
  /** true: también se junta en la sección de universitarios. */
  uni?: boolean;
};

export type Grupo = {
  slug: string;
  nombre: string;
  para: string;
  descripcion: string;
  instagram?: string;
  comunidades?: Comunidad[];
};

export const grupos: Grupo[] = [
  {
    slug: "infantil",
    nombre: "Pastoral Infantil",
    para: "Niñas y niños",
    descripcion:
      "Acompaña a los más pequeños de la parroquia con juego, oración y comunidad, junto a sus familias.",
  },
  {
    slug: "catequetica",
    nombre: "Pastoral Catequética",
    para: "Preparación sacramental",
    descripcion:
      "Catequesis para Primera Comunión y Confirmación, y formación permanente de catequistas.",
  },
  {
    slug: "adolescentes-jovenes",
    nombre: "Pastoral de Adolescentes y Jóvenes",
    para: "12 a 20 años",
    descripcion:
      "Grupos semanales donde se hace amistad, se reza y se crece. El corazón juvenil de la parroquia.",
    comunidades: [
      {
        slug: "iuvenis",
        nombre: "Iuvenis",
        para: "Secundaria",
        cuando: "Sábados de 16:00 a 18:00",
        instagram: "iuvenis.sjb",
        descripcion:
          "Formación cristiana para adolescentes: actividades, juegos, dinámicas y momentos de oración.",
      },
      {
        slug: "misiones-santo-domingo",
        nombre: "Misiones Santo Domingo",
        para: "Secundaria",
        cuando: "Sábados previos a cada misión",
        instagram: "msd.sjb",
        descripcion:
          "Misiones urbanas para chavos de secundaria, en tres semanas del año: Semana Santa, verano y Adviento.",
      },
      {
        slug: "misiones-don-bosco",
        nombre: "Misiones Don Bosco",
        para: "Prepa y universidad",
        cuando: "Sábados previos a cada misión, de 12:00 a 15:00",
        instagram: "mdb.sjb",
        uni: true,
        descripcion:
          "Misiones rurales en Semana Santa, verano y Adviento. Se va a servir y a evangelizar, y de ahí salen las amistades que quedan para toda la vida.",
      },
      {
        slug: "semana-u",
        nombre: "Semana U",
        para: "Universitarios",
        cuando: "Sábados de 16:00 a 18:00",
        instagram: "sumonterrey",
        uni: true,
        descripcion:
          "Universitarios que se juntan a formarse y a preparar un retiro kerigmático que se hace una vez al año, en verano. Es el más recomendable si nunca has estado en un grupo.",
      },
    ],
  },
  {
    slug: "universitaria",
    nombre: "Pastoral Universitaria",
    para: "Estudiantes",
    descripcion:
      "Comunidad para quienes están en la universidad: fe pensada, discutida y vivida entre semestres.",
  },
  {
    slug: "profesionistas",
    nombre: "Pastoral de Profesionistas",
    para: "Recién egresados y jóvenes adultos",
    descripcion:
      "Para quienes ya trabajan y buscan seguir creciendo en la fe con gente que va en su misma etapa.",
    comunidades: [
      {
        slug: "mision-catolica-de-profesionistas",
        nombre: "Misión Católica de Profesionistas",
        para: "22 a 35 años",
        cuando: "Lunes 19:30",
        instagram: "mcpmonterrey",
        descripcion:
          "Formación cristiana y oración carismática para vivir un encuentro personal con Cristo.",
      },
      {
        slug: "fratelli",
        nombre: "Fratelli",
        para: "22 a 28 años",
        cuando: "Martes 20:00, en el Ágora de San Pablo",
        instagram: "fratellisjb",
        descripcion:
          "Para quienes acaban de salir de la universidad y buscan qué les pide Dios en esta etapa.",
      },
      {
        slug: "fe-y-cerveza",
        nombre: "Fe y Cerveza",
        para: "Mayores de 28",
        cuando: "Martes de 20:00 a 22:00, en la terraza",
        instagram: "feycerveza",
        descripcion:
          "Encuentro de jóvenes adultos donde se hace comunidad, se dialoga y se crece en la fe.",
      },
      {
        slug: "apostolado-de-la-cruz",
        nombre: "Apostolado de la Cruz",
        para: "22 a 34 años",
        instagram: "apcsjboscomty",
        descripcion:
          "Un espacio para integrar a Dios en el trabajo y en las relaciones, desde la espiritualidad del Apostolado de la Cruz y de la beata Conchita Cabrera.",
      },
    ],
  },
  {
    slug: "adultos-familiar",
    nombre: "Pastoral de Adultos y Familiar",
    para: "Matrimonios y familias",
    descripcion:
      "Acompañamiento a matrimonios, papás y adultos que quieren caminar juntos en comunidad.",
  },
  {
    slug: "liturgica",
    nombre: "Pastoral Litúrgica",
    para: "Servicio en la misa",
    descripcion:
      "Coros, monaguillos, lectores y ministros extraordinarios de la comunión: quienes sostienen la celebración.",
  },
  {
    slug: "social",
    nombre: "Pastoral Social",
    para: "Servicio y caridad",
    descripcion:
      "Obras de caridad y acompañamiento a quien más lo necesita. «Siempre ha de triunfar la caridad.»",
  },
  {
    slug: "devociones",
    nombre: "Pastoral de Devociones",
    para: "Oración y piedad",
    descripcion:
      "Grupos de oración y devociones que sostienen la vida espiritual de la parroquia durante el año.",
    comunidades: [
      {
        slug: "mater-dei",
        nombre: "Mater Dei",
        para: "18 a 28 años",
        cuando: "Sábados 16:00, en el salón Pablo VI",
        uni: true,
        descripcion:
          "Oración y comunidad para jóvenes, cada sábado por la tarde. Es el grupo de devociones que va con la edad de la universidad.",
      },
    ],
  },
  {
    slug: "alpha",
    nombre: "Alpha",
    para: "Primer acercamiento",
    instagram: "alphasjb",
    descripcion:
      "Sesiones abiertas para preguntar lo que sea sobre la fe, sin requisitos y sin compromiso. Corre para adolescentes, universitarios, profesionistas y adultos, y hay versiones para novios y para matrimonios.",
  },
];

export type Obra = {
  slug: string;
  nombre: string;
  para: string;
  descripcion: string;
};

/**
 * Las obras de la parroquia.
 *
 * No son pastorales —no te inscribes a ellas ni se reúnen los martes—, son
 * dos cosas concretas que la parroquia sostiene y a las que se llega por la
 * puerta de enfrente: una mesa y una familia. Por eso viven en su propia
 * lista y no dentro de `grupos`: la cuenta de pastorales sigue siendo la del
 * directorio de la Arquidiócesis.
 */
export const obras: Obra[] = [
  {
    slug: "adopta-un-foraneo",
    nombre: "Adopta un foráneo",
    para: "Si llegaste de otra ciudad",
    descripcion:
      "Cada año, familias de la parroquia adoptan a estudiantes que llegaron de fuera: una casa donde caer a comer, alguien a quien llamar y con quién pasar la fiesta cuando no se alcanza a ir a casa.",
  },
  {
    slug: "comedor-santa-martha",
    nombre: "Comedor Santa Martha",
    para: "Una mesa puesta",
    descripcion:
      "El comedor de la parroquia, de la Pastoral Social: se cocina, se pone la mesa y se acompaña a quien llega a ella. Es de los lugares más fáciles para empezar a servir sin comprometerte todavía con un grupo.",
  },
];

export type Sacramento = {
  slug: string;
  nombre: string;
  resumen: string;
  pasos: string[];
};

export const sacramentos: Sacramento[] = [
  {
    slug: "bautizo",
    nombre: "Bautizo",
    resumen: "El primer paso del camino. Para bebés, niños y también adultos.",
    pasos: [
      "Pasa a la oficina parroquial con el acta de nacimiento.",
      "Papás y padrinos toman la plática pre-bautismal.",
      "Se aparta la fecha de la celebración.",
    ],
  },
  {
    slug: "primera-comunion",
    nombre: "Primera Comunión",
    resumen: "Catequesis para niñas y niños que se preparan para recibir la Eucaristía.",
    pasos: [
      "Inscripción en la oficina al inicio del ciclo de catequesis.",
      "Presenta acta de bautismo y de nacimiento.",
      "Dos años de catequesis acompañados de la familia.",
    ],
  },
  {
    slug: "confirmacion",
    nombre: "Confirmación",
    resumen: "Para adolescentes y adultos que quieren confirmar su fe.",
    pasos: [
      "Inscripción en la oficina parroquial.",
      "Proceso de formación con el equipo de catequesis.",
      "Elección de padrino o madrina confirmado y practicante.",
    ],
  },
  {
    slug: "confesion",
    nombre: "Confesión",
    resumen:
      "Lunes a viernes de 18:00 a 19:00, y los jueves de 20:00 a 21:00 durante la Hora Santa.",
    pasos: [
      "Llega directo en el horario de confesiones, sin cita.",
      "Si necesitas otro horario, pregunta en la oficina.",
    ],
  },
  {
    slug: "matrimonio",
    nombre: "Matrimonio",
    resumen: "Prepara tu boda por la Iglesia con tiempo suficiente.",
    pasos: [
      "Acércate a la oficina al menos seis meses antes.",
      "Presenten actas de bautismo recientes y de nacimiento.",
      "Curso prematrimonial y plática con el sacerdote.",
    ],
  },
  {
    slug: "unción",
    nombre: "Unción de enfermos",
    resumen: "Para personas enfermas, mayores o antes de una cirugía. En la parroquia o a domicilio.",
    pasos: [
      "Llama o pasa a la oficina parroquial.",
      "Indica dirección y estado de la persona enferma.",
    ],
  },
];

export type Convocatoria = {
  slug: string;
  nombre: string;
  descripcion: string;
  href: string;
  cta: string;
};

export const formacion: Convocatoria[] = [
  {
    slug: "diplomado",
    nombre: "Diplomado en Teología para Jóvenes 2026",
    descripcion:
      "Un año para entender lo que crees: teología, pensamiento cristiano y transformación social, para universitarios y jóvenes adultos.",
    href: enlaces.diplomado,
    cta: "Ver convocatoria",
  },
  {
    slug: "christianus-ductor",
    nombre: "Christianus Ductor 2026",
    descripcion:
      "Formación para líderes y coordinadores de los grupos parroquiales, con fundamento cristiano y teológico.",
    href: enlaces.christianusDuctor,
    cta: "Ver convocatoria",
  },
  {
    slug: "misal",
    nombre: "Misal digital",
    descripcion:
      "Las lecturas y el orden de la misa, listos en tu celular antes de que empiece la celebración.",
    href: enlaces.misal,
    cta: "Abrir misal",
  },
];

/**
 * La sección para universitarios.
 *
 * Somos parroquia universitaria y cada agosto llega gente que no conoce nada:
 * el grupo está en una página, los sacramentos en otra, la formación en otra
 * y el comedor y «Adopta un foráneo» no estaban en ninguna. Buscar por partes
 * lo que se decide en una tarde es justo lo que hace que nadie se quede.
 *
 * Esta es la página donde todo eso está junto, y no duplica una línea: cada
 * ficha se escribe UNA vez en su lista de siempre —`grupos`, `obras`,
 * `sacramentos`, `formacion`— y aquí sólo se referencia por su slug. Si
 * mañana cambia la descripción de Alpha, cambia en los dos lados a la vez.
 * Las páginas por separado siguen existiendo tal cual: esto se suma, no
 * sustituye.
 *
 * Los títulos admiten las marcas de `Palabras`, y el subrayado a mano
 * (`_palabra_`) va una sola vez por página: aquí, en «tu gente».
 */
export type Referencia = {
  lista: "obras" | "grupos" | "comunidades" | "sacramentos" | "formacion";
  slug: string;
};

export type BloqueUniversitarios = {
  id: string;
  rotulo: string;
  titulo: string;
  texto: string;
  fichas: Referencia[];
  accion: { href: string; label: string };
};

export const universitarios = {
  titular: "Si estás en la uni, *empieza aquí*",
  entrada:
    "Llegaste a Monterrey a estudiar, o llevas aquí toda la vida y ahora te tocó la universidad. Esta página junta todo lo que la parroquia tiene para ti: tu grupo, los sacramentos, la formación, el comedor y la familia que adopta a los foráneos. Así no lo tienes que buscar por partes, y cada cosa sigue teniendo su propia página por si prefieres verla aparte.",
  bloques: [
    {
      id: "de-fuera",
      rotulo: "Si llegaste de fuera",
      titulo: "No pases el semestre *solo*",
      texto:
        "Monterrey se hace enorme cuando no conoces a nadie. Estas dos son las que la vuelven menos ajena: una familia que te adopta y una mesa donde siempre hay lugar.",
      fichas: [
        { lista: "obras", slug: "adopta-un-foraneo" },
        { lista: "obras", slug: "comedor-santa-marta" },
      ],
      accion: { href: "/grupos#obras", label: "Ver las obras" },
    },
    {
      id: "tu-grupo",
      rotulo: "Tu grupo",
      titulo: "Encuentra a _tu gente_",
      texto:
        "Un grupo es la diferencia entre venir a misa y pertenecer a algo. Nadie se junta con una pastoral: se junta con Semana U un sábado a las cuatro. Éstos son los que van con tu edad, con su día y su hora; el resto está en la página de grupos.",
      fichas: [
        { lista: "comunidades", slug: "semana-u" },
        { lista: "comunidades", slug: "misiones-don-bosco" },
        { lista: "comunidades", slug: "mater-dei" },
        { lista: "grupos", slug: "alpha" },
      ],
      accion: { href: "/grupos", label: "Ver todos los grupos" },
    },
    {
      id: "sacramentos",
      rotulo: "Sacramentos",
      titulo: "Da el paso que *te toca*",
      texto:
        "Mucha gente llega a la universidad sin confirmar, o sin confesarse desde la primera comunión. Ni es tarde ni es raro: aquí se prepara a adultos todo el año.",
      fichas: [
        { lista: "sacramentos", slug: "confirmacion" },
        { lista: "sacramentos", slug: "confesion" },
        { lista: "sacramentos", slug: "bautizo" },
        { lista: "sacramentos", slug: "matrimonio" },
      ],
      accion: { href: "/sacramentos", label: "Cómo empezar el trámite" },
    },
    {
      id: "formacion",
      rotulo: "Formación",
      titulo: "La fe también *se estudia*",
      texto:
        "Somos parroquia universitaria: aquí la fe se piensa y se discute, no sólo se practica. Estas son las convocatorias abiertas.",
      fichas: [
        { lista: "formacion", slug: "diplomado" },
        { lista: "formacion", slug: "christianus-ductor" },
        { lista: "formacion", slug: "misal" },
      ],
      accion: { href: "/formacion", label: "Ver convocatorias" },
    },
  ] as BloqueUniversitarios[],
  cierre: {
    titulo: "¿No sabes por dónde entrar?",
    texto:
      "Escríbenos por WhatsApp y te decimos cuál te queda. O más fácil: llega a la misa juvenil del domingo y pregunta por alguien del equipo. Nadie llegó conociendo a nadie.",
  },
};

export type Ficha = {
  nombre: string;
  texto: string;
  href: string;
  /** Cuándo se junta y dónde seguirlo. La pregunta que sigue al nombre. */
  nota?: string;
  externo?: boolean;
};

/** Todas las comunidades, sin importar de qué pastoral cuelguen. */
export function todasLasComunidades(): Comunidad[] {
  return grupos.flatMap((grupo) => grupo.comunidades ?? []);
}

/**
 * Resuelve una referencia de la sección de universitarios a la ficha que ya
 * existe en su lista. El texto se escribe una vez y se lee en los dos lados;
 * el enlace siempre lleva a la página por separado, que sigue siendo la de
 * siempre.
 */
export function resolver({ lista, slug }: Referencia): Ficha | null {
  if (lista === "comunidades") {
    const ficha = todasLasComunidades().find((f) => f.slug === slug);
    if (!ficha) return null;
    return {
      nombre: ficha.nombre,
      texto: ficha.descripcion,
      href: `/grupos#${ficha.slug}`,
      nota: [ficha.cuando, ficha.instagram && `@${ficha.instagram}`].filter(Boolean).join(" · "),
    };
  }

  if (lista === "obras" || lista === "grupos") {
    const fuente: (Obra | Grupo)[] = lista === "obras" ? obras : grupos;
    const ficha = fuente.find((f) => f.slug === slug);
    if (!ficha) return null;
    return {
      nombre: ficha.nombre,
      texto: ficha.descripcion,
      href: `/grupos#${ficha.slug}`,
      nota: "instagram" in ficha && ficha.instagram ? `@${ficha.instagram}` : undefined,
    };
  }

  if (lista === "sacramentos") {
    const ficha = sacramentos.find((f) => f.slug === slug);
    if (!ficha) return null;
    return { nombre: ficha.nombre, texto: ficha.resumen, href: `/sacramentos#${ficha.slug}` };
  }

  const ficha = formacion.find((f) => f.slug === slug);
  if (!ficha) return null;
  return { nombre: ficha.nombre, texto: ficha.descripcion, href: ficha.href, externo: true };
}

export const equipo = [
  { nombre: "Pbro. Alejandro Beltrán", cargo: "Párroco" },
  { nombre: "Pbro. Jesús Treviño", cargo: "Vicario parroquial" },
  { nombre: "Pbro. Edgar Montejano", cargo: "Vicario parroquial" },
];

export const frasesDonBosco = [
  "La santidad consiste en estar siempre alegres.",
  "Alegría, estudio y piedad: el mejor programa para ser feliz.",
  "¡Mi mayor satisfacción es verte alegre!",
  "Siempre ha de triunfar la caridad.",
];

/**
 * Banda que corre sin parar entre secciones. Se lee en bucle, así que cada
 * línea tiene que funcionar sola: es un lema, no una oración larga.
 */
export const marquesina = [
  "Camino de encuentro",
  "que forma discípulos",
  "#SiempreAlegres",
  "Parroquia Universitaria",
  "San Juan Bosco",
  "Monterrey",
];

/**
 * Etiquetas de la banda de cifras de la portada. Los números no se escriben
 * aquí: se cuentan solos desde `misas`, `grupos` y `sacramentos`, para que
 * nunca digan una cosa distinta al resto del sitio.
 */
export const cifras = {
  rotulo: "La parroquia en números",
  misas: "misas cada semana",
  grupos: "pastorales",
  sacramentos: "sacramentos",
  camino: "camino, y es de todos",
};

/**
 * Las puertas de entrada desde la portada.
 *
 * La portada invita; el detalle vive en su página. Quien llega al sitio viene
 * casi siempre por el horario de misa, y quien además quiere quedarse necesita
 * una puerta clara —no el catálogo completo de diez pastorales antes de haber
 * decidido nada.
 *
 * La primera es la de universitarios porque es la que más gente cruza: somos
 * parroquia universitaria y cada agosto llega una generación nueva.
 */
export const puertas = [
  {
    href: "/universitarios",
    rotulo: "Si estás en la uni",
    titulo: "Para universitarios",
    texto:
      "Tu grupo, los sacramentos, la formación, el comedor Santa Martha y la familia que adopta a los foráneos: todo lo de la uni junto, sin buscarlo por partes.",
    cta: "Empieza aquí",
  },
  {
    href: "/grupos",
    rotulo: "Encuentra tu lugar",
    titulo: "Grupos y pastorales",
    texto:
      "Diez pastorales organizadas por edad, por intereses o por el servicio que hacen. En todas pasa lo mismo: amistad, formación y oración.",
    cta: "Ver los grupos",
  },
  {
    href: "/sacramentos",
    rotulo: "Da un paso",
    titulo: "Sacramentos",
    texto:
      "Bautizo, primera comunión, confirmación, confesión, matrimonio y unción: qué llevar y en qué orden, para no hacer el viaje dos veces.",
    cta: "Cómo empezar",
  },
  {
    href: "/formacion",
    rotulo: "Estudia lo que crees",
    titulo: "Formación",
    texto:
      "El Diplomado en Teología para Jóvenes, Christianus Ductor y el misal digital. Aquí la fe se piensa y se discute.",
    cta: "Ver convocatorias",
  },
];

/** Misas que se celebran en una semana, sumando todos los bloques. */
export function misasPorSemana() {
  return misas.reduce((total, bloque) => total + bloque.dias.length * bloque.misas.length, 0);
}

export const navegacion = [
  { href: "/horarios", label: "Horarios" },
  { href: "/universitarios", label: "Universitarios" },
  { href: "/grupos", label: "Grupos" },
  { href: "/sacramentos", label: "Sacramentos" },
  { href: "/formacion", label: "Formación" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];
