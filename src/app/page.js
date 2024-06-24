import React from "react";
import Image from "next/image";
import Card from "./components/Card";
import testimonials from "./data/testimonials";

export default function Home() {
  // Only take the first n testimonials, where n is the current length of the array
  const visibleTestimonials = testimonials.slice(0, testimonials.length);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/universe.jpg')" }}
      >
        <div className="flex flex-col pt-[130px] justify-center text-center items-center h-full">
          <h1 className="text-8xl font-bold text-white mx-2">
            Nós somos a SpaceY
          </h1>
          <h2 className="text-4xl font-bold pt-[80px] mx-2 text-white">
            Somos os pioneiros na exploração espacial!
          </h2>

          <Image
            className="mt-11"
            src="/rocket.png"
            width={150}
            height={150}
            priority
          />
        </div>
      </div>
      <div className="text-4xl container flex flex-col mt-11 mx-auto justify-center text-center font-bold text-white">
        <div>
          <h1 className="text-left">Nossos destinos</h1>
        </div>
        <section className="flex justify-center text-center">
          {" "}
          <Image
            className="mt-11 "
            src="/destinations.png"
            width={1500}
            height={150}
            priority
          />
        </section>
      </div>
      <div className="text-4xl container mx-auto flex flex-col mt-11 justify-center text-center font-bold text-white">
        <div>
          <h1 className="text-left">
            Veja os testemunhos de nossos viajantes!
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
