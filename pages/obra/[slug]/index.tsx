import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function ObraLogin() {
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
    if (senha === cliente.senha_tecnico) {
      sessionStorage.setItem(`obra_auth_${slug}`, '1')
      router.push(`/obra/${slug}/registrar`)
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
        <p className="text-gray-500 text-lg font-medium">Obra não encontrada</p>
        <p className="text-gray-400 text-sm mt-2">Verifique o endereço ou entre em contato com a MAGINF.</p>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Vistoria {cliente.nome} – MAGINF</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-maginf-gray px-6 py-8 text-center">
              <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-9 w-auto mx-auto mb-4" />
              {cliente.logo_url && (
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gray-600" />
                  <div className="bg-white rounded-lg px-3 py-1.5">
                    <img src={cliente.logo_url} alt={cliente.nome} className="h-10 w-auto object-contain" />
                  </div>
                  <div className="h-px flex-1 bg-gray-600" />
                </div>
              )}
              <h1 className="text-white font-bold text-lg">{cliente.nome}</h1>
              <p className="text-gray-400 text-sm mt-1">Sistema de Vistoria – Equipe Técnica</p>
            </div>
            <div className="px-6 py-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-maginf-gray mb-2">Senha da equipe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input type={showSenha ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} required
                      placeholder="Digite a senha"
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange outline-none text-maginf-gray" />
                    <button type="button" onClick={() => setShowSenha(!showSenha)} className="absolute right-3 top-3.5 text-gray-400">
                      {showSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {erro && <div className="bg-red-50 border border-red-200 rounded-lg p-3"><p className="text-red-600 text-sm text-center">{erro}</p></div>}
                <button type="submit" disabled={loading || !senha}
                  className="w-full bg-maginf-orange hover:bg-maginf-orange-dark disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
                  {loading ? 'Verificando...' : 'Entrar'}
                </button>
              </form>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">MAGINF Tecnologia · Uso exclusivo da equipe técnica</p>
        </div>
      </div>
    </>
  )
}
