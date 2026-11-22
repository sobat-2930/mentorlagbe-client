import type { NextConfig } from "next";

const API = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    // BetterAuth server e cholbe, client same-origin e proxy kore
    return [{ source: "/api/auth/:path*", destination: `${API}/api/auth/:path*` }];
  },
};

export default nextConfig;