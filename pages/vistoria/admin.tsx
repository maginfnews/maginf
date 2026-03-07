import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import {
  ClipboardList,
  CheckCircle,
  Camera,
  ChevronDown,
  ChevronUp,
  LogOut,
  PlusCircle,
  Search,
  Home,
  User,
  Hash,
  Calendar,
} from 'lucide-react'

type Foto = {
  id: string
  url: string
  tipo: 'antes' | 'depois'
  timestamp: string
}

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
  vistoria_fotos: Foto[]
}

export default function VistoriaAdmin() {
  const router = useRouter()
  const [vistorias, setVistorias] = useState<Vistoria[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [expandido, setExpandido] = useState<string | null>(null)
  const [busca, setBusca] = useState('')
  const [fotoAmpliada, setFotoAmpliada] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('vistoria_auth')
      if (!auth) {
        router.replace('/vistoria')
        return
      }
    }
    carregarVistorias()
  }, [router])

  const carregarVistorias = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/vistoria/listar')
      if (!res.ok) throw new Error('Erro ao carregar')
      const data = await res.json()
      setVistorias(data.vistorias || [])
    } catch (err: any) {
      setErro('Erro ao carregar vistorias. Verifique a conexão.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('vistoria_auth')
    router.push('/vistoria')
  }

  const formatarData = (iso: string) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleString('pt-BR')
  }

  const vistoriasFiltradas = vistorias.filter(
    (v) =>
      v.apartamento.toLowerCase().includes(busca.toLowerCase()) ||
      v.ordem_servico.toLowerCase().includes(busca.toLowerCase()) ||
      v.tecnico.toLowerCase().includes(busca.toLowerCase())
  )

  const totalFotos = (v: Vistoria) => v.vistoria_fotos?.length || 0
  const fotosAntes = (v: Vistoria) => v.vistoria_fotos?.filter((f) => f.tipo === 'antes') || []
  const fotosDepois = (v: Vistoria) => v.vistoria_fotos?.filter((f) => f.tipo === 'depois') || []

  return (
    <>
      <Head>
        <title>Painel de Vistorias – MAGINF</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      {/* Foto ampliada */}
      {fotoAmpliada && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setFotoAmpliada(null)}
        >
          <img
            src={fotoAmpliada}
            alt="Foto ampliada"
            className="max-w-full max-h-full rounded-lg object-contain"
          />
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
            onClick={() => setFotoAmpliada(null)}
          >
            ✕
          </button>
        </div>
      )}

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-maginf-gray text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
          <div className="flex items-center gap-3">
            <img src="/logo-maginf-oficial-white.svg" alt="MAGINF" className="h-8 w-auto" />
            <div>
              <p className="text-xs text-gray-400">Marriott Airport</p>
              <p className="text-sm font-semibold">Painel de Vistorias</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/vistoria/registrar')}
              className="bg-maginf-orange hover:bg-maginf-orange-dark text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Nova</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white p-2"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="max-w-3xl mx-auto p-4">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-maginf-orange">{vistorias.length}</p>
              <p className="text-xs text-gray-500 mt-1">Apartamentos</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-600">
                {vistorias.filter((v) => v.status === 'finalizado').length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Finalizados</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-maginf-gray">
                {vistorias.reduce((acc, v) => acc + totalFotos(v), 0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Fotos</p>
            </div>
          </div>

          {/* Busca */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por apartamento, OS ou técnico..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-maginf-orange focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin h-10 w-10 border-4 border-maginf-orange border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Carregando vistorias...</p>
            </div>
          )}

          {/* Erro */}
          {erro && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-600 text-sm">{erro}</p>
              <button
                onClick={carregarVistorias}
                className="mt-2 text-sm text-maginf-orange underline"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Lista vazia */}
          {!loading && !erro && vistoriasFiltradas.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">
                {busca ? 'Nenhum resultado encontrado.' : 'Nenhuma vistoria registrada ainda.'}
              </p>
              {!busca && (
                <button
                  onClick={() => router.push('/vistoria/registrar')}
                  className="mt-4 bg-maginf-orange text-white px-4 py-2 rounded-lg text-sm hover:bg-maginf-orange-dark transition-colors"
                >
                  Registrar primeira vistoria
                </button>
              )}
            </div>
          )}

          {/* Lista de vistorias */}
          {!loading && vistoriasFiltradas.map((v) => (
            <div key={v.id} className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden">
              {/* Cabeçalho do card */}
              <button
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setExpandido(expandido === v.id ? null : v.id)}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="bg-maginf-orange/10 rounded-xl p-2.5">
                    <Home className="h-5 w-5 text-maginf-orange" />
                  </div>
                  <div>
                    <p className="font-bold text-maginf-gray text-base">
                      Apartamento {v.apartamento}
                    </p>
                    <p className="text-sm text-gray-500">OS: {v.ordem_servico}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    OK
                  </span>
                  {expandido === v.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Conteúdo expandido */}
              {expandido === v.id && (
                <div className="border-t border-gray-100 px-4 py-4 space-y-4">

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4 text-maginf-orange flex-shrink-0" />
                      <span>{v.tecnico}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Hash className="h-4 w-4 text-maginf-orange flex-shrink-0" />
                      <span>{v.ordem_servico}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                      <Calendar className="h-4 w-4 text-maginf-orange flex-shrink-0" />
                      <span>{formatarData(v.data_finalizacao)}</span>
                    </div>
                  </div>

                  {/* Observações */}
                  {v.observacoes && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Observações</p>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 whitespace-pre-line">
                        {v.observacoes}
                      </p>
                    </div>
                  )}

                  {/* Fotos Antes */}
                  {fotosAntes(v).length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        Fotos – Antes ({fotosAntes(v).length})
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {fotosAntes(v).map((foto) => (
                          <img
                            key={foto.id}
                            src={foto.url}
                            alt="Antes"
                            className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setFotoAmpliada(foto.url)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fotos Depois */}
                  {fotosDepois(v).length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2 flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        Fotos – Depois ({fotosDepois(v).length})
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {fotosDepois(v).map((foto) => (
                          <img
                            key={foto.id}
                            src={foto.url}
                            alt="Depois"
                            className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity border-2 border-green-200"
                            onClick={() => setFotoAmpliada(foto.url)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
