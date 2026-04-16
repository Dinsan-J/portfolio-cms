"use client";

import { useEffect, useState } from "react";
import Header1 from "@/components/headers/Header1";
import Header2 from "@/components/headers/Header2";
import Header3 from "@/components/headers/Header3";
import Header4 from "@/components/headers/Header4";
import Header5 from "@/components/headers/Header5";

import { getCmsBaseUrl } from "@/lib/cmsMedia";

const HEADER_BY_VARIANT = {
  navbar1: Header1,
  navbar2: Header2,
  navbar3: Header3,
  navbar4: Header4,
  navbar5: Header5,
};

function normalizeVariant(v) {
  if (v && typeof v === "string" && HEADER_BY_VARIANT[v]) return v;
  return "navbar1";
}

export default function DynamicHomeHeader({
  initialVariant = "navbar1",
  initialNavbarContent = null,
}) {
  const [variant, setVariant] = useState(() => normalizeVariant(initialVariant));
  const [navbarContent, setNavbarContent] = useState(initialNavbarContent);

  useEffect(() => {
    setVariant(normalizeVariant(initialVariant));
  }, [initialVariant]);

  useEffect(() => {
    setNavbarContent(initialNavbarContent);
  }, [initialNavbarContent]);

  useEffect(() => {
    const cmsBase = getCmsBaseUrl();
    if (!cmsBase) return;
    let cancelled = false;
    fetch(`${cmsBase}/api/public/site`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.sections?.navbar) return;
        if (data.sections.navbar.variant) {
          setVariant(normalizeVariant(data.sections.navbar.variant));
        }
        setNavbarContent(data.sections.navbar.content || null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const Comp = HEADER_BY_VARIANT[variant] || HEADER_BY_VARIANT.navbar1;
  return <Comp cmsContent={navbarContent} />;
}

