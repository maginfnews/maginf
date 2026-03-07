import { supabaseAdmin } from '../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Diagnóstico de variáveis obrigatórias
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL não configurada')
    return res.status(500).json({ error: 'Configuração incompleta: SUPABASE_URL ausente' })
  }
  if (!process.env.SUPABASE_SERVICE_KEY) {
    console.error('❌ SUPABASE_SERVICE_KEY não configurada')
    return res.status(500).json({ error: 'Configuração incompleta: SUPABASE_SERVICE_KEY ausente' })
  }

  try {
    const { apartamento, ordem_servico, tecnico, observacoes, fotos_antes, fotos_depois } = req.body

    if (!apartamento || !ordem_servico || !tecnico) {
      return res.status(400).json({ error: 'Campos obrigatórios: apartamento, ordem_servico, tecnico' })
    }

    const db = supabaseAdmin()

    // Salvar vistoria principal
    const { data: vistoria, error: vistoriaError } = await db
      .from('vistorias')
      .insert({
        apartamento,
        ordem_servico,
        tecnico,
        observacoes: observacoes || '',
        projeto: 'Marriott Airport',
        status: 'finalizado',
        data_finalizacao: new Date().toISOString(),
      })
      .select()
      .single()

    if (vistoriaError) {
      console.error('Supabase error:', vistoriaError)
      return res.status(500).json({ error: vistoriaError.message })
    }

    // Salvar fotos antes
    if (fotos_antes && fotos_antes.length > 0) {
      const fotosAntesData = fotos_antes.map((url) => ({
        vistoria_id: vistoria.id,
        url,
        tipo: 'antes',
        timestamp: new Date().toISOString(),
      }))
      await db.from('vistoria_fotos').insert(fotosAntesData)
    }

    // Salvar fotos depois
    if (fotos_depois && fotos_depois.length > 0) {
      const fotosDepoisData = fotos_depois.map((url) => ({
        vistoria_id: vistoria.id,
        url,
        tipo: 'depois',
        timestamp: new Date().toISOString(),
      }))
      await db.from('vistoria_fotos').insert(fotosDepoisData)
    }

    // Montar HTML das fotos para o email
    const buildFotosHtml = (fotos, label) => {
      if (!fotos || fotos.length === 0) return `<p><i>Nenhuma foto de ${label}</i></p>`
      return fotos
        .map(
          (url) =>
            `<img src="${url}" style="width:200px;height:150px;object-fit:cover;margin:4px;border-radius:6px;" />`
        )
        .join('')
    }

    // Enviar email de notificação
    await resend.emails.send({
      from: 'Vistoria MAGINF <contato@notificacao.maginf.com.br>',
      to: ['maicon@magpass.com.br', 'matheussleduc@gmail.com'],
      subject: `✅ Vistoria finalizada – Apto ${apartamento} | OS ${ordem_servico}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#2C3E50;padding:24px;border-radius:8px 8px 0 0;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Vistoria Finalizada</h1>
            <p style="color:#e35300;margin:4px 0 0;">Marriott Airport – MAGINF Tecnologia</p>
          </div>
          <div style="background:#f9f9f9;padding:24px;border-radius:0 0 8px 8px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px;font-weight:bold;color:#2C3E50;">Apartamento</td>
                <td style="padding:8px;">${apartamento}</td>
              </tr>
              <tr style="background:#fff;">
                <td style="padding:8px;font-weight:bold;color:#2C3E50;">Ordem de Serviço</td>
                <td style="padding:8px;">${ordem_servico}</td>
              </tr>
              <tr>
                <td style="padding:8px;font-weight:bold;color:#2C3E50;">Técnico</td>
                <td style="padding:8px;">${tecnico}</td>
              </tr>
              <tr style="background:#fff;">
                <td style="padding:8px;font-weight:bold;color:#2C3E50;">Data/Hora</td>
                <td style="padding:8px;">${new Date().toLocaleString('pt-BR')}</td>
              </tr>
            </table>

            <h3 style="color:#2C3E50;margin-top:24px;">Observações</h3>
            <p style="background:#fff;padding:12px;border-radius:6px;border-left:4px solid #e35300;">
              ${observacoes || 'Nenhuma observação registrada.'}
            </p>

            <h3 style="color:#2C3E50;">Fotos – Antes</h3>
            <div>${buildFotosHtml(fotos_antes, 'antes')}</div>

            <h3 style="color:#2C3E50;">Fotos – Depois</h3>
            <div>${buildFotosHtml(fotos_depois, 'depois')}</div>
          </div>
        </div>
      `,
    })

    return res.status(200).json({ ok: true, id: vistoria.id })
  } catch (error) {
    console.error('Salvar vistoria error:', error)
    return res.status(500).json({ error: error.message })
  }
}
