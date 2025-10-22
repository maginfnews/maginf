'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import useSWR from 'swr';
import DashboardHeader from '@/components/DashboardHeader';
import KPICards from '@/components/KPICards';
import BackupFilters from '@/components/BackupFilters';
import BackupTable from '@/components/BackupTable';
import Pagination from '@/components/Pagination';
import { BackupResponse, BackupStatus } from '@/lib/types';
import { formatDateBR } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json();
});

export default function BackupDashboard() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const partnerId = params.partnerId as string;
  
  // Estados dos filtros
  const [filters, setFilters] = useState<{ q?: string; status?: BackupStatus }>({
    q: searchParams.get('q') || undefined,
    status: (searchParams.get('status') as BackupStatus) || undefined
  });
  
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );
  
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get('pageSize')) || 50
  );

  // Construir URL da API
  const buildApiUrl = useCallback(() => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const url = new URL(`/api/cliente/${partnerId}/backups`, baseUrl);
    
    if (filters.q) url.searchParams.set('q', filters.q);
    if (filters.status) url.searchParams.set('status', filters.status);
    
    url.searchParams.set('page', currentPage.toString());
    url.searchParams.set('pageSize', pageSize.toString());
    
    return url.toString();
  }, [partnerId, filters, currentPage, pageSize]);

  // Fetch dos dados
  const { data, error, isLoading, mutate } = useSWR<BackupResponse>(
    buildApiUrl(),
    fetcher,
    {
      refreshInterval: 30000, // Refresh a cada 30 segundos
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  );

  // Atualizar URL quando filtros mudarem
  const updateUrl = useCallback(() => {
    const url = new URL(window.location.href);
    
    // Limpar parâmetros existentes
    url.searchParams.delete('q');
    url.searchParams.delete('status');
    url.searchParams.delete('page');
    url.searchParams.delete('pageSize');
    
    // Adicionar novos parâmetros
    if (filters.q) url.searchParams.set('q', filters.q);
    if (filters.status) url.searchParams.set('status', filters.status);
    if (currentPage > 1) url.searchParams.set('page', currentPage.toString());
    if (pageSize !== 50) url.searchParams.set('pageSize', pageSize.toString());
    
    router.replace(url.pathname + url.search);
  }, [filters, currentPage, pageSize, router]);

  // Handlers
  const handleFilterChange = useCallback((newFilters: { q?: string; status?: BackupStatus }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset para primeira página
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset para primeira página
  }, []);

  const handleRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  // Atualizar URL quando estados mudarem
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  // Calcular total de páginas
  const totalPages = data ? Math.ceil(data.meta.total / pageSize) : 0;

  // Tratamento de erro
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg 
                className="h-8 w-8 text-red-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erro ao carregar dados
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error.message}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleRefresh}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title="Dashboard de Backup"
        subtitle={`Última atualização: ${data ? formatDateBR(data.meta.lastSyncAt) : '—'}`}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* KPIs */}
          {data && (
            <KPICards 
              kpis={data.kpis}
            />
          )}

          {/* Filtros */}
          <BackupFilters 
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />

          {/* Tabela */}
          <BackupTable 
            items={data?.items || []}
            loading={isLoading}
            onRefresh={handleRefresh}
          />

          {/* Paginação */}
          {data && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={data.meta.total}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
