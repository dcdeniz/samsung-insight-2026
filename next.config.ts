import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three.js ecosystem ships untranspiled ESM add-ons — let Next transpile them.
  transpilePackages: ["three"],
};

export default nextConfig;
