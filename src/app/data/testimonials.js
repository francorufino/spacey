// data/testimonials.js
const testimonials = [
  {
    id: 1,
    image: "/persons/1.jpg",
    name: "Trace Smith",
    destination: "Mars",
    rating: "/rating.png",
    testimonial: "I didnt like it, I was cold the whole trip."
  },

  {
    id: 3,
    image: "/persons/3.jpg",
    name: "Jordan Lee",
    destination: "Jupiter",
    rating: "/rating.png",
    testimonial: "Too far, it took forever."
  },

  {
    id: 4,
    image: "/persons/4.jpg",
    name: "Riley Clark",
    destination: "Venus",
    rating: "/rating.png",
    testimonial: "I couldnt find any internet signal!"
  },

  {
    id: 7,
    image: "/persons/7.jpg",
    name: "Quinn Bailey",
    destination: "Pluto",
    rating: "/rating.png",
    testimonial: "The meals were too dry!"
  },

  {
    id: 15,
    image: "/persons/15.jpg",
    name: "River Bailey",
    destination: "Milky Way Galaxy",
    rating: "/rating.png",
    testimonial: "The flight was too shaky, my hair got all messed up!"
  },
  {
    id: 6,
    image: "/persons/6.jpg",
    name: "Bailey Parker",
    destination: "Saturn",
    rating: "/rating.png",
    testimonial:
      "Because of its 83 moons plus the rings I found it too visually poluted."
  },
  {
    id: 9,
    image: "/persons/9.jpg",
    name: "Jordan Morgan",
    destination: "Neptune",
    rating: "/rating.png",
    testimonial:
      "Neptune was freezing cold, regretting not packing enough warm clothes."
  },
  {
    id: 11,
    image: "/persons/11.jpg",
    name: "Peyton Gray",
    destination: "Jupiter",
    rating: "/rating.png",
    testimonial:
      "The storms in Jupter were non-stop, couldnt put my umbrella down the entire trip."
  },
  {
    id: 16,
    image: "/persons/16.jpg",
    name: "Alex Bailey",
    destination: "Pluto",
    rating: "/rating.png",
    testimonial: "Pluto was too small, couldnt find a private place to talk."
  },
  {
    id: 19,
    image: "/persons/19.jpg",
    name: "Riley Jordan",
    destination: "Uranus",
    rating: "/rating.png",
    testimonial: "Uranus was too tilty, couldnt walk straight the whole time."
  },
  {
    id: 23,
    image: "/persons/23.jpg",
    name: "Morgan Parker",
    destination: "Sun",
    rating: "/rating.png",
    testimonial:
      "The surface of Sun was too hot to handle, could not step outside the spaceship."
  },
  {
    id: 28,
    image: "/persons/28.jpg",
    name: "Bailey Taylor",
    destination: "Mars",
    rating: "/rating.png",
    testimonial: "Mars was too dusty, ended up coughing the entire trip."
  },
  {
    id: 32,
    image: "/persons/32.jpg",
    name: "Skyler Gray",
    destination: "Venus",
    rating: "/rating.png",
    testimonial: "Venus was too cloudy, couldnt see anything from the surface."
  },
  {
    id: 36,
    image: "/persons/36.jpg",
    name: "Parker Taylor",
    destination: "Alpha Centauri",
    rating: "/rating.png",
    testimonial: "Alpha Centauri was a waste of time, nothing but empty space."
  },
  {
    id: 40,
    image: "/persons/40.jpg",
    name: "Gray Bailey",
    destination: "Black Hole",
    rating: "/rating.png",
    testimonial: "The black hole was weird, felt like I was being sucked in."
  },
  {
    id: 18,
    image: "/persons/18.jpg",
    name: "Peyton Bailey",
    destination: "Venus",
    rating: "/rating.png",
    testimonial:
      "Venus was too hot, felt like being inside an oven the whole time."
  },
  {
    id: 24,
    image: "/persons/24.jpg",
    name: "Jordan Parker",
    destination: "Jupiter",
    rating: "/rating.png",
    testimonial:
      "The gravity of Jupter was too strong, felt like being crushed under pressure."
  },
  {
    id: 29,
    image: "/persons/29.jpg",
    name: "Riley Jordan",
    destination: "Mercury",
    rating: "/rating.png",
    testimonial:
      "Mercury was too fast-paced, just reminded of my daily routine on Earth."
  },
  {
    id: 33,
    image: "/persons/33.jpg",
    name: "Taylor Bailey",
    destination: "Saturn",
    rating: "/rating.png",
    testimonial:
      "The rings of Saturn were underwhelming, expected something more spectacular."
  },
  {
    id: 37,
    image: "/persons/37.jpg",
    name: "Gray Parker",
    destination: "Uranus",
    rating: "/rating.png",
    testimonial: "Too windy, I lost my favorite scarf because of the winds"
  },
  {
    id: 41,
    image: "/persons/41.jpg",
    name: "Skyler Bailey",
    destination: "Alpha Centauri",
    rating: "/rating.png",
    testimonial: "Alpha Centauri was too far, felt isolated from civilization."
  },

  {
    id: 50,
    image: "/persons/50.jpg",
    name: "Taylor Johnson",
    destination: "Mars",
    rating: "/rating.png",
    testimonial: "Mars was too dusty, my allergies went crazy."
  },
  {
    id: 79,
    image: "/persons/59.jpg",
    name: "Charlie Blue",
    destination: "Black Hole",
    rating: "/rating.png",
    testimonial:
      "The black hole was too dark, couldn't see my hand in front of my face."
  },
  {
    id: 56,
    image: "/persons/56.jpg",
    name: "Skyler Johnson",
    destination: "Pluto",
    rating: "/rating.png",
    testimonial: "Pluto was too small and cramped, felt claustrophobic."
  }
];

const testimonialAdditions = {
  1: " The cabin heater never caught up, and I spent every meal wrapped in two emergency blankets. My hands stayed frozen.",
  3: " By the time we arrived, I had forgotten why I booked it and had already watched every movie onboard twice. Never again.",
  4: " I restarted my communicator constantly and still could not upload a single vacation photo. The help desk was useless.",
  7: " Every plate crumbled before it reached my mouth, and even the dessert needed a glass of water. Breakfast was worse.",
  15: " The turbulence lasted for hours, and no amount of zero-gravity conditioner could fix the damage.",
  6: " There was nowhere calm to rest my eyes, and every window somehow had three more moons in it.",
  9: " The thermal suit looked stylish in the brochure but did absolutely nothing once the blue winds started.",
  11: " My umbrella turned inside out immediately, and the observation deck closed before I saw anything.",
  16: " The lounge was packed, the corridors were tiny, and I could hear every conversation through the walls.",
  19: " Every hallway felt sideways, my drinks kept sliding away, and I never found my balance.",
  23: " The heat shield worked, but every viewing deck still felt like standing beside an open furnace.",
  28: " Red powder got inside my boots, my luggage, and somehow even the sealed snack drawer.",
  32: " I paid for panoramic views and spent the entire stay staring at the same yellow haze.",
  36: " After such a long journey, the twin stars looked like two ordinary lights through a dirty window.",
  40: " The lensing made me dizzy, every clock disagreed, and the staff kept calling it part of the experience.",
  18: " The cooling system was always set to maximum, but I still slept beside the emergency ice packs.",
  24: " Even lifting my breakfast felt exhausting, and every step back to my suite took forever.",
  29: " The itinerary never slowed down, and the sunrise-to-sunrise schedule made absolutely no sense.",
  33: " The brochure promised a breathtaking view, but after ten minutes every icy band looked identical.",
  37: " The staff called it an atmospheric experience, but nobody offered to replace what blew away.",
  41: " Messages home took forever, the cabin was silent, and the distant stars only made it feel lonelier.",
  50: " The filters clogged on day one, and I sneezed red dust across every room I entered. My eyes never stopped watering.",
  79: " The observation lounge had mood lighting, but that did not help when the entire view was black.",
  56: " My suite felt like a storage locker, and the low ceiling made every night impossible to relax.",
};

export default testimonials.map((testimonial) => ({
  ...testimonial,
  testimonial: `${testimonial.testimonial}${testimonialAdditions[testimonial.id] || ""}`
}));
