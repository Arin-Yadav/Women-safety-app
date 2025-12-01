// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// const mongoose = require("mongoose")
// const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
      min: 13,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      match: [/^[0-9]{10,15}$/, "Please enter a valid phone number"],
    },
    address: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);



// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (err) {
    next(err);
  }
});



userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


// Export model
const User = mongoose.model("User", userSchema);
export default User;
