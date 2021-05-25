import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="text-gray-500 bg-gray-900 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link href="/">
          <a className="flex items-center mb-4 font-medium text-white title-font md:mb-0">
            <span className="ml-3 text-xl"> rick and morty</span>
          </a>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700">
          <Link href="/">
            <a className="mr-5 hover:text-white">Inicio</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
