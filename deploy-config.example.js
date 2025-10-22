// Configurações de Deploy - COPIE ESTE ARQUIVO PARA deploy-config.js
// E EDITE COM SUAS INFORMAÇÕES DA HOSTINGER

module.exports = {
  // Configurações FTP da Hostinger
  ftp: {
    host: 'ftp.hostinger.com', // ou seu domínio
    user: 'seu-usuario@dominio.com',
    password: 'sua-senha-ftp',
    secure: false, // true para FTPS
    port: 21
  },

  // Caminhos - ESCOLHA UMA OPÇÃO:
  
  // OPÇÃO 1: Substituir WordPress (CUIDADO - faz backup antes!)
  // remotePath: '/public_html/', 
  
  // OPÇÃO 2: Subpasta (mantém WordPress)
  remotePath: '/public_html/novo-site/', 
  
  // OPÇÃO 3: Subdomínio
  // remotePath: '/public_html/subdomains/novo/', 
  
  localBuildPath: './build/',

  // Opções
  clearRemoteDir: false, // MUDADO: Não limpar (proteger WordPress)
  uploadHtaccess: true, // Upload do .htaccess
  
  // Domínio final
  domain: 'https://seu-dominio.com'
};
