/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudinary images are already optimized and sometimes time out when
    // proxied through Next's built-in image optimizer (/_next/image) in dev.
    // Serving them directly avoids upstream timeouts.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  sassOptions: {
    quietDeps: true, // This will silence deprecation warnings
    silenceDeprecations: ["mixed-decls", "legacy-js-api"],
  },
};

export default nextConfig;
