import React from "react";
import Image from "next/image";
import Link from "next/link";
import OnepageNav2 from "./OnepageNav2";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";
export default function Header3({ cmsContent }) {
  const resolvedPortrait = resolveCmsMediaSrc(
    cmsContent?.darkLogo ||
      cmsContent?.lightLogo ||
      "/assets/images/banner/header-left-user.jpg"
  );
  const portraitW = Number(cmsContent?.logoWidthDark) || 350;
  const portraitH = Number(cmsContent?.logoHeightDark) || 350;
  return (
    <div className="d-none d-xl-block header-style-2 header-left">
      <header className="tmp-header-area d-flex align-items-start flex-column header-left-sticky">
        <div className="inner-wrapper">
          <div className="logo-area">
            <Link href={`/`}>
              <Image
                alt={cmsContent?.logoAlt || "personal-logo"}
                src={resolvedPortrait}
                width={portraitW}
                height={portraitH}
              />
            </Link>
          </div>
          <nav
            id="sideNavs"
            className="mainmenu-nav navbar-example2 onepagenav"
          >
            <ul className="primary-menu nav nav-pills">
              <OnepageNav2 />
            </ul>
          </nav>
          <div className="footer">
            <div className="social-share-style-1">
              <span className="title">Find With Me</span>
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
          </div>
        </div>
      </header>
    </div>
  );
}
