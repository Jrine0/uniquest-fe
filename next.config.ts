import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 this enables static export
  images: {
    unoptimized: true, // GitHub Pages doesn't support next/image optimization
  },
  basePath: "/uniquest-fe", // 👈 replace with your GitHub repo name
  assetPrefix: "/uniquest-fe/", // same as above
};

export default nextConfig;
