/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   'lh3.googleusercontent.com',
    //   'ssl.pstatic.net',
    //   'phinf.pstatic.net',
    // ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
    //     port: '', // 기본값으로 비워 두거나 필요한 경우 포트 번호를 추가
    //     pathname: '/**', // 모든 경로를 허용
    //   },
    // ],
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
