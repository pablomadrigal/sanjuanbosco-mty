"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suave, sólo donde hace falta.
 *
 * Lenis existe para domar la rueda del mouse, que avanza a saltos. El dedo no
 * tiene ese problema: el sistema ya trae su propia inercia, mejor calibrada
 * que cualquier cosa que pongamos encima, y sustituirla cuesta un
 * requestAnimationFrame permanente —es decir, batería— a cambio de un scroll
 * que se siente prestado. En el teléfono no lo cargamos siquiera.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let cuadro = 0;
    const paso = (t: number) => {
      lenis.raf(t);
      cuadro = requestAnimationFrame(paso);
    };
    cuadro = requestAnimationFrame(paso);

    return () => {
      cancelAnimationFrame(cuadro);
      lenis.destroy();
    };
  }, []);

  return null;
}
