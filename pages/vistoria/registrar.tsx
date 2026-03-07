import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  Camera,
  CheckCircle,
  Trash2,
  ChevronRight,
  LogOut,
  ClipboardList,
  User,
  Home,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'

type Foto = {
  url: string
  preview: string
  timestamp: string
}

type Etapa = 'dados' | 'fotos_antes' | 'observacoes' | 'fotos_depois' | 'finalizando' | 'concluido'

export default function VistoriaRegistrar() {
  const router = useRouter()
  const fileInputAntesRef = useRef<HTMLInputElement>(null)
  const fileInputDepoisRef = useRef<HTMLInputElement>(null)

  const [etapa, setEtapa] = useState<Etapa>('dados')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [gerandoOS, setGerandoOS] = useState(false)

  // Dados do formulário
  const [apartamento, setApartamento] = useState('')
  const [ordemServico, setOrdemServico] = useState('')
  const [tecnico, setTecnico] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [fotosAntes, setFotosAntes] = useState<Foto[]>([])
  const [fotosDepois, setFotosDepois] = useState<Foto[]>([])

  const gerarOS = async () => {
    setGerandoOS(true)
    try {
      const res = await fetch('/api/vistoria/gerar-os')
      const data = await res.json()
      setOrdemServico(data.ordem_servico)
    } catch {
      // fallback local
      const hoje = new Date().toISOString().slice(0, 10).replace(/-/g, '')
      setOrdemServico(`OS-${hoje}-001`)
    } finally {
      setGerandoOS(false)
    }
  }

  // Verificar autenticação
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('vistoria_auth')
      if (!auth) {
        router.replace('/vistoria')
      }
      // Recuperar nome do técnico salvo
      const nomeSalvo = localStorage.getItem('vistoria_tecnico')
      if (nomeSalvo) setTecnico(nomeSalvo)
    }
    // Gerar OS automaticamente
    gerarOS()
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('vistoria_auth')
    router.push('/vistoria')
  }

  // Upload de foto para Cloudinary via API
  const uploadFoto = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const base64 = e.target?.result as string
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
          const fileName = `apto${apartamento}_${timestamp}`

          const res = await fetch('/api/vistoria/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64, fileName }),
          })

          if (!res.ok) throw new Error('Erro no upload')
          const data = await res.json()
          resolve(data.url)
        } catch (err) {
          reject(err)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFotos = async (files: FileList | null, tipo: 'antes' | 'depois') => {
    if (!files || files.length === 0) return
    setLoading(true)
    setErro('')

    try {
      const novasFotos: Foto[] = []
      for (const file of Array.from(files)) {
        const preview = URL.createObjectURL(file)
        const url = await uploadFoto(file)
        novasFotos.push({
          url,
          preview,
          timestamp: new Date().toLocaleString('pt-BR'),
        })
      }

      if (tipo === 'antes') {
        setFotosAntes((prev) => [...prev, ...novasFotos])
      } else {
        setFotosDepois((prev) => [...prev, ...novasFotos])
      }
    } catch (err) {
      setErro('Erro ao fazer upload das fotos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const removerFoto = (tipo: 'antes' | 'depois', index: number) => {
    if (tipo === 'antes') {
      setFotosAntes((prev) => prev.filter((_, i) => i !== index))
    } else {
      setFotosDepois((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleFinalizar = async () => {
    setEtapa('finalizando')
    setErro('')

    try {
      const res = await fetch('/api/vistoria/salvar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apartamento,
          ordem_servico: ordemServico,
          tecnico,
          observacoes,
          fotos_antes: fotosAntes.map((f) => f.url),
          fotos_depois: fotosDepois.map((f) => f.url),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao salvar')
      }

      // Salvar nome do técnico para próximo uso
      localStorage.setItem('vistoria_tecnico', tecnico)
      setEtapa('concluido')
    } catch (err: any) {
      setErro(err.message || 'Erro ao finalizar vistoria')
      setEtapa('fotos_depois')
    }
  }

  const novaVistoria = () => {
    setApartamento('')
    setObservacoes('')
    setFotosAntes([])
    setFotosDepois([])
    setErro('')
    setEtapa('dados')
    gerarOS()
  }

  const etapas: { key: Etapa; label: string }[] = [
    { key: 'dados', label: 'Dados' },
    { key: 'fotos_antes', label: 'Antes' },
    { key: 'observacoes', label: 'Observações' },
    { key: 'fotos_depois', label: 'Depois' },
  ]

  const etapaIndex = etapas.findIndex((e) => e.key === etapa)

  return (
    <>
      <Head>
        <title>Registrar Vistoria – MAGINF</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-maginf-gray text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
          <div className="flex items-center gap-3">
            <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
            <div>
              <p className="text-xs text-gray-400">Marriott Airport</p>
              <p className="text-sm font-semibold">Vistoria de Rede</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/vistoria/admin')}
              className="text-gray-300 hover:text-white p-2"
              title="Painel"
            >
              <ClipboardList className="h-5 w-5" />
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white p-2"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="max-w-lg mx-auto p-4">

          {/* Tela de conclusão */}
          {etapa === 'concluido' && (
            <div className="bg-white rounded-2xl shadow p-8 text-center mt-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-maginf-gray mb-2">Vistoria Finalizada!</h2>
              <p className="text-gray-500 mb-2">
                <strong>Apartamento {apartamento}</strong> — OS {ordemServico}
              </p>
              <p className="text-sm text-gray-400 mb-6">
                Relatório enviado por email e salvo no sistema.
              </p>
              <div className="space-y-3">
                <button
                  onClick={novaVistoria}
                  className="w-full bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Próximo Apartamento
                </button>
                <button
                  onClick={() => router.push('/vistoria/admin')}
                  className="w-full border border-maginf-gray text-maginf-gray hover:bg-maginf-gray hover:text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Ver todos os registros
                </button>
              </div>
            </div>
          )}

          {/* Tela de finalizando */}
          {etapa === 'finalizando' && (
            <div className="bg-white rounded-2xl shadow p-8 text-center mt-6">
              <div className="animate-spin h-12 w-12 border-4 border-maginf-orange border-t-transparent rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-bold text-maginf-gray">Salvando vistoria...</h2>
              <p className="text-gray-400 text-sm mt-2">Enviando dados e email de notificação</p>
            </div>
          )}

          {/* Formulário principal */}
          {etapa !== 'concluido' && etapa !== 'finalizando' && (
            <>
              {/* Progress steps */}
              <div className="flex items-center justify-between my-4 px-2">
                {etapas.map((e, i) => (
                  <div key={e.key} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        i < etapaIndex
                          ? 'bg-green-500 text-white'
                          : i === etapaIndex
                          ? 'bg-maginf-orange text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {i < etapaIndex ? <CheckCircle className="h-4 w-4" /> : i + 1}
                    </div>
                    <span
                      className={`ml-1 text-xs hidden sm:block ${
                        i === etapaIndex ? 'text-maginf-orange font-semibold' : 'text-gray-400'
                      }`}
                    >
                      {e.label}
                    </span>
                    {i < etapas.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-gray-300 mx-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Erro global */}
              {erro && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-600 text-sm">{erro}</p>
                </div>
              )}

              {/* ETAPA 1: Dados */}
              {etapa === 'dados' && (
                <div className="bg-white rounded-2xl shadow p-6 space-y-5">
                  <h2 className="text-lg font-bold text-maginf-gray flex items-center gap-2">
                    <Home className="h-5 w-5 text-maginf-orange" />
                    Dados do Apartamento
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-maginf-gray mb-1">
                      Nº do Apartamento *
                    </label>
                    <input
                      type="text"
                      value={apartamento}
                      onChange={(e) => setApartamento(e.target.value)}
                      placeholder="Ex: 321"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-lg font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-maginf-gray mb-1">
                      Ordem de Serviço
                    </label>
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                      <span className="flex-1 font-mono font-bold text-maginf-gray text-sm">
                        {gerandoOS ? 'Gerando...' : ordemServico || '—'}
                      </span>
                      <button
                        type="button"
                        onClick={gerarOS}
                        disabled={gerandoOS}
                        className="text-maginf-orange hover:text-maginf-orange-dark disabled:opacity-50"
                        title="Gerar nova OS"
                      >
                        <RefreshCw className={`h-4 w-4 ${gerandoOS ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Gerada automaticamente</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-maginf-gray mb-1">
                      Nome do Técnico *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={tecnico}
                        onChange={(e) => setTecnico(e.target.value)}
                        placeholder="Seu nome completo"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!apartamento || !tecnico) {
                        setErro('Preencha o número do apartamento e o nome do técnico.')
                        return
                      }
                      setErro('')
                      setEtapa('fotos_antes')
                    }}
                    className="w-full bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Continuar
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* ETAPA 2: Fotos Antes */}
              {etapa === 'fotos_antes' && (
                <div className="bg-white rounded-2xl shadow p-6 space-y-4">
                  <h2 className="text-lg font-bold text-maginf-gray flex items-center gap-2">
                    <Camera className="h-5 w-5 text-maginf-orange" />
                    Fotos – Estado Atual (Antes)
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fotografe os equipamentos, pontos de rede e infraestrutura existente.
                  </p>

                  <input
                    ref={fileInputAntesRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFotos(e.target.files, 'antes')}
                  />

                  <button
                    onClick={() => fileInputAntesRef.current?.click()}
                    disabled={loading}
                    className="w-full border-2 border-dashed border-maginf-orange text-maginf-orange hover:bg-orange-50 font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Camera className="h-5 w-5" />
                    {loading ? 'Enviando...' : 'Tirar / Adicionar Fotos'}
                  </button>

                  {fotosAntes.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {fotosAntes.map((foto, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={foto.preview}
                            alt={`Antes ${i + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => removerFoto('antes', i)}
                              className="bg-red-500 text-white p-1 rounded-full"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 text-center truncate">{foto.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setEtapa('dados')}
                      className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setEtapa('observacoes')}
                      disabled={loading}
                      className="flex-1 bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      Continuar
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ETAPA 3: Observações */}
              {etapa === 'observacoes' && (
                <div className="bg-white rounded-2xl shadow p-6 space-y-4">
                  <h2 className="text-lg font-bold text-maginf-gray flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-maginf-orange" />
                    Observações do Serviço
                  </h2>
                  <p className="text-sm text-gray-500">
                    Descreva o que foi encontrado, dificuldades, equipamentos movidos e serviços realizados.
                  </p>

                  <textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    rows={7}
                    placeholder="Ex: Encontrado cabo danificado no rack principal. Substituído cabo Cat6 do ponto 3 ao patch panel. TV movida temporariamente para acesso ao duto. Ponto de rede testado e aprovado..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none resize-none text-sm"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => setEtapa('fotos_antes')}
                      className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setEtapa('fotos_depois')}
                      className="flex-1 bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      Continuar
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ETAPA 4: Fotos Depois */}
              {etapa === 'fotos_depois' && (
                <div className="bg-white rounded-2xl shadow p-6 space-y-4">
                  <h2 className="text-lg font-bold text-maginf-gray flex items-center gap-2">
                    <Camera className="h-5 w-5 text-green-500" />
                    Fotos – Entrega (Depois)
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fotografe o resultado final do serviço. Timestamp automático será registrado.
                  </p>

                  <input
                    ref={fileInputDepoisRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFotos(e.target.files, 'depois')}
                  />

                  <button
                    onClick={() => fileInputDepoisRef.current?.click()}
                    disabled={loading}
                    className="w-full border-2 border-dashed border-green-500 text-green-600 hover:bg-green-50 font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Camera className="h-5 w-5" />
                    {loading ? 'Enviando...' : 'Tirar / Adicionar Fotos'}
                  </button>

                  {fotosDepois.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {fotosDepois.map((foto, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={foto.preview}
                            alt={`Depois ${i + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-green-200"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => removerFoto('depois', i)}
                              className="bg-red-500 text-white p-1 rounded-full"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 text-center truncate">{foto.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setEtapa('observacoes')}
                      className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={handleFinalizar}
                      disabled={loading || fotosDepois.length === 0}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="h-5 w-5" />
                      Finalizar
                    </button>
                  </div>

                  {fotosDepois.length === 0 && (
                    <p className="text-xs text-center text-gray-400">
                      Adicione ao menos 1 foto de entrega para finalizar
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
