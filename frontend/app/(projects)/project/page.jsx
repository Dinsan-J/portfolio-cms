import Copyright from "@/components/footers/Copyright";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Portfolio from "@/components/common/Portfolio2";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
import { getPublicSitePayload, getSectionContent } from "@/lib/sectionCms";
export const metadata = {
  title:
    "Project || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default async function page() {
  const site = await getPublicSitePayload();
  const portfolioContent = getSectionContent(site, "portfolio");
  return (
    <>
      <div className="project inner">
        <Header1 />
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title split-collab">Project</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href={`/`}>Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Project</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Portfolio cmsContent={portfolioContent} />
        <Footer3 />
        <Copyright /> <CommonComponents />
      </div>
    </>
  );
}
