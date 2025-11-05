import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-maginf-gray to-maginf-gray-light flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <img 
            src="/logo-maginf-oficial.svg" 
            alt="MAGINF" 
            className="h-24 w-auto mx-auto"
          />
        </div>

        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-maginf-orange/30 border-t-maginf-orange rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Text */}
        <p className="text-white mt-6 text-lg font-medium">
          Carregando...
        </p>
      </div>
    </div>
  );
};

export default Loading;
