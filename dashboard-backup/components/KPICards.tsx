'use client';

import { BackupKPIs } from '@/lib/types';
import { getSourceLabel } from '@/lib/utils';

interface KPICardsProps {
  kpis: BackupKPIs;
}

interface KPICardProps {
  title: string;
  value: number;
  total: number;
  color: string;
  icon: string;
}

const KPICard = ({ title, value, total, color, icon }: KPICardProps) => {
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline mt-2">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className="ml-2 text-sm text-gray-500">
              de {total} ({percentage}%)
            </p>
          </div>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <span className="text-2xl" role="img" aria-label={title}>
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
};

const MiniKPICard = ({ title, kpis, source }: { 
  title: string; 
  kpis: BackupKPIs; 
  source: string;
}) => (
  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
    <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
    <div className="grid grid-cols-3 gap-2 text-xs">
      <div className="text-center">
        <div className="text-green-600 font-semibold">{kpis.success}</div>
        <div className="text-gray-500">OK</div>
      </div>
      <div className="text-center">
        <div className="text-yellow-600 font-semibold">{kpis.warnings}</div>
        <div className="text-gray-500">Avisos</div>
      </div>
      <div className="text-center">
        <div className="text-red-600 font-semibold">{kpis.failed}</div>
        <div className="text-gray-500">Falhas</div>
      </div>
    </div>
    <div className="mt-2 pt-2 border-t border-gray-200">
      <div className="text-center">
        <div className="text-gray-900 font-semibold">{kpis.total}</div>
        <div className="text-gray-500">Total</div>
      </div>
    </div>
  </div>
);

export default function KPICards({ kpis }: KPICardsProps) {
  const kpiItems = [
    {
      title: "Total de Servidores",
      value: kpis.total,
      total: kpis.total,
      color: "bg-blue-100 text-blue-600",
      icon: "🖥️"
    },
    {
      title: "Backups com Sucesso", 
      value: kpis.success,
      total: kpis.total,
      color: "bg-green-100 text-green-600",
      icon: "✅"
    },
    {
      title: "Com Avisos",
      value: kpis.warnings, 
      total: kpis.total,
      color: "bg-yellow-100 text-yellow-600",
      icon: "⚠️"
    },
    {
      title: "Falharam",
      value: kpis.failed,
      total: kpis.total, 
      color: "bg-red-100 text-red-600",
      icon: "❌"
    },
    {
      title: "Em Progresso",
      value: kpis.inProgress,
      total: kpis.total,
      color: "bg-blue-100 text-blue-600", 
      icon: "🔄"
    },
    {
      title: "Nunca Executaram",
      value: kpis.neverRun,
      total: kpis.total,
      color: "bg-gray-100 text-gray-600",
      icon: "⏸️"
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPIs N-able Cove */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Status de Backup - N-able Cove
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiItems.map((item, index) => (
            <KPICard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
