export const destinations = [
  {
    slug: "sun", name: "The Sun", image: "/destinations/sun.png", type: "Close-orbit experience",
    distance: "About 150 million km from Earth", travelTime: "Estimated arrival: about 85 days with a SpaceX close-approach itinerary",
    dayLength: "Continuous sunrise views from a protected orbit", temperature: "Shielded cabin climate with solar-filtered viewing", gravity: "Artificial gravity aboard the orbital habitat",
    summary: "This is not a science stop. It is SpaceY's most dramatic close-orbit escape: a protected approach to the Sun with panoramic lounges, private suites and a front-row view of pure light.",
    sights: ["Solar-filter panorama", "Golden corona viewing", "Private sunrise lounges"],
    reason: "Book the Sun for the most cinematic light show in the catalog, with every viewing moment handled from a shielded SpaceX observatory.",
    hotel: "Helios Crown Observatory", hotelDescription: "A radiation-shielded orbital retreat with electrochromic panorama lounges, private sunrise dining and concierge-led solar viewing.",
    hotelFeatures: ["Solar-filter observation deck", "Night-side sleeping suites", "Thermal spa", "Protected photography lounge"]
  },
  {
    slug: "mercury", name: "Mercury", image: "/destinations/mercury.png", type: "Rocky planet escape",
    distance: "About 77-222 million km from Earth", travelTime: "Estimated arrival: about 3 to 4 months with SpaceX",
    dayLength: "Slow local daylight, scheduled around twilight stays", temperature: "Extreme outside, fully climate-controlled inside", gravity: "Light-gravity experience, about 38% of Earth",
    summary: "Mercury is a compact, high-intensity getaway for travelers who want the Sun huge on the horizon and a destination that feels fast, rare and unforgettable.",
    sights: ["Sunrise twice as bold", "Twilight-zone excursions", "Crater-side observation decks"],
    reason: "Choose Mercury for a short interplanetary jump with maximum visual impact and a luxury stay built around the planet's dramatic twilight line.",
    hotel: "The Terminator House", hotelDescription: "A mobile luxury lodge that follows Mercury's narrow twilight zone, keeping every suite comfortable while the landscape shifts from gold to shadow.",
    hotelFeatures: ["Twilight-view suites", "Crater excursions", "Triple thermal shielding", "Low-gravity gym"]
  },
  {
    slug: "venus", name: "Venus", image: "/destinations/venus.png", type: "Cloud-city getaway",
    distance: "About 38-261 million km from Earth", travelTime: "Estimated arrival: about 4 to 5 months with SpaceX",
    dayLength: "Slow golden light cycle from the cloud deck", temperature: "Earthlike comfort inside the floating resort", gravity: "Near-Earth gravity feel",
    summary: "Venus is sold as a luxury cloud escape: golden views, floating terraces and a protected route above one of the most beautiful skies in the inner Solar System.",
    sights: ["Golden cloud terraces", "Volcanic landscapes below", "Sunset dining above Venus"],
    reason: "Book Venus when you want elegance, warmth and a resort-style arrival that feels closer to a dream hotel than a technical expedition.",
    hotel: "Aphrodite Cloud Palace", hotelDescription: "A buoyant hotel cruising above the surface with panoramic cloud terraces, pressure-balanced suites and private arrival lounges.",
    hotelFeatures: ["Floating observation lounge", "Cloud safaris", "Pressure-balanced suites", "Sunrise dining deck"]
  },
  {
    slug: "earth", name: "Earth", image: "/destinations/earth.png", type: "Orbital home view",
    distance: "You are already here", travelTime: "Estimated arrival: same-day orbital boarding",
    dayLength: "Multiple sunrises during each orbital stay", temperature: "Comfort-controlled SpaceY suites", gravity: "Artificial gravity with zero-gravity sessions available",
    summary: "Earth is the easy luxury option: leave the ground, settle into orbit and see home from a private suite without committing to a long interplanetary route.",
    sights: ["Blue oceans from orbit", "Auroras over the poles", "City lights at night"],
    reason: "Reserve Earth orbit for the quickest SpaceY experience and the view that makes every other destination feel possible.",
    hotel: "SpaceY One Orbital", hotelDescription: "A quiet orbital hotel offering frequent sunrise views, Earth-facing dining and a fast return service when your stay is complete.",
    hotelFeatures: ["Cupola suites", "Zero-gravity studio", "Earth-view restaurant", "Rapid return service"]
  },
  {
    slug: "moon", name: "The Moon", image: "/destinations/moon.png", type: "Lunar weekend",
    distance: "Average: 384,400 km from Earth", travelTime: "Estimated arrival: about 4 days with SpaceX",
    dayLength: "Long lunar daylight, planned by resort zone", temperature: "Protected suites and guided outdoor windows", gravity: "Low-gravity stay, about one-sixth of Earth",
    summary: "The Moon is the shortest true space vacation: low-gravity movement, Earthrise views and a premium surface stay close enough to feel spontaneous.",
    sights: ["Earthrise", "Private rover routes", "Crater-side dining"],
    reason: "Choose the Moon for a first deep-space trip with big bragging rights and a travel time that still fits a luxury escape.",
    hotel: "Tranquility Grand", hotelDescription: "A protected lunar resort with private Earthrise windows, rover service and low-gravity social spaces.",
    hotelFeatures: ["Earthrise suites", "Lunar rover valet", "Low-gravity ballroom", "Crater-side dining"]
  },
  {
    slug: "mars", name: "Mars", image: "/destinations/mars.png", type: "Signature planet trip",
    distance: "About 54.6-401 million km from Earth", travelTime: "Estimated arrival: about 6 to 9 months with SpaceX",
    dayLength: "A local day close to Earth's rhythm", temperature: "Heated cabins, resorts and rover transfers", gravity: "Light-gravity experience, about 38% of Earth",
    summary: "Mars is the headline SpaceX destination: a complete interplanetary journey to red landscapes, pressurized resorts and the feeling of arriving at a new world.",
    sights: ["Red-dune arrival", "Canyon-view suites", "Blue sunset dinners"],
    reason: "Book Mars if you want the classic future-travel story: leaving Earth, crossing deep space and stepping into the planet everyone talks about.",
    hotel: "Olympus Mons Lodge", hotelDescription: "A pressurized red-dune retreat with heated rover transfers, private view suites and a full-service arrival experience.",
    hotelFeatures: ["Volcano-view rooms", "Pressurized garden", "Dust-proof observatory", "Heated rover transfers"]
  },
  {
    slug: "jupiter", name: "Jupiter", image: "/destinations/jupiter.png", type: "Giant-planet cruise",
    distance: "About 588-968 million km from Earth", travelTime: "Estimated arrival: about 2 to 3 years with SpaceX",
    dayLength: "Fast-changing views from orbital resort windows", temperature: "Climate-controlled orbital and cloud-level habitats", gravity: "Artificial gravity throughout passenger areas",
    summary: "Jupiter is the grand tour: a long-haul SpaceX journey to enormous cloud bands, private moon excursions and a resort built for the biggest view in the Solar System.",
    sights: ["Giant cloud bands", "Europa day trips", "Aurora-view lounges"],
    reason: "Choose Jupiter when the trip needs to feel huge from the first booking confirmation to the final orbital approach.",
    hotel: "Great Red Spot Skyhouse", hotelDescription: "A stabilized orbital hotel positioned for sweeping views of Jupiter's clouds, premium dining and curated moon transfers.",
    hotelFeatures: ["Storm-view gallery", "Europa day trips", "Radiation-safe core", "Artificial-gravity suites"]
  },
  {
    slug: "saturn", name: "Saturn", image: "/destinations/saturn.png", type: "Ring-view expedition",
    distance: "About 1.2-1.7 billion km from Earth", travelTime: "Estimated arrival: about 6 to 7 years with SpaceX",
    dayLength: "Ring-lit views scheduled throughout the stay", temperature: "Warm orbital suites with protected observation areas", gravity: "Artificial gravity aboard the resort",
    summary: "Saturn is no longer a reference from someone else's mission. This package is about your arrival: a SpaceX journey to the rings, private suites and the most iconic view in space travel.",
    sights: ["Ring-plane arrival", "Titan transfer views", "Private ring panoramas"],
    reason: "Book Saturn when you want the destination people recognize instantly and the story no ordinary vacation can compete with.",
    hotel: "Crown Ring Resort", hotelDescription: "An orbital icon with uninterrupted ring views from every suite, private Titan transfers and full-service arrival lounges.",
    hotelFeatures: ["Ring-facing suites", "Enceladus spa", "Titan excursion desk", "Panoramic fine dining"]
  },
  {
    slug: "uranus", name: "Uranus", image: "/destinations/uranus.png", type: "Outer-planet retreat",
    distance: "About 2.6-3.2 billion km from Earth", travelTime: "Estimated arrival: about 8 to 10 years with SpaceX",
    dayLength: "Quiet blue light cycles from a polar route", temperature: "Thermal cocoon suites for deep-space comfort", gravity: "Artificial gravity aboard the boutique resort",
    summary: "Uranus is for travelers who want real exclusivity: a long, quiet SpaceX route to a blue world with boutique suites and views almost nobody has on their list.",
    sights: ["Blue horizon lounges", "Tilt-view atrium", "Miranda flyby option"],
    reason: "Choose Uranus for a rare outer-planet itinerary that feels private, calm and deliberately far from ordinary tourism.",
    hotel: "Azure Tilt Station", hotelDescription: "A polar-orbit boutique hotel designed around quiet blue light, private viewing rooms and long-stay deep-space comfort.",
    hotelFeatures: ["Tilt-view atrium", "Miranda flybys", "Thermal cocoon rooms", "Ring-shadow observatory"]
  },
  {
    slug: "neptune", name: "Neptune", image: "/destinations/neptune.png", type: "Deep-blue escape",
    distance: "About 4.3-4.7 billion km from Earth", travelTime: "Estimated arrival: about 12 to 14 years with SpaceX",
    dayLength: "Deep-blue viewing cycles from orbit", temperature: "Silent, warm suites above the storm line", gravity: "Artificial gravity throughout guest areas",
    summary: "Neptune is the blue edge of the catalog: a long-haul luxury journey for passengers who want a destination that feels remote, cinematic and genuinely rare.",
    sights: ["Deep-blue storms", "Triton transfer route", "Silent observation lounges"],
    reason: "Book Neptune when the distance is part of the luxury and the arrival should feel like reaching the end of the known itinerary.",
    hotel: "Poseidon Blue", hotelDescription: "A deep-orbit sanctuary with silent suites, vibration-isolated windows and guided views of Neptune's moving blue atmosphere.",
    hotelFeatures: ["Storm cinema lounge", "Triton transfers", "Deep-space sauna", "Acoustic-silent suites"]
  },
  {
    slug: "pluto", name: "Pluto", image: "/destinations/pluto.png", type: "Frontier package",
    distance: "About 4.3-7.5 billion km from Earth", travelTime: "Estimated arrival: about 15 to 18 years with SpaceX",
    dayLength: "Slow frontier days planned around resort activities", temperature: "Fully heated suites and guided surface access", gravity: "Ultra-light-gravity experience",
    summary: "Pluto is the ultimate bragging-rights trip: a frontier package for passengers who do not want a common destination and are ready to go beyond the classic planets.",
    sights: ["Ice-plain arrival", "Charon-view terrace", "Frontier observatory nights"],
    reason: "Choose Pluto when you want the most exclusive stamp in the SpaceY catalog and a travel story that sounds impossible until you book it.",
    hotel: "Frontier Ice House", hotelDescription: "A warm low-gravity lodge set into protected ice, with private horizon windows and a Charon-view lounge.",
    hotelFeatures: ["Ice-plain panorama", "Charon-view rooms", "Geothermal-style spa", "Kuiper Belt observatory"]
  },
  {
    slug: "alpha-centauri", name: "Alpha Centauri", image: "/background-hero.jpg", type: "Interstellar waitlist",
    distance: "About 4.37 light-years from Earth", travelTime: "Estimated arrival: custom long-duration itinerary by consultation",
    dayLength: "Defined by selected resort world", temperature: "Custom habitat climate", gravity: "Artificial gravity and destination-specific planning",
    summary: "Alpha Centauri is a future-facing waitlist for travelers who want to reserve the first step beyond the Solar System with SpaceY concierge planning.",
    sights: ["Twin-star views", "Deep-space cruise phases", "Private interstellar observatory"],
    reason: "Reserve interest for Alpha Centauri when the point is not a quick escape, but being first in line for the next class of travel.",
    hotel: "Proxima Grand", hotelDescription: "A deep-space observatory hotel concept with twin-star views, long-stay gardens and private concierge planning.",
    hotelFeatures: ["Binary-star suites", "Exoplanet observatory", "Long-stay gardens", "Relativistic postcard desk"]
  },
  {
    slug: "milky-way-galaxy", name: "Milky Way Galaxy", image: "/background-hero.jpg", type: "Galaxy grand tour",
    distance: "Custom route inside our galaxy", travelTime: "Estimated arrival: bespoke itinerary by route and package tier",
    dayLength: "Varies by stop", temperature: "Luxury habitat climate across the route", gravity: "Artificial gravity during cruise segments",
    summary: "The Milky Way package is a rotating grand tour concept: not one stop, but a curated sequence of dark-sky views, star fields and deep-space hotel pauses.",
    sights: ["Nebula-view suites", "Dense star-field dinners", "Panoramic dark-sky waypoints"],
    reason: "Choose the galaxy tour when one destination is not enough and your trip needs to feel like a complete lifetime itinerary.",
    hotel: "Orion Arm Touring House", hotelDescription: "A roaming hotel concept that pauses at selected panoramic waypoints with private suites and rotating destination menus.",
    hotelFeatures: ["Nebula-view suites", "Rotating itinerary", "Deep-field observatory", "Century-proof minibar"]
  },
  {
    slug: "black-hole", name: "Black Hole", image: "/destinations/black-hole.png", type: "Extreme-view reserve",
    distance: "Custom deep-space route by consultation", travelTime: "Estimated arrival: specialist itinerary quoted after reservation request",
    dayLength: "Observation windows planned by route", temperature: "Protected luxury habitat climate", gravity: "Artificial gravity with strict safe-distance routing",
    summary: "The Black Hole reserve is SpaceY's most extreme viewing concept: a protected observation stay for passengers who want the rarest visual experience in the catalog.",
    sights: ["Light-bending views", "Safe-distance observation deck", "Distorted star-field lounge"],
    reason: "Reserve this package when ordinary space tourism is too tame and you want a destination built around the edge of imagination.",
    hotel: "Event Horizon Retreat", hotelDescription: "A station concept maintained at a safe observation distance with premium suites, escape-route redundancy and guided viewing windows.",
    hotelFeatures: ["Lensing-view windows", "Time-dilation clocks", "Redundant escape craft", "No-late-checkout policy"]
  }
];

export const getDestination = (slug) => destinations.find((destination) => destination.slug === slug);
