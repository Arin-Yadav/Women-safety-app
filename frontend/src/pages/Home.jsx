import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import SafetyTips from "../components/SafetyTips";
import { motion } from "framer-motion";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useSelector((state) => state?.user?.user);
  const userId = user?.user?.id;
  // const userName = user?.user?.fullName;

  const rooms = useSelector((state) => state?.room?.rooms) || [];
  const privateRooms = rooms.filter((room) => room.roomType === "private");

  const alarmRef = useRef(null);
  const ringtoneRef = useRef(null);

  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.loop = true;
      alarmRef.current.play();
    }
  };

  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  const startFakeCall = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.loop = true;
      ringtoneRef.current.play();
    }
  };

  const stopFakeCall = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  };

  // Handle SOS
  const handleSOS = () => {
    if (privateRooms.length === 0) {
      alert("No private rooms available for SOS");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const locationMessage = {
          type: "location",
          userId,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date().toISOString(),
        };

        try {
          for (const room of privateRooms) {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/sos`,
              {
                roomId: room._id,
                message: locationMessage,
              },
              { withCredentials: true },
            );
          }

          alert("🚨 SOS sent successfully!");
        } catch (error) {
          console.error("SOS Error:", error.response?.data || error.message);
          alert("SOS failed. Please check backend/email setup.");
        }
      },
      (error) => {
        console.error("Location Error:", error);
        alert("Please allow location permission to send SOS.");
      },
    );
  };

  return (
    <div className="bg-gray-50 h-full">
      {/* Audio */}
      <audio ref={alarmRef} src="/alarm.mp3" />
      <audio ref={ringtoneRef} src="/ringtone.mp3" />

      <div className="flex">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 px-5 md:px-8 lg:px-12 py-5">
          {/* Welcome Card */}
          {/* <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-pink-500 via-purple-600 to-indigo-700 text-white p-8 md:p-10 shadow-xl">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

            <div className="relative">
              <p className="text-white/80 text-sm font-medium">
                Welcome back
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold mt-2">
                Hi, {userName || "User"} 👋
              </h1>
              <p className="mt-4 max-w-2xl text-white/90">
                Your safety dashboard is ready. Send SOS alerts, share location,
                use emergency sound tools, and stay connected with your trusted
                contacts.
              </p>
            </div>
          </section> */}

          {/* Status Cards */}
          {/* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <IoChatbubbleOutline className="text-2xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800">
                Private Rooms
              </h3>
              <p className="text-3xl font-extrabold text-purple-700 mt-2">
                {privateRooms.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                SOS will be sent to these rooms
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <div className="h-12 w-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
                <CiLocationOn className="text-2xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800">
                Live Location
              </h3>
              <p className="text-3xl font-extrabold text-pink-600 mt-2">
                Ready
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Location sends during SOS alert
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <div className="h-12 w-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <HiOutlineBellAlert className="text-2xl" />
              </div>
              <h3 className="font-bold text-xl text-gray-800">
                Emergency Tools
              </h3>
              <p className="text-3xl font-extrabold text-red-600 mt-2">
                Active
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Siren and fake call available
              </p>
            </div>
          </section> */}

          {/* SOS Section */}
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Emergency SOS
              </h2>
              <p className="text-gray-500 mt-2">
                Tap the button to instantly alert your trusted contacts.
              </p>

              <button
                onClick={handleSOS}
                className="relative mt-8 bg-red-600 cursor-pointer text-white font-extrabold rounded-full w-52 h-52 shadow-2xl hover:bg-red-700 transition hover:scale-105">
                {/* <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" /> */}
                <span className="relative text-4xl">SOS</span>
              </button>

              <p className="mt-6 text-sm text-gray-500">
                Your current location will be attached to the alert.
              </p>
            </motion.div>

            {/* Sound Tools */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-800">
                Emergency Sound Tools
              </h3>
              <p className="text-gray-500 mt-2">
                Use these tools to attract attention or create a safe exit
                moment.
              </p>

              <div className="mt-8 space-y-5">
                <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-5">
                  <h4 className="font-bold text-gray-800 mb-4">
                    🔊 Police Siren
                  </h4>

                  <div className="flex gap-3">
                    <button
                      onClick={playAlarm}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-5 py-3 rounded-xl font-semibold transition">
                      Start
                    </button>

                    <button
                      onClick={stopAlarm}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white px-5 py-3 rounded-xl font-semibold transition">
                      Stop
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-green-50 border border-green-100 p-5">
                  <h4 className="font-bold text-gray-800 mb-4">
                    📞 Fake Call Sound
                  </h4>

                  <div className="flex gap-3">
                    <button
                      onClick={startFakeCall}
                      className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer text-white px-5 py-3 rounded-xl font-semibold transition">
                      Start
                    </button>

                    <button
                      onClick={stopFakeCall}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 cursor-pointer text-white px-5 py-3 rounded-xl font-semibold transition">
                      Stop
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Tips */}
          <section className="mt-12">
            <SafetyTips />
          </section>
        </main>
      </div>
    </div>
  );
}
