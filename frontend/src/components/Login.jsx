import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../validation/signinSchema";
import { Link, useNavigate } from "react-router-dom";
import { RouteHomepage, RouteSignup } from "../helpers/RouteName";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError, // ✅ IMPORTANT
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        data,
        { withCredentials: true }
      );

      dispatch(setUser(response.data));
      navigate(RouteHomepage);

    } catch (err) {
      console.error("FULL ERROR:", err);

      if (err.response) {
        const message = err.response.data.message;

        // ✅ Show under fields
        if (message.toLowerCase().includes("email")) {
          setError("email", {
            type: "manual",
            message: message,
          });
        } else if (message.toLowerCase().includes("password")) {
          setError("password", {
            type: "manual",
            message: message,
          });
        } else {
          setServerError(message); // show top error
        }
      } else {
        setServerError("Network error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-pink-500">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">Welcome Back</h1>
          <p className="text-gray-500">Login to continue to SafetyApp</p>
        </div>

        {/* 🔴 Server Error */}
        {serverError && (
          <p className="text-red-500 text-center mb-3">{serverError}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full border rounded-md px-3 py-2"
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
              {...register("password")}
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to={RouteSignup}
            className="text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}