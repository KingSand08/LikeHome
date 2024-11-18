/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
        {
        protocol: "https",
        hostname: "**",
        },
    ],
    domains: ["lh3.googleusercontent.com", "images.unsplash.com"],
    },
};

export default nextConfig;
