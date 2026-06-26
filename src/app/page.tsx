"use client";

import {
  Navigation,
  Radio,
  ScanSearch,
  Users,
  TriangleAlert,
  Lightbulb,
  DoorOpen,
  HeartPulse,
  RefreshCw,
  Map as MapIcon,
  ScanEye,
  Cpu,
  Waypoints,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GlassesModelSlot from "@/components/GlassesModelSlot";
import PovDemoSlot from "@/components/PovDemoSlot";

const STATS = [
  ["5 m", "LiDAR range"],
  ["42 g", "On-face weight"],
  ["0", "New infrastructure"],
  ["6 hrs", "On-glass battery"],
];

const FLOW = [
  { icon: MapIcon, step: "01", title: "Map", body: "SmartThings + LiDAR mesh the home into a live 3D model of every room." },
  { icon: ScanEye, step: "02", title: "See", body: "On-glass cameras and depth sensors read the scene in real time." },
  { icon: Cpu, step: "03", title: "Understand", body: "Galaxy AI infers doorways, stairs, hazards and people from sparse data." },
  { icon: Waypoints, step: "04", title: "Guide", body: "Audio and haptic cues — only what matters, the moment it matters." },
];

const FEATURES = [
  { icon: Navigation, tag: "Navigation", title: "Spatial guidance", body: "Turn-by-turn paths, obstacle and edge cues narrated as you move — depth-accurate to the curb and the coffee table." },
  { icon: Radio, tag: "Ambient", title: "Contextual awareness", body: "Tied into SmartThings: a door opens, someone enters, the kettle just boiled — surfaced as a quiet audio or haptic cue." },
  { icon: ScanSearch, tag: "Memory", title: "Object & placement memory", body: "AI vision remembers where the keys, phone and medication were last seen, then walks you straight back to them." },
  { icon: Users, tag: "Social", title: "Faces & social cues", body: "Recognises family and frequent visitors, whispers who's approaching, and reads basic emotional tone for richer context." },
  { icon: TriangleAlert, tag: "Safety", title: "Hazard alerts", body: "Wet floors, open cabinet doors, items left on the stairs — cross-referenced against the live room map in real time." },
  { icon: Lightbulb, tag: "Vision", title: "Adaptive lighting", body: "For partial sight, SAMLens auto-tunes smart bulbs for maximum contrast based on where you are and what you're doing." },
  { icon: DoorOpen, tag: "Hospitality", title: "Visitor guidance mode", body: "When a sighted guest uses the home, the glasses flip to an AR overlay showing where everything is." },
  { icon: HeartPulse, tag: "Emergency", title: "Fall & emergency mode", body: "Fall detection alerts contacts through Samsung's connected ecosystem, then keeps you calm while help is arranged." },
  { icon: RefreshCw, tag: "Adaptive", title: "Learning mode", body: "Rearranged the furniture? Changed layouts are flagged and you're walked through the updated map with audio narration." },
];

const SPECS = [
  { label: "Depth sensor", value: "Solid-state LiDAR", note: "5 m range · ToF" },
  { label: "Weight", value: "42 g", note: "all-day balanced" },
  { label: "Display", value: "Micro-OLED", note: "2000 nits · waveguide" },
  { label: "Field of view", value: "52°", note: "binocular" },
  { label: "Battery", value: "6 hrs", note: "+12 hrs in case" },
  { label: "Connectivity", value: "Wi-Fi 7 · BT 5.4", note: "Galaxy + SmartThings" },
];

const ROADMAP = [
  { phase: "Insight Day", date: "Jun 2026", now: true, text: "Concept, hardware mock & POV demo" },
  { phase: "Prototype", date: "Q4 2026", now: false, text: "Working LiDAR + waveguide bench unit" },
  { phase: "Dev kit", date: "H1 2027", now: false, text: "Spatial SDK to accessibility partners" },
  { phase: "Pilot", date: "H2 2027", now: false, text: "Field pilot with Galaxy + NHS" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="size-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col">
      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-medium tracking-tight">SAMSUNG</span>
            <span className="h-3.5 w-px bg-border" />
            <span className="text-[13px] text-brand">SAMLens</span>
          </div>
          <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
            <a href="#device" className="transition hover:text-foreground">Device</a>
            <a href="#how" className="transition hover:text-foreground">How it works</a>
            <a href="#features" className="transition hover:text-foreground">Features</a>
            <a href="#specs" className="transition hover:text-foreground">Specs</a>
            <a href="#roadmap" className="transition hover:text-foreground">Roadmap</a>
          </nav>
          <Button size="sm" nativeButton={false} render={<a href="#device" />}>
            See the demo
          </Button>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
        <div className="brand-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-[1180px] gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Eyebrow>Samsung Insight Day 2026 · Assistive AR</Eyebrow>
            <h1 className="mt-6 text-balance text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl">
              The home is already mapped.{" "}
              <span className="text-brand">SAMLens lets you hear it.</span>
            </h1>
            <p className="body-sans mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              A concept pair of Samsung smart glasses that turn the spatial data your
              home already has — SmartThings, LiDAR, Galaxy AI — into a real-time
              assistive layer for blind and visually impaired people. No new
              infrastructure required.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<a href="#device" />}>
                Explore the device <ArrowRight />
              </Button>
              <Button variant="outline" size="lg" nativeButton={false} render={<a href="#features" />}>
                See the feature set
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border ring-1 ring-border">
            {STATS.map(([big, small]) => (
              <div key={small} className="bg-card p-6">
                <div className="text-3xl font-medium tracking-tight text-brand">{big}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {small}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Value prop ---------- */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16">
          <Eyebrow>The idea</Eyebrow>
          <p className="mt-6 max-w-4xl text-balance text-2xl leading-9 font-medium tracking-tight sm:text-[32px] sm:leading-[1.3]">
            Samsung already has the home mapped. SAMLens reuses that existing spatial
            data as a live, narrated layer of the world — so navigating any room is
            something you can do on your own.
          </p>
        </div>
      </section>

      {/* ---------- Device: the two slots ---------- */}
      <section id="device" className="border-b border-border">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>The device</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              The hardware, and how it wears.
            </h2>
            <p className="body-sans mt-3 text-[15px] leading-7 text-muted-foreground">
              Left: the interactive 3D model — drag to rotate, hover the markers for
              each component. Right: an AI try-on of the concept frames on a real face.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="gap-0 p-0">
              <CardHeader className="flex-row items-center justify-between border-b border-border px-4 py-3">
                <CardTitle className="text-sm">3D model</CardTitle>
                <Badge variant="outline" className="text-brand">interactive</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <GlassesModelSlot />
              </CardContent>
            </Card>

            <Card className="gap-0 p-0">
              <CardHeader className="flex-row items-center justify-between border-b border-border px-4 py-3">
                <CardTitle className="text-sm">Try-on · AI render</CardTitle>
                <Badge variant="outline" className="text-brand">prompt-driven</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <PovDemoSlot />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" className="border-b border-border">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Map. See. Understand. Guide.
            </h2>
          </div>
          <div className="grid gap-px bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map(({ icon: Icon, step, title, body }) => (
              <div key={step} className="bg-card p-6">
                <div className="flex items-center justify-between text-muted-foreground">
                  <Icon className="size-5 text-brand" />
                  <span className="text-xs tracking-widest">{step}</span>
                </div>
                <h3 className="mt-5 text-base font-medium">{title}</h3>
                <p className="body-sans mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section id="features" className="border-b border-border">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>Feature set</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              One layer, many senses.
            </h2>
            <p className="body-sans mt-3 text-[15px] leading-7 text-muted-foreground">
              Navigation is the start. Because SAMLens reads the whole home, the same
              spatial layer powers a wider assistive toolkit.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, tag, title, body }) => (
              <Card key={title} className="transition-colors hover:ring-brand/40">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center bg-secondary text-brand ring-1 ring-border">
                      <Icon className="size-4.5" />
                    </span>
                    <Badge variant="outline" className="text-muted-foreground">{tag}</Badge>
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="body-sans leading-6">{body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Specs ---------- */}
      <section id="specs" className="border-b border-border">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>Specifications</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Engineered to disappear.
            </h2>
          </div>
          <div className="grid gap-px bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-3">
            {SPECS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 bg-card p-6">
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </span>
                <span className="text-2xl font-medium tracking-tight">{s.value}</span>
                <span className="body-sans text-sm text-muted-foreground">{s.note}</span>
              </div>
            ))}
          </div>
          <Separator className="my-10" />
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="body-sans max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Targeting <span className="text-foreground">£500</span>, with the ambition
              of an <span className="text-foreground">NHS subsidy</span> so cost isn&apos;t
              the barrier between someone and their independence.
            </p>
            <Badge className="shrink-0">Concept · not for sale</Badge>
          </div>
        </div>
      </section>

      {/* ---------- Roadmap ---------- */}
      <section id="roadmap" className="border-b border-border">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:py-20">
          <div className="mb-8 max-w-2xl">
            <Eyebrow>Roadmap</Eyebrow>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              From Insight Day to the field.
            </h2>
          </div>
          <div className="grid gap-px bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((r) => (
              <div
                key={r.phase}
                className={`bg-card p-6 ${r.now ? "ring-1 ring-brand" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{r.phase}</span>
                  <span className={`size-2 rounded-full ${r.now ? "bg-brand" : "bg-muted-foreground/40"}`} />
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {r.date}
                </div>
                <p className="body-sans mt-3 text-sm leading-6 text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
        <div className="brand-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1180px] px-6 py-20 text-center sm:py-28">
          <h2 className="mx-auto max-w-3xl text-balance text-3xl font-medium tracking-tight sm:text-5xl">
            Independence, built on infrastructure that already exists.
          </h2>
          <p className="body-sans mx-auto mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">
            SAMLens — a concept exploration of LiDAR-native assistive glasses for
            Samsung Insight Day 2026.
          </p>
          <div className="mt-9 flex justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<a href="#device" />}>
              Replay the demo <ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer>
        <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center justify-between gap-2 px-6 py-7 text-[12px] text-muted-foreground sm:flex-row">
          <span className="text-foreground">SAMSUNG</span>
          <span>Insight Day 2026 · SAMLens · LiDAR-native assistive glasses · Concept</span>
          <span>Designed by Neat</span>
        </div>
      </footer>
    </div>
  );
}
