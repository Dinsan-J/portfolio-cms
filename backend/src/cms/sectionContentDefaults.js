import { footerLinks, footerLinksWhite } from "../seed/staticSiteData.js";

function deepMerge(base, override) {
  if (override === undefined || override === null) {
    return base !== undefined && base !== null
      ? JSON.parse(JSON.stringify(base))
      : override;
  }
  if (Array.isArray(override)) return override.slice();
  if (typeof override !== "object") return override;
  if (Array.isArray(base)) return override.slice();
  if (typeof base !== "object" || base === null) return { ...override };
  const out = { ...base };
  for (const k of Object.keys(override)) {
    const bv = base[k];
    const ov = override[k];
    if (
      ov &&
      typeof ov === "object" &&
      !Array.isArray(ov) &&
      bv &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      out[k] = deepMerge(bv, ov);
    } else {
      out[k] = ov;
    }
  }
  return out;
}

const defaultContactItems = [
  {
    iconClass: "fa-solid fa-envelope",
    type: "email",
    display: "example@gmail.com",
    href: "#",
  },
  {
    iconClass: "fa-solid fa-location-dot",
    type: "text",
    display: "3891 Ranchview Dr. Richardson",
  },
  {
    iconClass: "fa-solid fa-phone",
    type: "phone",
    display: "01245789321",
    href: "#",
  },
];

const defaultSocialLinks = [
  { iconClass: "fa-brands fa-instagram", href: "#" },
  { iconClass: "fa-brands fa-linkedin-in", href: "#" },
  { iconClass: "fa-brands fa-twitter", href: "#" },
  { iconClass: "fa-brands fa-facebook-f", href: "#" },
];

const sharedFooterColumns = {
  darkLogo: "/assets/images/logo/white-logo-reeni.png",
  lightLogo: "/assets/images/logo/logo-white.png",
  logoAlt:
    "Reeni - Personal Portfolio HTML Template for developers and freelancers",
  descriptionLine1: "Get Ready",
  descriptionLine2: "To Create Great",
  newsletter: {
    placeholder: "Email Adress",
    envelopeIconClass: "fa-regular fa-envelope",
  },
  quickLinksTitle: "Quick Link",
  footerLinks,
  footerLinksWhite,
  contactTitle: "Contact",
  contactItems: defaultContactItems,
  socialLinks: defaultSocialLinks,
};

const defaultCopyright = {
  component: "Copyright",
  ownerLink: "https://themeforest.net/user/inversweb/portfolio",
  ownerLabel: "Inversweb",
  rightsText: "| All Rights Reserved",
  legalLinksDark: [
    { label: "Trams & Condition", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Contact Us", href: "/contact", isNextLink: true },
  ],
  legalLinksLight: [
    { label: "Trams & Condition", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Contact Us", href: "/contact-white", isNextLink: true },
  ],
};

const footer5MenuDark = [
  { label: "Latest Blog", href: "/blog", isNextLink: true },
  { label: "Terms And Condition", href: "#" },
  { label: "Contact Us", href: "/contact", isNextLink: true },
];

const footer5MenuLight = [
  { label: "Latest Blog", href: "/blog-white", isNextLink: true },
  { label: "Terms And Condition", href: "#" },
  { label: "Contact Us", href: "/contact-white", isNextLink: true },
];

const footer5Social = [
  { iconClass: "fa-brands fa-facebook-f", href: "https://www.facebook.com/" },
  { iconClass: "fa-brands fa-twitter", href: "https://www.twitter.com" },
  { iconClass: "fa-brands fa-instagram", href: "https://www.instagram.com/" },
  { iconClass: "fa-brands fa-linkedin-in", href: "https://www.linkdin.com/" },
];

export const FOOTER_DEFAULTS = {
  footer1: {
    footer: {
      component: "Footer1",
      ...sharedFooterColumns,
    },
    copyright: { ...defaultCopyright },
  },
  footer2: {
    component: "Footer2",
    footer: {
      component: "Footer2",
      ...sharedFooterColumns,
      description:
        "The personal portfolio category includes websites or physical displays",
    },
    newsletterSection: {
      title: "Newslatter",
      para: "The personal portfolio categor includes the a websites or representation",
      placeholder: "Your e-mail",
      iconClass: "fa-solid fa-arrow-right",
    },
  },
  footer3: {
    component: "Footer3",
    footer: {
      component: "Footer3",
      ...sharedFooterColumns,
      descriptionLine2: "Create Great",
    },
  },
  footer4: {
    component: "Footer4",
    darkLogo: sharedFooterColumns.darkLogo,
    lightLogo: sharedFooterColumns.lightLogo,
    logoAlt: sharedFooterColumns.logoAlt,
    copyright: {
      linePrefix: " . All rights reserved by ",
      ownerLabel: "Inversweb.",
      ownerHref: "https://themeforest.net/user/inversweb/portfolio",
    },
  },
  footer5: {
    component: "Footer5",
    cta: {
      titleLine1: "Ready to start creating a",
      titleLine2: "standard website?",
      subtitle: "Finest choice for your home & office",
      buttonText: "Purchase Reeni",
      buttonHref:
        "https://themeforest.net/item/reeni-personal-portfolio-html-template/56387656",
    },
    menuDark: footer5MenuDark.map((x) => ({ ...x })),
    menuLight: footer5MenuLight.map((x) => ({ ...x })),
    socialLinks: footer5Social.map((x) => ({ ...x })),
    copyright: {
      rightsPrefix: "Copyright All rights reserved",
      ownerLabel: "Inversweb",
      ownerHref: "https://themeforest.net/user/inversweb/portfolio",
    },
  },
};

/** services2 variant uses Services3.jsx — matches cmsContent shape */
const SERVICES2_DEFAULT = {
  component: "Services3",
  sectionId: "service",
  sectionHead: {
    subtitle: "Latest Service",
    titleLines: ["Inspiring The World One", "Project"],
    description:
      "Business consulting consultants provide expert advice and guida businesses to help them improve their performance, efficiency, and organizational",
  },
  items: [],
  sideImage: {
    src: "/assets/images/services/latest-services-user-image-two.png",
    width: 1134,
    height: 1176,
    alt: "latest-user-image",
  },
};

const SERVICES_SCAFFOLD_DEFAULTS = {
  services2: SERVICES2_DEFAULT,
  services3: {
    component: "Services2",
    sectionHead: {
      subtitle: "Latest Service",
      titleLines: ["Inspiring The World One", "Project"],
      description:
        "Business consulting consultants provide expert advice and guida businesses to help them improve their performance, efficiency, and organizational",
    },
    items: [],
    sideImage: {
      src: "/assets/images/services/latest-services-user-image-two.png",
      width: 567,
      height: 588,
      alt: "latest-user-image",
    },
  },
  services4: {
    component: "Services4",
    sectionHead: {
      subtitle: "Latest Service",
      titleLines: ["Inspiring The World One", "Project"],
      description: "",
    },
    items: [],
  },
  services5: {
    component: "Services5",
    sectionHead: { subtitle: "", titleLines: ["", ""], description: "" },
    items: [],
  },
  services6: {
    component: "Services6",
    sectionHead: { subtitle: "", titleLines: ["", ""], description: "" },
    items: [],
  },
};

const CONTACT_SCAFFOLD_DEFAULTS = {
  contact2: {
    component: "Contact",
    sectionTitle: "Contact",
    subtitle: "",
    form: { fields: [] },
  },
  contact3: {
    component: "Contact3",
    sectionTitle: "Contact",
    subtitle: "",
    form: { fields: [] },
  },
};

const PROJECTS_SCAFFOLD_DEFAULTS = {
  projects2: {
    component: "Portfolio",
    sectionHead: { titleLines: ["", ""], subtitle: "", description: "" },
    items: [],
  },
  projects3: {
    component: "Portfolio3",
    sectionHead: { titleLines: ["", ""], subtitle: "", description: "" },
    items: [],
  },
};

const BLOGS_DEFAULTS = {
  component: "Blogs",
  parentClassDefault: "blog-and-news-are tmp-section-gap",
  sectionId: "blog",
  sectionHead: {
    subtitle: "Blog and news",
    titleLines: [
      "Elevating Personal Branding the",
      "through Powerful Portfolios",
    ],
  },
  posts: [],
  recentPosts: [],
  categories: [],
  tags: [],
  readMoreLabel: "Read More",
  readMoreIcon: "fa-solid fa-angle-right",
  sidebar: {
    about: {
      title: "About Me",
      imageSrc: "/assets/images/blog/about-me-user-img.png",
      name: "Fatima Afrafy",
      role: "UI/UX Designer",
      description:
        "Aliquam eros justo, posuere loborti viverra ullamcorper posuere viverra .Aliquam eros justo, posuere justo, posuere.",
      socialLinks: [
        { iconClass: "fa-brands fa-instagram", href: "#" },
        { iconClass: "fa-brands fa-linkedin-in", href: "#" },
        { iconClass: "fa-brands fa-twitter", href: "#" },
        { iconClass: "fa-brands fa-facebook-f", href: "#" },
      ],
    },
  },
};

export function mergeWithSectionDefaults(sectionName, variant, content) {
  const v = String(variant || "");
  if (sectionName === "footer" && FOOTER_DEFAULTS[v]) {
    return deepMerge(FOOTER_DEFAULTS[v], content || {});
  }
  if (sectionName === "services" && SERVICES_SCAFFOLD_DEFAULTS[v]) {
    return deepMerge(SERVICES_SCAFFOLD_DEFAULTS[v], content || {});
  }
  if (sectionName === "contact" && CONTACT_SCAFFOLD_DEFAULTS[v]) {
    return deepMerge(CONTACT_SCAFFOLD_DEFAULTS[v], content || {});
  }
  if (sectionName === "projects" && PROJECTS_SCAFFOLD_DEFAULTS[v]) {
    return deepMerge(PROJECTS_SCAFFOLD_DEFAULTS[v], content || {});
  }
  if (sectionName === "blogs") {
    return deepMerge(BLOGS_DEFAULTS, content || {});
  }
  return content && typeof content === "object" ? { ...content } : {};
}
