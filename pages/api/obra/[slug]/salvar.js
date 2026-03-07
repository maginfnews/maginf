import { supabaseAdmin } from '../../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFICAR = ['maicon@magpass.com.br', 'matheussleduc@gmail.com']

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { slug } = req.query
  const { apartamento, ordem_servico, tecnico, observacoes, fotos_antes, fotos_depois } = req.body

  if (!apartamento || !ordem_servico || !tecnico) {
    return res.status(400).json({ error: 'Campos obrigatórios: apartamento, ordem_servico, tecnico' })
  }

  const db = supabaseAdmin()

  const { data: cliente } = await db.from('clientes').select('id, nome').eq('slug', slug).single()

  const { data: vistoria, error } = await db.from('vistorias').insert({
    apartamento, ordem_servico, tecnico,
    observacoes: observacoes || '',
    projeto: cliente?.nome || slug,
    cliente_id: cliente?.id || null,
    cliente_slug: slug,
    status: 'finalizado',
    data_finalizacao: new Date().toISOString(),
  }).select().single()

  if (error) return res.status(500).json({ error: error.message })

  if (fotos_antes?.length > 0) {
    await db.from('vistoria_fotos').insert(fotos_antes.map(url => ({ vistoria_id: vistoria.id, url, tipo: 'antes', timestamp: new Date().toISOString() })))
  }
  if (fotos_depois?.length > 0) {
    await db.from('vistoria_fotos').insert(fotos_depois.map(url => ({ vistoria_id: vistoria.id, url, tipo: 'depois', timestamp: new Date().toISOString() })))
  }

  const buildFotosHtml = (fotos, label) => {
    if (!fotos || fotos.length === 0) return `<p><i>Nenhuma foto de ${label}</i></p>`
    return fotos.map(url => `<img src="${url}" style="width:200px;height:150px;object-fit:cover;margin:4px;border-radius:6px;" />`).join('')
  }

  try {
    await resend.emails.send({
      from: 'Vistoria MAGINF <contato@notificacao.maginf.com.br>',
      to: NOTIFICAR,
      subject: `✅ Vistoria finalizada – ${apartamento} | ${cliente?.nome || slug} | OS ${ordem_servico}`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#2C3E50;padding:24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#fff;margin:0;font-size:20px;">✅ Vistoria Finalizada</h1>
            <p style="color:#e35300;margin:4px 0 0;">${cliente?.nome || slug} – MAGINF Tecnologia</p>
          </div>
          <div style="background:#f9fafb;padding:24px;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px;font-weight:bold;color:#2C3E50;">Unidade</td><td style="padding:8px;">${apartamento}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#2C3E50;">OS</td><td style="padding:8px;">${ordem_servico}</td></tr>
              <tr><td style="padding:8px;font-weight:bold;color:#2C3E50;">Técnico</td><td style="padding:8px;">${tecnico}</td></tr>
              <tr style="background:#fff;"><td style="padding:8px;font-weight:bold;color:#2C3E50;">Data</td><td style="padding:8px;">${new Date().toLocaleString('pt-BR')}</td></tr>
            </table>
            ${observacoes ? `<div style="margin-top:16px;padding:12px;background:#fff;border-left:4px solid #e35300;border-radius:4px;"><strong>Observações:</strong> ${observacoes}</div>` : ''}
            <h3 style="color:#2C3E50;margin-top:20px;">Fotos – Antes</h3>
            <div>${buildFotosHtml(fotos_antes, 'antes')}</div>
            <h3 style="color:#2C3E50;">Fotos – Depois</h3>
            <div>${buildFotosHtml(fotos_depois, 'depois')}</div>
          </div>
        </div>
      `,
    })
  } catch (e) { console.error('Email erro:', e) }

  return res.status(200).json({ ok: true, id: vistoria.id })
}
