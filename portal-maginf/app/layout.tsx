import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portal MAGINF - Monitoramento Tecnológico',
  description: 'Painel de monitoramento centralizado - Tecnologia e segurança 24h',
  keywords: 'monitoramento, servidores, backup, MAGINF, tecnologia',
  authors: [{ name: 'MAGINF Tecnologia' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'noindex, nofollow', // Portal privado
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ff6a00" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
