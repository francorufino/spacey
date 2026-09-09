import StayPricing from "../components/StayPricing";

const tripTypes = [
  {
    name: "Space Bus Cruise",
    description: "Stay aboard the Space Bus only. Guests depart Earth, cruise to the destination view, enjoy onboard luxury and return without checking into a resort."
  },
  {
    name: "7-Day Panorama Resort",
    description: "Travel by Space Bus, spend up to seven days at an orbital or distant-view resort, then return on the next scheduled SpaceY bus."
  },
  {
    name: "7-Day Closest Resort",
    description: "Travel by Space Bus and stay as close as conditions safely allow: surface, near-surface, cloud-level or protected approach."
  }
];

export const metadata = { title: "Pricing | SpaceY", description: "Compare SpaceY prices by destination and travel style." };

export default function PricingPage() {
  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto max-w-screen-xl px-6 py-16">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Packages</p>
        <h1 className="mt-4 text-center text-5xl font-bold">Choose the destination, then choose how close you go</h1>
        <p className="mx-auto mt-5 max-w-3xl text-center leading-7 text-slate-400">
          SpaceY pricing is destination-based. The same package cannot cost the same for the Moon, Saturn and Pluto, so each planet shows its own cruise, panorama resort and closest-resort price.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tripTypes.map((tripType) => (
            <article key={tripType.name} className="rounded-3xl border border-white/10 bg-slate-950 p-7">
              <h2 className="text-2xl font-bold">{tripType.name}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">{tripType.description}</p>
            </article>
          ))}
        </div>

        <StayPricing />
      </section>
    </main>
  );
}
