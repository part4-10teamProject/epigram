/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns은 외부 이미지 소스를 정의하는데 사용된다.
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
