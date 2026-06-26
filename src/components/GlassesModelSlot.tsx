"use client";

/**
 * 3D MODEL SLOT — owned by Agent B (Three.js).
 * Scene is dynamically imported with ssr:false (WebGL is client-only;
 * Next 16: ssr:false is only allowed inside a Client Component).
 * White "product" panel — dark frames read cleanly against white; overlays
 * are light-themed, accent stays NEAT Observed-green.
 */
import dynamic from "next/dynamic";
import { PINS } from "./glassesPins";

const GlassesScene = dynamic(() => import("./GlassesScene"), {
  ssr: false,
  loading: () => (
    <span className="text-xs uppercase tracking-[0.18em] text-neutral-400">
      Loading model…
    </span>
  ),
});

export default function GlassesModelSlot() {
  return (
    <div
      id="glasses-model-slot"
      className="relative flex min-h-[440px] w-full items-center justify-center overflow-hidden bg-white ring-1 ring-foreground/10"
    >
      {/* soft light vignette for depth on the white panel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 35%, #ffffff 0%, #f2f3f5 100%)",
        }}
      />

      <div className="absolute inset-0">
        <GlassesScene background="white" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 bg-white px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-neutral-500 ring-1 ring-black/10">
        <span className="size-1.5 rounded-full bg-brand" />
        Drag to rotate
      </span>

      {/* Always-readable legend — numbers match the markers on the model. */}
      <ul className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 grid grid-cols-2 gap-x-3 gap-y-1.5 bg-white/90 p-3 ring-1 ring-black/10 backdrop-blur-sm">
        {PINS.map((p) => (
          <li key={p.id} className="flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand text-[9px] font-medium text-brand-foreground">
              {p.n}
            </span>
            <span className="truncate text-neutral-800">{p.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
