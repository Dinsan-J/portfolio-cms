"use client";
import Image from "next/image";
import Link from "next/link";
import { footerLinks, footerLinksWhite } from "@/data/footerLinks";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

export default function Footer3({ cmsContent }) {
  const f = cmsContent?.footer || {};
  const darkLogo = resolveCmsMediaSrc(
    f.darkLogo || "/assets/images/logo/white-logo-reeni.png",
  );
  const lightLogo = resolveCmsMediaSrc(
    f.lightLogo || "/assets/images/logo/logo-white.png",
  );
  const logoAlt =
    f.logoAlt ||
    "Reeni - Personal Portfolio HTML Template for developers and freelancers";
  const descriptionLine1 = f.descriptionLine1 || "Get Ready";
  const descriptionLine2 = f.descriptionLine2 || "Create Great";
  const newsletterPlaceholder =
    f.newsletter?.placeholder || "Email Adress";
  const newsletterIconClass =
    f.newsletter?.envelopeIconClass || "fa-regular fa-envelope";
  const quickLinksTitle = f.quickLinksTitle || "Quick Link";
  const darkLinks = Array.isArray(f.footerLinks) ? f.footerLinks : footerLinks;
  const lightLinks = Array.isArray(f.footerLinksWhite)
    ? f.footerLinksWhite
    : footerLinksWhite;
  const contactTitle = f.contactTitle || "Contact";
  const contactItems = Array.isArray(f.contactItems) ? f.contactItems : [];
  const socialLinks = Array.isArray(f.socialLinks) ? f.socialLinks : [];

  return (
    <>
      <footer className="footer-area footer-style-one-wrapper  tmp-section-gap">
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
                    <span>{descriptionLine1}</span> To <br /> {descriptionLine2}
                  </p>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="newsletter-form-1 mt--40"
                  >
                    <input
                      type="email"
                      placeholder={newsletterPlaceholder}
                      suppressHydrationWarning
                    />
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
                        {item.type === "email" ||
                        item.type === "phone" ? (
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
        <div className="footer-bg-img">
          <Image
            alt="footer-img"
            width={437}
            height={430}
            src="/assets/images/footer/footer-bg-img.png"
          />
        </div>
      </footer>
    </>
  );
}
