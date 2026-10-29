import { IoShieldCheckmarkOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="border-t border-slate-100 bg-white text-slate-700">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 xl:px-0 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="flex items-center gap-2 text-3xl font-bold text-violet-800 sm:text-4xl">
            Suraksha
            <IoShieldCheckmarkOutline />
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Stay connected to your trusted circle with location sharing,
            emergency alerts, and messaging in one place.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
            Explore
          </h3>
          <ul className="space-y-3 text-sm text-slate-500">
            <li>
              <a href="#home" className="transition hover:text-violet-700">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="transition hover:text-violet-700">
                Features
              </a>
            </li>
            <li>
              <a href="#aboutus" className="transition hover:text-violet-700">
                About Suraksha
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
            Tools for your circle
          </h3>
          <ul className="space-y-3 text-sm text-slate-500">
            <li>Emergency Alerts</li>
            <li>Live Location Sharing</li>
            <li>Group Messaging</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-5 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Suraksha. Your safety and wellbeing matter.</p>
      </div>
    </footer>
  );
};

export default Footer;
