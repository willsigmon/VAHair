import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Security headers and www redirect are managed in vercel.json.
  // Pages are statically prerendered; API routes + /og.png stay dynamic.
};

export default nextConfig;
