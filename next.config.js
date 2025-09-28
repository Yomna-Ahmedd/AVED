const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  env: {
    BASE_URL: process.env.BASE_URL,
    reCaptchaKey: process.env.reCaptchaKey,
  },
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'aved.s3.us-east-2.amazonaws.com', // ✅ Amazon S3 bucket domain
    ],
  },
};

module.exports = nextConfig; 