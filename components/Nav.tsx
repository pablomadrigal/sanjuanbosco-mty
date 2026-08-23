"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navegacion, enlaces, parroquia } from "@/lib/site";

export default function Nav() {
  const [desplazado, setDesplazado] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const ruta = usePathname();

  useEffect(() => {
    const alScroll = () => setDesplazado(window.scrollY > 24);
    alScroll();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  useEffect(() => setAbierto(false), [ruta]);

  useEffect(() => {
    if (!abierto) return;
    document.body.style.overflow = "hidden";
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", alTeclear);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", alTeclear);
    };
  }, [abierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-500 ${
        desplazado || abierto
          ? "border-b border-white/10 bg-noche lg:bg-noche/80 lg:backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="contenedor flex h-[var(--barra)] items-center justify-between gap-4">
        <Link
          href="/"
          className="-my-2 flex shrink-0 items-center gap-3 py-2"
          aria-label={`${parroquia.nombre}, inicio`}
        >
          <Image
            src="/brand/isotipo-blanco.png"
            alt=""
            width={668}
            height={711}
            sizes="40px"
            loading="eager"
            className="h-8 w-auto lg:h-9"
          />
          {/* Con el menú abierto el nombre completo estorba: el logotipo ya
              dice dónde estamos y el ancho hace falta para el botón. */}
          <span className={`leading-none ${abierto ? "hidden sm:block" : "block"}`}>
            <span className="block text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-blanco/55 sm:text-[0.5625rem] sm:tracking-[0.2em]">
              Parroquia Universitaria
            </span>
            <span className="mt-1 block text-sm font-extrabold uppercase tracking-[0.04em] sm:text-base">
              San Juan Bosco
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navegacion.map((item) => {
            const activo = ruta === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activo ? "text-blanco" : "text-blanco/65 hover:text-blanco"
                  }`}
                >
                  {activo && (
                    <motion.span
                      layoutId="nav-activo"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={enlaces.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-blanco px-5 py-2.5 text-sm font-semibold text-noche transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97] sm:inline-flex lg:inline-flex"
          >
            Escríbenos
          </a>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors duration-200 active:bg-white/10 lg:hidden"
          >
            <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-blanco transition-transform duration-300 ${
                  abierto ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-[6px] h-px bg-blanco transition-opacity duration-200 ${
                  abierto ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute inset-x-0 top-3 h-px bg-blanco transition-transform duration-300 ${
                  abierto ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Cuánto llevas del camino. La dibuja la línea de tiempo del scroll:
          ni un listener, ni un re-render. */}
      <div aria-hidden className="avance" />

      {/* El menú ocupa la pantalla completa por debajo de la barra: así los
          destinos caen en la zona del pulgar y la lista puede desplazarse
          sola en un teléfono chico sin arrastrar la página de atrás. */}
      <AnimatePresence>
        {abierto && (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-[calc(var(--barra)+env(safe-area-inset-top))] overflow-y-auto overscroll-contain bg-noche lg:hidden"
          >
            <div className="contenedor flex min-h-full flex-col pb-[calc(2rem+env(safe-area-inset-bottom))] pt-2">
              <ul className="flex flex-col">
                {navegacion.map((item, i) => (
                  <li
                    key={item.href}
                    data-entrada
                    style={{ "--retraso": `${0.04 + i * 0.045}s` } as React.CSSProperties}
                  >
                    <Link
                      href={item.href}
                      aria-current={ruta === item.href ? "page" : undefined}
                      className={`group flex min-h-[3.5rem] items-center justify-between gap-4 border-b border-white/10 py-3 text-xl font-semibold tracking-tight transition-colors active:text-alba sm:text-2xl ${
                        ruta === item.href ? "text-alba" : ""
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className="text-alba opacity-0 transition-all duration-300 group-active:translate-x-1.5 group-active:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div
                className="mt-auto pt-8"
                data-entrada
                style={{ "--retraso": "0.3s" } as React.CSSProperties}
              >
                <a
                  href={enlaces.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[3.25rem] w-full items-center justify-center rounded-full bg-blanco px-6 font-semibold text-noche transition-transform duration-200 active:scale-[0.98]"
                >
                  Escríbenos por WhatsApp
                </a>
                <a
                  href={parroquia.direccion.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex min-h-[3.25rem] w-full items-center justify-center rounded-full border border-white/25 px-6 font-semibold transition-colors duration-200 active:bg-white/10"
                >
                  Cómo llegar
                </a>
                <address className="mt-6 text-center text-sm not-italic leading-relaxed text-blanco/50">
                  {parroquia.direccion.calle} · {parroquia.direccion.colonia}
                  <br />
                  {parroquia.direccion.ciudad}
                </address>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
