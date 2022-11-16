
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config,{ isServer } ) => {
    config.resolve.fallback = { fs: false },
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      loader: "url-loader",
      options: {
        outputPath: "public",
      }
    });
    return config;
  }

}
