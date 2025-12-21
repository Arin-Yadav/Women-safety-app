import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validation/signupSchema.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  // setup react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // submit handler
  const onSubmit = async (data) => {
    try {
      // console.log("Submitting:", data); // Debug log
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // console.log("Response status:", res.status); // Debug log
      const result = await res.json();
      // console.log("Result:", result); // Debug log

      if (res.ok) {
        navigate("/signin");
      } else {
        alert(result.message);
      }
    } catch (err) {
      // console.error("Error:", err); // Debug log
      alert("Something went wrong");
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
          action=""
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* fullName */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              {...register("age")}
              type="number"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your age"
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Date of birth */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              {...register("dob")}
              type="date"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your date of birth"
            />
            {errors.dateofbirth && (
              <p className="text-red-500 text-sm">
                {errors.dateofbirth.message}
              </p>
            )}
          </div>

          {/* phone number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              {...register("address")}
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* button  */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 cursor-pointer">
              Submit
            </button>
          </div>
          <div  className="md:col-span-2 text-center">
            <p className="text-sm text-black">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-purple-600 hover:underline font-medium">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
