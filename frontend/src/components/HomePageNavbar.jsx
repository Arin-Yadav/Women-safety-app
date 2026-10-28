import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { RouteHomepageLayout } from "../helpers/RouteName";
// import { RouteHomepage } from "../helpers/RouteName";

const HomePageNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-16 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="h-full px-5 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-2xl text-purple-700">
            {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
          </button>

          <Link
            to={RouteHomepageLayout}
            className="flex items-center text-2xl font-bold text-purple-700">
            <span>🛡️</span>
            <span>Suraksha</span>
          </Link>
        </div>

        {/* <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                {userName || "User"}
              </p>
            </div>

            <div className="h-10 w-10 rounded-full bg-purple-100 cursor-pointer text-purple-700 flex items-center justify-center font-bold">
              {userName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default HomePageNavbar;
