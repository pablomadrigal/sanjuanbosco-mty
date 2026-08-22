import type { MetadataRoute } from "next";
import { navegacion } from "@/lib/site";
import { sitioUrl } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["/", ...navegacion.map((n) => n.href)];
  return rutas.map((ruta) => ({
    url: new URL(ruta, sitioUrl).toString(),
    lastModified: new Date(),
    changeFrequency: ruta === "/horarios" ? "weekly" : "monthly",
    priority: ruta === "/" ? 1 : 0.7,
  }));
}
