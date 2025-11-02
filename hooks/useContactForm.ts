import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
  id?: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Iniciando envio do formulário...');
    console.log('📋 Dados capturados:', formData);
    
    // Validar campos obrigatórios
    if (!formData.name || !formData.email || !formData.message) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      console.error('❌ Campos obrigatórios não preenchidos');
      return;
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido.');
      console.error('❌ Formato de email inválido');
      return;
    }

    setIsLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      console.log('🔄 Enviando para API route do Next.js...');
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'Não informado',
          message: formData.message,
        }),
      });

      console.log('📊 Status da resposta:', response.status);

      const result: ApiResponse = await response.json();
      console.log('📧 Resposta da API:', result);

      if (!response.ok) {
        throw new Error(result.error || `Erro HTTP: ${response.status}`);
      }

      if (result.success) {
        console.log('✅ Email enviado com sucesso!');
        console.log('🆔 ID do email:', result.id);
        
        setIsSuccess(true);
        // Limpar formulário após sucesso
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        throw new Error(result.error || 'Erro desconhecido');
      }

    } catch (err) {
      console.error('❌ Erro no envio do formulário:', err);
      
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar mensagem';
      setError(errorMessage);
      
      console.error('🔍 Detalhes do erro:', {
        message: errorMessage,
        formData: formData
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError('');
    setFormData({ name: '', email: '', company: '', message: '' });
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
