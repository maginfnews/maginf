import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {
  Users, ClipboardList, CheckCircle, Clock, XCircle,
  TrendingUp, LogOut, PlusCircle, Camera, Activity,
  Building2, AlertTriangle, BarChart3,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } = require('recharts')

export default function AdminDashboard() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/admin'); return }
      carregar()
    })
  }, [router])

  const carregar = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/dashboard')
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  if (loading || !data) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-maginf-orange border-t-transparent rounded-full" />
    </div>
  )

  const { stats, por_cliente, evolucao, status_obra_counts, recentes } = data

  const donutStatus = [
    { name: 'Aprovadas', value: stats.aprovadas, color: '#16a34a' },
    { name: 'Pendentes', value: stats.pendentes, color: '#f59e0b' },
    { name: 'Reprovadas', value: stats.reprovadas, color: '#dc2626' },
  ].filter(d => d.value > 0)

  const donutObra = [
    { name: 'Não iniciado', value: status_obra_counts.nao_iniciado, color: '#94a3b8' },
    { name: 'Em andamento', value: status_obra_counts.em_andamento, color: '#f59e0b' },
    { name: 'Concluído', value: status_obra_counts.concluido, color: '#16a34a' },
  ].filter(d => d.value > 0)

  const statusObraLabel = (s: string) => {
    if (s === 'concluido') return <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Concluído</span>
    if (s === 'em_andamento') return <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">Em andamento</span>
    return <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">Não iniciado</span>
  }

  return (
    <>
      <Head><title>Dashboard – Admin MAGINF</title></Head>
      <div className="min-h-screen bg-gray-50">

        {/* Header */}
        <header className="bg-maginf-gray text-white px-6 py-3 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
            <span className="text-gray-400 text-sm hidden sm:block">Área Administrativa</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-white text-sm px-3 py-1.5 rounded-lg bg-white/10">Dashboard</Link>
            <Link href="/admin/clientes" className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">Clientes</Link>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white p-2 ml-2"><LogOut className="h-4 w-4" /></button>
          </nav>
        </header>

        <div className="max-w-7xl mx-auto p-6 space-y-6">

          {/* Título */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-maginf-gray">Dashboard Geral</h1>
              <p className="text-gray-400 text-sm mt-0.5">Visão completa de todos os clientes e obras</p>
            </div>
            <Link href="/admin/clientes/novo" className="flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
              <PlusCircle className="h-4 w-4" /> Novo Cliente
            </Link>
          </div>

          {/* Cards de stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Clientes ativos', value: stats.clientes_ativos, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Total de vistorias', value: stats.total_vistorias, icon: ClipboardList, color: 'text-maginf-orange', bg: 'bg-orange-50' },
              { label: 'Aprovadas', value: stats.aprovadas, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Pendentes', value: stats.pendentes, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Reprovadas', value: stats.reprovadas, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
              { label: 'Vistorias hoje', value: stats.vistorias_hoje, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Total de fotos', value: stats.total_fotos, icon: Camera, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Taxa de aprovação', value: `${stats.total_vistorias > 0 ? Math.round((stats.aprovadas / stats.total_vistorias) * 100) : 0}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
                <div className={`${c.bg} rounded-xl p-3 flex-shrink-0`}>
                  <c.icon className={`h-5 w-5 ${c.color}`} />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gráficos linha 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Evolução diária */}
            <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Vistorias nos últimos 14 dias</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={evolucao} margin={{ top: 0, right: 8, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="dia" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="total" stroke="#e35300" strokeWidth={2.5} dot={{ r: 3, fill: '#e35300' }} name="Vistorias" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Donut status */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Status das vistorias</p>
              {donutStatus.length > 0 ? (
                <div className="flex flex-col items-center gap-3">
                  <ResponsiveContainer width="100%" height={130}>
                    <PieChart>
                      <Pie data={donutStatus} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="value" strokeWidth={0}>
                        {donutStatus.map((e: any, i: number) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: any, n: any) => [`${v}`, n]} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-full space-y-1.5">
                    {donutStatus.map((d: any) => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /><span className="text-xs text-gray-600">{d.name}</span></div>
                        <span className="text-xs font-bold" style={{ color: d.color }}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : <p className="text-gray-400 text-sm text-center py-8">Sem dados</p>}
            </div>
          </div>

          {/* Gráficos linha 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Barras por cliente */}
            <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Vistorias por cliente</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={por_cliente.filter((c: any) => c.total_vistorias > 0).slice(0, 10)} barSize={16} margin={{ top: 0, right: 4, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="nome" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                  <Bar dataKey="aprovadas" name="Aprovadas" fill="#16a34a" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
                  <Bar dataKey="pendentes" name="Pendentes" fill="#f59e0b" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
                  <Bar dataKey="reprovadas" name="Reprovadas" fill="#dc2626" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Donut status obra */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Status das obras</p>
              {donutObra.length > 0 ? (
                <div className="flex flex-col items-center gap-3">
                  <ResponsiveContainer width="100%" height={130}>
                    <PieChart>
                      <Pie data={donutObra} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="value" strokeWidth={0}>
                        {donutObra.map((e: any, i: number) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: any, n: any) => [`${v}`, n]} contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="w-full space-y-1.5">
                    {donutObra.map((d: any) => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /><span className="text-xs text-gray-600">{d.name}</span></div>
                        <span className="text-xs font-bold" style={{ color: d.color }}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : <p className="text-gray-400 text-sm text-center py-8">Sem dados</p>}
            </div>
          </div>

          {/* Tabela de clientes */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <p className="font-bold text-maginf-gray flex items-center gap-2"><Building2 className="h-4 w-4 text-maginf-orange" />Todos os Clientes</p>
              <Link href="/admin/clientes" className="text-xs text-maginf-orange hover:underline">Ver todos →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Portal</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Vistorias</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Aprovação</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Última vistoria</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status obra</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {por_cliente.map((c: any) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {c.logo_url
                            ? <img src={c.logo_url} alt={c.nome} className="h-8 w-8 rounded-lg object-cover bg-gray-100" />
                            : <div className="h-8 w-8 rounded-lg bg-maginf-orange/10 flex items-center justify-center text-maginf-orange font-bold text-sm">{c.nome[0]}</div>
                          }
                          <div>
                            <p className="font-semibold text-maginf-gray text-sm">{c.nome}</p>
                            <p className="text-xs text-gray-400">{c.tipo} · {c.cidade || '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">/portal/{c.slug}</code>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-maginf-gray">{c.total_vistorias}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${c.progresso}%` }} />
                          </div>
                          <span className="text-xs font-bold text-green-600">{c.progresso}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {c.ultima_vistoria ? new Date(c.ultima_vistoria).toLocaleDateString('pt-BR') : '—'}
                      </td>
                      <td className="px-6 py-4">{statusObraLabel(c.status_obra)}</td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/clientes/${c.id}`} className="text-xs text-maginf-orange hover:underline font-semibold">Detalhes →</Link>
                      </td>
                    </tr>
                  ))}
                  {por_cliente.length === 0 && (
                    <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">Nenhum cliente cadastrado. <Link href="/admin/clientes/novo" className="text-maginf-orange hover:underline">Criar primeiro cliente →</Link></td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Feed de atividade recente */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <p className="font-bold text-maginf-gray flex items-center gap-2"><Activity className="h-4 w-4 text-maginf-orange" />Atividade Recente</p>
            </div>
            <div className="divide-y divide-gray-50">
              {recentes.length === 0 && <p className="px-6 py-8 text-center text-gray-400 text-sm">Nenhuma atividade ainda.</p>}
              {recentes.map((v: any) => {
                const s = v.aprovado_status || 'pendente'
                const color = s === 'aprovado' ? 'text-green-600 bg-green-50' : s === 'reprovado' ? 'text-red-600 bg-red-50' : 'text-yellow-600 bg-yellow-50'
                const icon = s === 'aprovado' ? '✅' : s === 'reprovado' ? '❌' : '⏳'
                return (
                  <div key={v.id} className="px-6 py-3 flex items-center gap-3">
                    <span className={`text-sm px-2 py-0.5 rounded-full font-bold ${color}`}>{icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-maginf-gray font-medium truncate">Unidade {v.apartamento} <span className="text-gray-400 font-normal">· {v.tecnico}</span></p>
                      <p className="text-xs text-gray-400">{v.cliente_slug || '—'}</p>
                    </div>
                    <p className="text-xs text-gray-400 flex-shrink-0">{v.data ? new Date(v.data).toLocaleDateString('pt-BR') : '—'}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
