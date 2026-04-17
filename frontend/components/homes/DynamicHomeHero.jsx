"use client";

import { useEffect, useState } from "react";
import Hero1 from "@/components/homes/home-1/Hero";
import Hero2 from "@/components/homes/home-2/Hero";
import Hero3 from "@/components/homes/home-3/Hero";
import Hero4 from "@/components/homes/home-4/Hero";
import Hero5 from "@/components/homes/home-5/Hero";
import Hero6 from "@/components/homes/home-6/Hero";
import Hero7 from "@/components/homes/home-7/Hero";
import Hero8 from "@/components/homes/home-8/Hero";
import Hero9 from "@/components/homes/home-9/Hero";
import Hero10 from "@/components/homes/home-10/Hero";
import Hero11 from "@/components/homes/home-11/Hero";
import Hero12 from "@/components/homes/home-12/Hero";
import Hero13 from "@/components/homes/home-13/Hero";
import Hero14 from "@/components/homes/home-14/Hero";
import Hero15 from "@/components/homes/home-15/Hero";
import Hero16 from "@/components/homes/home-16/Hero";
import Hero17 from "@/components/homes/home-17/Hero";
import Hero18 from "@/components/homes/home-18/Hero";
import Hero20 from "@/components/homes/home-20/Hero";
import Hero21 from "@/components/homes/home-21/Hero";
import Hero22 from "@/components/homes/home-22/Hero";

import { getCmsBaseUrl } from "@/lib/cmsMedia";

const HERO_BY_VARIANT = {
  hero1: Hero1,
  hero2: Hero2,
  hero3: Hero3,
  hero4: Hero4,
  hero5: Hero5,
  hero6: Hero6,
  hero7: Hero7,
  hero8: Hero8,
  hero9: Hero9,
  hero10: Hero10,
  hero11: Hero11,
  hero12: Hero12,
  hero13: Hero13,
  hero14: Hero14,
  hero15: Hero15,
  hero16: Hero16,
  hero17: Hero17,
  hero18: Hero18,
  hero20: Hero20,
  hero21: Hero21,
  hero22: Hero22,
};

function normalizeVariant(v) {
  if (v && typeof v === "string" && HERO_BY_VARIANT[v]) return v;
  return "hero1";
}

export default function DynamicHomeHero({
  initialVariant = "hero1",
  initialHeroContent = null,
}) {
  const [variant, setVariant] = useState(() =>
    normalizeVariant(initialVariant),
  );
  const [heroContent, setHeroContent] = useState(initialHeroContent);

  useEffect(() => {
    setVariant(normalizeVariant(initialVariant));
  }, [initialVariant]);

  useEffect(() => {
    setHeroContent(initialHeroContent);
  }, [initialHeroContent]);

  useEffect(() => {
    const cmsBase = getCmsBaseUrl();
    if (!cmsBase) return;
    let cancelled = false;
    fetch(`${cmsBase}/api/public/site`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.sections?.hero) return;
        if (data.sections.hero.variant) {
          setVariant(normalizeVariant(data.sections.hero.variant));
        }
        setHeroContent(data.sections.hero.content || null);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const Comp = HERO_BY_VARIANT[variant] || HERO_BY_VARIANT.hero1;
  return <Comp cmsContent={heroContent} />;
}
