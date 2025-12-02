import React from "react";

const tips = [
  {
    id: 1,
    title: "Stay Alert",
    description: "Always be aware of your surroundings, especially in unfamiliar areas.",
    icon: "👀",
  },
  {
    id: 2,
    title: "Share Location",
    description: "Keep your trusted contacts updated with your live location when traveling.",
    icon: "📍",
  },
  {
    id: 3,
    title: "Emergency Contacts",
    description: "Add and update emergency contacts regularly for quick access.",
    icon: "📞",
  },
  {
    id: 4,
    title: "Trust Your Instincts",
    description: "If something feels wrong, act immediately and use the SOS button.",
    icon: "⚡",
  },
];

export default function SafetyTips() {
  return (
    <section className="bg-white shadow-md rounded-lg p-6 mt-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Safety Tips
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg hover:shadow-lg transition"
          >
            <span className="text-3xl">{tip.icon}</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{tip.title}</h3>
              <p className="text-gray-600 mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
