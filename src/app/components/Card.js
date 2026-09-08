"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const destinationImages = {
  Sun: "/destinations/sun.png",
  Mercury: "/destinations/mercury.png",
  Venus: "/destinations/venus.png",
  Earth: "/destinations/earth.png",
  Moon: "/destinations/moon.png",
  Mars: "/destinations/mars.png",
  Jupiter: "/destinations/jupiter.png",
  Saturn: "/destinations/saturn.png",
  Uranus: "/destinations/uranus.png",
  Neptune: "/destinations/neptune.png",
  Pluto: "/destinations/pluto.png",
  "Black Hole": "/destinations/black-hole.png"
};

const DestinationImage = ({ destination }) => {
  const image = destinationImages[destination];

  return (
    <span
      aria-hidden="true"
      className="relative inline-block w-16 h-16 rounded-full overflow-hidden bg-black ring-2 ring-white/10 shadow-lg shrink-0"
    >
      <Image
        src={image || "/background-hero.jpg"}
        alt=""
        fill
        sizes="64px"
        className="object-contain"
      />
    </span>
  );
};

const getCountryFlag = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) {
    return "";
  }

  return countryCode
    .toUpperCase()
    .replace(/./g, (character) =>
      String.fromCodePoint(127397 + character.charCodeAt())
    );
};

const Card = ({
  image,
  name,
  destination,
  testimonial,
  rating,
  created_at,
  country_code
}) => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    const closeImage = (event) => {
      if (event.key === "Escape") {
        setIsImageOpen(false);
      }
    };

    window.addEventListener("keydown", closeImage);
    return () => window.removeEventListener("keydown", closeImage);
  }, []);

  const postedAt = created_at
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(new Date(created_at))
    : "";
  const countryFlag = getCountryFlag(country_code);
  const countryName = country_code
    ? new Intl.DisplayNames(["en"], { type: "region" }).of(
        country_code.toUpperCase()
      )
    : "";

  return (
    <article className="w-full max-w-sm h-[680px] mx-4 mb-8 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_55px_rgba(0,0,0,0.35)] flex flex-col">
      <div className="flex flex-col items-center px-6 pt-7">
        <button
          type="button"
          aria-label={`View ${name}'s photo in full screen`}
          onClick={() => setIsImageOpen(true)}
          className="relative w-40 h-40 rounded-full overflow-hidden cursor-zoom-in ring-4 ring-white/10 shadow-xl transition duration-300 hover:scale-[1.03] hover:ring-white/25 focus:outline-none focus:ring-4 focus:ring-white/50"
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="160px"
            className="object-cover"
          />
        </button>

        <h2 className="mt-5 min-h-14 flex items-center justify-center text-2xl font-bold leading-tight text-center">
          {name}
        </h2>

        <div className="w-full my-5 border-t border-white/10" />

        <div className="flex flex-col items-center">
          <DestinationImage destination={destination} />
          <p className="mt-3 text-xl font-semibold text-white">{destination}</p>
          <div className="mt-3 flex justify-center">
            <Image
              src={rating || "/rating.png"}
              width={132}
              height={55}
              alt="Trip rating"
              className="h-auto"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
        <blockquote className="text-slate-200 text-base leading-relaxed text-center">
          “{testimonial}”
        </blockquote>
        {(postedAt || countryFlag) && (
          <p className="text-slate-500 text-sm mt-auto pt-6 text-center">
            {postedAt}
            {postedAt && countryFlag && " · "}
            {countryFlag} {countryName}
          </p>
        )}
      </div>
      {isImageOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name}'s photo`}
          onClick={() => setIsImageOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
        >
          <button
            type="button"
            aria-label="Close photo"
            onClick={() => setIsImageOpen(false)}
            className="absolute top-4 left-4 w-12 h-12 rounded-full bg-black/80 text-white text-4xl leading-none z-[60] flex items-center justify-center"
          >
            ×
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>,
        document.body
      )}
    </article>
  );
};

export default Card;
