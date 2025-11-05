module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/chat.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API Route para integração com ChatGPT
__turbopack_context__.s([
    "default",
    ()=>handler
]);
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    const { message, conversationHistory = [] } = req.body;
    if (!message) {
        return res.status(400).json({
            error: 'Message is required'
        });
    }
    try {
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        if (!OPENAI_API_KEY) {
            console.error('OPENAI_API_KEY not configured');
            return res.status(500).json({
                error: 'API key not configured',
                fallback: getFallbackResponse(message)
            });
        }
        // System prompt personalizado para MAGINF
        const systemPrompt = `Você é um assistente virtual da MAGINF Tecnologia, uma empresa especializada em serviços de TI.

INFORMAÇÕES DA EMPRESA:
- Nome: MAGINF Tecnologia
- Especialidades: Serviços Gerenciados (MSP), Cloud Computing, CFTV, Suporte 24/7
- Localização: Guarulhos, SP
- Telefone: (11) 4610-6363
- Email: sac@maginf.com.br
- WhatsApp: (11) 4610-6363

SERVIÇOS PRINCIPAIS:
1. MSP (Managed Service Provider) - Gestão completa de TI
2. Infraestrutura e Cloud - AWS, Azure, Microsoft 365
3. CFTV e Segurança - Câmeras IP com analytics
4. Suporte Técnico 24/7 - Remoto e presencial
5. Backup e Disaster Recovery
6. Consultoria em TI

PLANOS:
- Bronze: Para PMEs (5-20 usuários)
- Prata: Para empresas médias (20-50 usuários)
- Ouro: Para missão crítica (50+ usuários)

DIFERENCIAIS:
- Atendimento 24/7 com SLA garantido
- Equipe certificada
- Monitoramento proativo
- Atendimento presencial em Guarulhos e região

INSTRUÇÕES:
- Seja profissional, mas amigável
- Responda de forma clara e objetiva
- Se não souber algo específico, sugira contato direto
- Incentive o cliente a entrar em contato para orçamentos
- Use emojis moderadamente para ser mais amigável
- Mantenha respostas concisas (máximo 3 parágrafos)`;
        // Preparar mensagens para a API
        const messages = [
            {
                role: 'system',
                content: systemPrompt
            },
            ...conversationHistory.map((msg)=>({
                    role: msg.type === 'user' ? 'user' : 'assistant',
                    content: msg.text
                })),
            {
                role: 'user',
                content: message
            }
        ];
        // Chamar API do OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                max_tokens: 300,
                temperature: 0.7,
                presence_penalty: 0.6,
                frequency_penalty: 0.3
            })
        });
        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI API error:', error);
            return res.status(200).json({
                reply: getFallbackResponse(message),
                source: 'fallback'
            });
        }
        const data = await response.json();
        const reply = data.choices[0].message.content;
        return res.status(200).json({
            reply: reply,
            source: 'chatgpt'
        });
    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(200).json({
            reply: getFallbackResponse(message),
            source: 'fallback'
        });
    }
}
// Respostas de fallback caso a API falhe
function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    // Respostas específicas
    if (lowerMessage.includes('preço') || lowerMessage.includes('custo') || lowerMessage.includes('valor') || lowerMessage.includes('plano')) {
        return '💰 Nossos planos são personalizados conforme suas necessidades! Entre em contato para uma proposta detalhada:\n\n📧 sac@maginf.com.br\n📱 (11) 4610-6363';
    }
    if (lowerMessage.includes('suporte') || lowerMessage.includes('atendimento') || lowerMessage.includes('24')) {
        return '🛟 Oferecemos suporte técnico 24/7 com SLA garantido! Atendimento remoto e presencial quando necessário. Nossa equipe está sempre disponível para ajudar sua empresa.';
    }
    if (lowerMessage.includes('cloud') || lowerMessage.includes('nuvem') || lowerMessage.includes('azure') || lowerMessage.includes('aws')) {
        return '☁️ Trabalhamos com as principais plataformas cloud: AWS, Azure e Microsoft 365. Fazemos migração completa, gestão e otimização de custos. Quer saber mais?';
    }
    if (lowerMessage.includes('cftv') || lowerMessage.includes('câmera') || lowerMessage.includes('segurança') || lowerMessage.includes('camera')) {
        return '📹 Instalamos sistemas CFTV IP profissionais com analytics de IA, acesso remoto e integração com NOC. Solicite um orçamento sem compromisso!';
    }
    if (lowerMessage.includes('backup') || lowerMessage.includes('recuperação') || lowerMessage.includes('disaster')) {
        return '💾 Oferecemos soluções completas de backup e disaster recovery com criptografia e testes periódicos. Seus dados sempre seguros e recuperáveis!';
    }
    if (lowerMessage.includes('msp') || lowerMessage.includes('gerenciado')) {
        return '🎯 Como MSP, gerenciamos toda sua infraestrutura de TI: servidores, rede, segurança, backup e suporte. Você foca no negócio, nós cuidamos da tecnologia!';
    }
    if (lowerMessage.includes('contato') || lowerMessage.includes('falar') || lowerMessage.includes('ligar')) {
        return '📞 Entre em contato conosco:\n\n📧 Email: sac@maginf.com.br\n📱 Telefone/WhatsApp: (11) 4610-6363\n📍 Guarulhos, SP\n\nEstamos prontos para atender sua empresa!';
    }
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada') || lowerMessage.includes('valeu')) {
        return '😊 Por nada! Estou aqui para ajudar. Se precisar de mais informações, é só chamar. Quer falar com nossa equipe? Entre em contato: (11) 4610-6363';
    }
    if (lowerMessage.includes('oi') || lowerMessage.includes('olá') || lowerMessage.includes('ola') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde') || lowerMessage.includes('boa noite')) {
        return '👋 Olá! Seja bem-vindo à MAGINF Tecnologia! Como posso ajudar você hoje? Posso falar sobre nossos serviços, planos ou tirar dúvidas sobre TI.';
    }
    // Resposta genérica
    return '🤔 Interessante! Para informações mais detalhadas sobre esse assunto, recomendo falar diretamente com nossa equipe especializada:\n\n📧 sac@maginf.com.br\n📱 (11) 4610-6363\n\nPosso ajudar com mais alguma coisa?';
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__473f5ff5._.js.map