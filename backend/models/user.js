// // models/User.js
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   relation: { type: String, required: true },
// });

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     age: {
//       type: Number,
//       min: 13,
//     },
//     dob: {
//       type: Date,
//       required: true,
//     },
//     phone: {
//       type: String,
//       match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"],
//     },
//     address: {
//       type: String,
//       trim: true,
//     },
//     contacts: [contactSchema], // 👈 embedded contacts array
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   try {
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//   } catch (err) {
//     next(err);
//   }
// });

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Export model
// const User = mongoose.model("User", userSchema);
// export default User;


import mongoose from "mongoose";
import bcrypt from "bcrypt";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  relation: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    age: { type: Number, min: 13 },
    dob: { type: Date, required: true },
    phone: { type: String },
    address: { type: String, trim: true },
    contacts: [contactSchema], // 👈 emergency contacts stored here
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
