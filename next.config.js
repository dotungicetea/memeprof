/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    serverMinification: false,
  },

  sassOptions: {
    includePaths: ["./src"],
    prependData: `@import "~@styles/colors.scss";`,
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  images: {
    remotePatterns: [
      {
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        hostname: "cyyslmrwxjypirywjmqt.supabase.co",
        pathname: "/**",
      },
      {
        hostname: "efqbixdttdrdsnemjtme.supabase.co",
        pathname: "/**",
      },
      {
        hostname: "memeprof.com",
        pathname: "/**",
      },
      {
        hostname: "app.memeprof.com",
        pathname: "/**",
      },
      {
        hostname: "www.familyhandyman.com",
        pathname: "/**",
      },
      {
        hostname: "memeprof.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
      {
        hostname: "memes.sgp1.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-API-Auth-Key",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
