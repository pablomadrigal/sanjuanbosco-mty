"use client";

import { useEffect, useState } from "react";
import { misas } from "@/lib/site";

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

type Proxima = { etiqueta: string; hora: string; nota?: string; faltan: string };

/** Hora actual en la zona horaria de la parroquia, no en la del visitante. */
function ahoraEnMonterrey() {
  const fmt = new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Monterrey",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const partes = fmt.formatToParts(new Date());
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "0";
  const corto = valor("weekday").toLowerCase().replace(".", "");
  const dia = DIAS.findIndex((d) => d.startsWith(corto.slice(0, 3)));
  return {
    dia: dia < 0 ? new Date().getDay() : dia,
    minutos: Number(valor("hour")) * 60 + Number(valor("minute")),
  };
}

function calcular(): Proxima | null {
  const { dia, minutos } = ahoraEnMonterrey();

  for (let salto = 0; salto <= 7; salto++) {
    const diaObjetivo = (dia + salto) % 7;
    const bloque = misas.find((b) => b.dias.includes(diaObjetivo));
    if (!bloque) continue;

    for (const misa of bloque.misas) {
      const [h, m] = misa.hora.split(":").map(Number);
      const minutosMisa = h * 60 + m;
      if (salto === 0 && minutosMisa <= minutos) continue;

      const delta = salto * 1440 + minutosMisa - minutos;
      const horas = Math.floor(delta / 60);
      const mins = delta % 60;
      const faltan =
        horas >= 24
          ? `en ${Math.round(horas / 24)} d`
          : horas >= 1
            ? `en ${horas} h ${mins} min`
            : `en ${mins} min`;

      const etiqueta =
        salto === 0 ? "Hoy" : salto === 1 ? "Mañana" : DIAS[diaObjetivo].replace(/^./, (c) => c.toUpperCase());

      return { etiqueta, hora: misa.hora, nota: misa.nota, faltan };
    }
  }
  return null;
}

export default function ProximaMisa() {
  const [proxima, setProxima] = useState<Proxima | null>(null);

  useEffect(() => {
    setProxima(calcular());
    const id = setInterval(() => setProxima(calcular()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!proxima) return null;

  return (
    <div className="panel inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full py-2 pl-3 pr-5">
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-alba"
          style={{ animation: "latido 2.4s ease-in-out infinite" }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-alba" />
      </span>
      <span className="rotulo">Próxima misa</span>
      <span className="cifra text-sm font-semibold">
        {proxima.etiqueta} {proxima.hora}
        {proxima.nota ? ` · ${proxima.nota}` : ""}
      </span>
      <span className="text-sm text-blanco/55">{proxima.faltan}</span>
    </div>
  );
}
