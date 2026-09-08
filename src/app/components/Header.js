import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-black w-full sticky top-0 z-20">
      <section className="container  max-w-screen-xl pl-8 m-auto py-6 flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={420}
            height={175}
            alt="SpaceY"
            className="w-[280px] sm:w-[360px] md:w-[420px] h-auto"
            priority
          />
        </Link>
        <section className="flex space-x-4 justify-center items-center">
          <nav className="px-8 hidden md:flex justify-between align-baseline gap-2">
            <Link href={"/testemunhos"}>Leave a testimonial</Link>
          </nav>
        </section>
      </section>
    </header>
  );
};

export default Header;
