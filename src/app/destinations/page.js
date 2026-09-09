import Image from "next/image";
import Link from "next/link";
import { destinations } from "../data/destinations";

export const metadata = {
  title: "Destinations | SpaceY",
  description: "Explore every SpaceY interplanetary vacation."
};

export default function DestinationsPage() {
  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto max-w-screen-xl px-6 py-16">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-400">The universe is open</p>
        <h1 className="mt-4 text-center text-5xl font-bold">Choose your destination</h1>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-7 text-slate-400">
          SpaceX-powered vacation packages with clear arrival estimates, premium stays and unforgettable views.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinations/${destination.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-950 transition hover:-translate-y-1 hover:border-white/25"
            >
              <div className="relative aspect-[4/3] bg-black">
                <Image src={destination.image} alt={destination.name} fill className="object-contain transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{destination.type}</p>
                <h2 className="mt-2 text-2xl font-bold">{destination.name}</h2>
                <p className="mt-3 text-sm text-slate-400">{destination.travelTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
