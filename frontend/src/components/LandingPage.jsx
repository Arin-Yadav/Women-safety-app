// import React from "react";

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen w-full bg-gray-900 text-white mt-16 px-5">
//       {/* <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] gap-5 py-10"> */}
//       <div className="flex flex-col md:flex-row min-h-screen gap-5 py-10">
//         <div className="w-full md:w-1/2 min-h-full flex items-center justify-center">
//           <img
//             className="rounded-4xl bg-amber-600"
//             src="https://plus.unsplash.com/premium_photo-1682310105362-76fa03431d65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZW1lcmdlbmN5JTIwYWxlcnR8ZW58MHx8MHx8fDA%3D"
//             alt="alert_logo"
//           />
//         </div>

//         <div className="w-full md:w-1/2 min-h-full p-5 space-y-7 flex flex-col items-center justify-center">
//           <h1 className="text-center text-blue-500 text-3xl md:text-5xl font-bold">
//             Your Safety, Our Priority
//           </h1>
//           <p className="font-bold text-xl">
//             Safety Guardian is your personal safety companion, providing instant
//             emergency alerts, real-time loction tracking and quick access to
//             your emergency contacts.
//           </p>
//           <div className="w-full text-center">
//             <button className="bg-blue-500 px-7 py-4 text-xl rounded-4xl hover:bg-blue-700 cursor-pointer">
//               Get started now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

// Note: Install framer-motion: npm install framer-motion
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const MotionLink = motion.create(Link);

export default function LandingPage() {
  return (
    
    <div className="min-h-screen bg-linear-to-r from-pink-500 to-purple-600 text-white">
      <Navbar />
      {/* Hero Section */}
      <header id="home" className="flex flex-col items-center justify-center h-screen text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4">
          Your Safety, Our Priority
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg mb-6">
          Instant alerts, live location tracking, and emergency triggers at your
          fingertips.
        </motion.p>

        {/* <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
          <Link to="/signup">Get Started</Link>
        </motion.div>                   *this element can be written as (see below) */} 
        <MotionLink
          to="/signup"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
          Get Started
        </MotionLink>
      </header>

      {/* Features Section */}
      {/* <section className="bg-white text-gray-800 py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            "🚨 Emergency Alerts",
            "📍 Location Tracking",
            "🎤 Voice Trigger",
            "📱 Shake Detection",
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-6 shadow-lg rounded-lg hover:scale-105 transition-transform duration-300">
              <span className="text-4xl">{feature.split(" ")[0]}</span>
              <h3 className="font-semibold mt-4">
                {feature.split(" ").slice(1).join(" ")}
              </h3>
              <p className="text-sm mt-2">
                Smooth animation makes this feature pop ✨
              </p>
            </motion.div>
          ))}
        </div>
      </section> */}

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
                Share your real-time location with family and friends for added
                safety and confidence.
              </p>
            </div>

            {/* Feature 3 */}
            {/* <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full mb-6">
                🎤
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Voice Activation
              </h3>
              <p className="text-gray-600">
                Trigger safety alerts hands-free using simple voice commands in
                urgent situations.
              </p>
            </div> */}

            {/* Feature 4 */}
            {/* <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition duration-300 cursor-pointer">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full mb-6">
                📱
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Shake Detection
              </h3>
              <p className="text-gray-600">
                Activate emergency alerts by shaking your phone — quick, easy,
                and reliable.
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* About us section  */}
      <section id="aboutus" className="relative bg-linear-to-r from-purple-600 to-pink-500 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">About Us</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            We are dedicated to creating a safer world for women through
            technology. Our Women Safety WebApp empowers individuals with
            instant emergency alerts, live location tracking.
          </p>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-6">
            Beyond safety, our vision is to foster awareness, build supportive
            communities, and promote equality. This project is more than just an
            app — it’s a movement toward security, confidence, and empowerment
            for women everywhere.
          </p>
        </div>

        {/* Decorative accent */}
        <div className="absolute inset-x-0 bottom-0 h-2 bg-white/20"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
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
