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

export function getSectionContent(site, name) {
  const about = site?.sections?.about?.content;
  if (about) {
    if (name === "facts" && about.homePageFacts) return about.homePageFacts;
    if (name === "skills" && about.homePageSkills) return about.homePageSkills;
    if (name === "education" && about.homePageEducation)
      return about.homePageEducation;
    if (name === "brands" && about.homePageBrands) return about.homePageBrands;
    if (name === "blogs" && about.homePageBlogs) return about.homePageBlogs;
    if (name === "skills2" && about.homePageSkills2) return about.homePageSkills2;
  }
  return site?.sections?.[name]?.content || null;
}
