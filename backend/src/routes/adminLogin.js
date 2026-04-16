import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminUser } from "../models/AdminUser.js";

function jwtSecret() {
  return process.env.JWT_SECRET || "dev-jwt-secret-change-in-production";
}

export async function adminLoginHandler(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const normalized = String(email).trim().toLowerCase();
    const user = await AdminUser.findOne({ email: normalized });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const match = await bcrypt.compare(String(password), user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { sub: String(user._id), email: user.email },
      jwtSecret(),
      { expiresIn: "7d" }
    );
    res.json({ token, email: user.email });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
}
