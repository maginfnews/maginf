'use client'

import { HardDrive, Package, Shield, Database } from 'lucide-react'

export default function InventoryBackup() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-title text-maginf-dark">Inventário & Backup</h1>
          <p className="text-maginf-gray-dark">Hardware, software e status de backup</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-maginf text-center">
          <Package className="w-12 h-12 text-maginf-orange mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Hardware</h3>
          <p className="text-sm text-maginf-gray-dark">Inventário completo</p>
        </div>
        
        <div className="card-maginf text-center">
          <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Software</h3>
          <p className="text-sm text-maginf-gray-dark">Licenças e versões</p>
        </div>
        
        <div className="card-maginf text-center">
          <HardDrive className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Backup</h3>
          <p className="text-sm text-maginf-gray-dark">Status e histórico</p>
        </div>
        
        <div className="card-maginf text-center">
          <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="font-medium text-maginf-dark mb-2">Segurança</h3>
          <p className="text-sm text-maginf-gray-dark">Antivírus e proteção</p>
        </div>
      </div>

      <div className="card-maginf">
        <div className="text-center py-12">
          <HardDrive className="w-16 h-16 text-maginf-gray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-maginf-dark mb-2">Em Desenvolvimento</h3>
          <p className="text-maginf-gray-dark">Esta seção será implementada em breve</p>
        </div>
      </div>
    </div>
  )
}
