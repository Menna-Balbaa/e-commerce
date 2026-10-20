import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/*"
      }
    ]
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
