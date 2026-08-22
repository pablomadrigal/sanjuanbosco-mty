"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { enlaces, parroquia } from "@/lib/site";

/**
 * Barra de acciones del teléfono.
 *
 * Casi todo el que entra al sitio lo hace desde el celular y viene por una de
 * tres cosas: a qué hora es la misa, cómo llegar, o preguntar algo. En una
 * pantalla de mano esas tres respuestas tienen que estar donde alcanza el
 * pulgar, no arriba en el encabezado.
 *
 * Aparece al dejar atrás la portada, para no tapar sus propios botones, y no
 * es el único camino a ningún lado: si el script no carga, los tres destinos
 * siguen en el menú, en el pie y en la página.
 */
export default function AccionesMovil() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Acciones rápidas"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-noche pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <ul className="grid grid-cols-3">
        <li>
          <Link
            href="/horarios"
            className="flex h-[var(--acciones)] flex-col items-center justify-center gap-0.5 text-[0.8125rem] font-semibold transition-colors active:bg-white/10"
          >
            Horarios
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-blanco/45">
              Misas
            </span>
          </Link>
        </li>
        <li>
          <a
            href={parroquia.direccion.maps}
            target="_blank"
            rel="noreferrer"
            className="flex h-[var(--acciones)] flex-col items-center justify-center gap-0.5 border-x border-white/10 text-[0.8125rem] font-semibold transition-colors active:bg-white/10"
          >
            Cómo llegar
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-blanco/45">
              {parroquia.direccion.calle}
            </span>
          </a>
        </li>
        <li>
          <a
            href={enlaces.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex h-[var(--acciones)] flex-col items-center justify-center gap-0.5 text-[0.8125rem] font-semibold text-alba transition-colors active:bg-white/10"
          >
            Escríbenos
            <span className="text-[0.625rem] font-medium uppercase tracking-[0.14em] text-blanco/45">
              WhatsApp
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
