const tips = [
  {
    id: 1,
    title: "Plan your route",
    description:
      "Know where you are going and identify a public place you can reach if plans change.",
    icon: "01",
  },
  {
    id: 2,
    title: "Check in with someone you trust",
    description:
      "Agree on a check-in time and let them know if your plans or arrival time change.",
    icon: "02",
  },
  {
    id: 3,
    title: "Review location sharing",
    description:
      "Only share your location with people you trust, and turn sharing off when it is no longer needed.",
    icon: "03",
  },
  {
    id: 4,
    title: "Keep your phone ready",
    description:
      "Charge your phone when possible and keep local emergency numbers easy to find.",
    icon: "04",
  },
];

export default function SafetyTips() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 cursor-pointer">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 transition hover:bg-violet-50 sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold tracking-wider text-violet-700 shadow-sm">
              {tip.icon}
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                {tip.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
