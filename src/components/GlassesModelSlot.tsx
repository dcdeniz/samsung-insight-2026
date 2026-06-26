"use client";

/**
 * 3D MODEL SLOT — owned by Agent B (Three.js).
 * Outer wrapper + className kept per /conversations contract.
 * Scene is dynamically imported with ssr:false (WebGL is client-only;
 * Next 16: ssr:false is only allowed inside a Client Component — hence "use client").
 */
import dynamic from "next/dynamic";

const GlassesScene = dynamic(() => import("./GlassesScene"), {
  ssr: false,
  loading: () => (
    <span className="text-sm font-medium text-su-text-2">Loading 3D model…</span>
  ),
});

export default function GlassesModelSlot() {
  return (
    <div
      id="glasses-model-slot"
      className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-su-surface-2"
    >
      <div className="su-hero-glow pointer-events-none absolute inset-0" />
      <div className="absolute inset-0">
        <GlassesScene />
      </div>
      <span className="su-pill pointer-events-none absolute left-3 top-3 z-10">
        Drag · hover the dots
      </span>
    </div>
  );
}
