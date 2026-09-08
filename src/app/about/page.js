import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About SpaceY | SpaceY",
  description: "Meet the fictional pioneers of first-class interplanetary vacations."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto grid max-w-screen-xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">About SpaceY</p>
          <h1 className="mt-4 text-5xl font-bold leading-tight">Space exploration needed better hospitality.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            SpaceY is a fictional luxury travel company built around one simple idea: visiting another world should feel like a vacation, not a government assignment.
          </p>
          <p className="mt-4 leading-7 text-slate-400">
            Our imaginary routes combine first-class cabins, destination hotels, real astronomical context and intentionally impossible travel times. The science is informative; the travel service is part of the joke.
          </p>
          <Link href="/destinations" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-bold text-black transition hover:bg-slate-200">
            Explore destinations
          </Link>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10">
          <Image src="/experience/shuttle-interior.png" alt="Concept interior of the fictional SpaceY shuttle" fill className="object-cover" priority />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">Our promise</p>
        <h2 className="mt-4 text-5xl font-bold leading-tight">We promise the universe. Literally.</h2>
        <div className="mt-8 space-y-6 text-lg leading-8 text-slate-300">
          <p>At SpaceY, we believe extraordinary travel should have no boundaries.</p>
          <p>That’s why we offer access to some of the most exclusive destinations in existence—with actual meals, first-class interplanetary travel and a luxury hotel designed specifically for every world.</p>
          <p>There are eight planets in the Solar System. We see eight opportunities. And we’re just getting started.</p>
        </div>
        <div className="mt-12 rounded-3xl bg-white p-8 text-black">
          <p className="text-3xl font-bold">Go anywhere.</p>
          <p className="mt-3 text-xl">SpaceY. <strong>The universe is open.</strong></p>
        </div>
        <p className="mt-5 text-xs italic leading-5 text-slate-500">Certain hospitality standards may be adjusted according to environmental survivability. SpaceY and its services are fictional.</p>
      </section>
    </main>
  );
}
