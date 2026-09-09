import Link from "next/link";
import StayPricing from "../components/StayPricing";

const packages = [
  {
    name: "Panoramic Orbit",
    price: "$250,000",
    description: "The destination fills your window while every comfort stays within reach.",
    features: ["Round-trip shuttle", "Orbital panoramic suite", "All meals included", "Observation excursions", "24-hour concierge"]
  },
  {
    name: "Destination Immersion",
    price: "$450,000",
    description: "Step beyond the shuttle and stay as close to the destination as conditions allow.",
    features: ["Everything in Panoramic Orbit", "Surface or atmospheric hotel", "Private guided excursions", "Premium tasting menu", "Priority rover or transfer service"],
    featured: true
  },
  {
    name: "The Grand Tour",
    price: "Custom",
    description: "A multi-destination itinerary created around your personal corner of the universe.",
    features: ["Two or more destinations", "Private shuttle cabin", "Both stay experiences", "Personal trip director", "Flexible return itinerary"]
  }
];

export const metadata = { title: "Pricing | SpaceY", description: "Choose your SpaceY travel package." };

export default function PricingPage() {
  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto max-w-screen-xl px-6 py-16">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Packages</p>
        <h1 className="mt-4 text-center text-5xl font-bold">The universe, priced clearly</h1>
        <p className="mx-auto mt-5 max-w-2xl text-center leading-7 text-slate-400">Every package includes transport, accommodation and hospitality. Destination pricing varies by distance.</p>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((travelPackage) => (
            <article key={travelPackage.name} className={`flex min-h-[480px] flex-col rounded-3xl border p-8 ${travelPackage.featured ? "border-white bg-white text-black" : "border-white/10 bg-slate-950"}`}>
              <p className={`text-sm font-bold uppercase tracking-[0.2em] ${travelPackage.featured ? "text-slate-500" : "text-slate-400"}`}>{travelPackage.name}</p>
              <p className="mt-5 text-4xl font-bold">{travelPackage.price}</p>
              <p className={`mt-5 min-h-20 leading-7 ${travelPackage.featured ? "text-slate-700" : "text-slate-400"}`}>{travelPackage.description}</p>
              <ul className="mt-7 flex-1 space-y-4">
                {travelPackage.features.map((feature) => <li key={feature} className="flex gap-3 text-sm"><span>✓</span>{feature}</li>)}
              </ul>
              <Link href="/destinations" className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 font-bold ${travelPackage.featured ? "bg-black text-white" : "bg-white text-black"}`}>Choose a destination</Link>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">Starting package prices per traveler, shown in USD.</p>
        <StayPricing />
      </section>
    </main>
  );
}
