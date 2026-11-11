import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: "standalone",
    experimental: {
        optimizeCss: true,
    },
    images: {
        dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
        unoptimized: process.env.NODE_ENV === "development",
        qualities: [70, 75, 95],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.romanofinger.ir",
            },
            {
                protocol: "https",
                hostname: "c377485.parspack.net",
            },
        ],
    },
    async redirects() {
        return [
            // The catalog lives at /products now — keep old links working.
            {
                source: "/p",
                destination: "/products",
                permanent: true,
            },
            {
                source: "/p/:slug",
                destination: "/products/:slug",
                permanent: true,
            },
        ]
    },
}

export default nextConfig
