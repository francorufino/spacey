import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestination } from "../../data/destinations";
import { groundStays } from "../../data/groundStays";
import { funFacts } from "../../data/funFacts";
import { getBusForDestination } from "../../data/spaceBuses";
import Planet3D from "../../components/Planet3D";

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
  const groundStay = groundStays[destination.slug];
  const assignedBus = getBusForDestination(destination.name);

  return (
    <main className="min-h-screen w-full max-w-[100vw] overflow-x-clip text-white">
      <section className="mx-auto grid w-full max-w-screen-xl items-center gap-12 px-6 py-14 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">{destination.type}</p>
          <h1 className="mt-4 text-6xl font-bold">{destination.name}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{destination.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-white/20 bg-slate-950 px-5 py-3 font-bold text-white">
              {destination.travelTime}
            </span>
            <Link href="/pricing" className="space-button">Book your trip</Link>
          </div>
        </div>
        <Planet3D slug={destination.slug} name={destination.name} />
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-12">
        <h2 className="text-3xl font-bold">Trip details</h2>
        <dl className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Distance from Earth" value={destination.distance} />
          <Fact label="Local rhythm" value={destination.dayLength} />
          <Fact label="Comfort plan" value={destination.temperature} />
          <Fact label="Gravity feel" value={destination.gravity} />
        </dl>
      </section>

      <section className="mx-auto grid max-w-screen-xl gap-8 px-6 py-12 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950 p-8">
          <h2 className="text-3xl font-bold">What you can see</h2>
          <ul className="mt-6 space-y-4">
            {destination.sights.map((sight) => (
              <li key={sight} className="flex items-center gap-3 text-slate-300"><span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.8)]" />{sight}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950 p-8">
          <h2 className="text-3xl font-bold">Why the trip is remarkable</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">{destination.reason}</p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Two ways to stay</p>
        <h2 className="mt-3 text-4xl font-bold">Choose your view</h2>
        <div className="mt-8 grid gap-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 lg:grid-cols-2">
            <div className="relative min-h-[360px]">
              <Image src={`/hotels/${destination.slug}.png`} alt={`View of ${destination.hotel}`} fill className="object-cover" />
            </div>
            <div className="p-8 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Orbital panoramic stay</p>
              <h3 className="mt-3 text-4xl font-bold">{destination.hotel}</h3>
              <p className="mt-5 leading-7 text-slate-300">{destination.hotelDescription}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {destination.hotelFeatures.map((feature) => <li key={feature} className="rounded-xl bg-slate-900 px-4 py-3 text-sm text-slate-300">{feature}</li>)}
              </ul>
            </div>
          </div>

          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">{groundStay.label}</p>
              <h3 className="mt-3 text-4xl font-bold">{groundStay.name}</h3>
              <p className="mt-5 leading-7 text-slate-300">{groundStay.description}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {groundStay.features.map((feature) => <li key={feature} className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300">{feature}</li>)}
              </ul>
            </div>
            <div className="relative min-h-[360px] lg:order-last">
              <Image src={`/hotels-surface/${destination.slug}.png`} alt={`View of ${groundStay.name}`} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Seven trip highlights</p>
        <h2 className="mt-3 text-4xl font-bold">Why book {destination.name}</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {funFacts[destination.slug].map((fact, index) => (
            <li key={fact} className="flex min-h-40 flex-col rounded-2xl border border-white/10 bg-slate-950 p-5">
              <span className="text-xs font-bold tracking-[0.2em] text-slate-500">0{index + 1}</span>
              <p className="mt-5 text-sm leading-6 text-slate-300">{fact}</p>
            </li>
          ))}
        </ol>
      </section>

      {assignedBus ? (
        <section className="mx-auto max-w-screen-xl px-6 py-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">Your journey there</p>
          <h2 className="mt-3 text-4xl font-bold">Travel aboard the {assignedBus.name}</h2>
          <div className="mt-8 grid overflow-hidden rounded-3xl border border-white/10 bg-slate-950 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[300px] bg-black">
              <Image src={assignedBus.image} alt={assignedBus.name} fill className="object-cover" />
            </div>
            <div className="p-7 lg:p-10">
              <p className="leading-7 text-slate-300">{assignedBus.summary}</p>
              <dl className="mt-7 grid gap-3 sm:grid-cols-2">
                <Fact label="Trip duration" value={assignedBus.tripLength} />
                <Fact label="Passenger capacity" value={assignedBus.capacity} />
                <Fact label="Cabin style" value={assignedBus.cabin} />
                <Fact label="Food included" value={assignedBus.food} />
              </dl>
              <div className="mt-7 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold">Fun on board</h3>
                  <ul className="mt-4 space-y-3">
                    {assignedBus.onboardLife.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(253,230,138,0.8)]" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Technical notes</h3>
                  <ul className="mt-4 space-y-3">
                    {assignedBus.technical.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.85)]" />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/space-buses" className="space-button text-sm">Meet all Space Buses</Link>
                <Link href={"/space-buses/" + assignedBus.slug} className="space-button text-sm">Explore this Space Bus</Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto flex max-w-screen-xl flex-col gap-4 px-6 py-16 sm:flex-row sm:justify-between">
        <Link href="/destinations" className="space-button">← Back to destinations</Link>
        <Link href="/pricing" className="space-button">Book your trip</Link>
        <Link href={`/testemunhos?destination=${encodeURIComponent(destination.name.replace(/^The /, ""))}`} className="space-button">Already traveled here? Leave a testimonial</Link>
      </section>

      <p className="mx-auto max-w-screen-xl px-6 pb-4 text-xs leading-5 text-slate-500">Travel estimates are SpaceY planning ranges for this fictional booking experience. Visual texture maps by <a className="underline hover:text-white" href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noreferrer">Solar System Scope</a> under CC BY 4.0.</p>
    </main>
  );
}
