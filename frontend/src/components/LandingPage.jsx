import {
  HiArrowRight,
  HiOutlineBellAlert,
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { RouteSignup } from "../helpers/RouteName";
import Navbar from "./Navbar";
import Aboutus from "./Aboutus";
import KeyFeatures from "./KeyFeatures";
import Footer from "./Footer";

const steps = [
  {
    number: "01",
    title: "Build your trusted circle",
    description:
      "Bring the people you rely on into one place, so support is easier to reach when you need it.",
    icon: <HiOutlineUserGroup className="h-6 w-6" />,
  },
  {
    number: "02",
    title: "Stay connected on the go",
    description:
      "Share your location with your circle and keep in touch through in-app messaging.",
    icon: <HiOutlineMapPin className="h-6 w-6" />,
  },
  {
    number: "03",
    title: "Send an SOS when it matters",
    description:
      "Use the emergency alert to notify your trusted contacts and share your location.",
    icon: <HiOutlineBellAlert className="h-6 w-6" />,
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header>
        <Navbar />
      </header>

      <main>
        <section
          id="home"
          className="relative isolate overflow-hidden bg-[#fffaf8] px-6 pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
          <div className="pointer-events-none absolute -left-40 top-12 -z-10 h-96 w-96 rounded-full bg-rose-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-violet-100/70 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm">
                <HiOutlineShieldCheck className="h-5 w-5" />A little more
                confidence, wherever you go
              </div>

              <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Safety feels stronger
                <br className="hidden sm:block" />
                <span className="text-violet-700 pl-2 md:pl-0">when we stay connected.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
                Suraksha helps you stay close to the people you trust with SOS
                alerts, location sharing, and group conversations - all together
                in one place.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  to={RouteSignup}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700">
                  Create your account
                  <HiArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700">
                  Explore features
                </a>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Your trusted people, one tap away.
              </p>
            </div>

            {/* Right Div */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -left-5 top-14 hidden h-24 w-24 rounded-4xl bg-rose-200/70 sm:block" />
              <div className="absolute -right-5 bottom-12 hidden h-28 w-28 rounded-full bg-violet-200/80 sm:block" />

              <div className="relative rounded-4xl border border-white bg-white p-3 shadow-[0_28px_80px_-28px_rgba(70,49,115,0.28)] sm:p-5">
                <div className="rounded-3xl bg-[#fbf9ff] p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                        <HiOutlineShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          Your safety circle
                        </p>
                        <p className="text-sm text-slate-500">
                          Stay close to your people
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Your circle
                    </span>
                  </div>

                  <div className="relative mt-6 flex h-52 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-violet-100 bg-[radial-gradient(ellipse_at_20%_20%,#fff_0%,#f3edff_62%,#ede7fa_100%)] sm:h-60">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 420 240"
                      className="absolute inset-0 h-full w-full">
                      <path
                        d="M-20 177 C52 145 79 208 145 173 S225 89 291 127 363 174 442 102"
                        fill="none"
                        stroke="#d8c8f4"
                        strokeWidth="17"
                        strokeLinecap="round"
                      />
                      <path
                        d="M-20 177 C52 145 79 208 145 173 S225 89 291 127 363 174 442 102"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeDasharray="8 10"
                        strokeLinecap="round"
                      />
                      <path
                        d="M73 15v55m0 100v55M176 5v38m0 144v48M355 2v53m0 122v59M15 90h70m162 0h62M20 222h60m238-173h90"
                        stroke="#e6def2"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-violet-700 text-white shadow-xl shadow-violet-300/70">
                      <HiOutlineMapPin className="h-8 w-8" />
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-xl border border-white/80 bg-white/95 px-3 py-2 shadow-lg">
                      <p className="text-xs font-semibold text-slate-800">
                        Location sharing
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        With your trusted circle
                      </p>
                    </div>
                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-rose-100 text-rose-600 shadow-md">
                      <HiOutlineUserGroup className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 rounded-2xl cursor-pointer border border-slate-100 bg-white p-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                        <HiOutlineBellAlert className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">
                          SOS alerts
                        </span>
                        <span className="block text-xs text-slate-500">
                          Reach your circle
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl cursor-pointer border border-slate-100 bg-white p-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                        <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">
                          Group chat
                        </span>
                        <span className="block text-xs text-slate-500">
                          Keep in touch
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <KeyFeatures />

        {/* Steps */}
        <section className="bg-white px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              {/* <p className="text-3xl md:text-3xl font-bold uppercase tracking-[0.12em] text-rose-600">
                Support, made simple
              </p> */}
              <p className="text-3xl md:text-4xl font-bold w-full uppercase tracking-[0.12em] text-violet-700">
                Support, made simple
              </p>
              <h2 className="mt-3 text-sm md:text-base font-semibold tracking-tight text-slate-950 sm:text-4xl">
                A few thoughtful tools. One stronger circle.
              </h2>
              {/* <p className="mt-4 leading-7 text-slate-600">
                Get started by connecting with the people who matter to you.
                Suraksha brings the essentials together for everyday peace of
                mind.
              </p> */}
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-3xl border border-slate-100 bg-[#fffdfc] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/70">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                      {step.icon}
                    </span>
                    <span className="text-sm font-bold tracking-widest text-slate-300">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-6 text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Aboutus />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
