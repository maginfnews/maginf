import { useState } from 'react';

// Hook personalizado para envio de e-mails com Resend
export const useResend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const send = async (payload) => {
    setIsLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Falha ao enviar via backend");
      console.log("✅ E-mail enviado via Resend (backend)");
      setIsSuccess(true);
      return await res.json();
    } catch (err) {
      console.warn("⚠️ Falha no Resend, usando fallback FormSubmit");
      try {
        await sendViaFormSubmit(payload);
        console.log("✅ E-mail enviado via FormSubmit (fallback)");
        setIsSuccess(true);
      } catch (fallbackErr) {
        console.error("❌ Falha total no envio:", fallbackErr);
        setError("Erro ao enviar mensagem. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const sendViaFormSubmit = async (payload) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([k, v]) => formData.append(k, v));
    await fetch("https://formsubmit.co/maicon@magpass.com.br", {
      method: "POST",
      body: formData,
    });
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError('');
  };

  return {
    send,
    reset,
    isLoading,
    isSuccess,
    error
  };
};

// Hook específico para formulário de contato
export const useContactForm = () => {
  const { send, isLoading, isSuccess, error, reset } = useResend();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Iniciando envio do formulário...');
    console.log('📋 Dados capturados:', formData);
    
    // Validar campos obrigatórios
    if (!formData.name || !formData.email || !formData.message) {
      console.error('❌ Campos obrigatórios não preenchidos');
      return;
    }

    try {
      console.log('🔄 Tentando enviar via API interna...');
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Não informado',
        message: formData.message
      };
      const result = await send(payload);
      console.log('🎉 Formulário processado com sucesso!', result);
      // Limpar formulário após sucesso
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('❌ Erro no envio do formulário:', err);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    reset
  };
};
