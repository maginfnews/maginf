'use client';

import { useState, useEffect } from 'react';
import { BackupStatus, BackupSource } from '@/lib/types';
import { getStatusLabel, getSourceLabel } from '@/lib/utils';

interface BackupFiltersProps {
  onFilterChange: (filters: {
    q?: string;
    status?: BackupStatus;
  }) => void;
  initialFilters?: {
    q?: string;
    status?: BackupStatus;
  };
}

export default function BackupFilters({ onFilterChange, initialFilters }: BackupFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters?.q || '');
  const [selectedStatus, setSelectedStatus] = useState<BackupStatus | ''>
    (initialFilters?.status || '');

  // Debounce para busca por texto
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({
        q: searchTerm || undefined,
        status: selectedStatus || undefined
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedStatus, onFilterChange]);

  const statusOptions: Array<{ value: BackupStatus | ''; label: string }> = [
    { value: '', label: 'Todos os Status' },
    { value: 'Success', label: getStatusLabel('Success') },
    { value: 'CompletedWithErrors', label: getStatusLabel('CompletedWithErrors') },
    { value: 'Failed', label: getStatusLabel('Failed') },
    { value: 'InProgress', label: getStatusLabel('InProgress') },
    { value: 'NeverRun', label: getStatusLabel('NeverRun') },
    { value: 'Unknown', label: getStatusLabel('Unknown') }
  ];


  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
  };

  const hasActiveFilters = searchTerm || selectedStatus;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Busca por nome */}
          <div className="flex-1 min-w-0">
            <label htmlFor="search" className="sr-only">
              Buscar dispositivo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg 
                  className="h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                placeholder="Buscar por nome do dispositivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Buscar dispositivo por nome"
              />
            </div>
          </div>

          {/* Filtro por Status */}
          <div className="sm:w-48">
            <label htmlFor="status-filter" className="sr-only">
              Filtrar por status
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as BackupStatus | '')}
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Filtrar por status do backup"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Botão Limpar Filtros */}
        {hasActiveFilters && (
          <div className="flex-shrink-0">
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Limpar todos os filtros"
            >
              <svg 
                className="h-4 w-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
              Limpar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Indicadores de filtros ativos */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Busca: "{searchTerm}"
            </span>
          )}
          {selectedStatus && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Status: {getStatusLabel(selectedStatus)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
