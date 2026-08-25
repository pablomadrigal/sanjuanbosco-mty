"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CaminoScene = dynamic(() => import("./CaminoScene"), { ssr: false });

type NavegadorConPistas = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * ¿Vale la pena encender WebGL en este aparato?
 *
 * El camino es la idea del sitio, pero no es la información: los horarios, la
 * dirección y los grupos se leen igual sin él. En un teléfono de gama baja, o
 * con datos contados, encender una escena 3D es cobrarle a alguien batería y
 * megas por un fondo. Ante la duda, gana el degradado de CSS —que ya pinta la
 * noche y el alba— y la página queda ligera.
 */
function valeLaPena() {
  const nav = navigator as NavegadorConPistas;

  // Ahorro de datos activado: es una petición explícita, se respeta.
  if (nav.connection?.saveData) return false;

  // Red lenta: primero que cargue el texto.
  const red = nav.connection?.effectiveType ?? "";
  if (red === "slow-2g" || red === "2g" || red === "3g") return false;

  // Aparatos con poca memoria o pocos núcleos: el canvas se los come.
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return false;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) return false;

  return true;
}

/**
 * Fondo fijo de toda la página. El degradado de CSS pinta la noche y el alba
 * sobre el horizonte; el canvas sólo dibuja el camino encima.
 */
export default function Camino() {
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    if (!valeLaPena()) return;

    // Evita cargar WebGL en el primer pintado: la página debe leerse antes.
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setMontado(true), { timeout: 600 })
      : window.setTimeout(() => setMontado(true), 250);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  return (
    /* Alto fijo en `lvh`, no en `inset-0`: en el teléfono la barra del
       navegador aparece y desaparece al desplazarse, y si el fondo siguiera esa
       altura se redimensionaría el canvas a media lectura. */
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[100lvh] w-full overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 62% at 50% 76%, rgba(127,178,229,0.20) 0%, rgba(35,32,56,0) 58%)," +
            "radial-gradient(80% 42% at 50% 68%, rgba(245,230,200,0.13) 0%, rgba(35,32,56,0) 60%)," +
            "linear-gradient(180deg, #1b1c1b 0%, #232038 42%, #20486b 100%)",
        }}
      />
      {montado && <CaminoScene />}
      {/* Viñeta: aterriza el contenido sobre el fondo sin robarle brillo.
          Desde que el contenido dejó de vivir en tarjetas, este velo es lo
          único que separa el texto del camino, así que carga más peso: tiene
          que dejar leer una hora de misa encima de un faro sin apagar el
          camino que queda a la derecha.
          En el teléfono el texto cruza el centro de la pantalla, así que el
          velo es parejo en vez de venir sólo desde la izquierda. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,28,27,0.80) 0%, rgba(27,28,27,0.58) 45%, rgba(27,28,27,0.50) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(27,28,27,0.86) 0%, rgba(27,28,27,0.62) 38%, rgba(27,28,27,0.28) 66%, rgba(27,28,27,0) 88%)," +
            "radial-gradient(110% 80% at 50% 40%, rgba(27,28,27,0) 46%, rgba(27,28,27,0.6) 100%)",
        }}
      />
    </div>
  );
}
