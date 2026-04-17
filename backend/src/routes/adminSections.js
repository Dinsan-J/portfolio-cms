import { Router } from "express";
import { Section, SECTION_NAMES } from "../models/Section.js";
import { mergeWithSectionDefaults } from "../cms/sectionContentDefaults.js";

const router = Router();

const DERIVED_SECTION_PATHS = {
  facts: "homePageFacts",
  skills: "homePageSkills",
  services2: "homePageServices2",
  education: "homePageEducation",
  brands: "homePageBrands",
  portfolio: "homePagePortfolio",
  skills2: "homePageSkills2",
  blogs: "homePageBlogs",
};

function defaultContent(sectionName) {
  if (sectionName === "facts") return { yearsCounterMax: 25, yearsTitleLines: [], counters: [] };
  if (sectionName === "skills") return { skillSections: [] };
  if (sectionName === "education") return { educationItems: [], experiencesLeft: [] };
  if (sectionName === "brands") return { companyLogos: [] };
  if (sectionName === "portfolio") return { items: [] };
  if (sectionName === "skills2") return { cards: [] };
  if (sectionName === "services2") return { items: [] };
  if (sectionName === "blogs") return { posts: [], categories: [], recentPosts: [], tags: [] };
  if (sectionName === "copyright") return { legalLinksDark: [], legalLinksLight: [] };
  if (sectionName === "common") return {};
  return {};
}

function getDerivedFromDocument(doc, sectionName) {
  if (!doc || typeof doc !== "object") return null;
  if (sectionName === "portfolio") {
    return doc.content?.homePagePortfolio || doc.content?.homePageProjects || null;
  }
  if (sectionName === "copyright") {
    return doc.content?.copyright || null;
  }
  if (sectionName === "services2") {
    return doc.content?.homePageServices2 || null;
  }
  const key = DERIVED_SECTION_PATHS[sectionName];
  if (!key) return null;
  return doc.content?.[key] || null;
}

router.get("/section/:name", async (req, res) => {
  try {
    const name = req.params.name;
    if (!SECTION_NAMES.includes(name)) {
      return res.status(400).json({ error: "Unknown section" });
    }
    let variants = await Section.find({ section: name }).lean();
    if (!variants.length) {
      const candidateDocs = await Section.find({
        section: { $in: ["about", "projects", "services", "footer"] },
      }).lean();
      let derived = null;
      for (const doc of candidateDocs) {
        const maybe = getDerivedFromDocument(doc, name);
        if (maybe && typeof maybe === "object") {
          derived = maybe;
          break;
        }
      }
      if (
        [
          "facts",
          "skills",
          "services2",
          "education",
          "brands",
          "portfolio",
          "skills2",
          "blogs",
          "copyright",
          "common",
        ].includes(name)
      ) {
        await Section.create({
          section: name,
          variant: `${name}1`,
          content: derived || defaultContent(name),
          isActive: true,
        });
        variants = await Section.find({ section: name }).lean();
      }
    }
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
        content: mergeWithSectionDefaults(name, v.variant, v.content),
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
      { new: true, runValidators: true },
    );
    if (!doc) {
      return res.status(404).json({ error: "Variant not found" });
    }
    if (isActive === true) {
      await Section.updateMany(
        { section: name, variant: { $ne: variant } },
        { $set: { isActive: false } },
      );
    }
    const fresh = await Section.findOne({ section: name, variant }).lean();
    res.json({
      section: name,
      variant: fresh.variant,
      isActive: fresh.isActive,
      content: mergeWithSectionDefaults(name, fresh.variant, fresh.content),
      updatedAt: fresh.updatedAt,
    });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

export default router;
