/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      {
        source: "/screenplay",
        destination: "/story/script",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
