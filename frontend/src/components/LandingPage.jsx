// Note: Install framer-motion: npm install framer-motion
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RouteSignup } from "../helpers/RouteName";
import Navbar from "./Navbar";
const MotionLink = motion.create(Link);

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <main>
        <section
          id="home"
          className="flex flex-col items-center justify-center h-[calc(100vh-64px)] mt-16 text-center px-6 bg-linear-to-r from-pink-500 to-purple-600 text-white">
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
        <section id="features" className="bg-gray-50 py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-12">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full mb-6">
                  🔔
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Emergency Alerts
                </h3>
                <p className="text-gray-600">
                  Instantly notify trusted contacts and authorities during
                  emergencies with one tap.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full mb-6">
                  📍
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Live Location Sharing
                </h3>
                <p className="text-gray-600">
                  Share your real-time location with family and friends for
                  added safety and confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About us section  */}
        <section id="aboutus">
          <h2 className="text-4xl md:text-5xl text-center text-purple-600 mt-5 font-extrabold mb-6">
            About Us
          </h2>
          <div className="mx-auto text-center text-white bg-linear-to-r from-purple-600 to-pink-500 py-20">
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              We are dedicated to creating a safer world for women through
              technology. Our Women Safety WebApp empowers individuals with
              instant emergency alerts, live location tracking.
            </p>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-6">
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
