import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Upload, Eye, EyeOff, LogOut, RefreshCw, CheckCircle } from 'lucide-react'
import { supabase } from '../../../lib/supabase'

const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dxr6mywet'
const CLOUDINARY_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'vistoria_maginf'

function gerarSenha(len = 10) {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789@#!'
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function NovoCliente() {
  const router = useRouter()
  const logoInputRef = useRef<HTMLInputElement>(null)
  const [aba, setAba] = useState<'identificacao' | 'contato' | 'endereco' | 'responsavel' | 'portal'>('identificacao')
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const [uploadandoLogo, setUploadandoLogo] = useState(false)
  const [showSenhaC, setShowSenhaC] = useState(false)
  const [showSenhaT, setShowSenhaT] = useState(false)

  // Campos
  const [tipo, setTipo] = useState('PJ')
  const [nome, setNome] = useState('')
  const [razaoSocial, setRazaoSocial] = useState('')
  const [nomeFantasia, setNomeFantasia] = useState('')
  const [cpf, setCpf] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [ie, setIe] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManual, setSlugManual] = useState(false)

  const [emailContato, setEmailContato] = useState('')
  const [telefone, setTelefone] = useState('')
  const [celular, setCelular] = useState('')
  const [site, setSite] = useState('')

  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  const [respNome, setRespNome] = useState('')
  const [respCargo, setRespCargo] = useState('')
  const [respEmail, setRespEmail] = useState('')
  const [respTelefone, setRespTelefone] = useState('')

  const [logoUrl, setLogoUrl] = useState('')
  const [senhaCliente, setSenhaCliente] = useState(gerarSenha())
  const [senhaTecnico, setSenhaTecnico] = useState(gerarSenha(8))
  const [observacoes, setObservacoes] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace('/admin')
    })
  }, [router])

  useEffect(() => {
    if (!slugManual && nome) setSlug(slugify(nome))
  }, [nome, slugManual])

  const buscarCep = async () => {
    const c = cep.replace(/\D/g, '')
    if (c.length !== 8) return
    try {
      const res = await fetch(`https://viacep.com.br/ws/${c}/json/`)
      const d = await res.json()
      if (!d.erro) { setLogradouro(d.logradouro); setBairro(d.bairro); setCidade(d.localidade); setEstado(d.uf) }
    } catch {}
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadandoLogo(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('upload_preset', CLOUDINARY_PRESET)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, { method: 'POST', body: fd })
      const data = await res.json()
      setLogoUrl(data.secure_url)
    } finally {
      setUploadandoLogo(false)
    }
  }

  const handleSalvar = async () => {
    if (!nome || !emailContato || !senhaCliente || !senhaTecnico || !slug) {
      setErro('Preencha: nome, email, slug e as duas senhas.')
      setAba('identificacao')
      return
    }
    setSalvando(true)
    setErro('')
    try {
      const res = await fetch('/api/admin/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo, nome, razao_social: razaoSocial, nome_fantasia: nomeFantasia, cpf, cnpj, ie, slug,
          email_contato: emailContato, telefone, celular, site,
          cep, logradouro, numero, complemento, bairro, cidade, estado,
          responsavel_nome: respNome, responsavel_cargo: respCargo, responsavel_email: respEmail, responsavel_telefone: respTelefone,
          logo_url: logoUrl, senha_cliente: senhaCliente, senha_tecnico: senhaTecnico, observacoes,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setErro(data.error || 'Erro ao salvar'); return }
      setSucesso(true)
      setTimeout(() => router.push('/admin/clientes'), 2500)
    } finally {
      setSalvando(false)
    }
  }

  if (sucesso) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-maginf-gray mb-2">Cliente cadastrado!</h2>
        <p className="text-gray-500 text-sm">Email de boas-vindas enviado. Redirecionando...</p>
      </div>
    </div>
  )

  const abas = [
    { id: 'identificacao', label: 'Identificação' },
    { id: 'contato', label: 'Contato' },
    { id: 'endereco', label: 'Endereço' },
    { id: 'responsavel', label: 'Responsável' },
    { id: 'portal', label: 'Portal & Acesso' },
  ] as const

  const inputCls = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-sm"
  const labelCls = "block text-sm font-medium text-maginf-gray mb-1"

  return (
    <>
      <Head><title>Novo Cliente – Admin MAGINF</title></Head>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-maginf-gray text-white px-6 py-3 shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">Dashboard</Link>
            <Link href="/admin/clientes" className="text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-white/10">Clientes</Link>
          </nav>
        </header>

        <div className="max-w-3xl mx-auto p-6">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/admin/clientes" className="text-gray-400 hover:text-maginf-orange"><ArrowLeft className="h-5 w-5" /></Link>
            <div>
              <h1 className="text-xl font-bold text-maginf-gray">Novo Cliente</h1>
              <p className="text-xs text-gray-400">Preencha os dados e o portal será criado automaticamente</p>
            </div>
          </div>

          {/* Tipo PJ/PF */}
          <div className="flex gap-3 mb-6">
            {['PJ', 'PF'].map(t => (
              <button key={t} onClick={() => setTipo(t)}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${tipo === t ? 'bg-maginf-orange text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:border-maginf-orange'}`}>
                {t === 'PJ' ? '🏢 Pessoa Jurídica' : '👤 Pessoa Física'}
              </button>
            ))}
          </div>

          {/* Abas */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
            {abas.map(a => (
              <button key={a.id} onClick={() => setAba(a.id)}
                className={`flex-1 min-w-max py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${aba === a.id ? 'bg-white text-maginf-orange shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {a.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">

            {/* IDENTIFICAÇÃO */}
            {aba === 'identificacao' && (
              <>
                <div>
                  <label className={labelCls}>Nome {tipo === 'PJ' ? 'fantasia / comercial' : 'completo'} <span className="text-red-500">*</span></label>
                  <input value={nome} onChange={e => setNome(e.target.value)} placeholder={tipo === 'PJ' ? 'Ex: Marriott Airport' : 'Ex: João Silva'} className={inputCls} />
                </div>
                {tipo === 'PJ' && (
                  <>
                    <div>
                      <label className={labelCls}>Razão social</label>
                      <input value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} placeholder="Razão social completa" className={inputCls} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>CNPJ</label>
                        <input value={cnpj} onChange={e => setCnpj(e.target.value)} placeholder="00.000.000/0001-00" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Inscrição estadual</label>
                        <input value={ie} onChange={e => setIe(e.target.value)} placeholder="IE" className={inputCls} />
                      </div>
                    </div>
                  </>
                )}
                {tipo === 'PF' && (
                  <div>
                    <label className={labelCls}>CPF</label>
                    <input value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" className={inputCls} />
                  </div>
                )}
                <div>
                  <label className={labelCls}>Slug (URL do portal) <span className="text-red-500">*</span></label>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-l-lg px-3 py-2.5 whitespace-nowrap">/portal/</span>
                    <input value={slug} onChange={e => { setSlug(slugify(e.target.value)); setSlugManual(true) }}
                      placeholder="meu-cliente" className={`${inputCls} rounded-l-none flex-1`} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Gerado automaticamente a partir do nome. Pode editar.</p>
                </div>
              </>
            )}

            {/* CONTATO */}
            {aba === 'contato' && (
              <>
                <div>
                  <label className={labelCls}>Email de contato <span className="text-red-500">*</span></label>
                  <input type="email" value={emailContato} onChange={e => setEmailContato(e.target.value)} placeholder="contato@empresa.com.br" className={inputCls} />
                  <p className="text-xs text-gray-400 mt-1">Este email receberá as credenciais de acesso.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Telefone fixo</label>
                    <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(11) 0000-0000" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Celular / WhatsApp</label>
                    <input value={celular} onChange={e => setCelular(e.target.value)} placeholder="(11) 00000-0000" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Site</label>
                  <input value={site} onChange={e => setSite(e.target.value)} placeholder="https://www.empresa.com.br" className={inputCls} />
                </div>
              </>
            )}

            {/* ENDEREÇO */}
            {aba === 'endereco' && (
              <>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className={labelCls}>CEP</label>
                    <input value={cep} onChange={e => setCep(e.target.value)} onBlur={buscarCep} placeholder="00000-000" className={inputCls} />
                  </div>
                  <div className="flex items-end">
                    <button onClick={buscarCep} className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm">Buscar</button>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Logradouro</label>
                  <input value={logradouro} onChange={e => setLogradouro(e.target.value)} placeholder="Rua, Av., etc." className={inputCls} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelCls}>Número</label>
                    <input value={numero} onChange={e => setNumero(e.target.value)} placeholder="Nº" className={inputCls} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Complemento</label>
                    <input value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Sala, andar, etc." className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Bairro</label>
                  <input value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro" className={inputCls} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className={labelCls}>Cidade</label>
                    <input value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Cidade" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>UF</label>
                    <input value={estado} onChange={e => setEstado(e.target.value)} placeholder="SP" maxLength={2} className={inputCls} />
                  </div>
                </div>
              </>
            )}

            {/* RESPONSÁVEL */}
            {aba === 'responsavel' && (
              <>
                <div>
                  <label className={labelCls}>Nome do responsável</label>
                  <input value={respNome} onChange={e => setRespNome(e.target.value)} placeholder="Nome completo" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Cargo / Função</label>
                  <input value={respCargo} onChange={e => setRespCargo(e.target.value)} placeholder="Gerente de obras, Diretor, etc." className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email do responsável</label>
                  <input type="email" value={respEmail} onChange={e => setRespEmail(e.target.value)} placeholder="responsavel@empresa.com.br" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Telefone do responsável</label>
                  <input value={respTelefone} onChange={e => setRespTelefone(e.target.value)} placeholder="(11) 00000-0000" className={inputCls} />
                </div>
              </>
            )}

            {/* PORTAL & ACESSO */}
            {aba === 'portal' && (
              <>
                {/* Logo */}
                <div>
                  <label className={labelCls}>Logo do cliente</label>
                  <div className="flex items-center gap-4">
                    {logoUrl
                      ? <img src={logoUrl} alt="Logo" className="h-16 w-auto rounded-lg border border-gray-200 bg-gray-50 p-1 object-contain" />
                      : <div className="h-16 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-xs">Sem logo</div>
                    }
                    <button onClick={() => logoInputRef.current?.click()} disabled={uploadandoLogo}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                      <Upload className="h-4 w-4" />
                      {uploadandoLogo ? 'Enviando...' : logoUrl ? 'Trocar logo' : 'Upload logo'}
                    </button>
                    <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </div>
                </div>

                {/* Senha cliente */}
                <div>
                  <label className={labelCls}>Senha do portal (cliente) <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input type={showSenhaC ? 'text' : 'password'} value={senhaCliente} onChange={e => setSenhaCliente(e.target.value)} className={inputCls} />
                      <button type="button" onClick={() => setShowSenhaC(!showSenhaC)} className="absolute right-3 top-3 text-gray-400">
                        {showSenhaC ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <button onClick={() => setSenhaCliente(gerarSenha())} className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg" title="Gerar nova senha">
                      <RefreshCw className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Enviada por email ao cliente automaticamente.</p>
                </div>

                {/* Senha técnico */}
                <div>
                  <label className={labelCls}>Senha da equipe técnica <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input type={showSenhaT ? 'text' : 'password'} value={senhaTecnico} onChange={e => setSenhaTecnico(e.target.value)} className={inputCls} />
                      <button type="button" onClick={() => setShowSenhaT(!showSenhaT)} className="absolute right-3 top-3 text-gray-400">
                        {showSenhaT ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <button onClick={() => setSenhaTecnico(gerarSenha(8))} className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg" title="Gerar nova senha">
                      <RefreshCw className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Acesso em <code className="bg-gray-100 px-1 rounded">/obra/{slug || 'slug'}</code></p>
                </div>

                {/* Observações */}
                <div>
                  <label className={labelCls}>Observações internas</label>
                  <textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} rows={3}
                    placeholder="Notas internas sobre o cliente ou projeto..." className={`${inputCls} resize-none`} />
                </div>

                {/* Preview de URLs */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">URLs geradas automaticamente</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-600 w-28">Portal cliente:</span>
                    <code className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-maginf-orange font-medium">/portal/{slug || 'slug'}</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-600 w-28">Equipe técnica:</span>
                    <code className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-blue-600 font-medium">/obra/{slug || 'slug'}</code>
                  </div>
                </div>
              </>
            )}
          </div>

          {erro && <p className="mt-4 text-red-500 text-sm bg-red-50 p-3 rounded-lg">{erro}</p>}

          {/* Navegação entre abas + salvar */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => {
                const idx = abas.findIndex(a => a.id === aba)
                if (idx > 0) setAba(abas[idx - 1].id)
              }}
              className="px-4 py-2.5 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-30"
              disabled={aba === 'identificacao'}>
              ← Anterior
            </button>

            {aba !== 'portal' ? (
              <button
                onClick={() => {
                  const idx = abas.findIndex(a => a.id === aba)
                  setAba(abas[idx + 1].id)
                }}
                className="px-6 py-2.5 bg-maginf-orange text-white rounded-lg text-sm font-semibold hover:bg-maginf-orange-dark">
                Próximo →
              </button>
            ) : (
              <button onClick={handleSalvar} disabled={salvando}
                className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold disabled:opacity-50 flex items-center gap-2">
                {salvando ? <><RefreshCw className="h-4 w-4 animate-spin" />Salvando...</> : <><CheckCircle className="h-4 w-4" />Cadastrar e Enviar Email</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
