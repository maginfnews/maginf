const { execSync } = require('child_process');
const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

// Configurações da Hostinger (EDITE ESTAS INFORMAÇÕES)
const FTP_CONFIG = {
  host: 'seu-dominio.com', // ou IP do servidor
  user: 'seu-usuario-ftp',
  password: 'sua-senha-ftp',
  secure: false, // true para FTPS
  port: 21 // 22 para SFTP
};

const REMOTE_PATH = '/public_html/'; // Pasta no servidor
const LOCAL_BUILD_PATH = './build/';

async function deployToHostinger() {
  console.log('🚀 Iniciando deploy automático para Hostinger...\n');

  try {
    // 1. Fazer build de produção
    console.log('📦 Criando build de produção...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build criado com sucesso!\n');

    // 2. Verificar se pasta build existe
    if (!fs.existsSync(LOCAL_BUILD_PATH)) {
      throw new Error('Pasta build não encontrada!');
    }

    // 3. Conectar ao FTP
    console.log('🔗 Conectando ao servidor FTP...');
    const client = new ftp.Client();
    
    await client.access(FTP_CONFIG);
    console.log('✅ Conectado ao servidor!\n');

    // 4. Navegar para pasta de destino
    console.log('📁 Navegando para pasta de destino...');
    await client.ensureDir(REMOTE_PATH);
    await client.cd(REMOTE_PATH);

    // 5. Limpar pasta de destino (opcional)
    console.log('🧹 Limpando pasta de destino...');
    try {
      await client.clearWorkingDir();
    } catch (error) {
      console.log('⚠️  Aviso: Não foi possível limpar pasta (pode estar vazia)');
    }

    // 6. Upload dos arquivos
    console.log('📤 Fazendo upload dos arquivos...');
    await client.uploadFromDir(LOCAL_BUILD_PATH);
    console.log('✅ Upload concluído!\n');

    // 7. Fechar conexão
    client.close();

    console.log('🎉 Deploy concluído com sucesso!');
    console.log('🌐 Seu site está disponível em: https://seu-dominio.com');

  } catch (error) {
    console.error('❌ Erro durante o deploy:', error.message);
    process.exit(1);
  }
}

// Executar deploy
deployToHostinger();
