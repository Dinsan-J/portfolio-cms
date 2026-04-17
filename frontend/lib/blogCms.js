import { allBlogs as staticAllBlogs, categories as staticCategories, posts as staticRecentPosts, tags as staticTags } from "@/data/blogs";
import { slugify } from "@/utlis/slugify";

function getCmsBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_CMS_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:4000";
  return "";
}

function normalizePost(post, index) {
  const title = String(post?.title || "").trim();
  if (!title) return null;
  const slug = post?.slug ? String(post.slug) : slugify(title);
  return {
    id: post?.id ?? index + 1,
    title,
    slug,
    description: post?.description || "",
    author: post?.author || "",
    date: post?.date || "",
    imageSrc: post?.imageSrc || "/assets/images/blog/blog-img-1.jpg",
    altText: post?.altText || "Blog Thumbnail",
    animationOrder: post?.animationOrder || `animation-order-${(index % 3) + 1}`,
    categories: Array.isArray(post?.categories) ? post.categories : [],
    tags: Array.isArray(post?.tags) ? post.tags : [],
    category: post?.category || "",
  };
}

function deriveCategories(posts, fallback) {
  if (Array.isArray(fallback) && fallback.length) return fallback;
  const counts = new Map();
  posts.forEach((p) => {
    (Array.isArray(p.categories) ? p.categories : []).forEach((c) => {
      const key = String(c || "").trim();
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
  });
  return Array.from(counts.entries()).map(([title, count]) => ({ title, count: String(count) }));
}

function deriveTags(posts, fallback) {
  if (Array.isArray(fallback) && fallback.length) return fallback;
  const set = new Set();
  posts.forEach((p) => {
    (Array.isArray(p.tags) ? p.tags : []).forEach((tag) => {
      const key = String(tag || "").trim();
      if (key) set.add(key);
    });
  });
  return Array.from(set);
}

function deriveRecentPosts(posts, fallback) {
  if (Array.isArray(fallback) && fallback.length) {
    return fallback.map((p, i) => normalizePost(p, i)).filter(Boolean);
  }
  return posts.slice(0, 3).map((p) => ({
    id: p.id,
    imageSrc: p.imageSrc,
    category: p.categories?.[0] || "Category",
    title: p.title,
    slug: p.slug,
  }));
}

export async function getBlogCmsData() {
  const fallbackPosts = staticAllBlogs.map((p, i) => normalizePost(p, i)).filter(Boolean);
  const fallback = {
    posts: fallbackPosts,
    recentPosts: staticRecentPosts.map((p, i) => normalizePost(p, i)).filter(Boolean),
    categories: staticCategories,
    tags: staticTags,
    sidebarAbout: null,
    sectionHead: null,
    readMoreLabel: "Read More",
  };

  const base = getCmsBaseUrl();
  if (!base) return fallback;
  try {
    const res = await fetch(`${base}/api/public/site`, { cache: "no-store" });
    if (!res.ok) return fallback;
    const site = await res.json();
    const blogsContent = site?.sections?.blogs?.content;
    if (!blogsContent || typeof blogsContent !== "object") return fallback;

    const posts = (Array.isArray(blogsContent.posts) ? blogsContent.posts : [])
      .map((p, i) => normalizePost(p, i))
      .filter(Boolean);
    const mergedPosts = posts.length ? posts : fallbackPosts;
    const recentPosts = deriveRecentPosts(
      mergedPosts,
      Array.isArray(blogsContent.recentPosts) ? blogsContent.recentPosts : [],
    );
    const categories = deriveCategories(
      mergedPosts,
      Array.isArray(blogsContent.categories) ? blogsContent.categories : [],
    );
    const tags = deriveTags(
      mergedPosts,
      Array.isArray(blogsContent.tags) ? blogsContent.tags : [],
    );

    return {
      posts: mergedPosts,
      recentPosts,
      categories,
      tags,
      sidebarAbout: blogsContent?.sidebar?.about || null,
      sectionHead: blogsContent?.sectionHead || null,
      readMoreLabel: blogsContent?.readMoreLabel || "Read More",
    };
  } catch {
    return fallback;
  }
}
