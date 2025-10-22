import { useState } from 'react';
import { sendEmail } from '../config/resend';
import { sendEmailFormSubmit, sendEmailMailto } from '../config/formSubmit';

// Hook personalizado para envio de e-mails com Resend
export const useResend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const send = async (emailData, method = 'formsubmit') => {
    setIsLoading(true);
    setError('');
    setIsSuccess(false);

    try {
      let result;
      
      switch (method) {
        case 'formsubmit':
          result = await sendEmailFormSubmit(emailData);
          break;
        case 'mailto':
          result = sendEmailMailto(emailData);
          break;
        case 'resend':
        default:
          // Tentar Resend primeiro, se falhar usar FormSubmit
          try {
            result = await sendEmail(emailData);
          } catch (corsError) {
            console.warn('⚠️ Erro CORS com Resend, usando FormSubmit como fallback');
            result = await sendEmailFormSubmit(emailData);
          }
          break;
      }
      
      setIsSuccess(true);
      return result;
    } catch (err) {
      setError(err.message || 'Erro ao enviar e-mail');
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
    
    const emailData = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Não informado',
      message: formData.message,
      type: 'contact'
    };

    try {
      await send(emailData, 'formsubmit'); // Usar FormSubmit que funciona sem CORS
      // Limpar formulário após sucesso
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      // Erro já tratado no hook useResend
      console.error('Erro no envio:', err);
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
