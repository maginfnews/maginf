import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function VistoriaLogin() {
  const router = useRouter()
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')

    const senhaCorreta = process.env.NEXT_PUBLIC_VISTORIA_SENHA || 'marriott2026'

    if (senha === senhaCorreta) {
      sessionStorage.setItem('vistoria_auth', '1')
      router.push('/vistoria/registrar')
    } else {
      setErro('Senha incorreta. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Vistoria de Rede – MAGINF Tecnologia</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-maginf-gray to-maginf-gray-dark flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <img
              src="/logo-maginf-oficial.svg"
              alt="MAGINF Tecnologia"
              className="h-12 w-auto mx-auto mb-4"
            />
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gray-200" />
              <img
                src="/images/msf.jpg"
                alt="Marriott Sao Paulo Airport"
                className="h-12 w-auto"
              />
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <h1 className="text-xl font-bold text-maginf-gray">Sistema de Vistoria</h1>
            <p className="text-gray-500 text-sm mt-1">Projeto de Rede – Marriott Airport</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-maginf-gray mb-2">
                Senha de acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="Digite a senha"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-maginf-gray"
                />
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-maginf-gray"
                >
                  {showSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <p className="text-red-600 text-sm">{erro}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !senha}
              className="w-full bg-maginf-orange hover:bg-maginf-orange-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Acesso restrito a técnicos autorizados
          </p>
        </div>
      </div>
    </>
  )
}
