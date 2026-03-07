import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const db = supabaseAdmin()

    const { data: vistorias, error } = await db
      .from('vistorias')
      .select(`
        *,
        vistoria_fotos (*)
      `)
      .order('data_criacao', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ vistorias })
  } catch (error) {
    console.error('Listar vistorias error:', error)
    return res.status(500).json({ error: error.message })
  }
}
