export const destinations = [
  {
    slug: "sun", name: "The Sun", image: "/destinations/sun.png", type: "G-type star",
    distance: "About 150 million km from Earth", travelTime: "11 Earth days",
    dayLength: "About 27 Earth days at the equator", temperature: "About 5,500°C at the visible surface", gravity: "About 28× Earth gravity",
    summary: "The Sun contains more than 99% of the solar system’s mass. It is a sphere of hot plasma powered by nuclear fusion—not a world with a solid surface.",
    sights: ["The textured photosphere", "Enormous prominences", "The glowing solar corona"],
    reason: "For the most dramatic light show in the solar system, viewed from a safely shielded orbital observatory.",
    hotel: "Helios Crown Observatory", hotelDescription: "A radiation-shielded orbital retreat with electrochromic panorama lounges and permanent sunrise views.",
    hotelFeatures: ["Solar-filter observation deck", "Night-side sleeping suites", "Thermal spa", "Protected photography lounge"]
  },
  {
    slug: "mercury", name: "Mercury", image: "/destinations/mercury.png", type: "Rocky planet",
    distance: "77–222 million km from Earth", travelTime: "18 Earth days",
    dayLength: "59 Earth days", temperature: "About −180°C to 430°C", gravity: "38% of Earth gravity",
    summary: "Mercury is the smallest planet and the closest to the Sun. Its heavily cratered surface records billions of years of impacts, while ice survives inside permanently shadowed polar craters.",
    sights: ["Caloris impact basin", "Towering surface scarps", "Polar shadow craters"],
    reason: "Experience extreme contrasts, ancient terrain and a Sun that appears more than twice as large as it does from Earth.",
    hotel: "The Terminator House", hotelDescription: "A mobile luxury lodge that follows Mercury’s narrow twilight zone between brutal heat and deep cold.",
    hotelFeatures: ["Twilight-view suites", "Crater excursions", "Triple thermal shielding", "Low-gravity gym"]
  },
  {
    slug: "venus", name: "Venus", image: "/destinations/venus.png", type: "Rocky planet",
    distance: "38–261 million km from Earth", travelTime: "12 Earth days",
    dayLength: "243 Earth days", temperature: "About 465°C at the surface", gravity: "90% of Earth gravity",
    summary: "Venus is wrapped in carbon-dioxide clouds and has the hottest planetary surface in the solar system. High in its atmosphere, pressure and temperature become far more Earth-like.",
    sights: ["Golden cloud layers", "Volcanic highlands below", "Lightning-lit nights"],
    reason: "Float above one of the solar system’s most hostile surfaces in a surprisingly comfortable atmospheric environment.",
    hotel: "Aphrodite Cloud Palace", hotelDescription: "A buoyant hotel cruising roughly 55 kilometers above the surface, with panoramic cloud terraces.",
    hotelFeatures: ["Floating observation lounge", "Sulfur-cloud safaris", "Pressure-balanced suites", "Sunrise dining deck"]
  },
  {
    slug: "earth", name: "Earth", image: "/destinations/earth.png", type: "Rocky ocean planet",
    distance: "You are already here", travelTime: "Same-day connections",
    dayLength: "23 hours 56 minutes", temperature: "Global average about 15°C", gravity: "1 g",
    summary: "Earth is the only world known to host life and stable surface oceans. Its atmosphere, magnetic field and active geology make it unusual among known planets.",
    sights: ["Blue oceans from orbit", "Auroras over the poles", "City lights at night"],
    reason: "Rediscover home from orbit—the only view that puts every other destination into perspective.",
    hotel: "SpaceY One Orbital", hotelDescription: "A quiet orbital hotel offering a sunrise roughly every 90 minutes and uninterrupted views of home.",
    hotelFeatures: ["Cupola suites", "Zero-gravity studio", "Earth-view restaurant", "Rapid return service"]
  },
  {
    slug: "moon", name: "The Moon", image: "/destinations/moon.png", type: "Natural satellite",
    distance: "About 384,400 km from Earth", travelTime: "2 Earth days",
    dayLength: "29.5 Earth days", temperature: "About −173°C to 127°C", gravity: "16.5% of Earth gravity",
    summary: "Earth’s Moon is a dry, airless world whose cratered surface preserves the early history of the solar system. Its gravity drives much of Earth’s ocean tides.",
    sights: ["Earthrise", "Tycho crater", "The Sea of Tranquility"],
    reason: "The shortest true deep-space escape, with low-gravity adventures and the finest possible view of Earth.",
    hotel: "Tranquility Grand", hotelDescription: "A regolith-shielded resort beside the Sea of Tranquility with private Earthrise windows.",
    hotelFeatures: ["Earthrise suites", "Lunar rover valet", "Low-gravity ballroom", "Crater-side dining"]
  },
  {
    slug: "mars", name: "Mars", image: "/destinations/mars.png", type: "Rocky planet",
    distance: "54.6–401 million km from Earth", travelTime: "30 Earth days",
    dayLength: "24 hours 37 minutes", temperature: "Average about −63°C", gravity: "38% of Earth gravity",
    summary: "Mars is a cold desert world with extinct river valleys, polar ice and the largest volcano in the solar system. Evidence shows that liquid water once flowed across its surface.",
    sights: ["Olympus Mons", "Valles Marineris", "Blue Martian sunsets"],
    reason: "No other planet combines familiar landscapes, enormous geology and such a compelling record of ancient water.",
    hotel: "Olympus Mons Lodge", hotelDescription: "A pressurized red-dune retreat with suites facing the solar system’s largest volcano.",
    hotelFeatures: ["Volcano-view rooms", "Pressurized garden", "Dust-proof observatory", "Heated rover transfers"]
  },
  {
    slug: "jupiter", name: "Jupiter", image: "/destinations/jupiter.png", type: "Gas giant",
    distance: "588–968 million km from Earth", travelTime: "90 Earth days",
    dayLength: "9 hours 56 minutes", temperature: "Cloud tops average about −145°C", gravity: "2.53× Earth gravity at cloud level",
    summary: "Jupiter is the solar system’s largest planet. It has no solid surface; beneath its banded clouds, pressure rises toward exotic fluid hydrogen surrounding a dense core.",
    sights: ["The Great Red Spot", "Auroras at the poles", "The Galilean moons"],
    reason: "Orbit the largest planet, watch storms wider than Earth and take moon-hopping excursions through a miniature planetary system.",
    hotel: "Great Red Spot Skyhouse", hotelDescription: "A stabilized orbital hotel positioned for grandstand views of Jupiter’s clouds and Galilean moons.",
    hotelFeatures: ["Storm-view gallery", "Europa day trips", "Radiation-safe core", "Artificial-gravity suites"]
  },
  {
    slug: "saturn", name: "Saturn", image: "/destinations/saturn.png", type: "Gas giant",
    distance: "1.2–1.7 billion km from Earth", travelTime: "140 Earth days",
    dayLength: "About 10.7 hours", temperature: "Cloud tops average about −178°C", gravity: "About 1.07× Earth gravity at cloud level",
    summary: "Saturn is a gas giant encircled by vast rings made mostly of ice particles. Like Jupiter, it has no solid surface and hosts a diverse family of moons.",
    sights: ["The main ring system", "The north-polar hexagon", "Titan and Enceladus"],
    reason: "Nothing compares with crossing the ring plane or watching millions of icy fragments catch the sunlight.",
    hotel: "Cassini Ring Resort", hotelDescription: "An orbital icon with uninterrupted ring views from every suite and private Titan transfers.",
    hotelFeatures: ["Ring-facing suites", "Enceladus spa", "Titan excursion desk", "Panoramic fine dining"]
  },
  {
    slug: "uranus", name: "Uranus", image: "/destinations/uranus.png", type: "Ice giant",
    distance: "2.6–3.2 billion km from Earth", travelTime: "280 Earth days",
    dayLength: "17 hours 14 minutes", temperature: "Cloud tops can reach about −224°C", gravity: "89% of Earth gravity at cloud level",
    summary: "Uranus is an ice giant rotating almost on its side, probably after an ancient collision. Methane in its atmosphere gives the planet its blue-green color.",
    sights: ["Sideways ring system", "Blue-green atmosphere", "Miranda’s fractured terrain"],
    reason: "See the solar system from a radically tilted world with unusual seasons and a subtle ring system.",
    hotel: "The Sideways Suite", hotelDescription: "A polar-orbit boutique hotel designed around Uranus’s extraordinary axial tilt and quiet blue light.",
    hotelFeatures: ["Tilt-view atrium", "Miranda flybys", "Thermal cocoon rooms", "Ring-shadow observatory"]
  },
  {
    slug: "neptune", name: "Neptune", image: "/destinations/neptune.png", type: "Ice giant",
    distance: "4.3–4.7 billion km from Earth", travelTime: "390 Earth days",
    dayLength: "16 hours 6 minutes", temperature: "Cloud tops average about −200°C", gravity: "1.14× Earth gravity at cloud level",
    summary: "Neptune is the most distant major planet and the windiest known world in the solar system, with atmospheric winds exceeding 2,000 kilometers per hour.",
    sights: ["Supersonic cloud bands", "Dark storm systems", "The moon Triton"],
    reason: "Travel to the blue edge of the planetary system for violent weather viewed from total five-star calm.",
    hotel: "Poseidon Blue", hotelDescription: "A deep-orbit sanctuary with vibration-isolated windows overlooking Neptune’s fast-moving storms.",
    hotelFeatures: ["Storm cinema lounge", "Triton transfers", "Deep-space sauna", "Acoustic-silent suites"]
  },
  {
    slug: "pluto", name: "Pluto", image: "/destinations/pluto.png", type: "Dwarf planet",
    distance: "About 4.3–7.5 billion km from Earth", travelTime: "520 Earth days",
    dayLength: "6.4 Earth days", temperature: "About −240°C to −218°C", gravity: "6% of Earth gravity",
    summary: "Pluto is a complex dwarf planet in the Kuiper Belt, with nitrogen-ice plains, water-ice mountains, a thin atmosphere and five known moons.",
    sights: ["The heart-shaped Tombaugh Regio", "Sputnik Planitia", "Charon hanging overhead"],
    reason: "Visit a surprisingly active frozen world at the frontier of the classical solar system.",
    hotel: "Tombaugh Ice House", hotelDescription: "A warm low-gravity lodge carved beneath nitrogen ice, facing Pluto’s famous heart-shaped plain.",
    hotelFeatures: ["Heart-view lounge", "Charon-view rooms", "Geothermal-style spa", "Kuiper Belt observatory"]
  },
  {
    slug: "alpha-centauri", name: "Alpha Centauri", image: "/background-hero.jpg", type: "Triple-star system",
    distance: "About 4.3 light-years from Earth", travelTime: "900 Earth days",
    dayLength: "Not applicable", temperature: "Varies by star and location", gravity: "Varies throughout the system",
    summary: "Alpha Centauri is our nearest neighboring star system. It contains Alpha Centauri A and B plus Proxima Centauri, the closest individual star to the Sun.",
    sights: ["A close binary sunrise", "Proxima Centauri", "A truly alien night sky"],
    reason: "It is the definitive first step beyond the solar system and a perspective no human has ever experienced.",
    hotel: "Proxima Grand", hotelDescription: "A deep-space observatory hotel positioned for twin-star views and quiet exploration beyond the solar system.",
    hotelFeatures: ["Binary-star suites", "Exoplanet observatory", "Long-stay gardens", "Relativistic postcard desk"]
  },
  {
    slug: "milky-way-galaxy", name: "Milky Way Galaxy", image: "/background-hero.jpg", type: "Barred spiral galaxy",
    distance: "We are already inside it; the center is about 26,000 light-years away", travelTime: "1,200 Earth days",
    dayLength: "Not applicable", temperature: "Varies across stars, gas and dust", gravity: "Varies by location",
    summary: "The Milky Way contains our solar system and roughly 100 billion stars in a disk about 100,000 light-years wide. We see its disk as a milky band across dark skies.",
    sights: ["Stellar nurseries", "Dense star fields", "The galactic center from a safe distance"],
    reason: "Trade one destination for a grand tour of the galaxy that already contains every place humanity has ever known.",
    hotel: "Orion Arm Touring House", hotelDescription: "A roaming hotel that pauses at nebulae, clusters and panoramic dark-sky waypoints.",
    hotelFeatures: ["Nebula-view suites", "Rotating itinerary", "Deep-field observatory", "Century-proof minibar"]
  },
  {
    slug: "black-hole", name: "Black Hole", image: "/destinations/black-hole.png", type: "Extreme gravitational object",
    distance: "Nearest known example is about 1,500 light-years away", travelTime: "1,800 Earth days",
    dayLength: "Not applicable", temperature: "Depends on surrounding matter", gravity: "Extreme near the event horizon",
    summary: "A black hole is a region where gravity is so strong that beyond the event horizon nothing—not even light—can escape. Black holes are not wormholes or cosmic vacuum cleaners.",
    sights: ["Gravitational lensing", "A glowing accretion disk", "Relativistic star fields"],
    reason: "Safely observe the most extreme gravity known, where light bends and our everyday sense of time stops being useful.",
    hotel: "Event Horizon Retreat", hotelDescription: "A station maintained at a safe observation distance with continuous escape trajectories.",
    hotelFeatures: ["Lensing-view windows", "Time-dilation clocks", "Redundant escape craft", "No-late-checkout policy"]
  }
];

export const getDestination = (slug) => destinations.find((destination) => destination.slug === slug);
