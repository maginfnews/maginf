'use client'

import { useState, useEffect } from 'react'
import { MonitoringData } from '@/lib/types/monitoring'

interface UseMonitoringDataOptions {
  refreshInterval?: number // em milissegundos
  autoRefresh?: boolean
}

interface MonitoringDataState {
  data: MonitoringData | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

export function useMonitoringData(options: UseMonitoringDataOptions = {}) {
  const { refreshInterval = 30000, autoRefresh = true } = options
  
  const [state, setState] = useState<MonitoringDataState>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null
  })

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch('/api/site24x7/status')
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Erro na API')
      }
      
      setState({
        data: result.data,
        loading: false,
        error: null,
        lastUpdated: new Date()
      })
      
    } catch (error) {
      console.error('Erro ao buscar dados de monitoramento:', error)
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }))
    }
  }

  // Fetch inicial
  useEffect(() => {
    fetchData()
  }, [])

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  return {
    ...state,
    refresh: fetchData,
    isStale: state.lastUpdated ? 
      Date.now() - state.lastUpdated.getTime() > refreshInterval : false
  }
}

// Hook específico para alertas
export function useAlertsData(period: number = 1) {
  const [state, setState] = useState<{
    data: any[] | null
    loading: boolean
    error: string | null
  }>({
    data: null,
    loading: true,
    error: null
  })

  const fetchAlerts = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch(`/api/site24x7/alerts?period=${period}&limit=20`)
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Erro na API de alertas')
      }
      
      setState({
        data: result.data.alarms,
        loading: false,
        error: null
      })
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }))
    }
  }

  useEffect(() => {
    fetchAlerts()
  }, [period])

  return {
    ...state,
    refresh: fetchAlerts
  }
}

// Hook para testar conectividade
export function useConnectionTest() {
  const [state, setState] = useState<{
    isConnected: boolean | null
    testing: boolean
    error: string | null
    lastTest: Date | null
  }>({
    isConnected: null,
    testing: false,
    error: null,
    lastTest: null
  })

  const testConnection = async () => {
    try {
      setState(prev => ({ ...prev, testing: true, error: null }))
      
      const response = await fetch('/api/site24x7/test')
      const result = await response.json()
      
      setState({
        isConnected: result.success,
        testing: false,
        error: result.success ? null : result.error,
        lastTest: new Date()
      })
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        testing: false,
        isConnected: false,
        error: error instanceof Error ? error.message : 'Erro de conexão'
      }))
    }
  }

  return {
    ...state,
    test: testConnection
  }
}
