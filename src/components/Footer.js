import React, { useEffect } from 'react';
import { useContactForm } from '../hooks/useResend';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';

const Footer = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    reset
  } = useContactForm();

  // Auto-reset após 5 segundos de sucesso
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset]);

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Telefone",
      value: "+55 (11) 4610-6363"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "E-mail",
      value: "sac@maginf.com.br"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Endereço",
      value: "Rua Carmela Antónia Fanganiello Cecchinato. 301 - Guarulhos, SP"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Horário",
      value: "Segunda a Sexta-feira: 8:30h-17:30h (Comercial)"
    }
  ];

  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Serviços", href: "#servicos" },
    { name: "Planos MSP", href: "#planos" },
    { name: "Sobre", href: "#sobre" },
    { name: "Contato", href: "#contato" }
  ];

  const services = [
    "Serviços Gerenciados (MSP)",
    "Infraestrutura & Cloud",
    "CFTV e Segurança",
    "Fornecimento de Hardware",
    "Suporte Técnico 24/7",
    "Backup e Recuperação"
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-maginf-gray text-white">
      {/* Contact Form Section */}
      <section id="contato" className="section-padding border-b border-gray-600">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Fale com um Consultor
              </h2>
              <p className="text-gray-300 mb-8">
                Agende uma avaliação gratuita e descubra como podemos otimizar 
                sua infraestrutura de TI com soluções personalizadas.
              </p>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent text-white placeholder-gray-400"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">E-mail *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent text-white placeholder-gray-400"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Empresa</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Mensagem *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-maginf-orange focus:border-transparent text-white placeholder-gray-400 resize-none"
                      placeholder="Descreva suas necessidades de TI..."
                    ></textarea>
                  </div>
                  
                  {error && (
                    <div className="bg-red-600/20 border border-red-500 rounded-lg p-4 text-center">
                      <p className="text-red-300 text-sm">{error}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn-primary w-full justify-center text-lg py-4 ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <div className="bg-green-600/20 border border-green-500 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Mensagem Recebida!</h3>
                  <p className="text-gray-300 mb-4">
                    Obrigado pelo contato. Nossa equipe entrará em contato em breve.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">
                      Ou entre em contato diretamente:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <a 
                        href="https://wa.me/5511351429330"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-maginf-orange hover:bg-maginf-orange-dark text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Ligar Agora
                      </a>
                      <a 
                        href="mailto:sac@maginf.com.br"
                        className="border border-maginf-orange text-maginf-orange hover:bg-maginf-orange hover:text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        E-mail Direto
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-maginf-orange p-3 rounded-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.label}</h4>
                      <p className="text-gray-300">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick CTAs */}
              <div className="mt-8 space-y-4">
                <a 
                  href="https://wa.me/5511351429330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-maginf-orange hover:bg-maginf-orange-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Ligar Agora
                </a>
                <button className="w-full border border-maginf-orange text-maginf-orange hover:bg-maginf-orange hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Enviar E-mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="section-padding py-12">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <img 
                  src="/logo-maginf-oficial-white.svg" 
                  alt="MAGINF Tecnologia" 
                  className="h-16 w-auto mb-2"
                />
                <p className="text-sm text-gray-400">Soluções de TI Completas</p>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Mais de 8 anos transformando a tecnologia em motor de crescimento 
                para empresas brasileiras. Suporte 24/7, infraestrutura segura e 
                custos previsíveis.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/maginf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-maginf-orange p-3 rounded-lg transition-colors inline-flex items-center justify-center"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/maginftec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-maginf-orange p-3 rounded-lg transition-colors inline-flex items-center justify-center"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61566502182327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-maginf-orange p-3 rounded-lg transition-colors inline-flex items-center justify-center"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Navegação</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-maginf-orange transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Novembro Azul Section - Enhanced */}
      <div className="border-t border-blue-500/30 bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-cyan-900/30 py-6 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="flex animate-pulse">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex-1 h-full bg-gradient-to-t from-blue-500/20 to-transparent" style={{animationDelay: `${i * 0.2}s`}}></div>
            ))}
          </div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center space-y-3">
            <div className="flex justify-center items-center space-x-3">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: `${i * 0.1}s`}}></div>
                ))}
              </div>
              <h3 className="font-bold text-xl bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                Novembro Azul 2025
              </h3>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: `${i * 0.1 + 0.3}s`}}></div>
                ))}
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-blue-200 text-sm leading-relaxed">
                A <span className="font-semibold text-white">MAGINF Tecnologia</span> se orgulha em apoiar a 
                <span className="font-semibold text-cyan-200"> luta contra o câncer de próstata</span>.
              </p>
              <p className="text-blue-300 text-xs mt-2">
                💙 Juntos pela prevenção, conscientização e cuidado com a saúde masculina! 💙
              </p>
            </div>
            
            <div className="flex justify-center items-center space-x-6 text-xs text-blue-300 pt-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                <span>Prevenção salva vidas</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-blue-400/50"></div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                <span>Diagnóstico precoce é fundamental</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-blue-400/50"></div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                <span>Cuidar-se é masculinidade</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-600 py-6">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 MAGINF Tecnologia. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-gray-400 hover:text-maginf-orange text-sm transition-colors">
                Política de Privacidade
              </button>
              <button className="text-gray-400 hover:text-maginf-orange text-sm transition-colors">
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
