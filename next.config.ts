import type { NextConfig } from "next";

// Xuất tĩnh ra thư mục `out/` để deploy lên Firebase Hosting (firebase.json → "public": "out").
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
