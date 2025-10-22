'use client';

import { useState, useEffect } from 'react';

interface ProfileStatus {
  name: string;
  api_key: string;
  partner_id: string;
  status: string;
}

interface ProfilesData {
  profiles: Record<string, ProfileStatus>;
  active: string;
  demo_mode: boolean;
}

export default function StatusPage() {
  const [profiles, setProfiles] = useState<ProfilesData | null>(null);
  const [testResults, setTestResults] = useState<Record<string, string>>({});

  useEffect(() => {
    // Carregar perfis da API
    fetch('/api/profiles')
      .then(res => res.json())
      .then(setProfiles)
      .catch(console.error);
  }, []);

  const testProfile = async (profileKey: string, profile: ProfileStatus) => {
    setTestResults(prev => ({ ...prev, [profileKey]: 'testing...' }));
    
    try {
      const response = await fetch('/api/test-env');
      const data = await response.json();
      
      if (data.env_check.COVE_API_KEY !== 'NOT DEFINED') {
        setTestResults(prev => ({ ...prev, [profileKey]: 'configured' }));
      } else {
        setTestResults(prev => ({ ...prev, [profileKey]: 'not_configured' }));
      }
    } catch (error) {
      setTestResults(prev => ({ ...prev, [profileKey]: 'error' }));
    }
  };

  if (!profiles) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando status dos perfis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Status dos Perfis N-able Cove
            </h1>
            <p className="text-gray-600 mt-2">
              Gerenciamento de credenciais e status de conexão
            </p>
          </div>

          <div className="p-6">
            {/* Status Geral */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Status Atual
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Object.keys(profiles.profiles).length}
                  </div>
                  <div className="text-sm text-blue-800">Perfis Configurados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {profiles.active.toUpperCase()}
                  </div>
                  <div className="text-sm text-green-800">Perfil Ativo</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${profiles.demo_mode ? 'text-orange-600' : 'text-green-600'}`}>
                    {profiles.demo_mode ? 'DEMO' : 'REAL'}
                  </div>
                  <div className={`text-sm ${profiles.demo_mode ? 'text-orange-800' : 'text-green-800'}`}>
                    Modo de Operação
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-600">
                    {(profiles as any).current_env?.partner_id || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-800">Partner ID Atual</div>
                </div>
              </div>
            </div>

            {/* Ambiente Atual */}
            {(profiles as any).current_env && (
              <div className="mb-8 p-4 bg-green-50 rounded-lg">
                <h2 className="text-lg font-semibold text-green-900 mb-2">
                  Variáveis de Ambiente Atuais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-green-700 font-medium">API Key:</span>
                    <div className="font-mono text-sm text-green-800 bg-green-100 px-2 py-1 rounded mt-1">
                      {(profiles as any).current_env.api_key}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-green-700 font-medium">Partner ID:</span>
                    <div className="font-mono text-sm text-green-800 bg-green-100 px-2 py-1 rounded mt-1">
                      {(profiles as any).current_env.partner_id}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de Perfis */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Perfis Disponíveis
              </h2>
              
              {Object.entries(profiles.profiles).map(([key, profile]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {profile.name}
                        </h3>
                        {key === profiles.active && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            ATIVO
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">API Key:</span>
                          <span className="ml-2 font-mono">
                            {profile.api_key.substring(0, 10)}...
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Partner ID:</span>
                          <span className="ml-2 font-mono">{profile.partner_id}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <span className="text-gray-500">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          profile.status.includes('blocked') 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {profile.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => testProfile(key, profile)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        disabled={testResults[key] === 'testing...'}
                      >
                        {testResults[key] === 'testing...' ? 'Testando...' : 'Testar'}
                      </button>
                    </div>
                  </div>
                  
                  {testResults[key] && testResults[key] !== 'testing...' && (
                    <div className="mt-3 p-2 rounded text-sm">
                      <span className={`font-medium ${
                        testResults[key] === 'configured' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {testResults[key] === 'configured' 
                          ? '✅ Configurado corretamente' 
                          : '❌ Não configurado'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Links Úteis */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Links Úteis
              </h3>
              <div className="space-y-2">
                <a 
                  href="/api/demo" 
                  className="block text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  📊 API Demo (dados de demonstração)
                </a>
                <a 
                  href="/api/test-env" 
                  className="block text-blue-600 hover:text-blue-800"
                  target="_blank"
                >
                  🔧 Teste de Variáveis de Ambiente
                </a>
                <a 
                  href="/" 
                  className="block text-blue-600 hover:text-blue-800"
                >
                  🏠 Dashboard Principal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
