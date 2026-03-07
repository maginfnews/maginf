import { supabaseAdmin } from '../../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { slug } = req.query
  const db = supabaseAdmin()

  const { data: cliente, error: cErr } = await db.from('clientes').select('*').eq('slug', slug).single()
  if (cErr || !cliente) return res.status(404).json({ error: 'Cliente não encontrado' })

  const { data: vistorias, error } = await db
    .from('vistorias')
    .select('*, vistoria_fotos(*)')
    .eq('cliente_slug', slug)
    .order('data_criacao', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ vistorias: vistorias || [], cliente })
}
