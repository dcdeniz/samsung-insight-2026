"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Float, Center } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { PINS, type Pin } from "./glassesPins";

const ACCENT = "#5fcf9e";

/* Rounded-rectangle path — the Wayfarer lens silhouette (wider than tall,
   softly rounded corners). Works for both THREE.Shape and THREE.Path. */
function roundedRect<T extends THREE.Shape | THREE.Path>(
  p: T,
  w: number,
  h: number,
  r: number,
): T {
  p.moveTo(-w / 2 + r, h / 2);
  p.lineTo(w / 2 - r, h / 2);
  p.quadraticCurveTo(w / 2, h / 2, w / 2, h / 2 - r);
  p.lineTo(w / 2, -h / 2 + r);
  p.quadraticCurveTo(w / 2, -h / 2, w / 2 - r, -h / 2);
  p.lineTo(-w / 2 + r, -h / 2);
  p.quadraticCurveTo(-w / 2, -h / 2, -w / 2, -h / 2 + r);
  p.lineTo(-w / 2, h / 2 - r);
  p.quadraticCurveTo(-w / 2, h / 2, -w / 2 + r, h / 2);
  return p;
}

function lensShape() {
  return roundedRect(new THREE.Shape(), 0.96, 0.66, 0.17);
}

/* Frame rim = lens shape extruded with a smaller concentric hole. */
function rimGeometry() {
  const outer = lensShape();
  outer.holes.push(roundedRect(new THREE.Path(), 0.78, 0.5, 0.12));
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
      <mesh>
        <boxGeometry args={[0.1, 0.16, 0.16]} />
        <meshStandardMaterial color="#1a1d22" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[side * 0.55, 0.02, -0.55]} rotation={[0, side * 0.32, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.07]} />
        <meshStandardMaterial color="#202329" metalness={0.2} roughness={0.55} />
      </mesh>
      <mesh position={[side * 1.08, -0.1, -1.02]} rotation={[0.3, side * 0.32, 0]}>
        <boxGeometry args={[0.32, 0.1, 0.07]} />
        <meshStandardMaterial color="#202329" metalness={0.2} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Marker({ pin, active, onHover }: { pin: Pin; active: boolean; onHover: (id: string | null) => void }) {
  return (
    <group position={pin.pos}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(pin.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={active ? 3 : 1.4} />
      </mesh>
      <Html center zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
        <div
          style={{
            transform: `translate(14px,-14px) scale(${active ? 1.05 : 1})`,
            transition: "transform .15s",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background: ACCENT,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(3,129,254,0.5)",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            {pin.n}
          </span>
          {active && (
            <span
              style={{
                whiteSpace: "nowrap",
                background: "rgba(255,255,255,0.97)",
                color: "#0a0a0a",
                border: `1px solid ${ACCENT}`,
                borderRadius: 10,
                padding: "3px 9px",
                fontSize: 11,
                fontWeight: 700,
                boxShadow: "0 6px 20px rgba(16,24,40,0.18)",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              }}
            >
              {pin.title}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}

function Glasses({ onWhite }: { onWhite: boolean }) {
  const rim = useMemo(() => rimGeometry(), []);
  const lens = useMemo(
    () => new THREE.ExtrudeGeometry(lensShape(), { depth: 0.03, bevelEnabled: false, curveSegments: 24 }),
    [],
  );
  const [hover, setHover] = useState<string | null>(null);

  return (
    <group rotation={[0.05, 0, 0]}>
      {([-0.98, 0.98] as const).map((x) => (
        <mesh key={x} geometry={rim} position={[x, 0.18, 0]}>
          <meshStandardMaterial color="#16181d" metalness={0.35} roughness={0.4} />
        </mesh>
      ))}
      {([-0.98, 0.98] as const).map((x) => (
        <mesh key={`l${x}`} geometry={lens} position={[x, 0.18, 0.05]}>
          <meshStandardMaterial
            color={onWhite ? "#0a0e16" : "#0d1b30"}
            metalness={0.1}
            roughness={0.15}
            transparent
            opacity={onWhite ? 0.92 : 0.78}
          />
        </mesh>
      ))}
      {/* Solid brow bar — one continuous piece joining both lenses across the top. */}
      <mesh position={[0, 0.42, 0.02]}>
        <boxGeometry args={[1.16, 0.18, 0.13]} />
        <meshStandardMaterial color="#16181d" metalness={0.35} roughness={0.4} />
      </mesh>
      {/* Keyhole nose bridge — short dip under the brow, centred. */}
      <mesh position={[0, 0.26, 0.03]}>
        <boxGeometry args={[0.34, 0.16, 0.12]} />
        <meshStandardMaterial color="#16181d" metalness={0.35} roughness={0.4} />
      </mesh>
      {/* Bridge camera, centred on the brow bar. */}
      <mesh position={[0, 0.42, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.05, 20]} />
        <meshStandardMaterial color="#05070b" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[-1.42, 0.5, 0.08]}>
        <boxGeometry args={[0.16, 0.1, 0.1]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.6} />
      </mesh>

      <Temple side={1} />
      <Temple side={-1} />

      {PINS.map((p) => (
        <Marker key={p.id} pin={p} active={hover === p.id} onHover={setHover} />
      ))}
    </group>
  );
}

export default function GlassesScene({
  background = "dark",
}: {
  background?: "dark" | "white";
}) {
  const onWhite = background === "white";
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.1, 5.3], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={onWhite ? 1.05 : 0.75} />
      <directionalLight position={[3, 4, 5]} intensity={onWhite ? 2.4 : 2} />
      <directionalLight position={[-4, 1, 2]} intensity={onWhite ? 0.35 : 0.9} color={ACCENT} />
      <directionalLight position={[0, -2, 3]} intensity={0.4} />
      <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.2} position={[0, -0.15, 0]}>
        <Center scale={1.0}>
          <Glasses onWhite={onWhite} />
        </Center>
      </Float>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}
