import React from "react";
import Link from "next/link";

const defaultMenuDark = [
  { label: "Latest Blog", href: "/blog", isNextLink: true },
  { label: "Terms And Condition", href: "#" },
  { label: "Contact Us", href: "/contact", isNextLink: true },
];

const defaultMenuLight = [
  { label: "Latest Blog", href: "/blog-white", isNextLink: true },
  { label: "Terms And Condition", href: "#" },
  { label: "Contact Us", href: "/contact-white", isNextLink: true },
];

const defaultSocial = [
  { iconClass: "fa-brands fa-facebook-f", href: "https://www.facebook.com/" },
  { iconClass: "fa-brands fa-twitter", href: "https://www.twitter.com" },
  { iconClass: "fa-brands fa-instagram", href: "https://www.instagram.com/" },
  { iconClass: "fa-brands fa-linkedin-in", href: "https://www.linkdin.com/" },
];

export default function Footer5({ cmsContent }) {
  const cta = cmsContent?.cta || {};
  const titleLine1 =
    cta.titleLine1 || "Ready to start creating a";
  const titleLine2 = cta.titleLine2 || "standard website?";
  const subtitle =
    cta.subtitle || "Finest choice for your home & office";
  const buttonText = cta.buttonText || "Purchase Reeni";
  const buttonHref =
    cta.buttonHref ||
    "https://themeforest.net/item/reeni-personal-portfolio-html-template/56387656";

  const menuDark = Array.isArray(cmsContent?.menuDark)
    ? cmsContent.menuDark
    : defaultMenuDark;
  const menuLight = Array.isArray(cmsContent?.menuLight)
    ? cmsContent.menuLight
    : defaultMenuLight;
  const socialLinks = Array.isArray(cmsContent?.socialLinks)
    ? cmsContent.socialLinks
    : defaultSocial;

  const copy = cmsContent?.copyright || {};
  const rightsPrefix =
    copy.rightsPrefix || "Copyright All rights reserved";
  const ownerLabel = copy.ownerLabel || "Inversweb";
  const ownerHref =
    copy.ownerHref ||
    "https://themeforest.net/user/inversweb/portfolio";

  const year = new Date().getFullYear();

  return (
    <>
      <div className="tmp-footer-area-style-net tmp-section-gapTop">
        <div className="footer-style-3">
          <div className="tmp-callto-action tmp-call-to-action bg_patern-1 style-8 content-wrapper">
            <div className="container">
              <div className="row row--0 align-items-center">
                <div className="col-lg-12">
                  <div className="inner">
                    <div className="content text-center">
                      <h2 className="title sal-animate">
                        {titleLine1} <br />
                        {titleLine2}
                      </h2>
                      <h6 className="subtitle sal-animate">{subtitle}</h6>
                      <div className="call-to-btn text-center mt--30 d-flex justify-content-center sal-animate">
                        <a
                          className="tmp-btn btn-icon"
                          target="_blank"
                          rel="noreferrer"
                          href={buttonHref}
                        >
                          {buttonText}{" "}
                          <i className="icon feather-arrow-right"> </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-style-net">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-4 col-md-12 col-sm-12 col-sm-12 col-12">
                  <div className="copyright-left">
                    <ul className="tmp-menu link-hover dark-content">
                      {menuDark.map((item, index) => (
                        <li key={`d-${index}`}>
                          {item.isNextLink ? (
                            <Link href={item.href || "#"}>{item.label}</Link>
                          ) : (
                            <a href={item.href || "#"}>{item.label}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                    <ul className="tmp-menu link-hover light-content">
                      {menuLight.map((item, index) => (
                        <li key={`l-${index}`}>
                          {item.isNextLink ? (
                            <Link href={item.href || "#"}>{item.label}</Link>
                          ) : (
                            <a href={item.href || "#"}>{item.label}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 mt_sm--12">
                  <div className="copyright-center text-center">
                    <ul className="social-icon social-default justify-content-center">
                      {socialLinks.map((s, index) => (
                        <li key={index}>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={s.href || "#"}
                          >
                            <i className={s.iconClass} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-sm-12 col-12 mt_md--20 mt_sm--20">
                  <div className="copyright-right text-center text-lg-end">
                    <p className="copyright-text">
                      © {year} {rightsPrefix}{" "}
                      <a target="_blank" rel="noreferrer" href={ownerHref}>
                        {ownerLabel}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
