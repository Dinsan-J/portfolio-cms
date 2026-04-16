"use client";
import React from "react";
import Nav1 from "./Nav1";
import Link from "next/link";
import Image from "next/image";
import { openSidebar } from "@/utlis/toggleSidebar";
import { openMobilemenu2 } from "@/utlis/toggleMobilemenu";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";
export default function Header4({ cmsContent }) {
  const resolvedDarkLogo = resolveCmsMediaSrc(
    cmsContent?.darkLogo || "/assets/images/logo/white-logo-reeni.png"
  );
  const resolvedLightLogo = resolveCmsMediaSrc(
    cmsContent?.lightLogo || "/assets/images/logo/logo-white.png"
  );
  const resolvedLogoAlt =
    cmsContent?.logoAlt ||
    "Reeni - Personal Portfolio HTML Template for developers and freelancers";
  const darkW = Number(cmsContent?.logoWidthDark) || 121;
  const darkH = Number(cmsContent?.logoHeightDark) || 41;
  const lightW = Number(cmsContent?.logoWidthLight) || 121;
  const lightH = Number(cmsContent?.logoHeightLight) || 40;
  return (
    <header className="header-full-width header--sticky">
      <div className="container-fluid-13">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-fluid-main-wrapper">
              <div className="left-area">
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
                <nav className="tmp-mainmenu-nav d-none d-xl-block">
                  <Nav1 />
                </nav>
              </div>
              <div className="right-area">
                <Link href={`/contact-white`} className="tmp-btn btn-primary">
                  Contact Me
                </Link>
                <div className="actions-area">
                  <div className="tmp-side-collups-area d-none d-xl-block">
                    <button
                      className="tmp-menu-bars tmp_button_active"
                      suppressHydrationWarning
                      onClick={openSidebar}
                    >
                      <i className="fa-regular fa-bars-staggered" />
                    </button>
                  </div>
                  <div className="tmp-side-collups-area d-block d-xl-none">
                    <button
                      className="tmp-menu-bars humberger_menu_active"
                      suppressHydrationWarning
                      onClick={openMobilemenu2}
                    >
                      <i className="fa-regular fa-bars-staggered" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
