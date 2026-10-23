// Install: npm install framer-motion react-icons
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { RouteSignup } from "../helpers/RouteName";

import { HiOutlineBellAlert } from "react-icons/hi2";
import { CiLocationOn, CiLock } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";

const MotionLink = motion(Link);

const features = [
  {
    title: "Emergency Alerts",
    desc: "One tap notifies trusted contacts with your live location during emergencies.",
    icon: <HiOutlineBellAlert className="h-8 w-8" />,
  },
  {
    title: "Live Location",
    desc: "Share your real-time location with family and guardians for added safety.",
    icon: <CiLocationOn className="h-8 w-8" />,
  },
  {
    title: "Chat Support",
    desc: "Stay connected with your loved ones through secure chat support.",
    icon: <IoChatbubbleOutline className="h-8 w-8" />,
  },
  {
    title: "Privacy First",
    desc: "Your data stays protected and is never shared without your consent.",
    icon: <CiLock className="h-8 w-8" />,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header>
        <Navbar />
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white pt-32 pb-24 px-6"
        >
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-300/20 blur-3xl" />

          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm mb-6"
              >
                <span className="h-2 w-2 bg-green-300 rounded-full animate-pulse" />
                Always ready when you need help
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: -35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight"
              >
                Your Safety,
                <br />
                <span className="text-pink-100">Our Priority.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 text-white/90"
              >
                Instant alerts, live location tracking, emergency triggers, and
                trusted contacts — built to help women feel safer everywhere.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <MotionLink
                  to={RouteSignup}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-700 px-7 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
                >
                  Get Started
                </MotionLink>

                <a
                  href="#features"
                  className="border border-white/40 px-7 py-3 rounded-full font-semibold hover:bg-white/10 transition"
                >
                  How it works
                </a>
              </motion.div>
            </div>

            {/* RIGHT CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
            >
              <div className="bg-white text-gray-900 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-purple-600">
                    SOS Active
                  </span>
                  <span className="h-3 w-3 rounded-full bg-red-500 animate-ping" />
                </div>

                <h3 className="mt-8 text-3xl font-bold">Priya is safe.</h3>
                <p className="text-gray-500 mt-2">
                  Location shared with 4 guardians
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Response</p>
                    <h4 className="text-2xl font-bold text-purple-700">3.2s</h4>
                  </div>

                  <div className="bg-pink-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Guardians</p>
                    <h4 className="text-2xl font-bold text-pink-600">4 Online</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-gray-50 py-10 border-b">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold text-purple-700">24/7</h3>
              <p className="text-gray-500 text-sm">Support</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-700">One Tap</h3>
              <p className="text-gray-500 text-sm">SOS Alert</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-700">Live</h3>
              <p className="text-gray-500 text-sm">Location Share</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-700">Secure</h3>
              <p className="text-gray-500 text-sm">User Data</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-purple-600 font-semibold mb-3">Features</p>
              <h2 className="text-4xl md:text-5xl font-bold">
                Key Features
              </h2>
              <p className="mt-4 text-gray-500">
                Everything needed for quick action, communication, and safety.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-100 shadow-lg rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl transition"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="aboutus" className="py-24 px-6 bg-purple-50">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-purple-600 font-semibold mb-3">About Us</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                A movement toward safety, confidence, and empowerment.
              </h2>
            </div>

            <div className="text-gray-600 text-lg leading-relaxed space-y-6">
              <p>
                We are dedicated to creating a safer world for women through
                technology. Our Women Safety WebApp empowers users with instant
                emergency alerts, live location tracking, and trusted contact
                support.
              </p>
              <p>
                Beyond safety, our vision is to foster awareness, build
                supportive communities, and promote equality. This project is
                more than just an app — it is a movement toward security,
                confidence, and empowerment for women everywhere.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-pink-500 to-purple-700 rounded-3xl p-10 md:p-16 text-white text-center shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold">
              Carry a guardian in your pocket.
            </h2>
            <p className="mt-4 text-white/90 text-lg">
              Start using the Women Safety App and stay connected with your
              trusted contacts.
            </p>

            <Link
              to={RouteSignup}
              className="mt-8 inline-block bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Get Started — Free
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-950 text-white">
  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
    <div className="md:col-span-2">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        🛡️ Suraksha
      </h2>
      <p className="mt-4 text-gray-400 max-w-md">
        A women safety platform built to provide instant alerts, live location
        sharing, trusted contact support, and secure communication during
        emergencies.
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
        <li>Privacy Protection</li>
      </ul>
    </div>
  </div>

  <div className="border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
      <p>© 2026 Suraksha. All rights reserved.</p>
      <p>Built for safety, confidence, and empowerment.</p>
    </div>
  </div>
</footer>
    </div>
  );
}