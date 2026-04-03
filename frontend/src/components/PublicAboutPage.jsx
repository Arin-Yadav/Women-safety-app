export default function PublicAboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        About
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
        A more practical women safety app
      </h1>
      <div className="mt-10 space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
        <p>
          Suraksha is built to make emergency support easier to reach and easier
          to use. The goal is not flashy design. The goal is clarity under
          stress.
        </p>
        <p>
          The app combines location sharing, communication, and profile details
          into a simple workspace so a user can move quickly when it matters.
        </p>
        <p>
          This project aims to support confidence, preparedness, and faster
          coordination with trusted contacts.
        </p>
      </div>
    </div>
  );
}
