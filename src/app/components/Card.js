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
      className="relative inline-block w-9 h-9 rounded-full overflow-hidden bg-black ring-1 ring-white/10 shadow-md shrink-0"
    >
      <Image
        src={image || "/background-hero.jpg"}
        alt=""
        fill
        sizes="36px"
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
    <article className="w-full max-w-xs h-[320px] mx-3 mb-6 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl overflow-hidden border border-white/10 shadow-lg flex flex-col">
      <div className="flex items-center gap-4 px-5 pt-5">
        <button
          type="button"
          aria-label={`View ${name}'s photo in full screen`}
          onClick={() => setIsImageOpen(true)}
          className="relative h-20 w-20 shrink-0 rounded-full overflow-hidden cursor-zoom-in ring-2 ring-white/10 shadow-lg transition duration-300 hover:scale-[1.03] hover:ring-white/25 focus:outline-none focus:ring-4 focus:ring-white/50"
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </button>

        <div className="min-w-0 flex-1 text-left">
          <h2 className="truncate text-lg font-bold leading-tight">{name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <DestinationImage destination={destination} />
            <p className="min-w-0 truncate text-sm font-semibold text-white">{destination}</p>
          </div>
          <div className="mt-2 flex">
            <Image
              src={rating || "/rating.png"}
              width={92}
              height={38}
              alt="Trip rating"
              className="h-auto"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <blockquote className="text-slate-200 text-sm leading-5 text-left">
          “{testimonial}”
        </blockquote>
        {(postedAt || countryFlag) && (
          <p className="text-slate-500 text-xs mt-auto pt-3 text-left">
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
