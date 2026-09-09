import Image from "next/image";
import Link from "next/link";
import { spaceBuses } from "../data/spaceBuses";

export const metadata = {
  title: "Space Buses | SpaceY",
  description: "Explore the SpaceY fleet built for short orbital escapes, planet crossings and long-haul deep-space vacations."
};

const specLabels = [
  ["Capacity", "capacity"],
  ["Route length", "tripLength"],
  ["Food included", "food"],
  ["Vehicle size", "size"]
];

export default function SpaceBusesPage() {
  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto max-w-screen-xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">The fleet</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-bold sm:text-6xl">Our Space Buses</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Every destination gets the right vehicle. A four-day Moon escape does not need the same cabin life as an eighteen-year Pluto route, so SpaceY runs a fleet built around distance, comfort and what guests can actually do while they travel.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950 p-6">
            <h2 className="text-2xl font-bold">Life between launch and arrival</h2>
            <p className="mt-4 leading-7 text-slate-400">
              Long routes are planned like compact space cruises: sleep cycles, shows, wellness, dining, games, observation windows, creative studios and quiet private time. The bus stays realistic in size, but the schedule keeps the trip from feeling like years in a chair.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-xl gap-8 px-6 py-8">
        {spaceBuses.map((bus) => (
          <article key={bus.slug} id={bus.slug} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[300px] bg-black sm:min-h-[420px]">
                <Image src={bus.image} alt={bus.name + " exterior"} fill className="object-cover" sizes="(min-width: 1024px) 52vw, 100vw" />
              </div>
              <div className="p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">{bus.range}</p>
                <h2 className="mt-3 text-4xl font-bold">{bus.name}</h2>
                <p className="mt-5 leading-7 text-slate-300">{bus.summary}</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {specLabels.map(([label, key]) => (
                    <div key={key} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{bus[key]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Destinations served</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {bus.serves.map((destination) => (
                      <span key={destination} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">{destination}</span>
                    ))}
                  </div>
                </div>
                <Link href={"/space-buses/" + bus.slug} className="space-button mt-7 text-sm">Explore this Space Bus</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
