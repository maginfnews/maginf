import { supabaseAdmin } from '../../../lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  const db = supabaseAdmin()

  if (req.method === 'GET') {
    const { data, error } = await db
      .from('clientes')
      .select('*, vistorias(id, aprovado_status, data_finalizacao)')
      .order('criado_em', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ clientes: data })
  }

  if (req.method === 'POST') {
    const {
      tipo, nome, razao_social, nome_fantasia, cpf, cnpj, ie, slug,
      email_contato, telefone, celular, site,
      cep, logradouro, numero, complemento, bairro, cidade, estado,
      responsavel_nome, responsavel_cargo, responsavel_email, responsavel_telefone,
      logo_url, senha_cliente, senha_tecnico, observacoes,
    } = req.body

    if (!nome || !slug || !email_contato || !senha_cliente || !senha_tecnico) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, slug, email, senhas' })
    }

    const slugLimpo = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    const { data: existe } = await db.from('clientes').select('id').eq('slug', slugLimpo).maybeSingle()
    if (existe) return res.status(400).json({ error: 'Este slug já está em uso' })

    const { data: cliente, error } = await db.from('clientes').insert({
      tipo: tipo || 'PJ', nome, razao_social, nome_fantasia, cpf, cnpj, ie, slug: slugLimpo,
      email_contato, telefone, celular, site,
      cep, logradouro, numero, complemento, bairro, cidade, estado,
      responsavel_nome, responsavel_cargo, responsavel_email, responsavel_telefone,
      logo_url: logo_url || null, senha_cliente, senha_tecnico, observacoes, ativo: true,
    }).select().single()

    if (error) return res.status(500).json({ error: error.message })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://maginf.com.br'
    try {
      await resend.emails.send({
        from: 'MAGINF Tecnologia <contato@notificacao.maginf.com.br>',
        to: [email_contato, 'maicon@magpass.com.br', 'matheussleduc@gmail.com'],
        subject: `🎉 Seu portal MAGINF está pronto – ${nome}`,
        html: `
          <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f3f4f6;">
            <div style="background:#2C3E50;padding:36px 32px;text-align:center;border-radius:12px 12px 0 0;">
              <p style="color:#e35300;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 10px;">MAGINF Tecnologia</p>
              <h1 style="color:#fff;margin:0 0 8px;font-size:22px;font-weight:700;">Seu portal está pronto!</h1>
              <p style="color:#9ca3af;margin:0;font-size:13px;">Acesso exclusivo para ${nome}</p>
            </div>
            <div style="background:#fff;padding:32px;">
              <p style="color:#374151;font-size:15px;margin:0 0 24px;">Olá! Seu portal de acompanhamento de serviços está configurado e pronto para uso.</p>
              <div style="background:#f8fafc;border-radius:12px;padding:24px;margin-bottom:24px;border:1px solid #e2e8f0;">
                <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;">Seus dados de acesso</p>
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;font-size:13px;color:#64748b;font-weight:600;width:150px;">Link do portal</td>
                    <td style="padding:10px 0;font-size:13px;"><a href="${baseUrl}/portal/${slugLimpo}" style="color:#e35300;font-weight:700;">${baseUrl}/portal/${slugLimpo}</a></td>
                  </tr>
                  <tr style="border-top:1px solid #e2e8f0;">
                    <td style="padding:10px 0;font-size:13px;color:#64748b;font-weight:600;">Senha</td>
                    <td style="padding:10px 0;font-size:16px;font-weight:800;color:#1e293b;letter-spacing:2px;">${senha_cliente}</td>
                  </tr>
                </table>
              </div>
              <p style="color:#6b7280;font-size:13px;margin:0 0 24px;">Pelo portal você acompanha serviços realizados, visualiza fotos antes e depois, aprova ou reprova apartamentos e gera relatórios.</p>
              <div style="text-align:center;">
                <a href="${baseUrl}/portal/${slugLimpo}" style="display:inline-block;background:#e35300;color:#fff;font-weight:700;font-size:14px;padding:14px 36px;border-radius:10px;text-decoration:none;">Acessar meu portal →</a>
              </div>
            </div>
            <div style="background:#1e293b;padding:18px 24px;text-align:center;border-radius:0 0 12px 12px;">
              <p style="color:#64748b;font-size:12px;margin:0;">MAGINF Tecnologia · sac@maginf.com.br · (11) 4610-6363 · Guarulhos, SP</p>
            </div>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Email erro:', emailErr)
    }

    return res.status(200).json({ ok: true, cliente })
  }

  if (req.method === 'PUT') {
    const { id, ...campos } = req.body
    if (!id) return res.status(400).json({ error: 'id obrigatório' })
    delete campos.slug
    const { data, error } = await db.from('clientes').update({ ...campos, atualizado_em: new Date().toISOString() }).eq('id', id).select().single()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true, cliente: data })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
