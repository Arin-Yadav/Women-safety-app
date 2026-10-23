import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { RouteIndex, RouteLogin } from "../helpers/RouteName";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to={RouteIndex}
            className="flex items-center gap-2 text-2xl font-bold text-purple-700"
          >
            <span>🛡️</span>
            <span>Suraksha</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-sm font-medium text-gray-700 hover:text-purple-700 transition cursor-pointer"
            >
              Home
            </ScrollLink>

            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-sm font-medium text-gray-700 hover:text-purple-700 transition cursor-pointer"
            >
              Features
            </ScrollLink>

            <ScrollLink
              to="aboutus"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-sm font-medium text-gray-700 hover:text-purple-700 transition cursor-pointer"
            >
              About Us
            </ScrollLink>

            <Link
              to={RouteLogin}
              className="bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-purple-800 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-purple-700 focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-4 space-y-2">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition cursor-pointer"
          >
            Home
          </ScrollLink>

          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition cursor-pointer"
          >
            Features
          </ScrollLink>

          <ScrollLink
            to="aboutus"
            smooth={true}
            duration={500}
            offset={-70}
            onClick={closeMenu}
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition cursor-pointer"
          >
            About Us
          </ScrollLink>

          <Link
            to={RouteLogin}
            onClick={closeMenu}
            className="block text-center bg-purple-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-800 transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}