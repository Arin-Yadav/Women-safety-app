import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    // console.log("Auth Header:", authHeader);
    if (!authHeader) {
      return res.status(401).json({ message: "Header missing" });
    }

    const token = authHeader.split(" ")[1]
    // console.log("Token:", token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
