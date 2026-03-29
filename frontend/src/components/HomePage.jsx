import axios from "axios";
import SafetyTips from "../components/SafetyTips";
import { Link, useNavigate } from "react-router-dom";
import { RouteChatLayout, RouteIndex } from "../helpers/RouteName";

export default function HomePage() {
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Scrolling Banner */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap font-semibold text-lg">
          <span className="mx-8">Women Helpline (India): 1091</span>
          <span className="mx-8">Police Emergency: 100</span>
          <span className="mx-8">National Domestic Violence Helpline: 181</span>
          <span className="mx-8">Child Helpline: 1098</span>
          <span className="mx-8">Emergency Ambulance: 108</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-red-600">Women Safety WebApp</h1>
        <button className="md:hidden text-gray-600">☰</button>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-red-600 cursor-pointer">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="hover:text-red-600 cursor-pointer">Contacts</li>
          <li className="hover:text-red-600 cursor-pointer">Settings</li>
          <li className="hover:text-red-600 cursor-pointer">
            <button onClick={handleLogout} className="cursor-pointer">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="grow">
        <section className="flex flex-col items-center text-center mt-12 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome 👋
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl">
            Your trusted contacts are ready to respond. Stay safe, stay
            confident.
          </p>
        </section>

        {/* SOS Button */}
        <section>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                window.alert("SOS Alert Sent ");
              }}
              className="bg-red-600 cursor-pointer text-white font-bold rounded-full w-48 h-48 shadow-xl hover:bg-red-700 transition transform hover:scale-105">
              SOS
            </button>
          </div>
          <p className="text-center mt-4 text-gray-700">
            Tap SOS to alert your contacts instantly
          </p>
        </section>

        {/* Quick Access Cards */}
        <section className="grid md:grid-cols-3 gap-6 mt-16 px-6 w-full max-w-6xl mx-auto">
          {/* Chat system  */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <p className="text-gray-600 mb-2">Chat with your contacts.</p>
            <button className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-lg transition duration-300 transform hover:-translate-y-0.5 hover:shadow-xl text-sm sm:text-base">
              <Link
              to={RouteChatLayout}
              >Chat</Link>
            </button>
          </div>
        </section>

        {/* Safety Tips */}
        <SafetyTips />
      </main>

      {/* Footer (Sticky at Bottom) */}
      <footer className="w-full bg-gray-200 p-6 text-center text-gray-700 mt-auto">
        <p>© 2025 Women Safety WebApp | Privacy Policy | Terms</p>
        <div className="flex justify-center space-x-6 mt-3">
          <span className="cursor-pointer hover:text-red-600">🌐</span>
          <span className="cursor-pointer hover:text-red-600">📘</span>
          <span className="cursor-pointer hover:text-red-600">🐦</span>
        </div>
      </footer>
    </div>
  );
}
