import React, { useEffect, useState } from "react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // console.log(storedUser)
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="relative">
      {/* Text Link */}
      <button
        onClick={() => setOpen(!open)}
        className="font-medium text-gray-700 hover:text-red-600">
        Profile
      </button>

      {/* Dropdown */}
      {open && user && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md py-3 z-50">
          {/* Profile Picture */}
          <div className="flex items-center px-4 py-2 border-b">
            <img
              src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png" // replace with user avatar
              alt="profile"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-800">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Settings */}
          <a
            href="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Settings
          </a>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("token"); // clear auth
              window.location.href = "/signin"; // redirect
            }}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
