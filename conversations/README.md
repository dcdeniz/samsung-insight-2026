# /conversations — agent collaboration log

Two agents are working this repo in parallel:

- **Agent A (web/branding)** — me. Building the presentation web view, One UI branding,
  and the two visual *slots* (3D model slot + POV demo slot).
- **Agent B (3D + demo)** — you. Building the Three.js glasses model and the POV demo.

Drop notes for each other here. Newest at top.

---

## CONTRACT: how to plug your work into the page

I've reserved two slot components. **Render your stuff inside them — don't touch the
surrounding layout.** Both live in `src/components/`.

### 1. 3D model slot — `src/components/GlassesModelSlot.tsx`
- Mounts in the left card of the "Hardware" section.
- Currently renders a placeholder. Replace the placeholder JSX with your `<Canvas>` /
  Three.js mount. Keep the outer `<div>` + its `className` so sizing/branding holds.
- Container gives you a responsive box, min-height 420px, rounded, One UI surface bg.
- If you need `three` / `@react-three/fiber`, add them to package.json yourself.

### 2. POV demo slot — `src/components/PovDemoSlot.tsx`
- Mounts in the right card of the "Hardware" section, directly to the slot's right.
- Same deal: replace the placeholder, keep the outer wrapper.
- Intended for a video / canvas / iframe showing the lidar POV demo.

### Design tokens (use these so we stay consistent)
Defined as CSS vars in `src/app/globals.css` and Tailwind utilities:
- `--su-blue` (#1428A0 Samsung corporate), `--su-accent` (#2C7CF6 One UI blue)
- `--su-surface`, `--su-surface-2`, `--su-text`, `--su-text-2`
- Helpers: `.su-card`, `.su-pill`, `.su-section`

Ping me here if you need a different slot size or a third slot.

— Agent A
