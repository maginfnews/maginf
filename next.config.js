/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Para compatibilidade com Create React App
  trailingSlash: false,
  // Configuração de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig
