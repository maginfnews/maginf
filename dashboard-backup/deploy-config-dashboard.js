// Configuração de Deploy - Dashboard MAGINF
// Para subdomínio: dashboard.maginf.com.br

module.exports = {
  // Configurações FTP da Hostinger - MAGINF
  ftp: {
    host: '185.245.180.69',          // IP do servidor FTP
    user: 'u773500958.maginf.com.br', // Usuário FTP completo
    password: '@@Maginf_301',         // Senha FTP correta
    secure: false,                   // FTP padrão
    port: 21                         // Porta FTP padrão
  },
  
  // Caminhos
  localBuildPath: './build',                    // Pasta local do build Next.js
  remotePath: '/public_html/dash/',             // Pasta do subdomínio no servidor
  
  // Configurações do site
  domain: 'https://dashboard.maginf.com.br',
  
  // Opções de deploy
  clearRemoteDir: true,            // Limpar pasta antes do upload
  uploadHtaccess: true,            // Fazer upload do .htaccess
  
  // Informações do projeto
  projectName: 'Dashboard MAGINF',
  description: 'Dashboard de monitoramento de backup para clientes MAGINF'
};

/* 
📋 COMO OBTER SUAS CREDENCIAIS FTP:

1. Acesse: https://hpanel.hostinger.com
2. Faça login na sua conta
3. Vá em "Arquivos" → "Contas FTP"
4. Veja suas credenciais ou crie uma nova conta FTP

Exemplo de credenciais comuns:
- host: 'ftp.hostinger.com' ou 'ftp.maginf.com.br'
- user: 'u123456789' ou 'maginf@maginf.com.br'
- password: sua senha FTP (pode ser diferente da senha do hPanel)

🔧 CONFIGURAÇÃO ALTERNATIVA (SFTP - Mais Seguro):
{
  host: 'ftp.hostinger.com',
  user: 'seu_usuario',
  password: 'sua_senha',
  secure: true,     // SFTP
  port: 22          // Porta SFTP
}
*/
