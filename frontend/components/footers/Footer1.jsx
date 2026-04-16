"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { footerLinks, footerLinksWhite } from "@/data/footerLinks";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

export default function Footer1({ cmsContent }) {
  const footer = cmsContent?.footer || {};

  const darkLogo = resolveCmsMediaSrc(
    footer.darkLogo || "/assets/images/logo/white-logo-reeni.png"
  );
  const lightLogo = resolveCmsMediaSrc(
    footer.lightLogo || "/assets/images/logo/logo-white.png"
  );
  const logoAlt =
    footer.logoAlt ||
    "Reeni - Personal Portfolio HTML Template for developers and freelancers";

  const descriptionLine1 = footer.descriptionLine1 || "Get Ready";
  const descriptionLine2 = footer.descriptionLine2 || "To Create Great";

  const newsletterPlaceholder =
    footer.newsletter?.placeholder || "Email Adress";
  const newsletterIconClass =
    footer.newsletter?.envelopeIconClass || "fa-regular fa-envelope";

  const quickLinksTitle = footer.quickLinksTitle || "Quick Link";
  const darkLinks = Array.isArray(footer.footerLinks) ? footer.footerLinks : footerLinks;
  const lightLinks = Array.isArray(footer.footerLinksWhite)
    ? footer.footerLinksWhite
    : footerLinksWhite;

  const contactTitle = footer.contactTitle || "Contact";
  const contactItems = Array.isArray(footer.contactItems) ? footer.contactItems : [];
  const socialLinks = Array.isArray(footer.socialLinks) ? footer.socialLinks : [];

  return (
    <footer className="footer-area footer-style-one-wrapper bg-color-footer bg_images tmp-section-gap">
      <div className="container">
        <div className="footer-main footer-style-one">
          <div className="row g-5">
            <div className="col-lg-5 col-md-6">
              <div className="single-footer-wrapper border-right mr--20">
                <div className="logo">
                  <Link href={`/`}>
                    <Image
                      className="logo-dark"
                      alt={logoAlt}
                      src={darkLogo}
                      width={121}
                      height={41}
                    />
                    <Image
                      className="logo-white"
                      alt={logoAlt}
                      src={lightLogo}
                      width={121}
                      height={40}
                    />
                  </Link>
                </div>
                <p className="description">
                  <span>{descriptionLine1}</span> {descriptionLine2}
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="newsletter-form-1 mt--40"
                  suppressHydrationWarning
                >
                  <input type="email" placeholder={newsletterPlaceholder} suppressHydrationWarning />
                  <span className="form-icon">
                    <i className={newsletterIconClass} />
                  </span>
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single-footer-wrapper quick-link-wrap">
                <h5 className="ft-title">{quickLinksTitle}</h5>
                <ul className="ft-link tmp-link-animation dark-content">
                  {darkLinks.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
                <ul className="ft-link tmp-link-animation light-content2">
                  {lightLinks.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-footer-wrapper contact-wrap">
                <h5 className="ft-title">{contactTitle}</h5>
                <ul className="ft-link tmp-link-animation">
                  {contactItems.map((item, index) => (
                    <li key={index}>
                      <span className="ft-icon">
                        <i className={item.iconClass} />
                      </span>
                      {item.type === "email" || item.type === "phone" ? (
                        <a href={item.href || "#"}>{item.display}</a>
                      ) : (
                        item.display
                      )}
                    </li>
                  ))}
                </ul>
                <div className="social-link footer">
                  {socialLinks.map((s, index) => (
                    <a href={s.href || "#"} key={index}>
                      <i className={s.iconClass} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
