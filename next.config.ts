import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 export
  images: { unoptimized: true }, // GH Pages 호환
  basePath: process.env.BASE_PATH || undefined,
  trailingSlash: true, // 정적 라우팅 안정성
};
export default nextConfig;
