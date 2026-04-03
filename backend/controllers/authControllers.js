import User from "../models/user.js";
import jwt from "jsonwebtoken";

// 🔹 Signup
export async function handleCreateNewUsers(req, res) {
  try {
    const { fullName, email, password, age, dob, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await User.create({
      fullName,
      email,
      password,
      age,
      dob,
      phone,
      address,
      contacts: [],
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

// 🔹 Login
export async function handleSignin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" },
    );

    // ✅ Cookie
    res.cookie("access-token", token, {
      httpOnly: true,
      secure: false, // ⚠️ true only in production
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
    return res.status(500).json({ message: "Server error" });
  }
}

// 🔹 Logout
export function handleLogout(req, res) {
  res.clearCookie("access-token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  res.json({ message: "Logged out successfully" });
}
