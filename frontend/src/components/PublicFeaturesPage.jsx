export default function PublicFeaturesPage() {
  const features = [
    {
      title: "Emergency SOS",
      description:
        "Share urgent alerts quickly when you need immediate attention.",
    },
    {
      title: "Live Location",
      description:
        "Send your location during emergencies so trusted people can respond faster.",
    },
    {
      title: "Trusted Group Chat",
      description:
        "Coordinate with your support circle through simple conversation rooms.",
    },
    {
      title: "Profile Details",
      description:
        "Keep key personal information ready and organized in one place.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        Features
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
        Built around the actions that matter most
      </h1>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="border-b border-slate-200 pb-8 dark:border-slate-800">
            <h2 className="text-2xl font-medium text-slate-900 dark:text-white">
              {feature.title}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
