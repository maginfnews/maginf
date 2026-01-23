import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 **Olá! Bem-vindo à MAGINF Tecnologia!**\n\nSou seu assistente virtual com inteligência artificial. Estou aqui para ajudar você com:\n\n✅ Informações sobre serviços MSP\n✅ Planos e orçamentos\n✅ Suporte técnico 24/7\n✅ Soluções Cloud, CFTV e mais!\n\n💬 Como posso ajudar você hoje?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    { text: '💼 Serviços MSP', category: 'services' },
    { text: '💰 Planos e Preços', category: 'pricing' },
    { text: '📞 Falar com Consultor', category: 'contact' },
    { text: '☁️ Cloud Computing', category: 'cloud' },
    { text: '🔒 Segurança', category: 'security' },
    { text: '📊 Monitoramento 24/7', category: 'monitoring' },
  ];

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    
    // Adicionar mensagem do usuário
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Tentar usar ChatGPT API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.slice(-6) // Últimas 3 trocas
        }),
      });

      const data = await response.json();
      
      // Adicionar resposta do bot
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: data.reply,
        source: data.source 
      }]);

    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback para resposta local
      const fallbackResponse = getFallbackResponse(userMessage);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: fallbackResponse,
        source: 'fallback'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (text) => {
    const lowerText = text.toLowerCase();

    // Preços e Planos
    if (lowerText.includes('preço') || lowerText.includes('custo') || lowerText.includes('valor') || lowerText.includes('plano')) {
      return '💰 **Planos Personalizados MAGINF**\n\n' +
             '✅ Básico: Suporte técnico + backup\n' +
             '✅ Profissional: + Monitoramento 24/7\n' +
             '✅ Enterprise: + Cloud + CFTV + Infraestrutura\n\n' +
             '📞 Solicite orçamento: sac@maginf.com.br ou (11) 3514-2933\n' +
             '💬 Todos os planos incluem SLA garantido!';
    }

    // Suporte
    if (lowerText.includes('suporte') || lowerText.includes('atendimento') || lowerText.includes('ajuda')) {
      return '🛟 **Suporte MAGINF - 24/7**\n\n' +
             '✅ Atendimento remoto imediato\n' +
             '✅ Suporte presencial quando necessário\n' +
             '✅ SLA garantido por contrato\n' +
             '✅ Equipe especializada certificada\n\n' +
             '📞 Emergência: (11) 3514-2933\n' +
             '📧 E-mail: sac@maginf.com.br';
    }

    // Cloud
    if (lowerText.includes('cloud') || lowerText.includes('nuvem') || lowerText.includes('aws') || lowerText.includes('azure')) {
      return '☁️ **Soluções Cloud MAGINF**\n\n' +
             '✅ AWS, Azure e Microsoft 365\n' +
             '✅ Migração completa e segura\n' +
             '✅ Backup automático em nuvem\n' +
             '✅ Gestão e otimização de custos\n\n' +
             '💡 Reduza custos e aumente a segurança!\n' +
             '📞 Consulte-nos: (11) 3514-2933';
    }

    // CFTV e Segurança
    if (lowerText.includes('cftv') || lowerText.includes('câmera') || lowerText.includes('segurança') || lowerText.includes('vigilância')) {
      return '📹 **CFTV + Segurança Digital**\n\n' +
             '✅ Câmeras IP com IA e analytics\n' +
             '✅ Acesso remoto via app\n' +
             '✅ Gravação em nuvem\n' +
             '✅ Integração com NOC 24/7\n' +
             '✅ Firewall e proteção contra ataques\n\n' +
             '🔒 Proteja seu negócio agora!\n' +
             '📞 Orçamento: (11) 3514-2933';
    }

    // Monitoramento
    if (lowerText.includes('monitoramento') || lowerText.includes('noc') || lowerText.includes('24/7')) {
      return '📊 **Monitoramento NOC 24/7**\n\n' +
             '✅ Monitoramento proativo de servidores\n' +
             '✅ Alertas em tempo real\n' +
             '✅ Dashboard personalizado\n' +
             '✅ Prevenção de problemas\n' +
             '✅ Relatórios mensais detalhados\n\n' +
             '💡 Evite paradas e perdas!\n' +
             '📞 Saiba mais: (11) 3514-2933';
    }

    // MSP
    if (lowerText.includes('msp') || lowerText.includes('gerenciado') || lowerText.includes('outsourcing')) {
      return '💼 **MSP - Managed Service Provider**\n\n' +
             '✅ Terceirização completa de TI\n' +
             '✅ Suporte + Infraestrutura + Cloud\n' +
             '✅ Custos previsíveis mensais\n' +
             '✅ Equipe especializada dedicada\n' +
             '✅ +8 anos de experiência\n\n' +
             '🚀 Foque no seu negócio, TI com a gente!\n' +
             '📞 Consulte: (11) 3514-2933';
    }

    // Backup
    if (lowerText.includes('backup') || lowerText.includes('recuperação') || lowerText.includes('dados')) {
      return '💾 **Backup em Nuvem MAGINF**\n\n' +
             '✅ Backup automático diário\n' +
             '✅ Armazenamento seguro em cloud\n' +
             '✅ Recuperação rápida de dados\n' +
             '✅ Proteção contra ransomware\n' +
             '✅ Conformidade com LGPD\n\n' +
             '🔐 Seus dados sempre protegidos!\n' +
             '📞 Saiba mais: (11) 3514-2933';
    }

    // Wi-Fi
    if (lowerText.includes('wifi') || lowerText.includes('wi-fi') || lowerText.includes('rede') || lowerText.includes('internet')) {
      return '📡 **Redes Wi-Fi Empresariais**\n\n' +
             '✅ Wi-Fi corporativo de alta performance\n' +
             '✅ Cobertura total e estável\n' +
             '✅ Segurança avançada\n' +
             '✅ Gestão centralizada\n' +
             '✅ Suporte técnico incluso\n\n' +
             '💡 Internet rápida e segura!\n' +
             '📞 Orçamento: (11) 3514-2933';
    }

    // Contato
    if (lowerText.includes('contato') || lowerText.includes('falar') || lowerText.includes('telefone') || lowerText.includes('email')) {
      return '📞 **Entre em Contato com a MAGINF**\n\n' +
             '🏢 Endereço: Av. Dr. Penteado, 1673 - Parque Indep., SJBV/SP\n' +
             '📱 Telefone: (11) 3514-2933\n' +
             '📧 E-mail: sac@maginf.com.br\n' +
             '🌐 Site: www.maginf.com.br\n\n' +
             '⏰ Atendimento: 24 horas, 7 dias por semana!\n' +
             '💬 Estamos prontos para ajudar!';
    }

    // Resposta padrão melhorada
    return '🤖 **Assistente MAGINF com IA**\n\n' +
           'Posso ajudar você com:\n\n' +
           '✅ Serviços MSP e Outsourcing de TI\n' +
           '✅ Planos e valores\n' +
           '✅ Suporte técnico 24/7\n' +
           '✅ Cloud Computing (AWS/Azure)\n' +
           '✅ CFTV e Segurança\n' +
           '✅ Monitoramento NOC\n\n' +
           '💬 Digite sua dúvida ou escolha uma opção acima!\n' +
           '📞 Contato direto: (11) 3514-2933';
  };

  const handleQuickReply = (reply) => {
    handleSend(reply.text);
  };

  // Scroll automático sempre que novas mensagens forem adicionadas
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:right-24 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group animate-pulse hover:animate-none"
            aria-label="Abrir chat com IA"
          >
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-50 animate-ping" style={{animationDelay: '0.5s'}}></div>
            
            {/* Icon */}
            <div className="relative">
              <MessageCircle className="h-6 w-6" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-bounce" />
            </div>
            
            {/* Badge */}
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center shadow-lg animate-bounce">
              IA
            </span>
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block animate-fadeIn">
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
              💬 Converse com nossa IA!
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:right-24 z-40 w-full sm:w-96 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col h-[calc(100vh-8rem)] sm:h-auto sm:max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                <MessageCircle className="h-6 w-6" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-bold flex items-center gap-2">
                  Assistente MAGINF
                  <span className="text-xs bg-yellow-400 text-blue-900 px-2 py-0.5 rounded-full font-semibold">IA</span>
                </h3>
                <p className="text-xs text-blue-100">
                  {isLoading ? 'Digitando...' : 'Online agora'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  {msg.source === 'chatgpt' && (
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Powered by AI
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none shadow p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="p-3 sm:p-4 bg-white border-t flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full transition-colors whitespace-nowrap"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 bg-white border-t rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-2.5 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
