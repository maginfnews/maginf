'use client'

import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react'
import Image from 'next/image'

interface LoginScreenProps {
  onLogin: (userData: any) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulação de autenticação
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simular delay da API
      
      // Validação simples para demo
      if (email.includes('@') && password.length >= 6) {
        const userData = {
          id: '1',
          name: email.split('@')[0].toUpperCase(),
          email: email,
          company: 'Cliente MAGINF',
          role: 'admin',
          lastLogin: new Date().toISOString()
        }
        onLogin(userData)
      } else {
        setError('Credenciais inválidas. Use um email válido e senha com 6+ caracteres.')
      }
    } catch (err) {
      setError('Erro ao conectar. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-maginf-lg">
            <div className="text-2xl font-title font-bold text-maginf-orange">M</div>
          </div>
          <h1 className="text-3xl font-title text-white mb-2">
            Portal MAGINF
          </h1>
          <p className="text-maginf-gray text-sm">
            Bem-vindo ao painel de monitoramento Maginf<br />
            <span className="text-maginf-orange">tecnologia e segurança 24h</span>
          </p>
        </div>

        {/* Form de Login */}
        <div className="card-maginf">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-maginf-dark mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maginf-gray w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-maginf-gray rounded-maginf focus:ring-2 focus:ring-maginf-orange focus:border-maginf-orange outline-none transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-maginf-dark mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maginf-gray w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-maginf-gray rounded-maginf focus:ring-2 focus:ring-maginf-orange focus:border-maginf-orange outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-maginf-gray hover:text-maginf-dark"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-maginf text-sm">
                {error}
              </div>
            )}

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-maginf py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="spinner mr-2"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Acessar Portal
                </>
              )}
            </button>
          </form>

          {/* Links auxiliares */}
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="text-sm text-maginf-orange hover:text-maginf-orange-dark">
              Esqueceu sua senha?
            </a>
            <div className="text-xs text-maginf-gray-dark">
              Problemas de acesso? Entre em contato com o suporte MAGINF
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-maginf-gray text-xs">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-maginf-orange" />
            <span>Conexão segura e criptografada</span>
          </div>
          <div>
            © 2024 MAGINF Tecnologia. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  )
}
