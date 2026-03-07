import { Resend } from 'resend'
import { supabaseAdmin } from '../../../lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const db = supabaseAdmin()

    // Buscar todas as vistorias com fotos
    const { data: vistorias, error } = await db
      .from('vistorias')
      .select('*, vistoria_fotos(*)')
      .order('apartamento', { ascending: true })

    if (error) throw error

    const total = vistorias.length
    const aprovados = vistorias.filter(v => v.aprovado_status === 'aprovado').length
    const reprovados = vistorias.filter(v => v.aprovado_status === 'reprovado').length
    const pendentes = vistorias.filter(v => !v.aprovado_status || v.aprovado_status === 'pendente').length
    const progresso = total > 0 ? Math.round((aprovados / total) * 100) : 0

    const statusLabel = (s) => {
      if (s === 'aprovado') return '<span style="color:#16a34a;font-weight:bold;">✅ Aprovado</span>'
      if (s === 'reprovado') return '<span style="color:#dc2626;font-weight:bold;">❌ Reprovado</span>'
      return '<span style="color:#d97706;font-weight:bold;">⏳ Pendente</span>'
    }

    const linhasTabela = vistorias.map(v => `
      <tr style="border-bottom:1px solid #e5e7eb;">
        <td style="padding:10px 12px;font-weight:bold;">Apto ${v.apartamento}</td>
        <td style="padding:10px 12px;color:#6b7280;">${v.ordem_servico}</td>
        <td style="padding:10px 12px;color:#6b7280;">${v.tecnico}</td>
        <td style="padding:10px 12px;">${new Date(v.data_finalizacao).toLocaleDateString('pt-BR')}</td>
        <td style="padding:10px 12px;">${statusLabel(v.aprovado_status)}</td>
      </tr>
    `).join('')

    await resend.emails.send({
      from: 'Portal MAGINF <contato@notificacao.maginf.com.br>',
      to: ['maicon@magpass.com.br'],
      subject: `📊 Relatório de Serviços – Marriott Airport (${aprovados}/${total} aprovados)`,
      html: `
        <div style="font-family:sans-serif;max-width:700px;margin:0 auto;color:#1f2937;">
          <!-- Header -->
          <div style="background:#2C3E50;padding:32px;border-radius:12px 12px 0 0;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:22px;">Relatório de Serviços de Rede</h1>
            <p style="color:#e35300;margin:6px 0 0;font-size:14px;">Marriott Airport – MAGINF Tecnologia</p>
            <p style="color:#9ca3af;margin:4px 0 0;font-size:12px;">Gerado em ${new Date().toLocaleString('pt-BR')}</p>
          </div>

          <!-- Stats -->
          <div style="background:#f9fafb;padding:24px;display:flex;gap:12px;flex-wrap:wrap;">
            <div style="flex:1;min-width:120px;background:#fff;border-radius:10px;padding:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <p style="font-size:28px;font-weight:bold;color:#2C3E50;margin:0;">${total}</p>
              <p style="font-size:12px;color:#6b7280;margin:4px 0 0;">Total</p>
            </div>
            <div style="flex:1;min-width:120px;background:#fff;border-radius:10px;padding:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <p style="font-size:28px;font-weight:bold;color:#16a34a;margin:0;">${aprovados}</p>
              <p style="font-size:12px;color:#6b7280;margin:4px 0 0;">Aprovados</p>
            </div>
            <div style="flex:1;min-width:120px;background:#fff;border-radius:10px;padding:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <p style="font-size:28px;font-weight:bold;color:#d97706;margin:0;">${pendentes}</p>
              <p style="font-size:12px;color:#6b7280;margin:4px 0 0;">Pendentes</p>
            </div>
            <div style="flex:1;min-width:120px;background:#fff;border-radius:10px;padding:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <p style="font-size:28px;font-weight:bold;color:#dc2626;margin:0;">${reprovados}</p>
              <p style="font-size:12px;color:#6b7280;margin:4px 0 0;">Reprovados</p>
            </div>
          </div>

          <!-- Progresso -->
          <div style="background:#f9fafb;padding:0 24px 24px;">
            <div style="background:#fff;border-radius:10px;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <span style="font-size:13px;font-weight:600;color:#2C3E50;">Progresso de aprovação</span>
                <span style="font-size:13px;font-weight:bold;color:#e35300;">${progresso}%</span>
              </div>
              <div style="background:#f3f4f6;border-radius:999px;height:10px;">
                <div style="background:#e35300;border-radius:999px;height:10px;width:${progresso}%;"></div>
              </div>
            </div>
          </div>

          <!-- Tabela -->
          <div style="background:#f9fafb;padding:0 24px 24px;">
            <div style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
              <table style="width:100%;border-collapse:collapse;">
                <thead>
                  <tr style="background:#2C3E50;">
                    <th style="padding:12px;text-align:left;color:#fff;font-size:12px;">Apartamento</th>
                    <th style="padding:12px;text-align:left;color:#fff;font-size:12px;">OS</th>
                    <th style="padding:12px;text-align:left;color:#fff;font-size:12px;">Técnico</th>
                    <th style="padding:12px;text-align:left;color:#fff;font-size:12px;">Data</th>
                    <th style="padding:12px;text-align:left;color:#fff;font-size:12px;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${linhasTabela}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#2C3E50;padding:20px;border-radius:0 0 12px 12px;text-align:center;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">
              MAGINF Tecnologia · sac@maginf.com.br · (11) 4610-6363 · Guarulhos, SP
            </p>
            <a href="https://maginf.com.br/cliente" style="color:#e35300;font-size:12px;display:block;margin-top:4px;">
              Acessar Portal do Cliente
            </a>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Relatorio email error:', error)
    return res.status(500).json({ error: error.message })
  }
}
