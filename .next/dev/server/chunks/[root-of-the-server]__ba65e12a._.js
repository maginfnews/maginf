module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/resend [external] (resend, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("resend");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/pages/api/contact.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$resend__$5b$external$5d$__$28$resend$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/resend [external] (resend, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$resend__$5b$external$5d$__$28$resend$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$resend__$5b$external$5d$__$28$resend$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
const resend = new __TURBOPACK__imported__module__$5b$externals$5d2f$resend__$5b$external$5d$__$28$resend$2c$__esm_import$29$__["Resend"](process.env.RESEND_API_KEY);
async function handler(req, res) {
    console.log('🔥 API /api/contact chamada!', req.method);
    if (req.method !== 'POST') {
        console.log('❌ Método não permitido:', req.method);
        return res.status(405).json({
            ok: false,
            error: 'Method not allowed'
        });
    }
    try {
        console.log('📋 Dados recebidos:', req.body);
        const { name, email, company, message } = req.body;
        // Verificar se API key existe
        if (!process.env.RESEND_API_KEY) {
            console.error('❌ RESEND_API_KEY não encontrada!');
            return res.status(500).json({
                ok: false,
                error: 'API key não configurada'
            });
        }
        console.log('🔑 API Key encontrada:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');
        console.log('📧 Tentando enviar email via Resend...');
        const data = await resend.emails.send({
            from: "Site MAGINF <contato@notificacao.maginf.com.br>",
            to: [
                "maicon@magpass.com.br"
            ],
            subject: `Novo contato do site – ${name}`,
            reply_to: email,
            html: `
        <h1>Novo contato do site</h1>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Empresa:</b> ${company}</p>
        <p><b>Mensagem:</b><br/>${message}</p>
      `
        });
        console.log('✅ Email enviado com sucesso!', data);
        return res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.error("❌ Erro detalhado ao enviar email:", error);
        console.error("❌ Stack trace:", error.stack);
        return res.status(500).json({
            ok: false,
            error: error.message
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ba65e12a._.js.map