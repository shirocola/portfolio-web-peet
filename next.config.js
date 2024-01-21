// next.config.js

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        // Optionally, you can also specify pathname and port
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // Add more patterns as needed
      },
      // ... add any other domains you use for images
    ],
  },
  // ... other Next.js config options
};
