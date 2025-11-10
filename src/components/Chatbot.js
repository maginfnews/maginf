import { useState } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Olá! 👋 Sou o assistente virtual da MAGINF com IA. Como posso ajudar?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(true);

  const quickReplies = [
    { text: '💼 Serviços MSP' },
    { text: '💰 Planos e Preços' },
    { text: '📞 Falar com Consultor' },
    { text: '☁️ Cloud Computing' },
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

    if (lowerText.includes('preço') || lowerText.includes('custo') || lowerText.includes('valor')) {
      return '💰 Nossos planos são personalizados conforme suas necessidades. Entre em contato para uma proposta: sac@maginf.com.br ou (11) 4610-6363';
    }
    if (lowerText.includes('suporte') || lowerText.includes('atendimento')) {
      return '🛟 Oferecemos suporte 24/7 com SLA garantido! Atendimento remoto e presencial quando necessário.';
    }
    if (lowerText.includes('cloud') || lowerText.includes('nuvem')) {
      return '☁️ Trabalhamos com AWS, Azure e Microsoft 365. Fazemos migração completa e gestão de ambientes cloud!';
    }
    if (lowerText.includes('cftv') || lowerText.includes('câmera') || lowerText.includes('segurança')) {
      return '📹 Instalamos sistemas CFTV IP com analytics de IA, acesso remoto e integração com NOC. Quer um orçamento?';
    }

    return '🤔 Interessante! Para mais detalhes, recomendo falar com nossa equipe: sac@maginf.com.br ou (11) 4610-6363. Posso ajudar com mais alguma coisa?';
  };

  const handleQuickReply = (reply) => {
    handleSend(reply.text);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:right-24 z-40 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
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
