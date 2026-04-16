export function getCmsBaseUrl() {
  const fromEnv = (process.env.NEXT_PUBLIC_CMS_URL || "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "development") return "http://localhost:4000";
  return "";
}

export function resolveCmsMediaSrc(src) {
  if (!src || typeof src !== "string") return src;
  if (/^https?:\/\//i.test(src)) return src;
  const base = getCmsBaseUrl();
  if (src.startsWith("/uploads/") && base) return `${base}${src}`;
  return src;
}
