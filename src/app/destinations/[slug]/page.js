import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestination } from "../../data/destinations";

export const generateStaticParams = () => destinations.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }) => {
  const destination = getDestination(params.slug);
  return destination
    ? { title: `${destination.name} | SpaceY Destinations`, description: destination.summary }
    : {};
};

const Fact = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-950 p-5">
    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</dt>
    <dd className="mt-2 text-lg font-semibold text-white">{value}</dd>
  </div>
);

export default function DestinationPage({ params }) {
  const destination = getDestination(params.slug);
  if (!destination) notFound();

  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto grid max-w-screen-xl items-center gap-12 px-6 py-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">{destination.type}</p>
          <h1 className="mt-4 text-6xl font-bold">{destination.name}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{destination.summary}</p>
          <div className="mt-8 inline-flex rounded-full bg-white px-5 py-3 font-bold text-black">
            SpaceY arrival: {destination.travelTime}
          </div>
          <p className="mt-3 text-xs text-slate-500">SpaceY travel times and hospitality are fictional. Astronomical facts are educational.</p>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-black">
          <Image src={destination.image} alt={destination.name} fill className="object-contain" priority />
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-12">
        <h2 className="text-3xl font-bold">Astronomical facts</h2>
        <dl className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Distance from Earth" value={destination.distance} />
          <Fact label="Day length" value={destination.dayLength} />
          <Fact label="Temperature" value={destination.temperature} />
          <Fact label="Gravity" value={destination.gravity} />
        </dl>
      </section>

      <section className="mx-auto grid max-w-screen-xl gap-8 px-6 py-12 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950 p-8">
          <h2 className="text-3xl font-bold">What you can see</h2>
          <ul className="mt-6 space-y-4">
            {destination.sights.map((sight) => (
              <li key={sight} className="flex items-center gap-3 text-slate-300"><span className="h-2 w-2 rounded-full bg-white" />{sight}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white p-8 text-black">
          <h2 className="text-3xl font-bold">Why the trip is remarkable</h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">{destination.reason}</p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-12">
        <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 lg:grid-cols-2">
          <div className="relative min-h-[360px]">
            <Image src={`/hotels/${destination.slug}.png`} alt={`Concept art of ${destination.hotel}`} fill className="object-cover" />
          </div>
          <div className="p-8 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Your destination hotel</p>
            <h2 className="mt-3 text-4xl font-bold">{destination.hotel}</h2>
            <p className="mt-5 leading-7 text-slate-300">{destination.hotelDescription}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {destination.hotelFeatures.map((feature) => <li key={feature} className="rounded-xl bg-white/5 px-4 py-3 text-sm text-slate-300">{feature}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-12">
        <h2 className="text-3xl font-bold">The journey there</h2>
        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
            <div className="relative aspect-video"><Image src="/experience/shuttle-interior.png" alt="Concept interior of the SpaceY shuttle" fill className="object-cover" /></div>
            <div className="p-7"><h3 className="text-2xl font-bold">Your interplanetary bus</h3><p className="mt-3 leading-7 text-slate-400">Private reclining suites, panoramic radiation-shielded windows, artificial gravity, quiet cabins, personal entertainment and 24-hour concierge service.</p></div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
            <div className="relative aspect-video"><Image src="/experience/dining.png" alt="Concept SpaceY dining service" fill className="object-cover" /></div>
            <div className="p-7"><h3 className="text-2xl font-bold">Real food, served properly</h3><p className="mt-3 leading-7 text-slate-400">Seasonal menus, fresh bread, plated dinners, dietary accommodations and a destination-inspired tasting menu—never dehydrated cubes.</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-screen-xl flex-col gap-4 px-6 py-16 sm:flex-row sm:justify-between">
        <Link href="/destinations" className="inline-flex justify-center rounded-full border border-white/20 px-6 py-3 font-bold transition hover:bg-white/10">← Back to destinations</Link>
        <Link href={`/testemunhos?destination=${encodeURIComponent(destination.name.replace(/^The /, ""))}`} className="inline-flex justify-center rounded-full bg-white px-6 py-3 font-bold text-black transition hover:bg-slate-200">Already traveled here? Leave a testimonial</Link>
      </section>

      <p className="mx-auto max-w-screen-xl px-6 pb-4 text-xs leading-5 text-slate-600">
        Science references: NASA Solar System Exploration, NASA Cosmic Distances and NASA Universe. SpaceY, its transport, hotels and itineraries are fictional.
      </p>
    </main>
  );
}
