import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.ytimg.com', 'pbs.twimg.com'],
  },
  // Cron jobs via Vercel
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;