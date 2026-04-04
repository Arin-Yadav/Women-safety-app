import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteHomepage } from "../helpers/RouteName";

const Profile = () => {
  const user = useSelector((state) => state.user?.user?.user);
  // console.log(user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetching previous info

  // Form submitting
  const onSubmit = (data) => {
    console.log(data);
    reset;
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 sm:p-6 bg-gray-100">
      <div className="w-full max-w-3xl flex flex-col gap-6 rounded-xl shadow-lg bg-white border p-5">
        {/* Heading */}
        <Link 
        to={RouteHomepage}
        className="hover:underline text-blue-600 text-right">
          Go back
        </Link>

        <h1 className="text-center text-2xl sm:text-3xl font-bold text-blue-600 tracking-tight">
          Profile
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 md:p-8">
          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-sm font-semibold text-gray-700">
              Fullname
            </label>
            <input
              id="fullName"
              type="text"
              placeholder={user.fullName}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder={user.email}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label
              htmlFor="age"
              className="text-sm font-semibold text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              min={18}
              placeholder={user.age}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "You must be at least 18 years old",
                },
              })}
            />
            {errors.age && (
              <p className="text-xs text-red-500 mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm font-semibold text-gray-700">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder={user.phone}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register("phone", {
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Please enter a valid Indian mobile number",
                },
                required: "Phone number is required",
              })}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              placeholder={
                user.address ? user.address : "Please enter address here..."
              }
              rows={4}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors cursor-pointer">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
