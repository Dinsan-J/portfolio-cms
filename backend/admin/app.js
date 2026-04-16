const SECTIONS = [
  "navbar",
  "hero",
  "about",
  "services",
  "projects",
  "testimonials",
  "contact",
  "footer",
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
  services: "wrench",
  projects: "folder",
  testimonials: "message-circle",
  contact: "mail",
  footer: "layout-template",
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
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...authHeaders(),
    },
  });
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
  if (/^https?:\/\//i.test(val)) return true;
  if (!val.startsWith("/")) return false;
  if (/\.(png|jpe?g|gif|webp|svg)$/i.test(val)) return true;
  return /(src|image|logo|icon|photo|banner|bg|avatar|thumb)/i.test(
    String(key),
  );
}

function fieldIconName(label, value) {
  const key = String(label || "").toLowerCase();
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

function preferredKeyOrder(section, contentRoot) {
  if (section === "hero") {
    // Covers both canonical (`hero1`, `hero2`) and scanned shapes.
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
      // scanned/extracted helpers
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
    return ["logo", "tagline", "columns", "socialLinks", "copyrightText"];
  }
  // default: no preferred order
  return Object.keys(contentRoot || {});
}

function sortKeysForSection(section, root) {
  const preferred = preferredKeyOrder(section, root);
  const index = new Map(preferred.map((k, i) => [k, i]));
  return Object.keys(root || {}).sort((a, b) => {
    const ia = index.has(a) ? index.get(a) : Number.MAX_SAFE_INTEGER;
    const ib = index.has(b) ? index.get(b) : Number.MAX_SAFE_INTEGER;
    if (ia !== ib) return ia - ib;
    return String(a).localeCompare(String(b));
  });
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
  if (looksLikeImageField(keyName, value)) {
    const preview = document.createElement("div");
    preview.className = "preview";
    const img = document.createElement("img");
    const resolved = /^https?:\/\//i.test(value)
      ? value
      : `${mediaBaseForPath(value)}${value}`;
    img.src = resolved;
    img.alt = "";
    preview.appendChild(img);

    const uploadBtn = document.createElement("button");
    uploadBtn.type = "button";
    uploadBtn.className = "btn upload small";
    uploadBtn.innerHTML = withIcon("image-up", "Upload image");
    uploadBtn.style.marginTop = "8px";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
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
        img.src = /^https?:\/\//i.test(data.url) ? data.url : `${base}${data.url}`;
        onChange();
        toast("Image uploaded successfully 📷", "success");
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

function renderNode({ key, value, path, contentRoot, onChange }) {
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
    title.textContent = `${key} [${value.length}]`;
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
        Object.keys(item)
          .sort()
          .forEach((k) => {
            sub.appendChild(
              renderNode({
                key: k,
                value: item[k],
                path: [...childPath, k],
                contentRoot,
                onChange,
              }),
            );
          });
      } else {
        sub.appendChild(
          renderPrimitiveField({
            label: key,
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
    title.textContent = key;
    group.appendChild(title);
    Object.keys(value)
      .sort()
      .forEach((k) => {
        group.appendChild(
          renderNode({
            key: k,
            value: value[k],
            path: [...path, k],
            contentRoot,
            onChange,
          }),
        );
      });
    return group;
  }

  return renderPrimitiveField({
    label: key,
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
    sortKeysForSection(section, working).forEach((k) => {
        editorMount.appendChild(
          renderNode({
            key: k,
            value: working[k],
            path: [k],
            contentRoot: working,
            onChange: (hard) => paint(hard, true),
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
      syncVariantOptionLabels();
      liveInput.checked = true;
      paint(true);
      toast(`${currentVariant} is now live`, "success");
    } catch (e) {
      variantSelect.value = previousValue;
      currentVariant = previousValue;
      const revert = data.variants.find((v) => v.variant === currentVariant);
      working = JSON.parse(JSON.stringify(revert?.content || {}));
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
      await apiFetch(`/api/admin/section/${section}`, {
        method: "PUT",
        body: JSON.stringify({
          variant: currentVariant,
          content: working,
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
      hint.className = "muted";
      hint.textContent = live ? "Active variant" : "Not configured";
      card.appendChild(head);
      card.appendChild(stat);
      card.appendChild(hint);
      grid.appendChild(card);
    });
    view.appendChild(grid);
    refreshIcons();
    applyScrollReveal(view);
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
  pageTitle.textContent = `${name[0].toUpperCase()}${name.slice(1)} Section`;
  pageHint.textContent =
    "Select variant, edit fields, toggle visibility, and save.";
  view.innerHTML = "";
  try {
    const data = await apiFetch(`/api/admin/section/${name}`);
    view.appendChild(renderEditor(name, data));
    applyScrollReveal(view);
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
