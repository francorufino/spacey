"use client";

import React, { useState } from "react";

const Testemunhos = ({ createTestimonial, defaultDestination = "" }) => {
  const [testimonialLength, setTestimonialLength] = useState(0);

  return (
    <form
      action={createTestimonial}
      className="w-full max-w-2xl bg-slate-900 p-8 rounded-lg"
    >
      <div className="flex flex-col mb-5">
        <label htmlFor="name" className="mb-2 font-bold">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={80}
          required
          className="rounded p-3 bg-slate-800 border border-slate-700"
        />
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="image" className="mb-2 font-bold">
          Your photo
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className="rounded p-3 bg-slate-800 border border-slate-700"
        />
        <p className="text-sm text-gray-400 mt-2">
          Upload a sad, disappointed or frustrated photo of yourself, or use a
          traveler profile image you created with ChatGPT. Image up to 5
          MB.
        </p>
      </div>

      <div className="flex flex-col mb-5">
        <label htmlFor="destination" className="mb-2 font-bold">
          Where did you travel to?
        </label>
        <select
          id="destination"
          name="destination"
          required
          defaultValue={defaultDestination}
          className="rounded p-3 bg-slate-800 border border-slate-700"
        >
          <option value="">Choose a destination</option>
          <option value="Sun">Sun</option>
          <option value="Mercury">Mercury</option>
          <option value="Venus">Venus</option>
          <option value="Earth">Earth</option>
          <option value="Moon">Moon</option>
          <option value="Mars">Mars</option>
          <option value="Jupiter">Jupiter</option>
          <option value="Saturn">Saturn</option>
          <option value="Uranus">Uranus</option>
          <option value="Neptune">Neptune</option>
          <option value="Pluto">Pluto</option>
          <option value="Alpha Centauri">Alpha Centauri</option>
          <option value="Milky Way Galaxy">Milky Way Galaxy</option>
          <option value="Black Hole">Black Hole</option>
        </select>
      </div>

      <div className="flex flex-col mb-6">
        <label htmlFor="testimonial" className="mb-2 font-bold">
          Your testimonial
        </label>
        <textarea
          id="testimonial"
          name="testimonial"
          rows={5}
          minLength={10}
          maxLength={200}
          onChange={(event) => setTestimonialLength(event.target.value.length)}
          required
          className="rounded p-3 bg-slate-800 border border-slate-700 resize-none"
        />
        <p className="text-sm text-gray-400 mt-2 text-right">
          {testimonialLength}/200 characters
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black font-bold rounded p-3 hover:bg-gray-200"
      >
        Submit testimonial
      </button>
    </form>
  );
};

export default Testemunhos;
