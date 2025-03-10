import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  image: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 검사 무시
  },
};

export default nextConfig;
