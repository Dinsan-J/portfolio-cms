import React from "react";
import Image from "next/image";
import { blogData2 } from "@/data/blogs";

import Link from "next/link";
import { resolveCmsMediaSrc } from "@/lib/cmsMedia";
export default function Blogs({
  parentClass = "blog-and-news-are tmp-section-gap",
  isLight = false,
  cmsContent,
}) {
  const sectionHead = cmsContent?.sectionHead;
  const subtitle = sectionHead?.subtitle || "Blog and news";
  const titleLine1 = sectionHead?.titleLines?.[0] || "Elevating Personal Branding the";
  const titleLine2 = sectionHead?.titleLines?.[1] || "through Powerful Portfolios";

  const posts =
    Array.isArray(cmsContent?.posts) && cmsContent.posts.length
      ? cmsContent.posts
      : blogData2;
  const readMoreLabel = cmsContent?.readMoreLabel || "Read More";
  const readMoreIcon = cmsContent?.readMoreIcon || "fa-solid fa-angle-right";
  return (
    <section className={parentClass} id="blog">
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">{subtitle}</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            {titleLine1} <br />
            {titleLine2}
          </h2>
        </div>
        <div className="row">
          {posts.map((blog) => {
            return (
              <div key={blog.id} className="col-lg-4 col-md-6 col-sm-6">
                <div
                  className={`blog-card tmp-hover-link image-box-hover tmp-scroll-trigger tmp-fade-in ${blog.animationOrder}`}
                >
                  <div className="img-box">
                    <Link
                      href={`/blog-details${isLight ? "-white" : ""}/${
                        blog.slug
                      }`}
                    >
                      <Image
                        className="w-100"
                        alt={blog.altText}
                        src={resolveCmsMediaSrc(blog.imageSrc)}
                        width={410}
                        height={294}
                      />
                    </Link>
                    <ul className="blog-tags">
                      <li>
                        <span className="tag-icon">
                          <i className="fa-regular fa-user" />
                        </span>
                        {blog.author}
                      </li>
                      <li>
                        <span className="tag-icon">
                          <i className="fa-solid fa-calendar-days" />
                        </span>
                        {blog.date}
                      </li>
                    </ul>
                  </div>
                  <div className="blog-content-wrap">
                    <h3 className="blog-title">
                      <Link
                        className="link"
                        href={`/blog-details${isLight ? "-white" : ""}/${
                          blog.slug
                        }`}
                      >
                        {blog.title}
                      </Link>
                    </h3>
                    <div className="more-btn tmp-link-animation">
                      <Link
                        href={`/blog-details${isLight ? "-white" : ""}/${
                          blog.slug
                        }`}
                        className="read-more-btn"
                      >
                        {readMoreLabel}
                        <span className="read-more-icon">
                          <i className={readMoreIcon} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
