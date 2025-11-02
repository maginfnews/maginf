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
      console.log('🚀 Enviando via Resend API...');
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erro HTTP: ${res.status}`);
      }

      const result = await res.json();
      console.log("✅ E-mail enviado com sucesso via Resend!", result);
      setIsSuccess(true);
      return result;
    } catch (err) {
      console.error("❌ Erro no envio via Resend:", err);
      setError(err.message || "Erro ao enviar mensagem. Tente novamente.");
      throw err;
    } finally {
      setIsLoading(false);
    }
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
      console.log('🔄 Enviando via Resend API...');
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Não informado',
        message: formData.message
      };
      const result = await send(payload);
      console.log('🎉 E-mail enviado com sucesso via Resend!', result);
      // Limpar formulário após sucesso
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('❌ Falha no envio via Resend:', err);
      // Erro já está sendo tratado no hook send()
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
