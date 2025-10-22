'use client'

import { 
  Server, 
  Monitor, 
  MoreVertical, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  HardDrive,
  MemoryStick,
  Network
} from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

// Dados de demonstração
const serversData = [
  {
    id: 'srv-file01',
    name: 'SRV-FILE01',
    type: 'Servidor',
    status: 'online',
    uptime: '99.8%',
    cpu: 37,
    memory: 42,
    disk: 60,
    lastCheckin: '2 min atrás',
    ip: '192.168.1.10',
    os: 'Windows Server 2022',
    location: 'Datacenter Principal'
  },
  {
    id: 'srv-db01',
    name: 'SRV-DATABASE01',
    type: 'Servidor',
    status: 'warning',
    uptime: '98.2%',
    cpu: 85,
    memory: 78,
    disk: 95,
    lastCheckin: '1 min atrás',
    ip: '192.168.1.11',
    os: 'Windows Server 2019',
    location: 'Datacenter Principal'
  },
  {
    id: 'srv-web01',
    name: 'SRV-WEB01',
    type: 'Servidor',
    status: 'offline',
    uptime: '0%',
    cpu: 0,
    memory: 0,
    disk: 0,
    lastCheckin: '15 min atrás',
    ip: '192.168.1.12',
    os: 'Ubuntu Server 22.04',
    location: 'Datacenter Secundário'
  }
]

const workstationsData = [
  {
    id: 'pc-contabil01',
    name: 'PC-CONTABILIDADE',
    type: 'Estação',
    status: 'online',
    uptime: '98.2%',
    cpu: 22,
    memory: 53,
    disk: 72,
    lastCheckin: '5 min atrás',
    ip: '192.168.1.101',
    os: 'Windows 11 Pro',
    user: 'Maria Silva'
  },
  {
    id: 'pc-vendas03',
    name: 'PC-VENDAS03',
    type: 'Estação',
    status: 'warning',
    uptime: '95.1%',
    cpu: 45,
    memory: 67,
    disk: 88,
    lastCheckin: '12 min atrás',
    ip: '192.168.1.103',
    os: 'Windows 10 Pro',
    user: 'João Santos'
  },
  {
    id: 'pc-recepcao',
    name: 'PC-RECEPCAO',
    type: 'Estação',
    status: 'online',
    uptime: '99.5%',
    cpu: 15,
    memory: 35,
    disk: 45,
    lastCheckin: '3 min atrás',
    ip: '192.168.1.105',
    os: 'Windows 11 Pro',
    user: 'Ana Costa'
  }
]

export default function ServersStations() {
  const [activeTab, setActiveTab] = useState('servers')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const currentData = activeTab === 'servers' ? serversData : workstationsData

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-status-online" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-status-warning" />
      case 'offline':
        return <XCircle className="w-4 h-4 text-status-offline" />
      default:
        return <Clock className="w-4 h-4 text-maginf-gray-dark" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
    switch (status) {
      case 'online':
        return `${baseClasses} status-online`
      case 'warning':
        return `${baseClasses} status-warning`
      case 'offline':
        return `${baseClasses} status-offline`
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`
    }
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-title text-maginf-dark">Servidores & Estações</h1>
          <p className="text-maginf-gray-dark">Monitoramento detalhado da infraestrutura</p>
        </div>
        <button className="btn-maginf flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-maginf">
        <button
          onClick={() => setActiveTab('servers')}
          className={clsx(
            'flex items-center space-x-2 px-4 py-2 rounded-maginf text-sm font-medium transition-colors',
            activeTab === 'servers'
              ? 'bg-white text-maginf-orange shadow-sm'
              : 'text-maginf-gray-dark hover:text-maginf-dark'
          )}
        >
          <Server className="w-4 h-4" />
          <span>Servidores ({serversData.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('workstations')}
          className={clsx(
            'flex items-center space-x-2 px-4 py-2 rounded-maginf text-sm font-medium transition-colors',
            activeTab === 'workstations'
              ? 'bg-white text-maginf-orange shadow-sm'
              : 'text-maginf-gray-dark hover:text-maginf-dark'
          )}
        >
          <Monitor className="w-4 h-4" />
          <span>Estações ({workstationsData.length})</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-maginf">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-status-online" />
            <div>
              <div className="text-2xl font-bold text-maginf-dark">
                {currentData.filter(item => item.status === 'online').length}
              </div>
              <div className="text-sm text-maginf-gray-dark">Online</div>
            </div>
          </div>
        </div>
        
        <div className="card-maginf">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-status-warning" />
            <div>
              <div className="text-2xl font-bold text-maginf-dark">
                {currentData.filter(item => item.status === 'warning').length}
              </div>
              <div className="text-sm text-maginf-gray-dark">Aviso</div>
            </div>
          </div>
        </div>
        
        <div className="card-maginf">
          <div className="flex items-center space-x-3">
            <XCircle className="w-8 h-8 text-status-offline" />
            <div>
              <div className="text-2xl font-bold text-maginf-dark">
                {currentData.filter(item => item.status === 'offline').length}
              </div>
              <div className="text-sm text-maginf-gray-dark">Offline</div>
            </div>
          </div>
        </div>
        
        <div className="card-maginf">
          <div className="flex items-center space-x-3">
            <Network className="w-8 h-8 text-maginf-orange" />
            <div>
              <div className="text-2xl font-bold text-maginf-dark">{currentData.length}</div>
              <div className="text-sm text-maginf-gray-dark">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card-maginf">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-maginf-gray">
                <th className="text-left py-3 px-4 font-medium text-maginf-dark">Host</th>
                <th className="text-left py-3 px-4 font-medium text-maginf-dark">Status</th>
                <th className="text-left py-3 px-4 font-medium text-maginf-dark">Uptime</th>
                <th className="text-left py-3 px-4 font-medium text-maginf-dark">CPU</th>
                <th className="text-left py-3 px-4 font-medium text-maginf-dark">Memória</th>
                <th className="text-left py-3 px-4 font-medium text-maginf-dark">Disco</th>
                <th className="text-left py-3 px-4 font-medium text-maginf-dark">Último Check-in</th>
                <th className="text-left py-3 px-4 font-medium text-maginf-dark">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <div className="font-medium text-maginf-dark">{item.name}</div>
                        <div className="text-sm text-maginf-gray-dark">{item.ip}</div>
                        {activeTab === 'workstations' && 'user' in item && (
                          <div className="text-xs text-maginf-gray-dark">👤 {item.user}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(item.status)}>
                      {item.status === 'online' ? 'Online' : 
                       item.status === 'warning' ? 'Aviso' : 'Offline'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-maginf-dark">{item.uptime}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(item.cpu)}`}
                          style={{ width: `${item.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{item.cpu}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(item.memory)}`}
                          style={{ width: `${item.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{item.memory}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(item.disk)}`}
                          style={{ width: `${item.disk}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{item.disk}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-maginf-gray-dark" />
                      <span className="text-sm text-maginf-gray-dark">{item.lastCheckin}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-maginf-gray-dark" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
