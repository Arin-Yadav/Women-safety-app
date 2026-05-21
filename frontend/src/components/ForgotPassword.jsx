import axios from "axios";
import { useState } from "react";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        { email }
      );

      setMessage(response.data.message);
      setError("");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );

      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-pink-500">

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Forgot Password
        </h1>

        {message && (
          <p className="text-green-600 mb-4 text-center">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-500 mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-md px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
          >
            Send Reset Link
          </button>

        </form>

      </div>

    </div>
  );
};

export default ForgotPassword;