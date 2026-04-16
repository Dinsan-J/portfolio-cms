import React from "react";
import Image from "next/image";
import TyperComponent from "@/components/common/TyperComponent";
import Link from "next/link";
import {
  getHeroButtonHref,
  getHeroButtonLabel,
  getHeroDescription,
  getHeroSubtitle,
  getHeroMainImage,
  getHeroTitleLine,
  getHeroTypedStrings,
} from "@/components/homes/heroCms";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

export default function Hero({ cmsContent }) {
  const mainImage = getHeroMainImage(cmsContent, {
    src: "/assets/images/banner/banner-user-image-two.png",
    width: 444,
    height: 711,
    alt: "banner-img",
  });
  const redBgImage = cmsContent?.redBgImage || {};
  const logoUnderImages = Array.isArray(cmsContent?.logoUnderImages) ? cmsContent.logoUnderImages : [];
  const floatingBannerTexts = Array.isArray(cmsContent?.floatingBannerTexts)
    ? cmsContent.floatingBannerTexts
    : ["Ux Designer", "Ux Designer"];
  const bannerShapeImage = cmsContent?.bannerShapeImage || {};
  const typedStrings = getHeroTypedStrings(cmsContent, [
    "Web Designer.",
    "Web Developer.",
    "UI/UX Designer.",
    "Freelancer.",
    "Content Writer.",
  ]);
  return (
    <div className="rpp-banner-two-area">
      <div className="container">
        <div className="banner-two-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="banner-right-content">
                <div className="main-img">
                  <Image
                    className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                    alt={mainImage?.alt || "banner-img"}
                    src={resolveCmsMediaSrc(mainImage?.src)}
                    width={Number(mainImage?.width) || 444}
                    height={Number(mainImage?.height) || 711}
                  />
                  <h2 className="banner-big-text-1 up-down-2">{floatingBannerTexts[0] || "Ux Designer"}</h2>
                  <h2 className="banner-big-text-2 up-down">{floatingBannerTexts[1] || floatingBannerTexts[0] || "Ux Designer"}</h2>
                  <div className="benner-two-bg-red-img">
                    <Image
                      alt={redBgImage.alt || "red-img"}
                      src={resolveCmsMediaSrc(redBgImage.src || "/assets/images/banner/banner-user-image-two-red-bg.png")}
                      width={Number(redBgImage.width) || 630}
                      height={Number(redBgImage.height) || 285}
                    />
                  </div>
                  <div className="logo-under-img-wrap">
                    <div className="logo-under-img">
                      <Image
                        alt={logoUnderImages[0]?.alt || "logo-under-image"}
                        src={resolveCmsMediaSrc(logoUnderImages[0]?.src || "/assets/images/banner/logo-under-image.png")}
                        width={Number(logoUnderImages[0]?.width) || 198}
                        height={Number(logoUnderImages[0]?.height) || 198}
                      />
                    </div>
                    <div className="logo-under-img-2">
                      <Image
                        alt={logoUnderImages[1]?.alt || "logo-under-image"}
                        src={resolveCmsMediaSrc(logoUnderImages[1]?.src || "/assets/images/banner/logo-under-image-2.png")}
                        width={Number(logoUnderImages[1]?.width) || 30}
                        height={Number(logoUnderImages[1]?.height) || 30}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1 mt--100">
              <div className="inner">
                <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  {getHeroSubtitle(cmsContent, "I am")}
                </span>
                <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2">
                  {getHeroTitleLine(cmsContent, "Ralph Edwards, a Full Stuck")} <br />
                  <span className="header-caption">
                    <span className="cd-headline clip is-full-width">
                      <TyperComponent strings={typedStrings} />
                    </span>
                  </span>
                </h1>
                <p className="disc tmp-scroll-trigger tmp-title-split tmp-fade-in animation-order-3">
                  {getHeroDescription(
                    cmsContent,
                    "A personal portfolio is a collection of your work, that is achievements, and skills that highlights in your abilities and professional web design growth. It serves as"
                  )}
                </p>
                <div className="button-area-banner-two tmp-scroll-trigger tmp-fade-in animation-order-4">
                  <Link
                    className="tmp-btn hover-icon-reverse radius-round"
                    href={getHeroButtonHref(cmsContent, "#")}
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">{getHeroButtonLabel(cmsContent, "More About Us")}</span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                      <span className="btn-icon">
                        <i className="fa-sharp fa-regular fa-arrow-right" />
                      </span>
                    </span>
                  </Link>
                </div>
                <div className="find-me-on tmp-scroll-trigger tmp-fade-in animation-order-5">
                  <h2 className="find-me-on-title">Find me on</h2>
                  <div className="social-link banner">
                    <a href="#">
                      <i className="fa-brands fa-instagram" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-shape-two">
        <Image
          alt=""
          src={resolveCmsMediaSrc(bannerShapeImage.src || "/assets/images/banner/banner-shape-two.png")}
          width={Number(bannerShapeImage.width) || 778}
          height={Number(bannerShapeImage.height) || 900}
        />
      </div>
    </div>
  );
}
