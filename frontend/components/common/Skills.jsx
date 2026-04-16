import React from "react";
import Image from "next/image";
import { skillSections } from "@/data/skills";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";
export default function Skills({
  parentClass = "tmp-skill-area tmp-section-gapTop",
  cmsContent,
}) {
  const line = cmsContent?.customLineImage;
  const lineSrc = resolveCmsMediaSrc(line?.src || "/assets/images/custom-line/custom-line.png");
  const lineW = Number(line?.width) || 81;
  const lineH = Number(line?.height) || 6;
  const lineAlt = line?.alt || "custom-line";
  const sections = Array.isArray(cmsContent?.skillSections) && cmsContent.skillSections.length
    ? cmsContent.skillSections
    : skillSections;
  return (
    <div className={parentClass}>
      <div className="container">
        <div className="row g-5">
          {sections.map((section, sectionIndex) => (
            <div className="col-lg-6" key={sectionIndex}>
              <div className="progress-wrapper">
                <div className="content">
                  <h2 className="custom-title mb--30 tmp-scroll-trigger tmp-fade-in animation-order-1">
                    {section.title}
                    <span>
                      <Image
                        alt={lineAlt}
                        src={lineSrc}
                        width={lineW}
                        height={lineH}
                      />
                    </span>
                  </h2>
                  {section.skills.map((skill, skillIndex) => (
                    <div className="progress-charts" key={skillIndex}>
                      <h6 className="heading heading-h6">{skill.name}</h6>
                      <div className="progress">
                        <div
                          className="progress-bar wow fadeInLeft"
                          data-wow-duration={skill.duration}
                          data-wow-delay={skill.delay}
                          role="progressbar"
                          style={{
                            width: `${skill.percent}%`,
                            visibility: "visible",
                            animationDuration: skill.duration,
                            animationDelay: skill.delay,
                            animationName: "fadeInLeft",
                          }}
                          aria-valuenow={skill.percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span className="percent-label">
                            {skill.percent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
