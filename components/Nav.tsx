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
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        desplazado || abierto
          ? "bg-noche/80 border-b border-white/10 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="contenedor flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label={`${parroquia.nombre}, inicio`}
        >
          <Image
            src="/brand/isotipo-blanco.png"
            alt=""
            width={668}
            height={711}
            loading="eager"
            className="h-9 w-auto"
          />
          <span className="hidden leading-none sm:block">
            <span className="block text-[0.5625rem] font-semibold uppercase tracking-[0.2em] text-blanco/55">
              Parroquia Universitaria
            </span>
            <span className="mt-1 block text-base font-extrabold uppercase tracking-[0.04em]">
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

        <div className="flex items-center gap-3">
          <a
            href={enlaces.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-blanco px-5 py-2.5 text-sm font-semibold text-noche transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            Escríbenos
          </a>
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 lg:hidden"
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

      <AnimatePresence>
        {abierto && (
          <motion.div
            id="menu-movil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="contenedor flex flex-col gap-1 pb-8 pt-2">
              {navegacion.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-white/10 py-4 text-2xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-5">
                <a
                  href={enlaces.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-blanco px-6 py-3 font-semibold text-noche"
                >
                  Escríbenos por WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
