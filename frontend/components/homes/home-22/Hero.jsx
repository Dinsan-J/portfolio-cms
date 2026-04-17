import React from "react";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

export default function Hero({ cmsContent }) {
  const title = cmsContent?.titleLine1 || cmsContent?.headings?.h1?.[0] || "Julian Tobias";
  const subtitle =
    cmsContent?.description ||
    cmsContent?.paragraphs?.[0] ||
    "German Super Model, Influencer & Youtuber";
  const videoSrc = resolveCmsMediaSrc(
    cmsContent?.heroVideo?.src ||
      cmsContent?.mainImage?.src ||
      cmsContent?.bannerImage?.src ||
      "/assets/images/video/model.mp4",
  );
  return (
    <div
      className="tmp-banner-one-area model-style-banner with-instructor style-2"
      id="home"
      data-black-overlay={2}
    >
      <div className="container">
        <div className="banner-one-main-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="inner banner-model-15">
                <h1 className="title tmp-fade-in">{title}</h1>
                <p className="disc tmp-fade-in">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="social-area-wrapper-varticle">
        <ul>
          <li>
            <a href="#">
              <i className="fa-brands fa-facebook-f" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-youtube" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-instagram" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-tiktok" />
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-brands fa-twitter" />
            </a>
          </li>
        </ul>
      </div>
      <div className="hero-bg-video">
        <video autoPlay muted loop id="myVideo">
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
