'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AlertTriangle, Shield, Lock } from 'lucide-react'

interface AdminProtectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AdminProtection({ children, fallback }: AdminProtectionProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [showUnauthorized, setShowUnauthorized] = useState(false)

  useEffect(() => {
    if (status === 'loading') return

    // Log de segurança detalhado
    console.log('[ADMIN PROTECTION] Verificação de acesso:', {
      authenticated: !!session,
      email: session?.user?.email || 'N/A',
      role: session?.user?.role || 'N/A',
      clientId: session?.user?.clientId || 'N/A',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    })

    if (!session) {
      console.log('[ADMIN PROTECTION] Redirecionando usuário não autenticado')
      router.push('/login?callbackUrl=/admin')
      return
    }

    if (session.user.role !== 'ADMIN') {
      console.log(`[ADMIN PROTECTION ALERT] Acesso negado para: ${session.user.email} (Role: ${session.user.role})`)
      setShowUnauthorized(true)
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push('/?error=access_denied')
      }, 3000)
      return
    }

    console.log(`[ADMIN PROTECTION OK] Acesso autorizado: ${session.user.email}`)
    setIsAuthorized(true)
  }, [session, status, router])

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-maginf-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maginf-orange mx-auto mb-4"></div>
          <p className="text-white">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  // Unauthorized state
  if (showUnauthorized) {
    return fallback || (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-red-800 mb-2">Acesso Negado</h1>
          
          <div className="space-y-3 text-sm text-red-700 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Área restrita a administradores MAGINF</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Sua tentativa foi registrada nos logs</span>
            </div>
          </div>
          
          <div className="bg-red-100 border border-red-200 rounded p-3 mb-4">
            <p className="text-xs text-red-600">
              Usuário: {session?.user?.email}<br />
              Role: {session?.user?.role}<br />
              Timestamp: {new Date().toLocaleString('pt-BR')}
            </p>
          </div>
          
          <p className="text-sm text-gray-600">
            Redirecionando em 3 segundos...
          </p>
        </div>
      </div>
    )
  }

  // Authorized state
  if (isAuthorized) {
    return <>{children}</>
  }

  // Default fallback
  return null
}
