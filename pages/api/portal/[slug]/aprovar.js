import { supabaseAdmin } from '../../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFICAR = ['maicon@magpass.com.br', 'matheussleduc@gmail.com']

async function enviarWhatsApp(telefone, mensagem) {
  const instanceId = process.env.ZAPI_INSTANCE_ID
  const token = process.env.ZAPI_TOKEN
  const clientToken = process.env.ZAPI_CLIENT_TOKEN
  if (!instanceId || !token || !telefone) return
  const numero = telefone.replace(/\D/g, '')
  const numeroFormatado = numero.startsWith('55') ? numero : `55${numero}`
  try {
    const headers = { 'Content-Type': 'application/json' }
    if (clientToken) headers['Client-Token'] = clientToken
    await fetch(`https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`, {
      method: 'POST', headers,
      body: JSON.stringify({ phone: numeroFormatado, message: mensagem }),
    })
  } catch (e) { console.error('WhatsApp erro:', e) }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { slug } = req.query
  const { id, status, observacao, aprovado_por } = req.body
  if (!id || !status) return res.status(400).json({ error: 'id e status obrigatórios' })

  const db = supabaseAdmin()
  const { data: cliente } = await db.from('clientes').select('nome, celular, telefone, responsavel_telefone, dominio').eq('slug', slug).single()

  const { data: vistoria, error } = await db
    .from('vistorias')
    .update({ aprovado_status: status, aprovado_em: new Date().toISOString(), aprovado_por: aprovado_por || cliente?.nome || slug, aprovado_obs: observacao || '' })
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })

  const emoji = status === 'aprovado' ? '✅' : '❌'
  const label = status === 'aprovado' ? 'APROVADO' : 'REPROVADO'

  try {
    await resend.emails.send({
      from: 'Portal MAGINF <contato@notificacao.maginf.com.br>',
      to: NOTIFICAR,
      subject: `${emoji} Serviço ${label} – Apto ${vistoria.apartamento} | ${cliente?.nome || slug}`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:${status === 'aprovado' ? '#16a34a' : '#dc2626'};padding:24px;border-radius:8px 8px 0 0;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:20px;">${emoji} Serviço ${label}</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;">${cliente?.nome || slug} – Portal MAGINF</p>
          </div>
          <div style="background:#f9fafb;padding:24px;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#2C3E50;">Apartamento</td><td style="padding:8px;">${vistoria.apartamento}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#2C3E50;">OS</td><td style="padding:8px;">${vistoria.ordem_servico}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#2C3E50;">Técnico</td><td style="padding:8px;">${vistoria.tecnico}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#2C3E50;">Aprovado por</td><td style="padding:8px;">${aprovado_por || cliente?.nome}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#2C3E50;">Data</td><td style="padding:8px;">${new Date().toLocaleString('pt-BR')}</td></tr>
            </table>
            ${observacao ? `<div style="margin-top:16px;padding:12px;background:#fff;border-left:4px solid ${status === 'aprovado' ? '#16a34a' : '#dc2626'};border-radius:4px;"><strong>Observação:</strong> ${observacao}</div>` : ''}
          </div>
        </div>
      `,
    })
  } catch (e) { console.error('Email erro:', e) }

  // WhatsApp ao responsável do cliente
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'maginf.com.br'
  const subdominio = cliente?.dominio || slug
  const portalUrl = `https://${subdominio}.${rootDomain}`
  const telCliente = cliente?.responsavel_telefone || cliente?.celular || cliente?.telefone
  if (telCliente) {
    const msg = `${emoji} *${status === 'aprovado' ? 'Serviço aprovado' : 'Serviço reprovado'}* – ${cliente?.nome}\n\n📋 *Unidade:* ${vistoria.apartamento}\n🔧 *OS:* ${vistoria.ordem_servico}${observacao ? `\n💬 *Obs:* ${observacao}` : ''}\n\n🔗 Ver no portal: ${portalUrl}`
    await enviarWhatsApp(telCliente, msg)
  }

  return res.status(200).json({ ok: true })
}
