import GlassesModelSlot from "@/components/GlassesModelSlot";
import PovDemoSlot from "@/components/PovDemoSlot";

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col bg-background text-su-text">
      {/* ---------- minimal top wordmark ---------- */}
      <header className="border-b border-su-line">
        <div className="mx-auto flex w-full max-w-[680px] items-center justify-between px-6 py-5">
          <span className="text-sm font-bold tracking-tight text-su-blue">
            SAMSUNG
          </span>
          <span className="text-xs font-medium text-su-text-2">
            Insight Day 2026
          </span>
        </div>
      </header>

      {/* ---------- the essay ---------- */}
      <article className="mx-auto w-full max-w-[680px] px-6 py-16 sm:py-24">
        <p className="su-pill mb-7">Smart glasses · LiDAR · for the blind</p>

        <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          Glasses that <span className="su-gradient-text">see the room</span> so
          you don&apos;t have to.
        </h1>

        <p className="mt-7 text-xl leading-9 text-su-text-2">
          A concept pair of Samsung smart glasses that map the world in real time
          with LiDAR — built to give visually impaired people the confidence to
          navigate any space on their own.
        </p>

        {/* — problem — */}
        <h2 className="mt-16 text-2xl font-bold tracking-tight">The problem</h2>
        <p className="mt-4 text-lg leading-9 text-su-text-2">
          Moving through an unfamiliar space without sight is exhausting and
          unsafe. A white cane finds what&apos;s directly in front of you; it can&apos;t
          tell you the layout of a room, where the gap in the crowd is, or that a
          table edge is at waist height a metre ahead. Blind navigation is the
          everyday problem we set out to solve.
        </p>

        {/* — solution — */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight">The solution</h2>
        <p className="mt-4 text-lg leading-9 text-su-text-2">
          The glasses continuously map their surroundings using LiDAR. Onboard{" "}
          <strong className="font-semibold text-su-text">cameras</strong> and{" "}
          <strong className="font-semibold text-su-text">sensors</strong> capture
          the scene, the depth data is meshed into a live model of the space, and
          a built-in{" "}
          <strong className="font-semibold text-su-text">speaker</strong> narrates
          what matters — obstacles, openings, edges and paths — the moment it
          matters. Heavier work is handed off to{" "}
          <strong className="font-semibold text-su-text">server-side
          processing</strong>, so the frames stay light and the guidance stays
          fast.
        </p>

        {/* — the two slots, inline figure — */}
        <figure className="my-12 -mx-6 sm:mx-0">
          <div className="grid gap-3 px-6 sm:px-0 lg:grid-cols-2">
            <GlassesModelSlot />
            <PovDemoSlot />
          </div>
          <figcaption className="mt-3 px-6 text-sm text-su-text-2 sm:px-0">
            Left: the device. Right: the LiDAR point-of-view the glasses build of
            the space around the wearer.
          </figcaption>
        </figure>

        {/* — AI — */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight">
          Where the AI comes in
        </h2>
        <p className="mt-4 text-lg leading-9 text-su-text-2">
          LiDAR alone gives you a cloud of points. AI is what turns it into
          understanding. Working from deliberately limited information, the model
          fills in the structure of a scene — inferring that this is a doorway,
          that is a staircase, the floor continues here — and decides what is
          worth telling the wearer and what is just noise. It&apos;s the difference
          between a depth map and a description you can act on.
        </p>

        {/* — Matter / IoT — */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight">
          Connected to everything, through Matter
        </h2>
        <p className="mt-4 text-lg leading-9 text-su-text-2">
          The map is only half the story. Through{" "}
          <strong className="font-semibold text-su-text">Matter</strong>, the
          glasses interoperate with any device in a space — any brand, any maker —
          as long as it&apos;s on the map. A LiDAR mesh tells you where the walls are;
          Matter tells you what the things <em>are</em>, and lets you talk to them.
          The fridge, the thermostat, the lights, the door — all of it becomes
          something the wearer can find, identify, and use by voice.
        </p>

        <div className="mt-7 space-y-5 border-l-2 border-su-accent pl-6">
          <p className="text-lg leading-8">
            <span className="text-su-text-2">“Show me where the fridge is.”</span>
            <br />
            <span className="font-semibold text-su-text">
              Navigating — eleven steps ahead, slightly to your left.
            </span>
          </p>
          <p className="text-lg leading-8">
            <span className="text-su-text-2">“What am I looking at?”</span>
            <br />
            <span className="font-semibold text-su-text">
              You&apos;re looking at the oven — it&apos;s on, set to 180 degrees.
            </span>
          </p>
        </div>

        {/* — users + impact — */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight">
          Who it&apos;s for, and why it matters
        </h2>
        <p className="mt-4 text-lg leading-9 text-su-text-2">
          This is built for visually impaired people first — not as an
          accessibility afterthought, but as the whole point. The impact we&apos;re
          after is simple and large: helping visually impaired people move through
          the world, and live their lives, with more independence.
        </p>

        {/* — financing — */}
        <h2 className="mt-14 text-2xl font-bold tracking-tight">
          Making it real
        </h2>
        <p className="mt-4 text-lg leading-9 text-su-text-2">
          We&apos;re targeting a price of{" "}
          <strong className="font-semibold text-su-text">£500</strong>, with the
          aim of bringing that down through{" "}
          <strong className="font-semibold text-su-text">NHS subsidy</strong> so
          cost isn&apos;t the barrier between someone and their independence. And
          rather than build the frames alone, we see this living through{" "}
          <strong className="font-semibold text-su-text">collaboration with
          established eyewear brands</strong> like Meta and Ray-Ban — proven
          hardware, Samsung&apos;s sensing and AI inside.
        </p>

        <hr className="my-16 border-su-line" />

        <p className="text-base leading-8 text-su-text-2">
          A concept exploration for{" "}
          <span className="font-semibold text-su-text">
            Samsung Insight Day 2026
          </span>
          . Designed by Neat.
        </p>
      </article>
    </div>
  );
}
