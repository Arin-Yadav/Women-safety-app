import { HiOutlineBellAlert } from "react-icons/hi2";
import { CiLocationOn, CiLock } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const KeyFeatures = () => {
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

  return (
    <section id="features" className="py-24 px-6 bg-purple-50 w-full  ">
      <div className="max-w-7xl md:px-10 mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-purple-600 font-bold">
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
              className="bg-white border border-gray-100 cursor-pointer shadow-lg rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl transition">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
