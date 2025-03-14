// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false, // Strict Mode 여부
  // 해당 도메인 이미지 로드 허용
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
