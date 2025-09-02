/** @type {import('next').NextConfig} */
const config = {

  reactStrictMode: true, 
};
const nextConfig = {
  eslint: {
    ignoreDuringBuilds:true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
//module.exports = nextConfig;

export default config;