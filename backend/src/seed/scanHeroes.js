import fs from "fs";
import path from "path";

function extractTyperStrings(source) {
  const m = source.match(/strings=\{\[([\s\S]*?)\]\s*\}/);
  if (!m) return [];
  const inner = m[1];
  const out = [];
  const re = /"((?:\\.|[^"\\])*)"/g;
  let x;
  while ((x = re.exec(inner))) {
    try {
      out.push(JSON.parse(`"${x[1]}"`));
    } catch {
      out.push(x[1]);
    }
  }
  return out;
}

function extractImages(source) {
  const imgs = [];
  const patterns = [
    /src=\{\s*`([^`]+)`\s*\}/g,
    /src=\{\s*"([^"]+)"\s*\}/g,
    /src="([^"]+)"/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(source))) {
      imgs.push({ src: m[1] });
    }
  }
  const uniq = [];
  const seen = new Set();
  for (const im of imgs) {
    if (!seen.has(im.src)) {
      seen.add(im.src);
      uniq.push(im);
    }
  }
  return uniq;
}

function extractImageProps(source) {
  const blocks = [...source.matchAll(/<Image([\s\S]*?)\/>/g)];
  return blocks.map(([, inner]) => {
    const pick = (name) => {
      const mm = inner.match(new RegExp(`${name}=\\{\\s*([^}]+)\\s*\\}`));
      if (mm) return mm[1].trim();
      const mm2 = inner.match(new RegExp(`${name}="([^"]*)"`));
      return mm2 ? mm2[1].trim() : undefined;
    };
    return {
      src: pick("src"),
      alt: pick("alt"),
      width: pick("width"),
      height: pick("height"),
    };
  });
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractTextBetweenTags(source, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const out = [];
  let m;
  while ((m = re.exec(source))) {
    const t = stripTags(m[1]);
    if (t) out.push(t);
  }
  return out;
}

export function scanHeroVariants(frontendRoot) {
  const homesDir = path.join(frontendRoot, "components", "homes");
  if (!fs.existsSync(homesDir)) return [];

  const dirs = fs
    .readdirSync(homesDir)
    .filter((d) => /^home-\d+$/.test(d))
    .sort((a, b) => {
      const na = parseInt(a.split("-")[1], 10);
      const nb = parseInt(b.split("-")[1], 10);
      return na - nb;
    });

  return dirs.map((dir) => {
    const n = dir.split("-")[1];
    const variant = `hero${n}`;
    const file = path.join(homesDir, dir, "Hero.jsx");
    if (!fs.existsSync(file)) {
      return { variant, content: { sourceFile: `${dir}/Hero.jsx`, missing: true } };
    }
    const source = fs.readFileSync(file, "utf8");
    const typerStrings = extractTyperStrings(source);
    const imagesFlat = extractImages(source);
    const imageComponents = extractImageProps(source);
    const h1Texts = extractTextBetweenTags(source, "h1");
    const h2Texts = extractTextBetweenTags(source, "h2");
    const h3Texts = extractTextBetweenTags(source, "h3");
    const h4Texts = extractTextBetweenTags(source, "h4");
    const paragraphs = extractTextBetweenTags(source, "p");
    const spanSubtitles = extractTextBetweenTags(source, "span");
    const btnTexts = [...source.matchAll(/btn-text">\s*([^<]+)/g)].map((m) =>
      m[1].trim()
    );

    return {
      variant,
      content: {
        sourceFile: `${dir}/Hero.jsx`,
        typerStrings,
        imagesFromSrcScan: imagesFlat,
        imageComponents,
        headings: { h1: h1Texts, h2: h2Texts, h3: h3Texts, h4: h4Texts },
        paragraphs,
        spanTextsSample: spanSubtitles.slice(0, 20),
        buttonLabels: btnTexts,
      },
    };
  });
}
