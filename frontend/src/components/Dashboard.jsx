export default function Dashboard() {
  const items = [
    "Use Home for quick SOS access.",
    "Use Chat to coordinate with trusted contacts.",
    "Use Profile to keep your information current.",
    "Use the public site pages to review the platform overview and feature explanation.",
  ];

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Overview
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
          Clear overview, no clutter
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          This area keeps the workspace simple. Use the navigation on the left
          to move through the app without stacked cards and extra distractions.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item} className="border-b border-slate-200 pb-4 text-slate-700 dark:border-slate-800 dark:text-slate-300">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
