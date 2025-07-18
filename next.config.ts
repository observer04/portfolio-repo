/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
