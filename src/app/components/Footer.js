import Image from "next/image";
import Link from "next/link";

const destinationLinks = [
  ["Sun", "sun"],
  ["Mercury", "mercury"],
  ["Venus", "venus"],
  ["Earth", "earth"],
  ["Moon", "moon"],
  ["Mars", "mars"],
  ["Jupiter", "jupiter"],
  ["Saturn", "saturn"],
  ["Uranus", "uranus"],
  ["Neptune", "neptune"],
  ["Pluto", "pluto"],
  ["Alpha Centauri", "alpha-centauri"],
  ["Milky Way", "milky-way-galaxy"],
  ["Black Hole", "black-hole"]
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid w-full max-w-screen-xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="SpaceY home">
            <Image src="/logo.png" width={180} height={75} alt="SpaceY" className="h-auto w-44" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            First-class interplanetary travel for people who prefer a vacation to a mission.
          </p>
        </div>

        <nav aria-label="Destination links">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Destinations</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {destinationLinks.map(([name, slug]) => (
              <li key={slug}>
                <Link href={`/destinations/${slug}`} className="transition hover:text-slate-300">{name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company links">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/destinations" className="transition hover:text-slate-300">All destinations</Link></li>
            <li><Link href="/about" className="transition hover:text-slate-300">About SpaceY</Link></li>
            <li><Link href="/pricing" className="transition hover:text-slate-300">Pricing</Link></li>
            <li><Link href="/testemunhos" className="transition hover:text-slate-300">Leave a testimonial</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Ready for launch?</h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">Pick a destination and start planning your next vacation.</p>
          <Link href="/destinations" className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-slate-200">
            Explore destinations
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-500">
        <p>SpaceY · All rights reserved · 2024–{currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
