import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  CheckCircle, XCircle, Clock, Camera, ChevronDown, ChevronUp,
  LogOut, Printer, Mail, Search, BarChart3, Home, User, Calendar,
  MessageSquare, Send, X, ChevronsUpDown, AlertTriangle,
} from 'lucide-react'

const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } = require('recharts')

type Foto = { id: string; url: string; tipo: 'antes' | 'depois'; timestamp: string }
type Vistoria = {
  id: string; apartamento: string; ordem_servico: string; tecnico: string
  observacoes: string; status: string; projeto: string; data_criacao: string
  data_finalizacao: string; aprovado_status: string; aprovado_em: string
  aprovado_por: string; aprovado_obs: string; vistoria_fotos: Foto[]
}
type ModalAprovar = { id: string; apartamento: string; acao: 'aprovado' | 'reprovado' } | null

export default function PortalPainel() {
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  const [cliente, setCliente] = useState<any>(null)
  const [vistorias, setVistorias] = useState<Vistoria[]>([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [expandirTodos, setExpandirTodos] = useState(false)
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'pendente' | 'aprovado' | 'reprovado'>('todos')
  const [fotoAmpliada, setFotoAmpliada] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalAprovar>(null)
  const [obsModal, setObsModal] = useState('')
  const [loadingAprovar, setLoadingAprovar] = useState(false)
  const [enviandoEmail, setEnviandoEmail] = useState(false)
  const [emailEnviado, setEmailEnviado] = useState(false)
  const [modalEmail, setModalEmail] = useState(false)
  const [emailDestino, setEmailDestino] = useState('')
  const [historicoEmails, setHistoricoEmails] = useState<string[]>([])
  const [showSugestoes, setShowSugestoes] = useState(false)
  const [ultimoEnvio, setUltimoEnvio] = useState<string | null>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!slug) return
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem(`portal_auth_${slug}`)) { router.replace(`/portal/${slug}`); return }
      const hist = localStorage.getItem(`portal_emails_hist_${slug}`)
      if (hist) setHistoricoEmails(JSON.parse(hist))
      const ult = localStorage.getItem(`portal_ultimo_envio_${slug}`)
      if (ult) setUltimoEnvio(ult)
    }
    carregar()
  }, [slug, router])

  const carregar = async () => {
    if (!slug) return
    setLoading(true)
    try {
      const res = await fetch(`/api/portal/${slug}/listar`)
      const data = await res.json()
      setVistorias(data.vistorias || [])
      setCliente(data.cliente || null)
    } finally {
      setLoading(false)
    }
  }

  const handleAprovar = async () => {
    if (!modal) return
    setLoadingAprovar(true)
    try {
      await fetch(`/api/portal/${slug}/aprovar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: modal.id, status: modal.acao, observacao: obsModal, aprovado_por: cliente?.nome || slug }),
      })
      setModal(null); setObsModal('')
      await carregar()
    } finally { setLoadingAprovar(false) }
  }

  const salvarHistorico = (email: string) => {
    const emails = email.split(',').map(e => e.trim()).filter(Boolean)
    const novo = Array.from(new Set([...emails, ...historicoEmails])).slice(0, 10)
    setHistoricoEmails(novo)
    localStorage.setItem(`portal_emails_hist_${slug}`, JSON.stringify(novo))
  }

  const handleEnviarEmail = async () => {
    if (!emailDestino.trim()) return
    setEnviandoEmail(true)
    try {
      await fetch(`/api/portal/${slug}/relatorio-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinatarios: emailDestino }),
      })
      salvarHistorico(emailDestino)
      const agora = new Date().toLocaleString('pt-BR')
      setUltimoEnvio(agora)
      localStorage.setItem(`portal_ultimo_envio_${slug}`, agora)
      setEmailEnviado(true); setModalEmail(false); setEmailDestino(''); setShowSugestoes(false)
      setTimeout(() => setEmailEnviado(false), 5000)
    } finally { setEnviandoEmail(false) }
  }

  const isExpandido = (id: string) => expandirTodos || expandido === id
  const handleImprimir = () => window.print()
  const formatarData = (iso: string) => iso ? new Date(iso).toLocaleString('pt-BR') : '—'
  const sugestoesFiltradas = historicoEmails.filter(e => emailDestino ? e.toLowerCase().includes(emailDestino.toLowerCase()) : true)

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
    const matchBusca = v.apartamento.toLowerCase().includes(busca.toLowerCase()) ||
      v.ordem_servico.toLowerCase().includes(busca.toLowerCase()) ||
      v.tecnico.toLowerCase().includes(busca.toLowerCase())
    const matchFiltro = filtro === 'todos' || (filtro === 'pendente' && (!v.aprovado_status || v.aprovado_status === 'pendente')) || filtro === v.aprovado_status
    return matchBusca && matchFiltro
  })

  const fotosAntes = (v: Vistoria) => v.vistoria_fotos?.filter(f => f.tipo === 'antes') || []
  const fotosDepois = (v: Vistoria) => v.vistoria_fotos?.filter(f => f.tipo === 'depois') || []

  const dadosDonut = [
    { name: 'Aprovados', value: aprovados, color: '#16a34a' },
    { name: 'Pendentes', value: pendentes, color: '#f59e0b' },
    { name: 'Reprovados', value: reprovados, color: '#dc2626' },
  ].filter(d => d.value > 0)

  const dadosBarras = vistoriasFiltradas.slice(0, 15).map(v => ({
    name: v.apartamento, fotos: v.vistoria_fotos?.length || 0, status: v.aprovado_status || 'pendente',
  }))

  return (
    <>
      <Head>
        <title>Portal {cliente?.nome || slug} – MAGINF</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      {/* Foto ampliada */}
      {fotoAmpliada && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setFotoAmpliada(null)}>
          <img src={fotoAmpliada} alt="Foto" className="max-w-full max-h-full rounded-lg object-contain" />
          <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2" onClick={() => setFotoAmpliada(null)}>✕</button>
        </div>
      )}

      {/* Modal aprovação */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className={`flex items-center gap-3 mb-4 p-4 rounded-xl ${modal.acao === 'aprovado' ? 'bg-green-50' : 'bg-red-50'}`}>
              {modal.acao === 'aprovado' ? <CheckCircle className="h-8 w-8 text-green-600" /> : <XCircle className="h-8 w-8 text-red-600" />}
              <div>
                <p className="font-bold text-maginf-gray">{modal.acao === 'aprovado' ? 'Aprovar serviço' : 'Reprovar serviço'}</p>
                <p className="text-sm text-gray-500">Unidade {modal.apartamento}</p>
              </div>
            </div>
            <label className="block text-sm font-medium text-maginf-gray mb-2">Observação {modal.acao === 'reprovado' ? '(obrigatória)' : '(opcional)'}</label>
            <textarea value={obsModal} onChange={e => setObsModal(e.target.value)} rows={3}
              placeholder={modal.acao === 'aprovado' ? 'Serviço realizado conforme o esperado...' : 'Descreva o motivo da reprovação...'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange outline-none text-sm resize-none mb-4" />
            <div className="flex gap-3">
              <button onClick={() => { setModal(null); setObsModal('') }} className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50">Cancelar</button>
              <button onClick={handleAprovar} disabled={loadingAprovar || (modal.acao === 'reprovado' && !obsModal)}
                className={`flex-1 text-white font-semibold py-3 rounded-lg disabled:opacity-50 ${modal.acao === 'aprovado' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>
                {loadingAprovar ? 'Salvando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Email */}
      {modalEmail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="bg-maginf-orange/10 rounded-xl p-2.5"><Mail className="h-5 w-5 text-maginf-orange" /></div>
                <div>
                  <p className="font-bold text-maginf-gray">Enviar Relatório por Email</p>
                  <p className="text-xs text-gray-400">Cópia automática para MAGINF</p>
                </div>
              </div>
              <button onClick={() => { setModalEmail(false); setEmailDestino(''); setShowSugestoes(false) }} className="text-gray-400 hover:text-gray-600 p-1"><X className="h-5 w-5" /></button>
            </div>
            <label className="block text-sm font-medium text-maginf-gray mb-2">Destinatário(s)</label>
            <div className="relative">
              <input ref={emailInputRef} type="text" value={emailDestino}
                onChange={e => { setEmailDestino(e.target.value); setShowSugestoes(true) }}
                onFocus={() => setShowSugestoes(true)} onBlur={() => setTimeout(() => setShowSugestoes(false), 150)}
                placeholder="email@empresa.com.br"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange outline-none text-sm" />
              {showSugestoes && sugestoesFiltradas.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                  {sugestoesFiltradas.map(email => (
                    <button key={email} type="button" onMouseDown={() => { setEmailDestino(email); setShowSugestoes(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-maginf-orange/5 hover:text-maginf-orange flex items-center gap-2 border-b border-gray-50 last:border-0">
                      <Mail className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />{email}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">Múltiplos emails separados por vírgula. MAGINF receberá cópia automática.</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setModalEmail(false); setEmailDestino('') }} className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 text-sm">Cancelar</button>
              <button onClick={handleEnviarEmail} disabled={enviandoEmail || !emailDestino.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-lg disabled:opacity-50 text-sm">
                <Send className="h-4 w-4" />{enviandoEmail ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 print:bg-white">
        {/* Header */}
        <header className="bg-maginf-gray text-white px-4 py-3 shadow-lg print:hidden">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-9 w-auto" />
              <div className="h-8 w-px bg-gray-500" />
              {cliente?.logo_url
                ? <div className="bg-white rounded-lg px-3 py-1"><img src={cliente.logo_url} alt={cliente.nome} className="h-8 w-auto object-contain" /></div>
                : <span className="text-white font-bold text-sm">{cliente?.nome || slug}</span>
              }
            </div>
            <div className="flex items-center gap-2">
              {emailEnviado && <span className="hidden sm:flex items-center gap-1 bg-green-500/20 text-green-300 text-xs px-3 py-1.5 rounded-lg"><CheckCircle className="h-3 w-3" />Enviado!</span>}
              <button onClick={() => setModalEmail(true)} className="hidden sm:flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white text-sm px-3 py-2 rounded-lg transition-colors">
                <Mail className="h-4 w-4" />Enviar por Email
              </button>
              <button onClick={handleImprimir} className="hidden sm:flex items-center gap-2 border border-gray-500 text-gray-300 hover:text-white text-sm px-3 py-2 rounded-lg transition-colors">
                <Printer className="h-4 w-4" />Imprimir
              </button>
              <button onClick={() => { sessionStorage.removeItem(`portal_auth_${slug}`); router.push(`/portal/${slug}`) }} className="text-gray-400 hover:text-white p-2"><LogOut className="h-5 w-5" /></button>
            </div>
          </div>
        </header>

        {/* Cabeçalho impressão */}
        <div className="hidden print:block p-8 border-b">
          <div className="flex items-center justify-between">
            <div>
              <img src="/logo-maginf-oficial.svg" alt="MAGINF" className="h-12 w-auto mb-1" />
              <p className="text-sm text-gray-500">MAGINF Tecnologia – Relatório de Serviços</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {cliente?.logo_url && <img src={cliente.logo_url} alt={cliente.nome} className="h-14 w-auto object-contain" />}
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
              <p className="text-3xl font-bold text-green-500">{aprovados}</p>
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
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-maginf-orange" /><span className="text-sm font-semibold text-maginf-gray">Progresso de aprovação</span></div>
              <span className="text-sm font-bold text-maginf-orange">{progresso}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-maginf-orange h-3 rounded-full transition-all duration-500" style={{ width: `${progresso}%` }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{aprovados} de {total} unidades aprovadas</p>
          </div>

          {/* Gráficos */}
          {total > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 print:grid-cols-2">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Distribuição de Status</p>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width={140} height={140}>
                    <PieChart>
                      <Pie data={dadosDonut} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value" strokeWidth={0}>
                        {dadosDonut.map((entry: any, index: number) => <Cell key={index} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(value: any, name: any) => [`${value} unidade${value > 1 ? 's' : ''}`, name]} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2.5 flex-1">
                    {dadosDonut.map((d: any) => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} /><span className="text-xs text-gray-600">{d.name}</span></div>
                        <span className="text-xs font-bold" style={{ color: d.color }}>{d.value}</span>
                      </div>
                    ))}
                    <div className="pt-1 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-400">Total</span>
                      <span className="text-xs font-bold text-maginf-gray">{total}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Fotos por Unidade</p>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={dadosBarras} barSize={14} margin={{ top: 0, right: 4, left: -28, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip formatter={(value: any) => [`${value} foto${value !== 1 ? 's' : ''}`, 'Total']} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                    <Bar dataKey="fotos" radius={[4, 4, 0, 0]}>
                      {dadosBarras.map((entry: any, index: number) => (
                        <Cell key={index} fill={entry.status === 'aprovado' ? '#16a34a' : entry.status === 'reprovado' ? '#dc2626' : '#f59e0b'} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-400 mt-2 text-center">Cor indica status da unidade</p>
              </div>
            </div>
          )}

          {/* Badge pendentes */}
          {pendentes > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 flex items-center gap-3 print:hidden">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <p className="text-sm text-yellow-700 font-medium"><span className="font-bold">{pendentes} unidade{pendentes > 1 ? 's' : ''}</span> aguardando sua aprovação</p>
            </div>
          )}
          {ultimoEnvio && <p className="text-xs text-gray-400 mb-3 print:hidden">Último relatório enviado em <span className="font-medium text-gray-500">{ultimoEnvio}</span></p>}

          {/* Botões mobile */}
          <div className="flex gap-2 mb-4 sm:hidden print:hidden">
            <button onClick={handleImprimir} className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-600 text-sm py-2 rounded-lg"><Printer className="h-4 w-4" />Imprimir</button>
            <button onClick={() => setModalEmail(true)} className="flex-1 flex items-center justify-center gap-2 bg-maginf-orange text-white text-sm py-2 rounded-lg"><Mail className="h-4 w-4" />Email</button>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 print:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar unidade, OS ou técnico..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-maginf-orange text-sm" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['todos', 'pendente', 'aprovado', 'reprovado'] as const).map(f => (
                <button key={f} onClick={() => setFiltro(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${filtro === f ? 'bg-maginf-orange text-white' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}`}>
                  {f === 'todos' ? 'Todos' : f === 'pendente' ? 'Pendentes' : f === 'aprovado' ? 'Aprovados' : 'Reprovados'}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && <div className="text-center py-12"><div className="animate-spin h-10 w-10 border-4 border-maginf-orange border-t-transparent rounded-full mx-auto mb-3" /><p className="text-gray-400 text-sm">Carregando...</p></div>}

          {/* Expandir todos */}
          {!loading && vistoriasFiltradas.length > 0 && (
            <div className="flex justify-end mb-3 print:hidden">
              <button onClick={() => { setExpandirTodos(!expandirTodos); setExpandido(null) }}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-maginf-orange border border-gray-200 bg-white px-3 py-1.5 rounded-lg transition-colors">
                <ChevronsUpDown className="h-3.5 w-3.5" />{expandirTodos ? 'Recolher todos' : 'Expandir todos'}
              </button>
            </div>
          )}

          {/* Lista */}
          {!loading && vistoriasFiltradas.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <Home className="h-12 w-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">Nenhum serviço encontrado.</p>
            </div>
          )}

          {!loading && vistoriasFiltradas.map(v => {
            const statusCard = v.aprovado_status || 'pendente'
            const borderColor = statusCard === 'aprovado' ? 'border-l-green-400' : statusCard === 'reprovado' ? 'border-l-red-400' : 'border-l-yellow-400'
            const totalFotos = v.vistoria_fotos?.length || 0
            return (
              <div key={v.id} className={`bg-white rounded-xl shadow-sm mb-3 overflow-hidden border-l-4 ${borderColor} print:break-inside-avoid print:border print:border-gray-200 print:mb-4`}>
                <div className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 print:cursor-default"
                  onClick={() => { if (!expandirTodos) setExpandido(isExpandido(v.id) ? null : v.id) }}>
                  <div className="flex items-center gap-4">
                    <div className="bg-maginf-orange/10 rounded-xl p-3"><Home className="h-5 w-5 text-maginf-orange" /></div>
                    <div>
                      <p className="font-bold text-maginf-gray text-base">Unidade {v.apartamento}</p>
                      <p className="text-sm text-gray-400">{v.ordem_servico} · {v.tecnico}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {totalFotos > 0 && <span className="hidden sm:flex items-center gap-1 text-xs text-gray-400"><Camera className="h-3 w-3" />{totalFotos}</span>}
                    {statusBadge(v)}
                    <span className="print:hidden">{isExpandido(v.id) ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}</span>
                  </div>
                </div>

                {isExpandido(v.id) && (
                  <div className="border-t border-gray-100 px-5 py-5 space-y-5">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600"><User className="h-4 w-4 text-maginf-orange flex-shrink-0" /><span>{v.tecnico}</span></div>
                      <div className="flex items-center gap-2 text-gray-600"><Calendar className="h-4 w-4 text-maginf-orange flex-shrink-0" /><span>{formatarData(v.data_finalizacao)}</span></div>
                      {v.observacoes && <div className="flex items-center gap-2 text-gray-600 col-span-2 md:col-span-1"><MessageSquare className="h-4 w-4 text-maginf-orange flex-shrink-0" /><span>{v.observacoes}</span></div>}
                    </div>

                    {fotosAntes(v).length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Antes ({fotosAntes(v).length} fotos)</p>
                        <div className="flex gap-2 flex-wrap">
                          {fotosAntes(v).map(f => <img key={f.id} src={f.url} alt="Antes" onClick={() => setFotoAmpliada(f.url)} className="h-24 w-24 object-cover rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity" />)}
                        </div>
                      </div>
                    )}
                    {fotosDepois(v).length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Depois ({fotosDepois(v).length} fotos)</p>
                        <div className="flex gap-2 flex-wrap">
                          {fotosDepois(v).map(f => <img key={f.id} src={f.url} alt="Depois" onClick={() => setFotoAmpliada(f.url)} className="h-24 w-24 object-cover rounded-lg cursor-zoom-in hover:opacity-90 transition-opacity" />)}
                        </div>
                      </div>
                    )}

                    {(!v.aprovado_status || v.aprovado_status === 'pendente') && (
                      <div className="flex gap-3 pt-2 print:hidden">
                        <button onClick={() => setModal({ id: v.id, apartamento: v.apartamento, acao: 'aprovado' })}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                          <CheckCircle className="h-4 w-4" />Aprovar
                        </button>
                        <button onClick={() => setModal({ id: v.id, apartamento: v.apartamento, acao: 'reprovado' })}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                          <XCircle className="h-4 w-4" />Reprovar
                        </button>
                      </div>
                    )}
                    {v.aprovado_status === 'aprovado' && (
                      <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                        <div><p className="font-semibold text-green-700">Serviço aprovado</p><p className="text-sm text-green-600">por {v.aprovado_por} em {formatarData(v.aprovado_em)}</p>{v.aprovado_obs && <p className="text-sm text-green-600 mt-1 italic">"{v.aprovado_obs}"</p>}</div>
                      </div>
                    )}
                    {v.aprovado_status === 'reprovado' && (
                      <div className="flex items-start gap-3 bg-red-50 rounded-xl p-4">
                        <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                        <div><p className="font-semibold text-red-700">Serviço reprovado</p><p className="text-sm text-red-600">por {v.aprovado_por} em {formatarData(v.aprovado_em)}</p>{v.aprovado_obs && <p className="text-sm text-red-600 mt-1 italic">"{v.aprovado_obs}"</p>}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}

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
