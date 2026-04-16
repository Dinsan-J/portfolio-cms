import { Router } from "express";
import { Section, SECTION_NAMES } from "../models/Section.js";

const router = Router();

router.get("/section/:name", async (req, res) => {
  try {
    const name = req.params.name;
    if (!SECTION_NAMES.includes(name)) {
      return res.status(400).json({ error: "Unknown section" });
    }
    const variants = await Section.find({ section: name }).lean();
    variants.sort((a, b) => {
      const na = parseInt(String(a.variant).replace(/^\D+/g, ""), 10) || 0;
      const nb = parseInt(String(b.variant).replace(/^\D+/g, ""), 10) || 0;
      if (na !== nb) return na - nb;
      return String(a.variant).localeCompare(String(b.variant));
    });
    const active = variants.find((v) => v.isActive);
    res.json({
      section: name,
      activeVariant: active?.variant || null,
      variants: variants.map((v) => ({
        variant: v.variant,
        isActive: v.isActive,
        content: v.content,
        updatedAt: v.updatedAt,
      })),
    });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

router.put("/section/:name", async (req, res) => {
  try {
    const name = req.params.name;
    if (!SECTION_NAMES.includes(name)) {
      return res.status(400).json({ error: "Unknown section" });
    }
    const { variant, content, isActive } = req.body || {};
    if (!variant) {
      return res.status(400).json({ error: "variant is required" });
    }
    const update = {};
    if (content !== undefined) update.content = content;
    if (typeof isActive === "boolean") update.isActive = isActive;

    const doc = await Section.findOneAndUpdate(
      { section: name, variant },
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!doc) {
      return res.status(404).json({ error: "Variant not found" });
    }
    if (isActive === true) {
      await Section.updateMany(
        { section: name, variant: { $ne: variant } },
        { $set: { isActive: false } }
      );
    }
    const fresh = await Section.findOne({ section: name, variant }).lean();
    res.json({
      section: name,
      variant: fresh.variant,
      isActive: fresh.isActive,
      content: fresh.content,
      updatedAt: fresh.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

export default router;
