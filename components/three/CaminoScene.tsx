"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * El camino.
 * El lema 2026 de la parroquia es «Camino de encuentro que forma discípulos»,
 * así que la página entera es ese camino: una carretera que serpentea hacia
 * una cruz encendida en el horizonte, y el scroll es lo que avanza por ella.
 */

const NOCHE = new THREE.Color("#232038");
const AZUL_PROFUNDO = new THREE.Color("#20486b");
const ALBA = new THREE.Color("#7fb2e5");
const LUZ = new THREE.Color("#5c93cf");

const LARGO = 260;
const LATERAL = 4.2;

/**
 * Lo que la escena se puede gastar en este aparato.
 *
 * Un teléfono dibuja el mismo camino en una pantalla cinco veces más chica y
 * con una GPU que además tiene que durar el día. Bajar la densidad de píxeles,
 * apagar el suavizado y recortar estrellas y segmentos no se nota a esa
 * escala, y es la diferencia entre un fondo que acompaña y uno que calienta el
 * teléfono.
 */
function presupuesto() {
  const movil = window.matchMedia("(max-width: 47.99rem)").matches;
  return movil
    ? { estrellas: 240, segmentos: 190, dpr: [1, 1.25] as [number, number], suavizado: false }
    : { estrellas: 700, segmentos: 420, dpr: [1, 1.75] as [number, number], suavizado: true };
}

function crearCurva() {
  const puntos: THREE.Vector3[] = [];
  const pasos = 24;
  for (let i = 0; i <= pasos; i++) {
    const t = i / pasos;
    const z = -t * LARGO;
    // Serpenteo que se calma conforme se acerca a la cruz.
    const amplitud = 13 * (1 - t * 0.82);
    const x = Math.sin(t * Math.PI * 2.15) * amplitud;
    // Sube al final: el camino termina en una loma.
    const y = Math.pow(t, 2.6) * 16 - Math.sin(t * Math.PI * 3) * 0.7;
    puntos.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(puntos, false, "catmullrom", 0.5);
}

function crearGeometriaCamino(curva: THREE.CatmullRomCurve3, segmentos = 420, ancho = 4.6) {
  const posiciones = new Float32Array((segmentos + 1) * 2 * 3);
  const uvs = new Float32Array((segmentos + 1) * 2 * 2);
  const indices: number[] = [];
  const arriba = new THREE.Vector3(0, 1, 0);
  const lado = new THREE.Vector3();

  for (let i = 0; i <= segmentos; i++) {
    const t = i / segmentos;
    const p = curva.getPointAt(t);
    const tan = curva.getTangentAt(t);
    lado.crossVectors(tan, arriba).normalize().multiplyScalar(ancho / 2);

    const base = i * 6;
    posiciones[base] = p.x - lado.x;
    posiciones[base + 1] = p.y - lado.y;
    posiciones[base + 2] = p.z - lado.z;
    posiciones[base + 3] = p.x + lado.x;
    posiciones[base + 4] = p.y + lado.y;
    posiciones[base + 5] = p.z + lado.z;

    const baseUv = i * 4;
    uvs[baseUv] = 0;
    uvs[baseUv + 1] = t;
    uvs[baseUv + 2] = 1;
    uvs[baseUv + 3] = t;

    if (i < segmentos) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(posiciones, 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying float vDepth;

  uniform float uTime;
  uniform vec3 uCerca;
  uniform vec3 uLejos;
  uniform vec3 uLuz;
  uniform float uNiebla;

  void main() {
    // Distancia al centro del camino: 0 en el eje, 1 en la orilla.
    float d = abs(vUv.x - 0.5) * 2.0;

    vec3 color = mix(uCerca, uLejos, smoothstep(0.0, 0.85, vUv.y));
    float alfa = 0.14;

    // Orillas encendidas: dan la silueta del camino de noche.
    float orilla = smoothstep(0.80, 1.0, d);
    color += uLuz * orilla * 0.95;
    alfa += orilla * 0.42;

    // Raya central discontinua, como la de una carretera.
    float centro = 1.0 - smoothstep(0.0, 0.045, d);
    float guion = step(0.45, fract(vUv.y * 120.0 - uTime * 0.55));
    color += uLuz * centro * guion * 0.85;
    alfa += centro * guion * 0.36;

    // Tres pulsos de luz recorriendo el camino hacia la cruz, en fila y a
    // distinta velocidad. Uno solo se leía como un destello suelto; varios
    // se leen como tráfico: el camino está vivo y va a algún lado.
    float pulso = 0.0;
    for (int i = 0; i < 3; i++) {
      float fase = float(i) * 0.333;
      float onda = fract(vUv.y - uTime * (0.075 + float(i) * 0.018) - fase);
      pulso += exp(-pow(onda * 8.0, 2.0)) + exp(-pow((onda - 1.0) * 8.0, 2.0));
    }
    color += uLuz * pulso * 0.4;
    alfa += pulso * 0.18;

    // Niebla: el camino se disuelve en la noche a lo lejos.
    float niebla = 1.0 - smoothstep(uNiebla * 0.25, uNiebla, vDepth);
    alfa *= niebla;

    if (alfa < 0.004) discard;
    gl_FragColor = vec4(color, alfa);
  }
`;

function texturaResplandor() {
  const size = 128;
  const lienzo = document.createElement("canvas");
  lienzo.width = lienzo.height = size;
  const ctx = lienzo.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.28, "rgba(200,226,255,0.55)");
  grad.addColorStop(1, "rgba(160,200,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(lienzo);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Cruz({ posicion, resplandor }: { posicion: THREE.Vector3; resplandor: THREE.Texture }) {
  const grupo = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!grupo.current) return;
    const t = clock.elapsedTime;
    grupo.current.children.forEach((hijo) => {
      if ((hijo as THREE.Sprite).isSprite) {
        const s = 34 + Math.sin(t * 0.9) * 3;
        hijo.scale.set(s, s, 1);
      }
    });
  });

  return (
    <group ref={grupo} position={posicion}>
      <sprite>
        <spriteMaterial
          map={resplandor}
          transparent
          opacity={0.62}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.55, 12, 0.55]} />
        <meshBasicMaterial color="#eaf3ff" />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[5.4, 0.55, 0.55]} />
        <meshBasicMaterial color="#eaf3ff" />
      </mesh>
    </group>
  );
}

/** Dos luces que caminan juntas por delante. Nadie recorre el camino solo. */
function Caminantes({
  curva,
  resplandor,
  avance,
}: {
  curva: THREE.CatmullRomCurve3;
  resplandor: THREE.Texture;
  avance: React.RefObject<number>;
}) {
  const a = useRef<THREE.Sprite>(null);
  const b = useRef<THREE.Sprite>(null);
  const punto = useMemo(() => new THREE.Vector3(), []);
  const tangente = useMemo(() => new THREE.Vector3(), []);
  const lado = useMemo(() => new THREE.Vector3(), []);
  const arriba = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const base = Math.min(0.95, (avance.current ?? 0) * 0.72 + 0.075);
    curva.getPointAt(base, punto);
    curva.getTangentAt(base, tangente);
    lado.crossVectors(tangente, arriba).normalize();

    if (a.current) {
      a.current.position
        .copy(punto)
        .addScaledVector(lado, -1.15)
        .add(new THREE.Vector3(0, 1.15 + Math.sin(t * 2.4) * 0.14, 0));
    }
    if (b.current) {
      b.current.position
        .copy(punto)
        .addScaledVector(lado, 1.15)
        .add(new THREE.Vector3(0, 1.15 + Math.sin(t * 2.4 + 1.1) * 0.14, 0));
    }
  });

  const material = (
    <spriteMaterial
      map={resplandor}
      transparent
      opacity={0.62}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  );

  return (
    <>
      <sprite ref={a} scale={[1.5, 1.5, 1]}>{material}</sprite>
      <sprite ref={b} scale={[1.5, 1.5, 1]}>{material}</sprite>
    </>
  );
}

function Estrellas({ resplandor, cantidad }: { resplandor: THREE.Texture; cantidad: number }) {
  const geo = useMemo(() => {
    const n = cantidad;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 340;
      pos[i * 3 + 1] = Math.random() * 110 + 6;
      pos[i * 3 + 2] = -Math.random() * 340;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [cantidad]);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      (ref.current.material as THREE.PointsMaterial).opacity =
        0.5 + Math.sin(clock.elapsedTime * 0.35) * 0.1;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        map={resplandor}
        color="#cfe2f7"
        size={0.9}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Escena({
  reducido,
  estrellas,
  segmentos,
}: {
  reducido: boolean;
  estrellas: number;
  segmentos: number;
}) {
  const curva = useMemo(() => crearCurva(), []);
  const geoCamino = useMemo(() => crearGeometriaCamino(curva, segmentos), [curva, segmentos]);
  const resplandor = useMemo(() => texturaResplandor(), []);
  const { camera } = useThree();

  const avance = useRef(0);
  const objetivo = useRef(0);
  const raton = useRef({ x: 0, y: 0 });
  const mira = useMemo(() => new THREE.Vector3(), []);
  const posicion = useMemo(() => new THREE.Vector3(), []);

  // En pantallas angostas el camino vuelve al centro: no hay columna que esquivar.
  const anchoRelativo = useThree((estado) => (estado.size.width >= 900 ? 1 : 0.15));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCerca: { value: AZUL_PROFUNDO },
      uLejos: { value: LUZ },
      uLuz: { value: LUZ },
      uNiebla: { value: 175 },
    }),
    [],
  );

  const posCruz = useMemo(() => {
    const p = curva.getPointAt(0.995);
    return new THREE.Vector3(p.x, p.y + 7.4, p.z - 6);
  }, [curva]);

  useFrame(({ clock, pointer }, delta) => {
    uniforms.uTime.value = clock.elapsedTime;

    if (!reducido) {
      const doc = document.documentElement;
      const recorrible = doc.scrollHeight - window.innerHeight;
      objetivo.current = recorrible > 0 ? Math.min(1, window.scrollY / recorrible) : 0;
      raton.current.x += (pointer.x - raton.current.x) * Math.min(1, delta * 2.4);
      raton.current.y += (pointer.y - raton.current.y) * Math.min(1, delta * 2.4);
    }

    avance.current += (objetivo.current - avance.current) * Math.min(1, delta * 2.1);
    const t = avance.current * 0.72;

    curva.getPointAt(Math.min(0.999, t), posicion);
    curva.getPointAt(Math.min(0.999, t + 0.085), mira);

    // Desplazamiento lateral fijo: la cámara camina por la orilla izquierda
    // para que el camino quede a la derecha y el texto tenga su propio aire.
    const desvio = LATERAL * anchoRelativo;
    camera.position.set(
      posicion.x - desvio + raton.current.x * 2.4,
      posicion.y + 4.6 - raton.current.y * 0.8,
      posicion.z + 2.4,
    );
    camera.lookAt(mira.x - desvio, mira.y + 3.4, mira.z);
  });

  return (
    <>
      <fog attach="fog" args={["#232038", 26, 190]} />
      <Estrellas resplandor={resplandor} cantidad={estrellas} />
      <Cruz posicion={posCruz} resplandor={resplandor} />
      <mesh geometry={geoCamino}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <Caminantes curva={curva} resplandor={resplandor} avance={avance} />
    </>
  );
}

export default function CaminoScene() {
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [gasto] = useState(presupuesto);

  // Con la pestaña en segundo plano —o el teléfono guardado en la bolsa— el
  // camino deja de dibujarse. Es batería que no se gasta en nadie.
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const alCambiar = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", alCambiar);
    return () => document.removeEventListener("visibilitychange", alCambiar);
  }, []);

  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={gasto.dpr}
      gl={{
        antialias: gasto.suavizado,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 52, near: 0.1, far: 460 }}
      onCreated={({ scene }) => {
        scene.background = null;
        NOCHE.getHex();
      }}
    >
      <Escena reducido={reducido} estrellas={gasto.estrellas} segmentos={gasto.segmentos} />
    </Canvas>
  );
}
