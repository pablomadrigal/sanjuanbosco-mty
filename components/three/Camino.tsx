"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CaminoScene = dynamic(() => import("./CaminoScene"), { ssr: false });

/**
 * Fondo fijo de toda la página. El degradado de CSS pinta la noche y el alba
 * sobre el horizonte; el canvas sólo dibuja el camino encima.
 */
export default function Camino() {
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    // Evita cargar WebGL en el primer pintado: la página debe leerse antes.
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setMontado(true), { timeout: 1200 })
      : window.setTimeout(() => setMontado(true), 400);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else clearTimeout(id as number);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
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
      {/* Viñeta: aterriza el contenido sobre el fondo sin robarle brillo. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(27,28,27,0.78) 0%, rgba(27,28,27,0.30) 42%, rgba(27,28,27,0) 68%)," +
            "radial-gradient(110% 80% at 50% 40%, rgba(27,28,27,0) 46%, rgba(27,28,27,0.6) 100%)",
        }}
      />
    </div>
  );
}
