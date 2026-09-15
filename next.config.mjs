/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/666255f7f2126f4e8cec6f8f/**",
      },
    ],
  },
};

export default nextConfig;
