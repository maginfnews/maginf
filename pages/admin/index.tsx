import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setErro('Email ou senha incorretos.')
      setLoading(false)
      return
    }
    router.push('/admin/dashboard')
  }

  return (
    <>
      <Head>
        <title>Admin MAGINF</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-maginf-gray to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-maginf-gray px-8 py-8 text-center">
              <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-10 w-auto mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Área Administrativa</p>
            </div>
            <div className="px-8 py-8">
              <h1 className="text-xl font-bold text-maginf-gray mb-6">Acesso restrito</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-maginf-gray mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                      placeholder="seu@email.com"
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-maginf-gray mb-1">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <input type={showSenha ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} required
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-sm" />
                    <button type="button" onClick={() => setShowSenha(!showSenha)} className="absolute right-3 top-3.5 text-gray-400">
                      {showSenha ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {erro && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{erro}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50">
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
