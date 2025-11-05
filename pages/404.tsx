import React from 'react';
import { Home, Search, ArrowLeft, Mail } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  const quickLinks = [
    { name: 'Início', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Serviços', href: '/#servicos', icon: <Search className="h-5 w-5" /> },
    { name: 'Planos', href: '/#planos', icon: <Search className="h-5 w-5" /> },
    { name: 'Contato', href: '/#contato', icon: <Mail className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-maginf-gray to-maginf-gray-light flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[200px] lg:text-[300px] font-bold text-white/10 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-maginf-orange/20 backdrop-blur-sm rounded-full p-8">
              <Search className="h-24 w-24 text-maginf-orange" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => router.push('/')}
              className="bg-maginf-orange hover:bg-maginf-orange-dark text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              Voltar ao Início
            </button>
            <button
              onClick={() => router.back()}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5" />
              Página Anterior
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-gray-300 mb-4">Ou acesse uma destas páginas:</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 transition-all hover:scale-105 flex flex-col items-center gap-2"
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-400 mt-8">
          Precisa de ajuda? Entre em contato: <a href="mailto:sac@maginf.com.br" className="text-maginf-orange hover:underline">sac@maginf.com.br</a>
        </p>
      </div>
    </div>
  );
}
