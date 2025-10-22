'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Sidebar from './Sidebar'
import Header from './Header'
import MainDashboard from './MainDashboard'
import ServersStations from './ServersStations'
import InventoryBackup from './InventoryBackup'
import AlertsIncidents from './AlertsIncidents'
import Reports from './Reports'
import Support from './Support'
import { AlertTriangle, X } from 'lucide-react'

interface DashboardProps {
  user: any
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAccessDenied, setShowAccessDenied] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'access_denied') {
      setShowAccessDenied(true)
      // Remover parâmetro da URL após 5 segundos
      setTimeout(() => {
        setShowAccessDenied(false)
        window.history.replaceState({}, '', window.location.pathname)
      }, 5000)
    }
  }, [searchParams])

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MainDashboard />
      case 'servers':
        return <ServersStations />
      case 'inventory':
        return <InventoryBackup />
      case 'alerts':
        return <AlertsIncidents />
      case 'reports':
        return <Reports />
      case 'support':
        return <Support />
      default:
        return <MainDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Alert de Acesso Negado */}
        {showAccessDenied && (
          <div className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-maginf relative">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <div className="flex-1">
                <p className="font-medium">Acesso Negado</p>
                <p className="text-sm">Você tentou acessar uma área restrita. Apenas administradores MAGINF podem acessar a área de administração.</p>
              </div>
              <button
                onClick={() => setShowAccessDenied(false)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fadeInUp">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
