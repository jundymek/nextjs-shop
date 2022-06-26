/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com", "naszsklep-api.vercel.app", "fakestoreapi.com"],
  },
};

module.exports = nextConfig;
