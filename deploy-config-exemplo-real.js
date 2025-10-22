// Configuração real para MAGINF - Hostinger
module.exports = {
  // Configurações FTP da Hostinger
  ftp: {
    host: '185.245.180.69',
    user: 'u773500958.maginf.com.br',
    password: 'pUZkPFxas9XT6Au&',
    secure: false,
    port: 21
  },

  // SITE OFICIAL: Substituir WordPress completamente
  remotePath: '/public_html/',
  
  // OPÇÃO TESTE: Subpasta (já testado)
  // remotePath: '/public_html/novo-site/',
  
  localBuildPath: './build/',

  // Opções
  clearRemoteDir: true, // ⚠️ LIMPAR PASTA (remove WordPress)
  uploadHtaccess: false, // Pular .htaccess por enquanto
  
  // Domínio oficial
  domain: 'https://maginf.com.br'
};
