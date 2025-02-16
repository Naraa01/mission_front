/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['mn', 'fr', 'nl-NL', 'en-US'],
    defaultLocale: 'mn',
    localeDetection: false,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: process.env.CLOUD_IMAGE_URL,
      // },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
    ],
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
