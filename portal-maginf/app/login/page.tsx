'use client'

import { useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Email ou senha incorretos')
      } else {
        // Login bem-sucedido, redirecionar para callback ou dashboard
        const redirectUrl = callbackUrl || '/'
        router.push(redirectUrl)
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-maginf-orange/10 to-maginf-gray-light/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-maginf-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">M</span>
          </div>
          <h1 className="text-2xl font-title text-maginf-dark mb-2">Portal MAGINF</h1>
          <p className="text-maginf-gray-dark">
            {callbackUrl?.includes('/admin') 
              ? 'Faça login para acessar a área de administração' 
              : 'Acesse seu painel de monitoramento'
            }
          </p>
        </div>

        {/* Alerta para área admin */}
        {callbackUrl?.includes('/admin') && (
          <div className="mb-6 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-maginf">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <div>
                <p className="font-medium">Área Administrativa</p>
                <p className="text-sm">Esta área é restrita a administradores MAGINF.</p>
              </div>
            </div>
          </div>
        )}

        {/* Formulário de Login */}
        <div className="card-maginf">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-maginf-dark mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-maginf-gray-dark" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-maginf placeholder-maginf-gray-dark focus:outline-none focus:ring-2 focus:ring-maginf-orange focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-maginf-dark mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-maginf-gray-dark" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-maginf placeholder-maginf-gray-dark focus:outline-none focus:ring-2 focus:ring-maginf-orange focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-maginf-gray-dark hover:text-maginf-dark" />
                  ) : (
                    <Eye className="h-5 w-5 text-maginf-gray-dark hover:text-maginf-dark" />
                  )}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-maginf p-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-800">{error}</span>
                </div>
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maginf-orange text-white py-3 px-4 rounded-maginf font-medium hover:bg-maginf-orange-dark focus:outline-none focus:ring-2 focus:ring-maginf-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Informações de Teste */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-maginf">
          <h3 className="font-medium text-blue-900 mb-2">Contas de Teste:</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div>
              <strong>Admin MAGINF:</strong><br />
              admin@maginf.com.br / maginf2024
            </div>
            <div>
              <strong>Cliente Exemplo:</strong><br />
              admin@empresaexemplo.com.br / 123456
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-maginf-gray-dark">
          <p>&copy; 2024 MAGINF Tecnologia. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
