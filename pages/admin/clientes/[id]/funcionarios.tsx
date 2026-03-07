import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, UserPlus, Trash2, Phone, Briefcase, CheckCircle, RefreshCw, LogOut, MessageCircle } from 'lucide-react'
import { supabase } from '../../../../lib/supabase'

function maskCelular(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.replace(/(\d{0,2})/, '($1')
  if (d.length <= 7) return d.replace(/(\d{2})(\d{0,5})/, '($1) $2')
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
}

export default function FuncionariosCliente() {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const [cliente, setCliente] = useState<any>(null)
  const [funcionarios, setFuncionarios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cargo, setCargo] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/admin'); return }
      if (id) carregar()
    })
  }, [router, id])

  const carregar = async () => {
    setLoading(true)
    const [resClientes, resFuncs] = await Promise.all([
      fetch('/api/admin/clientes'),
      fetch(`/api/admin/funcionarios?cliente_id=${id}`),
    ])
    const jsonC = await resClientes.json()
    const jsonF = await resFuncs.json()
    const c = (jsonC.clientes || []).find((c: any) => c.id === id)
    setCliente(c || null)
    setFuncionarios(jsonF.funcionarios || [])
    setLoading(false)
  }

  const handleCadastrar = async () => {
    if (!nome || !telefone) { setErro('Nome e telefone são obrigatórios.'); return }
    setSalvando(true); setErro(''); setSucesso('')
    try {
      const res = await fetch('/api/admin/funcionarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cliente_id: id, nome, telefone, cargo }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error || 'Erro ao cadastrar'); return }
      setSucesso(
        data.whatsapp?.ok
          ? `✅ ${nome} cadastrado e WhatsApp enviado!`
          : `✅ ${nome} cadastrado. WhatsApp não enviado: ${data.whatsapp?.erro || 'não configurado'}`
      )
      setNome(''); setTelefone(''); setCargo('')
      await carregar()
    } finally { setSalvando(false) }
  }

  const handleExcluir = async (funcId: string, funcNome: string) => {
    if (!confirm(`Remover ${funcNome}?`)) return
    await fetch('/api/admin/funcionarios', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: funcId }),
    })
    await carregar()
  }

  const reenviarWhatsApp = async (func: any) => {
    setSucesso(''); setErro('')
    const res = await fetch('/api/admin/funcionarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cliente_id: id, nome: func.nome, telefone: func.telefone, cargo: func.cargo }),
    })
    const data = await res.json()
    if (data.whatsapp?.ok) setSucesso(`WhatsApp reenviado para ${func.nome}!`)
    else setErro(`Erro ao reenviar: ${data.whatsapp?.erro || 'não configurado'}`)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-maginf-orange border-t-transparent rounded-full" />
    </div>
  )

  const inputCls = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-sm"
  const labelCls = "block text-sm font-medium text-maginf-gray mb-1"

  return (
    <>
      <Head><title>Funcionários – {cliente?.nome || '...'} – Admin MAGINF</title></Head>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-maginf-gray text-white px-6 py-3 shadow-lg flex items-center justify-between">
          <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
          <nav className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">Dashboard</Link>
            <Link href="/admin/clientes" className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">Clientes</Link>
            <button onClick={async () => { await supabase.auth.signOut(); router.push('/admin') }} className="text-gray-400 hover:text-white p-2 ml-2"><LogOut className="h-4 w-4" /></button>
          </nav>
        </header>

        <div className="max-w-2xl mx-auto p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Link href={`/admin/clientes/${id}`} className="text-gray-400 hover:text-maginf-orange"><ArrowLeft className="h-5 w-5" /></Link>
            <div>
              <h1 className="text-xl font-bold text-maginf-gray">Equipe Técnica</h1>
              <p className="text-xs text-gray-400">{cliente?.nome} · {funcionarios.length} funcionário{funcionarios.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-bold text-maginf-gray flex items-center gap-2"><UserPlus className="h-4 w-4 text-maginf-orange" />Cadastrar novo funcionário</h2>
            <div>
              <label className={labelCls}>Nome completo <span className="text-red-500">*</span></label>
              <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: João da Silva" className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>WhatsApp <span className="text-red-500">*</span></label>
                <input value={telefone} onChange={e => setTelefone(maskCelular(e.target.value))} placeholder="(11) 00000-0000" maxLength={15} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Cargo / Função</label>
                <input value={cargo} onChange={e => setCargo(e.target.value)} placeholder="Técnico, Encarregado..." className={inputCls} />
              </div>
            </div>

            {erro && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{erro}</p>}
            {sucesso && <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">{sucesso}</p>}

            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-blue-700 font-semibold flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" />Ao cadastrar, o funcionário recebe automaticamente por WhatsApp:</p>
              <ul className="text-xs text-blue-600 mt-1.5 space-y-0.5 ml-5 list-disc">
                <li>Link de acesso à obra</li>
                <li>Senha de acesso</li>
                <li>Instruções de uso</li>
              </ul>
            </div>

            <button onClick={handleCadastrar} disabled={salvando || !nome || !telefone}
              className="w-full bg-maginf-orange hover:bg-maginf-orange-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              {salvando ? <><RefreshCw className="h-4 w-4 animate-spin" />Cadastrando...</> : <><UserPlus className="h-4 w-4" />Cadastrar e Enviar WhatsApp</>}
            </button>
          </div>

          {/* Lista */}
          <div className="space-y-3">
            {funcionarios.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                <UserPlus className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Nenhum funcionário cadastrado ainda.</p>
              </div>
            )}
            {funcionarios.map(f => (
              <div key={f.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-maginf-orange/10 flex items-center justify-center text-maginf-orange font-bold text-sm flex-shrink-0">
                    {f.nome[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-maginf-gray text-sm">{f.nome}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {f.cargo && <span className="flex items-center gap-1 text-xs text-gray-400"><Briefcase className="h-3 w-3" />{f.cargo}</span>}
                      <span className="flex items-center gap-1 text-xs text-gray-400"><Phone className="h-3 w-3" />{f.telefone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => reenviarWhatsApp(f)} title="Reenviar WhatsApp"
                    className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleExcluir(f.id, f.nome)} title="Remover"
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
