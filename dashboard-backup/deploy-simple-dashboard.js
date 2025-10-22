const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

// Configuração FTP
const config = require('./deploy-config-dashboard.js');

async function deploySimpleDashboard() {
  console.log('🚀 Deploy Dashboard Simples → dashboard.maginf.com.br\n');

  try {
    // 1. Criar HTML simples do dashboard
    console.log('📝 Criando dashboard HTML simples...');
    
    const dashboardHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard MAGINF - Backup Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" href="https://maginf.com.br/favicon.ico">
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- Header -->
        <div class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <img src="https://maginf.com.br/logo-maginf-oficial.png" alt="MAGINF" class="h-8 w-auto">
                        <div class="ml-4">
                            <h1 class="text-xl font-semibold text-gray-900">Dashboard de Backup</h1>
                            <p class="text-sm text-gray-500">Monitoramento N-able Cove</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <button onclick="window.location.reload()" class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            🔄 Atualizar
                        </button>
                        <button onclick="window.location.href='https://maginf.com.br'" class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
                            🚪 Sair
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Status Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span class="text-green-600 font-semibold">✓</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Backups Sucesso</p>
                            <p class="text-2xl font-semibold text-gray-900" id="success-count">12</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span class="text-red-600 font-semibold">✗</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Backups Falha</p>
                            <p class="text-2xl font-semibold text-gray-900" id="failed-count">2</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span class="text-yellow-600 font-semibold">⚠</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Com Avisos</p>
                            <p class="text-2xl font-semibold text-gray-900" id="warning-count">3</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span class="text-blue-600 font-semibold">📊</span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-500">Total Clientes</p>
                            <p class="text-2xl font-semibold text-gray-900" id="total-clients">8</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Clientes MAGINF -->
            <div class="bg-white rounded-lg shadow">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-medium text-gray-900">Clientes MAGINF</h2>
                    <p class="text-sm text-gray-500">Lista de clientes gerenciados pela MAGINF</p>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="clients-list">
                        <!-- Clientes serão carregados aqui -->
                    </div>
                </div>
            </div>

            <!-- Status da API -->
            <div class="mt-8 bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Status da Integração</h3>
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">N-able Cove API</span>
                        <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full" id="api-status">
                            Modo Demo
                        </span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Última Atualização</span>
                        <span class="text-sm text-gray-500" id="last-update">
                            ${new Date().toLocaleString('pt-BR')}
                        </span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Versão Dashboard</span>
                        <span class="text-sm text-gray-500">v1.0.0</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Dados de demonstração dos clientes MAGINF
        const demoClients = [
            { id: 1, name: 'Empresa Alpha Ltda', status: 'success', devices: 5, lastBackup: '2 horas atrás' },
            { id: 2, name: 'Beta Soluções', status: 'warning', devices: 3, lastBackup: '1 dia atrás' },
            { id: 3, name: 'Gamma Indústria', status: 'failed', devices: 8, lastBackup: '3 dias atrás' },
            { id: 4, name: 'Delta Tecnologia', status: 'success', devices: 2, lastBackup: '30 min atrás' },
            { id: 5, name: 'Epsilon Consultoria', status: 'success', devices: 6, lastBackup: '1 hora atrás' },
            { id: 6, name: 'Zeta Sistemas', status: 'warning', devices: 4, lastBackup: '2 dias atrás' },
            { id: 7, name: 'Eta Serviços', status: 'success', devices: 3, lastBackup: '45 min atrás' },
            { id: 8, name: 'Theta Inovação', status: 'success', devices: 7, lastBackup: '1.5 horas atrás' }
        ];

        // Renderizar clientes
        function renderClients() {
            const clientsList = document.getElementById('clients-list');
            clientsList.innerHTML = '';

            demoClients.forEach(client => {
                const statusColors = {
                    success: 'bg-green-100 text-green-800',
                    warning: 'bg-yellow-100 text-yellow-800',
                    failed: 'bg-red-100 text-red-800'
                };

                const statusIcons = {
                    success: '✓',
                    warning: '⚠',
                    failed: '✗'
                };

                const clientCard = \`
                    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex items-center justify-between mb-2">
                            <h4 class="font-medium text-gray-900">\${client.name}</h4>
                            <span class="px-2 py-1 text-xs font-medium rounded-full \${statusColors[client.status]}">
                                \${statusIcons[client.status]}
                            </span>
                        </div>
                        <div class="text-sm text-gray-600 space-y-1">
                            <div>📱 \${client.devices} dispositivos</div>
                            <div>🕒 \${client.lastBackup}</div>
                        </div>
                    </div>
                \`;
                clientsList.innerHTML += clientCard;
            });
        }

        // Atualizar contadores
        function updateCounters() {
            const success = demoClients.filter(c => c.status === 'success').length;
            const failed = demoClients.filter(c => c.status === 'failed').length;
            const warning = demoClients.filter(c => c.status === 'warning').length;

            document.getElementById('success-count').textContent = success;
            document.getElementById('failed-count').textContent = failed;
            document.getElementById('warning-count').textContent = warning;
            document.getElementById('total-clients').textContent = demoClients.length;
        }

        // Inicializar dashboard
        document.addEventListener('DOMContentLoaded', function() {
            renderClients();
            updateCounters();
            
            // Atualizar timestamp a cada minuto
            setInterval(() => {
                document.getElementById('last-update').textContent = new Date().toLocaleString('pt-BR');
            }, 60000);
        });
    </script>
</body>
</html>`;

    // 2. Criar .htaccess
    const htaccessContent = `# Dashboard MAGINF - Configuração
RewriteEngine On

# Redirecionar para index.html
DirectoryIndex index.html

# Forçar HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</IfModule>

# Compressão
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Headers de segurança
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
`;

    // 3. Conectar FTP
    console.log('🔗 Conectando à Hostinger...');
    const client = new ftp.Client();
    await client.access(config.ftp);
    console.log('✅ Conectado!');

    // 4. Ir para pasta dash
    console.log('📁 Acessando pasta /public_html/dash/...');
    await client.cd('/public_html/dash/');

    // 5. Limpar pasta
    console.log('🧹 Limpando pasta...');
    try {
      const list = await client.list();
      for (const item of list) {
        if (item.isFile) {
          await client.remove(item.name);
        }
      }
    } catch (error) {
      console.log('⚠️  Pasta já estava vazia');
    }

    // 6. Criar arquivos temporários
    console.log('📝 Criando arquivos temporários...');
    fs.writeFileSync('./temp-index.html', dashboardHTML);
    fs.writeFileSync('./temp-htaccess', htaccessContent);

    // 7. Upload dos arquivos
    console.log('📤 Fazendo upload do dashboard...');
    
    // Upload index.html
    await client.uploadFrom('./temp-index.html', 'index.html');
    console.log('✅ index.html enviado');
    
    // Upload .htaccess
    await client.uploadFrom('./temp-htaccess', '.htaccess');
    console.log('✅ .htaccess enviado');

    // 8. Limpar arquivos temporários
    fs.unlinkSync('./temp-index.html');
    fs.unlinkSync('./temp-htaccess');

    // 7. Fechar conexão
    client.close();

    console.log('\n🎉 DASHBOARD PUBLICADO COM SUCESSO!');
    console.log('=' .repeat(50));
    console.log('🌐 URL: https://dashboard.maginf.com.br');
    console.log('📁 Pasta: /public_html/dash/');
    console.log('⏰ Disponível imediatamente');
    console.log('🔒 SSL será ativado automaticamente');

    console.log('\n📊 Características do dashboard:');
    console.log('   ✅ Interface responsiva (Tailwind CSS)');
    console.log('   ✅ Dados de demonstração dos clientes MAGINF');
    console.log('   ✅ Contadores de status de backup');
    console.log('   ✅ Atualização automática de timestamp');
    console.log('   ✅ Headers de segurança configurados');
    console.log('   ✅ Cache otimizado');

    console.log('\n🔗 Teste agora: https://dashboard.maginf.com.br');

  } catch (error) {
    console.error('\n❌ ERRO NO DEPLOY:', error.message);
  }
}

deploySimpleDashboard();
