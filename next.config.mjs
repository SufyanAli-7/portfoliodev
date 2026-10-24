/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90],
  },
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
