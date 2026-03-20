/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mssql"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
