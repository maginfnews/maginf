import { supabaseAdmin } from '../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { id, status, observacao, aprovado_por } = req.body

    if (!id || !status) {
      return res.status(400).json({ error: 'id e status são obrigatórios' })
    }

    if (!['aprovado', 'reprovado'].includes(status)) {
      return res.status(400).json({ error: 'status deve ser aprovado ou reprovado' })
    }

    const db = supabaseAdmin()

    const { data: vistoria, error } = await db
      .from('vistorias')
      .update({
        aprovado_status: status,
        aprovado_em: new Date().toISOString(),
        aprovado_por: aprovado_por || 'Cliente Marriott',
        aprovado_obs: observacao || '',
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    // Notificar MAGINF por email
    const emoji = status === 'aprovado' ? '✅' : '❌'
    const label = status === 'aprovado' ? 'APROVADO' : 'REPROVADO'

    await resend.emails.send({
      from: 'Portal Marriott <contato@notificacao.maginf.com.br>',
      to: ['maicon@magpass.com.br', 'matheussleduc@gmail.com'],
      subject: `${emoji} Serviço ${label} – Apto ${vistoria.apartamento} | Marriott`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:${status === 'aprovado' ? '#16a34a' : '#dc2626'};padding:24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#fff;margin:0;font-size:20px;">${emoji} Serviço ${label}</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;">Marriott Airport – Portal do Cliente</p>
          </div>
          <div style="background:#f9f9f9;padding:24px;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#2C3E50;">Apartamento</td><td style="padding:8px;">${vistoria.apartamento}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#2C3E50;">OS</td><td style="padding:8px;">${vistoria.ordem_servico}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#2C3E50;">Técnico</td><td style="padding:8px;">${vistoria.tecnico}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#2C3E50;">Aprovado por</td><td style="padding:8px;">${aprovado_por || 'Cliente Marriott'}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#2C3E50;">Data</td><td style="padding:8px;">${new Date().toLocaleString('pt-BR')}</td></tr>
            </table>
            ${observacao ? `<div style="margin-top:16px;"><strong>Observação do cliente:</strong><p style="background:#fff;padding:12px;border-radius:6px;border-left:4px solid ${status === 'aprovado' ? '#16a34a' : '#dc2626'};">${observacao}</p></div>` : ''}
          </div>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Aprovar error:', error)
    return res.status(500).json({ error: error.message })
  }
}
