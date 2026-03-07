import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Users, PlusCircle, Search, LogOut, Building2, CheckCircle, Clock, XCircle, Eye } from 'lucide-react'
import { supabase } from '../../../lib/supabase'

export default function AdminClientes() {
  const router = useRouter()
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState<'todos' | 'ativos' | 'inativos'>('todos')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/admin'); return }
      carregar()
    })
  }, [router])

  const carregar = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/clientes')
    const json = await res.json()
    setClientes(json.clientes || [])
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const filtrados = clientes.filter(c => {
    const matchBusca = c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.slug.toLowerCase().includes(busca.toLowerCase()) ||
      (c.email_contato || '').toLowerCase().includes(busca.toLowerCase()) ||
      (c.cidade || '').toLowerCase().includes(busca.toLowerCase())
    const matchFiltro = filtro === 'todos' || (filtro === 'ativos' ? c.ativo : !c.ativo)
    return matchBusca && matchFiltro
  })

  const getStats = (c: any) => {
    const vs = c.vistorias || []
    const total = vs.length
    const aprovadas = vs.filter((v: any) => v.aprovado_status === 'aprovado').length
    const pendentes = vs.filter((v: any) => !v.aprovado_status || v.aprovado_status === 'pendente').length
    const progresso = total > 0 ? Math.round((aprovadas / total) * 100) : 0
    const status_obra = total === 0 ? 'nao_iniciado' : pendentes === total ? 'em_andamento' : aprovadas === total ? 'concluido' : 'em_andamento'
    return { total, aprovadas, pendentes, progresso, status_obra }
  }

  const statusBadge = (s: string) => {
    if (s === 'concluido') return <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle className="h-3 w-3" />Concluído</span>
    if (s === 'em_andamento') return <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Clock className="h-3 w-3" />Em andamento</span>
    return <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><XCircle className="h-3 w-3" />Não iniciado</span>
  }

  return (
    <>
      <Head><title>Clientes – Admin MAGINF</title></Head>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-maginf-gray text-white px-6 py-3 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
            <span className="text-gray-400 text-sm hidden sm:block">Área Administrativa</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">Dashboard</Link>
            <Link href="/admin/clientes" className="text-white text-sm px-3 py-1.5 rounded-lg bg-white/10">Clientes</Link>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white p-2 ml-2"><LogOut className="h-4 w-4" /></button>
          </nav>
        </header>

        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-maginf-gray flex items-center gap-2"><Users className="h-6 w-6 text-maginf-orange" />Clientes</h1>
              <p className="text-gray-400 text-sm mt-0.5">{clientes.length} cliente{clientes.length !== 1 ? 's' : ''} cadastrado{clientes.length !== 1 ? 's' : ''}</p>
            </div>
            <Link href="/admin/clientes/novo" className="flex items-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
              <PlusCircle className="h-4 w-4" />Novo Cliente
            </Link>
          </div>

          {/* Busca e filtros */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar por nome, slug, email ou cidade..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-maginf-orange text-sm" />
            </div>
            <div className="flex gap-2">
              {(['todos', 'ativos', 'inativos'] as const).map(f => (
                <button key={f} onClick={() => setFiltro(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${filtro === f ? 'bg-maginf-orange text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin h-8 w-8 border-4 border-maginf-orange border-t-transparent rounded-full" />
            </div>
          )}

          {/* Grid de clientes */}
          {!loading && filtrados.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <Building2 className="h-12 w-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">Nenhum cliente encontrado.</p>
              <Link href="/admin/clientes/novo" className="text-maginf-orange hover:underline text-sm mt-2 inline-block">Cadastrar primeiro cliente →</Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {!loading && filtrados.map(c => {
              const st = getStats(c)
              return (
                <div key={c.id} className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${c.ativo ? 'border-l-maginf-orange' : 'border-l-gray-300'}`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {c.logo_url
                          ? <img src={c.logo_url} alt={c.nome} className="h-10 w-10 rounded-lg object-cover bg-gray-100" />
                          : <div className="h-10 w-10 rounded-lg bg-maginf-orange/10 flex items-center justify-center text-maginf-orange font-bold">{c.nome[0]}</div>
                        }
                        <div>
                          <p className="font-bold text-maginf-gray text-sm">{c.nome}</p>
                          <p className="text-xs text-gray-400">{c.tipo} · {c.cidade || 'Sem cidade'}</p>
                        </div>
                      </div>
                      {!c.ativo && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inativo</span>}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center bg-gray-50 rounded-lg p-2">
                        <p className="font-bold text-maginf-gray text-lg">{st.total}</p>
                        <p className="text-xs text-gray-400">Vistorias</p>
                      </div>
                      <div className="text-center bg-green-50 rounded-lg p-2">
                        <p className="font-bold text-green-600 text-lg">{st.aprovadas}</p>
                        <p className="text-xs text-gray-400">Aprovadas</p>
                      </div>
                      <div className="text-center bg-yellow-50 rounded-lg p-2">
                        <p className="font-bold text-yellow-600 text-lg">{st.pendentes}</p>
                        <p className="text-xs text-gray-400">Pendentes</p>
                      </div>
                    </div>

                    {st.total > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progresso</span><span className="font-bold text-maginf-orange">{st.progresso}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-maginf-orange h-1.5 rounded-full transition-all" style={{ width: `${st.progresso}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {statusBadge(st.status_obra)}
                      <div className="flex gap-2">
                        <code className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">/portal/{c.slug}</code>
                        <Link href={`/admin/clientes/${c.id}`} className="flex items-center gap-1 text-xs text-maginf-orange hover:underline font-semibold">
                          <Eye className="h-3 w-3" />Ver
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
