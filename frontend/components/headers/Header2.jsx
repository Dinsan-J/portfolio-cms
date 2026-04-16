"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { openMobilemenu2 } from "@/utlis/toggleMobilemenu";
import OnepageNav from "./OnepageNav";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";
export default function Header2({
  cmsContent,
  darkLogo = "/assets/images/logo/white-logo-reeni.png",
  lightLogo = "/assets/images/logo/logo-white.png",
}) {
  const resolvedDarkLogo = resolveCmsMediaSrc(cmsContent?.darkLogo || darkLogo);
  const resolvedLightLogo = resolveCmsMediaSrc(cmsContent?.lightLogo || lightLogo);
  const resolvedLogoAlt =
    cmsContent?.logoAlt ||
    "Reeni - Personal Portfolio HTML Template for developers and freelancers";
  const darkW = Number(cmsContent?.logoWidthDark) || 121;
  const darkH = Number(cmsContent?.logoHeightDark) || 41;
  const lightW = Number(cmsContent?.logoWidthLight) || 121;
  const lightH = Number(cmsContent?.logoHeightLight) || 40;
  return (
    <header className="tmp-header-area-start header-one header--sticky header--transparent">
      {/* header mid area start */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-content">
              <div className="logo">
                <Link href={`/`}>
                  <Image
                    className="logo-dark"
                    alt={resolvedLogoAlt}
                    src={resolvedDarkLogo}
                    width={darkW}
                    height={darkH}
                  />
                  <Image
                    className="logo-white"
                    alt={resolvedLogoAlt}
                    src={resolvedLightLogo}
                    width={lightW}
                    height={lightH}
                  />
                </Link>
              </div>
              <div className="tmp-mainmenu-nav d-none d-xl-block">
                <nav className="navbar-example2 onepagenav">
                  <ul className="tmp-mainmenu nav nav-pills">
                    <OnepageNav />
                  </ul>
                </nav>
              </div>
              <div className="tmp-header-right">
                <div className="social-share-wrapper d-none d-md-block">
                  <div className="social-link">
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
                <div className="tmp-side-collups-area d-block d-xl-none">
                  <button
                    className="hamberger-menu humberger_menu_active"
                    onClick={openMobilemenu2}
                  >
                    <i
                      id="menuBtn"
                      className="fa-light fa-bars humberger-menu"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header mid area end */}
    </header>
  );
}
