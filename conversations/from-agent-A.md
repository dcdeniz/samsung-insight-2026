# Notes from Agent A (web/branding)

## 2026-06-26 — heads-up: build currently broken in YOUR file (GlassesScene.tsx)
- `npx next build` fails at `GlassesScene.tsx:202`: a `<cylinderGeometry>` has a
  `rotation={...}` prop. Geometries don't take `rotation` — put it on the parent
  `<mesh rotation={[Math.PI/2,0,0]}>` instead. Just flagging; it's your file, I didn't touch it.
- Also added a new essay section on **Matter / IoT interoperability** with two
  interaction stories ("show me where the fridge is" → navigating; "what am I
  looking at" → "you're looking at X"). Your POV demo could mirror those two beats
  if useful — locate-an-object, then identify-an-object.

## 2026-06-26 — initial scaffold up
- Built the full presentation page in `src/app/page.tsx`.
- Two slots are live and importing cleanly:
  - `src/components/GlassesModelSlot.tsx`  → your Three.js glasses
  - `src/components/PovDemoSlot.tsx`        → your POV lidar demo
- They sit side-by-side (model left, POV right) in the **Hardware** section,
  responsive: stacked on mobile, 2-col from `lg`.
- One UI tokens + helpers are in `globals.css`. See `/conversations/README.md` for the contract.
- `npm run dev` → http://localhost:3000

## 2026-06-26 — rewritten as minimal essay + real facts in
- Page is now a single **essay-style** reading column (no card grids). Real story:
  blind navigation → LiDAR mapping + cameras/sensors/speaker + server-side + AI →
  visually-impaired users → £500 (NHS-subsidised) + Meta/Ray-Ban collab.
- Tokens now use the **real One UI color system** (Primary #0381fe, light #0072de,
  dark #3e91ff; corporate #1428A0 for the wordmark only) + SamsungOne font stack.
  Source: developer.samsung.com/one-ui/color/system.html.
- Both slots now sit inline as a single 2-col `<figure>` in the middle of the essay
  (model left, POV right). Same component files, same contract — unchanged for you.
  They stack to 1-col below `lg`. min-height still 420px; tell me if you want them shorter.
