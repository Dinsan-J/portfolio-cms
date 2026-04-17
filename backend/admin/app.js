const SECTIONS = [
  "navbar",
  "hero",
  "about",
  "facts",
  "skills",
  "education",
  "portfolio",
  "skills2",
  "services",
  "projects",
  "testimonials",
  "contact",
  "blogs",
  "footer",
  "copyright",
];

const LS_API = "portfolioCmsApiBase";
const LS_JWT = "portfolioCmsAdminJwt";
const LS_ASSET_ORIGIN = "portfolioCmsAssetOrigin";
const LS_THEME_MODE = "portfolioCmsThemeMode";
const LEGACY_TOKEN = "portfolioCmsAdminToken";

const loginRoot = document.getElementById("login-root");
const appRoot = document.getElementById("app-root");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginSubmit = document.getElementById("loginSubmit");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");
const topLogoutBtn = document.getElementById("topLogoutBtn");
const sidebarUserEmail = document.getElementById("sidebarUserEmail");
const topNavUser = document.getElementById("topNavUser");
const themeModeBtn = document.getElementById("themeModeBtn");
const themeModeIcon = document.getElementById("themeModeIcon");
const toastMount = document.getElementById("toastMount");

const view = document.getElementById("view");
const pageTitle = document.getElementById("pageTitle");
const pageHint = document.getElementById("pageHint");
const saveStatus = document.getElementById("saveStatus");
const SECTION_ICONS = {
  dashboard: "house",
  navbar: "menu",
  hero: "sparkles",
  about: "user-round",
  facts: "bar-chart-3",
  skills: "gauge",
  education: "graduation-cap",
  portfolio: "folder-kanban",
  skills2: "bolt",
  services: "wrench",
  projects: "folder",
  testimonials: "message-circle",
  contact: "mail",
  blogs: "newspaper",
  footer: "layout-template",
  copyright: "copyright",
};

function withIcon(icon, label) {
  const iconKey = icon
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  const lucideIcon =
    window.lucide?.icons?.[icon] || window.lucide?.icons?.[iconKey];
  const svg = lucideIcon?.toSvg?.({ width: 16, height: 16, strokeWidth: 2 });
  const fallbackGlyphs = {
    "badge-check": "✓",
    "image-up": "🖼",
    "trash-2": "🗑",
    "plus-circle": "+",
    "log-in": "↪",
    "log-out": "↩",
  };
  const iconMarkup =
    svg ||
    `<span class="btn-glyph" aria-hidden="true">${fallbackGlyphs[icon] || "•"}</span>`;
  return `<span class="btn-icon">${iconMarkup}</span><span class="btn-label">${label}</span>`;
}

function refreshIcons() {
  if (window.lucide?.createIcons) window.lucide.createIcons();
}

const pendingToasts = [];
let toastHostReady = false;
let toastFallbackMode = true;

function showDomToast(msg, type = "info", timeout = 2600) {
  if (!toastMount) return;
  toastMount.classList.add("toast-fallback-host");
  const item = document.createElement("div");
  item.className = `dom-toast dom-toast--${type}`;
  item.textContent = msg;
  toastMount.appendChild(item);
  requestAnimationFrame(() => item.classList.add("is-visible"));
  window.setTimeout(
    () => {
      item.classList.remove("is-visible");
      item.addEventListener(
        "transitionend",
        () => {
          if (item.parentNode) item.parentNode.removeChild(item);
        },
        { once: true },
      );
    },
    Math.max(900, timeout),
  );
}

function animateViewEnter() {
  if (!view) return;
  view.classList.remove("page-enter");
  requestAnimationFrame(() => {
    view.classList.add("page-enter");
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function ensurePageStartsAtTop() {
  if (
    document.activeElement &&
    typeof document.activeElement.blur === "function"
  ) {
    document.activeElement.blur();
  }
  scrollToTop();
  requestAnimationFrame(() => {
    scrollToTop();
    view?.scrollIntoView({ block: "start", inline: "nearest" });
  });
  window.setTimeout(() => scrollToTop(), 0);
}

function applyScrollReveal(root = view) {
  if (!root) return;
  const targets = root.querySelectorAll(".card, .group, .field, .toolbar");
  if (!targets.length) return;
  targets.forEach((el, i) => {
    el.classList.add("reveal-on-scroll");
    el.style.setProperty("--reveal-delay", `${Math.min(i * 24, 260)}ms`);
  });
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
  );
  targets.forEach((el) => io.observe(el));
}

function toast(msg, type = "info", timeout = 2600) {
  const rt = window.ReactToastify;
  const normalized =
    type === "success" ||
    type === "error" ||
    type === "warning" ||
    type === "info"
      ? type
      : "default";
  if (rt?.toast && toastHostReady) {
    const fn =
      normalized === "success"
        ? rt.toast.success
        : normalized === "error"
          ? rt.toast.error
          : normalized === "warning"
            ? rt.toast.warning
            : normalized === "info"
              ? rt.toast.info
              : rt.toast;
    fn(msg, {
      position: "top-right",
      autoClose: timeout,
      pauseOnHover: true,
      theme:
        document.body.getAttribute("data-theme-mode") === "dark"
          ? "dark"
          : "light",
      className: `saas-toast saas-toast--${normalized}`,
      progressClassName: "saas-toast-progress",
    });
    return;
  }
  if (toastFallbackMode) {
    showDomToast(msg, normalized, timeout);
    return;
  }
  pendingToasts.push({ msg, type: normalized, timeout });
  console.log(`[${normalized}] ${msg}`);
}

function defaultApiBase() {
  if (window.location?.origin) return window.location.origin;
  return "http://localhost:4000";
}

function getApiBase() {
  const current = window.location?.origin?.replace(/\/$/, "");
  if (current && /^https?:\/\/(localhost|127\.0\.0\.1):4000$/i.test(current)) {
    return current;
  }
  return defaultApiBase();
}

function getAssetBase() {
  const o = localStorage.getItem(LS_ASSET_ORIGIN);
  if (o) return o.replace(/\/$/, "");
  return getApiBase().replace(/\/$/, "");
}

function mediaBaseForPath(val) {
  if (typeof val !== "string") return getApiBase().replace(/\/$/, "");
  if (/^https?:\/\//i.test(val)) return "";
  if (val.startsWith("/uploads/")) return getApiBase().replace(/\/$/, "");
  if (val.startsWith("/assets/") || val.startsWith("/_next/"))
    return getAssetBase();
  return getApiBase().replace(/\/$/, "");
}

async function fetchPublicConfig() {
  try {
    const base = getApiBase().replace(/\/$/, "");
    const res = await fetch(`${base}/api/public/config`);
    const data = await res.json();
    if (res.ok && data.publicSiteUrl) {
      localStorage.setItem(
        LS_ASSET_ORIGIN,
        String(data.publicSiteUrl).replace(/\/$/, ""),
      );
    }
  } catch {
    // ignore
  }
}

function getJwt() {
  return localStorage.getItem(LS_JWT) || "";
}

function setJwt(token) {
  localStorage.removeItem(LEGACY_TOKEN);
  if (token) localStorage.setItem(LS_JWT, token);
  else localStorage.removeItem(LS_JWT);
}

function applyThemeMode(mode) {
  const m = mode === "dark" ? "dark" : "light";
  document.body.setAttribute("data-theme-mode", m);
  localStorage.setItem(LS_THEME_MODE, m);
  if (themeModeIcon) {
    themeModeIcon.innerHTML = `<i data-lucide="${m === "dark" ? "sun" : "moon-star"}"></i>`;
  }
  refreshIcons();
}

function initThemeSystem() {
  applyThemeMode(localStorage.getItem(LS_THEME_MODE) || "light");
  themeModeBtn?.addEventListener("click", () => {
    themeModeIcon?.classList.add("switching");
    const current = document.body.getAttribute("data-theme-mode") === "dark";
    applyThemeMode(current ? "light" : "dark");
    toast(
      current ? "Light mode enabled ☀️" : "Dark mode enabled 🌙",
      "info",
      1400,
    );
    setTimeout(() => themeModeIcon?.classList.remove("switching"), 320);
  });
}

function initReactToastify() {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const RT = window.ReactToastify;
  if (!toastMount || !React || !ReactDOM || !RT?.ToastContainer) {
    toastHostReady = false;
    toastFallbackMode = true;
    return;
  }
  try {
    const containerElement = React.createElement(RT.ToastContainer, {
      newestOnTop: true,
      closeOnClick: true,
      draggable: true,
      pauseOnHover: true,
      position: "top-right",
    });
    if (typeof ReactDOM.createRoot === "function") {
      const root = ReactDOM.createRoot(toastMount);
      root.render(containerElement);
    } else if (typeof ReactDOM.render === "function") {
      ReactDOM.render(containerElement, toastMount);
    } else {
      throw new Error("ReactDOM mount method unavailable");
    }
    toastHostReady = true;
    toastFallbackMode = false;
    if (pendingToasts.length) {
      const queue = pendingToasts.splice(0, pendingToasts.length);
      queue.forEach((item) => toast(item.msg, item.type, item.timeout));
    }
  } catch (err) {
    console.error("Toast initialization failed:", err);
    toastHostReady = false;
    toastFallbackMode = true;
    if (pendingToasts.length) {
      const queue = pendingToasts.splice(0, pendingToasts.length);
      queue.forEach((item) => showDomToast(item.msg, item.type, item.timeout));
    }
  }
}

function updateShell() {
  const authed = Boolean(getJwt());
  loginRoot.classList.toggle("hidden", authed);
  appRoot.classList.toggle("hidden", !authed);
  refreshIcons();
}

function authHeaders() {
  const token = getJwt();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path, options = {}) {
  const base = getApiBase().replace(/\/$/, "");
  const fetchOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...authHeaders(),
    },
  };
  const method = String(fetchOptions.method || "GET").toUpperCase();
  const isWrite = method === "PUT" || method === "POST" || method === "PATCH";
  const retryDelaysMs = isWrite ? [0, 500, 1000, 1800] : [0];
  let res;
  let lastNetworkErr = null;
  for (let i = 0; i < retryDelaysMs.length; i++) {
    if (retryDelaysMs[i] > 0) {
      await new Promise((resolve) => setTimeout(resolve, retryDelaysMs[i]));
    }
    try {
      res = await fetch(`${base}${path}`, fetchOptions);
      lastNetworkErr = null;
      break;
    } catch (err) {
      lastNetworkErr = err;
      if (i === retryDelaysMs.length - 1) throw err;
    }
  }
  if (!res) {
    throw lastNetworkErr || new Error("Network request failed");
  }
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (res.status === 401) {
    setJwt("");
    updateShell();
  }
  if (!res.ok) {
    const msg = data?.error || res.statusText;
    throw new Error(msg);
  }
  return data;
}

function setDeep(obj, path, value) {
  const parts = path;
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!(p in cur) || typeof cur[p] !== "object") cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
}

function getDeep(obj, path) {
  return path.reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function looksLikeImageField(key, val) {
  if (typeof val !== "string") return false;
  if (looksLikeVideoField(key, val)) return false;
  if (/^https?:\/\//i.test(val) && /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(val))
    return true;
  if (!val.startsWith("/")) return false;
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(val)) return true;
  return /(src|image|logo|icon|photo|banner|bg|avatar|thumb)/i.test(
    String(key),
  );
}

function looksLikeVideoField(key, val) {
  const k = String(key || "");
  if (/video|movie|clip|mp4|webm|m4v|ogg/i.test(k)) return true;
  if (typeof val !== "string") return false;
  return /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(val);
}

function looksLikeMediaField(key, val) {
  return looksLikeImageField(key, val) || looksLikeVideoField(key, val);
}

function fieldIconName(label, value) {
  const key = String(label || "").toLowerCase();
  if (looksLikeVideoField(key, value)) return "video";
  if (looksLikeImageField(key, value)) return "image";
  if (
    /url|link|website|href|slug/.test(key) ||
    /^https?:\/\//i.test(String(value || ""))
  )
    return "link";
  return "text";
}

function cloneTemplateForArray(arr) {
  if (!arr.length) return {};
  const sample = arr[0];
  if (sample && typeof sample === "object") {
    const o = {};
    for (const k of Object.keys(sample)) {
      const v = sample[k];
      if (typeof v === "string") o[k] = "";
      else if (typeof v === "number") o[k] = 0;
      else if (typeof v === "boolean") o[k] = false;
      else if (Array.isArray(v)) o[k] = [];
      else if (v && typeof v === "object")
        o[k] = cloneTemplateForArray(Object.keys(v).length ? [v] : [{}]);
      else o[k] = null;
    }
    return o;
  }
  return "";
}

function humanizeKey(key) {
  const k = String(key);
  const one = {
    darkLogo: "Logo",
    lightLogo: "Logo",
    href: "URL",
    iconClass: "Icon class (Font Awesome)",
    isNextLink: "Use Next.js Link",
    sourceNotes: "Developer notes (optional)",
    buttonHref: "Button URL",
    buttonText: "Button label",
    titleLine1: "Title line 1",
    titleLine2: "Title line 2",
    rightsPrefix: "Rights text (before owner name)",
    linePrefix: "Text after year (before owner link)",
    ownerLabel: "Owner / brand name",
    ownerHref: "Owner URL",
    imageSrc: "Image URL",
    altText: "Image alt text",
    animationOrder: "Animation order class",
    parentClassDefault: "Section wrapper classes",
    sectionId: "HTML section ID",
    readMoreLabel: "Read-more button label",
    readMoreIcon: "Read-more icon class",
  };
  if (one[k]) return one[k];
  return k
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function shouldHideField(key, parentValue) {
  const k = String(key || "");
  if (
    [
      "component",
      "sourceNotes",
      "sectionId",
      "parentClassDefault",
      "layout",
      "animationOrder",
      "sourceFile",
    ].includes(k)
  ) {
    return true;
  }
  if (["darkLogo", "lightLogo", "logo", "logoAlt"].includes(k)) return true;
  // Hide duplicate hero image sources; keep single `mainImage`.
  if (["imagesFromSrcScan", "imageComponents", "bannerImage", "thumbnailImage"].includes(k))
    return true;
  return false;
}

function normalizeLogoFields(node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((item) => normalizeLogoFields(item));
    return;
  }
  if (typeof node.darkLogo === "string" || typeof node.lightLogo === "string") {
    const shared = node.darkLogo || node.lightLogo || "";
    if (shared) {
      node.darkLogo = shared;
      node.lightLogo = shared;
    }
  }
  Object.keys(node).forEach((k) => normalizeLogoFields(node[k]));
}

function pickHeroImage(content) {
  const fromMain = content?.mainImage;
  const fromBanner = content?.bannerImage;
  const fromThumb = content?.thumbnailImage;
  const fromComponentScan = content?.imageComponents?.[0];
  const fromSrcScan = content?.imagesFromSrcScan?.[0];
  return (
    fromMain ||
    fromBanner ||
    fromThumb ||
    (fromComponentScan
      ? {
          src: fromComponentScan.src,
          width: fromComponentScan.width,
          height: fromComponentScan.height,
          alt: fromComponentScan.alt,
        }
      : null) ||
    (fromSrcScan
      ? {
          src: fromSrcScan.src,
          width: fromSrcScan.width,
          height: fromSrcScan.height,
          alt: fromSrcScan.alt,
        }
      : null)
  );
}

function normalizeHeroImageFields(content) {
  if (!content || typeof content !== "object") return;
  const chosen = pickHeroImage(content);
  if (!chosen || typeof chosen !== "object") return;
  const normalized = {
    src: chosen.src || "",
    width: Number(chosen.width) || 0,
    height: Number(chosen.height) || 0,
    alt: chosen.alt || "banner-img",
  };
  content.mainImage = { ...normalized };
  // Keep older key compatibility for variants/components.
  content.bannerImage = { ...normalized };
  content.thumbnailImage = { ...normalized };
}

function normalizeEditorContent(section, content) {
  if (!content || typeof content !== "object") return;
  normalizeLogoFields(content);
  if (section === "hero") normalizeHeroImageFields(content);
}

function groupTitleLabel(section, variant, key) {
  const v = String(variant || "");
  const map = {
    footer: {
      footer5: {
        cta: "Call to action (top banner)",
        menuDark: "Footer links — dark theme routes",
        menuLight: "Footer links — light theme routes",
        socialLinks: "Social icons",
        copyright: "Copyright line",
      },
      footer1: {
        footer: "Main footer (logo, links, contact)",
        copyright: "Copyright strip",
      },
      footer2: {
        footer: "Branding, links & contact columns",
        newsletterSection: "Newsletter column",
      },
      footer3: {
        footer: "Branding, newsletter, links & contact",
      },
      footer4: {
        copyright: "Copyright line",
      },
    },
    services: {
      "*": {
        sectionHead: "Section heading",
        sideImage: "Side image",
        items: "Items",
      },
    },
    blogs: {
      "*": {
        sectionHead: "Section heading",
        posts: "Homepage blog cards",
        recentPosts: "Sidebar recent posts",
        categories: "Sidebar categories",
        tags: "Sidebar tags",
        sidebar: "Sidebar settings",
      },
    },
  };
  return (
    map[section]?.[v]?.[key] || map[section]?.["*"]?.[key] || humanizeKey(key)
  );
}

function preferredNestedOrder(parentKey) {
  const map = {
    cta: ["titleLine1", "titleLine2", "subtitle", "buttonText", "buttonHref"],
    copyright: ["linePrefix", "rightsPrefix", "ownerLabel", "ownerHref"],
    newsletterSection: ["title", "para", "placeholder", "iconClass"],
    sectionHead: ["subtitle", "titleLines", "description"],
    newsletter: ["placeholder", "envelopeIconClass"],
    sideImage: ["src", "width", "height", "alt"],
    footer: [
      "component",
      "darkLogo",
      "lightLogo",
      "logoAlt",
      "description",
      "descriptionLine1",
      "descriptionLine2",
      "newsletter",
      "quickLinksTitle",
      "footerLinks",
      "footerLinksWhite",
      "contactTitle",
      "contactItems",
      "socialLinks",
    ],
    footerLinks: ["label", "href", "isNextLink"],
    footerLinksWhite: ["label", "href", "isNextLink"],
    menuDark: ["label", "href", "isNextLink"],
    menuLight: ["label", "href", "isNextLink"],
    legalLinksDark: ["label", "href", "isNextLink"],
    legalLinksLight: ["label", "href", "isNextLink"],
    contactItems: ["iconClass", "type", "display", "href"],
    socialLinks: ["iconClass", "href"],
    posts: [
      "id",
      "title",
      "slug",
      "description",
      "author",
      "date",
      "imageSrc",
      "altText",
      "animationOrder",
      "categories",
      "tags",
    ],
    recentPosts: ["id", "title", "slug", "category", "imageSrc"],
    categories: ["title", "count"],
    sidebar: ["about"],
    about: ["title", "imageSrc", "name", "role", "description", "socialLinks"],
  };
  return map[parentKey] || null;
}

function sortKeysList(keys, preferred) {
  if (!preferred || !preferred.length) {
    return keys.slice().sort((a, b) => String(a).localeCompare(String(b)));
  }
  const index = new Map(preferred.map((k, i) => [k, i]));
  return keys.slice().sort((a, b) => {
    const ia = index.has(a) ? index.get(a) : Number.MAX_SAFE_INTEGER;
    const ib = index.has(b) ? index.get(b) : Number.MAX_SAFE_INTEGER;
    if (ia !== ib) return ia - ib;
    return String(a).localeCompare(String(b));
  });
}

function preferredKeyOrder(section, contentRoot, variant) {
  const v = String(variant || "");
  if (section === "hero") {
    return [
      "layout",
      "bannerImage",
      "mainImage",
      "thumbnailImage",
      "redBgImage",
      "logoUnderImages",
      "floatingBannerTexts",
      "helloSubtitle",
      "subtitle",
      "titleLine1",
      "typedStrings",
      "description",
      "descriptionHtmlSegments",
      "primaryCta",
      "findMeOnTitle",
      "bannerShapeImage",
      "sourceFile",
      "imagesFromSrcScan",
      "imageComponents",
      "headings",
      "paragraphs",
      "buttonLabels",
      "spanTextsSample",
    ];
  }
  if (section === "navbar") {
    return [
      "component",
      "darkLogo",
      "lightLogo",
      "logoAlt",
      "menuItems",
      "menuItemsLight",
      "onepageNavItems",
      "headerSocialLinks",
      "cta",
    ];
  }
  if (section === "footer") {
    if (v === "footer5") {
      return [
        "component",
        "cta",
        "menuDark",
        "menuLight",
        "socialLinks",
        "copyright",
        "sourceNotes",
      ];
    }
    if (v === "footer1") {
      return ["footer", "copyright", "sourceNotes"];
    }
    if (v === "footer2") {
      return ["component", "footer", "newsletterSection", "sourceNotes"];
    }
    if (v === "footer3") {
      return ["component", "footer", "sourceNotes"];
    }
    if (v === "footer4") {
      return [
        "component",
        "darkLogo",
        "lightLogo",
        "logoAlt",
        "copyright",
        "sourceNotes",
      ];
    }
    return ["logo", "tagline", "columns", "socialLinks", "copyrightText"];
  }
  if (section === "services") {
    return [
      "component",
      "sectionId",
      "isLightDefault",
      "sectionHead",
      "items",
      "sideImage",
      "detailPathTemplate",
      "detailPathTemplateLight",
      "sourceNotes",
    ];
  }
  if (section === "projects") {
    return [
      "component",
      "sectionId",
      "sectionHead",
      "items",
      "detailPathTemplate",
      "detailPathTemplateLight",
      "arrowButtonIcon",
      "sourceNotes",
    ];
  }
  if (section === "contact") {
    return ["component", "sectionTitle", "subtitle", "form", "sourceNotes"];
  }
  if (section === "blogs") {
    return [
      "component",
      "parentClassDefault",
      "sectionId",
      "sectionHead",
      "posts",
      "recentPosts",
      "categories",
      "tags",
      "readMoreLabel",
      "readMoreIcon",
      "sidebar",
      "sourceNotes",
    ];
  }
  return Object.keys(contentRoot || {});
}

function sortKeysForSection(section, root, variant) {
  const preferred = preferredKeyOrder(section, root, variant);
  return sortKeysList(Object.keys(root || {}), preferred);
}

function sortNestedKeys(parentKey, keys) {
  const pref = preferredNestedOrder(parentKey);
  return sortKeysList(keys, pref);
}

function renderPrimitiveField({ label, value, path, contentRoot, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "field";
  const lab = document.createElement("span");
  lab.className = "label";
  lab.textContent = label;
  wrap.appendChild(lab);

  if (typeof value === "boolean") {
    const row = document.createElement("label");
    row.className = "toggle";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = value;
    input.addEventListener("change", () => {
      setDeep(contentRoot, path, input.checked);
      onChange();
    });
    row.appendChild(input);
    row.appendChild(document.createTextNode("true / false"));
    wrap.appendChild(row);
    return wrap;
  }

  if (typeof value === "number") {
    const inputWrap = document.createElement("div");
    inputWrap.className = "field-input-wrap";
    inputWrap.innerHTML = `<span class="field-input-icon"><i data-lucide="hash"></i></span>`;
    const input = document.createElement("input");
    input.type = "number";
    input.className = "text";
    input.value = String(value);
    input.addEventListener("input", () => {
      const n = Number(input.value);
      setDeep(contentRoot, path, Number.isFinite(n) ? n : 0);
      onChange();
    });
    inputWrap.appendChild(input);
    wrap.appendChild(inputWrap);
    return wrap;
  }

  const inputWrap = document.createElement("div");
  inputWrap.className = "field-input-wrap";
  inputWrap.innerHTML = `<span class="field-input-icon"><i data-lucide="${fieldIconName(label, value)}"></i></span>`;
  const input = document.createElement("textarea");
  input.className = "text";
  input.rows = String(value).length > 120 ? 4 : 2;
  input.value = value;
  input.addEventListener("input", () => {
    setDeep(contentRoot, path, input.value);
    onChange();
  });
  inputWrap.appendChild(input);
  wrap.appendChild(inputWrap);

  const keyName = path[path.length - 1];
  if (looksLikeMediaField(keyName, value)) {
    const isVideoField = looksLikeVideoField(keyName, value);
    const preview = document.createElement("div");
    preview.className = "preview";
    const mediaEl = isVideoField
      ? document.createElement("video")
      : document.createElement("img");
    const resolved = /^https?:\/\//i.test(value)
      ? value
      : `${mediaBaseForPath(value)}${value}`;
    mediaEl.src = resolved;
    if (isVideoField) {
      mediaEl.controls = true;
      mediaEl.preload = "metadata";
      mediaEl.style.width = "100%";
      mediaEl.style.borderRadius = "8px";
    } else {
      mediaEl.alt = "";
    }
    preview.appendChild(mediaEl);

    const uploadBtn = document.createElement("button");
    uploadBtn.type = "button";
    uploadBtn.className = "btn upload small";
    uploadBtn.innerHTML = withIcon("image-up", isVideoField ? "Upload video" : "Upload image");
    uploadBtn.style.marginTop = "8px";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = isVideoField ? "video/*" : "image/*";
    fileInput.style.display = "none";
    uploadBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      try {
        const fd = new FormData();
        fd.append("file", file);
        const base = getApiBase().replace(/\/$/, "");
        const res = await fetch(`${base}/api/admin/upload`, {
          method: "POST",
          headers: authHeaders(),
          body: fd,
        });
        const raw = await res.text();
        let data;
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch {
          data = { error: raw || "Upload failed" };
        }
        if (res.status === 401) {
          setJwt("");
          updateShell();
        }
        if (!res.ok) throw new Error(data.error || "Upload failed");
        setDeep(contentRoot, path, data.url);
        input.value = data.url;
        mediaEl.src = /^https?:\/\//i.test(data.url)
          ? data.url
          : `${base}${data.url}`;
        onChange();
        toast(isVideoField ? "Video uploaded successfully 🎬" : "Image uploaded successfully 📷", "success");
      } catch (e) {
        toast(e.message || "Upload failed", "error");
      } finally {
        fileInput.value = "";
      }
    });
    wrap.appendChild(preview);
    wrap.appendChild(uploadBtn);
    wrap.appendChild(fileInput);
  }
  refreshIcons();
  return wrap;
}

function renderNode({
  key,
  value,
  path,
  contentRoot,
  onChange,
  section,
  variant,
}) {
  if (value === null || value === undefined) {
    const wrap = document.createElement("div");
    wrap.className = "field";
    const lab = document.createElement("span");
    lab.className = "label";
    lab.textContent = `${key} (null)`;
    wrap.appendChild(lab);
    return wrap;
  }

  if (Array.isArray(value)) {
    const group = document.createElement("div");
    group.className = "group";
    const title = document.createElement("div");
    title.className = "group-title";
    title.textContent = `${groupTitleLabel(section, variant, key)} [${value.length}]`;
    group.appendChild(title);

    value.forEach((item, index) => {
      const sub = document.createElement("div");
      sub.className = "group";
      const subTitle = document.createElement("div");
      subTitle.className = "group-title";
      subTitle.textContent = `#${index + 1}`;
      sub.appendChild(subTitle);
      const childPath = [...path, index];
      if (item && typeof item === "object" && !Array.isArray(item)) {
        sortNestedKeys(key, Object.keys(item))
          .filter((k) => !shouldHideField(k, item))
          .forEach((k) => {
            sub.appendChild(
              renderNode({
                key: k,
                value: item[k],
                path: [...childPath, k],
                contentRoot,
                onChange,
                section,
                variant,
              }),
            );
          });
      } else {
        sub.appendChild(
          renderPrimitiveField({
            label: humanizeKey(key),
            value: item,
            path: childPath,
            contentRoot,
            onChange,
          }),
        );
      }
      const row = document.createElement("div");
      row.className = "row-actions";
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "btn danger small";
      removeBtn.innerHTML = withIcon("trash-2", "Remove row");
      removeBtn.addEventListener("click", () => {
        const arr = getDeep(contentRoot, path);
        arr.splice(index, 1);
        onChange(true);
      });
      row.appendChild(removeBtn);
      sub.appendChild(row);
      group.appendChild(sub);
    });

    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "btn secondary small";
    addBtn.innerHTML = withIcon("plus-circle", "Add item");
    addBtn.addEventListener("click", () => {
      const arr = getDeep(contentRoot, path);
      arr.push(cloneTemplateForArray(arr));
      onChange(true);
    });
    group.appendChild(addBtn);
    return group;
  }

  if (typeof value === "object") {
    const group = document.createElement("div");
    group.className = "group";
    const title = document.createElement("div");
    title.className = "group-title";
    title.textContent = groupTitleLabel(section, variant, key);
    group.appendChild(title);
    sortNestedKeys(key, Object.keys(value))
      .filter((k) => !shouldHideField(k, value))
      .forEach((k) => {
        group.appendChild(
          renderNode({
            key: k,
            value: value[k],
            path: [...path, k],
            contentRoot,
            onChange,
            section,
            variant,
          }),
        );
      });
    return group;
  }

  return renderPrimitiveField({
    label: humanizeKey(key),
    value,
    path,
    contentRoot,
    onChange,
  });
}

function renderEditor(section, data) {
  const root = document.createElement("div");
  if (!data?.variants?.length) {
    const empty = document.createElement("div");
    empty.className = "error-banner";
    empty.textContent =
      "No variants found for this section. From backend folder run: npm run seed";
    root.appendChild(empty);
    return root;
  }

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  const variantSelect = document.createElement("select");
  variantSelect.className = "select";
  data.variants.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v.variant;
    opt.textContent = `${v.variant}${v.isActive ? " (live)" : ""}`;
    if (v.isActive) opt.selected = true;
    variantSelect.appendChild(opt);
  });
  const liveToggle = document.createElement("label");
  liveToggle.className = "toggle";
  const liveInput = document.createElement("input");
  liveInput.type = "checkbox";
  const selected =
    data.variants.find((v) => v.variant === variantSelect.value) ||
    data.variants[0];
  liveInput.checked = !!selected?.isActive;
  liveToggle.appendChild(liveInput);
  liveToggle.appendChild(document.createTextNode("Live on site"));
  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "btn primary";
  saveBtn.innerHTML = withIcon("badge-check", "Save changes");
  const pill = document.createElement("span");
  pill.className = "pill";
  pill.textContent = `${data.variants.length} variants`;
  toolbar.appendChild(variantSelect);
  toolbar.appendChild(liveToggle);
  toolbar.appendChild(saveBtn);
  toolbar.appendChild(pill);
  root.appendChild(toolbar);

  const editorMount = document.createElement("div");
  editorMount.className = "field-grid";
  root.appendChild(editorMount);

  let currentVariant = variantSelect.value;
  let hasDirtyToastShown = false;
  let working = JSON.parse(
    JSON.stringify(
      data.variants.find((v) => v.variant === currentVariant)?.content || {},
    ),
  );
  normalizeEditorContent(section, working);

  const paint = (fullReset, userChanged = false) => {
    if (userChanged) {
      saveStatus.textContent = "Unsaved changes";
      if (!hasDirtyToastShown) {
        toast("You have unsaved changes ✍️", "info", 1400);
        hasDirtyToastShown = true;
      }
    }
    if (!fullReset) {
      return;
    }
    if (!userChanged) hasDirtyToastShown = false;
    editorMount.innerHTML = "";
    sortKeysForSection(section, working, currentVariant)
      .filter((k) => !shouldHideField(k, working))
      .forEach((k) => {
        editorMount.appendChild(
          renderNode({
            key: k,
            value: working[k],
            path: [k],
            contentRoot: working,
            onChange: (hard) => paint(hard, true),
            section,
            variant: currentVariant,
          }),
        );
      });
  };

  function syncVariantOptionLabels() {
    Array.from(variantSelect.options).forEach((opt) => {
      const vv = data.variants.find((x) => x.variant === opt.value);
      opt.textContent = `${opt.value}${vv?.isActive ? " (live)" : ""}`;
    });
  }

  variantSelect.addEventListener("change", async () => {
    const targetVariant = variantSelect.value;
    if (targetVariant === currentVariant) return;
    const previousValue = currentVariant;
    variantSelect.disabled = true;
    try {
      currentVariant = targetVariant;
      let next = data.variants.find((v) => v.variant === currentVariant);
      working = JSON.parse(JSON.stringify(next?.content || {}));
      normalizeEditorContent(section, working);
      liveInput.checked = true;
      paint(true);
      await apiFetch(`/api/admin/section/${section}`, {
        method: "PUT",
        body: JSON.stringify({ variant: currentVariant, isActive: true }),
      });
      const refreshed = await apiFetch(`/api/admin/section/${section}`);
      data.variants = refreshed.variants;
      next = data.variants.find((v) => v.variant === currentVariant);
      working = JSON.parse(JSON.stringify(next?.content || {}));
      normalizeEditorContent(section, working);
      syncVariantOptionLabels();
      liveInput.checked = true;
      paint(true);
      toast(`${currentVariant} is now live`, "success");
    } catch (e) {
      variantSelect.value = previousValue;
      currentVariant = previousValue;
      const revert = data.variants.find((v) => v.variant === currentVariant);
      working = JSON.parse(JSON.stringify(revert?.content || {}));
      normalizeEditorContent(section, working);
      liveInput.checked = !!revert?.isActive;
      paint(true);
      toast(e.message || "Could not switch variant", "error");
    } finally {
      variantSelect.disabled = false;
    }
  });

  liveInput.addEventListener("change", async () => {
    try {
      await apiFetch(`/api/admin/section/${section}`, {
        method: "PUT",
        body: JSON.stringify({
          variant: currentVariant,
          isActive: liveInput.checked,
        }),
      });
      const refreshed = await apiFetch(`/api/admin/section/${section}`);
      data.variants = refreshed.variants;
      syncVariantOptionLabels();
      toast(
        liveInput.checked ? "Variant activated" : "Variant deactivated",
        "success",
      );
    } catch (e) {
      toast(e.message || "Update failed", "error");
    }
  });

  saveBtn.addEventListener("click", async () => {
    let didSave = false;
    try {
      saveBtn.disabled = true;
      const payloadContent = JSON.parse(JSON.stringify(working || {}));
      normalizeEditorContent(section, payloadContent);
      await apiFetch(`/api/admin/section/${section}`, {
        method: "PUT",
        body: JSON.stringify({
          variant: currentVariant,
          content: payloadContent,
          isActive: liveInput.checked ? true : undefined,
        }),
      });
      didSave = true;
      toast("Changes saved successfully ✅", "success");
      const refreshed = await apiFetch(`/api/admin/section/${section}`);
      data.variants = refreshed.variants;
      syncVariantOptionLabels();
      saveStatus.textContent = "Saved";
      hasDirtyToastShown = false;
    } catch (e) {
      toast(e.message || "Save failed", "error");
    } finally {
      saveBtn.disabled = false;
      if (!didSave && saveStatus.textContent !== "Saved") {
        saveStatus.textContent = "Not saved";
      }
    }
  });

  paint(true);
  refreshIcons();
  return root;
}

async function renderDashboard() {
  ensurePageStartsAtTop();
  pageTitle.textContent = "Dashboard";
  pageHint.textContent = "Live content map from the public API.";
  view.innerHTML = "";
  try {
    const base = getApiBase().replace(/\/$/, "");
    const res = await fetch(`${base}/api/public/site`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || res.statusText);
    const grid = document.createElement("div");
    grid.className = "grid two";
    SECTIONS.forEach((name) => {
      const live = data.sections?.[name];
      const card = document.createElement("div");
      card.className = "card";
      card.style.animation = "page-in 0.42s ease-out both";
      card.style.animationDelay = `${SECTIONS.indexOf(name) * 55}ms`;
      const head = document.createElement("div");
      head.className = "card-head";
      head.innerHTML = `<i data-lucide="${SECTION_ICONS[name] || "square"}"></i>`;
      const title = document.createElement("h3");
      title.textContent = name;
      head.appendChild(title);
      const stat = document.createElement("div");
      stat.className = "stat";
      stat.textContent = live ? live.variant : "—";
      const hint = document.createElement("div");
      hint.className = "muted status-line";
      if (live) {
        hint.innerHTML = `<span class="status-dot is-active" aria-hidden="true"></span>Active variant`;
      } else {
        hint.innerHTML = `<span class="status-dot" aria-hidden="true"></span>Not configured`;
      }
      card.appendChild(head);
      card.appendChild(stat);
      card.appendChild(hint);
      grid.appendChild(card);
    });
    view.appendChild(grid);
    refreshIcons();
    applyScrollReveal(view);
    ensurePageStartsAtTop();
    animateViewEnter();
  } catch (e) {
    const banner = document.createElement("div");
    banner.className = "error-banner";
    banner.textContent = e.message;
    view.appendChild(banner);
    animateViewEnter();
  }
}

async function renderSection(name) {
  ensurePageStartsAtTop();
  pageTitle.textContent = `${name[0].toUpperCase()}${name.slice(1)} Section`;
  pageHint.textContent =
    "Select variant, edit fields, toggle visibility, and save.";
  view.innerHTML = "";
  try {
    const data = await apiFetch(`/api/admin/section/${name}`);
    view.appendChild(renderEditor(name, data));
    ensurePageStartsAtTop();
    animateViewEnter();
  } catch (e) {
    const banner = document.createElement("div");
    banner.className = "error-banner";
    banner.textContent = e.message;
    view.appendChild(banner);
    animateViewEnter();
  }
}

function setActiveNav(route) {
  document.querySelectorAll(".nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${route}`);
  });
}

async function handleRoute() {
  if (!getJwt()) return;
  const hash = (window.location.hash || "#/dashboard").slice(1);
  const route = hash.startsWith("/") ? hash : `/${hash}`;
  if (route === "/dashboard" || route === "/") {
    setActiveNav("/dashboard");
    await renderDashboard();
    return;
  }
  const sec = route.replace("/", "");
  if (SECTIONS.includes(sec)) {
    setActiveNav(`/${sec}`);
    await renderSection(sec);
    return;
  }
  window.location.hash = "#/dashboard";
}

function showLoginError(msg) {
  loginError.textContent = msg || "";
  loginError.classList.toggle("hidden", !msg);
}

async function submitLogin() {
  showLoginError("");
  const email = loginEmail.value.trim();
  const password = loginPassword.value;
  const base = getApiBase().replace(/\/$/, "");
  if (!email || !password) {
    showLoginError("Enter email and password.");
    return;
  }
  loginSubmit.disabled = true;
  try {
    const res = await fetch(`${base}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      showLoginError(data.error || "Sign-in failed.");
      return;
    }
    localStorage.removeItem(LS_API);
    setJwt(data.token);
    await fetchPublicConfig();
    sidebarUserEmail.textContent = data.email || email;
    if (topNavUser) topNavUser.textContent = data.email || email;
    loginPassword.value = "";
    updateShell();
    toast("Welcome back!", "success", 1800);
    await handleRoute();
  } catch (e) {
    showLoginError(e.message || "Network error.");
  } finally {
    loginSubmit.disabled = false;
  }
}

function emailFromJwt(token) {
  try {
    const part = token.split(".")[1];
    if (!part) return "";
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json);
    return payload.email || "";
  } catch {
    return "";
  }
}

loginSubmit.addEventListener("click", submitLogin);
loginPassword.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitLogin();
});
loginEmail.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitLogin();
});

function doLogout() {
  setJwt("");
  localStorage.removeItem(LS_ASSET_ORIGIN);
  sidebarUserEmail.textContent = "";
  if (topNavUser) topNavUser.textContent = "";
  saveStatus.textContent = "";
  showLoginError("");
  updateShell();
  toast("Logged out successfully", "info", 1300);
  window.location.hash = "#/dashboard";
}

logoutBtn.addEventListener("click", doLogout);
topLogoutBtn?.addEventListener("click", doLogout);
logoutBtn.classList.add("logout");
topLogoutBtn?.classList.add("logout");

window.addEventListener("hashchange", () => {
  if (!getJwt()) return;
  handleRoute();
});

initReactToastify();
initThemeSystem();
updateShell();
refreshIcons();
if (getJwt()) {
  const user = emailFromJwt(getJwt());
  sidebarUserEmail.textContent = user;
  if (topNavUser) topNavUser.textContent = user;
  fetchPublicConfig().then(() => handleRoute());
}
