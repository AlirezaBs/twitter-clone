/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [process.env.NEXT_PUBLIC_API_URL_NEXTJS],
  },
}

module.exports = nextConfig
