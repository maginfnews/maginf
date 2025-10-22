// Configuração do FormSubmit - Solução sem CORS
// FormSubmit é um serviço gratuito que processa formulários HTML
// Não requer backend próprio e funciona diretamente do frontend

export const formSubmitConfig = {
  // URL do FormSubmit (substitua pelo seu email)
  endpoint: 'https://formsubmit.co/sac@maginf.com.br',
  
  // Configurações do FormSubmit
  settings: {
    // Assunto do email
    _subject: 'Nova mensagem do site MAGINF Tecnologia',
    
    // Desabilitar captcha
    _captcha: 'false',
    
    // Template do FormSubmit
    _template: 'table',
    
    // Não redirecionar (para AJAX)
    _next: 'false'
  }
};

// Função para enviar email via FormSubmit
export const sendEmailFormSubmit = async (emailData) => {
  const { from_name, from_email, company, message } = emailData;
  
  try {
    const formData = new FormData();
    
    // Dados do formulário
    formData.append('name', from_name);
    formData.append('email', from_email);
    formData.append('company', company || 'Não informado');
    formData.append('message', message);
    
    // Configurações do FormSubmit
    Object.entries(formSubmitConfig.settings).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    const response = await fetch(formSubmitConfig.endpoint, {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log('✅ E-mail enviado com sucesso via FormSubmit');
      return { success: true, message: 'E-mail enviado com sucesso!' };
    } else {
      throw new Error('Erro no envio do formulário');
    }
    
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail via FormSubmit:', error);
    throw error;
  }
};

// Função alternativa usando mailto (fallback)
export const sendEmailMailto = (emailData) => {
  const { from_name, from_email, company, message } = emailData;
  
  const subject = encodeURIComponent(`Nova mensagem do site MAGINF - ${from_name}`);
  const body = encodeURIComponent(`
Nome: ${from_name}
E-mail: ${from_email}
Empresa: ${company || 'Não informado'}

Mensagem:
${message}

---
Enviado através do formulário de contato do site MAGINF Tecnologia
  `);
  
  const mailtoLink = `mailto:sac@maginf.com.br?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
  
  return { success: true, message: 'Cliente de email aberto!' };
};
