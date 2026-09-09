import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpaceBus, spaceBuses } from "../../data/spaceBuses";

export const generateStaticParams = () => spaceBuses.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }) => {
  const bus = getSpaceBus(params.slug);
  return bus ? { title: bus.name + " | SpaceY Space Buses", description: bus.summary } : {};
};

export default function SpaceBusPage({ params }) {
  const bus = getSpaceBus(params.slug);
  if (!bus) notFound();

  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto grid max-w-screen-xl gap-10 px-6 py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">{bus.range}</p>
          <h1 className="mt-4 text-5xl font-bold sm:text-6xl">{bus.name}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{bus.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/space-buses" className="space-button">All Space Buses</Link>
            <Link href="/destinations" className="space-button">Choose a destination</Link>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black sm:min-h-[430px]">
          <Image src={bus.image} alt={bus.name + " exterior"} fill className="object-contain p-4" priority />
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-xl gap-8 px-6 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black sm:min-h-[460px]">
          <Image src={bus.interiorImage} alt={bus.name + " interior"} fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Inside the bus</p>
          <h2 className="mt-3 text-4xl font-bold">A cabin designed for the route</h2>
          <p className="mt-5 leading-7 text-slate-300">
            The interior changes with the trip length. Short routes focus on views and fast comfort; long routes need routines, privacy, dining, wellness, entertainment and enough variety to make the journey feel like part of the vacation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Spec label="Capacity" value={bus.capacity} />
          <Spec label="Route length" value={bus.tripLength} />
          <Spec label="Cabin" value={bus.cabin} />
          <Spec label="Food included" value={bus.food} />
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-xl gap-8 px-6 py-12 lg:grid-cols-3">
        <Panel title="Technical profile" items={bus.technical} tone="cyan" />
        <Panel title="Fun on board" items={bus.onboardLife} tone="amber" />
        <Panel title="Inside the bus" items={bus.spaces} tone="blue" />
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">All onboard attractions</p>
        <h2 className="mt-3 text-4xl font-bold">What guests can actually do during the journey</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bus.onboardLife.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-slate-950 p-5">
              <p className="text-sm font-semibold leading-6 text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Gallery</p>
        <h2 className="mt-3 text-4xl font-bold">Exterior, cabin, dining and lounge life</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {bus.gallery.map((image, index) => (
            <div key={image} className="overflow-hidden rounded-3xl border border-white/10 bg-black">
              <div className="relative min-h-[260px] sm:min-h-[340px]">
                <Image src={image} alt={bus.name + " gallery image"} fill className={index === 0 ? "object-contain p-4" : "object-cover"} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
              <p className="border-t border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                {index === 0 ? "Exterior profile" : index === 1 ? "Interior experience" : index === 2 ? "Cabin life" : "Dining"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Destinations served</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {bus.serves.map((destination) => (
            <span key={destination} className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-sm text-slate-200">{destination}</span>
          ))}
        </div>
      </section>
    </main>
  );
}

const Spec = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
    <p className="mt-3 text-sm leading-6 text-slate-200">{value}</p>
  </div>
);

const Panel = ({ title, items, tone }) => {
  const dot = tone === "amber" ? "bg-amber-200 shadow-[0_0_10px_rgba(253,230,138,0.8)]" : tone === "blue" ? "bg-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.85)]" : "bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.85)]";
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950 p-7">
      <h2 className="text-2xl font-bold">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className={"mt-2 h-2 w-2 shrink-0 rounded-full " + dot} />{item}</li>
        ))}
      </ul>
    </div>
  );
};
