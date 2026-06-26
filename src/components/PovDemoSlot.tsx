"use client";

/**
 * TRY-ON SLOT — owned by Agent B.
 * Shows an AI-generated photo of the wearer in the concept glasses, with a
 * selector to switch between prompt "styles". Deniz generates each image in
 * ChatGPT using the matching prompt (Copy button) and drops it at
 *   /public/pov/tryon-<id>.jpg
 * Until an image exists, a labelled placeholder shows.
 * Outer wrapper + className kept per /conversations contract.
 */
import { useState } from "react";

type Style = { id: string; label: string; prompt: string };

const STYLES: Style[] = [
  {
    id: "studio",
    label: "Studio portrait",
    prompt:
      "Using the attached photo of this exact person, keep their face, skin, hair and identity perfectly unchanged. Add a pair of Samsung concept smart glasses to their face: matte-black Wayfarer-style acetate frames, subtly thicker temple arms, slim dark-tinted lenses, a tiny glowing blue LiDAR sensor in the top-left corner of the frame and a discreet small camera on the bridge. Photorealistic studio headshot, soft key light, clean light-grey seamless background, sharp focus, shallow depth of field, 50mm lens look. Make the glasses sit naturally on the nose and ears with correct perspective and realistic reflections on the lenses.",
  },
  {
    id: "street",
    label: "Street / lifestyle",
    prompt:
      "Using the attached photo of this exact person, keep their face and identity perfectly unchanged. Add the same Samsung concept smart glasses: matte-black Wayfarer-style frames, dark-tinted lenses, a small glowing blue LiDAR sensor in the top corner and a discreet bridge camera. Place them outdoors on a softly blurred city street in daytime, natural sunlight, candid lifestyle photography, realistic shadows and lens reflections, 35mm look. The glasses must match their head angle and lighting exactly.",
  },
  {
    id: "tech",
    label: "Tech / AR overlay",
    prompt:
      "Using the attached photo of this exact person, keep their face and identity unchanged. Add the Samsung concept smart glasses (matte-black Wayfarer-style frames, dark lenses, glowing blue LiDAR sensor top corner, bridge camera). Add a subtle augmented-reality HUD: faint blue depth-mesh wireframe and small distance/label callouts floating around them, as if seen through the glasses. Dark studio background, cinematic blue rim light, premium product-launch aesthetic, photorealistic. Keep the AR elements tasteful and not covering the face.",
  },
];

export default function PovDemoSlot() {
  const [active, setActive] = useState(STYLES[0]);
  const [copied, setCopied] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  const copy = () => {
    navigator.clipboard?.writeText(active.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      id="pov-demo-slot"
      className="relative flex min-h-[420px] w-full flex-col overflow-hidden rounded-[24px] bg-black"
    >
      {/* image area */}
      <div className="relative flex flex-1 items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0 22px, rgba(3,129,254,0.35) 22px 23px), repeating-linear-gradient(90deg, transparent 0 22px, rgba(3,129,254,0.35) 22px 23px)",
          }}
        />
        {imgOk ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={active.id}
            src={`/pov/tryon-${active.id}.jpg`}
            alt={`Wearer in concept glasses — ${active.label}`}
            onError={() => setImgOk(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="relative flex flex-col items-center gap-2 px-6 text-center">
            <span className="su-pill">AI try-on</span>
            <p className="text-sm font-medium text-white/70">
              Generate in ChatGPT with the prompt below, then save as
            </p>
            <code className="rounded bg-white/10 px-2 py-1 text-xs text-white/80">
              /public/pov/tryon-{active.id}.jpg
            </code>
          </div>
        )}
      </div>

      {/* controls */}
      <div className="relative z-10 space-y-2 bg-gradient-to-t from-black via-black/85 to-transparent p-3">
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActive(s);
                setImgOk(true);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active.id === s.id
                  ? "bg-su-accent text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2">
          <p className="line-clamp-2 flex-1 text-[11px] leading-snug text-white/55">
            {active.prompt}
          </p>
          <button
            onClick={copy}
            className="shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            {copied ? "Copied ✓" : "Copy prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}
