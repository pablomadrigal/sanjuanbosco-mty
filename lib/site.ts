/**
 * Contenido de la parroquia. Un solo lugar para editar textos, horarios y enlaces.
 * Fuentes: sanjuanbosco.mx, @sanjuanboscomty, linktr.ee/SanJuanBoscoMTY,
 * sites.google.com/arquidiocesismty.org/grupos-sjb
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

export const enlaces = {
  instagram: "https://www.instagram.com/sanjuanboscomty/",
  facebook: "https://www.facebook.com/SanJuanBoscoMTY",
  youtube: "https://www.youtube.com/channel/UCNAAF6M488ekxYmgKREHcXg",
  whatsapp: "https://wa.me/message/OT3V5QRC4VTIG1",
  linktree: "https://linktr.ee/SanJuanBoscoMTY",
  grupos: "https://sites.google.com/arquidiocesismty.org/grupos-sjb",
  misal: "https://canva.link/wtb71jkn70ktnyl",
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
    lineas: ["Jueves y viernes · 17:00 a 18:50 en oficina", "Jueves durante la Hora Santa"],
  },
  { titulo: "Hora Santa", lineas: ["Jueves · 20:00 a 21:00"] },
  {
    titulo: "Oficina parroquial",
    lineas: ["Lunes a viernes · 9:00 a 13:00 y 15:00 a 19:00", "Sábado · 9:00 a 13:00"],
  },
];

export type Grupo = {
  slug: string;
  nombre: string;
  para: string;
  descripcion: string;
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
  },
  {
    slug: "alpha",
    nombre: "Alpha",
    para: "Primer acercamiento",
    descripcion:
      "Sesiones abiertas para preguntar lo que sea sobre la fe. Sin requisitos y sin compromiso.",
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
    resumen: "Jueves y viernes de 17:00 a 18:50 en oficina, y el jueves durante la Hora Santa.",
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

export const formacion = [
  {
    nombre: "Diplomado en Teología para Jóvenes 2026",
    descripcion:
      "Un año para entender lo que crees: teología, pensamiento cristiano y transformación social, para universitarios y jóvenes adultos.",
    href: enlaces.diplomado,
    cta: "Ver convocatoria",
  },
  {
    nombre: "Christianus Ductor 2026",
    descripcion:
      "Formación para líderes y coordinadores de los grupos parroquiales, con fundamento cristiano y teológico.",
    href: enlaces.christianusDuctor,
    cta: "Ver convocatoria",
  },
  {
    nombre: "Misal digital",
    descripcion:
      "Las lecturas y el orden de la misa, listos en tu celular antes de que empiece la celebración.",
    href: enlaces.misal,
    cta: "Abrir misal",
  },
];

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
 * Las tres puertas de entrada desde la portada.
 *
 * La portada invita; el detalle vive en su página. Quien llega al sitio viene
 * casi siempre por el horario de misa, y quien además quiere quedarse necesita
 * una puerta clara —no el catálogo completo de diez pastorales antes de haber
 * decidido nada.
 */
export const puertas = [
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
    rotulo: "Somos universitarios",
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
  { href: "/grupos", label: "Grupos" },
  { href: "/sacramentos", label: "Sacramentos" },
  { href: "/formacion", label: "Formación" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];
