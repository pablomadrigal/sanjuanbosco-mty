import type { MetadataRoute } from "next";
import { parroquia } from "@/lib/site";

/**
 * Manifiesto de aplicación web.
 *
 * Casi todas las visitas vienen del celular, y muchas se repiten: la misma
 * persona vuelve cada semana a ver a qué hora es la misa. Con esto el sitio se
 * puede guardar en la pantalla de inicio como cualquier app, abre sin la barra
 * del navegador —una franja de pantalla que se recupera— y arranca en los
 * horarios, que es a lo que se entra.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${parroquia.nombre} · Monterrey`,
    short_name: parroquia.nombreCorto,
    description: parroquia.lema,
    lang: "es-MX",
    start_url: "/horarios",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#232038",
    theme_color: "#232038",
    icons: [
      {
        src: "/brand/logo-cuadrado-blanco.png",
        sizes: "1052x1053",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/isotipo-azul.png",
        sizes: "668x711",
        type: "image/png",
      },
    ],
    shortcuts: [
      { name: "Horarios de misa", url: "/horarios" },
      { name: "Grupos", url: "/grupos" },
      { name: "Contacto", url: "/contacto" },
    ],
  };
}
