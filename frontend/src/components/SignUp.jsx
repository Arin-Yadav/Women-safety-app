import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validation/signupSchema.js";
import { Link, useNavigate } from "react-router-dom";
import { RouteLogin } from "../helpers/RouteName.js";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // ✅ Age calculation
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // ✅ Submit handler
  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        data,
        { withCredentials: true }
      );

      // ✅ Direct redirect (no alert)
      navigate(RouteLogin);
    } catch (err) {
      console.error("FULL ERROR:", err);

      if (err.response) {
        const message = err.response.data.message;

        // Show error under email field
        if (message?.toLowerCase().includes("email")) {
          setError("email", {
            type: "manual",
            message: message,
          });
        } else {
          alert(message);
        }
      } else {
        alert("Network error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-500 to-purple-700">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Create Your Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
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
              {...register("password")}
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              {...register("age")}
              type="number"
              readOnly
              className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
              placeholder="Auto-calculated"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              {...register("dob")}
              type="date"
              className="mt-1 w-full border rounded-md px-3 py-2"
              onChange={(e) => {
                const dob = e.target.value;
                const age = calculateAge(dob);
                setValue("age", age, { shouldValidate: true });
              }}
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              {...register("address")}
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 cursor-pointer"
            >
              Submit
            </button>
          </div>

          {/* Login Link */}
          <div className="md:col-span-2 text-center">
            <p className="text-sm text-black">
              Already have an account?{" "}
              <Link
                to={RouteLogin}
                className="text-purple-600 hover:underline font-medium"
              >
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