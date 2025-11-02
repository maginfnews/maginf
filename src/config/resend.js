// Configuração do Resend
// Para configurar:
// 1. Acesse https://resend.com/
// 2. Crie uma conta gratuita (3.000 e-mails/mês)
// 3. Verifique seu domínio ou use o domínio de teste
// 4. Gere uma API Key
// 5. Configure as variáveis de ambiente

export const resendConfig = {
  // API Key do Resend
  apiKey: 're_Jjy3jUvG_HHepHm9JCFgawhG8yvxADogC',
  
  // Domínio para envio (usando domínio de teste do Resend)
  fromEmail: 'onboarding@resend.dev', // Domínio verificado do Resend
  
  // E-mail de destino
  toEmail: 'sac@maginf.com.br',
  
  // Templates de e-mail
  templates: {
    contact: {
      subject: (name) => `Nova mensagem do site MAGINF - ${name}`,
      from: (domain) => `contato@${domain}`,
    },
    quote: {
      subject: (service) => `Solicitação de orçamento - ${service}`,
      from: (domain) => `orcamento@${domain}`,
    }
  }
};

// Função utilitária para envio de e-mail
export const sendEmail = async (emailData) => {
  const { from_name, from_email, company, message } = emailData;
  
  try {
    // Enviar diretamente via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendConfig.fromEmail,
        to: [resendConfig.toEmail],
        subject: `Nova mensagem do site MAGINF - ${from_name}`,
        html: createEmailTemplate(emailData),
        text: `
Nova mensagem recebida através do site da MAGINF Tecnologia

Nome: ${from_name}
E-mail: ${from_email}
Empresa: ${company || 'Não informado'}

Mensagem:
${message}

---
Enviado automaticamente pelo formulário de contato do site.
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Resend API error: ${errorData.message || response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ E-mail enviado com sucesso:', result);
    return result;
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
    throw error;
  }
};

// Template HTML para e-mails
export const createEmailTemplate = (data) => {
  const { from_name, from_email, company, message, type = 'contact' } = data;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #e35300; color: white; padding: 20px; text-align: center;">
        <h1>MAGINF Tecnologia</h1>
        <h2>${type === 'contact' ? 'Nova Mensagem do Site' : 'Solicitação de Orçamento'}</h2>
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
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${company || 'Não informado'}</td>
          </tr>
        </table>
        
        <h3 style="color: #2C3E50; margin-top: 20px;">Mensagem:</h3>
        <div style="background: white; padding: 15px; border-left: 4px solid #e35300; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div style="background: #2C3E50; color: white; padding: 15px; text-align: center; font-size: 12px;">
        <p>Enviado automaticamente pelo site MAGINF Tecnologia</p>
        <p>© 2025 MAGINF Tecnologia - Todos os direitos reservados</p>
      </div>
    </div>
  `;
};
