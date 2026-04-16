import React from "react";
import Image from "next/image";
import { services5 } from "@/data/services";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";
export default function Services3({ cmsContent }) {
  const sectionHead = cmsContent?.sectionHead;
  const subtitle = sectionHead?.subtitle || "Latest Service";
  const titleLine1 = sectionHead?.titleLines?.[0] || "Inspiring The World One";
  const titleLine2 = sectionHead?.titleLines?.[1] || "Project";
  const description =
    sectionHead?.description ||
    "Business consulting consultants provide expert advice and guida businesses to help them improve their performance, efficiency, and organizational";

  const items =
    Array.isArray(cmsContent?.items) && cmsContent.items.length
      ? cmsContent.items
      : services5;

  const side = cmsContent?.sideImage || {};
  const sideSrc = resolveCmsMediaSrc(
    side.src || "/assets/images/services/latest-services-user-image-two.png"
  );
  const sideW = Number(side.width) || 1134;
  const sideH = Number(side.height) || 1176;
  const sideAlt = side.alt || "latest-user-image";
  return (
    <section className="latest-service-area tmp-section-gapTop" id="service">
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
        <div className="row">
          <div className="col-lg-6">
            {items.map((service, index) => (
              <div
                key={index}
                className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${
                  index + 1
                }`}
              >
                <h2 className="service-card-num">
                  <span>{`0${index + 1}.`}</span>
                  {service.title}
                </h2>
                <p className="service-para">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            <div className="service-card-user-image">
              <Image
                className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                alt={sideAlt}
                src={sideSrc}
                width={sideW}
                height={sideH}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
