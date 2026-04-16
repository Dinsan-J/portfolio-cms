import React from "react";
import Image from "next/image";
import { educationExperienceData } from "@/data/education";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";
export default function Education({ cmsContent }) {
  const sectionHead = cmsContent?.sectionHead;
  const subtitle = sectionHead?.subtitle || "Education & Experience";
  const titleLine1 = sectionHead?.titleLines?.[0] || "Empowering Creativity";
  const titleLine2 = sectionHead?.titleLines?.[1] || "through";
  const description =
    sectionHead?.description ||
    "Business consulting consultants provide expert advice and guida businesses to help them improve their performance, efficiency, and organizational";

  const educationHeading = cmsContent?.educationHeading || "Education";
  const experiencesHeading = cmsContent?.experiencesHeading || "Experiences";

  const line = cmsContent?.customLineImage;
  const lineSrc = resolveCmsMediaSrc(line?.src || "/assets/images/custom-line/custom-line.png");
  const lineW = Number(line?.width) || 81;
  const lineH = Number(line?.height) || 6;
  const lineAlt = line?.alt || "custom-line";

  const eduItems =
    Array.isArray(cmsContent?.educationItems) && cmsContent.educationItems.length
      ? cmsContent.educationItems
      : educationExperienceData;

  const expLeft =
    Array.isArray(cmsContent?.experiencesLeft) && cmsContent.experiencesLeft.length
      ? cmsContent.experiencesLeft
      : [
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
        ];

  const rightImg = cmsContent?.experiencesRightImage || {};
  const rightSrc = resolveCmsMediaSrc(
    rightImg.src || "/assets/images/experiences/expert-img.jpg"
  );
  const rightW = Number(rightImg.width) || 945;
  const rightH = Number(rightImg.height) || 719;
  const rightAlt = rightImg.alt || "expert-img";

  return (
    <section className="education-experience tmp-section-gapTop" id="resume">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">{subtitle}</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            {titleLine1} <br />
            {titleLine2}
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            {description}
          </p>
        </div>
        <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
          {educationHeading}
          <span>
            <Image
              alt={lineAlt}
              src={lineSrc}
              width={lineW}
              height={lineH}
            />
          </span>
        </h2>
        <div className="row g-5">
          {eduItems.map((item, index) => (
            <div className="col-lg-6 col-sm-6" key={index}>
              <div
                className={`education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${item.animationOrder}`}
              >
                <h4 className="edu-sub-title">{item.role}</h4>
                <h2 className="edu-title">{item.duration}</h2>
                <p className="edu-para">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="experiences-wrapper">
          <div className="row">
            <div className="col-lg-6">
              <div className="experiences-wrap-left-content">
                <h2 className="custom-title mb-32 tmp-scroll-trigger tmp-fade-in animation-order-1">
                  {experiencesHeading}
                  <span>
                    <Image
                      alt={lineAlt}
                      src={lineSrc}
                      width={lineW}
                      height={lineH}
                    />
                  </span>
                </h2>
                {expLeft.map((exp, idx) => (
                  <div
                    className={`experience-content tmp-scroll-trigger tmp-fade-in animation-order-${
                      idx + 1
                    }`}
                    key={idx}
                  >
                    <p className="ex-subtitle">{exp.subtitle}</p>
                    <h2 className="ex-name">{exp.companyLine}</h2>
                    <h3 className="ex-title">{exp.roleTitle}</h3>
                    <p className="ex-para">{exp.paragraph}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="experiences-wrap-right-content">
                <Image
                  className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                  alt={rightAlt}
                  src={rightSrc}
                  width={rightW}
                  height={rightH}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
