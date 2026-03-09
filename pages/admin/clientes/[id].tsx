import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {
  ArrowLeft, Building2, Mail, Phone, MapPin, User, Globe,
  CheckCircle, XCircle, Clock, Camera, ChevronDown, ChevronUp,
  Edit2, LogOut, ExternalLink, Hash, Calendar, Printer, Archive, AlertTriangle,
} from 'lucide-react'
import { supabase } from '../../../lib/supabase'

const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } = require('recharts')

export default function ClienteDetalhe() {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const [cliente, setCliente] = useState<any>(null)
  const [vistorias, setVistorias] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [fotoAmpliada, setFotoAmpliada] = useState<string | null>(null)
  const [aba, setAba] = useState<'visao_geral' | 'vistorias' | 'dados' | 'funcionarios'>('visao_geral')
  const [concluindo, setConcluindo] = useState(false)
  const [confirmarConclusao, setConfirmarConclusao] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/admin'); return }
      if (id) carregar()
    })
  }, [router, id])

  const carregar = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/clientes')
    const json = await res.json()
    const c = (json.clientes || []).find((c: any) => c.id === id)
    if (!c) { setLoading(false); return }
    setCliente(c)
    const vs = c.vistorias || []
    // Buscar fotos detalhadas
    const resV = await fetch(`/api/portal/${c.slug}/listar`)
    const jsonV = await resV.json()
    setVistorias(jsonV.vistorias || [])
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const handleConcluirObra = async () => {
    setConcluindo(true)
    try {
      const res = await fetch('/api/admin/clientes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, acao: 'concluir' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao concluir')
      setConfirmarConclusao(false)
      router.push('/admin/clientes')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setConcluindo(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-maginf-orange border-t-transparent rounded-full" />
    </div>
  )

  if (!cliente) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center"><p className="text-gray-500">Cliente não encontrado.</p><Link href="/admin/clientes" className="text-maginf-orange hover:underline text-sm mt-2 inline-block">← Voltar</Link></div>
    </div>
  )

  const total = vistorias.length
  const aprovados = vistorias.filter(v => v.aprovado_status === 'aprovado').length
  const reprovados = vistorias.filter(v => v.aprovado_status === 'reprovado').length
  const pendentes = vistorias.filter(v => !v.aprovado_status || v.aprovado_status === 'pendente').length
  const progresso = total > 0 ? Math.round((aprovados / total) * 100) : 0
  const totalFotos = vistorias.reduce((acc, v) => acc + (v.vistoria_fotos?.length || 0), 0)
  const statusObra = total === 0 ? 'nao_iniciado' : pendentes === total ? 'em_andamento' : aprovados === total ? 'concluido' : 'em_andamento'

  const donutData = [
    { name: 'Aprovados', value: aprovados, color: '#16a34a' },
    { name: 'Pendentes', value: pendentes, color: '#f59e0b' },
    { name: 'Reprovados', value: reprovados, color: '#dc2626' },
  ].filter(d => d.value > 0)

  const barData = vistorias.slice(0, 20).map(v => ({
    name: v.apartamento, fotos: v.vistoria_fotos?.length || 0,
    status: v.aprovado_status || 'pendente',
  }))

  const statusBadge = (s: string) => {
    if (s === 'aprovado') return <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full"><CheckCircle className="h-3 w-3" />Aprovado</span>
    if (s === 'reprovado') return <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full"><XCircle className="h-3 w-3" />Reprovado</span>
    return <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full"><Clock className="h-3 w-3" />Pendente</span>
  }

  const statusObraLabel = () => {
    if (statusObra === 'concluido') return <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">✅ Concluído</span>
    if (statusObra === 'em_andamento') return <span className="bg-yellow-100 text-yellow-700 text-sm font-bold px-3 py-1 rounded-full">🔄 Em andamento</span>
    return <span className="bg-gray-100 text-gray-500 text-sm font-bold px-3 py-1 rounded-full">⏳ Não iniciado</span>
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://maginf.com.br'

  return (
    <>
      <Head><title>{cliente.nome} – Admin MAGINF</title></Head>

      {fotoAmpliada && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setFotoAmpliada(null)}>
          <img src={fotoAmpliada} alt="Foto" className="max-w-full max-h-full rounded-lg object-contain" />
          <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2" onClick={() => setFotoAmpliada(null)}>✕</button>
        </div>
      )}

      <div className="min-h-screen bg-gray-50">
        <header className="bg-maginf-gray text-white px-6 py-3 shadow-lg flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">Dashboard</Link>
            <Link href="/admin/clientes" className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">Clientes</Link>
            <button onClick={() => window.print()} className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10 flex items-center gap-1"><Printer className="h-4 w-4" />Imprimir</button>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white p-2 ml-2"><LogOut className="h-4 w-4" /></button>
          </nav>
        </header>

        <div className="max-w-6xl mx-auto p-6 space-y-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 print:hidden">
            <Link href="/admin/clientes" className="flex items-center gap-1 text-gray-400 hover:text-maginf-orange text-sm"><ArrowLeft className="h-4 w-4" />Clientes</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-maginf-gray font-medium">{cliente.nome}</span>
          </div>

          {/* Card principal do cliente */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-maginf-gray to-slate-700 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {cliente.logo_url
                    ? <img src={cliente.logo_url} alt={cliente.nome} className="h-16 w-16 rounded-xl object-contain bg-white p-1.5" />
                    : <div className="h-16 w-16 rounded-xl bg-maginf-orange/20 flex items-center justify-center text-maginf-orange font-bold text-2xl">{cliente.nome[0]}</div>
                  }
                  <div>
                    <h1 className="text-2xl font-bold text-white">{cliente.nome}</h1>
                    {cliente.razao_social && <p className="text-gray-300 text-sm mt-0.5">{cliente.razao_social}</p>}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">{cliente.tipo}</span>
                      {statusObraLabel()}
                      {!cliente.ativo && <span className="bg-red-500/20 text-red-300 text-xs px-2 py-0.5 rounded-full">Inativo</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 print:hidden">
                  <Link href={`/portal/${cliente.slug}`} target="_blank" className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />Portal
                  </Link>
                  <Link href={`/admin/clientes/${id}/editar`} className="flex items-center gap-1 bg-maginf-orange hover:bg-maginf-orange-dark text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
                    <Edit2 className="h-3.5 w-3.5" />Editar
                  </Link>
                </div>
              </div>
            </div>

            {/* URLs de acesso */}
            {(() => {
              const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'maginf.com.br'
              const subdominio = cliente.dominio || cliente.slug
              const portalUrl = `https://${subdominio}.${rootDomain}`
              const obraUrl = `https://${subdominio}.${rootDomain}/obra`
              const portalAlt = `/portal/${cliente.slug}`
              const obraAlt = `/obra/${cliente.slug}`
              return (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 space-y-2 print:hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-gray-200">
                      <div className="h-8 w-8 bg-maginf-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-maginf-orange" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-500">Portal do cliente</p>
                        <code className="text-xs text-maginf-orange truncate block font-bold">{portalUrl}</code>
                        <code className="text-xs text-gray-300 truncate block">{portalAlt}</code>
                      </div>
                      <a href={portalUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-maginf-orange flex-shrink-0"><ExternalLink className="h-4 w-4" /></a>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-gray-200">
                      <div className="h-8 w-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Camera className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-500">Equipe técnica</p>
                        <code className="text-xs text-blue-600 truncate block font-bold">{obraUrl}</code>
                        <code className="text-xs text-gray-300 truncate block">{obraAlt}</code>
                      </div>
                      <a href={obraUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 flex-shrink-0"><ExternalLink className="h-4 w-4" /></a>
                    </div>
                  </div>
                  {cliente.dominio && (
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                        Subdomínio: <span className="font-semibold text-gray-500">{cliente.dominio}.{rootDomain}</span>
                      </p>
                      {cliente.dns_status && (
                        <>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            cliente.dns_status.cloudflare?.ok ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-600'
                          }`}>
                            CF {cliente.dns_status.cloudflare?.ok ? '✓' : '✗'}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            cliente.dns_status.vercel?.ok ? 'bg-black/10 text-gray-700' : 'bg-red-100 text-red-600'
                          }`}>
                            Vercel {cliente.dns_status.vercel?.ok ? '✓' : '✗'}
                          </span>
                          {(!cliente.dns_status.cloudflare?.ok || !cliente.dns_status.vercel?.ok) && (
                            <span className="text-xs text-red-500">
                              {cliente.dns_status.cloudflare?.erro || cliente.dns_status.vercel?.erro}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )
            })()}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { label: 'Total', value: total, color: 'text-maginf-gray', bg: 'bg-white' },
              { label: 'Aprovados', value: aprovados, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Pendentes', value: pendentes, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Reprovados', value: reprovados, color: 'text-red-500', bg: 'bg-red-50' },
              { label: 'Fotos', value: totalFotos, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} rounded-xl p-4 shadow-sm text-center`}>
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Barra de progresso */}
          {total > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-maginf-gray">Progresso de aprovação</span>
                <span className="text-sm font-bold text-maginf-orange">{progresso}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-maginf-orange h-3 rounded-full transition-all" style={{ width: `${progresso}%` }} />
              </div>
              <p className="text-xs text-gray-400 mt-1">{aprovados} de {total} unidades aprovadas</p>
            </div>
          )}

          {/* Abas */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 print:hidden">
            {[
              { id: 'visao_geral', label: 'Visão Geral' },
              { id: 'vistorias', label: `Vistorias (${total})` },
              { id: 'dados', label: 'Dados Cadastrais' },
              { id: 'funcionarios', label: 'Equipe Técnica' },
            ].map((a) => (
              <button key={a.id} onClick={() => setAba(a.id as any)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${aba === a.id ? 'bg-white text-maginf-orange shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {a.label}
              </button>
            ))}
          </div>

          {/* ABA: VISÃO GERAL */}
          {(aba === 'visao_geral' || typeof window === 'undefined') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Donut */}
              {donutData.length > 0 && (
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Distribuição de Status</p>
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width={140} height={140}>
                      <PieChart>
                        <Pie data={donutData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value" strokeWidth={0}>
                          {donutData.map((e: any, i: number) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip formatter={(v: any, n: any) => [`${v}`, n]} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col gap-2.5 flex-1">
                      {donutData.map((d: any) => (
                        <div key={d.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /><span className="text-xs text-gray-600">{d.name}</span></div>
                          <span className="text-xs font-bold" style={{ color: d.color }}>{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Barras fotos */}
              {barData.length > 0 && (
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Fotos por Unidade</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={barData} barSize={14} margin={{ top: 0, right: 4, left: -28, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip formatter={(v: any) => [`${v} foto${v !== 1 ? 's' : ''}`, 'Total']} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                      <Bar dataKey="fotos" radius={[4, 4, 0, 0]}>
                        {barData.map((e: any, i: number) => (
                          <Cell key={i} fill={e.status === 'aprovado' ? '#16a34a' : e.status === 'reprovado' ? '#dc2626' : '#f59e0b'} fillOpacity={0.85} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {total === 0 && (
                <div className="md:col-span-2 bg-white rounded-xl p-12 text-center shadow-sm">
                  <Camera className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400">Nenhuma vistoria registrada para este cliente ainda.</p>
                  <p className="text-gray-400 text-sm mt-1">Acesse <code className="bg-gray-100 px-1 rounded">/obra/{cliente.slug}</code> para iniciar.</p>
                </div>
              )}
            </div>
          )}

          {/* ABA: VISTORIAS */}
          {aba === 'vistorias' && (
            <div className="space-y-3">
              {vistorias.length === 0 && (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                  <p className="text-gray-400">Nenhuma vistoria registrada.</p>
                </div>
              )}
              {vistorias.map(v => {
                const borderColor = (v.aprovado_status || 'pendente') === 'aprovado' ? 'border-l-green-400' : (v.aprovado_status || 'pendente') === 'reprovado' ? 'border-l-red-400' : 'border-l-yellow-400'
                const fotosA = v.vistoria_fotos?.filter((f: any) => f.tipo === 'antes') || []
                const fotosD = v.vistoria_fotos?.filter((f: any) => f.tipo === 'depois') || []
                return (
                  <div key={v.id} className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${borderColor}`}>
                    <div className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => setExpandido(expandido === v.id ? null : v.id)}>
                      <div className="flex items-center gap-4">
                        <div className="bg-maginf-orange/10 rounded-xl p-3"><Building2 className="h-5 w-5 text-maginf-orange" /></div>
                        <div>
                          <p className="font-bold text-maginf-gray">Unidade {v.apartamento}</p>
                          <p className="text-sm text-gray-400">{v.ordem_servico} · {v.tecnico} · {v.data_finalizacao ? new Date(v.data_finalizacao).toLocaleDateString('pt-BR') : '—'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {v.vistoria_fotos?.length > 0 && <span className="hidden sm:flex items-center gap-1 text-xs text-gray-400"><Camera className="h-3 w-3" />{v.vistoria_fotos.length}</span>}
                        {statusBadge(v.aprovado_status)}
                        {expandido === v.id ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                      </div>
                    </div>
                    {expandido === v.id && (
                      <div className="border-t border-gray-100 px-5 py-5 space-y-4">
                        {v.observacoes && <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600"><span className="font-semibold">Obs: </span>{v.observacoes}</div>}
                        {fotosA.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Antes ({fotosA.length})</p>
                            <div className="flex gap-2 flex-wrap">{fotosA.map((f: any) => <img key={f.id} src={f.url} alt="Antes" onClick={() => setFotoAmpliada(f.url)} className="h-20 w-20 object-cover rounded-lg cursor-zoom-in hover:opacity-90" />)}</div>
                          </div>
                        )}
                        {fotosD.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Depois ({fotosD.length})</p>
                            <div className="flex gap-2 flex-wrap">{fotosD.map((f: any) => <img key={f.id} src={f.url} alt="Depois" onClick={() => setFotoAmpliada(f.url)} className="h-20 w-20 object-cover rounded-lg cursor-zoom-in hover:opacity-90" />)}</div>
                          </div>
                        )}
                        {v.aprovado_status === 'aprovado' && (
                          <div className="bg-green-50 rounded-lg p-3 flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" /><div><p className="text-sm font-semibold text-green-700">Aprovado por {v.aprovado_por}</p>{v.aprovado_obs && <p className="text-xs text-green-600 mt-0.5">"{v.aprovado_obs}"</p>}</div></div>
                        )}
                        {v.aprovado_status === 'reprovado' && (
                          <div className="bg-red-50 rounded-lg p-3 flex items-start gap-2"><XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" /><div><p className="text-sm font-semibold text-red-700">Reprovado por {v.aprovado_por}</p>{v.aprovado_obs && <p className="text-xs text-red-600 mt-0.5">"{v.aprovado_obs}"</p>}</div></div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* ABA: DADOS CADASTRAIS */}
          {aba === 'dados' && (
            <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Identificação */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Hash className="h-3.5 w-3.5" />Identificação</p>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Tipo', value: cliente.tipo },
                    { label: 'Nome', value: cliente.nome },
                    { label: 'Razão social', value: cliente.razao_social },
                    { label: 'Nome fantasia', value: cliente.nome_fantasia },
                    { label: 'CNPJ', value: cliente.cnpj },
                    { label: 'CPF', value: cliente.cpf },
                    { label: 'IE', value: cliente.ie },
                    { label: 'Slug', value: `/${cliente.slug}` },
                  ].filter(f => f.value).map(f => (
                    <div key={f.label} className="flex justify-between gap-4">
                      <span className="text-gray-400 flex-shrink-0">{f.label}</span>
                      <span className="text-maginf-gray font-medium text-right">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contato */}
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Mail className="h-3.5 w-3.5" />Contato</p>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Email', value: cliente.email_contato },
                    { label: 'Telefone', value: cliente.telefone },
                    { label: 'Celular', value: cliente.celular },
                    { label: 'Site', value: cliente.site },
                  ].filter(f => f.value).map(f => (
                    <div key={f.label} className="flex justify-between gap-4">
                      <span className="text-gray-400 flex-shrink-0">{f.label}</span>
                      <span className="text-maginf-gray font-medium text-right">{f.value}</span>
                    </div>
                  ))}
                  {cliente.emails_notificacao?.length > 0 && (
                    <div>
                      <span className="text-gray-400 text-xs block mb-1">Notificações OS</span>
                      <div className="flex flex-wrap gap-1.5">
                        {cliente.emails_notificacao.map((em: string) => (
                          <span key={em} className="bg-orange-50 border border-orange-200 text-orange-700 text-xs px-2 py-0.5 rounded-full">{em}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Endereço */}
              {(cliente.logradouro || cliente.cidade) && (
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />Endereço</p>
                  <p className="text-sm text-maginf-gray">
                    {[cliente.logradouro, cliente.numero, cliente.complemento].filter(Boolean).join(', ')}
                    {cliente.bairro && <><br />{cliente.bairro}</>}
                    {cliente.cidade && <><br />{cliente.cidade}{cliente.estado ? ` – ${cliente.estado}` : ''}</>}
                    {cliente.cep && <><br />CEP {cliente.cep}</>}
                  </p>
                </div>
              )}

              {/* Responsável */}
              {cliente.responsavel_nome && (
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><User className="h-3.5 w-3.5" />Responsável</p>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: 'Nome', value: cliente.responsavel_nome },
                      { label: 'Cargo', value: cliente.responsavel_cargo },
                      { label: 'Email', value: cliente.responsavel_email },
                      { label: 'Telefone', value: cliente.responsavel_telefone },
                    ].filter(f => f.value).map(f => (
                      <div key={f.label} className="flex justify-between gap-4">
                        <span className="text-gray-400 flex-shrink-0">{f.label}</span>
                        <span className="text-maginf-gray font-medium text-right">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Acesso */}
              <div className="bg-white rounded-xl p-5 shadow-sm md:col-span-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Credenciais de Acesso</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Portal do cliente</p>
                    <code className="text-maginf-orange text-xs block mb-2">/portal/{cliente.slug}</code>
                    <p className="font-bold text-maginf-gray tracking-widest">{cliente.senha_cliente}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Equipe técnica</p>
                    <code className="text-blue-600 text-xs block mb-2">/obra/{cliente.slug}</code>
                    <p className="font-bold text-maginf-gray tracking-widest">{cliente.senha_tecnico}</p>
                  </div>
                </div>
                {cliente.observacoes && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Observações internas</p>
                    <p className="text-sm text-gray-600">{cliente.observacoes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Zona de conclusão */}
            {cliente.status !== 'concluido' ? (
              <div className="bg-white rounded-2xl shadow-sm p-5 border border-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-maginf-gray text-sm flex items-center gap-2"><Archive className="h-4 w-4 text-red-500" />Encerrar obra</p>
                    <p className="text-xs text-gray-400 mt-0.5">Remove o subdomínio e arquiva o cliente. Histórico preservado.</p>
                  </div>
                  <button onClick={() => setConfirmarConclusao(true)}
                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors border border-red-200">
                    <Archive className="h-4 w-4" />Concluir Obra
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 flex items-center gap-3">
                <Archive className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-500 text-sm">Obra concluída</p>
                  <p className="text-xs text-gray-400">Subdomínio removido em {cliente.concluido_em ? new Date(cliente.concluido_em).toLocaleDateString('pt-BR') : '—'}</p>
                </div>
              </div>
            )}
            </div>
          )}

          {/* MODAL CONFIRMAR CONCLUSÃO */}
          {confirmarConclusao && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 rounded-full p-2.5"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
                  <div>
                    <p className="font-bold text-maginf-gray">Concluir Obra</p>
                    <p className="text-xs text-gray-400">{cliente.nome}</p>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-1.5 text-xs text-amber-800">
                  <p className="font-bold">O que será feito:</p>
                  <p>• Subdomínio <strong>{cliente.dominio || cliente.slug}.maginf.com.br</strong> será removido do Cloudflare e Vercel</p>
                  <p>• Cliente movido para "Obras Concluídas"</p>
                  <p>• Histórico de vistorias e dados preservados</p>
                  <p>• Slug <strong>/{cliente.slug}</strong> mantido no banco</p>
                </div>
                <p className="text-sm text-gray-600">Tem certeza? Esta ação removerá o acesso ao portal do cliente.</p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirmarConclusao(false)} disabled={concluindo}
                    className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl text-sm hover:bg-gray-50">
                    Cancelar
                  </button>
                  <button onClick={handleConcluirObra} disabled={concluindo}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                    {concluindo ? <><div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />Concluindo...</> : <><Archive className="h-4 w-4" />Confirmar</>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ABA: FUNCIONÁRIOS */}
          {aba === 'funcionarios' && (
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <p className="text-gray-500 text-sm mb-4">Gerencie a equipe técnica deste cliente.</p>
              <Link href={`/admin/clientes/${id}/funcionarios`}
                className="inline-flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                Abrir Gestão de Equipe →
              </Link>
            </div>
          )}

          {/* Rodapé impressão */}
          <div className="hidden print:block mt-8 pt-4 border-t text-center">
            <p className="text-xs text-gray-400">MAGINF Tecnologia · sac@maginf.com.br · Relatório gerado em {new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>
    </>
  )
}
