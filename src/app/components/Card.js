// components/Card.js
import Image from "next/image";

const Card = ({ id, image, name, destination, testimonial, ratingImage }) => {
  return (
    <div className="max-w-xs mx-4 mb-8 bg-black text-white rounded-lg overflow-hidden shadow-lg">
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="col-span-1 relative w-32 h-32 rounded-full overflow-hidden">
          <Image src={image} alt="Person" layout="fill" objectFit="cover" />
        </div>
        <div className="col-span-1 ml-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-gray-300 text-base mb-2">
            Trip to: {destination}
          </div>
          <div className="mb-2 flex justify-center">
            <Image src={"/rating.png"} width={120} height={50} />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="text-gray-300 text-base line-clamp-3">{testimonial}</p>
      </div>
    </div>
  );
};

export default Card;
