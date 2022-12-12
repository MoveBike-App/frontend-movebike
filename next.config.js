module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    (config.resolve.fallback = { fs: false, net: false, async_hooks: false, }),
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        loader: "url-loader",
        options: {
          outputPath: "public",
        },
      });
    return config;
  },
};
