import Copyright from "@/components/footers/Copyright";
import Footer2 from "@/components/footers/Footer2";
import Footer3 from "@/components/footers/Footer3";
import Footer4 from "@/components/footers/Footer4";
import Footer5 from "@/components/footers/Footer5";
import Footer1 from "@/components/footers/Footer1";
import DynamicHomeHeader from "@/components/headers/DynamicHomeHeader";
import Blogs from "@/components/common/Blogs";
import Brands from "@/components/common/Brands";
import Contact from "@/components/common/Contact2";
import ContactAlt from "@/components/common/Contact";
import Contact3 from "@/components/common/Contact3";
import Education from "@/components/common/Education2";
import Facts from "@/components/common/Facts";
import DynamicHomeHero from "@/components/homes/DynamicHomeHero";
import Portfolio from "@/components/common/Portfolio2";
import Services from "@/components/common/Services";
import Skills from "@/components/common/Skills";
import Skills2 from "@/components/common/Skills2";
import Testimonials from "@/components/homes/home-1/Testimonials";
import TestimonialsAlt from "@/components/common/Testimonials";
import CommonComponents from "@/components/common/CommonComponents";

export const metadata = {
  title:
    "Home 01 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Reeni is a modern personal portfolio template for designers, developers, content writer, cleaner, programmer, fashion designer, model, Influencer and freelancers. Fully responsive, SEO-friendly, Bootstrap and easy to customize.",
};
function getCmsBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_CMS_URL;
  if (fromEnv) return String(fromEnv).replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:4000";
  return "";
}

async function getPublicSitePayload() {
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

function getActiveSectionContent(site, sectionName) {
  return site?.sections?.[sectionName]?.content || null;
}

const pageSections = [
  "navbar",
  "hero",
  "services",
  "facts",
  "skills",
  "education",
  "brands",
  "portfolio",
  "skills2",
  "testimonials",
  "contact",
  "blogs",
  "footer",
  "copyright",
  "common",
];

function getSectionData(site, sectionName) {
  const aboutContent = site?.sections?.about?.content;
  if (sectionName === "facts" && aboutContent?.homePageFacts) {
    return { variant: "facts1", content: aboutContent.homePageFacts };
  }
  if (sectionName === "skills" && aboutContent?.homePageSkills) {
    return { variant: "skills1", content: aboutContent.homePageSkills };
  }
  if (sectionName === "education" && aboutContent?.homePageEducation) {
    return { variant: "education1", content: aboutContent.homePageEducation };
  }
  if (sectionName === "brands" && aboutContent?.homePageBrands) {
    return { variant: "brands1", content: aboutContent.homePageBrands };
  }
  if (sectionName === "blogs" && aboutContent?.homePageBlogs) {
    return { variant: "blogs1", content: aboutContent.homePageBlogs };
  }
  if (sectionName === "skills2" && aboutContent?.homePageSkills2) {
    return { variant: "skills21", content: aboutContent.homePageSkills2 };
  }

  const section = site?.sections?.[sectionName];
  if (section) return section;
  if (sectionName === "portfolio" && site?.sections?.projects) {
    return site.sections.projects;
  }
  if (sectionName === "copyright") {
    if (site?.sections?.footer?.content?.copyright) {
      return { variant: "copyright1", content: site.sections.footer.content.copyright };
    }
    // Keep default copyright visible for non-footer5 variants even when
    // there is no explicit active copyright section in DB.
    if (site?.sections?.footer?.variant !== "footer5") {
      return { variant: "copyright1", content: {} };
    }
  }
  if (sectionName === "common") {
    return { variant: "common1", content: {} };
  }
  return null;
}

export default async function Home() {
  const site = await getPublicSitePayload();
  const componentMap = {
    navbar: {
      default: ({ sectionData }) => (
        <DynamicHomeHeader
          initialVariant={sectionData?.variant || "navbar1"}
          initialNavbarContent={sectionData?.content || null}
        />
      ),
    },
    hero: {
      default: ({ sectionData }) => (
        <DynamicHomeHero
          initialVariant={sectionData?.variant || "hero1"}
          initialHeroContent={sectionData?.content || null}
        />
      ),
    },
    services: { services1: Services, default: Services },
    facts: { default: Facts },
    skills: { default: Skills },
    education: { default: Education },
    brands: { default: Brands },
    portfolio: { default: Portfolio },
    skills2: { default: Skills2 },
    testimonials: {
      testimonials1: Testimonials,
      testimonials2: TestimonialsAlt,
      testimonials3: TestimonialsAlt,
      default: Testimonials,
    },
    contact: { contact1: Contact, contact2: Contact, contact3: Contact, default: Contact },
    blogs: { default: Blogs },
    footer: {
      footer1: Footer1,
      footer2: Footer2,
      footer3: Footer3,
      footer4: Footer4,
      footer5: Footer5,
      default: Footer1,
    },
    copyright: { default: Copyright },
    common: { default: CommonComponents },
  };

  const renderSection = (sectionName) => {
    const activeFooterVariant = site?.sections?.footer?.variant;
    if (sectionName === "copyright" && activeFooterVariant === "footer5") {
      // Footer5 already includes its own bottom copyright strip.
      return null;
    }
    const sectionData = getSectionData(site, sectionName);
    if (!sectionData && sectionName !== "common") return null;
    const variant = sectionData?.variant || "default";
    const variantMap = componentMap[sectionName] || {};
    const SectionComponent = variantMap[variant] || variantMap.default;
    if (!SectionComponent) return null;
    if (sectionName === "navbar") {
      return (
        <DynamicHomeHeader
          key={sectionName}
          initialVariant={sectionData?.variant || "navbar1"}
          initialNavbarContent={sectionData?.content || null}
        />
      );
    }
    if (sectionName === "hero") {
      return (
        <DynamicHomeHero
          key={sectionName}
          initialVariant={sectionData?.variant || "hero1"}
          initialHeroContent={sectionData?.content || null}
        />
      );
    }
    return <SectionComponent key={sectionName} cmsContent={sectionData?.content || null} />;
  };

  return (
    <>
      {pageSections.map((sectionName) => renderSection(sectionName))}
    </>
  );
}
