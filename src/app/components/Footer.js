import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black">
      <section className="mx-auto w-full  max-w-screen-xl">
        <section className="flex h-[50px] pt-4 justify-center text-center">
          <p>SpaceY - All rights reserved - 2024 - {currentYear}</p>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
