'use client'

import { 
  Server, 
  Monitor, 
  HardDrive, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Activity,
  RefreshCw
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState, useEffect } from 'react'

// Dados de demonstração
const statusData = {
  servers: { online: 12, offline: 1, warning: 2, total: 15 },
  workstations: { online: 45, offline: 3, warning: 7, total: 55 },
  backups: { success: 28, failed: 2, warning: 3, total: 33 },
  alerts: { critical: 1, warning: 4, resolved: 12, total: 17 }
}

const uptimeData = [
  { name: 'Seg', uptime: 99.2 },
  { name: 'Ter', uptime: 98.8 },
  { name: 'Qua', uptime: 99.5 },
  { name: 'Qui', uptime: 99.9 },
  { name: 'Sex', uptime: 99.1 },
  { name: 'Sáb', uptime: 99.7 },
  { name: 'Dom', uptime: 99.3 },
]

const backupStatusData = [
  { name: 'Sucesso', value: 28, color: '#10b981' },
  { name: 'Falha', value: 2, color: '#ef4444' },
  { name: 'Aviso', value: 3, color: '#f59e0b' },
]

const recentAlerts = [
  { id: 1, type: 'critical', message: 'SRV-DATABASE01 - Disco C: 95% cheio', time: '2 min atrás' },
  { id: 2, type: 'warning', message: 'PC-VENDAS03 - Backup atrasado', time: '15 min atrás' },
  { id: 3, type: 'success', message: 'SRV-FILE01 - Voltou online', time: '1h atrás' },
  { id: 4, type: 'warning', message: 'Rede principal - Latência alta', time: '2h atrás' },
]

export default function MainDashboard() {
  const [monitoringData, setMonitoringData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Usar API mock por enquanto (Site24x7 requer token válido)
      const response = await fetch('/api/site24x7/status-mock')
      const result = await response.json()
      
      if (result.success) {
        setMonitoringData(result.data)
        setLastUpdated(new Date())
      } else {
        setError(result.error || 'Erro ao carregar dados')
      }
    } catch (err) {
      setError('Erro de conexão')
      console.error('Erro ao buscar dados:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    
    // Auto-refresh a cada 30 segundos
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Usar dados da API ou fallback para dados estáticos
  const currentData = monitoringData || {
    status: statusData,
    alerts: recentAlerts
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-title text-maginf-dark">Dashboard Principal</h1>
          <p className="text-maginf-gray-dark">Visão geral do ambiente tecnológico</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-maginf-orange text-white rounded-maginf hover:bg-maginf-orange-dark transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </button>
          <div className="flex items-center space-x-2 text-sm text-maginf-gray-dark">
            <Activity className="w-4 h-4" />
            <span>
              {error ? 'Erro na conexão' : 
               lastUpdated ? `Atualizado ${lastUpdated.toLocaleTimeString()}` : 
               'Carregando...'}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-maginf p-4">
          <div className="flex items-center space-x-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Servidores */}
        <div className="card-maginf">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-maginf flex items-center justify-center">
                <Server className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-maginf-dark">Servidores</h3>
                <p className="text-sm text-maginf-gray-dark">Status geral</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-online">Online</span>
              <span className="font-medium">{currentData.status.servers.online}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-warning">Aviso</span>
              <span className="font-medium">{currentData.status.servers.warning}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-offline">Offline</span>
              <span className="font-medium">{currentData.status.servers.offline}</span>
            </div>
          </div>
        </div>

        {/* Estações */}
        <div className="card-maginf">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-maginf flex items-center justify-center">
                <Monitor className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-maginf-dark">Estações</h3>
                <p className="text-sm text-maginf-gray-dark">Workstations</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-online">Ativas</span>
              <span className="font-medium">{currentData.status.workstations.online}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-warning">Aviso</span>
              <span className="font-medium">{currentData.status.workstations.warning}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-offline">Inativas</span>
              <span className="font-medium">{currentData.status.workstations.offline}</span>
            </div>
          </div>
        </div>

        {/* Backups */}
        <div className="card-maginf">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-maginf flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-maginf-dark">Backups</h3>
                <p className="text-sm text-maginf-gray-dark">Última execução</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-online">Sucesso</span>
              <span className="font-medium">{currentData.status.services?.running || 15}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-warning">Aviso</span>
              <span className="font-medium">{currentData.status.services?.warning || 2}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-offline">Falha</span>
              <span className="font-medium">{statusData.backups.failed}</span>
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div className="card-maginf">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-maginf flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-maginf-dark">Alertas</h3>
                <p className="text-sm text-maginf-gray-dark">Últimas 24h</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-critical">Crítico</span>
              <span className="font-medium">{statusData.alerts.critical}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-warning">Aviso</span>
              <span className="font-medium">{statusData.alerts.warning}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-status-online">Resolvido</span>
              <span className="font-medium">{statusData.alerts.resolved}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uptime Chart */}
        <div className="card-maginf">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-maginf-dark">Disponibilidade (7 dias)</h3>
            <TrendingUp className="w-4 h-4 text-maginf-orange" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={uptimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} domain={[98, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Uptime']}
              />
              <Line 
                type="monotone" 
                dataKey="uptime" 
                stroke="#ff6a00" 
                strokeWidth={2}
                dot={{ fill: '#ff6a00', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Backup Status Pie */}
        <div className="card-maginf">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-maginf-dark">Status dos Backups</h3>
            <HardDrive className="w-4 h-4 text-maginf-orange" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={backupStatusData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {backupStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #d1d5db',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {backupStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-maginf-gray-dark">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="card-maginf">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-maginf-dark">Alertas Recentes</h3>
          <button className="text-sm text-maginf-orange hover:text-maginf-orange-dark">
            Ver todos
          </button>
        </div>
        <div className="space-y-3">
          {(currentData.alerts || recentAlerts).slice(0, 4).map((alert: any) => (
            <div key={alert.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-maginf">
              <div className="flex-shrink-0">
                {alert.type === 'critical' && (
                  <XCircle className="w-5 h-5 text-status-critical" />
                )}
                {alert.type === 'warning' && (
                  <AlertTriangle className="w-5 h-5 text-status-warning" />
                )}
                {alert.type === 'success' && (
                  <CheckCircle className="w-5 h-5 text-status-online" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-maginf-dark">{alert.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-maginf-gray-dark" />
                  <span className="text-xs text-maginf-gray-dark">{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
