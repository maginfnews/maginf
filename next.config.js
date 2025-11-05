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
  // Configuração vazia do Turbopack para silenciar o warning
  turbopack: {},
  // Excluir pastas de backup da compilação
  typescript: {
    ignoreBuildErrors: false,
  },
  // Excluir pastas específicas
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig
