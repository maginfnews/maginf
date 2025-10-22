@echo off
echo 🚀 Iniciando Dashboard MAGINF Local...
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado! Instale em: https://nodejs.org
    pause
    exit /b 1
)

REM Verificar se está na pasta correta
if not exist "package.json" (
    echo ❌ Execute este script na pasta dashboard-backup
    pause
    exit /b 1
)

REM Copiar arquivo de ambiente se não existir
if not exist ".env.local" (
    echo 📝 Criando arquivo .env.local...
    copy "env.local.example" ".env.local"
    echo ✅ Arquivo .env.local criado
    echo.
)

REM Instalar dependências se necessário
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    npm install
    echo ✅ Dependências instaladas
    echo.
)

echo 🌐 Iniciando servidor de desenvolvimento...
echo 📍 URL: http://localhost:3000
echo 🔄 Pressione Ctrl+C para parar
echo.

REM Iniciar servidor
npm run dev

pause
