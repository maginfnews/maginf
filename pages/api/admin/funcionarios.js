import { supabaseAdmin } from '../../../lib/supabase'

async function enviarWhatsApp(telefone, mensagem) {
  const instanceId = process.env.ZAPI_INSTANCE_ID
  const token = process.env.ZAPI_TOKEN
  const clientToken = process.env.ZAPI_CLIENT_TOKEN
  if (!instanceId || !token) return { ok: false, erro: 'Z-API não configurada' }

  const numero = telefone.replace(/\D/g, '')
  const numeroFormatado = numero.startsWith('55') ? numero : `55${numero}`

  try {
    const headers = { 'Content-Type': 'application/json' }
    if (clientToken) headers['Client-Token'] = clientToken

    const res = await fetch(`https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        phone: numeroFormatado,
        message: mensagem,
      }),
    })
    const data = await res.json()
    if (!res.ok) return { ok: false, erro: data.message || 'Erro ao enviar' }
    return { ok: true }
  } catch (err) {
    return { ok: false, erro: err.message }
  }
}

export default async function handler(req, res) {
  const db = supabaseAdmin()

  if (req.method === 'GET') {
    const { cliente_id } = req.query
    if (!cliente_id) return res.status(400).json({ error: 'cliente_id obrigatório' })
    const { data, error } = await db
      .from('funcionarios')
      .select('*')
      .eq('cliente_id', cliente_id)
      .order('criado_em', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ funcionarios: data })
  }

  if (req.method === 'POST') {
    const { cliente_id, nome, telefone, cargo } = req.body
    if (!cliente_id || !nome || !telefone) {
      return res.status(400).json({ error: 'cliente_id, nome e telefone são obrigatórios' })
    }

    const { data: cliente } = await db
      .from('clientes')
      .select('slug, dominio, senha_tecnico, nome')
      .eq('id', cliente_id)
      .single()

    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' })

    const { data: funcionario, error } = await db
      .from('funcionarios')
      .insert({ cliente_id, nome, telefone, cargo })
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })

    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'maginf.com.br'
    const subdominio = cliente.dominio || cliente.slug
    const obraUrl = `https://${subdominio}.${rootDomain}/obra`

    const mensagem = `Olá, *${nome}*! 👷

Você foi cadastrado como técnico de campo na obra *${cliente.nome}*.

📱 *Acesse pelo link:*
${obraUrl}

🔑 *Senha de acesso:* \`${cliente.senha_tecnico}\`

Pelo aplicativo você registra vistorias com fotos antes e depois de cada unidade.

_MAGINF Tecnologia_`

    const whatsResult = await enviarWhatsApp(telefone, mensagem)

    return res.status(200).json({ ok: true, funcionario, whatsapp: whatsResult })
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    if (!id) return res.status(400).json({ error: 'id obrigatório' })
    const { error } = await db.from('funcionarios').delete().eq('id', id)
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
