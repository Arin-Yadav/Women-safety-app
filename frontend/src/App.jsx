import React from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignupForm from "./components/SignUp";
import SignInForm from "./components/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    //  console.log("Loaded user:", savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

    // Listen for storage changes (when user is saved in Signin)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Navbar /> {/* always visible */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/welcome" element={<WelcomeScreen user={user} />} />
        {/* <Route path="/add-contact" element={<AddContact />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
