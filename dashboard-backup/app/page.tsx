'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [partnerId, setPartnerId] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerId.trim()) {
      router.push(`/clientes/${partnerId.trim()}/backups`);
    }
  };

  const quickAccess = [
    { id: '123', name: 'Cliente Demo' },
    { id: '456', name: 'Cliente Teste' },
    { id: '789', name: 'Cliente Exemplo' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="h-6 w-6 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Dashboard de Backup
          </h1>
          <p className="text-gray-600">
            MAGINF Tecnologia - Monitoramento Multi-API
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700 mb-2">
              ID do Cliente
            </label>
            <input
              type="text"
              id="partnerId"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              placeholder="Digite o ID do cliente..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Acessar Dashboard
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Acesso Rápido
          </h3>
          <div className="space-y-2">
            {quickAccess.map((client) => (
              <button
                key={client.id}
                onClick={() => router.push(`/clientes/${client.id}/backups`)}
                className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md border border-gray-200 hover:border-gray-300 transition-colors duration-200"
              >
                <div className="font-medium">{client.name}</div>
                <div className="text-xs text-gray-500">ID: {client.id}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Acesso Rápido
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button
              onClick={() => router.push('/clientes')}
              className="text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md border border-blue-200 hover:border-blue-300 transition-colors duration-200"
            >
              <div className="font-medium">📋 Clientes MAGINF</div>
              <div className="text-xs text-blue-600">Gerenciados pela plataforma MAGINF</div>
            </button>
            <button
              onClick={() => router.push('/status')}
              className="text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-100 rounded-md border border-blue-200 hover:border-blue-300 transition-colors duration-200"
            >
              <div className="font-medium">⚙️ Status do Sistema</div>
              <div className="text-xs text-blue-600">Monitorar perfis e APIs</div>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500">
            <p>Dashboard Multi-API para monitoramento de backup</p>
            <p className="mt-1">N-able Cove - MAGINF Tecnologia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
