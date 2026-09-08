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
      className="relative inline-block w-10 h-10 rounded-full overflow-hidden bg-black shrink-0"
    >
      <Image
        src={image || "/background-hero.jpg"}
        alt=""
        fill
        sizes="40px"
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
    <div className="max-w-xs mx-4 mb-8 bg-slate-900  text-white rounded-lg overflow-hidden shadow-lg">
      <div className="grid grid-cols-2 gap-4 p-4">
        <button
          type="button"
          aria-label={`View ${name}'s photo in full screen`}
          onClick={() => setIsImageOpen(true)}
          className="col-span-1 relative w-32 h-32 rounded-full overflow-hidden cursor-zoom-in"
        >
          <Image src={image} alt={name} fill className="object-cover" />
        </button>
        <div className="col-span-1 ml-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-gray-300 text-base mb-2 flex items-center gap-2">
            <DestinationImage destination={destination} />
            <span>Trip to: {destination}</span>
          </div>
          <div className="mb-2 flex justify-center">
            <Image
              src={rating || "/rating.png"}
              width={120}
              height={50}
              alt="Trip rating"
            />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="text-gray-300 text-base">{testimonial}</p>
        {(postedAt || countryFlag) && (
          <p className="text-gray-500 text-sm mt-3">
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
    </div>
  );
};

export default Card;
