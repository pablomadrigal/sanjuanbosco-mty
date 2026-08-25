import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Camino from "@/components/three/Camino";
import AccionesMovil from "@/components/AccionesMovil";
import SmoothScroll from "@/components/SmoothScroll";
import { parroquia } from "@/lib/site";
import { sitioUrl } from "@/lib/url";

/* Gotham es la tipografía de marca, pero su licencia no permite publicarla en
   un repositorio abierto. Archivo comparte su geometría y su altura de x, así
   que sostiene el mismo tono junto al logotipo original. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(sitioUrl),
  title: {
    default: `${parroquia.nombre} · Monterrey`,
    template: `%s · ${parroquia.nombreCorto}`,
  },
  description: `${parroquia.lema}. Horarios de misa, grupos, sacramentos y formación en la ${parroquia.nombre}, ${parroquia.diocesis}.`,
  keywords: [
    "Parroquia San Juan Bosco",
    "Monterrey",
    "misas",
    "pastoral universitaria",
    "Arquidiócesis de Monterrey",
    "Siempre Alegres",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: parroquia.nombre,
    title: parroquia.nombre,
    description: parroquia.lema,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: parroquia.lema }],
  },
  twitter: {
    card: "summary_large_image",
    title: parroquia.nombre,
    description: parroquia.lema,
    images: ["/og.png"],
  },
  icons: {
    icon: "/brand/isotipo-azul.png",
    apple: "/brand/logo-cuadrado-blanco.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#232038",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  /* La página se dibuja bajo el notch y bajo la barra de gestos; los
     márgenes seguros los pone `contenedor` con env(safe-area-inset-*). */
  viewportFit: "cover",
  /* Al abrir el teclado la ventana no se reacomoda: nada salta de lugar
     mientras alguien escribe. */
  interactiveWidget: "resizes-content",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${archivo.variable} ${instrument.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <Camino />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-blanco focus:px-5 focus:py-3 focus:font-semibold focus:text-noche"
        >
          Saltar al contenido
        </a>
        <Nav />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <AccionesMovil />
        {/* Encima de todo, incluso del texto: es lo que hace que la página se
            sienta impresa y no renderizada. No se toca ni se lee. */}
        <div aria-hidden className="grano" />
      </body>
    </html>
  );
}
