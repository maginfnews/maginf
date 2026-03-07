import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'maginf.com.br'
const RESERVADOS = ['www', 'api', 'admin', 'mail', 'smtp', 'ftp', 'blog', 'app']

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || ''
  const { pathname } = req.nextUrl

  // Ignorar estáticos e APIs
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Domínio raiz, localhost ou Vercel preview → comportamento normal
  const isRootDomain =
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}` ||
    hostname.includes('localhost') ||
    hostname.includes('127.0.0.1') ||
    hostname.includes('vercel.app')

  if (isRootDomain) {
    return NextResponse.next()
  }

  // Extrair slug do subdomínio: "marriott.maginf.com.br" → "marriott"
  const slug = hostname.replace(`.${ROOT_DOMAIN}`, '').split('.')[0]

  if (!slug || RESERVADOS.includes(slug)) {
    return NextResponse.next()
  }

  // Roteamento por subdomínio
  // marriott.maginf.com.br/            → /portal/marriott
  // marriott.maginf.com.br/painel      → /portal/marriott/painel
  // marriott.maginf.com.br/obra        → /obra/marriott
  // marriott.maginf.com.br/obra/registrar → /obra/marriott/registrar
  let destino: string

  if (pathname.startsWith('/obra')) {
    const semObra = pathname.replace(/^\/obra(\/[^/]+)?/, '') || ''
    destino = `/obra/${slug}${semObra}`
  } else if (pathname === '/painel') {
    destino = `/portal/${slug}/painel`
  } else if (pathname === '/' || pathname === '') {
    destino = `/portal/${slug}`
  } else {
    destino = `/portal/${slug}${pathname}`
  }

  return NextResponse.rewrite(new URL(destino, req.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
