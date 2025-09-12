import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-nav-bg text-nav-text font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
 
          <div className="flex-shrink-0">
            <Link href="/">

            <img
              className="h-10 w-auto"
              src="/logo.svg" 
              alt="W&A Experiences"
              />
              </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="nav-link">
                My Trip
                <span className="underline"></span>
            </Link>
            <Link 
              href="/customized-services"
              className="nav-link"
            >
              Customized Services
              <span className="underline"></span>
            </Link>
            <Link
              href="/what-we-offer"
              className="nav-link"
            >
              What We Offer
              <span className="underline"></span>
            </Link>
            <a
              href="#"
              className="nav-link"
            >
              Contact
              <span className="underline"></span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
