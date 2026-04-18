function getCmsBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_CMS_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:4000";
  return "";
}

export async function getPublicSitePayload() {
  const base = getCmsBaseUrl();
  if (!base) return null;
  try {
    const url = `${base}/api/public/site`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Skills2 content may live on the About document (`homePageSkills2`) or on a
 * standalone `skills2` section. The API keeps both in sync on save; prefer the
 * About copy when present so the home page matches the About editor.
 */
export function resolveHomePageSkills2(site) {
  const fromAbout = site?.sections?.about?.content?.homePageSkills2;
  const s2Doc = site?.sections?.skills2;
  const fromStandalone = s2Doc?.content;

  if (!fromAbout && !fromStandalone) return null;
  if (fromAbout) {
    return { variant: "skills21", content: fromAbout };
  }
  return { variant: s2Doc.variant || "skills21", content: fromStandalone };
}

export function getSectionContent(site, name) {
  if (name === "skills2") {
    return resolveHomePageSkills2(site)?.content ?? null;
  }
  const about = site?.sections?.about?.content;
  if (about) {
    if (name === "facts" && about.homePageFacts) return about.homePageFacts;
    if (name === "skills" && about.homePageSkills) return about.homePageSkills;
    if (name === "education" && about.homePageEducation)
      return about.homePageEducation;
    if (name === "brands" && about.homePageBrands) return about.homePageBrands;
    if (name === "blogs" && about.homePageBlogs) return about.homePageBlogs;
  }
  if (name === "portfolio") {
    const fromProjects = site?.sections?.projects?.content;
    if (fromProjects) return fromProjects;
    return site?.sections?.portfolio?.content || null;
  }
  return site?.sections?.[name]?.content || null;
}
