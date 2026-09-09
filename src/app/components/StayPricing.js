import Link from "next/link";
import { destinations } from "../data/destinations";
import { groundStays } from "../data/groundStays";

const prices = {
  sun: ["$420,000", "$780,000"],
  mercury: ["$310,000", "$540,000"],
  venus: ["$340,000", "$620,000"],
  earth: ["$45,000", "$28,000"],
  moon: ["$180,000", "$295,000"],
  mars: ["$250,000", "$450,000"],
  jupiter: ["$390,000", "$690,000"],
  saturn: ["$440,000", "$760,000"],
  uranus: ["$590,000", "$940,000"],
  neptune: ["$680,000", "$1,080,000"],
  pluto: ["$790,000", "$1,240,000"],
  "alpha-centauri": ["From $4.8M", "From $7.2M"],
  "milky-way-galaxy": ["Custom", "Custom"],
  "black-hole": ["From $12M", "From $18M"]
};

export default function StayPricing() {
  return (
    <section className="mt-24">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">Accommodation pricing</p>
      <h2 className="mt-3 text-4xl font-bold">Choose how close you want to be</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-400">Compare the panoramic orbital stay with the closest available destination experience: directly on the surface when possible, or immersed in the upper atmosphere when there is no solid ground.</p>

      <div className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
        <div className="hidden grid-cols-[1.4fr_1fr_1fr_auto] gap-6 border-b border-white/10 px-7 py-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 md:grid">
          <span>Destination</span><span>Orbital panorama</span><span>Closest stay</span><span>Explore</span>
        </div>
        {destinations.map((destination) => {
          const [orbital, immersive] = prices[destination.slug];
          const closeStay = groundStays[destination.slug];
          return (
            <div key={destination.slug} className="grid gap-5 border-b border-white/10 px-7 py-6 last:border-b-0 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
              <div>
                <p className="text-lg font-bold text-white">{destination.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{destination.type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 md:hidden">Orbital panorama</p>
                <p className="mt-1 font-semibold text-slate-200">{orbital}</p>
                <p className="mt-1 text-xs text-slate-500">{destination.hotel}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 md:hidden">Closest stay</p>
                <p className="mt-1 font-semibold text-slate-200">{immersive}</p>
                <p className="mt-1 text-xs text-slate-500">{closeStay.name} · {closeStay.label}</p>
              </div>
              <Link href={`/destinations/${destination.slug}`} className="inline-flex justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-black">View</Link>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-xs text-slate-500">Accommodation prices are starting rates per traveler and are added to the selected travel package.</p>
    </section>
  );
}
