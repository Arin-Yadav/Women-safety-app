import React from "react";
// // src/pages/SignupForm.jsx

// export default function SignupForm() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-500 to-purple-600">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
//         <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
//           Create Your Account
//         </h2>

//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Age */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Age</label>
//             <input
//               type="number"
//               placeholder="Enter your age"
//               className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Date of Birth */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//             <input
//               type="date"
//               className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//             <input
//               type="tel"
//               placeholder="Enter your number"
//               className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Address */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700">Address</label>
//             <input
//               type="text"
//               placeholder="Enter your address"
//               className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Country */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Country</label>
//             <select className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500">
//               <option>India</option>
//               <option>USA</option>
//               <option>UK</option>
//               <option>Canada</option>
//               <option>Other</option>
//             </select>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="md:col-span-2 text-center">
//             <button
//               type="submit"
//               className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-pink-500 to-purple-700">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Create Your Account
        </h2>

        <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* fullName */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your full name"
            />
          </div>

          {/* email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your email"
            />
          </div>

          {/* password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your password"
            />
          </div>

          {/* age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your age"
            />
          </div>

          {/* Date of birth */}
          <div>
            <label
              htmlFor="dateofbirth"
              className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your date of birth"
            />
          </div>

          {/* phone number */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your phone number"
            />
          </div>

          {/* address */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Enter your address"
            />
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              name="country"
              className="mt-1 w-full border rounded-md px-3 py-2">
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Australia</option>
              <option>Japan</option>
              <option>China</option>
              <option>South Korea</option>
            </select>
          </div>

          {/* button  */}
          <div className="md:col-span-2 text-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
