/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8)}`,
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
