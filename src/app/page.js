import React from "react";
import Head from "next/head";
import Image from "next/image";
import Card from "./components/Card";
import testimonials from "./data/testimonials";

export default function Home() {
  // Only take the first n testimonials, where n is the current length of the array
  const visibleTestimonials = testimonials.slice(0, testimonials.length);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/universe.jpg')" }}
    >
      <Head>
        <title>Home Page</title>
      </Head>
      <div className="flex flex-col pt-[80px] justify-center text-center items-center h-full">
        <h1 className="text-8xl font-bold text-white">We are SpaceY</h1>
        <h2 className="text-4xl font-bold pt-[80px] text-white">
          Pioneering Space Exploration!
        </h2>

        <Image
          className="mt-11"
          src="/rocket.png"
          width={150}
          height={150}
          priority
        />
      </div>
      <div className="text-4xl  flex flex-col mt-11 justify-center text-center font-bold text-white">
        <div>
          <h1>What our travelers are saying about us!</h1>
        </div>
        <div className="flex container mx-auto flex-wrap justify-center mt-11">
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
