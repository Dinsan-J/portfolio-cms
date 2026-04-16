"use client";
import { testimonials } from "@/data/testimonials";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";
export default function Testimonials({ cmsContent }) {
  const cmsItems = Array.isArray(cmsContent?.items) ? cmsContent.items : [];
  const slides = testimonials.map((base, idx) => {
    const cms = cmsItems[idx] || {};
    return {
      ...base,
      ...cms,
      bgImage: cms.bgImage || base.bgImage,
      width: cms.width ?? base.width,
      height: cms.height ?? base.height,
      animationClass: cms.animationClass || base.animationClass,
    };
  });

  const icon = cmsContent?.testimonialIcon || {};
  const iconSrc = resolveCmsMediaSrc(
    icon.src || "/assets/images/testimonial/testimonial-icon.svg"
  );
  const iconW = Number(icon.width) || 110;
  const iconH = Number(icon.height) || 94;
  const iconAlt = icon.alt || "testimonial-icon";

  const swiperProps = {
    spaceBetween: 50,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      800: { slidesPerView: 2 },
    },
    ...(cmsContent?.swiper || {}),
  };
  return (
    <section className="testimonial tmp-section-gapTop">
      <div className="testimonial-wrapper">
        <div className="container">
          <Swiper
            className="swiper testimonial-swiper"
            {...swiperProps}
            modules={[Navigation]}
          >
            {slides.map((testimonial) => (
              <SwiperSlide className="swiper-slide" key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="card-content-wrap">
                    <h2 className="text-doc">{testimonial.quote}</h2>
                    <h3 className="card-title">{testimonial.name}</h3>
                    <p className="card-para">{testimonial.role}</p>
                    <div className="testimonital-icon">
                      <Image
                        alt={iconAlt}
                        src={iconSrc}
                        width={iconW}
                        height={iconH}
                      />
                    </div>
                  </div>
                  <div className="testimonial-card-img">
                    <Image
                      className={`tmp-scroll-trigger tmp-zoom-in ${testimonial.animationClass}`}
                      alt="bg-image"
                      src={resolveCmsMediaSrc(testimonial.bgImage)}
                      width={testimonial.width}
                      height={testimonial.height}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* </div> */}
          <div className="testimonial-btn-next-prev">
            <div className="swiper-button-next">
              <i className="fa-solid fa-arrow-right" />
            </div>
            <div className="swiper-button-prev">
              <i className="fa-solid fa-arrow-left" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
