import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validation/signupSchema.js";
import { Link, useNavigate } from "react-router-dom";
import { RouteLogin } from "../helpers/RouteName.js";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setSubmitError("");
      await axios.post(`${import.meta.env.VITE_API_URL}/signup`, data, {
        withCredentials: true,
      });
      navigate(RouteLogin);
    } catch (err) {
      console.error("Error:", err);
      setSubmitError(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10 dark:bg-slate-950">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-center text-2xl font-semibold text-slate-900 dark:text-white">
          Create Your Account
        </h2>

        {submitError && (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              className="mt-1 w-full rounded-md border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 w-full rounded-md border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="mt-1 w-full rounded-md border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Age
            </label>
            <input
              {...register("age")}
              type="number"
              className="mt-1 w-full rounded-md border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Date of Birth
            </label>
            <input
              {...register("dob")}
              type="date"
              className="mt-1 w-full rounded-md border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Enter your date of birth"
            />
            {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Phone Number
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="mt-1 w-full rounded-md border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
              Address
            </label>
            <input
              {...register("address")}
              type="text"
              className="mt-1 w-full rounded-md border px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="text-center md:col-span-2">
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-slate-900 px-6 py-2.5 font-medium text-white transition duration-300 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Submit
            </button>
          </div>
          <div className="text-center md:col-span-2">
            <p className="text-sm text-black dark:text-slate-300">
              Already have an account?{" "}
              <Link to={RouteLogin} className="font-medium text-slate-900 hover:underline dark:text-white">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
