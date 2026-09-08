import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "./components/Card";
import ComparisonTable from "./components/ComparisonTable";
import testimonials from "./data/testimonials";
import getDatabase from "./data/mongodb";

export const dynamic = "force-dynamic";

const getTestimonials = async () => {
  try {
    const database = await getDatabase();

    if (!database) {
      return [];
    }

    const savedTestimonials = await database
      .collection("testimonials")
      .find()
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return savedTestimonials.map((testimonial) => ({
      id: testimonial._id.toString(),
      image: `/api/testimonial-images/${testimonial.imageId.toString()}`,
      name: testimonial.name,
      destination: testimonial.destination,
      testimonial: testimonial.testimonial,
      rating: testimonial.rating,
      created_at: testimonial.createdAt.toISOString(),
      country_code: testimonial.countryCode
    }));
  } catch {
    return [];
  }
};

export default async function Home() {
  // Only take the first n testimonials, where n is the current length of the array
  const savedTestimonials = await getTestimonials();
  const visibleTestimonials = [...savedTestimonials, ...testimonials];

  return (
    <>
      <div
        className="min-h-[calc(100vh-165px)] md:min-h-[calc(100vh-223px)] bg-cover bg-center"
        style={{ backgroundImage: "url('/background-hero.jpg')" }}
      >
        <div className="flex min-h-[calc(100vh-165px)] md:min-h-[calc(100vh-223px)] flex-col justify-center text-center items-center">
          <h1 className="text-8xl font-bold text-white mx-2">
            We are SpaceY
          </h1>
          <h2 className="text-4xl font-bold pt-[80px] mx-2 text-white">
            We are pioneers in space exploration!
          </h2>

          <Image
            className="mt-11 relative z-10 w-[220px] md:w-[280px] h-auto space-flight"
            src="/rocket.png"
            width={280}
            height={336}
            alt="SpaceY rocket"
            priority
          />
        </div>
      </div>
      <div className="text-4xl container flex flex-col mt-11 mx-auto justify-center text-center font-bold text-white">
        <div>
          <h1 className="text-left">Our destinations</h1>
        </div>
        <section className="flex justify-center text-center">
          {" "}
          <Image
            className="mt-11 "
            src="/destinations.png"
            width={1500}
            height={150}
            alt="Available destinations"
            priority
          />
        </section>
      </div>
      <ComparisonTable />
      <div className="relative text-4xl container mx-auto flex flex-col mt-11 justify-center text-center font-bold text-white">
        <div>
          <h1 className="text-left">
            See what our travelers have to say!
          </h1>
        </div>
        <div className="sticky top-[calc(100vh-6rem)] z-10 h-0 flex justify-end pr-4 sm:pr-6 pointer-events-none">
          <Link
            href="/testemunhos"
            className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-base font-bold text-black shadow-[0_10px_35px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-white/40"
          >
            Leave your testimonial
          </Link>
        </div>
        <div className="flex container mx-auto flex-wrap justify-center mt-11">
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </>
  );
}
