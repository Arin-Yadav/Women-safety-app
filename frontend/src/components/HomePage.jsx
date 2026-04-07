// New Homepage testing
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  // const userName = user?.user?.fullName;
  const userId = user?.user?.id;

  // all rooms
  const rooms = useSelector((state) => state?.room?.rooms);
  // console.log(rooms);

  // private rooms
  const privateRooms = rooms.filter((room) => room.roomType === "private");
  // console.log(privateRooms)

  // last created room by user
  // const currentRoomId = useSelector((state) => state?.room?.currentRoomId);
  // console.log(currentRoomId);

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
    if (privateRooms.length === 0) {
      alert("No private rooms available for SOS");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const locationMessage = {
        type: "location",
        userId: userId,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: new Date().toISOString(),
      };

      try {
        // ✅ Loop through all private rooms
        for (const room of privateRooms) {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/sos`,
            {
              roomId: room._id, // send to each private room
              message: locationMessage,
            },
            { withCredentials: true },
          );
        }
        window.alert("🚨 SOS sent successfully!");
      } catch (error) {
        console.error("SOS Error:", error);
      }
    });
  };

  // Logout
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
      <nav className="w-full bg-white shadow-md px-6 py-4 h-16 flex justify-between items-center sticky top-0 z-50">
        <Link
          to={RouteHomepage}
          className="font-bold text-2xl text-blue-700 flex items-center gap-2">
          🛡️ Suraksha
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-2xl cursor-pointer">
          {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
        </button>
      </nav>

      <div className="flex flex-1">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 bg-white shadow-lg z-40 flex flex-col`}>
          <h1 className="text-xl font-bold p-3 text-blue-600">Quick Links</h1>

          <div className="flex flex-col p-3 space-y-2">
            <Link
              to={RouteChatLayout}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50">
              💬 Chat Room
            </Link>
            <Link
              to={RouteProfile}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50">
              👤 Profile
            </Link>
            <Link
              to="/safezones"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50">
              🗺️ Safe Zones
            </Link>
            <Link
              to="/awareness"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50">
              📚 Awareness
            </Link>
            <Link
              to="/report"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50">
              📝 Report Unsafe Area
            </Link>
          </div>

          <div className="p-4 border-t mt-auto">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer">
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-12">
          {/* SOS Section */}
          <section className="flex flex-col items-center text-center">
            <p className="mb-4 font-bold text-gray-600 flex items-center gap-2">
              Tap SOS to alert contacts instantly.
            </p>
            <button
              onClick={handleSOS}
              className="bg-red-600 text-white text-2xl font-bold rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 shadow-md hover:bg-red-700 transition-transform hover:scale-110 cursor-pointer">
              SOS
            </button>
          </section>

          {/* Audio */}
          <audio ref={alarmRef} src="/alarm.mp3" />
          <audio ref={ringtoneRef} src="/ringtone.mp3" />

          {/* Alarm Section */}
          <section className="mt-12 w-full max-w-6xl mx-auto px-2">
            <div className="bg-white shadow-xl rounded-2xl p-6 border">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                🚨 Emergency Tools
              </h3>
              <p className="text-sm text-gray-500 mb-8 text-center">
                Quick actions to attract attention or confirm safety
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Check-in */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
                  <h4 className="font-semibold text-gray-700 mb-4">
                    ✅ Check-in
                  </h4>
                  <button className="bg-green-500 hover:bg-green-600 text-white cursor-pointer px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105 w-full">
                    I'm Safe
                  </button>
                </div>

                {/* Fake Call */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
                  <h4 className="font-semibold text-gray-700 mb-4">
                    📞 Fake Call
                  </h4>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <button
                      onClick={startFakeCall}
                      className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-5 py-2 rounded-lg shadow-md transition-transform hover:scale-105">
                      Start
                    </button>
                    <button
                      onClick={stopFakeCall}
                      className="bg-gray-700 hover:bg-gray-800 cursor-pointer text-white px-5 py-2 rounded-lg shadow-md transition-transform hover:scale-105">
                      Stop
                    </button>
                  </div>
                </div>

                {/* Siren */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm flex flex-col items-center">
                  <h4 className="font-semibold text-gray-700 mb-4">
                    🔊 Police Siren
                  </h4>
                  <div className="flex gap-4 flex-wrap justify-center">
                    <button
                      onClick={playAlarm}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer px-5 py-2 rounded-lg shadow-md transition-transform hover:scale-105">
                      Start
                    </button>
                    <button
                      onClick={stopAlarm}
                      className="bg-gray-700 hover:bg-gray-800 text-white cursor-pointer px-5 py-2 rounded-lg shadow-md transition-transform hover:scale-105">
                      Stop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Feature Cards */}
          <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-2">
            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">🗺️ Safe Zone Map</h3>
              <p className="text-gray-500 mb-4">
                Find nearby safe places like shops, hospitals, and police
                stations.
              </p>
              <Link
                to="/safezones"
                className="text-blue-600 font-semibold hover:underline">
                View Map
              </Link>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">📚 Awareness Articles</h3>
              <p className="text-gray-500 mb-4">
                Learn self-defense tips, legal rights, and emergency contacts.
              </p>
              <Link
                to="/awareness"
                className="text-blue-600 font-semibold hover:underline">
                Read Articles
              </Link>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">📝 Anonymous Reporting</h3>
              <p className="text-gray-500 mb-4">
                Report unsafe areas or incidents anonymously to help others.
              </p>
              <Link
                to="/report"
                className="text-blue-600 font-semibold hover:underline">
                Report Now
              </Link>
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
