import React from "react";
import Image from "next/image";
import Link from "next/link";
import TyperComponent from "@/components/common/TyperComponent";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

function resolveMediaSrc(src) {
  if (!src || typeof src !== "string") return "/assets/images/banner/banner-user-image-one.png";
  return resolveCmsMediaSrc(src);
}

export default function Hero({ cmsContent }) {
  const bannerImage = cmsContent?.bannerImage || {};
  const floatingBannerTexts = Array.isArray(cmsContent?.floatingBannerTexts)
    ? cmsContent.floatingBannerTexts
    : ["WEB DESIGNER", "WEB DESIGNER"];
  const typedStrings = Array.isArray(cmsContent?.typedStrings) && cmsContent.typedStrings.length
    ? cmsContent.typedStrings
    : [
        "Web Designer.",
        "Web Developer.",
        "UI/UX Designer.",
        "Freelancer.",
        "Content Writer.",
      ];

  return (
    <div className="tmp-banner-one-area">
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="banner-right-content">
                <Image
                  className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                  alt={bannerImage.alt || "banner-img"}
                  src={resolveMediaSrc(bannerImage.src)}
                  width={Number(bannerImage.width) || 486}
                  height={Number(bannerImage.height) || 781}
                />
                <h2 className="banner-big-text-1 up-down">{floatingBannerTexts[0] || "WEB DESIGNER"}</h2>
                <h2 className="banner-big-text-2 up-down-2">{floatingBannerTexts[1] || floatingBannerTexts[0] || "WEB DESIGNER"}</h2>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  {cmsContent?.helloSubtitle || "Hello"}
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2 mt--5">
                  {cmsContent?.titleLine1 || "i’m Jane Cooper a"} <br />
                  <span className="header-caption">
                    <span className="cd-headline clip is-full-width">
                      <TyperComponent strings={typedStrings} />
                    </span>
                  </span>
                </h1>
                <p className="disc tmp-scroll-trigger tmp-fade-in animation-order-3">
                  {cmsContent?.description ||
                    "A personal portfolio is a collection of your work, achievements, and skills that highlights your abilities and professional growth. It serves as"}
                </p>
                <div className="button-area-banner-one tmp-scroll-trigger tmp-fade-in animation-order-4">
                  <Link
                    className="tmp-btn hover-icon-reverse radius-round"
                    href={cmsContent?.primaryCta?.href || "/project"}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">{cmsContent?.primaryCta?.buttonText || "View Portfolio"}</span>
                      <span className="btn-icon">
                        <i className={cmsContent?.primaryCta?.iconClass || "fa-sharp fa-regular fa-arrow-right"} />
                      </span>
                      <span className="btn-icon">
                        <i className={cmsContent?.primaryCta?.iconClass || "fa-sharp fa-regular fa-arrow-right"} />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
