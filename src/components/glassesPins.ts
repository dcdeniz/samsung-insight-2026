/** Shared annotation data — imported by both the 3D scene (markers) and the
 *  slot legend (DOM). Kept three-free so it can load in the slot bundle. */
export type Pin = {
  id: string;
  n: number;
  title: string;
  body: string;
  pos: [number, number, number];
};

export const PINS: Pin[] = [
  {
    id: "lidar",
    n: 1,
    title: "Solid-state LiDAR",
    body: "Corner ToF emitter meshes the room to 5 m — depth on every glance, no moving parts.",
    pos: [-1.42, 0.5, 0.1],
  },
  {
    id: "lens",
    n: 2,
    title: "Waveguide lens",
    body: "Photochromic lens with a laminated micro-OLED waveguide — a 2000-nit display that tints in sun.",
    pos: [0.62, 0.05, 0.16],
  },
  {
    id: "camera",
    n: 3,
    title: "RGB + depth bridge",
    body: "Centre camera fuses colour with LiDAR depth so Galaxy AI sees exactly what you see.",
    pos: [0, 0.42, 0.16],
  },
  {
    id: "compute",
    n: 4,
    title: "Neural compute core",
    body: "On-device Galaxy AI silicon in the temple runs spatial models locally — no cloud round-trip.",
    pos: [1.15, 0.22, -0.5],
  },
  {
    id: "audio",
    n: 5,
    title: "Touch + open-ear audio",
    body: "Capacitive temple control with bone-conduction sound that leaves your ears free.",
    pos: [-1.15, 0.12, -0.5],
  },
];
