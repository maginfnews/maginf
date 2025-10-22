'use client'

import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AlertsIncidents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-title text-maginf-dark">Alertas & Incidentes</h1>
          <p className="text-maginf-gray-dark">Monitoramento de eventos e alertas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-maginf text-center">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Críticos</h3>
          <div className="text-2xl font-bold text-red-600">2</div>
        </div>
        
        <div className="card-maginf text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Avisos</h3>
          <div className="text-2xl font-bold text-yellow-600">5</div>
        </div>
        
        <div className="card-maginf text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Resolvidos</h3>
          <div className="text-2xl font-bold text-green-600">18</div>
        </div>
        
        <div className="card-maginf text-center">
          <Clock className="w-12 h-12 text-maginf-orange mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Pendentes</h3>
          <div className="text-2xl font-bold text-maginf-orange">3</div>
        </div>
      </div>

      <div className="card-maginf">
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-maginf-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-maginf-dark mb-2">Em Desenvolvimento</h3>
          <p className="text-maginf-gray-dark">Sistema de alertas será implementado em breve</p>
        </div>
      </div>
    </div>
  )
}
