import React from "react";
import Testemunhos from "../components/Testemunhos";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createTestimonial = async (formData) => {
  "use server";

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const name = formData.get("name")?.toString().trim();
  const destination = formData.get("destination")?.toString();
  const testimonial = formData.get("testimonial")?.toString().trim();
  const image = formData.get("image");

  if (!supabaseUrl || !supabaseKey) {
    redirect("/testemunhos?error=configuracao");
  }

  if (
    !name ||
    name.length > 80 ||
    !destination ||
    !testimonial ||
    testimonial.length < 10 ||
    testimonial.length > 280 ||
    !image ||
    image.size === 0 ||
    image.size > 5 * 1024 * 1024 ||
    !["image/jpeg", "image/png", "image/webp"].includes(image.type)
  ) {
    redirect("/testemunhos?error=dados");
  }

  const extension = image.name.split(".").pop();
  const imageName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const imageResponse = await fetch(
    `${supabaseUrl}/storage/v1/object/testimonials/${imageName}`,
    {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": image.type
      },
      body: image
    }
  );

  if (!imageResponse.ok) {
    redirect("/testemunhos?error=imagem");
  }

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/testimonials/${imageName}`;
  const testimonialResponse = await fetch(`${supabaseUrl}/rest/v1/testimonials`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({
      name,
      image: imageUrl,
      destination,
      testimonial,
      rating: "/1star.png"
    })
  });

  if (!testimonialResponse.ok) {
    await fetch(`${supabaseUrl}/storage/v1/object/testimonials/${imageName}`, {
      method: "DELETE",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      }
    });
    redirect("/testemunhos?error=depoimento");
  }

  revalidatePath("/");
  redirect("/testemunhos?success=true");
};

const page = ({ searchParams }) => {
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

      <Testemunhos createTestimonial={createTestimonial} />
    </main>
  );
};

export default page;
