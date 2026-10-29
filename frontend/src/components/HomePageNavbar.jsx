import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { RouteHomepageLayout } from "../helpers/RouteName";
// import { useSelector } from "react-redux";

const HomePageNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  // const user = useSelector((state) => state?.user?.user?.user);
  // const initials = user?.fullName
  //   ?.trim()
  //   ?.split(/\s+/)
  //   .map((part) => part[0])
  //   .join("")
  //   .slice(0, 2)
  //   .toUpperCase();

  return (
    <header className="fixed left-0 top-0 z-50 h-16 w-full border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={sidebarOpen}
            aria-controls="homepage-sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl cursor-pointer text-violet-800 transition hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 md:hidden">
            {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
          </button>

          <Link
            to={RouteHomepageLayout}
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-violet-800 sm:text-2xl">
            <span>Suraksha</span>
            <HiOutlineShieldCheck className="h-7 w-7" />
          </Link>
        </div>

        {/* <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-slate-500 sm:block">
            Your safety space
          </span>
          <span
            aria-label={user?.fullName ? `${user.fullName} profile` : "Profile"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-800">
            {initials || <HiOutlineShieldCheck className="h-5 w-5" />}
          </span>
        </div> */}
      </div>
    </header>
  );
};

export default HomePageNavbar;
