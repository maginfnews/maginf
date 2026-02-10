import React from 'react';
import { Sparkles, PartyPopper, Music, Sun, Umbrella } from 'lucide-react';

const CarnavalBrasil = () => {
  return (
    <section className="relative bg-gradient-to-br from-yellow-50 via-pink-100 to-blue-50 py-16 overflow-hidden">
      {/* Confetes animados */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-carnaval-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
              background: `linear-gradient(135deg, hsl(${Math.random()*360},90%,70%) 0%, hsl(${Math.random()*360},90%,80%) 100%)`,
              opacity: 0.7,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <div className="container-max relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <PartyPopper className="h-12 w-12 text-pink-500 animate-bounce" />
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
              Carnaval Brasil 2026
            </h2>
            <Music className="h-12 w-12 text-blue-500 animate-bounce" style={{animationDelay: '0.5s'}} />
          </div>
          <p className="text-2xl text-pink-700 font-light max-w-2xl mx-auto">
            Viva a alegria, a criatividade e a energia do maior espetáculo do mundo!
          </p>
        </div>

        {/* Main Card */}
        <div className="relative group mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-2xl border border-white/50">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-pink-100 to-yellow-100 p-6 rounded-2xl">
                    <Umbrella className="h-12 w-12 text-pink-600" />
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-pink-700">
                  MAGINF celebra o Carnaval!
                </h3>
                <p className="text-pink-600 leading-relaxed">
                  O Carnaval é tempo de festa, união, diversidade e criatividade.\n\nA MAGINF deseja a todos um período de muita alegria, segurança e tecnologia para curtir com tranquilidade!\n\nSe precisar de suporte, estamos aqui 24/7, mesmo nos dias de folia!
                </p>
                <div className="pt-4 border-t border-pink-200">
                  <p className="text-sm text-yellow-700 italic flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>Curta com responsabilidade e proteção digital!</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dicas de Carnaval */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            {
              icon: PartyPopper,
              title: 'Alegria e Diversidade',
              description: 'Valorize a cultura, respeite as diferenças e celebre com todos!',
              color: 'from-pink-400 to-yellow-400',
              bgColor: 'from-pink-50 to-yellow-50'
            },
            {
              icon: Sun,
              title: 'Cuide da Saúde',
              description: 'Hidrate-se, use protetor solar e aproveite com energia!',
              color: 'from-yellow-400 to-blue-400',
              bgColor: 'from-yellow-50 to-blue-50'
            },
            {
              icon: Sparkles,
              title: 'Proteção Digital',
              description: 'Evite golpes online, proteja seus dados e compartilhe só com quem confia.',
              color: 'from-blue-400 to-pink-400',
              bgColor: 'from-blue-50 to-pink-50'
            }
          ].map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div 
                key={index}
                className="group relative"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tip.color} rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                <div className={`relative bg-gradient-to-br ${tip.bgColor} rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 h-full`}>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`bg-gradient-to-r ${tip.color} p-3 rounded-full`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-pink-700">{tip.title}</h4>
                    <p className="text-sm text-pink-600">{tip.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensagem final */}
        <div className="mt-10 text-center">
          <p className="text-pink-700 text-lg flex items-center justify-center space-x-2">
            <span className="text-2xl">🎉</span>
            <span>Carnaval Brasil: Tecnologia, alegria e segurança com a MAGINF!</span>
            <span className="text-2xl">🎉</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes carnaval-confetti {
          0% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(40px) scale(1.2); opacity: 0.5; }
          100% { transform: translateY(80px) scale(1); opacity: 0.7; }
        }
        .animate-carnaval-confetti {
          animation: carnaval-confetti linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CarnavalBrasil;
