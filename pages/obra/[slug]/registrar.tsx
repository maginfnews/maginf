import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Camera, CheckCircle, Trash2, ChevronRight, LogOut, ClipboardList, User, Home, AlertCircle, RefreshCw, Save, Clock, Pencil } from 'lucide-react'

type Foto = { url: string; preview: string; timestamp: string }
type Etapa = 'dados' | 'fotos_antes' | 'observacoes' | 'fotos_depois' | 'finalizando' | 'concluido'

const RASCUNHOS_KEY = (slug: string) => `obra_rascunhos_${slug}`

function getRascunhos(slug: string): any[] {
  try { return JSON.parse(localStorage.getItem(RASCUNHOS_KEY(slug)) || '[]') } catch { return [] }
}
function salvarRascunho(slug: string, osId: string, dados: any) {
  const lista = getRascunhos(slug).filter((r: any) => r.osId !== osId)
  lista.unshift({ ...dados, osId, salvoEm: new Date().toISOString() })
  localStorage.setItem(RASCUNHOS_KEY(slug), JSON.stringify(lista))
}
function removerRascunho(slug: string, osId: string) {
  const lista = getRascunhos(slug).filter((r: any) => r.osId !== osId)
  localStorage.setItem(RASCUNHOS_KEY(slug), JSON.stringify(lista))
}

export default function ObraRegistrar() {
  const router = useRouter()
  const { slug, osId: osIdQuery } = router.query as { slug: string; osId?: string }
  const fileInputAntesRef = useRef<HTMLInputElement>(null)
  const fileInputDepoisRef = useRef<HTMLInputElement>(null)

  const [cliente, setCliente] = useState<any>(null)
  const [etapa, setEtapa] = useState<Etapa>('dados')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [gerandoOS, setGerandoOS] = useState(false)
  const [ultimoSalvo, setUltimoSalvo] = useState<string | null>(null)
  const [osId, setOsId] = useState<string>('')

  const [apartamento, setApartamento] = useState('')
  const [ordemServico, setOrdemServico] = useState('')
  const [tecnico, setTecnico] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [fotosAntes, setFotosAntes] = useState<Foto[]>([])
  const [fotosDepois, setFotosDepois] = useState<Foto[]>([])

  const gerarOS = async () => {
    if (!slug) return
    setGerandoOS(true)
    try {
      const res = await fetch(`/api/obra/${slug}/gerar-os`)
      const data = await res.json()
      setOrdemServico(data.ordem_servico)
    } catch {
      const hoje = new Date().toISOString().slice(0, 10).replace(/-/g, '')
      setOrdemServico(`OS-${(slug || 'XX').toUpperCase().slice(0, 4)}-${hoje}-001`)
    } finally {
      setGerandoOS(false)
    }
  }

  // Salvar rascunho automaticamente
  useEffect(() => {
    if (!slug || !osId || etapa === 'concluido' || etapa === 'finalizando') return
    if (!apartamento && !ordemServico) return
    salvarRascunho(slug, osId, { apartamento, ordemServico, tecnico, observacoes, fotosAntes, fotosDepois, etapa })
    setUltimoSalvo(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
  }, [apartamento, ordemServico, tecnico, observacoes, fotosAntes, fotosDepois, etapa, slug, osId])

  useEffect(() => {
    if (!slug) return
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem(`obra_auth_${slug}`)) { router.replace(`/obra/${slug}`); return }
      const nomeSalvo = localStorage.getItem(`obra_tecnico_${slug}`) || ''
      if (nomeSalvo) setTecnico(nomeSalvo)
      if (osIdQuery) {
        const lista = getRascunhos(slug)
        const r = lista.find((x: any) => x.osId === osIdQuery)
        if (r) {
          setOsId(r.osId)
          setApartamento(r.apartamento || '')
          setOrdemServico(r.ordemServico || '')
          setTecnico(r.tecnico || nomeSalvo)
          setObservacoes(r.observacoes || '')
          setFotosAntes(r.fotosAntes || [])
          setFotosDepois(r.fotosDepois || [])
          setEtapa(r.etapa || 'dados')
          fetch(`/api/portal/${slug}/listar`).then(res => res.json()).then(d => setCliente(d.cliente)).catch(() => {})
          return
        }
      }
      const novoId = `os_${Date.now()}`
      setOsId(novoId)
    }
    fetch(`/api/portal/${slug}/listar`).then(r => r.json()).then(d => setCliente(d.cliente)).catch(() => {})
    gerarOS()
  }, [slug, osIdQuery])

  const comprimirImagem = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const MAX = 1280
        let { width, height } = img
        if (width > MAX || height > MAX) {
          if (width > height) { height = Math.round((height * MAX) / width); width = MAX }
          else { width = Math.round((width * MAX) / height); height = MAX }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width; canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        URL.revokeObjectURL(url)
        canvas.toBlob((blob) => resolve(blob || file), 'image/jpeg', 0.82)
      }
      img.onerror = () => resolve(file)
      img.src = url
    })
  }

  const uploadFoto = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dxr6mywet'
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'vistoria_maginf'
    const blob = await comprimirImagem(file)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const fileName = `${slug}_apto${apartamento}_${timestamp}`
    const form = new FormData()
    form.append('file', blob, `${fileName}.jpg`)
    form.append('upload_preset', uploadPreset)
    form.append('folder', `vistorias/${slug}`)
    form.append('public_id', fileName)
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: form })
    if (!res.ok) throw new Error('Erro no upload')
    const data = await res.json()
    return data.secure_url as string
  }

  const handleFotos = async (files: FileList | null, tipo: 'antes' | 'depois') => {
    if (!files || files.length === 0) return
    setLoading(true); setErro('')
    try {
      const novas: Foto[] = []
      for (const file of Array.from(files)) {
        const preview = URL.createObjectURL(file)
        const url = await uploadFoto(file)
        novas.push({ url, preview, timestamp: new Date().toLocaleString('pt-BR') })
      }
      if (tipo === 'antes') setFotosAntes(prev => [...prev, ...novas])
      else setFotosDepois(prev => [...prev, ...novas])
    } catch { setErro('Erro ao fazer upload das fotos. Tente novamente.') }
    finally { setLoading(false) }
  }

  const removerFoto = (tipo: 'antes' | 'depois', index: number) => {
    if (tipo === 'antes') setFotosAntes(prev => prev.filter((_, i) => i !== index))
    else setFotosDepois(prev => prev.filter((_, i) => i !== index))
  }

  const handleFinalizar = async () => {
    setEtapa('finalizando'); setErro('')
    try {
      const res = await fetch(`/api/obra/${slug}/salvar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apartamento, ordem_servico: ordemServico, tecnico, observacoes, fotos_antes: fotosAntes.map(f => f.url), fotos_depois: fotosDepois.map(f => f.url) }),
      })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Erro ao salvar') }
      localStorage.setItem(`obra_tecnico_${slug}`, tecnico)
      removerRascunho(slug, osId)
      setEtapa('concluido')
    } catch (err: any) {
      setErro(err.message || 'Erro ao finalizar')
      setEtapa('fotos_depois')
    }
  }

  const novaVistoria = () => router.push(`/obra/${slug}/registrar`)
  const voltarLista = () => router.push(`/obra/${slug}`)

  const etapas = [
    { key: 'dados', label: 'Dados' },
    { key: 'fotos_antes', label: 'Antes' },
    { key: 'observacoes', label: 'Observações' },
    { key: 'fotos_depois', label: 'Depois' },
  ]
  const etapaIndex = etapas.findIndex(e => e.key === etapa)

  return (
    <>
      <Head>
        <title>Vistoria {cliente?.nome || slug} – MAGINF</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-maginf-gray text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <button onClick={voltarLista} className="text-gray-400 hover:text-white p-1 -ml-1" title="Voltar">
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-7 w-auto" />
            {cliente?.logo_url && (
              <>
                <div className="h-6 w-px bg-gray-500" />
                <img src={cliente.logo_url} alt={cliente.nome} className="h-8 w-auto rounded bg-white px-1.5 py-0.5 object-contain" />
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {ultimoSalvo && etapa !== 'concluido' && etapa !== 'finalizando' && (
              <span className="flex items-center gap-1 text-xs text-gray-400"><Save className="h-3 w-3" />{ultimoSalvo}</span>
            )}
            <button onClick={() => router.push(`/obra/${slug}/admin`)} className="text-gray-300 hover:text-white p-2" title="Painel">
              <ClipboardList className="h-5 w-5" />
            </button>
            <button onClick={() => { sessionStorage.removeItem(`obra_auth_${slug}`); router.push(`/obra/${slug}`) }} className="text-gray-400 hover:text-white p-2">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="max-w-lg mx-auto p-4 pb-8">

          {/* Etapa concluído */}
          {etapa === 'concluido' && (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center mt-6">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-maginf-gray mb-2">Vistoria registrada!</h2>
              <p className="text-gray-500 text-sm mb-1">Unidade: <span className="font-bold">{apartamento}</span></p>
              <p className="text-gray-500 text-sm mb-6">OS: <span className="font-bold">{ordemServico}</span></p>
              <div className="space-y-3">
                <button onClick={novaVistoria} className="w-full bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-xl transition-colors">
                  + Nova Vistoria
                </button>
                <button onClick={voltarLista} className="w-full border border-gray-300 text-gray-600 py-3 rounded-xl text-sm hover:bg-gray-50">
                  Ver todas as OS abertas
                </button>
              </div>
            </div>
          )}

          {/* Etapa finalizando */}
          {etapa === 'finalizando' && (
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center mt-6">
              <div className="animate-spin h-12 w-12 border-4 border-maginf-orange border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-maginf-gray font-semibold">Salvando vistoria...</p>
              <p className="text-gray-400 text-sm mt-1">Aguarde um momento</p>
            </div>
          )}

          {!['concluido', 'finalizando'].includes(etapa) && (
            <>
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-6 mt-2">
                {etapas.map((e, i) => (
                  <div key={e.key} className="flex items-center flex-1">
                    <div className={`flex-1 h-1.5 rounded-full transition-colors ${i <= etapaIndex ? 'bg-maginf-orange' : 'bg-gray-200'}`} />
                    {i < etapas.length - 1 && <div className={`w-2 h-2 rounded-full mx-1 flex-shrink-0 ${i < etapaIndex ? 'bg-maginf-orange' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-400">Etapa {etapaIndex + 1} de {etapas.length}: <span className="font-semibold text-maginf-gray">{etapas[etapaIndex]?.label}</span></p>
                {apartamento && <span className="text-xs bg-maginf-orange/10 text-maginf-orange font-bold px-2 py-1 rounded-full">Apto {apartamento}</span>}
              </div>

              {erro && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-red-600 text-sm">{erro}</p>
                </div>
              )}

              {/* DADOS */}
              {etapa === 'dados' && (
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                  <h2 className="text-lg font-bold text-maginf-gray flex items-center gap-2"><Home className="h-5 w-5 text-maginf-orange" />Dados da Vistoria</h2>
                  <div>
                    <label className="block text-sm font-medium text-maginf-gray mb-1">Unidade / Apartamento</label>
                    <input value={apartamento} onChange={e => setApartamento(e.target.value)} placeholder="Ex: 101, 202A, Sala 01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-maginf-orange outline-none text-lg font-bold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-maginf-gray mb-1">Ordem de Serviço</label>
                    <div className="flex gap-2">
                      <input value={ordemServico} onChange={e => setOrdemServico(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-maginf-orange outline-none font-mono text-sm" />
                      <button onClick={gerarOS} disabled={gerandoOS} className="px-3 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl">
                        <RefreshCw className={`h-4 w-4 text-gray-600 ${gerandoOS ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-maginf-gray mb-1">Nome do técnico</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input value={tecnico} onChange={e => setTecnico(e.target.value)} placeholder="Seu nome completo"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-maginf-orange outline-none" />
                    </div>
                  </div>
                  <button onClick={() => setEtapa('fotos_antes')} disabled={!apartamento || !ordemServico || !tecnico}
                    className="w-full flex items-center justify-center gap-2 bg-maginf-orange hover:bg-maginf-orange-dark disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
                    Próximo: Fotos Antes <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* FOTOS ANTES */}
              {etapa === 'fotos_antes' && (
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                  <h2 className="text-lg font-bold text-maginf-gray flex items-center gap-2"><Camera className="h-5 w-5 text-maginf-orange" />Fotos – Antes</h2>
                  <p className="text-sm text-gray-500">Registre o estado atual da unidade <span className="font-bold">{apartamento}</span> antes da intervenção.</p>
                  <button onClick={() => fileInputAntesRef.current?.click()} disabled={loading}
                    className="w-full border-2 border-dashed border-maginf-orange/40 hover:border-maginf-orange bg-maginf-orange/5 hover:bg-maginf-orange/10 text-maginf-orange font-semibold py-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                    <Camera className="h-6 w-6" />{loading ? 'Enviando...' : 'Tirar / Selecionar Fotos'}
                  </button>
                  <input ref={fileInputAntesRef} type="file" accept="image/*" multiple capture="environment" className="hidden" onChange={e => handleFotos(e.target.files, 'antes')} />
                  {fotosAntes.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {fotosAntes.map((f, i) => (
                        <div key={i} className="relative aspect-square">
                          <img src={f.preview || f.url} alt="Antes" className="w-full h-full object-cover rounded-lg" />
                          <button onClick={() => removerFoto('antes', i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => setEtapa('dados')} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl">Voltar</button>
                    <button onClick={() => setEtapa('observacoes')} className="flex-1 bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-1">
                      {fotosAntes.length > 0 ? `${fotosAntes.length} foto${fotosAntes.length > 1 ? 's' : ''}` : 'Pular'} <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* OBSERVAÇÕES */}
              {etapa === 'observacoes' && (
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                  <h2 className="text-lg font-bold text-maginf-gray">Observações</h2>
                  <p className="text-sm text-gray-500">Anote problemas encontrados, pontos de atenção ou informações relevantes.</p>
                  <textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} rows={5}
                    placeholder="Ex: Ponto de acesso sem energia. Caixa de passagem danificada..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-maginf-orange outline-none resize-none" />
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2">
                    <Save className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700"><strong>Pode fechar o app e ir trabalhar.</strong> Seu progresso está salvo. Ao voltar e logar, tudo estará aqui esperando.</p>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setEtapa('fotos_antes')} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl">Voltar</button>
                    <button onClick={() => setEtapa('fotos_depois')} className="flex-1 bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-1">
                      Ir trabalhar → <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* FOTOS DEPOIS */}
              {etapa === 'fotos_depois' && (
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
                  <h2 className="text-lg font-bold text-maginf-gray flex items-center gap-2"><Camera className="h-5 w-5 text-green-600" />Fotos – Depois</h2>
                  <p className="text-sm text-gray-500">Registre o resultado final da intervenção na unidade <span className="font-bold">{apartamento}</span>.</p>
                  <button onClick={() => fileInputDepoisRef.current?.click()} disabled={loading}
                    className="w-full border-2 border-dashed border-green-400/40 hover:border-green-500 bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                    <Camera className="h-6 w-6" />{loading ? 'Enviando...' : 'Tirar / Selecionar Fotos'}
                  </button>
                  <input ref={fileInputDepoisRef} type="file" accept="image/*" multiple capture="environment" className="hidden" onChange={e => handleFotos(e.target.files, 'depois')} />
                  {fotosDepois.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {fotosDepois.map((f, i) => (
                        <div key={i} className="relative aspect-square">
                          <img src={f.preview || f.url} alt="Depois" className="w-full h-full object-cover rounded-lg" />
                          <button onClick={() => removerFoto('depois', i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button onClick={() => setEtapa('observacoes')} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl">Voltar</button>
                    <button onClick={handleFinalizar} disabled={fotosDepois.length === 0}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1">
                      <CheckCircle className="h-4 w-4" />Finalizar
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
