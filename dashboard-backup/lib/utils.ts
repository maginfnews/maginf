import { BackupStatus, BackupKind, BackupItem, BackupKPIs } from './types';
import { createHash } from 'crypto';

// Mapeamento de status do Cove
export const mapCoveStatus = (s: string): BackupStatus => {
  const statusMap: Record<string, BackupStatus> = {
    "Success": "Success",
    "Failed": "Failed", 
    "Completed with errors": "CompletedWithErrors",
    "In progress": "InProgress",
    "Never run": "NeverRun"
  };
  return statusMap[s] ?? "Unknown";
};

// Mapeamento de status genérico (API B)
export const mapGenericStatus = (s: string): BackupStatus => {
  const key = s.toLowerCase();
  if (["ok", "success", "successful"].includes(key)) return "Success";
  if (["warn", "warning", "partial", "partial_success"].includes(key)) return "CompletedWithErrors";
  if (["error", "fail", "failed"].includes(key)) return "Failed";
  if (["running", "inprogress", "in_progress"].includes(key)) return "InProgress";
  if (["never", "never_run", "neverrun"].includes(key)) return "NeverRun";
  return "Unknown";
};

// Mapeamento de tipo de dispositivo
export const mapType = (t?: string): BackupKind => 
  t?.toLowerCase().includes("server") ? "Server" : "Workstation";

// Conversão para ISO string
export const toISO = (v: any): string | undefined => 
  v ? new Date(v).toISOString() : undefined;

// Geração de hash para ID
export const generateId = (source: string, deviceName: string): string => {
  return createHash('sha1').update(`${source}:${deviceName}`).digest('hex').substring(0, 12);
};

// Formatação de data para pt-BR
export const formatDateBR = (isoString?: string): string => {
  if (!isoString) return "—";
  
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
  }).format(date);
};

// Cálculo de KPIs
export const calculateKPIs = (items: BackupItem[]): BackupKPIs => {
  const total = items.length;
  const success = items.filter(i => i.lastStatus === "Success").length;
  const warnings = items.filter(i => i.lastStatus === "CompletedWithErrors").length;
  const failed = items.filter(i => i.lastStatus === "Failed").length;
  const inProgress = items.filter(i => i.lastStatus === "InProgress").length;
  const neverRun = items.filter(i => i.lastStatus === "NeverRun").length;

  return { total, success, warnings, failed, inProgress, neverRun };
};

// Paginação
export const paginate = <T>(items: T[], page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    items: items.slice(startIndex, endIndex),
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize)
  };
};

// Sanitização de parâmetros
export const sanitizeString = (str?: string): string | undefined => {
  if (!str) return undefined;
  return str.replace(/[<>\"'&]/g, '').trim();
};

export const sanitizeNumber = (num?: string | number): number => {
  if (typeof num === 'number') return Math.max(1, Math.floor(num));
  if (!num) return 1;
  const parsed = parseInt(num.toString(), 10);
  return isNaN(parsed) ? 1 : Math.max(1, parsed);
};

// Cores por status
export const getStatusColor = (status: BackupStatus): string => {
  const colors: Record<BackupStatus, string> = {
    Success: "text-green-600 bg-green-50 border-green-200",
    Failed: "text-red-600 bg-red-50 border-red-200", 
    CompletedWithErrors: "text-yellow-600 bg-yellow-50 border-yellow-200",
    InProgress: "text-blue-600 bg-blue-50 border-blue-200",
    NeverRun: "text-gray-600 bg-gray-50 border-gray-200",
    Unknown: "text-gray-600 bg-gray-50 border-gray-200"
  };
  return colors[status];
};

// Labels em português
export const getStatusLabel = (status: BackupStatus): string => {
  const labels: Record<BackupStatus, string> = {
    Success: "Sucesso",
    Failed: "Falhou",
    CompletedWithErrors: "Com Avisos", 
    InProgress: "Em Progresso",
    NeverRun: "Nunca Executou",
    Unknown: "Desconhecido"
  };
  return labels[status];
};

export const getSourceLabel = (source: string): string => {
  const labels: Record<string, string> = {
    A: "Servidores",
    B: "Estações"
  };
  return labels[source] || source;
};
