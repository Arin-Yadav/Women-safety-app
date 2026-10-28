import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoChatbubbleOutline, IoHome, IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import {
  RouteChatLayout,
  RouteHomepageLayout,
  RouteIndex,
  RouteProfile,
} from "../helpers/RouteName";

const HomePageSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true },
      );
      navigate(RouteIndex);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <aside
      className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white border-r border-gray-200 shadow-lg md:shadow-none z-40 transform transition-transform duration-300 flex flex-col ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}>
      {/* <div className="p-5 border-b">
            <h2 className="text-lg font-bold text-gray-800">Quick Links</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your safety tools
            </p>
          </div> */}

      <div className="flex flex-col p-4 gap-3">
        <Link
          to={RouteHomepageLayout}
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-700 hover:bg-purple-100 transition">
          <IoHomeOutline className="text-xl" />
          Home
        </Link>

        <Link
          to={RouteChatLayout}
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-700 hover:bg-purple-100 transition">
          <IoChatbubbleOutline className="text-xl" />
          Chat
        </Link>

        <Link
          to={RouteProfile}
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-700 hover:bg-purple-100 transition">
          <CiUser className="text-xl" />
          Profile
        </Link>
      </div>

      {/* <div className="mx-4 mt-4 rounded-2xl bg-linear-to-r from-pink-500 to-purple-700 p-5 text-white">
            <HiOutlineBellAlert className="text-3xl mb-3" />
            <h3 className="font-bold text-lg">Stay Alert</h3>
            <p className="text-sm text-white/80 mt-1">
              Use SOS only during real emergency situations.
            </p>
          </div> */}

      <div className="p-4 border-t border-gray-300 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center cursor-pointer gap-2 bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition">
          <IoLogOutOutline className="text-xl" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default HomePageSidebar;
