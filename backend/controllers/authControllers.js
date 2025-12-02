import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
async function handleCreateNewUsers(req, res) {
  try {
    const { fullName, email, password, age, dob, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    await User.create({ fullName, email, password, age, dob, phone, address });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
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
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch)
    //   return res.status(400).json({ message: "Invalid email or password" });

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    // 4. Exclude password from response
    // const { password: _, ...userData } = user.toObject();
    const userObj = user.toObject();
    // console.log("Signin response userId:", user._id.toString());


    return res.status(200).json({
      message: "Signin successful",
      user: {
        id: user._id.toString(), // Add this - convert ObjectId to string
        email: userObj.email,
        fullName: userObj.fullName,
        phone: userObj.phone,
        age: userObj.age,
        address: userObj.address,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export { handleCreateNewUsers, handleSignin };
