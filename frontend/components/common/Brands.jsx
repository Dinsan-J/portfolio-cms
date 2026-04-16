import React from "react";
import Image from "next/image";
import { companyLogos } from "@/data/brands";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

export default function Brands({
  parentClass = "our-supported-company-area tmp-section-gapTop",
  cmsContent,
}) {
  const logos =
    Array.isArray(cmsContent?.companyLogos) && cmsContent.companyLogos.length
      ? cmsContent.companyLogos
      : companyLogos;
  return (
    <div className={parentClass} id="clients">
      <div className="container">
        <div className="row justify-content-center">
          {logos.map((logo, index) => (
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6" key={index}>
              <div
                className={`support-company-logo tmp-scroll-trigger tmp-fade-in animation-order-${logo.animationOrder}`}
              >
                <Image
                  alt="Reeni - Personal Portfolio HTML Template"
                  src={resolveCmsMediaSrc(logo.src)}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
