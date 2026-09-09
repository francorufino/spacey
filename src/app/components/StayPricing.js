import Link from "next/link";
import { destinations } from "../data/destinations";
import { groundStays } from "../data/groundStays";
import { getBusForDestination } from "../data/spaceBuses";

const prices = {
  sun: ["$420,000", "$780,000", "$1,180,000"],
  mercury: ["$310,000", "$540,000", "$860,000"],
  venus: ["$340,000", "$620,000", "$980,000"],
  earth: ["$45,000", "$95,000", "$68,000"],
  moon: ["$180,000", "$295,000", "$430,000"],
  mars: ["$250,000", "$450,000", "$690,000"],
  jupiter: ["$390,000", "$690,000", "$1,050,000"],
  saturn: ["$440,000", "$760,000", "$1,180,000"],
  uranus: ["$590,000", "$940,000", "$1,460,000"],
  neptune: ["$680,000", "$1,080,000", "$1,680,000"],
  pluto: ["$790,000", "$1,240,000", "$1,940,000"],
  "alpha-centauri": ["$4,800,000", "$7,200,000", "$11,400,000"],
  "milky-way-galaxy": ["$48,000,000", "$72,000,000", "$108,000,000"],
  "black-hole": ["$12,000,000", "$18,000,000", "$210,000,000"]
};

const packageColumns = [
  {
    key: 0,
    name: "Space Bus Cruise",
    description: "Round-trip route aboard the assigned Space Bus. No hotel stay: guests cruise out, enjoy the destination view and return to Earth."
  },
  {
    key: 1,
    name: "7-Day Panorama Resort",
    description: "Round-trip Space Bus travel plus up to seven days at the orbital or distant-view resort facing the selected destination."
  },
  {
    key: 2,
    name: "7-Day Closest Resort",
    description: "Round-trip Space Bus travel plus up to seven days at the closest safe resort: surface, near-surface, cloud-level or protected approach."
  }
];

const getClosestPackageName = (destination, stay) => {
  if (destination.slug === "black-hole") return "One-Way Event Horizon Entry";
  return stay.label.includes("Surface") ? "7-Day Surface Resort" : "7-Day Closest Resort";
};

export default function StayPricing() {
  return (
    <section className="mt-16">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">Destination pricing</p>
          <h2 className="mt-3 text-4xl font-bold">Three ways to travel, priced by destination</h2>
        </div>
        <p className="leading-7 text-slate-400">
          Every destination has its own distance, vehicle and resort conditions. Resort tiers include a maximum seven-day stay; after checkout, the next SpaceY bus brings new guests and returns departing travelers to Earth.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {packageColumns.map((column) => (
          <div key={column.name} className="rounded-2xl border border-white/10 bg-slate-950 p-5">
            <h3 className="text-xl font-bold">{column.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{column.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-9 overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
        <div className="hidden grid-cols-[1.15fr_0.95fr_1fr_1fr_1fr_auto] gap-5 border-b border-white/10 px-6 py-5 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 xl:grid">
          <span>Destination</span><span>Space Bus</span><span>Space Bus Cruise</span><span>7-Day Panorama Resort</span><span>Closest Experience</span><span>Book</span>
        </div>
        {destinations.map((destination) => {
          const [cruise, panorama, closest] = prices[destination.slug];
          const closeStay = groundStays[destination.slug];
          const assignedBus = getBusForDestination(destination.name);
          const closestName = getClosestPackageName(destination, closeStay);
          const closestNote = destination.slug === "black-hole"
            ? "One-way route into the black hole. The specialist vessel is not recovered."
            : `${closeStay.name} - ${closeStay.label.toLowerCase()}, seven days max.`;

          return (
            <div key={destination.slug} className="grid gap-5 border-b border-white/10 px-6 py-6 last:border-b-0 xl:grid-cols-[1.15fr_0.95fr_1fr_1fr_1fr_auto] xl:items-center">
              <div>
                <p className="text-lg font-bold text-white">{destination.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{destination.type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 xl:hidden">Space Bus</p>
                <p className="mt-1 text-sm font-semibold text-slate-200">{assignedBus?.name || "Custom SpaceY vehicle"}</p>
              </div>
              <PriceCell label="Space Bus Cruise" price={cruise} note="No hotel stay. Round-trip scenic cruise." />
              <PriceCell label="7-Day Panorama Resort" price={panorama} note={`${destination.hotel}, seven days max.`} />
              <PriceCell label={closestName} price={closest} note={closestNote} highlight={destination.slug === "black-hole"} />
              <Link href={`/destinations/${destination.slug}`} className="space-button px-5 py-2 text-sm">Book</Link>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-xs leading-5 text-slate-500">
        Prices are starting rates per traveler in USD. Resort packages include Space Bus transport, all meals, concierge service and a maximum seven-day stay.
      </p>
    </section>
  );
}

const PriceCell = ({ label, price, note, highlight = false }) => (
  <div className={highlight ? "rounded-2xl border border-rose-300/30 bg-rose-950/20 p-4" : ""}>
    <p className="text-xs uppercase tracking-[0.14em] text-slate-500 xl:hidden">{label}</p>
    <p className={highlight ? "mt-1 font-bold text-rose-100" : "mt-1 font-bold text-slate-100"}>{price}</p>
    <p className={highlight ? "mt-1 text-xs leading-5 text-rose-100/70" : "mt-1 text-xs leading-5 text-slate-500"}>{note}</p>
  </div>
);
