import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const db = supabaseAdmin()

    const [{ data: clientes }, { data: vistorias }] = await Promise.all([
      db.from('clientes').select('*').order('criado_em', { ascending: false }),
      db.from('vistorias').select('*, vistoria_fotos(id)').order('data_criacao', { ascending: false }),
    ])

    const hoje = new Date().toISOString().slice(0, 10)

    const stats = {
      total_clientes: clientes?.length || 0,
      clientes_ativos: clientes?.filter(c => c.ativo).length || 0,
      clientes_inativos: clientes?.filter(c => !c.ativo).length || 0,
      total_vistorias: vistorias?.length || 0,
      vistorias_hoje: vistorias?.filter(v => v.data_finalizacao?.slice(0, 10) === hoje).length || 0,
      aprovadas: vistorias?.filter(v => v.aprovado_status === 'aprovado').length || 0,
      reprovadas: vistorias?.filter(v => v.aprovado_status === 'reprovado').length || 0,
      pendentes: vistorias?.filter(v => !v.aprovado_status || v.aprovado_status === 'pendente').length || 0,
      total_fotos: vistorias?.reduce((acc, v) => acc + (v.vistoria_fotos?.length || 0), 0) || 0,
    }

    // Por cliente: vistorias + progresso
    const por_cliente = (clientes || []).map(c => {
      const vCliente = (vistorias || []).filter(v => v.cliente_slug === c.slug || v.projeto?.toLowerCase().includes(c.nome.toLowerCase()))
      const total = vCliente.length
      const aprovadas = vCliente.filter(v => v.aprovado_status === 'aprovado').length
      const reprovadas = vCliente.filter(v => v.aprovado_status === 'reprovado').length
      const pendentes = vCliente.filter(v => !v.aprovado_status || v.aprovado_status === 'pendente').length
      const ultima = vCliente[0]?.data_finalizacao || null
      const progresso = total > 0 ? Math.round((aprovadas / total) * 100) : 0
      const status_obra = total === 0 ? 'nao_iniciado' : pendentes === total ? 'em_andamento' : aprovadas === total ? 'concluido' : 'em_andamento'
      return { ...c, total_vistorias: total, aprovadas, reprovadas, pendentes, progresso, ultima_vistoria: ultima, status_obra }
    })

    // Evolução diária (últimos 14 dias)
    const evolucao = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dia = d.toISOString().slice(0, 10)
      const count = (vistorias || []).filter(v => v.data_finalizacao?.slice(0, 10) === dia).length
      evolucao.push({ dia: dia.slice(5), total: count })
    }

    // Por status de obra
    const status_obra_counts = {
      nao_iniciado: por_cliente.filter(c => c.status_obra === 'nao_iniciado').length,
      em_andamento: por_cliente.filter(c => c.status_obra === 'em_andamento').length,
      concluido: por_cliente.filter(c => c.status_obra === 'concluido').length,
    }

    // Últimas 10 vistorias (feed recente)
    const recentes = (vistorias || []).slice(0, 10).map(v => ({
      id: v.id,
      apartamento: v.apartamento,
      tecnico: v.tecnico,
      cliente_slug: v.cliente_slug,
      aprovado_status: v.aprovado_status,
      data: v.data_finalizacao,
    }))

    return res.status(200).json({ stats, por_cliente, evolucao, status_obra_counts, recentes })
  } catch (err) {
    console.error('Dashboard error:', err)
    return res.status(500).json({ error: err.message })
  }
}
