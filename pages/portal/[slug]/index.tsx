import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function PortalLogin() {
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  const [cliente, setCliente] = useState<any>(null)
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingCliente, setLoadingCliente] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/portal/${slug}/listar`)
      .then(r => r.json())
      .then(d => { setCliente(d.cliente); setLoadingCliente(false) })
      .catch(() => setLoadingCliente(false))
  }, [slug])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cliente) return
    setLoading(true)
    setErro('')
    if (senha === cliente.senha_cliente) {
      sessionStorage.setItem(`portal_auth_${slug}`, '1')
      const isSubdomain = typeof window !== 'undefined' &&
        window.location.hostname !== process.env.NEXT_PUBLIC_ROOT_DOMAIN &&
        !window.location.hostname.includes('localhost') &&
        !window.location.hostname.includes('vercel.app')
      router.push(isSubdomain ? '/painel' : `/portal/${slug}/painel`)
    } else {
      setErro('Senha incorreta. Entre em contato com a MAGINF.')
      setLoading(false)
    }
  }

  if (loadingCliente) return (
    <div className="min-h-screen bg-gradient-to-br from-maginf-gray to-slate-900 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-maginf-orange border-t-transparent rounded-full" />
    </div>
  )

  if (!cliente) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-gray-500 text-lg font-medium">Portal não encontrado</p>
        <p className="text-gray-400 text-sm mt-2">Verifique o endereço ou entre em contato com a MAGINF.</p>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Portal {cliente.nome} – MAGINF Tecnologia</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-maginf-gray to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-maginf-gray px-8 py-8 text-center">
              <img src="/logo-maginf-oficial-white.svg" alt="MAGINF Tecnologia" className="h-10 w-auto mx-auto mb-5" />
              {cliente.logo_url && (
                <div className="bg-white rounded-xl px-6 py-3 inline-block">
                  <img src={cliente.logo_url} alt={cliente.nome} className="h-14 w-auto mx-auto object-contain" />
                </div>
              )}
              {!cliente.logo_url && (
                <p className="text-white font-bold text-xl">{cliente.nome}</p>
              )}
            </div>
            <div className="px-8 py-8">
              <h1 className="text-2xl font-bold text-maginf-gray mb-1">Portal do Cliente</h1>
              <p className="text-gray-400 text-sm mb-6">Acompanhe, fiscalize e aprove os serviços realizados</p>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-maginf-gray mb-2">Senha de acesso</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type={showSenha ? 'text' : 'password'}
                      value={senha} onChange={e => setSenha(e.target.value)} required
                      placeholder="Digite sua senha"
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-maginf-gray"
                    />
                    <button type="button" onClick={() => setShowSenha(!showSenha)} className="absolute right-3 top-3.5 text-gray-400">
                      {showSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {erro && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center"><p className="text-red-600 text-sm">{erro}</p></div>}
                <button type="submit" disabled={loading || !senha}
                  className="w-full bg-maginf-orange hover:bg-maginf-orange-dark disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  {loading ? 'Verificando...' : 'Acessar Portal'}
                </button>
              </form>
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">Não tem acesso? <a href="mailto:sac@maginf.com.br" className="text-maginf-orange hover:underline">Entre em contato com a MAGINF</a></p>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">© 2026 MAGINF Tecnologia · Todos os direitos reservados</p>
        </div>
      </div>
    </>
  )
}
