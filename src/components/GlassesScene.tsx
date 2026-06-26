"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  Float,
} from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";

/* ---- One UI palette (kept in JS so materials match the site) ---- */
const ACCENT = "#0381fe";

/* Build a Wayfarer-ish lens shape: wider/flatter top, rounded bottom. */
function lensShape() {
  const s = new THREE.Shape();
  const w = 0.92;
  const h = 0.74;
  s.moveTo(-w / 2, h / 2);
  s.lineTo(w / 2, h / 2 - 0.04);
  s.bezierCurveTo(w / 2 + 0.06, -h / 2 + 0.18, w / 2 - 0.22, -h / 2, 0.04, -h / 2);
  s.bezierCurveTo(-w / 2 + 0.22, -h / 2, -w / 2 - 0.06, -h / 2 + 0.18, -w / 2, h / 2);
  return s;
}

/* A flat ring (frame rim) = the lens shape extruded with a slightly smaller hole. */
function rimGeometry() {
  const outer = lensShape();
  const inner = lensShape();
  inner.holes = [];
  const hole = new THREE.Path();
  const w = 0.78;
  const h = 0.6;
  hole.moveTo(-w / 2, h / 2);
  hole.lineTo(w / 2, h / 2 - 0.03);
  hole.bezierCurveTo(w / 2 + 0.05, -h / 2 + 0.15, w / 2 - 0.18, -h / 2, 0.03, -h / 2);
  hole.bezierCurveTo(-w / 2 + 0.18, -h / 2, -w / 2 - 0.05, -h / 2 + 0.15, -w / 2, h / 2);
  outer.holes.push(hole);
  return new THREE.ExtrudeGeometry(outer, {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: 24,
  });
}

function Temple({ side }: { side: 1 | -1 }) {
  return (
    <group position={[side * 0.98, 0.18, 0]}>
      {/* hinge block */}
      <mesh castShadow>
        <boxGeometry args={[0.1, 0.16, 0.16]} />
        <meshStandardMaterial color="#111317" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* arm going back */}
      <mesh position={[side * 0.55, 0.02, -0.55]} rotation={[0, side * 0.32, 0]} castShadow>
        <boxGeometry args={[1.2, 0.1, 0.07]} />
        <meshStandardMaterial color="#15171c" metalness={0.4} roughness={0.45} />
      </mesh>
      {/* ear bend */}
      <mesh position={[side * 1.08, -0.1, -1.02]} rotation={[0.3, side * 0.32, 0]} castShadow>
        <boxGeometry args={[0.32, 0.1, 0.07]} />
        <meshStandardMaterial color="#15171c" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  );
}

type Pin = {
  id: string;
  pos: [number, number, number];
  title: string;
  body: string;
};

const PINS: Pin[] = [
  {
    id: "lidar",
    pos: [-1.02, 0.4, 0.12],
    title: "Solid-state LiDAR",
    body: "Corner-mounted ToF emitter meshes the room to 5 m — no moving parts, depth on every glance.",
  },
  {
    id: "lens",
    pos: [0.45, 0.1, 0.16],
    title: "Waveguide lens",
    body: "Photochromic lens with a laminated micro-OLED waveguide — 2000-nit display that tints in sunlight.",
  },
  {
    id: "camera",
    pos: [0, 0.34, 0.18],
    title: "RGB + depth bridge",
    body: "Centre camera fuses colour with LiDAR depth so Galaxy AI sees exactly what you see.",
  },
  {
    id: "compute",
    pos: [1.45, 0.22, -0.5],
    title: "Neural compute core",
    body: "On-device Galaxy AI silicon in the temple runs spatial models locally — no cloud round-trip.",
  },
  {
    id: "audio",
    pos: [-1.5, 0.12, -0.55],
    title: "Touch + open-ear audio",
    body: "Capacitive temple control with bone-conduction sound that leaves your ears free.",
  },
];

function Callout({ pin, active, onHover }: { pin: Pin; active: boolean; onHover: (id: string | null) => void }) {
  return (
    <group position={pin.pos}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(pin.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={active ? 2.5 : 1.2} />
      </mesh>
      <Html
        center
        distanceFactor={8}
        occlude={false}
        zIndexRange={[40, 0]}
        style={{ pointerEvents: "none", transition: "opacity .2s", opacity: active ? 1 : 0.92 }}
      >
        <div
          style={{
            transform: `scale(${active ? 1.04 : 1})`,
            transition: "transform .15s",
            width: active ? 200 : "auto",
            whiteSpace: active ? "normal" : "nowrap",
            background: "rgba(255,255,255,0.96)",
            color: "#0a0a0a",
            border: "1px solid rgba(3,129,254,0.35)",
            borderRadius: 14,
            padding: active ? "10px 12px" : "5px 11px",
            boxShadow: "0 8px 28px rgba(16,24,40,0.18)",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "-0.01em", color: ACCENT }}>
            {pin.title}
          </div>
          {active && (
            <div style={{ marginTop: 4, fontSize: 11, lineHeight: 1.45, color: "#5a6172" }}>
              {pin.body}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function Glasses() {
  const rim = useMemo(() => rimGeometry(), []);
  const lens = useMemo(() => new THREE.ExtrudeGeometry(lensShape(), { depth: 0.03, bevelEnabled: false, curveSegments: 24 }), []);
  const [hover, setHover] = useState<string | null>(null);

  const frameMat = (
    <meshPhysicalMaterial color="#0c0e12" metalness={0.5} roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.25} />
  );

  return (
    <group rotation={[0.08, 0, 0]}>
      {/* Frame rims */}
      {([-0.98, 0.98] as const).map((x) => (
        <mesh key={x} geometry={rim} position={[x, 0.18, 0]} castShadow>
          {frameMat}
        </mesh>
      ))}
      {/* Lenses (tinted, slightly transmissive look) */}
      {([-0.98, 0.98] as const).map((x) => (
        <mesh key={`l${x}`} geometry={lens} position={[x, 0.18, 0.04]}>
          <meshPhysicalMaterial
            color="#0a1424"
            metalness={0}
            roughness={0.08}
            transmission={0.55}
            thickness={0.5}
            ior={1.5}
            transparent
            opacity={0.82}
          />
        </mesh>
      ))}
      {/* Bridge */}
      <mesh position={[0, 0.34, 0.02]} castShadow>
        <boxGeometry args={[0.42, 0.1, 0.12]} />
        {frameMat}
      </mesh>
      {/* Camera dot on bridge */}
      <mesh position={[0, 0.34, 0.1]}>
        <cylinderGeometry args={[0.045, 0.045, 0.05, 20]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#05070b" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* LiDAR accent nub (top-left corner) */}
      <mesh position={[-1.42, 0.5, 0.08]}>
        <boxGeometry args={[0.16, 0.1, 0.1]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.4} />
      </mesh>

      <Temple side={1} />
      <Temple side={-1} />

      {PINS.map((p) => (
        <Callout key={p.id} pin={p} active={hover === p.id} onHover={setHover} />
      ))}
    </group>
  );
}

export default function GlassesScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.3, 4.2], fov: 38 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -3]} intensity={0.6} color={ACCENT} />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
        <Glasses />
      </Float>
      <ContactShadows position={[0, -0.9, 0]} opacity={0.35} scale={6} blur={2.6} far={3} />
      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}
