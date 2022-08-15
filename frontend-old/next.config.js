module.exports = {
  reactStrictMode: true,
  // https://jameschambers.co.uk/nextjs-hot-reload-docker-development
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
  // future: {
  //   webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
  //   // Looks like backward compatibility approach.
  // },
  webpack(config) {
    config.resolve.fallback = {
      fs: false, // the solution
    }

    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:3000/:path*',
      },
    ]
  },
};
