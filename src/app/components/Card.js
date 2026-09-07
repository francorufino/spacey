// components/Card.js
import Image from "next/image";

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
        <div className="col-span-1 relative w-32 h-32 rounded-full overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="col-span-1 ml-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-gray-300 text-base mb-2">
            Trip to: {destination}
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
        <p className="text-gray-300 text-base line-clamp-3">{testimonial}</p>
        {(postedAt || countryFlag) && (
          <p className="text-gray-500 text-sm mt-3">
            {postedAt}
            {postedAt && countryFlag && " · "}
            {countryFlag} {countryName}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
