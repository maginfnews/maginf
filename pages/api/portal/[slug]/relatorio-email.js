import { supabaseAdmin } from '../../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFICAR = ['maicon@magpass.com.br', 'matheussleduc@gmail.com']

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { slug } = req.query
  const { destinatarios } = req.body || {}
  const db = supabaseAdmin()

  const { data: cliente } = await db.from('clientes').select('*').eq('slug', slug).single()
  const { data: vistorias } = await db.from('vistorias').select('*, vistoria_fotos(id)').eq('cliente_slug', slug).order('apartamento')

  const total = vistorias?.length || 0
  const aprovados = vistorias?.filter(v => v.aprovado_status === 'aprovado').length || 0
  const reprovados = vistorias?.filter(v => v.aprovado_status === 'reprovado').length || 0
  const pendentes = vistorias?.filter(v => !v.aprovado_status || v.aprovado_status === 'pendente').length || 0
  const progresso = total > 0 ? Math.round((aprovados / total) * 100) : 0

  const statusLabel = (s) => {
    if (s === 'aprovado') return '<span style="background:#dcfce7;color:#16a34a;font-weight:700;padding:3px 10px;border-radius:999px;font-size:12px;">✅ Aprovado</span>'
    if (s === 'reprovado') return '<span style="background:#fee2e2;color:#dc2626;font-weight:700;padding:3px 10px;border-radius:999px;font-size:12px;">❌ Reprovado</span>'
    return '<span style="background:#fef9c3;color:#d97706;font-weight:700;padding:3px 10px;border-radius:999px;font-size:12px;">⏳ Pendente</span>'
  }

  const linhasTabela = (vistorias || []).map((v, i) => `
    <tr style="border-bottom:1px solid #f3f4f6;background:${i % 2 === 0 ? '#fff' : '#fafafa'};">
      <td style="padding:12px 14px;font-weight:700;color:#1f2937;">${v.apartamento}</td>
      <td style="padding:12px 14px;color:#6b7280;font-size:13px;">${v.ordem_servico}</td>
      <td style="padding:12px 14px;color:#6b7280;font-size:13px;">${v.tecnico}</td>
      <td style="padding:12px 14px;color:#6b7280;font-size:13px;">${v.data_finalizacao ? new Date(v.data_finalizacao).toLocaleDateString('pt-BR') : '—'}</td>
      <td style="padding:12px 14px;">${statusLabel(v.aprovado_status)}</td>
    </tr>
  `).join('')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://maginf.com.br'

  const htmlEmail = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:680px;margin:0 auto;background:#f3f4f6;">
      <div style="background:#2C3E50;padding:36px 32px;text-align:center;border-radius:12px 12px 0 0;">
        <p style="color:#e35300;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 10px;">MAGINF Tecnologia</p>
        <h1 style="color:#fff;margin:0 0 8px;font-size:22px;font-weight:700;">Relatório de Serviços</h1>
        <p style="color:#9ca3af;margin:0;font-size:13px;">${cliente?.nome || slug} · Gerado em ${new Date().toLocaleString('pt-BR')}</p>
      </div>
      <div style="background:#fff;padding:24px;display:flex;gap:10px;flex-wrap:wrap;border-bottom:1px solid #e5e7eb;">
        <div style="flex:1;min-width:110px;text-align:center;padding:16px 8px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
          <p style="font-size:34px;font-weight:800;color:#2C3E50;margin:0;line-height:1;">${total}</p>
          <p style="font-size:11px;color:#94a3b8;margin:6px 0 0;text-transform:uppercase;letter-spacing:1px;">Total</p>
        </div>
        <div style="flex:1;min-width:110px;text-align:center;padding:16px 8px;border-radius:12px;background:#f0fdf4;border:1px solid #bbf7d0;">
          <p style="font-size:34px;font-weight:800;color:#16a34a;margin:0;line-height:1;">${aprovados}</p>
          <p style="font-size:11px;color:#16a34a;margin:6px 0 0;text-transform:uppercase;letter-spacing:1px;">Aprovados</p>
        </div>
        <div style="flex:1;min-width:110px;text-align:center;padding:16px 8px;border-radius:12px;background:#fffbeb;border:1px solid #fde68a;">
          <p style="font-size:34px;font-weight:800;color:#d97706;margin:0;line-height:1;">${pendentes}</p>
          <p style="font-size:11px;color:#d97706;margin:6px 0 0;text-transform:uppercase;letter-spacing:1px;">Pendentes</p>
        </div>
        <div style="flex:1;min-width:110px;text-align:center;padding:16px 8px;border-radius:12px;background:#fef2f2;border:1px solid #fecaca;">
          <p style="font-size:34px;font-weight:800;color:#dc2626;margin:0;line-height:1;">${reprovados}</p>
          <p style="font-size:11px;color:#dc2626;margin:6px 0 0;text-transform:uppercase;letter-spacing:1px;">Reprovados</p>
        </div>
      </div>
      <div style="background:#fff;padding:20px 24px;border-bottom:1px solid #e5e7eb;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span style="font-size:13px;font-weight:600;color:#2C3E50;">Progresso de aprovação</span>
          <span style="font-size:15px;font-weight:800;color:#e35300;">${progresso}%</span>
        </div>
        <div style="background:#f1f5f9;border-radius:999px;height:10px;overflow:hidden;">
          <div style="background:linear-gradient(90deg,#e35300,#ff6b1a);height:10px;width:${progresso}%;border-radius:999px;"></div>
        </div>
      </div>
      <div style="background:#fff;padding:24px;">
        <div style="border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#1e293b;">
                <th style="padding:12px 14px;text-align:left;color:#fff;font-size:12px;">Unidade</th>
                <th style="padding:12px 14px;text-align:left;color:#94a3b8;font-size:12px;">OS</th>
                <th style="padding:12px 14px;text-align:left;color:#94a3b8;font-size:12px;">Técnico</th>
                <th style="padding:12px 14px;text-align:left;color:#94a3b8;font-size:12px;">Data</th>
                <th style="padding:12px 14px;text-align:left;color:#fff;font-size:12px;">Status</th>
              </tr>
            </thead>
            <tbody>${linhasTabela}</tbody>
          </table>
        </div>
      </div>
      <div style="background:#fff;padding:0 24px 28px;text-align:center;">
        <a href="${baseUrl}/portal/${slug}" style="display:inline-block;background:#e35300;color:#fff;font-weight:700;font-size:14px;padding:14px 36px;border-radius:10px;text-decoration:none;">Acessar Portal →</a>
      </div>
      <div style="background:#1e293b;padding:18px 24px;text-align:center;border-radius:0 0 12px 12px;">
        <p style="color:#64748b;font-size:12px;margin:0;">MAGINF Tecnologia · sac@maginf.com.br · (11) 4610-6363 · Guarulhos, SP</p>
      </div>
    </div>
  `

  const parasInput = destinatarios ? destinatarios.split(',').map(e => e.trim()).filter(Boolean) : []
  const toSet = new Set([...parasInput, ...NOTIFICAR].map(e => e.toLowerCase()))
  const toList = Array.from(toSet)

  await resend.emails.send({
    from: 'Portal MAGINF <contato@notificacao.maginf.com.br>',
    to: toList,
    subject: `📊 Relatório ${cliente?.nome || slug} – ${aprovados}/${total} aprovados`,
    html: htmlEmail,
  })

  return res.status(200).json({ ok: true, enviado_para: toList })
}
