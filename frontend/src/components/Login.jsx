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
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data) => {
    try {
      setSubmitError("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        data,
        { withCredentials: true },
      );

      navigate(RouteHomepage);
      dispatch(setUser(response.data));
    } catch (err) {
      console.error("Error:", err);
      setSubmitError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Welcome Back</h1>
          <p className="text-gray-500 dark:text-slate-400">Login to continue to Suraksha</p>
        </div>

        {submitError && (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="mt-1 w-full rounded-md border px-3 py-2 focus:border-slate-500 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-1 w-full rounded-md border px-3 py-2 focus:border-slate-500 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-slate-900 px-6 py-2.5 font-medium text-white transition duration-300 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to={RouteSignup} className="font-medium text-slate-900 hover:underline dark:text-white">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
