import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { AdminUser } from "../models/AdminUser.js";
import { Section } from "../models/Section.js";
import { scanHeroVariants } from "./scanHeroes.js";
import {
  buildHero1Canonical,
  buildHero2Canonical,
  buildStaticDocuments,
} from "./staticSiteData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, "../../.env") });

function resolveFrontendRoot() {
  const fromEnv = process.env.FRONTEND_PATH;
  if (fromEnv) {
    return path.isAbsolute(fromEnv)
      ? fromEnv
      : path.resolve(path.join(__dirname, "../../"), fromEnv);
  }
  return path.resolve(path.join(__dirname, "../../../frontend"));
}

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio_cms";
  await mongoose.connect(uri);
  await Section.deleteMany({});

  const frontendRoot = resolveFrontendRoot();
  const heroScanned = scanHeroVariants(frontendRoot);

  const heroDocs = heroScanned.map(({ variant, content }) => {
    let merged = content;
    if (variant === "hero1") merged = buildHero1Canonical();
    if (variant === "hero2") merged = buildHero2Canonical();
    return {
      section: "hero",
      variant,
      isActive: variant === "hero1",
      content: merged,
    };
  });

  const rest = buildStaticDocuments();
  const all = [...heroDocs, ...rest];
  await Section.insertMany(all);
  // eslint-disable-next-line no-console
  console.log(`Seeded ${all.length} section documents.`);

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@localhost").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await AdminUser.findOneAndUpdate(
    { email: adminEmail },
    { $set: { email: adminEmail, passwordHash } },
    { upsert: true }
  );
  // eslint-disable-next-line no-console
  console.log(`Admin user ready: ${adminEmail} (password: env ADMIN_PASSWORD or default changeme123)`);

  await mongoose.disconnect();
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
