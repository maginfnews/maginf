import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('🔥 API /api/contact chamada!', req.method)
  
  if (req.method !== 'POST') {
    console.log('❌ Método não permitido:', req.method)
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    console.log('📋 Dados recebidos:', req.body)
    const { name, email, company, message } = req.body

    // Verificar se API key existe
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY não encontrada!')
      return res.status(500).json({ ok: false, error: 'API key não configurada' })
    }

    console.log('🔑 API Key encontrada:', process.env.RESEND_API_KEY?.substring(0, 10) + '...')
    console.log('📧 Tentando enviar email via Resend...')

    const data = await resend.emails.send({
      from: "Site MAGINF <contato@notificacao.maginf.com.br>",
      to: ["maicon@magpass.com.br"],
      subject: `Novo contato do site – ${name}`,
      reply_to: email,
      html: `
        <h1>Novo contato do site</h1>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Empresa:</b> ${company}</p>
        <p><b>Mensagem:</b><br/>${message}</p>
      `,
    })

    console.log('✅ Email enviado com sucesso!', data)
    return res.status(200).json({ ok: true, data })
  } catch (error: any) {
    console.error("❌ Erro detalhado ao enviar email:", error)
    console.error("❌ Stack trace:", error.stack)
    return res.status(500).json({ ok: false, error: error.message })
  }
}
