import axios from "axios";
import SafetyTips from "../components/SafetyTips";
import { Link, useNavigate } from "react-router-dom";
import { RouteChatLayout, RouteContacts, RouteDashboard, RouteHomepage, RouteIndex, RouteProfile } from "../helpers/RouteName";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const userName = user.user.fullName;
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-red-600">♀</span>
          <Link to={RouteHomepage}>
            Women Safety WebApp
          </Link>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-gray-600 text-2xl">
          {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
        </button>
      </nav>

      {/* Layout wrapper: navbar height reserved */}
      <div className="flex flex-1">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-16 left-0 md:h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] w-64 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out bg-white shadow-lg z-40 flex flex-col`}>
          {/* Sidebar content wrapper */}
          <div className="flex flex-col justify-between h-full">
            {/* Nav links (scrollable if too many) */}
            <nav className="flex flex-col p-3 space-y-2 text-gray-700 font-medium overflow-y-auto">
              <Link
                to={RouteDashboard}
                className="flex items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-blue-50 hover:text-red-600">
                Dashboard
              </Link>
              <Link
                to={RouteChatLayout}
                className="flex items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-blue-50 hover:text-red-600">
                Chat
              </Link>
              <Link
                to={RouteContacts}
                className="flex items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-blue-50 hover:text-red-600">
                Contacts
              </Link>
              <Link
                to={RouteProfile}
                className="flex items-center px-3 py-2 rounded-md bg-gray-100 hover:bg-blue-50 hover:text-red-600">
                Profile
              </Link>
            </nav>

            {/* Logout pinned at bottom */}
            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full block text-sm font-medium cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          {/* Welcome Section */}
          <section className="text-center mt-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome, {userName} 👋
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Your trusted contacts are ready to respond. Stay safe, stay
              confident.
            </p>
          </section>

          {/* SOS Button */}
          <section className="mt-12 flex flex-col items-center">
            <button
              onClick={() => window.alert("SOS Alert Sent")}
              className="bg-red-600 cursor-pointer text-white font-bold rounded-full w-48 h-48 shadow-2xl hover:bg-red-700 transition transform hover:scale-110 focus:ring-4 focus:ring-red-300">
              SOS
            </button>
            <p className="mt-4 text-gray-700 font-medium">
              Tap SOS to alert your contacts instantly
            </p>
          </section>

          {/* Quick Access Cards */}
          {/* <section className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Chat with your contacts
              </h3>
              <p className="text-gray-600 mb-4">
                Stay connected and share updates instantly.
              </p>
              <Link
                to={RouteChatLayout}
                className="block w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105">
                Chat
              </Link>
            </div>
          </section> */}

          {/* Safety Tips */}
          <div className="mt-20">
            <SafetyTips />
          </div>
        </main>
      </div>
    </div>
  );
}
