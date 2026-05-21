import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(
  process.env.RESEND_API_KEY
);


// ==============================
// SIGNUP
// ==============================

export async function handleCreateNewUsers(
  req,
  res
) {

  try {

    const {
      fullName,
      email,
      password,
      age,
      dob,
      phone,
      address,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message:
          "Email already registered",
      });
    }

    await User.create({

      fullName,

      email,

      password,

      age,

      dob,

      phone,

      address,
    });

    return res.status(201).json({
      message:
        "User created successfully",
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
}


// ==============================
// LOGIN
// ==============================

export async function handleSignin(
  req,
  res
) {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    const isMatch =
      await user.comparePassword(password);

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    const token = jwt.sign(

      {
        id: user._id,
        email: user.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1h",
      }
    );

    // cookie
    res.cookie("access-token", token, {

      httpOnly: true,

      secure: false,

      sameSite: "lax",

      path: "/",
    });

    return res.status(200).json({

      message: "Login successful",

      user: {

        id: user._id,

        fullName: user.fullName,

        email: user.email,

        age: user.age,

        phone: user.phone,

        address: user.address,
      },
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
}


// ==============================
// LOGOUT
// ==============================

export function handleLogout(req, res) {

  res.clearCookie("access-token", {

    httpOnly: true,

    secure: false,

    sameSite: "lax",

    path: "/",
  });

  return res.json({
    message:
      "Logged out successfully",
  });
}


// ==============================
// FORGOT PASSWORD
// ==============================

export async function handleForgotPassword(
  req,
  res
) {

  try {

    const { email } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    // generate token
    const resetToken =
      crypto.randomBytes(32).toString("hex");

    // expiry
    const resetTokenExpiry =
      Date.now() + 15 * 60 * 1000;

    // save
    user.resetToken =
      resetToken;

    user.resetTokenExpiry =
      resetTokenExpiry;

    await user.save();

    // frontend reset link
    const resetLink =
      `http://localhost:5173/reset-password/${resetToken}`;

    // send email
    await resend.emails.send({

      from: "onboarding@resend.dev",

      to: email,

      subject: "Reset Password",

      html: `
        <h2>Password Reset</h2>

        <p>
          Click below to reset your password
        </p>

        <a href="${resetLink}">
          Reset Password
        </a>
      `,
    });

    return res.status(200).json({
      message:
        "Reset link sent to email",
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
}


// ==============================
// RESET PASSWORD
// ==============================

export async function handleResetPassword(
  req,
  res
) {

  try {

    const { token } = req.params;

    const { password } = req.body;

    const user =
      await User.findOne({

        resetToken: token,

        resetTokenExpiry: {
          $gt: Date.now(),
        },
      });

    if (!user) {

      return res.status(400).json({
        message:
          "Invalid or expired token",
      });
    }

    // update password
    user.password = password;

    // remove token
    user.resetToken =
      undefined;

    user.resetTokenExpiry =
      undefined;

    await user.save();

    return res.status(200).json({
      message:
        "Password reset successful",
    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

console.log(process.env.RESEND_API_KEY);