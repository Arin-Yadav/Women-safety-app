// Install: npm install framer-motion react-icons
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RouteSignup } from "../helpers/RouteName";
import Navbar from "./Navbar";
import Aboutus from "./Aboutus";
import KeyFeatures from "./KeyFeatures";
import Footer from "./Footer";

const MotionLink = motion.create(Link);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header>
        <Navbar />
      </header>

      <main>
        <section
          id="home"
          className="relative overflow-hidden flex items-center bg-linear-to-r from-pink-500 via-purple-600 to-indigo-700 text-white min-h-[calc(100vh-64px)] mt-16 py-10 md:py-16 px-6">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />

          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
                <span className="h-2 w-2 bg-green-300 rounded-full animate-pulse" />
                Always ready when you need help
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: -35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Your Safety,
                <br />
                <span className="text-pink-100">Our Priority.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 text-white/90">
                Instant alerts, live location tracking and emergency triggers -
                built to help women feel safer everywhere.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <MotionLink
                  to={RouteSignup}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-700 px-7 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">
                  Get Started
                </MotionLink>

                {/* <a
                  href="#features"
                  className="border border-white/40 px-7 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                  How it works
                </a> */}
              </motion.div>
            </div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-purple-600">
                    SOS Active
                  </span>
                  <span className="h-3 w-3 rounded-full bg-green-600 animate-ping" />
                </div>

                <h3 className="mt-4 text-2xl md:text-3xl text-green-600 font-bold">
                  You are safe.
                </h3>
                <p className="text-gray-800 mt-2">
                  Location shared with guardians
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6 cursor-pointer">
                  <div className="bg-purple-200 rounded-xl flex flex-col items-center p-4">
                    <p className="text-sm text-gray-900">Response</p>
                    <h4 className="text-xl sm:text-2xl font-bold text-purple-700">
                      3.2s
                    </h4>
                  </div>

                  <div className="bg-pink-200 rounded-xl p-2 sm:p-4 flex flex-col items-center justify-center cursor-pointer">
                    <p className="text-sm text-gray-900">Guardians</p>
                    <h4 className="text-xl sm:text-2xl font-bold text-pink-600">
                      4 Online
                    </h4>
                  </div>
                </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <KeyFeatures />

        {/* About Us */}
        <Aboutus />
      </main>

      <Footer>
        <Footer />
      </Footer>
    </div>
  );
}
