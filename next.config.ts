import type { NextConfig } from 'next';
const env = process.env.NEXT_PUBLIC_REACT_ENV;

const nextConfig: NextConfig = {
  ...(env !== 'dev' && {
    devIndicators: false,
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
      },
    ],
  },
};

export default nextConfig;
