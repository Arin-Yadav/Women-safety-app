import User from "../models/user.js";
import jwt from "jsonwebtoken";

async function handleCreateNewUsers(req, res) {
  try {
    const { fullName, email, password, age, dob, phone, address } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!fullName || !normalizedEmail || !password || !dob) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await User.create({
      fullName,
      email: normalizedEmail,
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
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0]?.message;
      return res.status(400).json({ message: firstError || "Invalid signup data" });
    }

    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }

    return res.status(500).json({ message: "Server error: " + err.message });
  }
}

async function handleSignin(req, res) {
  try {
    const { email, password } = req.body;
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // 2. Compare password with hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" },
    );

    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    // 4. Exclude password from response
    const { password: _, ...userData } = user.toObject();
    // const userObj = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: userData._id.toString(), // Add this - it convert ObjectId to string
        fullName: userData.fullName,
        email: userData.email,
        age: userData.age,
        phone: userData.phone,
      },
      // token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function handleLogout(req, res) {
  res.clearCookie("access-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
  });
  res.json({
    message: "Logged out successfully",
    success: true,
  });
}

export { handleCreateNewUsers, handleSignin, handleLogout };
