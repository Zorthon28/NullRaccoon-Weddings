/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This line is crucial
  // Other Next.js configurations can go here
  // For example, if you're using Tailwind CSS, you might have:
  // experimental: {
  //   appDir: true,
  // },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"]
  //   });
  //   return config;
  // },
  images: {
    unoptimized: true, // If you're doing a purely static export and not using a Next.js image optimization server
  },
};

module.exports = nextConfig;