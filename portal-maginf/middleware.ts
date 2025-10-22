import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    
    // Log de segurança para monitoramento
    console.log(`[SECURITY] Middleware executado para: ${pathname} | User: ${req.nextauth.token?.email || 'não autenticado'} | Role: ${req.nextauth.token?.role || 'N/A'}`)
    
    // Permitir acesso à página de login
    if (pathname === '/login') {
      return NextResponse.next()
    }

    // PROTEÇÃO CRÍTICA: Área administrativa
    if (pathname.startsWith('/admin')) {
      if (!req.nextauth.token) {
        console.log(`[SECURITY ALERT] Tentativa de acesso não autenticado à área admin: ${req.url}`)
        return NextResponse.redirect(new URL('/login?callbackUrl=' + encodeURIComponent(req.url), req.url))
      }
      
      if (req.nextauth.token.role !== 'ADMIN') {
        console.log(`[SECURITY ALERT] Tentativa de acesso não autorizado à área admin: ${req.nextauth.token.email} (Role: ${req.nextauth.token.role})`)
        return NextResponse.redirect(new URL('/?error=access_denied&reason=insufficient_privileges', req.url))
      }
      
      console.log(`[SECURITY OK] Acesso autorizado à área admin: ${req.nextauth.token.email}`)
    }

    // PROTEÇÃO CRÍTICA: APIs administrativas
    if (pathname.startsWith('/api/admin')) {
      if (!req.nextauth.token) {
        console.log(`[SECURITY ALERT] Tentativa de acesso não autenticado à API admin: ${req.url}`)
        return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
      }
      
      if (req.nextauth.token.role !== 'ADMIN') {
        console.log(`[SECURITY ALERT] Tentativa de acesso não autorizado à API admin: ${req.nextauth.token.email} (Role: ${req.nextauth.token.role})`)
        return NextResponse.json({ error: 'Acesso negado - privilégios insuficientes' }, { status: 403 })
      }
      
      console.log(`[SECURITY OK] Acesso autorizado à API admin: ${req.nextauth.token.email}`)
    }

    // Verificação geral de autenticação para outras páginas
    if (!req.nextauth.token) {
      console.log(`[SECURITY] Redirecionando usuário não autenticado: ${pathname}`)
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Permitir acesso à página de login mesmo sem token
        if (pathname === '/login') {
          return true
        }
        
        // DUPLA VERIFICAÇÃO: Área administrativa
        if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
          if (!token) {
            console.log(`[SECURITY] Callback authorized: Token ausente para área admin`)
            return false
          }
          
          if (token.role !== 'ADMIN') {
            console.log(`[SECURITY] Callback authorized: Role insuficiente para área admin - ${token.email} (${token.role})`)
            return false
          }
          
          return true
        }
        
        // Para outras rotas, exigir apenas token válido
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication routes)
     * - api/test (test routes)
     * - api/debug (debug routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|api/test|api/debug|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
