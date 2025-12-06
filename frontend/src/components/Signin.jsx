import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../validation/signinSchema";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  // Setup form with validation
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      // console.log("Response:", result);

      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user)); // Add this
        // localStorage.setItem("userId", result.user.id); // Add this line
        // console.log("Signin result:", result);

        navigate("/welcome");
      } else {
        alert(result.message);
      }
    } catch (err) {
      // console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-pink-500">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">Welcome Back</h1>
          <p className="text-gray-500">Sign in to continue to SafetyApp</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me + Forgot Password */}
          {/* <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2 rounded border-gray-300" />
              Remember Me
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div> */}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 shadow-md">
              Sign In Securely
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
