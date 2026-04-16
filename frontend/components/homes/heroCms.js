export function getHeroTitleLine(content, fallback) {
  const fromCanonical = content?.titleLine1;
  if (typeof fromCanonical === "string" && fromCanonical.trim()) {
    return fromCanonical.trim();
  }

  const fromScanned = content?.headings?.h1?.[0];
  if (typeof fromScanned === "string" && fromScanned.trim()) {
    return fromScanned.trim();
  }

  return fallback;
}

export function getHeroSubtitle(content, fallback) {
  const candidates = [
    content?.helloSubtitle,
    content?.subtitle,
    content?.spanTextsSample?.[0],
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

export function getHeroTypedStrings(content, fallback) {
  if (Array.isArray(content?.typedStrings) && content.typedStrings.length) {
    return content.typedStrings;
  }

  return fallback;
}

export function getHeroDescription(content, fallback) {
  const candidates = [
    content?.description,
    content?.descriptionHtmlSegments?.fullText,
    content?.paragraphs?.[0],
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

export function getHeroButtonLabel(content, fallback) {
  const candidates = [
    content?.primaryCta?.buttonText,
    content?.buttonLabels?.[0],
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

export function getHeroButtonHref(content, fallback = "#") {
  const href = content?.primaryCta?.href;
  if (typeof href === "string" && href.trim()) {
    return href;
  }

  return fallback;
}

export function getHeroMainImage(content, fallback) {
  const candidates = [
    content?.bannerImage,
    content?.mainImage,
    content?.thumbnailImage,
  ];

  for (const obj of candidates) {
    if (obj && typeof obj === "object") {
      const src = obj.src;
      if (typeof src === "string" && src.trim()) {
        return {
          src: src.trim(),
          width: obj.width,
          height: obj.height,
          alt: obj.alt,
        };
      }
    }
  }

  const fromScannedComponent = content?.imageComponents?.[0];
  if (fromScannedComponent && typeof fromScannedComponent === "object") {
    const src = fromScannedComponent.src;
    if (typeof src === "string" && src.trim()) {
      return {
        src: src.trim(),
        width: fromScannedComponent.width,
        height: fromScannedComponent.height,
        alt: fromScannedComponent.alt,
      };
    }
  }

  const fromSrcScan = content?.imagesFromSrcScan?.[0]?.src;
  if (typeof fromSrcScan === "string" && fromSrcScan.trim()) {
    return { src: fromSrcScan.trim() };
  }

  return fallback;
}
