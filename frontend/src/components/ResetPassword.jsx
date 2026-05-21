import axios from "axios";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { useState } from "react";

import {
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

const ResetPassword = () => {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // 👁 Toggle State
  const [
    showPassword,
    setShowPassword
  ] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/reset-password/${token}`,

        { password }
      );

      setMessage(
        response.data.message
      );

      setError("");

      setTimeout(() => {

        navigate("/login");

      }, 2000);

    } catch (err) {

      setError(

        err.response?.data?.message ||

        "Something went wrong"
      );

      setMessage("");
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-linear-to-r
        from-purple-600
        to-pink-500
      "
    >

      <div
        className="
          bg-white
          p-8
          rounded-lg
          shadow-xl
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-center
            text-purple-700
            mb-6
          "
        >
          Reset Password
        </h1>

        {message && (

          <p
            className="
              text-green-600
              mb-4
              text-center
            "
          >
            {message}
          </p>
        )}

        {error && (

          <p
            className="
              text-red-500
              mb-4
              text-center
            "
          >
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}

          className="space-y-4"
        >

          {/* Password Field */}
          <div className="relative">

            <input

              type={
                showPassword
                  ? "text"
                  : "password"
              }

              placeholder="Enter new password"

              className="
                w-full
                border
                rounded-md
                px-3
                py-2
                pr-10
              "

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              required
            />

            {/* Eye Toggle */}
            <button

              type="button"

              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }

              className="
                absolute
                right-3
                top-3
                text-gray-500
              "
            >

              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }

            </button>

          </div>

          {/* Submit Button */}
          <button

            type="submit"

            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              text-white
              py-2
              rounded-md
            "
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;