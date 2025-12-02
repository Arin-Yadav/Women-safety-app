// import React, { useState } from "react";
// import { FaLinkedin, FaGithub } from "react-icons/fa";
// import { FaBars } from "react-icons/fa"; // Hamburger
// import { FaTimes } from "react-icons/fa"; // Close (X)

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const [activeSection, setActiveSection] = useState(false);
//   const handleMenuItemClick = (sectionId) => {
//     setActiveSection(sectionId);
//     setIsMenuOpen(false);
//   };

//   const menuItems = [
//     { id: "home", label: "Home" },
//     // {id: "projects", label: "Profile"},
//     { id: "about", label: "About" },
//     { id: "contact", label: "Contact" },
//   ];

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className=" bg-gray-900 text-white fixed top-0 w-full md:px-10 flex items-center justify-between h-16 z-10 px-5">
//       <h1 className="hover:text-blue-500 cursor-pointer">Safety Guardian</h1>
//       <ul className="hidden md:flex space-x-6">
//         {menuItems.map((item) => (
//           <li
//             key={item.id}
//             className={`hover:text-blue-500 ${
//               activeSection === item.id ? "text-blue-500" : "" // if condition is true then permanent purple and if not then deafult "" which is purple
//             }`}>
//             <a
//               href={`#${item.id}`}
//               className="cursor-pointer"
//               onClick={() => handleMenuItemClick(item.id)}>
//               {item.label}
//             </a>
//           </li>
//         ))}
//       </ul>

//       <div className="hidden md:flex gap-6">
//         {/* <a href="https://www.linkedin.com/in/arinyadav/" target='_blank' rel='noopener noreferrer'>
//                             <FaLinkedin className='w-6 h-6 hover:text-blue-500' />
//                         </a>
//                         <a href="https://github.com/Arin-Yadav" target="_blank" rel="noopener noreferrer">
//                             <FaGithub className="w-6 h-6 text-white hover:text-gray-400" />
//                         </a> */}

//         <button className="cursor-pointer px-5 py-2 bg-blue-500 rounded-2xl hover:bg-blue-700">
//           Sign in
//         </button>
//       </div>

//       {/* mobile-view Toggle */}
//       <div className="md:hidden">
//         <button
//           onClick={toggleMenu}
//           className="text-white focus:outline-none cursor-pointer">
//           {isMenuOpen ? (
//             <FaTimes className="w-5 h-5" /> // Show Close icon
//           ) : (
//             <FaBars className="w-5 h-5" /> // Show Hamburger icon
//           )}
//         </button>

//         {/* Mobile menu items */}
//         <div>
//           {isMenuOpen && (
//             <div className="md:hidden absolute top-16 right-0 w-3/5 h-screen z-50 bg-gray-900/40 backdrop-blur-md border-l border-r border-b rounded-bl-2xl overflow-hidden border-gray-500">
//               <ul className="flex flex-col items-center p-4 text-white">
//                 {menuItems.map((item) => (
//                   <li
//                     key={item.id}
//                     className={`hover:text-white p-2 ${
//                       activeSection === item.id ? "text-[#8245ec]" : ""
//                     }`}>
//                     <a
//                       href={`#${item.id}`}
//                       className="cursor-pointer"
//                       onClick={() => {
//                         handleMenuItemClick(item.id);
//                       }}>
//                       {item.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
// import { Link } from "react-router-dom"
import { Link } from "react-scroll";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-700 text-white shadow-lg fixed w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 text-2xl font-bold cursor-pointer">
            🛡️ SafetyApp
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* {["Dashboard", "Contacts", "Logs", "Settings"].map((item, i) => ( */}
            {["Home", "Features", "About us"].map((item, i) => (
              <Link
                key={i}
                // to={`/${item.toLowerCase()}`}
                to={item.toLowerCase().replace(" ", "")}
                smooth={true} // enables smooth scroll
                duration={500} // scroll speed in ms
                offset={-70} // adjust for navbar height
                spy={true} // highlights active section
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition">
                {item}
              </Link>
            ))}
            <a
              href="/signin"
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition">
              Sign in
            </a>
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
          {["Dashboard", "Contacts", "Logs", "Settings"].map((item, i) => (
            <Link
              key={i}
              to={`/${item.toLowerCase()}`}
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition">
              {item}
            </Link>
          ))}
          <Link
            to="/signin"
            className="block bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition">
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
}
