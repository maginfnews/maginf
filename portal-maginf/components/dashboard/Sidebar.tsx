'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Home, 
  Server, 
  HardDrive, 
  AlertTriangle, 
  BarChart3, 
  Headphones,
  ChevronLeft,
  ChevronRight,
  Settings,
  Users
} from 'lucide-react'
import clsx from 'clsx'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'servers', label: 'Servidores & Estações', icon: Server },
  { id: 'inventory', label: 'Inventário & Backup', icon: HardDrive },
  { id: 'alerts', label: 'Alertas & Incidentes', icon: AlertTriangle },
  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  { id: 'support', label: 'Suporte', icon: Headphones },
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { data: session } = useSession()
  
  const isAdmin = session?.user?.role === 'ADMIN'

  return (
    <div className={clsx(
      'bg-maginf-dark text-white transition-all duration-300 flex flex-col',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="p-4 border-b border-maginf-dark-light">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-maginf-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-title font-bold text-sm">M</span>
              </div>
              <div>
                <div className="font-title text-sm font-bold">MAGINF</div>
                <div className="text-xs text-maginf-gray">Portal</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-maginf-dark-light rounded transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-3 py-2.5 rounded-maginf transition-colors text-left',
                    isActive 
                      ? 'bg-maginf-orange text-white shadow-maginf' 
                      : 'text-maginf-gray hover:bg-maginf-dark-light hover:text-white'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={clsx('flex-shrink-0', isCollapsed ? 'w-5 h-5' : 'w-4 h-4')} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            )
          })}
          
          {/* Menu de Administração (apenas para ADMIN) */}
          {isAdmin && (
            <>
              <li className="pt-4 mt-4 border-t border-maginf-dark-light">
                <div className={clsx(
                  'px-3 py-2 text-xs font-medium text-maginf-gray-light uppercase tracking-wider',
                  isCollapsed && 'text-center'
                )}>
                  {!isCollapsed ? 'Administração' : 'ADM'}
                </div>
              </li>
              <li>
                <a
                  href="/admin"
                  className={clsx(
                    'w-full flex items-center space-x-3 px-3 py-2.5 rounded-maginf transition-colors text-left',
                    'text-maginf-gray hover:bg-maginf-dark-light hover:text-white'
                  )}
                  title={isCollapsed ? 'Gerenciar Clientes' : undefined}
                >
                  <Users className={clsx('flex-shrink-0', isCollapsed ? 'w-5 h-5' : 'w-4 h-4')} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">Gerenciar Clientes</span>
                  )}
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-maginf-dark-light">
          <div className="text-xs text-maginf-gray text-center">
            <div className="mb-1">Portal MAGINF v1.0</div>
            <div>© 2024 MAGINF Tecnologia</div>
          </div>
        </div>
      )}
    </div>
  )
}
