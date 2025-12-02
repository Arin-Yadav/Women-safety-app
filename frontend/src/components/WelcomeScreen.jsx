import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeScreen({ user }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-purple-600 via-pink-500 to-red-500 px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center w-full max-w-sm sm:max-w-md animate-pulse">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-purple-700">
            Loading...
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Please wait while we load your data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-purple-600 via-pink-500 to-red-500 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 text-center w-full max-w-sm sm:max-w-md md:max-w-lg transform transition duration-500 hover:scale-[1.02]">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-purple-700">
          Welcome, {userData.fullName} 👋
        </h1>

        <p className="text-gray-600 mb-8 text-sm sm:text-base md:text-lg">
          Your safety is our priority. Let’s set up your emergency contacts so
          we can notify them instantly if you ever need help.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/addcontact")}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-lg transition duration-300 transform hover:-translate-y-0.5 hover:shadow-xl text-sm sm:text-base">
            ➕ Add Emergency Contacts
          </button>

          <button
            onClick={() => navigate("/homepage")}
            className="w-full bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold shadow-md transition duration-300 text-sm sm:text-base">
            {/* <a href="/homepage">
              Skip for now → Go to Homepage
            </a> */}
            Skip for now → Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
