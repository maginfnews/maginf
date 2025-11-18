// Configuração do servidor de imagens externo
const IMAGE_CONFIG = {
  // Cloudinary (Configurado)
  cloudinary: {
    cloudName: 'dxr6mywet', // Cloud Name correto
    apiKey: '276161241966983',
    apiSecret: 'PxDtt-IFIH7GJ-1YRRrHSG9zoM8',
    baseUrl: 'https://res.cloudinary.com/dxr6mywet/image/upload/',
    presets: {
      blog: 'c_fill,w_400,h_250,q_auto,f_auto',
      portfolio: 'c_fill,w_600,h_400,q_auto,f_auto',
      thumbnail: 'c_fill,w_200,h_150,q_auto,f_auto',
      hero: 'c_fill,w_1200,h_600,q_auto,f_auto'
    }
  },

  // AWS S3 + CloudFront
  aws: {
    bucketUrl: 'https://d1234567890.cloudfront.net/', // Substitua pela sua URL
    region: 'us-east-1'
  },

  // ImagemHost (Hospedagem de imagens)
  imagemhost: {
    baseUrl: 'https://www.imagemhost.com.br/',
    // URLs serão configuradas individualmente
  },

  // GitHub Raw (Para testes)
  github: {
    baseUrl: 'https://raw.githubusercontent.com/seu-usuario/maginf-images/main/',
    branch: 'main'
  },

  // Configuração ativa (mude aqui para trocar o servidor)
  active: 'imagemhost' // 'cloudinary', 'aws', 'imagemhost', 'github', 'local'
};

// Função para gerar URLs de imagem
export const getImageUrl = (imagePath, preset = 'blog') => {
  const config = IMAGE_CONFIG;
  
  switch (config.active) {
    case 'cloudinary':
      return `${config.cloudinary.baseUrl}${config.cloudinary.presets[preset]}/${imagePath}`;
    
    case 'aws':
      return `${config.aws.bucketUrl}${imagePath}`;
    
    case 'imagemhost':
      // Para ImagemHost, imagePath já é a URL completa
      return imagePath;
    
    case 'github':
      return `${config.github.baseUrl}${imagePath}`;
    
    case 'local':
    default:
      return `/images/${imagePath}`;
  }
};

// URLs específicas para cada seção - ImagemHost URLs
// ALTERNATIVA PEXELS (caso Unsplash falhe):
// Blog: https://www.pexels.com/pt-br/procurar/tecnologia/
// Portfolio: https://www.pexels.com/pt-br/procurar/data%20center/
// Termos: "server room", "cybersecurity", "microsoft office", "cloud storage", "network monitoring", "security cameras"

export const IMAGES = {
  // Hero Section
  hero: {
    // Imagem principal do Hero (LCP) usando arquivo local otimizado
    main: '/images/hero-main.webp',
    background: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1920' // Tecnologia abstrata
  },

  // About Section
  about: {
    team: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', // Equipe de TI
    office: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=800', // Escritório moderno
    technician: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800' // Técnico trabalhando
  },

  // Services Section
  services: {
    cftv: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg', // Câmeras de segurança
    cloud: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg', // Cloud computing
    support: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg', // Suporte técnico
    network: 'https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg', // Equipamentos de rede
    hardware: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg', // Hardware
    backup: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg' // Backup e segurança
  },

  // Blog Section
  blog: {
    mspGuide: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', // Consultoria MSP
    segurancaTi: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg', // Segurança
    microsoft365: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg', // Microsoft 365
    backupNuvem: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg', // Backup nuvem
    monitoramento247: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg', // Monitoramento
    cftvInteligente: 'https://images.pexels.com/photos/2228842/pexels-photo-2228842.jpeg' // CFTV
  },
  
  // Portfolio Section
  portfolio: {
    infraestrutura: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg', // Data center
    cftvShopping: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg', // Shopping/Retail
    microsoft365Advocacia: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg', // Escritório advocacia
    wifiHospital: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg', // Hospital
    backupFintech: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg', // Fintech/Dados
    mspEducacao: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg' // Educação/Lab
  },
  
  placeholder: getImageUrl('/images/placeholder.svg', 'blog')
};

export default IMAGE_CONFIG;
