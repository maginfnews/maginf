import { supabaseAdmin } from '../../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { slug } = req.query
  const db = supabaseAdmin()

  const { count } = await db.from('vistorias').select('id', { count: 'exact', head: true }).eq('cliente_slug', slug)
  const hoje = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const seq = String((count || 0) + 1).padStart(3, '0')
  const slugUpper = slug.toUpperCase().slice(0, 4)

  return res.status(200).json({ ordem_servico: `OS-${slugUpper}-${hoje}-${seq}` })
}
