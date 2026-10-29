import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiArrowRightOnRectangle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineHome,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import {
  RouteChatLayout,
  RouteHomepageLayout,
  RouteIndex,
  RouteProfile,
} from "../helpers/RouteName";

const HomePageSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    setLogoutError("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true },
      );
      navigate(RouteIndex);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      setLogoutError("Could not log out. Please try again.");
    }
  };

  const navItems = [
    {
      label: "Overview",
      to: RouteHomepageLayout,
      icon: <HiOutlineHome className="h-5 w-5" />,
    },
    {
      label: "Messages",
      to: RouteChatLayout,
      icon: <HiOutlineChatBubbleLeftRight className="h-5 w-5" />,
    },
    {
      label: "My profile",
      to: RouteProfile,
      icon: <HiOutlineUserCircle className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      id="homepage-sidebar"
      aria-label="Main navigation"
      className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-[min(18rem,85vw)] flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-xl transition-transform duration-300 md:sticky md:w-64 md:shrink-0 md:translate-x-0 md:shadow-none ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      {/* <div className="mb-6 rounded-2xl bg-linear-to-br from-violet-50 to-rose-50 p-4">
        <p className="text-sm font-bold text-slate-900">Your support circle</p>
        <p className="mt-1 text-xs leading-5 text-slate-600">
          Keep your trusted people and safety tools close at hand.
        </p>
      </div> */}

      <nav className="flex flex-col gap-1.5">
        {navItems.map(({ label, to, icon }) => {
          const isActive =
            to === RouteHomepageLayout
              ? location.pathname === RouteHomepageLayout
              : location.pathname === to ||
                location.pathname.startsWith(`${to}/`);

          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-violet-100 text-violet-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-violet-800"
              }`}>
              {icon}
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-4">
        {logoutError && (
          <p role="alert" className="mb-3 text-center text-sm text-rose-700">
            {logoutError}
          </p>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-11 w-full items-center justify-center gap-2 cursor-pointer rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-200 hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">
          <HiArrowRightOnRectangle className="h-5 w-5" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default HomePageSidebar;
