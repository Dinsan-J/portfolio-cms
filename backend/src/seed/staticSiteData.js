/** Snapshot of frontend static data (read-only extraction). */

export const menuItems = [
  { label: "Home", href: "#", isLink: false },
  { label: "About", href: "/about", isLink: true },
  {
    label: "Services",
    href: "#",
    hasDropdown: true,
    submenu: [
      { label: "Service", href: "/service" },
      { label: "Service Details", href: "/service-details/success-architects" },
    ],
  },
  {
    label: "Blog",
    href: "#",
    hasDropdown: true,
    submenu: [
      { label: "Blog Classic", href: "/blog" },
      {
        label: "Blog Details",
        href: "/blog-details/lets-bring-your-ideas-to-life-contact-me-and-lets",
      },
    ],
  },
  {
    label: "Project",
    href: "#",
    hasDropdown: true,
    submenu: [
      { label: "Project", href: "/project" },
      {
        label: "Project Details",
        href: "/project-details/my-portfolio-of-innovation",
      },
    ],
  },
  { label: "Contact", href: "/contact", isLink: true },
];

export const menuItemsLight = [
  { label: "Home", href: "#", isLink: false },
  { label: "About", href: "/about-white", isLink: true },
  {
    label: "Services",
    href: "#",
    hasDropdown: true,
    submenu: [
      { label: "Service", href: "/service-white" },
      {
        label: "Service Details",
        href: "/service-details-white/success-architects",
      },
    ],
  },
  {
    label: "Blog",
    href: "#",
    hasDropdown: true,
    submenu: [
      { label: "Blog Classic", href: "/blog-white" },
      {
        label: "Blog Details",
        href: "/blog-details-white/lets-bring-your-ideas-to-life-contact-me-and-lets",
      },
    ],
  },
  {
    label: "Project",
    href: "#",
    hasDropdown: true,
    submenu: [
      { label: "Project", href: "/project-white" },
      {
        label: "Project Details",
        href: "/project-details-white/my-portfolio-of-innovation",
      },
    ],
  },
  { label: "Contact", href: "/contact-white", isLink: true },
];

export const onepageNavItems = [
  { id: 1, href: "#home", text: "Home" },
  { id: 2, href: "#about", text: "About" },
  { id: 3, href: "#service", text: "Services" },
  { id: 4, href: "#portfolio", text: "Portfolio" },
  { id: 5, href: "#resume", text: "Resume" },
  { id: 6, href: "#pricing", text: "Pricing" },
  { id: 7, href: "#blog", text: "Blog" },
  { id: 8, href: "#contacts", text: "Contact" },
];

export const servicesIconGrid = [
  {
    id: 1,
    icon: "fa-light fa-pen-ruler",
    title: "Web Design",
    projects: "120 Projects",
    animationOrder: "1",
    slug: "web-design",
  },
  {
    id: 2,
    icon: "fa-light fa-bezier-curve",
    title: "Ui/Ux Design",
    projects: "241 Projects",
    animationOrder: "2",
    slug: "uiux-design",
  },
  {
    id: 3,
    icon: "fa-light fa-lightbulb",
    title: "Web Research",
    projects: "240 Projects",
    animationOrder: "3",
    slug: "web-research",
  },
  {
    id: 4,
    icon: "fa-light fa-envelope",
    title: "Marketing",
    projects: "331 Prodect",
    animationOrder: "4",
    slug: "marketing",
  },
];

export const services5 = [
  {
    title: "A Portfolio of Creativity",
    description:
      "Business consulting consultants provide expert advice and guida the a businesses to help theme their performance efficiency",
  },
  {
    title: "My Portfolio of Innovation",
    description:
      "My work is driven by the belief that thoughtful design and strategic planning can empower brands, transform businesses",
  },
  {
    title: "A Showcase of My Projects",
    description:
      "In this portfolio, you’ll find a curated selection of projects that highlight my skills in [Main Areas, e.g., responsive web design",
  },
];

export const portfolioItems2 = [
  {
    id: 1,
    animationOrder: 1,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-1.jpg",
    width: 1920,
    height: 1572,
    title: "Digital Transformation Advisors",
    description: "Development Coaches",
    slug: "digital-transformation-advisors",
  },
  {
    id: 2,
    animationOrder: 2,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-2.jpg",
    width: 1939,
    height: 1572,
    title: "My work is driven by the belief that thoughtful",
    description: "Development App",
    slug: "my-work-is-driven-by-the-belief-that-thoughtful",
  },
  {
    id: 3,
    animationOrder: 3,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-3.jpg",
    width: 1939,
    height: 1572,
    title: "In this portfolio, you'll find a curated selection",
    description: "Web Design",
    slug: "in-this-portfolio-youll-find-a-curated-selection",
  },
  {
    id: 4,
    animationOrder: 4,
    imageSrc: "/assets/images/latest-portfolio/portfoli-img-4.jpg",
    width: 1939,
    height: 1572,
    title: "I've had the privilege of working with various",
    description: "App Development",
    slug: "ive-had-the-privilege-of-working-with-various",
  },
];

export const testimonials1 = [
  {
    id: 1,
    quote:
      "Working with themespark was an absolute pleasure! They understood my vision immediately and brought it to life even better than I'd imagined.",
    name: "Cameron Williamson",
    role: "Ui/Ux Designer",
    bgImage: "/assets/images/testimonial/bg-image-1png.png",
    width: 630,
    height: 720,
    animationClass: "animation-order-1",
  },
  {
    id: 2,
    quote:
      "ThemesPark is incredibly talented and detail-oriented. They took the time to understand my brand and created something truly unique",
    name: "Cameron Williamson",
    role: "Ui/Ux Designer",
    bgImage: "/assets/images/testimonial/bg-image-2.png",
    width: 444,
    height: 484,
    animationClass: "animation-order-2",
  },
  {
    id: 3,
    quote:
      "A personal portfolio is a curated collection of an individual's professional work, showcasing their skills, experience, and achievements",
    name: "Cameron Williamson",
    role: "Ui/Ux Designer",
    bgImage: "/assets/images/testimonial/bg-image-1png.png",
    width: 630,
    height: 720,
    animationClass: "animation-order-3",
  },
];

export const testimonials2 = [
  {
    name: "Theresa Webb",
    role: "Ui/Ux Designer",
    image: "/assets/images/testimonial/client-img-1.jpg",
    text: "Their expertise is apparent in every step of the project. I'm thrilled with the outcome and would definitely work with them again! definitely work with them again",
    stars: 5,
  },
  {
    name: "Theresa Webb",
    role: "Ui/Ux Designer",
    image: "/assets/images/testimonial/client-img-1.jpg",
    text: "They were communicative, attentive, and exceeded all project goals. The quality and attention to detail were top-notch. Five stars aren't enough! Five stars aren't enough.",
    stars: 5,
  },
  {
    name: "Theresa Webb",
    role: "Ui/Ux Designer",
    image: "/assets/images/testimonial/client-img-1.jpg",
    text: "Financial planners help people knowledge about to how toio invest and save the money the most of us efficient way ever. Many people all across in the of country use them help peopl and save",
    stars: 5,
  },
  {
    name: "Theresa Webb",
    role: "Ui/Ux Designer",
    image: "/assets/images/testimonial/client-img-1.jpg",
    text: "They understood my vision immediately and brought it to life even better than I'd imagined. Professional, creative, and always on time – I couldn't be happier with the results!",
    stars: 5,
  },
];

export const testimonials3 = [
  {
    name: "Cameron Williamson",
    role: "Ui/Ux Designer",
    text: "A personal portfolio is a curated collection of an individual's professional work, showcasing their skilA personal portfolio is a curated collection of an individual's professional work, showcasing their skills,",
    animationOrder: "1",
  },
  {
    name: "Leslie Alexander",
    role: "Ui/Ux Designer",
    text: "A personal portfolio is a curated collection of an individual's professional work, showcasing their skilA personal portfolio is a curated collection of an individual's professional work, showcasing their skills,",
    animationOrder: "2",
  },
  {
    name: "Cameron Williamson",
    role: "Ui/Ux Designer",
    text: "A personal portfolio is a curated collection of an individual's professional work, showcasing their skilA personal portfolio is a curated collection of an individual's professional work, showcasing their skills,",
    animationOrder: "1",
  },
  {
    name: "Leslie Alexander",
    role: "Ui/Ux Designer",
    text: "A personal portfolio is a curated collection of an individual's professional work, showcasing their skilA personal portfolio is a curated collection of an individual's professional work, showcasing their skills,",
    animationOrder: "2",
  },
];

export const footerLinks = [
  { href: "/about", label: "About Me" },
  { href: "/service", label: "Service" },
  { href: "/contact", label: "Contact Me" },
  { href: "/blog", label: "Blog Post" },
  { href: "/contact", label: "Pricing" },
];

export const footerLinksWhite = [
  { href: "/about-white", label: "About Me" },
  { href: "/service-white", label: "Service" },
  { href: "/contact-white", label: "Contact Me" },
  { href: "/blog-white", label: "Blog Post" },
  { href: "/contact-white", label: "Pricing" },
];

export const counters = [
  { count: 20, suffix: "k+", text: "Our Project Complete", order: 1 },
  { count: 10, suffix: "k+", text: "Our Natural Products", order: 2 },
  { count: 200, suffix: "+", text: "Clients Reviews", order: 3 },
  { count: 1000, suffix: "+", text: "our Satisfied Clientd", order: 4 },
];

export const educationExperienceData = [
  {
    role: "Trainer Marketing",
    duration: "2005-2009",
    description:
      "A personal portfolio is a curated collection of an individual's professional work, showcasing their skills, experience A personal portfolio.",
    animationOrder: 1,
  },
  {
    role: "Assistant Director",
    duration: "2010-2014",
    description:
      "Each project here showcases my commitment to excellence and adaptability, tailored to meet each client’s unique needs.",
    animationOrder: 2,
  },
  {
    role: "Design Assistant",
    duration: "2008-2012",
    description:
      "I’ve had the privilege of working with various clients, from startups to established companies, helping bring their visions to life.",
    animationOrder: 3,
  },
  {
    role: "Design Assistant",
    duration: "2008-2012",
    description:
      "Each project here showcases my commitment to excellence and adaptability, tailored to meet each client’s unique needs a personal.",
    animationOrder: 4,
  },
];

export const skillSections = [
  {
    title: "Design Skill",
    skills: [
      { name: "PHOTOSHOT", percent: 100, duration: "0.5s", delay: ".3s" },
      { name: "FIGMA", percent: 95, duration: "0.6s", delay: ".4s" },
      { name: "ADOBE XD", percent: 60, duration: "0.7s", delay: ".5s" },
      {
        name: "ADOBE ILLUSTRATOR",
        percent: 70,
        duration: "0.8s",
        delay: ".6s",
      },
    ],
  },
  {
    title: "Development Skill",
    skills: [
      { name: "PHOTOSHOT", percent: 100, duration: "0.5s", delay: ".3s" },
      { name: "FIGMA", percent: 95, duration: "0.6s", delay: ".4s" },
      { name: "ADOBE XD", percent: 60, duration: "0.7s", delay: ".5s" },
      {
        name: "ADOBE ILLUSTRATOR",
        percent: 70,
        duration: "0.8s",
        delay: ".6s",
      },
    ],
  },
];

export const companyLogos = [
  {
    src: "/assets/images/our-supported-company/company-logo-1.svg",
    width: 184,
    height: 60,
    animationOrder: 1,
  },
  {
    src: "/assets/images/our-supported-company/company-logo-2.svg",
    width: 184,
    height: 66,
    animationOrder: 2,
  },
  {
    src: "/assets/images/our-supported-company/company-logo-3.svg",
    width: 190,
    height: 71,
    animationOrder: 3,
  },
  {
    src: "/assets/images/our-supported-company/company-logo-4.svg",
    width: 184,
    height: 73,
    animationOrder: 4,
  },
  {
    src: "/assets/images/our-supported-company/company-logo-5.svg",
    width: 184,
    height: 61,
    animationOrder: 5,
  },
  {
    src: "/assets/images/our-supported-company/company-logo-6.svg",
    width: 184,
    height: 78,
    animationOrder: 6,
  },
  {
    src: "/assets/images/our-supported-company/company-logo-7.svg",
    width: 184,
    height: 80,
    animationOrder: 7,
  },
  {
    src: "/assets/images/our-supported-company/company-logo-8.svg",
    width: 184,
    height: 70,
    animationOrder: 8,
  },
];

export const blogData2 = [
  {
    id: 1,
    animationOrder: "animation-order-1",
    imageSrc: "/assets/images/blog/blog-img-1.jpg",
    altText: "Blog Thumbnail",
    author: "Mesbah",
    date: "April 10",
    title: "Inspiring the World, One Project at a Time for the man",
    tags: [
      "All Project",
      "Graphics",
      "Web Design",
      "CV",
      "Starts",
      "Creative Portfolio",
      "Start shape",
    ],
    categories: ["UI/UX Design Innovation"],
    description:
      "Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra .Aliquam eros justo, posuere Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper",
    slug: "inspiring-the-world-one-project-at-a-time-for-the-man",
  },
  {
    id: 2,
    animationOrder: "animation-order-2",
    imageSrc: "/assets/images/blog/blog-img-2.jpg",
    altText: "Blog Thumbnail",
    author: "Mesbah",
    date: "April 10",
    title: "Let's bring your ideas to life! Contact me, and let's",
    tags: ["CV", "Starts", "Start shape"],
    categories: ["Business Solution"],
    description:
      "Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra .Aliquam eros justo, posuere Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper",
    slug: "lets-bring-your-ideas-to-life-contact-me-and-lets",
  },
  {
    id: 3,
    animationOrder: "animation-order-3",
    imageSrc: "/assets/images/blog/blog-img-3.jpg",
    altText: "Blog Thumbnail",
    author: "Mesbah",
    date: "April 10",
    title: "Each one showcases our approach and dedication man",
    tags: ["All Project", "Resume", "CV Card", "Start shape"],
    categories: ["Business Solution"],
    description:
      "Aliquam eros justo, posuere loborti viverra lao ullamcorper posuere viverra .Aliquam eros justo, posuere Aliquam eros justo, posuere loborti viverra laoreet matti ullamcorper",
    slug: "each-one-showcases-our-approach-and-dedication-man",
  },
];

export function buildHero1Canonical() {
  return {
    layout: "home-1",
    bannerImage: {
      src: "/assets/images/banner/banner-user-image-one.png",
      width: 486,
      height: 781,
      alt: "banner-img",
    },
    floatingBannerTexts: ["WEB DESIGNER", "WEB DESIGNER"],
    helloSubtitle: "Hello",
    titleLine1: "i\u2019m Jane Cooper a",
    typedStrings: [
      "Web Designer.",
      "Web Developer.",
      "UI/UX Designer.",
      "Freelancer.",
      "Content Writer.",
    ],
    description:
      "A personal portfolio is a collection of your work, achievements, and skills that highlights your abilities and professional growth. It serves as",
    primaryCta: {
      href: "/project",
      buttonText: "View Portfolio",
      iconClass: "fa-sharp fa-regular fa-arrow-right",
    },
  };
}

export function buildHero2Canonical() {
  return {
    layout: "home-2",
    mainImage: {
      src: "/assets/images/banner/banner-user-image-two.png",
      width: 444,
      height: 711,
      alt: "banner-img",
    },
    redBgImage: {
      src: "/assets/images/banner/banner-user-image-two-red-bg.png",
      width: 630,
      height: 285,
      alt: "red-img",
    },
    logoUnderImages: [
      {
        src: "/assets/images/banner/logo-under-image.png",
        width: 198,
        height: 198,
        alt: "logo-under-image",
      },
      {
        src: "/assets/images/banner/logo-under-image-2.png",
        width: 30,
        height: 30,
        alt: "logo-under-image",
      },
    ],
    floatingBannerTexts: ["Ux Designer", "Ux Designer"],
    subtitle: "I am",
    titleLine1: "Ralph Edwards, a Full Stuck",
    typedStrings: [
      "Web Designer.",
      "Web Developer.",
      "UI/UX Designer.",
      "Freelancer.",
      "Content Writer.",
    ],
    descriptionHtmlSegments: {
      fullText:
        "A personal portfolio is a collection of your work, that is achievements, and skills that highlights in your abilities and professional web design growth. It serves as",
      emphasizedWords: ["portfolio", "web design"],
    },
    primaryCta: {
      href: "#",
      buttonText: "More About Us",
      iconClass: "fa-sharp fa-regular fa-arrow-right",
    },
    findMeOnTitle: "Find me on",
    bannerShapeImage: {
      src: "/assets/images/banner/banner-shape-two.png",
      width: 778,
      height: 900,
      alt: "",
    },
  };
}

export function buildStaticDocuments() {
  return [
    {
      section: "navbar",
      variant: "navbar1",
      isActive: true,
      content: {
        component: "Header1",
        darkLogo: "/assets/images/logo/white-logo-reeni.png",
        lightLogo: "/assets/images/logo/logo-white.png",
        logoAlt:
          "Reeni - Personal Portfolio HTML Template for developers and freelancers",
        logoWidthDark: 121,
        logoHeightDark: 41,
        logoWidthLight: 121,
        logoHeightLight: 40,
        homeLink: "/",
        menuItems,
        menuItemsLight,
        headerSocialLinks: [
          { iconClass: "fa-brands fa-instagram", href: "#" },
          { iconClass: "fa-brands fa-linkedin-in", href: "#" },
          { iconClass: "fa-brands fa-twitter", href: "#" },
          { iconClass: "fa-brands fa-facebook-f", href: "#" },
        ],
        sidebarToggleIcon: "fa-regular fa-bars-staggered",
        mobileMenuToggleIcon: "fa-regular fa-bars-staggered",
      },
    },
    {
      section: "navbar",
      variant: "navbar2",
      isActive: false,
      content: {
        component: "Header2",
        darkLogo: "/assets/images/logo/white-logo-reeni.png",
        lightLogo: "/assets/images/logo/logo-white.png",
        logoAlt:
          "Reeni - Personal Portfolio HTML Template for developers and freelancers",
        onepageNavItems,
        headerSocialLinks: [
          { iconClass: "fa-brands fa-instagram", href: "#" },
          { iconClass: "fa-brands fa-linkedin-in", href: "#" },
          { iconClass: "fa-brands fa-twitter", href: "#" },
          { iconClass: "fa-brands fa-facebook-f", href: "#" },
        ],
      },
    },
    {
      section: "navbar",
      variant: "navbar3",
      isActive: false,
      content: {
        component: "Header3",
        note: "Same logo defaults as Header1; uses alternate mobile toggles in template.",
        darkLogo: "/assets/images/logo/white-logo-reeni.png",
        lightLogo: "/assets/images/logo/logo-white.png",
        onepageNavItems,
      },
    },
    {
      section: "navbar",
      variant: "navbar4",
      isActive: false,
      content: {
        component: "Header4",
        darkLogo: "/assets/images/logo/white-logo-reeni.png",
        lightLogo: "/assets/images/logo/logo-white.png",
        menuItems,
        menuItemsLight,
      },
    },
    {
      section: "navbar",
      variant: "navbar5",
      isActive: false,
      content: {
        component: "Header5",
        darkLogo: "/assets/images/logo/white-logo-reeni.png",
        lightLogo: "/assets/images/logo/logo-white.png",
        menuItems,
        menuItemsLight,
      },
    },
    {
      section: "about",
      variant: "about1",
      isActive: true,
      content: {
        aboutComponent: {
          parentClassDefault: "about-us-area",
          sectionId: "about",
          experienceCounter: { max: 10, suffix: "+", label: "years of experience" },
          designCard: {
            iconClass: "fa-sharp fa-thin fa-lock",
            title: "Ui/Ux Design",
            subtitle: "241 Projects",
          },
          sectionHead: {
            subtitle: "About Me",
            titleLines: ["Boost Business Strategic", "Solutions with Us"],
            description:
              "Business consulting consultants provide expert advice and guida businesses to help them improve their performance, efficiency, and organizational",
          },
          cards: [
            {
              logo: {
                src: "/assets/images/about/logo-1.svg",
                width: 24,
                height: 24,
                alt: "logo",
              },
              title: "Business Solutions",
              description:
                "Each one showcases my approach and dedication to detail, creativity",
            },
            {
              logo: {
                src: "/assets/images/about/logo-2.svg",
                width: 24,
                height: 24,
                alt: "logo",
              },
              title: "Profit Partners",
              description:
                "Business consulting consul us to a provide expert advice businesses",
            },
          ],
          readMoreButton: {
            href: "/about",
            text: "Read More About Me",
            iconClass: "fa-sharp fa-regular fa-arrow-right",
          },
        },
        homePageFacts: {
          component: "Facts",
          yearsCounterMax: 25,
          yearsTitleLines: ["Years Of", "experience"],
          yearsParagraph:
            "Business consulting consultants provide expert advice and guida the a businesses to help theme their performance efficiency",
          counters,
        },
        homePageEducation: {
          component: "Education2",
          sectionId: "resume",
          sectionHead: {
            subtitle: "Education & Experience",
            titleLines: ["Empowering Creativity", "through"],
            description:
              "Business consulting consultants provide expert advice and guida businesses to help them improve their performance, efficiency, and organizational",
          },
          educationHeading: "Education",
          customLineImage: {
            src: "/assets/images/custom-line/custom-line.png",
            width: 81,
            height: 6,
            alt: "custom-line",
          },
          educationItems: educationExperienceData,
          experiencesHeading: "Experiences",
          experiencesLeft: [
            {
              subtitle: "experience",
              companyLine: "Soft Tech (2 Years)",
              roleTitle: "UI/UX Designer",
              paragraph:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum desi dolore eu fugiat nulla pariatu Duis aute irure.",
            },
            {
              subtitle: "experience",
              companyLine: "ModernTech (3 Years)",
              roleTitle: "App Developer",
              paragraph:
                "In this portfolio, you’ll find a curated selection of projects that highlight my skills in [Main Areas, e.g., responsive web design.",
            },
          ],
          experiencesRightImage: {
            src: "/assets/images/experiences/expert-img.jpg",
            width: 945,
            height: 719,
            alt: "expert-img",
          },
        },
        homePageSkills: {
          component: "Skills",
          parentClassDefault: "tmp-skill-area tmp-section-gapTop",
          customLineImage: {
            src: "/assets/images/custom-line/custom-line.png",
            width: 81,
            height: 6,
            alt: "custom-line",
          },
          skillSections,
        },
        homePageSkills2: {
          component: "Skills2",
          sectionHead: {
            subtitle: "My Skill",
            titleLines: ["Elevated Designs Personalized", "the best Experiences"],
          },
          cards: [
            {
              iconClass: "fa-light fa-building-columns",
              mainTitle: "Ui/visual Design",
              subTitle: "21 Done",
              paragraph:
                "My work is driven by the belief that thoughtful design and strategic planning can empower brands strategic planning can empower brands",
              readMoreText: "Read More",
              readMoreIcon: "fa-solid fa-angle-right",
            },
            {
              iconClass: "fa-light fa-calendar",
              mainTitle: "Ui/visual Design",
              subTitle: "21 Done",
              paragraph:
                "In this portfolio, you’ll find a curated selection of projects that highlight my skills in [Main Areas, e.g., responsive web design",
              readMoreText: "Read More",
              readMoreIcon: "fa-solid fa-angle-right",
            },
            {
              iconClass: "fa-light fa-pen-nib",
              mainTitle: "Motion Design",
              subTitle: "20 Done",
              paragraph:
                "Each project here showcases my commitment to excellence and adaptability, tailored to meet each client’s unique needs",
              readMoreText: "Read More",
              readMoreIcon: "fa-solid fa-angle-right",
            },
          ],
        },
        homePageBrands: {
          component: "Brands",
          parentClassDefault: "our-supported-company-area tmp-section-gapTop",
          sectionId: "clients",
          companyLogos,
        },
        homePageBlogs: {
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
          posts: blogData2,
          readMoreLabel: "Read More",
          readMoreIcon: "fa-solid fa-angle-right",
        },
      },
    },
    {
      section: "services",
      variant: "services1",
      isActive: true,
      content: {
        component: "Services",
        isLightDefault: false,
        items: servicesIconGrid,
        detailPathTemplate: "/service-details",
        detailPathTemplateLight: "/service-details-white",
      },
    },
    {
      section: "services",
      variant: "services2",
      isActive: false,
      content: {
        component: "Services3",
        sectionId: "service",
        sectionHead: {
          subtitle: "Latest Service",
          titleLines: ["Inspiring The World One", "Project"],
          description:
            "Business consulting consultants provide expert advice and guida businesses to help them improve their performance, efficiency, and organizational",
        },
        items: services5,
        sideImage: {
          src: "/assets/images/services/latest-services-user-image-two.png",
          width: 1134,
          height: 1176,
          alt: "latest-user-image",
        },
      },
    },
    {
      section: "projects",
      variant: "projects1",
      isActive: true,
      content: {
        component: "Portfolio2",
        sectionId: "portfolio",
        isLightDefault: false,
        sectionHead: {
          subtitle: "Latest Portfolio",
          titleLines: ["Transforming Ideas into", "Exceptional"],
          description:
            "Business consulting consultants provide expert advice and guida businesses to help them improve their performance, efficiency, and organizational",
        },
        items: portfolioItems2,
        detailPathTemplate: "/project-details",
        detailPathTemplateLight: "/project-details-white",
        arrowButtonIcon: "fa-solid fa-arrow-up-right",
      },
    },
    {
      section: "testimonials",
      variant: "testimonials1",
      isActive: true,
      content: {
        component: "homes/home-1/Testimonials",
        swiper: {
          spaceBetween: 50,
          loop: true,
          breakpoints: {
            "0": { slidesPerView: 1 },
            "800": { slidesPerView: 2 },
          },
        },
        testimonialIcon: {
          src: "/assets/images/testimonial/testimonial-icon.svg",
          width: 110,
          height: 94,
          alt: "testimonial-icon",
        },
        navigationNextIcon: "fa-solid fa-arrow-right",
        navigationPrevIcon: "fa-solid fa-arrow-left",
        items: testimonials1,
      },
    },
    {
      section: "testimonials",
      variant: "testimonials2",
      isActive: false,
      content: {
        component: "testimonials2 dataset",
        items: testimonials2,
      },
    },
    {
      section: "testimonials",
      variant: "testimonials3",
      isActive: false,
      content: {
        component: "testimonials3 dataset",
        items: testimonials3,
      },
    },
    {
      section: "contact",
      variant: "contact1",
      isActive: true,
      content: {
        component: "Contact2",
        parentClassDefault: "get-in-touch-area tmp-section-gapTop",
        sectionId: "contacts",
        emailJs: {
          serviceId: "service_cyobi0y",
          templateId: "template_4nbexqj",
          publicKey: "D79JdTqxXVCcQBXL4",
        },
        toastMessages: {
          success: "Message Sent successfully!",
          error: "Ops Message not Sent!",
        },
        sectionHead: {
          subtitle: "GET IN TOUCH",
          title: "Elevate your brand with Me",
          description:
            "ished fact that a reader will be distrol acted bioiiy desig ished fact that a reader will acted ished fact that a reader will be distrol acted",
        },
        form: {
          placeholders: {
            name: "Your Name",
            phone: "Phone Number",
            email: "Your Email",
            subject: "Subject",
            message: "Your Message",
          },
          submitButtonText: "Appointment Now",
          submitIconClass: "fa-sharp fa-regular fa-arrow-right",
          fieldNames: {
            name: "name",
            email: "email",
            subject: "subject",
            message: "message",
          },
        },
      },
    },
    {
      section: "footer",
      variant: "footer1",
      isActive: true,
      content: {
        footer: {
          component: "Footer1",
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
          contactItems: [
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
          ],
          socialLinks: [
            { iconClass: "fa-brands fa-instagram", href: "#" },
            { iconClass: "fa-brands fa-linkedin-in", href: "#" },
            { iconClass: "fa-brands fa-twitter", href: "#" },
            { iconClass: "fa-brands fa-facebook-f", href: "#" },
          ],
        },
        copyright: {
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
        },
      },
    },
    {
      section: "about",
      variant: "about2",
      isActive: false,
      content: {
        component: "About2",
        sectionId: "about",
        sourceNotes: "Variant scaffold from components/common/About2.jsx",
      },
    },
    {
      section: "services",
      variant: "services3",
      isActive: false,
      content: {
        component: "Services2",
        sourceNotes: "Variant scaffold from components/common/Services2.jsx",
      },
    },
    {
      section: "services",
      variant: "services4",
      isActive: false,
      content: {
        component: "Services4",
        sourceNotes: "Variant scaffold from components/common/Services4.jsx",
      },
    },
    {
      section: "services",
      variant: "services5",
      isActive: false,
      content: {
        component: "Services5",
        sourceNotes: "Variant scaffold from components/common/Services5.jsx",
      },
    },
    {
      section: "services",
      variant: "services6",
      isActive: false,
      content: {
        component: "Services6",
        sourceNotes: "Variant scaffold from components/common/Services6.jsx",
      },
    },
    {
      section: "projects",
      variant: "projects2",
      isActive: false,
      content: {
        component: "Portfolio",
        sourceNotes: "Variant scaffold from components/common/Portfolio.jsx",
      },
    },
    {
      section: "projects",
      variant: "projects3",
      isActive: false,
      content: {
        component: "Portfolio3",
        sourceNotes: "Variant scaffold from components/common/Portfolio3.jsx",
      },
    },
    {
      section: "contact",
      variant: "contact2",
      isActive: false,
      content: {
        component: "Contact",
        sourceNotes: "Variant scaffold from components/common/Contact.jsx",
      },
    },
    {
      section: "contact",
      variant: "contact3",
      isActive: false,
      content: {
        component: "Contact3",
        sourceNotes: "Variant scaffold from components/common/Contact3.jsx",
      },
    },
    {
      section: "footer",
      variant: "footer2",
      isActive: false,
      content: {
        component: "Footer2",
        sourceNotes: "Variant scaffold from components/footers/Footer2.jsx",
      },
    },
    {
      section: "footer",
      variant: "footer3",
      isActive: false,
      content: {
        component: "Footer3",
        sourceNotes: "Variant scaffold from components/footers/Footer3.jsx",
      },
    },
    {
      section: "footer",
      variant: "footer4",
      isActive: false,
      content: {
        component: "Footer4",
        sourceNotes: "Variant scaffold from components/footers/Footer4.jsx",
      },
    },
    {
      section: "footer",
      variant: "footer5",
      isActive: false,
      content: {
        component: "Footer5",
        sourceNotes: "Variant scaffold from components/footers/Footer5.jsx",
      },
    },
  ];
}
