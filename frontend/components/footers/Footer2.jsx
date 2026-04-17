"use client";
import Image from "next/image";
import Link from "next/link";
import { footerLinks, footerLinksWhite } from "@/data/footerLinks";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

export default function Footer2({ cmsContent }) {
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
  const description =
    f.description ||
    "The personal portfolio category includes websites or physical displays";
  const socialLinks = Array.isArray(f.socialLinks) ? f.socialLinks : [];
  const quickLinksTitle = f.quickLinksTitle || "Quick Link";
  const darkLinks = Array.isArray(f.footerLinks) ? f.footerLinks : footerLinks;
  const lightLinks = Array.isArray(f.footerLinksWhite)
    ? f.footerLinksWhite
    : footerLinksWhite;
  const contactTitle = f.contactTitle || "Contact";
  const contactItems = Array.isArray(f.contactItems) ? f.contactItems : [];

  const ns = cmsContent?.newsletterSection || {};
  const nsTitle = ns.title || "Newslatter";
  const nsPara =
    ns.para ||
    "The personal portfolio categor includes the a websites or representation";
  const nsPlaceholder = ns.placeholder || "Your e-mail";
  const nsIconClass = ns.iconClass || "fa-solid fa-arrow-right";

  return (
    <>
      <footer className="footer-area footer-style-two-wrapper bg-color-footer bg_images tmp-section-gap">
        <div className="container">
          <div className="footer-main footer-style-two">
            <div className="row g-5">
              <div className="col-lg-3 col-md-4 col-sm-6">
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
                  <p className="description">{description}</p>
                  <div className="social-link footer">
                    {socialLinks.map((s, index) => (
                      <a href={s.href || "#"} key={index}>
                        <i className={s.iconClass} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-6">
                <div className="quick-link-wrap">
                  <h5 className="ft-title">{quickLinksTitle}</h5>
                  <ul className="ft-link tmp-scroll-trigger dark-content animation-order-1 tmp-link-animation">
                    {darkLinks.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="ft-link tmp-scroll-trigger light-content2 animation-order-1 tmp-link-animation">
                    {lightLinks.map((item, index) => (
                      <li key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer-wrapper contact-wrap">
                  <h5 className="ft-title">{contactTitle}</h5>
                  <ul className="ft-link tmp-scroll-trigger animation-order-1 tmp-link-animation">
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
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="newslatter tmp-scroll-trigger animation-order-1">
                  <h3 className="title">{nsTitle}</h3>
                  <p className="para">{nsPara}</p>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="newsletter-form-1"
                  >
                    <input
                      type="email"
                      placeholder={nsPlaceholder}
                      suppressHydrationWarning
                    />
                    <span>
                      <a href="#" className="form-icon">
                        <i className={nsIconClass} />
                      </a>
                    </span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
