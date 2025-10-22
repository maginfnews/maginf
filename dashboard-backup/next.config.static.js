/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para build estático (sem APIs)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // Desabilitar APIs no build estático
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  }
}

module.exports = nextConfig
