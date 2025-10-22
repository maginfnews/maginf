const { execSync } = require('child_process');
const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs');

// Tentar carregar configurações personalizadas
let config;
try {
  config = require('./deploy-config.js');
} catch (error) {
  console.log('⚠️  Arquivo deploy-config.js não encontrado!');
  console.log('📋 Copie deploy-config.example.js para deploy-config.js e configure suas credenciais.');
  process.exit(1);
}

async function deployToHostinger() {
  console.log('🚀 MAGINF - Deploy Automático para Hostinger\n');

  try {
    // 1. Build de produção
    console.log('📦 Criando build otimizado...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build criado!\n');

    // 2. Verificar build
    if (!fs.existsSync(config.localBuildPath)) {
      throw new Error('❌ Pasta build não encontrada!');
    }

    // 3. Conectar FTP
    console.log('🔗 Conectando à Hostinger...');
    const client = new ftp.Client();
    client.ftp.verbose = false; // Reduzir logs

    await client.access(config.ftp);
    console.log('✅ Conectado!\n');

    // 4. Preparar pasta remota
    console.log('📁 Preparando pasta de destino...');
    await client.ensureDir(config.remotePath);
    await client.cd(config.remotePath);

    // 5. Limpar pasta (se configurado)
    if (config.clearRemoteDir) {
      console.log('🧹 Limpando pasta remota...');
      try {
        const list = await client.list();
        for (const item of list) {
          if (item.isFile) {
            await client.remove(item.name);
          } else if (item.isDirectory) {
            await client.removeDir(item.name);
          }
        }
        console.log('✅ Pasta limpa!\n');
      } catch (error) {
        console.log('⚠️  Aviso: Erro ao limpar pasta (pode estar vazia)\n');
      }
    }

    // 6. Upload dos arquivos
    console.log('📤 Fazendo upload do site...');
    await client.uploadFromDir(config.localBuildPath);
    console.log('✅ Upload concluído!\n');

    // 7. Upload .htaccess se necessário
    if (config.uploadHtaccess && fs.existsSync('./public/.htaccess')) {
      console.log('⚙️  Fazendo upload do .htaccess...');
      await client.uploadFrom('./public/.htaccess', '.htaccess');
      console.log('✅ .htaccess enviado!\n');
    }

    // 8. Fechar conexão
    client.close();

    // 9. Sucesso!
    console.log('🎉 DEPLOY CONCLUÍDO COM SUCESSO!');
    console.log('🌐 Site disponível em:', config.domain);
    console.log('⏰ Aguarde alguns minutos para propagação completa.\n');

    // 10. Estatísticas
    const buildStats = fs.statSync(config.localBuildPath);
    console.log('📊 Estatísticas do deploy:');
    console.log('   📦 Pasta build criada:', buildStats.mtime.toLocaleString());
    console.log('   🚀 Deploy realizado:', new Date().toLocaleString());

  } catch (error) {
    console.error('\n❌ ERRO NO DEPLOY:');
    console.error('   ', error.message);
    console.log('\n🔧 Possíveis soluções:');
    console.log('   1. Verificar credenciais FTP no deploy-config.js');
    console.log('   2. Verificar conexão com internet');
    console.log('   3. Verificar se pasta public_html existe no servidor');
    console.log('   4. Contactar suporte da Hostinger se necessário');
    process.exit(1);
  }
}

// Executar deploy
deployToHostinger();
