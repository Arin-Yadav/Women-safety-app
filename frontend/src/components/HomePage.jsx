import axios from "axios";
import SafetyTips from "../components/SafetyTips";
import { Link, useNavigate } from "react-router-dom";
import {
  RouteChatLayout,
  RouteHomepage,
  RouteIndex,
  RouteProfile,
} from "../helpers/RouteName";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  const userName = user?.user?.fullName;
  const userId = user?.user?.id;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔊 Alarm Ref
  const alarmRef = useRef(null);

  // 📞 Fake Call Ref
  const ringtoneRef = useRef(null);

  // 🔊 Start Alarm
  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.loop = true;
      alarmRef.current.play();
    }
  };

  // ⛔ Stop Alarm
  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  // 📞 Start Fake Call
  const startFakeCall = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.loop = true;
      ringtoneRef.current.play();
    }
  };

  // ⛔ Stop Fake Call
  const stopFakeCall = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  };

  // 🚨 SOS Feature
  const handleSOS = () => {
    playAlarm();

    navigator.geolocation.getCurrentPosition((position) => {
      const locationMessage = {
        type: "location",
        userId: userId,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: new Date().toISOString(),
      };

      fetch(`${import.meta.env.VITE_API_URL}/sos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: `${import.meta.env.VITE_ROOM_ID}`,
          message: locationMessage,
        }),
      });
    });
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      navigate(RouteIndex);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md px-6 py-4 h-16 flex justify-between items-center sticky top-0 z-50">
        <Link to={RouteHomepage} className="font-bold text-2xl">
          🛡️ Suraksha
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-2xl"
        >
          {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
        </button>
      </nav>

      <div className="flex flex-1">
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition bg-white shadow-lg z-40 flex flex-col`}
        >
          <h1 className="text-xl font-bold p-3 text-blue-600">
            Quick Links
          </h1>

          <div className="flex flex-col p-3 space-y-2">
            <Link
              to={RouteChatLayout}
              className="px-3 py-2 rounded bg-gray-100 hover:bg-blue-50"
            >
              Chat
            </Link>
            <Link
              to={RouteProfile}
              className="px-3 py-2 rounded bg-gray-100 hover:bg-blue-50"
            >
              Profile
            </Link>
          </div>

          <div className="p-4 border-t mt-auto">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-12">
          {/* Welcome */}
          <section className="text-center mt-6">
            <h2 className="text-3xl font-bold">
              Welcome, {userName} 👋
            </h2>
          </section>

          {/* 🚨 SOS */}
          <section className="mt-12 flex flex-col items-center">
            <button
              onClick={handleSOS}
              className="bg-red-600 text-white font-bold rounded-full w-48 h-48 shadow-2xl hover:bg-red-700 transition transform hover:scale-110"
            >
              SOS
            </button>
            <p className="mt-4 text-gray-600">
              Tap SOS to alert contacts instantly
            </p>
          </section>

          {/* 🔊 Alarm Section */}
          <section className="mt-12 w-full max-w-2xl mx-auto">
            <div className="bg-white shadow-xl rounded-2xl p-6 text-center border">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                🚨 Emergency Sound Tools
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Tap to quickly attract attention in unsafe situations
              </p>

              {/* Audio */}
              <audio ref={alarmRef} src="/alarm.mp3" />
              <audio ref={ringtoneRef} src="/ringtone.mp3" />

              {/* Siren */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  🔊 Police Siren
                </h4>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={playAlarm}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Start
                  </button>

                  <button
                    onClick={stopAlarm}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Stop
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t my-4"></div>

              {/* Fake Call */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">
                  📞 Fake Call Sound
                </h4>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={startFakeCall}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Start
                  </button>

                  <button
                    onClick={stopFakeCall}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Stop
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Tips */}
          <div className="mt-20">
            <SafetyTips />
          </div>
        </main>
      </div>
    </div>
  );
}