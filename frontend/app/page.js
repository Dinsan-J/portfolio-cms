import Copyright from "@/components/footers/Copyright";
import Footer1 from "@/components/footers/Footer1";
import DynamicHomeHeader from "@/components/headers/DynamicHomeHeader";
import Blogs from "@/components/common/Blogs";
import Brands from "@/components/common/Brands";
import Contact from "@/components/common/Contact2";
import Education from "@/components/common/Education2";
import Facts from "@/components/common/Facts";
import DynamicHomeHero from "@/components/homes/DynamicHomeHero";
import Portfolio from "@/components/common/Portfolio2";
import Services from "@/components/common/Services";
import Services2 from "@/components/common/Services3";
import Skills from "@/components/common/Skills";
import Skills2 from "@/components/common/Skills2";
import Testimonials from "@/components/homes/home-1/Testimonials";
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

export default async function Home() {
  const site = await getPublicSitePayload();
  const initialHeroVariant =
    typeof site?.sections?.hero?.variant === "string" &&
    /^hero\d+$/.test(site.sections.hero.variant)
      ? site.sections.hero.variant
      : "hero1";
  const initialNavbarVariant =
    typeof site?.sections?.navbar?.variant === "string" &&
    /^navbar\d+$/.test(site.sections.navbar.variant)
      ? site.sections.navbar.variant
      : "navbar1";
  const initialHeroContent = site?.sections?.hero?.content || null;
  const initialNavbarContent = getActiveSectionContent(site, "navbar");
  const aboutContent = getActiveSectionContent(site, "about");
  const servicesContent = getActiveSectionContent(site, "services");
  const projectsContent = getActiveSectionContent(site, "projects");
  const testimonialsContent = getActiveSectionContent(site, "testimonials");
  const footerContent = getActiveSectionContent(site, "footer");
  return (
    <>
      <DynamicHomeHeader
        initialVariant={initialNavbarVariant}
        initialNavbarContent={initialNavbarContent}
      />
      <DynamicHomeHero
        initialVariant={initialHeroVariant}
        initialHeroContent={initialHeroContent}
      />
      <Services />
      <Facts cmsContent={aboutContent?.homePageFacts} />
      <Skills cmsContent={aboutContent?.homePageSkills} />
      <Services2 cmsContent={servicesContent} />
      <Education cmsContent={aboutContent?.homePageEducation} />
      <Brands cmsContent={aboutContent?.homePageBrands} />
      <Portfolio cmsContent={projectsContent} />
      <Skills2 />
      <Testimonials cmsContent={testimonialsContent} />
      <Contact />
      <Blogs cmsContent={aboutContent?.homePageBlogs} />
      <Footer1 cmsContent={footerContent} />
      <Copyright />
      <CommonComponents />
    </>
  );
}
