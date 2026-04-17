import mongoose from "mongoose";

const sectionEnum = [
  "navbar",
  "hero",
  "about",
  "facts",
  "skills",
  "services2",
  "education",
  "brands",
  "portfolio",
  "skills2",
  "services",
  "projects",
  "testimonials",
  "contact",
  "blogs",
  "footer",
  "copyright",
  "common",
];

const SectionSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: sectionEnum,
      index: true,
    },
    variant: { type: String, required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true },
);

SectionSchema.index({ section: 1, variant: 1 }, { unique: true });

export const Section = mongoose.model("Section", SectionSchema);
export const SECTION_NAMES = sectionEnum;
