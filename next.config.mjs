/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
  eslint:{
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
=======
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    UNISAT_API_KEY: process.env.UNISAT_API_KEY
  },
  images: {
    remotePatterns: [
      {
        hostname: 'next-cdn.unisat.io',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
>>>>>>> 8b30526 (push order & checkout TA)
