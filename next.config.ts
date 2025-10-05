import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 this enables static export
  images: {
    unoptimized: true, // GitHub Pages doesn't support next/image optimization
  },
  basePath: "/<your-repo-name>", // 👈 replace with your GitHub repo name
  assetPrefix: "/<your-repo-name>/", // same as above
};

export default nextConfig;
