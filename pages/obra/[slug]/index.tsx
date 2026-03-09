import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, Eye, EyeOff, Plus, ChevronRight, Clock, Trash2, ClipboardList, LogOut } from 'lucide-react'

const ETAPA_LABEL: Record<string, string> = {
  dados: 'Dados',
  fotos_antes: 'Fotos – Antes',
  observacoes: 'Observações',
  fotos_depois: 'Fotos – Depois',
}

function getRascunhos(slug: string): any[] {
  try { return JSON.parse(localStorage.getItem(`obra_rascunhos_${slug}`) || '[]') } catch { return [] }
}
function removerRascunho(slug: string, osId: string) {
  const lista = getRascunhos(slug).filter((r: any) => r.osId !== osId)
  localStorage.setItem(`obra_rascunhos_${slug}`, JSON.stringify(lista))
}

export default function ObraLogin() {
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  const [cliente, setCliente] = useState<any>(null)
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingCliente, setLoadingCliente] = useState(true)
  const [autenticado, setAutenticado] = useState(false)
  const [rascunhos, setRascunhos] = useState<any[]>([])

  useEffect(() => {
    if (!slug) return
    // Verificar se já está autenticado
    if (typeof window !== 'undefined' && sessionStorage.getItem(`obra_auth_${slug}`)) {
      setAutenticado(true)
      setRascunhos(getRascunhos(slug))
    }
    fetch(`/api/portal/${slug}/listar`)
      .then(r => r.json())
      .then(d => {
        setCliente(d.cliente)
        setLoadingCliente(false)
        // Login automático via token na URL
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        if (token && d.cliente && token === d.cliente.senha_tecnico) {
          sessionStorage.setItem(`obra_auth_${slug}`, '1')
          setAutenticado(true)
          setRascunhos(getRascunhos(slug))
        }
      })
      .catch(() => setLoadingCliente(false))
  }, [slug])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cliente) return
    setLoading(true)
    setErro('')
    if (senha === cliente.senha_tecnico) {
      sessionStorage.setItem(`obra_auth_${slug}`, '1')
      setAutenticado(true)
      setRascunhos(getRascunhos(slug))
      setLoading(false)
    } else {
      setErro('Senha incorreta. Entre em contato com a MAGINF.')
      setLoading(false)
    }
  }

  const handleDescartar = (osId: string) => {
    removerRascunho(slug, osId)
    setRascunhos(getRascunhos(slug))
  }

  // Tela de lista de OS (após autenticado)
  if (autenticado && !loadingCliente) {
    return (
      <>
        <Head>
          <title>Vistorias {cliente?.nome || slug} – MAGINF</title>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-maginf-gray text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
            <div className="flex items-center gap-3">
              <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
              {cliente?.logo_url && (
                <>
                  <div className="h-6 w-px bg-gray-500" />
                  <img src={cliente.logo_url} alt={cliente.nome} className="h-7 w-auto rounded bg-white px-1.5 py-0.5 object-contain" />
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push(`/obra/${slug}/admin`)} className="text-gray-300 hover:text-white p-2" title="Painel">
                <ClipboardList className="h-5 w-5" />
              </button>
              <button onClick={() => { sessionStorage.removeItem(`obra_auth_${slug}`); setAutenticado(false) }} className="text-gray-400 hover:text-white p-2">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="max-w-lg mx-auto p-4 pb-8">
            <div className="flex items-center justify-between mt-4 mb-4">
              <div>
                <h1 className="text-lg font-bold text-maginf-gray">{cliente?.nome}</h1>
                <p className="text-xs text-gray-400">Ordens de Serviço em andamento</p>
              </div>
              <button onClick={() => router.push(`/obra/${slug}/registrar`)}
                className="flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm">
                <Plus className="h-4 w-4" />Nova OS
              </button>
            </div>

            {rascunhos.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ClipboardList className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-maginf-gray font-semibold mb-1">Nenhuma OS em andamento</p>
                <p className="text-gray-400 text-sm mb-6">Inicie uma nova vistoria para começar.</p>
                <button onClick={() => router.push(`/obra/${slug}/registrar`)}
                  className="bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 mx-auto">
                  <Plus className="h-5 w-5" />Iniciar primeira vistoria
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {rascunhos.map((r: any) => (
                  <div key={r.osId} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <button onClick={() => router.push(`/obra/${slug}/registrar?osId=${r.osId}`)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-maginf-gray text-base">Apto {r.apartamento}</span>
                            <span className="text-xs bg-maginf-orange/10 text-maginf-orange font-semibold px-2 py-0.5 rounded-full">
                              {ETAPA_LABEL[r.etapa] || r.etapa}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 font-mono">{r.ordemServico}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                            <span>📸 {r.fotosAntes?.length || 0} antes</span>
                            <span>📸 {r.fotosDepois?.length || 0} depois</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(r.salvoEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-300 flex-shrink-0 ml-2" />
                      </div>
                    </button>
                    <div className="border-t border-gray-100 px-4 py-2 flex justify-end">
                      <button onClick={() => handleDescartar(r.osId)}
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />Descartar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    )
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
