import jwt from "jsonwebtoken";

function jwtSecret() {
  return process.env.JWT_SECRET || "dev-jwt-secret-change-in-production";
}

export function adminAuth(req, res, next) {
  const raw =
    req.headers.authorization?.replace(/^Bearer\s+/i, "") ||
    req.headers["x-admin-token"];

  if (!raw) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(raw, jwtSecret());
    req.admin = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
