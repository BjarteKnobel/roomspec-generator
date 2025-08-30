/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
    serverActions: {
      bodySizeLimit: '2mb'
    },
    outputFileTracingIncludes: {
      'app/api/calculate/route.ts': ['../src/config/**']
    }
  }
}

export default nextConfig

