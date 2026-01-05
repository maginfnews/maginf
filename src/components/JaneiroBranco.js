import React from 'react';
import { Heart, Brain, Sparkles, Sun } from 'lucide-react';

const JaneiroBranco = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-100 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container-max relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <Brain className="relative h-10 w-10 text-blue-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Janeiro Branco 2026
              </h2>
              <div className="relative">
                <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl opacity-50 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <Heart className="relative h-10 w-10 text-purple-500" />
              </div>
            </div>
            
            <p className="text-xl text-gray-700 font-light max-w-2xl mx-auto">
              Um novo ano, um novo começo. Cuide da sua <span className="font-semibold text-blue-600">saúde mental</span> com carinho 🤍
            </p>
          </div>

          {/* Main Message Card */}
          <div className="relative group mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 md:p-10 shadow-2xl border border-white/50">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-50"></div>
                    <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl">
                      <Sparkles className="h-12 w-12 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Sua mente merece atenção e cuidado
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    A <span className="font-semibold text-blue-600">MAGINF Tecnologia</span> se une ao 
                    <span className="font-semibold text-purple-600"> Janeiro Branco</span> para promover a importância 
                    da saúde mental e bem-estar emocional. Assim como cuidamos da tecnologia da sua empresa, 
                    incentivamos você a cuidar da sua mente.
                  </p>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 italic flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <span>Comece o ano priorizando o que realmente importa: você!</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: 'Autocuidado',
                description: 'Reserve tempo para si mesmo. Pequenos momentos fazem diferença.',
                color: 'from-pink-400 to-rose-400',
                bgColor: 'from-pink-50 to-rose-50'
              },
              {
                icon: Brain,
                title: 'Busque ajuda',
                description: 'Conversar com profissionais é um ato de coragem e inteligência.',
                color: 'from-blue-400 to-cyan-400',
                bgColor: 'from-blue-50 to-cyan-50'
              },
              {
                icon: Sparkles,
                title: 'Novos hábitos',
                description: 'Cultive práticas saudáveis para mente e corpo em 2026.',
                color: 'from-purple-400 to-indigo-400',
                bgColor: 'from-purple-50 to-indigo-50'
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
                      <h4 className="font-bold text-gray-800">{tip.title}</h4>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Message */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm flex items-center justify-center space-x-2">
              <span className="text-2xl">🤍</span>
              <span>Janeiro Branco: Quem cuida da mente, cuida da vida</span>
              <span className="text-2xl">🤍</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.3;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
};

export default JaneiroBranco;
