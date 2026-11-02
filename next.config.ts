import type { NextConfig } from "next";

// Chạy trên Vercel: trang chủ vẫn được dựng sẵn (tĩnh), riêng /api/dang-ky chạy phía server.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
