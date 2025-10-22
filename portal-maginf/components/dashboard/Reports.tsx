'use client'

import { BarChart3, FileText, Download, Calendar } from 'lucide-react'

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-title text-maginf-dark">Relatórios</h1>
          <p className="text-maginf-gray-dark">Análises e métricas personalizadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-maginf text-center">
          <BarChart3 className="w-12 h-12 text-maginf-orange mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Disponibilidade</h3>
          <p className="text-sm text-maginf-gray-dark">Relatório de uptime</p>
          <button className="btn-maginf-outline mt-4">Gerar</button>
        </div>
        
        <div className="card-maginf text-center">
          <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Performance</h3>
          <p className="text-sm text-maginf-gray-dark">Métricas de sistema</p>
          <button className="btn-maginf-outline mt-4">Gerar</button>
        </div>
        
        <div className="card-maginf text-center">
          <Download className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Backup</h3>
          <p className="text-sm text-maginf-gray-dark">Status de backup</p>
          <button className="btn-maginf-outline mt-4">Gerar</button>
        </div>
      </div>

      <div className="card-maginf">
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-maginf-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-maginf-dark mb-2">Em Desenvolvimento</h3>
          <p className="text-maginf-gray-dark">Sistema de relatórios será implementado em breve</p>
        </div>
      </div>
    </div>
  )
}
