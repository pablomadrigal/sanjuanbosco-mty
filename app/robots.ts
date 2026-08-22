import type { MetadataRoute } from "next";
import { sitioUrl } from "@/lib/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", sitioUrl).toString(),
  };
}
