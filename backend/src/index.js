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

app.use(
  cors({
    origin: process.env.PUBLIC_SITE_URL || true,
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
  const publicSiteUrl = (
    process.env.PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/$/, "");
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
