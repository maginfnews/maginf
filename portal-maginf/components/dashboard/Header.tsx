'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  Wifi, 
  WifiOff,
  RefreshCw
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Header() {
  const { data: session } = useSession()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOnline, setIsOnline] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notifications] = useState([
    { id: 1, message: 'Servidor SRV-FILE01 voltou online', time: '5 min atrás', type: 'success' },
    { id: 2, message: 'Backup falhou em PC-CONTABIL', time: '15 min atrás', type: 'error' },
    { id: 3, message: 'Atualização de sistema disponível', time: '1h atrás', type: 'info' },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Simular status de conexão
    const connectionCheck = setInterval(() => {
      setIsOnline(navigator.onLine)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(connectionCheck)
    }
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <header className="bg-white border-b border-maginf-gray px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Status and time */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-status-online" />
            ) : (
              <WifiOff className="w-4 h-4 text-status-offline" />
            )}
            <span className="text-sm text-maginf-dark">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <div className="text-sm text-maginf-gray-dark">
            {format(currentTime, "EEEE, dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss", { locale: ptBR })}
          </div>
        </div>

        {/* Right side - Actions and user */}
        <div className="flex items-center space-x-4">
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-100 rounded-maginf transition-colors"
            title="Atualizar dados"
          >
            <RefreshCw className="w-4 h-4 text-maginf-gray-dark" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-maginf transition-colors relative">
              <Bell className="w-4 h-4 text-maginf-gray-dark" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-maginf-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-maginf transition-colors"
            >
              <div className="w-8 h-8 bg-maginf-orange rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm font-medium text-maginf-dark">{session?.user?.name}</div>
                <div className="text-xs text-maginf-gray-dark">{session?.user?.client?.name}</div>
              </div>
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-maginf shadow-maginf-lg border border-maginf-gray z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-maginf-dark">{session?.user?.name}</p>
                  <p className="text-xs text-maginf-gray-dark">{session?.user?.email}</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-maginf-dark hover:bg-gray-50">
                    <Settings className="w-4 h-4 mr-3" />
                    Configurações
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-maginf-dark hover:bg-gray-50">
                    <User className="w-4 h-4 mr-3" />
                    Perfil
                  </button>
                  <button 
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
