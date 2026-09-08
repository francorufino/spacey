import React from "react";
import Testemunhos from "../components/Testemunhos";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { GridFSBucket } from "mongodb";
import getDatabase from "../data/mongodb";

const createTestimonial = async (formData) => {
  "use server";

  const name = formData.get("name")?.toString().trim();
  const destination = formData.get("destination")?.toString();
  const testimonial = formData.get("testimonial")?.toString().trim();
  const image = formData.get("image");
  const requestHeaders = headers();
  const detectedCountry =
    requestHeaders.get("x-vercel-ip-country") ||
    requestHeaders.get("cf-ipcountry") ||
    requestHeaders.get("x-country-code");
  const countryCode = /^[a-z]{2}$/i.test(detectedCountry || "")
    ? detectedCountry.toUpperCase()
    : null;

  const database = await getDatabase();

  if (!database) {
    redirect("/testemunhos?error=configuracao");
  }

  if (
    !name ||
    name.length > 80 ||
    !destination ||
    !testimonial ||
    testimonial.length < 10 ||
    testimonial.length > 200 ||
    !image ||
    image.size === 0 ||
    image.size > 5 * 1024 * 1024 ||
    !["image/jpeg", "image/png", "image/webp"].includes(image.type)
  ) {
    redirect("/testemunhos?error=dados");
  }

  const bucket = new GridFSBucket(database, {
    bucketName: "testimonialImages"
  });
  let imageId;

  try {
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const uploadStream = bucket.openUploadStream(image.name, {
      metadata: { contentType: image.type }
    });

    imageId = uploadStream.id;
    uploadStream.end(imageBuffer);
    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });
  } catch {
    redirect("/testemunhos?error=imagem");
  }

  try {
    await database.collection("testimonials").insertOne({
      name,
      destination,
      testimonial,
      rating: "/1star.png",
      countryCode,
      imageId,
      createdAt: new Date()
    });
  } catch {
    await bucket.delete(imageId);
    redirect("/testemunhos?error=depoimento");
  }

  revalidatePath("/");
  redirect("/testemunhos?success=true");
};

const page = ({ searchParams }) => {
  const allowedDestinations = ["Sun", "Mercury", "Venus", "Earth", "Moon", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "Alpha Centauri", "Milky Way Galaxy", "Black Hole"];
  const defaultDestination = allowedDestinations.includes(searchParams?.destination)
    ? searchParams.destination
    : "";
  const errorMessages = {
    configuracao: "Testimonial submissions have not been configured yet.",
    dados: "Check the information provided and try again.",
    imagem: "The image could not be uploaded.",
    depoimento: "The testimonial could not be saved."
  };

  return (
    <main className="container mx-auto min-h-screen pt-[150px] pb-16 px-4 text-white flex flex-col items-center">
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-4xl font-bold mb-4">Leave your testimonial</h1>
        <p className="text-gray-300">
          Space travel sounds amazing, but something always goes wrong at
          SpaceY. This is a humorous website where every trip gets one star.
          Be creative and tell us the funniest reason why you did not enjoy
          your journey. Once submitted, your testimonial will appear on the
          home page.
        </p>
      </div>

      {searchParams?.success && (
        <p className="w-full max-w-2xl bg-green-900 p-4 rounded mb-5">
          Testimonial submitted successfully!
        </p>
      )}

      {searchParams?.error && (
        <p className="w-full max-w-2xl bg-red-900 p-4 rounded mb-5">
          {errorMessages[searchParams.error] || errorMessages.depoimento}
        </p>
      )}

      <Testemunhos createTestimonial={createTestimonial} defaultDestination={defaultDestination} />
    </main>
  );
};

export default page;
