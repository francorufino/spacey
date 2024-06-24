import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-black w-full fixed z-20">
      <section className="container  max-w-screen-xl pl-8 m-auto py-6 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={200}
            height={150}
            alt="logo"
            priority
          />
        </Link>
        <section className="flex space-x-4 justify-center items-center">
          <nav className="px-8 hidden md:flex justify-between align-baseline gap-2">
            <p>Deixe um depoimento</p>
          </nav>
        </section>
      </section>
    </header>
  );
};

export default Header;
