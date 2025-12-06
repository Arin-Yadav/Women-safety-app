import React, { useEffect, useState } from "react";
import ContactList from "../components/ContactList";
import SafetyTips from "../components/SafetyTips";
import RecentActivity from "../components/RecentActivity";

export default function Dashboard() {
  const loggedUser = localStorage.getItem("user");
  const parsedLoggedUser = loggedUser ? JSON.parse(loggedUser) : null;
  const userId = parsedLoggedUser ? parsedLoggedUser._id : null;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg px-6 py-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-red-600 tracking-wide">
          Women Safety Dashboard
        </h1>
        {user && (
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar || "#"}
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-red-500 shadow-sm"
            />
            <div>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="grow px-8 py-10">
        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contacts Section */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Emergency Contacts
            </h2>
            <ContactList />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
              Recent Activity
            </h2>
            <RecentActivity user={user} />
          </div>
        </div>

        {/* Safety Tips Section */}
        <div className="mt-10 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Safety Tips
          </h2>
          <SafetyTips />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 border-t p-6 text-center text-gray-600 mt-auto">
        <p className="text-sm">
          © 2025 Women Safety WebApp · <span className="text-red-600">Privacy Policy</span> · Terms
        </p>
      </footer>
    </div>
  );
}
