import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/demo/slides-agent",
        destination: "https://slides-agent-client-819221826816.us-central1.run.app/",
      },
      {
        source: "/demo/slides-agent/:path*",
        destination: "https://slides-agent-client-819221826816.us-central1.run.app/:path*",
      },
      {
        source: "/demo/knowledge-base-agent",
        destination: "https://pi-agent-client-819221826816.us-central1.run.app/",
      },
      {
        source: "/demo/knowledge-base-agent/:path*",
        destination: "https://pi-agent-client-819221826816.us-central1.run.app/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
