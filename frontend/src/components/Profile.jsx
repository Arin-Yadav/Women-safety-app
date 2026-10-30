import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useSelector(
    (state) => state.user?.user?.user ?? state.user?.user,
  );
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      age: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    reset({
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      age: user?.age ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const updatedFields = {};

      Object.keys(dirtyFields).forEach((field) => {
        updatedFields[field] = data[field];
      });

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile`,
        updatedFields,
        { withCredentials: true },
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        reset({
          fullName: response.data.user.fullName ?? "",
          email: response.data.user.email ?? "",
          age: response.data.user.age ?? "",
          phone: response.data.user.phone ?? "",
          address: response.data.user.address ?? "",
        });

        toast.success(response.data.message)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-2xl flex flex-col gap-6 rounded-xl shadow-lg border border-gray-300 p-5">
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
              // placeholder={user.fullName}
              className="mt-2 w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              {...register("fullName", { required: "Fullname is required" })}
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
              // placeholder={user.email}
              className="mt-2 w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
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
              // placeholder={user.age}
              className="mt-2 w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
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
              // placeholder={user.phone}
              className="mt-2 w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
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
              // placeholder={
              //   user.address ? user.address : "Please enter address here..."
              // }
              rows={4}
              className="mt-2 w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
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
              disabled={!isDirty}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors cursor-pointer">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
