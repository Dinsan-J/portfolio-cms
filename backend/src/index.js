import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import publicSite from "./routes/publicSite.js";
import adminSections from "./routes/adminSections.js";
import upload from "./routes/upload.js";
import { adminLoginHandler } from "./routes/adminLogin.js";
import { adminAuth } from "./middleware/adminAuth.js";
import { AdminUser } from "./models/AdminUser.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = Number(process.env.PORT || 4000);

function normalizeOrigin(origin) {
  const raw = String(origin || "").trim();
  if (!raw) return "";
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withProtocol);
    return url.origin;
  } catch {
    return "";
  }
}

function getAllowedOrigins() {
  const explicit = String(process.env.CORS_ORIGINS || "")
    .split(",")
    .map((item) => normalizeOrigin(item))
    .filter(Boolean);
  const publicSite = normalizeOrigin(process.env.PUBLIC_SITE_URL || "");
  const localhost = ["http://localhost:3000", "http://127.0.0.1:3000"];
  return [...new Set([...explicit, ...(publicSite ? [publicSite] : []), ...localhost])];
}

const allowedOrigins = getAllowedOrigins();

app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin/server-to-server/no-origin calls (curl, health checks).
      if (!origin) return cb(null, true);
      const normalized = normalizeOrigin(origin);
      const isExplicit = normalized && allowedOrigins.includes(normalized);
      const isVercelPreview = normalized
        ? /\.vercel\.app$/i.test(new URL(normalized).hostname)
        : false;
      if (isExplicit || isVercelPreview) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/favicon.ico", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/app/favicon.ico"));
});

app.get("/api/public/config", (_req, res) => {
  const publicSiteUrl =
    normalizeOrigin(process.env.PUBLIC_SITE_URL || "") || "http://localhost:3000";
  res.json({ publicSiteUrl });
});

app.use("/api/public", publicSite);

app.post("/api/admin/login", adminLoginHandler);

app.use("/api/admin", adminAuth, adminSections);
app.use("/api/admin", adminAuth, upload);

app.use("/admin", express.static(path.join(__dirname, "../admin")));

app.get("/", (_req, res) => {
  res.redirect("/admin");
});

async function ensureAdminFromEnv() {
  const adminEmail = String(process.env.ADMIN_EMAIL || "admin@localhost")
    .trim()
    .toLowerCase();
  const adminPassword = String(process.env.ADMIN_PASSWORD || "changeme123");
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await AdminUser.findOneAndUpdate(
    { email: adminEmail },
    { $set: { email: adminEmail, passwordHash } },
    { upsert: true, new: true }
  );
}

async function start() {
  const uri =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio_cms";
  await mongoose.connect(uri);
  await ensureAdminFromEnv();
  // eslint-disable-next-line no-console
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`CMS API listening on http://localhost:${PORT}`);
  });
}

start().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
