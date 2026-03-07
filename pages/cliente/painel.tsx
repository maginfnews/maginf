import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  CheckCircle,
  XCircle,
  Clock,
  Camera,
  ChevronDown,
  ChevronUp,
  LogOut,
  Printer,
  Mail,
  Building2,
  Search,
  BarChart3,
  Home,
  User,
  Calendar,
  MessageSquare,
  Send,
} from 'lucide-react'

type Foto = { id: string; url: string; tipo: 'antes' | 'depois'; timestamp: string }

type Vistoria = {
  id: string
  apartamento: string
  ordem_servico: string
  tecnico: string
  observacoes: string
  status: string
  projeto: string
  data_criacao: string
  data_finalizacao: string
  aprovado_status: string
  aprovado_em: string
  aprovado_por: string
  aprovado_obs: string
  vistoria_fotos: Foto[]
}

type ModalAprovar = {
  id: string
  apartamento: string
  acao: 'aprovado' | 'reprovado'
} | null

export default function ClientePainel() {
  const router = useRouter()
  const [vistorias, setVistorias] = useState<Vistoria[]>([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'pendente' | 'aprovado' | 'reprovado'>('todos')
  const [fotoAmpliada, setFotoAmpliada] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalAprovar>(null)
  const [obsModal, setObsModal] = useState('')
  const [loadingAprovar, setLoadingAprovar] = useState(false)
  const [enviandoEmail, setEnviandoEmail] = useState(false)
  const [emailEnviado, setEmailEnviado] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('cliente_auth')
      if (!auth) { router.replace('/cliente'); return }
    }
    carregar()
  }, [router])

  const carregar = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/vistoria/listar')
      const data = await res.json()
      setVistorias(data.vistorias || [])
    } finally {
      setLoading(false)
    }
  }

  const handleAprovar = async () => {
    if (!modal) return
    setLoadingAprovar(true)
    try {
      await fetch('/api/vistoria/aprovar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: modal.id,
          status: modal.acao,
          observacao: obsModal,
          aprovado_por: 'Marriott Airport',
        }),
      })
      setModal(null)
      setObsModal('')
      await carregar()
    } finally {
      setLoadingAprovar(false)
    }
  }

  const handleEnviarEmail = async () => {
    setEnviandoEmail(true)
    try {
      await fetch('/api/vistoria/relatorio-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vistorias: vistoriasFiltradas }),
      })
      setEmailEnviado(true)
      setTimeout(() => setEmailEnviado(false), 4000)
    } finally {
      setEnviandoEmail(false)
    }
  }

  const handleImprimir = () => window.print()

  const formatarData = (iso: string) => iso ? new Date(iso).toLocaleString('pt-BR') : '—'

  const statusBadge = (v: Vistoria) => {
    const s = v.aprovado_status || 'pendente'
    if (s === 'aprovado') return <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full"><CheckCircle className="h-3 w-3" />Aprovado</span>
    if (s === 'reprovado') return <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full"><XCircle className="h-3 w-3" />Reprovado</span>
    return <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full"><Clock className="h-3 w-3" />Pendente</span>
  }

  const total = vistorias.length
  const aprovados = vistorias.filter(v => v.aprovado_status === 'aprovado').length
  const reprovados = vistorias.filter(v => v.aprovado_status === 'reprovado').length
  const pendentes = vistorias.filter(v => !v.aprovado_status || v.aprovado_status === 'pendente').length
  const progresso = total > 0 ? Math.round((aprovados / total) * 100) : 0

  const vistoriasFiltradas = vistorias.filter(v => {
    const matchBusca =
      v.apartamento.toLowerCase().includes(busca.toLowerCase()) ||
      v.ordem_servico.toLowerCase().includes(busca.toLowerCase()) ||
      v.tecnico.toLowerCase().includes(busca.toLowerCase())
    const matchFiltro =
      filtro === 'todos' ||
      (filtro === 'pendente' && (!v.aprovado_status || v.aprovado_status === 'pendente')) ||
      filtro === v.aprovado_status
    return matchBusca && matchFiltro
  })

  const fotosAntes = (v: Vistoria) => v.vistoria_fotos?.filter(f => f.tipo === 'antes') || []
  const fotosDepois = (v: Vistoria) => v.vistoria_fotos?.filter(f => f.tipo === 'depois') || []

  return (
    <>
      <Head>
        <title>Portal do Cliente – Marriott Airport | MAGINF</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      {/* Foto ampliada */}
      {fotoAmpliada && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setFotoAmpliada(null)}>
          <img src={fotoAmpliada} alt="Foto" className="max-w-full max-h-full rounded-lg object-contain" />
          <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 text-xl" onClick={() => setFotoAmpliada(null)}>✕</button>
        </div>
      )}

      {/* Modal aprovação */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className={`flex items-center gap-3 mb-4 p-4 rounded-xl ${modal.acao === 'aprovado' ? 'bg-green-50' : 'bg-red-50'}`}>
              {modal.acao === 'aprovado'
                ? <CheckCircle className="h-8 w-8 text-green-600" />
                : <XCircle className="h-8 w-8 text-red-600" />}
              <div>
                <p className="font-bold text-maginf-gray">
                  {modal.acao === 'aprovado' ? 'Aprovar serviço' : 'Reprovar serviço'}
                </p>
                <p className="text-sm text-gray-500">Apartamento {modal.apartamento}</p>
              </div>
            </div>
            <label className="block text-sm font-medium text-maginf-gray mb-2">
              Observação {modal.acao === 'reprovado' ? '(obrigatória)' : '(opcional)'}
            </label>
            <textarea
              value={obsModal}
              onChange={e => setObsModal(e.target.value)}
              rows={3}
              placeholder={modal.acao === 'aprovado' ? 'Serviço realizado conforme o esperado...' : 'Descreva o motivo da reprovação...'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-sm resize-none mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => { setModal(null); setObsModal('') }} className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50">
                Cancelar
              </button>
              <button
                onClick={handleAprovar}
                disabled={loadingAprovar || (modal.acao === 'reprovado' && !obsModal)}
                className={`flex-1 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 ${modal.acao === 'aprovado' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {loadingAprovar ? 'Salvando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 print:bg-white">
        {/* Header */}
        <header className="bg-maginf-gray text-white px-4 py-4 shadow-lg print:hidden">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-10 w-auto" />
              <div className="border-l border-gray-500 pl-4 flex items-center gap-3">
                <img
                  src="/images/marriott.webp"
                  alt="Marriott"
                  className="h-10 w-auto rounded bg-white px-2 py-0.5"
                />
                <div>
                  <p className="font-semibold text-sm">Marriott Airport</p>
                  <p className="text-xs text-gray-400">Relatório de Serviços de Rede</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEnviarEmail}
                disabled={enviandoEmail}
                className="hidden sm:flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white text-sm px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Mail className="h-4 w-4" />
                {emailEnviado ? 'Enviado!' : enviandoEmail ? 'Enviando...' : 'Enviar por Email'}
              </button>
              <button
                onClick={handleImprimir}
                className="hidden sm:flex items-center gap-2 border border-gray-500 text-gray-300 hover:text-white text-sm px-3 py-2 rounded-lg transition-colors"
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </button>
              <button onClick={() => { sessionStorage.removeItem('cliente_auth'); router.push('/cliente') }} className="text-gray-400 hover:text-white p-2">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Cabeçalho de impressão */}
        <div className="hidden print:block p-8 border-b">
          <div className="flex items-center justify-between">
            <div>
              <img src="/logo-maginf-oficial.svg" alt="MAGINF" className="h-12 w-auto mb-1" />
              <p className="text-sm text-gray-500">MAGINF Tecnologia – Relatório de Serviços</p>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <img src="/images/marriott.webp" alt="Marriott" className="h-14 w-auto" />
              <p className="text-sm text-gray-500">Gerado em {new Date().toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-4">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 print:grid-cols-4">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-maginf-gray">{total}</p>
              <p className="text-xs text-gray-500 mt-1">Total</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-green-600">{aprovados}</p>
              <p className="text-xs text-gray-500 mt-1">Aprovados</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-yellow-500">{pendentes}</p>
              <p className="text-xs text-gray-500 mt-1">Pendentes</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-red-500">{reprovados}</p>
              <p className="text-xs text-gray-500 mt-1">Reprovados</p>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4 print:mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-maginf-orange" />
                <span className="text-sm font-semibold text-maginf-gray">Progresso de aprovação</span>
              </div>
              <span className="text-sm font-bold text-maginf-orange">{progresso}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-maginf-orange h-3 rounded-full transition-all duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{aprovados} de {total} apartamentos aprovados</p>
          </div>

          {/* Filtros e busca */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 print:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar apartamento, OS ou técnico..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-maginf-orange text-sm"
              />
            </div>
            <div className="flex gap-2">
              {(['todos', 'pendente', 'aprovado', 'reprovado'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFiltro(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${
                    filtro === f
                      ? 'bg-maginf-orange text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {f === 'todos' ? 'Todos' : f === 'pendente' ? 'Pendentes' : f === 'aprovado' ? 'Aprovados' : 'Reprovados'}
                </button>
              ))}
            </div>
          </div>

          {/* Botões mobile */}
          <div className="flex gap-2 mb-4 sm:hidden print:hidden">
            <button onClick={handleImprimir} className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-600 text-sm py-2 rounded-lg">
              <Printer className="h-4 w-4" />Imprimir
            </button>
            <button onClick={handleEnviarEmail} disabled={enviandoEmail} className="flex-1 flex items-center justify-center gap-2 bg-maginf-orange text-white text-sm py-2 rounded-lg disabled:opacity-50">
              <Mail className="h-4 w-4" />{emailEnviado ? 'Enviado!' : 'Email'}
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin h-10 w-10 border-4 border-maginf-orange border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Carregando relatório...</p>
            </div>
          )}

          {/* Lista */}
          {!loading && vistoriasFiltradas.map(v => (
            <div key={v.id} className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden print:break-inside-avoid print:border print:border-gray-200 print:mb-4">
              {/* Card header */}
              <div
                className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 print:cursor-default"
                onClick={() => setExpandido(expandido === v.id ? null : v.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-maginf-orange/10 rounded-xl p-3">
                    <Home className="h-5 w-5 text-maginf-orange" />
                  </div>
                  <div>
                    <p className="font-bold text-maginf-gray text-base">Apartamento {v.apartamento}</p>
                    <p className="text-sm text-gray-400">{v.ordem_servico} · {v.tecnico}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {statusBadge(v)}
                  <span className="print:hidden">
                    {expandido === v.id ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </span>
                </div>
              </div>

              {/* Conteúdo expandido */}
              {(expandido === v.id || typeof window !== 'undefined' && false) && (
                <div className="border-t border-gray-100 px-5 py-5 space-y-5 print:block">
                  {/* Info */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4 text-maginf-orange flex-shrink-0" />
                      <span>{v.tecnico}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-maginf-orange flex-shrink-0" />
                      <span>{formatarData(v.data_finalizacao)}</span>
                    </div>
                    {v.aprovado_em && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>Aprovado em {formatarData(v.aprovado_em)}</span>
                      </div>
                    )}
                  </div>

                  {/* Observações técnico */}
                  {v.observacoes && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />Relatório do Técnico
                      </p>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 whitespace-pre-line border-l-4 border-maginf-orange">
                        {v.observacoes}
                      </p>
                    </div>
                  )}

                  {/* Fotos antes */}
                  {fotosAntes(v).length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1">
                        <Camera className="h-3 w-3" />Estado Antes do Serviço ({fotosAntes(v).length} fotos)
                      </p>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {fotosAntes(v).map(foto => (
                          <div key={foto.id} className="group relative">
                            <img
                              src={foto.url}
                              alt="Antes"
                              className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => setFotoAmpliada(foto.url)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fotos depois */}
                  {fotosDepois(v).length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1">
                        <Camera className="h-3 w-3" />Resultado Final ({fotosDepois(v).length} fotos)
                      </p>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {fotosDepois(v).map(foto => (
                          <div key={foto.id} className="relative">
                            <img
                              src={foto.url}
                              alt="Depois"
                              className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 border-2 border-green-200 transition-opacity"
                              onClick={() => setFotoAmpliada(foto.url)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Observação aprovação */}
                  {v.aprovado_obs && (
                    <div className={`p-4 rounded-lg border-l-4 ${v.aprovado_status === 'aprovado' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Observação do cliente</p>
                      <p className="text-sm text-gray-700">{v.aprovado_obs}</p>
                    </div>
                  )}

                  {/* Botões aprovação */}
                  {(!v.aprovado_status || v.aprovado_status === 'pendente') && (
                    <div className="flex gap-3 pt-2 print:hidden">
                      <button
                        onClick={() => setModal({ id: v.id, apartamento: v.apartamento, acao: 'reprovado' })}
                        className="flex-1 flex items-center justify-center gap-2 border-2 border-red-500 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-xl transition-colors"
                      >
                        <XCircle className="h-5 w-5" />
                        Reprovar
                      </button>
                      <button
                        onClick={() => setModal({ id: v.id, apartamento: v.apartamento, acao: 'aprovado' })}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
                      >
                        <CheckCircle className="h-5 w-5" />
                        Aprovar Serviço
                      </button>
                    </div>
                  )}

                  {/* Status final aprovado/reprovado */}
                  {v.aprovado_status === 'aprovado' && (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 print:flex">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-green-700">Serviço aprovado</p>
                        <p className="text-sm text-green-600">por {v.aprovado_por} em {formatarData(v.aprovado_em)}</p>
                      </div>
                    </div>
                  )}

                  {v.aprovado_status === 'reprovado' && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                      <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-red-700">Serviço reprovado</p>
                        <p className="text-sm text-red-600">por {v.aprovado_por} em {formatarData(v.aprovado_em)}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Print: sempre expandido */}
              <style>{`@media print { .print-expand { display: block !important; } }`}</style>
            </div>
          ))}

          {/* Rodapé impressão */}
          <div className="hidden print:block mt-8 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">MAGINF Tecnologia · sac@maginf.com.br · (11) 4610-6363 · Guarulhos, SP</p>
            <p className="text-xs text-gray-400">Relatório gerado em {new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>
    </>
  )
}
