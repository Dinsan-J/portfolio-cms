import { Router } from "express";
import { Section } from "../models/Section.js";
import { mergeWithSectionDefaults } from "../cms/sectionContentDefaults.js";

const router = Router();

router.get("/site", async (_req, res) => {
  try {
    const active = await Section.find({ isActive: true }).lean();
    const sections = {};
    for (const doc of active) {
      sections[doc.section] = {
        variant: doc.variant,
        isActive: doc.isActive,
        content: mergeWithSectionDefaults(
          doc.section,
          doc.variant,
          doc.content,
        ),
        updatedAt: doc.updatedAt,
      };
    }
    // Backwards-compatible response:
    // - `sections` remains the canonical payload used by the Next.js frontend
    // - top-level keys are added for convenience / easier integration
    res.json({
      sections,
      navbar: sections.navbar || null,
      hero: sections.hero || null,
      about: sections.about || null,
      facts: sections.facts || null,
      skills: sections.skills || null,
      services2: sections.services2 || null,
      education: sections.education || null,
      brands: sections.brands || null,
      portfolio: sections.portfolio || sections.projects || null,
      skills2: sections.skills2 || null,
      services: sections.services || null,
      projects: sections.projects || null,
      testimonials: sections.testimonials || null,
      contact: sections.contact || null,
      blogs: sections.blogs || null,
      footer: sections.footer || null,
      copyright: sections.copyright || null,
      common: sections.common || null,
    });
  } catch (e) {
    res.status(500).json({ error: e.message || "Server error" });
  }
});

export default router;
