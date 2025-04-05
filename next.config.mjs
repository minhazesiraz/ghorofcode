/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        //  port: '',
        //  pathname: '/account123/**',
        //  search: '',
      },
    ],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     serverActions: true,
//   },
//   output: "standalone", // ✅ Ensures it works with server deployments
//   reactStrictMode: true,
//   transpilePackages: [], // ❌ Remove "mongoose" from here
// };

// export default nextConfig;
