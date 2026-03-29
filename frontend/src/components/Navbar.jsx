import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { RouteLogin } from "../helpers/RouteName";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-700 text-white shadow-lg fixed w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 text-2xl font-bold cursor-pointer">
            🛡️ SafetyApp
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition cursor-pointer">
              Home
            </ScrollLink>
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition cursor-pointer">
              Features
            </ScrollLink>
            <ScrollLink
              to="aboutus"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition cursor-pointer">
              About us
            </ScrollLink>
            <Link
              to={RouteLogin}
              className="block bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition cursor-pointer">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-2xl">
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-purple-800 px-4 pb-4 space-y-2">
          <Link
            to="home"
            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition cursor-pointer">
            Home
          </Link>
          <Link className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition cursor-pointer">
            Features
          </Link>
          <Link className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition cursor-pointer">
            About us
          </Link>
          <Link
            to={RouteLogin}
            className="block bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
