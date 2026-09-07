import React from "react";
import Image from "next/image";
import Card from "./components/Card";
import testimonials from "./data/testimonials";

const getTestimonials = async () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/testimonials?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return [];
  }

  return response.json();
};

export default async function Home() {
  // Only take the first n testimonials, where n is the current length of the array
  const savedTestimonials = await getTestimonials();
  const visibleTestimonials = [...savedTestimonials, ...testimonials];

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background-hero.jpg')" }}
      >
        <div className="flex flex-col pt-[130px] justify-center text-center items-center h-full">
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
            src="/our-destinations.png"
            width={1500}
            height={150}
            alt="Available destinations"
            priority
          />
        </section>
      </div>
      <div className="text-4xl container mx-auto flex flex-col mt-11 justify-center text-center font-bold text-white">
        <div>
          <h1 className="text-left">
            See what our travelers have to say!
          </h1>
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
