import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const db = supabaseAdmin()

    // Data de hoje no formato YYYYMMDD
    const hoje = new Date()
    const dataStr = hoje.toISOString().slice(0, 10).replace(/-/g, '')

    // Contar quantas OS já foram criadas hoje
    const inicioDia = new Date(hoje)
    inicioDia.setHours(0, 0, 0, 0)

    const fimDia = new Date(hoje)
    fimDia.setHours(23, 59, 59, 999)

    const { count, error } = await db
      .from('vistorias')
      .select('*', { count: 'exact', head: true })
      .gte('data_criacao', inicioDia.toISOString())
      .lte('data_criacao', fimDia.toISOString())

    if (error) throw error

    const sequencial = String((count || 0) + 1).padStart(3, '0')
    const ordemServico = `OS-${dataStr}-${sequencial}`

    return res.status(200).json({ ordem_servico: ordemServico })
  } catch (error) {
    console.error('Gerar OS error:', error)
    // Fallback com timestamp
    const fallback = `OS-${Date.now()}`
    return res.status(200).json({ ordem_servico: fallback })
  }
}
