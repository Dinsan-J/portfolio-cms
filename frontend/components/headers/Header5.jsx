"use client";
import { openMobilemenu2 } from "@/utlis/toggleMobilemenu";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";

export default function Header5({ cmsContent }) {
  const resolvedDarkLogo = resolveCmsMediaSrc(
    cmsContent?.darkLogo || "/assets/images/logo/white-logo-reeni.png"
  );
  const resolvedLogoAlt =
    cmsContent?.logoAlt ||
    "Reeni - Personal Portfolio HTML Template for developers and freelancers";
  const darkW = Number(cmsContent?.logoWidthDark) || 121;
  const darkH = Number(cmsContent?.logoHeightDark) || 41;
  return (
    <div className="tmp-responsive-header-style d-block d-xl-none header-onepage-mobile header--sticky">
      <div className="row align-items-center">
        <div className="col-6">
          <div className="logo">
            <Link href={`/`}>
              <Image
                alt={resolvedLogoAlt}
                width={darkW}
                height={darkH}
                src={resolvedDarkLogo}
              />
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div className="header-right text-end">
            <div className="tmp-side-collups-area d-flex justify-content-end">
              <button
                className="tmp-menu-bars humberger_menu_active"
                suppressHydrationWarning
                onClick={openMobilemenu2}
              >
                <i className="fa-regular fa-bars-staggered"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
