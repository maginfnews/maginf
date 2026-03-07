import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, Eye, EyeOff, Building2 } from 'lucide-react'

export default function ClienteLogin() {
  const router = useRouter()
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro('')

    const senhaCorreta = process.env.NEXT_PUBLIC_CLIENTE_SENHA || 'marriott@2026'

    if (senha === senhaCorreta) {
      sessionStorage.setItem('cliente_auth', '1')
      router.push('/cliente/painel')
    } else {
      setErro('Senha incorreta. Entre em contato com a MAGINF.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Portal do Cliente – MAGINF Tecnologia</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-maginf-gray to-maginf-gray-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-maginf-orange to-maginf-orange-dark px-8 py-8 text-center">
              <img
                src="/logo-maginf-oficial-white.svg"
                alt="MAGINF Tecnologia"
                className="h-12 w-auto mx-auto mb-4"
              />
              <img
                src="/images/msf.jpg"
                alt="Marriott Sao Paulo Airport"
                className="h-16 w-auto mx-auto mt-2 rounded-lg bg-white px-3 py-1"
              />
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              <h1 className="text-2xl font-bold text-maginf-gray mb-1">Portal do Cliente</h1>
              <p className="text-gray-400 text-sm mb-6">
                Acompanhe, fiscalize e aprove os serviços realizados
              </p>

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
                      placeholder="Digite sua senha"
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
                  className="w-full bg-maginf-orange hover:bg-maginf-orange-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {loading ? 'Verificando...' : 'Acessar Portal'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                  Não tem acesso?{' '}
                  <a href="mailto:sac@maginf.com.br" className="text-maginf-orange hover:underline">
                    Entre em contato com a MAGINF
                  </a>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            © 2026 MAGINF Tecnologia · Todos os direitos reservados
          </p>
        </div>
      </div>
    </>
  )
}
