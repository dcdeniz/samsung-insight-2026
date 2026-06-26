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
      className="relative flex min-h-[440px] w-full flex-col overflow-hidden bg-black ring-1 ring-foreground/10"
    >
      {/* image area */}
      <div className="relative flex flex-1 items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0 22px, rgba(95,207,158,0.30) 22px 23px), repeating-linear-gradient(90deg, transparent 0 22px, rgba(95,207,158,0.30) 22px 23px)",
          }}
        />
        {imgOk ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={active.id}
            src={`/pov/tryon-${active.id}.jpg`}
            alt=""
            onError={() => setImgOk(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="relative flex flex-col items-center gap-2.5 px-6 text-center">
            <span className="inline-flex items-center gap-1.5 bg-card px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground ring-1 ring-border">
              <span className="size-1.5 rounded-full bg-brand" />
              AI try-on
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Generate in ChatGPT with the prompt below, then save as
            </p>
            <code className="bg-secondary px-2 py-1 text-[11px] text-brand ring-1 ring-border">
              /public/pov/tryon-{active.id}.jpg
            </code>
          </div>
        )}
      </div>

      {/* controls */}
      <div className="relative z-10 space-y-2.5 border-t border-border bg-gradient-to-t from-black via-black/90 to-black/70 p-3">
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActive(s);
                setImgOk(true);
              }}
              className={`px-2.5 py-1 text-[11px] transition ${
                active.id === s.id
                  ? "bg-brand text-brand-foreground"
                  : "bg-secondary text-muted-foreground ring-1 ring-border hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2">
          <p className="line-clamp-2 flex-1 text-[11px] leading-snug text-muted-foreground">
            {active.prompt}
          </p>
          <button
            onClick={copy}
            className="shrink-0 bg-secondary px-2.5 py-1 text-[11px] text-foreground ring-1 ring-border transition hover:bg-accent"
          >
            {copied ? "Copied ✓" : "Copy prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}
