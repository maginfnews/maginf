@echo off
echo 🚀 Corrigindo CORS automaticamente...
echo ================================

echo 📁 Criando .env.local...
copy ".env.local.example" ".env.local"

echo 🔄 Substituindo route.ts...
del "app\api\contact\route.ts" 2>nul
ren "app\api\contact\route-new.ts" "route.ts"

echo 🧹 Limpando arquivos temporários...
del "env-example.txt" 2>nul
del ".env.local.example" 2>nul

echo ✅ Correção CORS concluída!
echo.
echo 📋 Próximos passos:
echo 1. Recarregue a página (F5)
echo 2. Teste o formulário de contato
echo 3. Verifique os logs no console
echo.
echo 🎯 Agora o formulário usa:
echo    Frontend → API interna → Resend (sem CORS)
echo    Fallback → FormSubmit (se falhar)
echo.
pause
