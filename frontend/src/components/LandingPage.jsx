// Note: Install framer-motion: npm install framer-motion
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RouteSignup } from "../helpers/RouteName";
import Navbar from "./Navbar";
const MotionLink = motion.create(Link);
import { CiLock } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <main className="bg-linear-to-r from-pink-500 to-purple-600 text-white">
        <section
          id="home"
          className="flex flex-col items-center justify-center h-[calc(100vh-64px)] mt-16 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl font-extrabold mb-4">
            Your Safety, Our Priority
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base sm:text-lg mb-6 max-w-md">
            Instant alerts, live location tracking, and emergency triggers at
            your fingertips.
          </motion.p>

          <MotionLink
            to={RouteSignup}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
            Get Started
          </MotionLink>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6">
          <h2 className="text-4xl md:text-5xl text-center font-bold mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl lg:max-w-7xl mx-auto gap-4 p-2">
            {/* Feature 1 */}
            <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer feature-card">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-6">
                <HiOutlineBellAlert className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Emergency Alerts
              </h3>
              <p className="text-gray-500">
                Instantly notify trusted contacts and authorities during
                emergencies with one tap.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer feature-card">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600  rounded-full mb-6">
                <CiLocationOn className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Live Location Sharing
              </h3>
              <p className=" text-gray-500">
                Share your real-time location with family and friends for added
                safety and confidence.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer feature-card">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-6">
                <IoChatbubbleOutline className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Chat support
              </h3>
              <p className=" text-gray-500">
                Chat with your love ones with end-to-end encryption.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer feature-card">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-6">
                <HiOutlineBellAlert className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Privacy First
              </h3>
              <p className=" text-gray-500">
                Your data is encrypted and never shared without consent.
              </p>
            </div>
          </div>
        </section>

        {/* About us section  */}
        <section
          id="aboutus"
          className="mt-16 flex flex-col items-center w-full">
          <h2 className="text-4xl md:text-5xl text-center font-bold">
            About Us
          </h2>
          <div className="text-center py-10 px-6">
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl ">
              We are dedicated to creating a safer world for women through
              technology. Our Women Safety WebApp empowers individuals with
              instant emergency alerts, live location tracking.
            </p>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mt-6">
              Beyond safety, our vision is to foster awareness, build supportive
              communities, and promote equality. This project is more than just
              an app — it's a movement toward security, confidence, and
              empowerment for women everywhere.
            </p>
          </div>

          {/* Decorative accent */}
          {/* <div className="absolute inset-x-0 bottom-0 h-2 bg-white/20"></div> */}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-purple-700 text-white py-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          © 2025 Women Safety App. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}
