import Copyright from "@/components/footers/Copyright";
import Footer3 from "@/components/footers/Footer3";
import Header1 from "@/components/headers/Header1";
import Contact from "@/components/common/Contact2";
import Link from "next/link";
import React from "react";
import CommonComponents from "@/components/common/CommonComponents";
import { getPublicSitePayload, getSectionContent } from "@/lib/sectionCms";
export const metadata = {
  title:
    "Contact || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default async function page() {
  const site = await getPublicSitePayload();
  const contactContent = getSectionContent(site, "contact");
  return (
    <>
      <div className="tmp-white-version">
        <Header1 />
        <div className="breadcrumb-area breadcrumb-bg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title split-collab">Contact</h1>
                  <ul className="page-list">
                    <li className="tmp-breadcrumb-item">
                      <Link href={`/`}>Home</Link>
                    </li>
                    <li className="icon">
                      <i className="fa-solid fa-angle-right" />
                    </li>
                    <li className="tmp-breadcrumb-item active">Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Contact cmsContent={contactContent} />
        <Footer3 />
        <Copyright /> <CommonComponents />
      </div>
    </>
  );
}
