import { Router } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

function getCloudinaryConfig() {
  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };
}

function hasCloudinary() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function ensureUploadsDir() {
  const dir = path.resolve(process.cwd(), "uploads");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function safeFilename(originalname) {
  const base = String(originalname || "file").replace(/[^\w.\-]+/g, "_");
  const ext = path.extname(base) || ".png";
  const stem = base.replace(ext, "");
  const stamp = Date.now();
  const rand = Math.random().toString(16).slice(2, 10);
  return `${stem}_${stamp}_${rand}${ext}`;
}

const upload = multer({
  // IMPORTANT: this module is imported before dotenv.config() runs in `src/index.js`.
  // So we must not decide storage mode at import time based on env vars.
  // Always use memoryStorage; if Cloudinary isn't configured we write the buffer to disk.
  storage: multer.memoryStorage(),
  limits: { fileSize: 120 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const mime = String(file.mimetype || "");
    if (!mime.startsWith("image/") && !mime.startsWith("video/")) {
      return cb(new Error("Only image/video files are allowed"));
    }
    cb(null, true);
  },
});

const router = Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "file field required (multipart)" });
  }
  if (!hasCloudinary()) {
    const filename = safeFilename(req.file.originalname);
    const dir = ensureUploadsDir();
    const outPath = path.join(dir, filename);
    await fs.promises.writeFile(outPath, req.file.buffer);
    const url = `/uploads/${filename}`;
    return res.json({
      url,
      filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
      storage: "local",
    });
  }

  try {
    const cloudinaryConfig = getCloudinaryConfig();
    cloudinary.config(cloudinaryConfig);

    const safeOriginal = req.file.originalname.replace(/[^\w.\-]+/g, "_");
    const folder = process.env.CLOUDINARY_FOLDER || "portfolio-cms";
    const resourceType = req.file.mimetype?.startsWith("video/")
      ? "video"
      : "image";
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          use_filename: true,
          unique_filename: true,
          filename_override: safeOriginal.replace(/\.[^/.]+$/, ""),
        },
        (err, uploaded) => {
          if (err) return reject(err);
          return resolve(uploaded);
        }
      );
      stream.end(req.file.buffer);
    });

    return res.json({
      url: result.secure_url,
      filename: result.public_id,
      mimetype: req.file.mimetype,
      size: req.file.size,
      storage: "cloudinary",
    });
  } catch (err) {
    // Fallback: if Cloudinary fails (common for restricted video plans),
    // persist locally so admin upload flow still works.
    try {
      const filename = safeFilename(req.file.originalname);
      const dir = ensureUploadsDir();
      const outPath = path.join(dir, filename);
      await fs.promises.writeFile(outPath, req.file.buffer);
      const url = `/uploads/${filename}`;
      return res.json({
        url,
        filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        storage: "local-fallback",
      });
    } catch (localErr) {
      return res.status(400).json({
        error:
          localErr?.message ||
          err?.message ||
          "Cloudinary upload failed",
      });
    }
  }
});

router.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large (max 120MB)" });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message || "Upload failed" });
  }
  return res.status(500).json({ error: "Upload failed" });
});

export default router;
