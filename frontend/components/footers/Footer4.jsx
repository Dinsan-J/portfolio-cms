import React from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

export default function Footer4({ cmsContent }) {
  const darkLogo = resolveCmsMediaSrc(
    cmsContent?.darkLogo || "/assets/images/logo/white-logo-reeni.png",
  );
  const lightLogo = resolveCmsMediaSrc(
    cmsContent?.lightLogo || "/assets/images/logo/logo-white.png",
  );
  const logoAlt =
    cmsContent?.logoAlt ||
    "Reeni - Personal Portfolio HTML Template for developers and freelancers";
  const copy = cmsContent?.copyright || {};
  const yearSuffix = copy.linePrefix || ". All rights reserved by";
  const ownerLabel = copy.ownerLabel || "Inversweb.";
  const ownerHref =
    copy.ownerHref ||
    "https://themeforest.net/user/inversweb/portfolio";
  const year = new Date().getFullYear();

  return (
    <>
      <div className="tmp-footer-area footer-style-4 tmp-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-area text-center">
                <div className="logo">
                  <Link href={`/`}>
                    <Image
                      className="logo-dark dark-content"
                      alt={logoAlt}
                      src={darkLogo}
                      width={121}
                      height={41}
                    />
                    <div
                      className="light-content "
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Image
                        className=""
                        alt={logoAlt}
                        src={lightLogo}
                        width={121}
                        height={40}
                      />
                    </div>
                  </Link>
                </div>
                <p className="description mt--30">
                  © {year}
                  {yearSuffix}
                  <a target="_blank" rel="noreferrer" href={ownerHref}>
                    {ownerLabel}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
