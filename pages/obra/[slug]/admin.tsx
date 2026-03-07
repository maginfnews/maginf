import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  ClipboardList, CheckCircle, Clock, XCircle, Camera,
  LogOut, ChevronDown, ChevronUp, User, Search, RefreshCw,
} from 'lucide-react'

export default function ObraAdmin() {
  const router = useRouter()
  const { slug } = router.query as { slug: string }

  const [cliente, setCliente] = useState<any>(null)
  const [vistorias, setVistorias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'pendente' | 'aprovado' | 'reprovado'>('todos')
  const [fotoAmpliada, setFotoAmpliada] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem(`obra_auth_${slug}`)) { router.replace(`/obra/${slug}`); return }
    }
    carregar()
  }, [slug, router])

  const carregar = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/portal/${slug}/listar`)
      const data = await res.json()
      setCliente(data.cliente || null)
      setVistorias(data.vistorias || [])
    } finally { setLoading(false) }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-maginf-orange border-t-transparent rounded-full" />
    </div>
  )

  const vistoriasFiltradas = vistorias.filter(v => {
    const matchBusca = !busca ||
      v.apartamento?.toLowerCase().includes(busca.toLowerCase()) ||
      v.tecnico?.toLowerCase().includes(busca.toLowerCase()) ||
      v.ordem_servico?.toLowerCase().includes(busca.toLowerCase())
    const matchFiltro = filtro === 'todos' ||
      (filtro === 'pendente' && (!v.aprovado_status || v.aprovado_status === 'pendente')) ||
      filtro === v.aprovado_status
    return matchBusca && matchFiltro
  })

  const total = vistorias.length
  const aprovados = vistorias.filter(v => v.aprovado_status === 'aprovado').length
  const reprovados = vistorias.filter(v => v.aprovado_status === 'reprovado').length
  const pendentes = vistorias.filter(v => !v.aprovado_status || v.aprovado_status === 'pendente').length

  const statusBadge = (s: string) => {
    if (s === 'aprovado') return <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full"><CheckCircle className="h-3 w-3" />Aprovado</span>
    if (s === 'reprovado') return <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full"><XCircle className="h-3 w-3" />Reprovado</span>
    return <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full"><Clock className="h-3 w-3" />Pendente</span>
  }

  return (
    <>
      <Head>
        <title>Painel de Vistorias – {cliente?.nome || slug} – MAGINF</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {fotoAmpliada && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setFotoAmpliada(null)}>
          <img src={fotoAmpliada} alt="Foto" className="max-w-full max-h-full rounded-lg object-contain" />
          <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2" onClick={() => setFotoAmpliada(null)}>✕</button>
        </div>
      )}

      <div className="min-h-screen bg-gray-100">
        <header className="bg-maginf-gray text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
          <div className="flex items-center gap-3">
            <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
            {cliente?.logo_url && (
              <>
                <div className="h-6 w-px bg-gray-500" />
                <img src={cliente.logo_url} alt={cliente.nome} className="h-8 w-auto rounded bg-white px-1.5 py-0.5 object-contain" />
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={carregar} className="text-gray-300 hover:text-white p-2"><RefreshCw className="h-5 w-5" /></button>
            <button onClick={() => router.push(`/obra/${slug}/registrar`)} className="bg-maginf-orange hover:bg-maginf-orange-dark text-white text-xs font-bold px-3 py-2 rounded-lg">+ Nova</button>
            <button onClick={() => { sessionStorage.removeItem(`obra_auth_${slug}`); router.push(`/obra/${slug}`) }} className="text-gray-400 hover:text-white p-2">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="max-w-2xl mx-auto p-4 pb-8 space-y-4">

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[
              { label: 'Total', value: total, color: 'text-maginf-gray', bg: 'bg-white', filtro: 'todos' },
              { label: 'Aprovados', value: aprovados, color: 'text-green-600', bg: 'bg-green-50', filtro: 'aprovado' },
              { label: 'Pendentes', value: pendentes, color: 'text-yellow-600', bg: 'bg-yellow-50', filtro: 'pendente' },
              { label: 'Reprovados', value: reprovados, color: 'text-red-500', bg: 'bg-red-50', filtro: 'reprovado' },
            ].map(s => (
              <button key={s.filtro} onClick={() => setFiltro(s.filtro as any)}
                className={`${s.bg} rounded-xl p-3 text-center shadow-sm transition-all ${filtro === s.filtro ? 'ring-2 ring-maginf-orange' : ''}`}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </button>
            ))}
          </div>

          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar unidade, técnico, OS..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-maginf-orange outline-none" />
          </div>

          {/* Lista */}
          {vistoriasFiltradas.length === 0 && (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm">
              <ClipboardList className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Nenhuma vistoria encontrada.</p>
            </div>
          )}

          {vistoriasFiltradas.map(v => {
            const fotosA = v.vistoria_fotos?.filter((f: any) => f.tipo === 'antes') || []
            const fotosD = v.vistoria_fotos?.filter((f: any) => f.tipo === 'depois') || []
            const borderColor = v.aprovado_status === 'aprovado' ? 'border-l-green-400' : v.aprovado_status === 'reprovado' ? 'border-l-red-400' : 'border-l-yellow-400'
            return (
              <div key={v.id} className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${borderColor}`}>
                <div className="px-4 py-3 flex items-center justify-between cursor-pointer" onClick={() => setExpandido(expandido === v.id ? null : v.id)}>
                  <div>
                    <p className="font-bold text-maginf-gray text-sm">Unidade {v.apartamento}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-gray-400"><User className="h-3 w-3" />{v.tecnico}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{v.data_finalizacao ? new Date(v.data_finalizacao).toLocaleDateString('pt-BR') : '—'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {(fotosA.length + fotosD.length) > 0 && (
                      <span className="flex items-center gap-1 text-xs text-gray-400"><Camera className="h-3 w-3" />{fotosA.length + fotosD.length}</span>
                    )}
                    {statusBadge(v.aprovado_status)}
                    {expandido === v.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                  </div>
                </div>
                {expandido === v.id && (
                  <div className="border-t border-gray-100 px-4 py-4 space-y-3">
                    <p className="text-xs text-gray-400 font-mono">OS: {v.ordem_servico}</p>
                    {v.observacoes && (
                      <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                        <span className="font-semibold">Obs: </span>{v.observacoes}
                      </div>
                    )}
                    {fotosA.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Antes ({fotosA.length})</p>
                        <div className="flex gap-2 flex-wrap">
                          {fotosA.map((f: any) => (
                            <img key={f.id} src={f.url} alt="Antes" onClick={() => setFotoAmpliada(f.url)}
                              className="h-20 w-20 object-cover rounded-lg cursor-zoom-in hover:opacity-90" />
                          ))}
                        </div>
                      </div>
                    )}
                    {fotosD.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Depois ({fotosD.length})</p>
                        <div className="flex gap-2 flex-wrap">
                          {fotosD.map((f: any) => (
                            <img key={f.id} src={f.url} alt="Depois" onClick={() => setFotoAmpliada(f.url)}
                              className="h-20 w-20 object-cover rounded-lg cursor-zoom-in hover:opacity-90" />
                          ))}
                        </div>
                      </div>
                    )}
                    {v.aprovado_status === 'aprovado' && v.aprovado_por && (
                      <div className="bg-green-50 rounded-lg p-3 flex items-center gap-2 text-xs text-green-700">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        <span>Aprovado por <strong>{v.aprovado_por}</strong>{v.aprovado_obs && ` · "${v.aprovado_obs}"`}</span>
                      </div>
                    )}
                    {v.aprovado_status === 'reprovado' && v.aprovado_por && (
                      <div className="bg-red-50 rounded-lg p-3 flex items-center gap-2 text-xs text-red-700">
                        <XCircle className="h-4 w-4 flex-shrink-0" />
                        <span>Reprovado por <strong>{v.aprovado_por}</strong>{v.aprovado_obs && ` · "${v.aprovado_obs}"`}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
