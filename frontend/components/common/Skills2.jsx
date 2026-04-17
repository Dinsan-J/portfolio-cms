import React from "react";

export default function Skills2({ cmsContent }) {
  const sectionHead = cmsContent?.sectionHead || {};
  const subtitle = sectionHead?.subtitle || "My Skill";
  const titleLine1 = sectionHead?.titleLines?.[0] || "Elevated Designs Personalized";
  const titleLine2 = sectionHead?.titleLines?.[1] || "the best Experiences";
  const cards = Array.isArray(cmsContent?.cards) && cmsContent.cards.length
    ? cmsContent.cards
    : [
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
            "In this portfolio, you&apos;ll find a curated selection of projects that highlight my skills in [Main Areas, e.g., responsive web design",
          readMoreText: "Read More",
          readMoreIcon: "fa-solid fa-angle-right",
        },
        {
          iconClass: "fa-light fa-pen-nib",
          mainTitle: "Motion Design",
          subTitle: "20 Done",
          paragraph:
            "Each project here showcases my commitment to excellence and adaptability, tailored to meet each client&apos;s unique needs",
          readMoreText: "Read More",
          readMoreIcon: "fa-solid fa-angle-right",
        },
      ];
  return (
    <section className="my-skill tmp-section-gapTop">
      <div className="container">
        <div className="section-head text-align-left mb--50">
          <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">{subtitle}</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            {titleLine1} <br />
            {titleLine2}
          </h2>
        </div>
        <div className="services-widget v1">
          {cards.map((card, idx) => (
            <div
              className={`service-item ${idx === 0 ? "current" : ""} tmp-scroll-trigger tmp-fade-in animation-order-${idx + 1}`}
              key={idx}
            >
              <div className="my-skill-card">
                <div className="card-icon">
                  <i className={card.iconClass || "fa-light fa-building-columns"} />
                </div>
                <div className="card-title">
                  <h3 className="main-title">{card.mainTitle || "Ui/visual Design"}</h3>
                  <p className="sub-title">{card.subTitle || "21 Done"}</p>
                </div>
                <p className="card-para">{card.paragraph || ""}</p>
                <a href={card.href || "#"} className="read-more-btn">
                  {card.readMoreText || "Read More"}
                  <span className="read-more-icon">
                    <i className={card.readMoreIcon || "fa-solid fa-angle-right"} />
                  </span>
                </a>
              </div>
              <button
                type="button"
                className="service-link modal-popup"
                aria-label="Open details"
                suppressHydrationWarning
              />
            </div>
          ))}
          <div className="active-bg wow fadeInUp mleave" />
        </div>
      </div>
    </section>
  );
}
