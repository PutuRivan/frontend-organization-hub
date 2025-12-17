import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost"
      },
      {
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "http",
        hostname: "localhost:4000",
        pathname: "/public/**",
      },
    ]
  }
};

export default nextConfig;
