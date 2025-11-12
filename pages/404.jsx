import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Mail, Server, Cloud, Shield, Zap, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Custom404() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingIcons, setFloatingIcons] = useState([]);

  const icons = [Server, Cloud, Shield, Zap, Search];

  useEffect(() => {
    // Generate floating icons
    const icons_array = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: icons[Math.floor(Math.random() * icons.length)],
      delay: Math.random() * 5
    }));
    setFloatingIcons(icons_array);

    // Mouse move effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    { name: 'Início', href: '/', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { name: 'Serviços', href: '/#servicos', icon: Server, color: 'from-purple-500 to-pink-500' },
    { name: 'Planos', href: '/#planos', icon: Zap, color: 'from-orange-500 to-red-500' },
    { name: 'Contato', href: '/#contato', icon: Mail, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <>
      <Head>
        <title>404 - Página Não Encontrada | MAGINF</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Icons */}
          {floatingIcons.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="absolute opacity-5 animate-float-slow"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  animationDelay: `${item.delay}s`
                }}
              >
                <IconComponent className="h-12 w-12 text-maginf-orange" />
              </div>
            );
          })}

          {/* Gradient Orbs */}
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-maginf-orange/10 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
              animationDelay: '1s'
            }}
          />
        </div>

        <div className="max-w-4xl w-full text-center relative z-10">
          {/* 404 Number with Animation */}
          <div className="relative mb-12">
            <h1 className="text-[150px] sm:text-[200px] lg:text-[280px] font-bold text-gray-200 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-maginf-orange/30 rounded-full blur-2xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-maginf-orange to-maginf-orange-dark backdrop-blur-sm rounded-full p-8 lg:p-12 shadow-2xl animate-bounce-slow">
                  <AlertTriangle className="h-20 w-20 lg:h-32 lg:w-32 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Message Card */}
          <div className="bg-white backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-200">
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-maginf-gray">
                Página Não Encontrada
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-2">
                Ops! A página que você está procurando não existe ou foi movida.
              </p>
              <p className="text-sm text-gray-500">
                Erro 404 - Recurso não disponível
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => router.push('/')}
                className="group bg-gradient-to-r from-maginf-orange to-maginf-orange-dark hover:from-maginf-orange-dark hover:to-maginf-orange text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <Home className="h-5 w-5 group-hover:animate-pulse" />
                Voltar ao Início
              </button>
              <button
                onClick={() => router.back()}
                className="group bg-gray-100 hover:bg-gray-200 text-maginf-gray font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 border border-gray-300"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Página Anterior
              </button>
            </div>

            {/* Quick Links Grid */}
            <div>
              <p className="text-gray-700 mb-6 font-medium">Acesso rápido:</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      className="group bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 transition-all hover:scale-105 hover:shadow-xl flex flex-col items-center gap-3 border border-gray-200 hover:border-gray-300"
                    >
                      <div className={`bg-gradient-to-br ${link.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-700 mb-3">
                <strong>Precisa de ajuda?</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <a 
                  href="mailto:sac@maginf.com.br" 
                  className="text-maginf-orange hover:text-maginf-orange-light transition-colors flex items-center gap-2 hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  sac@maginf.com.br
                </a>
                <span className="hidden sm:inline text-gray-500">•</span>
                <a 
                  href="tel:+551146106363" 
                  className="text-maginf-orange hover:text-maginf-orange-light transition-colors hover:underline"
                >
                  (11) 4610-6363
                </a>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <p className="text-gray-500 mt-8 text-sm">
            © {new Date().getFullYear()} MAGINF - Tecnologia e Inovação
          </p>
        </div>

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            50% { 
              transform: translateY(-30px) rotate(180deg); 
            }
          }
          @keyframes bounce-slow {
            0%, 100% { 
              transform: translateY(0px); 
            }
            50% { 
              transform: translateY(-20px); 
            }
          }
          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
}
