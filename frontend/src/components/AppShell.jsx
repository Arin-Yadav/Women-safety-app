import { useState } from "react";
import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  RouteChatLayout,
  RouteHomepage,
  RouteIndex,
  RouteProfile,
} from "../helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/userSlice";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", to: RouteHomepage },
  { label: "Chat", to: RouteChatLayout },
  { label: "Profile", to: RouteProfile },
];

export default function AppShell() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state) => state.user?.user?.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      dispatch(removeUser());
      navigate(RouteIndex);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="text-sm font-medium text-slate-700 dark:text-slate-200 lg:hidden"
            >
              {sidebarOpen ? "Close" : "Menu"}
            </button>
            <div>
              <p className="text-2xl font-semibold">Suraksha</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Safety workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-right">
              <p className="text-sm font-medium">{user?.fullName || "User"}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-slate-900/20 lg:hidden"
        />
      )}

      <div className="flex-1 px-6 py-8 lg:px-10">
        <div className="gap-12 lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside
            className={`${
              sidebarOpen ? "block" : "hidden"
            } fixed left-6 right-6 top-24 z-30 border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:static lg:block lg:border-r lg:border-t-0 lg:border-l-0 lg:border-b-0 lg:p-0 lg:pr-10 lg:shadow-none`}
          >
            <div className="mb-8 hidden lg:block">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Navigation
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                Workspace
              </p>
            </div>

            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-0 py-1 text-sm font-medium transition ${
                      isActive
                        ? "text-slate-900 underline underline-offset-8 dark:text-white"
                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="mt-6 w-fit text-sm font-medium text-rose-600 hover:text-rose-700"
              >
                Logout
              </button>
            </nav>
          </aside>

          <div className="min-w-0 lg:pr-6">
            <Outlet />
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-200 px-6 py-5 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Suraksha workspace
      </footer>
    </div>
  );
}
