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
  blog: {
    mspGuide: getImageUrl('https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop&crop=center', 'blog'),
    segurancaTi: getImageUrl('https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=center', 'blog'),
    microsoft365: getImageUrl('https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&crop=center', 'blog'),
    backupNuvem: getImageUrl('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&crop=center', 'blog'),
    monitoramento247: getImageUrl('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center', 'blog'),
    cftvInteligente: getImageUrl('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop&crop=center', 'blog')
  },
  
  portfolio: {
    infraestrutura: getImageUrl('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&crop=center', 'portfolio'),
    cftvShopping: getImageUrl('https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=center', 'portfolio'),
    microsoft365Advocacia: getImageUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center', 'portfolio'),
    wifiHospital: getImageUrl('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center', 'portfolio'),
    backupFintech: getImageUrl('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop&crop=center', 'portfolio'),
    mspEducacao: getImageUrl('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop&crop=center', 'portfolio')
  },
  
  placeholder: getImageUrl('/images/placeholder.svg', 'blog')
};

export default IMAGE_CONFIG;
