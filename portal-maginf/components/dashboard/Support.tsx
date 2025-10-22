'use client'

import { MessageSquare, Phone, Mail, Clock, Plus } from 'lucide-react'

export default function Support() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-title text-maginf-dark">Suporte</h1>
          <p className="text-maginf-gray-dark">Central de atendimento e chamados</p>
        </div>
        <button className="btn-maginf flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Novo Chamado</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-maginf text-center">
          <MessageSquare className="w-12 h-12 text-maginf-orange mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Chat Online</h3>
          <p className="text-sm text-maginf-gray-dark">Atendimento imediato</p>
          <button className="btn-maginf-outline mt-4">Iniciar Chat</button>
        </div>
        
        <div className="card-maginf text-center">
          <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Telefone</h3>
          <p className="text-sm text-maginf-gray-dark">(11) 9999-9999</p>
          <button className="btn-maginf-outline mt-4">Ligar</button>
        </div>
        
        <div className="card-maginf text-center">
          <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Email</h3>
          <p className="text-sm text-maginf-gray-dark">suporte@maginf.com.br</p>
          <button className="btn-maginf-outline mt-4">Enviar Email</button>
        </div>
      </div>

      <div className="card-maginf">
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-maginf-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-maginf-dark mb-2">Em Desenvolvimento</h3>
          <p className="text-maginf-gray-dark">Sistema de chamados será implementado em breve</p>
        </div>
      </div>
    </div>
  )
}
