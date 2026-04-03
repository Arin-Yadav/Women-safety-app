import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  RouteFeatures,
  RouteIndex,
  RouteLogin,
  RoutePublicAbout,
} from "../helpers/RouteName";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", to: RouteIndex },
  { label: "Features", to: RouteFeatures },
  { label: "About", to: RoutePublicAbout },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to={RouteIndex} className="text-2xl font-semibold text-slate-900 dark:text-white">
          Suraksha
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to={RouteLogin}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            Login
          </Link>

        <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-sm font-medium text-slate-700 dark:text-slate-200 md:hidden"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-4">
            <ThemeToggle />
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-600 dark:text-slate-400"
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to={RouteLogin}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-slate-600 dark:text-slate-400"
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
