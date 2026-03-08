import React from 'react';
import { Heart, Star, Sparkles, Flower2 } from 'lucide-react';

const DiaDasMulheres = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-16 overflow-hidden">

      {/* Pétalas flutuantes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-petal"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${14 + Math.random() * 20}px`,
              opacity: 0.4 + Math.random() * 0.4,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${7 + Math.random() * 5}s`,
            }}
          >
            {['🌸', '🌺', '💜', '🌷', '✨', '💐'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      <div className="container-max relative z-10">

        {/* Título */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <Flower2 className="h-10 w-10 text-pink-400 animate-pulse" />
            <span className="text-xs font-bold tracking-[4px] uppercase text-purple-400">8 de Março</span>
            <Flower2 className="h-10 w-10 text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 bg-clip-text text-transparent leading-tight mb-4">
            Dia Internacional<br />da Mulher
          </h2>
          <p className="text-lg text-purple-600 font-light max-w-xl mx-auto">
            Celebrando a força, a conquista e a essência de cada mulher que transforma o mundo.
          </p>
        </div>

        {/* Card principal */}
        <div className="relative group mb-10 max-w-3xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-pink-100">
            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* Ícone central */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-40"></div>
                  <div className="relative w-28 h-28 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-5xl">💜</span>
                  </div>
                </div>
              </div>

              {/* Texto */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <h3 className="text-2xl font-bold text-purple-700">
                  MAGINF homenageia todas as mulheres
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hoje celebramos a coragem de quem não desiste, a inteligência de quem inova,
                  e a força de quem transforma cada desafio em conquista.
                </p>
                <p className="text-purple-500 font-medium italic">
                  "Uma mulher com tecnologia na mão é uma força sem limites."
                </p>
                <div className="pt-3 border-t border-pink-100">
                  <p className="text-sm text-pink-500 flex items-center justify-center md:justify-start gap-2">
                    <Heart className="h-4 w-4 fill-pink-400 text-pink-400" />
                    Com admiração e respeito — Equipe MAGINF Tecnologia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 pilares */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              emoji: '💪',
              title: 'Força e Resiliência',
              description: 'Cada obstáculo superado é prova da sua capacidade de transformar o mundo.',
              from: 'from-purple-400',
              to: 'to-pink-400',
              bgFrom: 'from-purple-50',
              bgTo: 'to-pink-50',
              border: 'border-purple-100',
              text: 'text-purple-700',
              sub: 'text-purple-500',
            },
            {
              emoji: '🌟',
              title: 'Inovação Feminina',
              description: 'Mulheres que lideram, criam e inspiram estão escrevendo o futuro da tecnologia.',
              from: 'from-pink-400',
              to: 'to-rose-400',
              bgFrom: 'from-pink-50',
              bgTo: 'to-rose-50',
              border: 'border-pink-100',
              text: 'text-pink-700',
              sub: 'text-pink-500',
            },
            {
              emoji: '🤝',
              title: 'Igualdade e Respeito',
              description: 'Construir um mundo mais justo começa pelo respeito e valorização de cada mulher.',
              from: 'from-rose-400',
              to: 'to-purple-400',
              bgFrom: 'from-rose-50',
              bgTo: 'to-purple-50',
              border: 'border-rose-100',
              text: 'text-rose-700',
              sub: 'text-rose-500',
            },
          ].map((item, i) => (
            <div key={i} className="group relative" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className={`absolute inset-0 bg-gradient-to-r ${item.from} ${item.to} rounded-2xl blur-lg opacity-10 group-hover:opacity-25 transition-opacity duration-300`}></div>
              <div className={`relative bg-gradient-to-br ${item.bgFrom} ${item.bgTo} rounded-2xl p-6 shadow-md border ${item.border} hover:shadow-xl transition-all duration-300 h-full`}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`bg-gradient-to-r ${item.from} ${item.to} p-3 rounded-2xl shadow`}>
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <h4 className={`font-bold text-lg ${item.text}`}>{item.title}</h4>
                  <p className={`text-sm leading-relaxed ${item.sub}`}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da campanha */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-pink-200 rounded-full px-8 py-3 shadow-md">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <p className="text-purple-700 font-semibold">Feliz Dia das Mulheres! 🌷 MAGINF Tecnologia</p>
            <Sparkles className="h-5 w-5 text-pink-400" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes petal {
          0%   { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.5; }
          50%  { transform: translateY(30px) rotate(20deg) scale(1.15); opacity: 0.7; }
          100% { transform: translateY(60px) rotate(-10deg) scale(1); opacity: 0.4; }
        }
        .animate-petal {
          animation: petal ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default DiaDasMulheres;
