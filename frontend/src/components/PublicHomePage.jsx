import { Link } from "react-router-dom";
import { RouteFeatures, RouteSignup } from "../helpers/RouteName";
import heroImage from "../assets/images/women-safety-bg-image.webp";

export default function PublicHomePage() {
  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Women Safety Platform
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight text-slate-900 dark:text-white">
            Safety support with a clearer structure.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Suraksha helps you reach trusted people quickly, share location during
            emergencies, and stay connected through a simpler interface.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to={RouteSignup}
              className="rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Create account
            </Link>
            <Link
              to={RouteFeatures}
              className="rounded-md border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              View features
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <img
            src={heroImage}
            alt="Women safety illustration"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
}
