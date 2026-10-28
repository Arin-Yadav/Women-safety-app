import React from "react";
import { IoShield } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-2">
            Suraksha
            <IoShield />
          </h2>
          <p className="mt-3 text-gray-300 text-sm max-w-md">
            Built for safety, confidence, and empowerment.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#home" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#aboutus" className="hover:text-white transition">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Safety Features</h3>
          <ul className="space-y-3 text-gray-400">
            <li>Emergency Alerts</li>
            <li>Live Location Sharing</li>
            <li>Secure Chat Support</li>
            {/* <li>Privacy Protection</li> */}
          </ul>
        </div>
      </div>

      <div className="w-full px-6 py-5 flex justify-center items-center text-sm text-gray-400">
        <p>© 2026 Suraksha. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
