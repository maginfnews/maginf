// API Route para envio de e-mails com Resend
// Este arquivo simula uma API route - em produção, deve estar no backend

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { from_name, from_email, company, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'contato@maginf.com.br', // Deve ser um domínio verificado no Resend
      to: ['sac@maginf.com.br'],
      subject: `Nova mensagem do site MAGINF - ${from_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #e35300; color: white; padding: 20px; text-align: center;">
            <h1>Nova Mensagem do Site MAGINF</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #2C3E50;">Informações do Contato</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Nome:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${from_name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">E-mail:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${from_email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Empresa:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${company}</td>
              </tr>
            </table>
            
            <h3 style="color: #2C3E50; margin-top: 20px;">Mensagem:</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #e35300; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background: #2C3E50; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>Enviado automaticamente pelo formulário de contato do site MAGINF Tecnologia</p>
            <p>© 2024 MAGINF Tecnologia - Todos os direitos reservados</p>
          </div>
        </div>
      `,
      text: `
Nova mensagem recebida através do site da MAGINF Tecnologia

Nome: ${from_name}
E-mail: ${from_email}
Empresa: ${company}

Mensagem:
${message}

---
Enviado automaticamente pelo formulário de contato do site.
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
