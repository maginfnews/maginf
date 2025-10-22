export type BackupSource = "A"; // A=Cove (N-able)
export type BackupKind = "Server" | "Workstation";
export type BackupStatus =
  | "Success"
  | "Failed"
  | "CompletedWithErrors"
  | "InProgress"
  | "NeverRun"
  | "Unknown";

export interface BackupItem {
  id: string;                  // estável por fonte
  deviceName: string;
  kind: BackupKind;            // Server
  source: BackupSource;        // "A" (Cove/N-able)
  lastStatus: BackupStatus;
  lastCompletedAt?: string;    // ISO
  raw?: any;                   // payload original (debug)
}

export interface BackupProvider {
  listStatus(params: {
    partnerId: string | number;
    q?: string;
    status?: BackupStatus;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: BackupItem[]; total: number }>;
}

export interface BackupKPIs {
  total: number;
  success: number;
  warnings: number;
  failed: number;
  inProgress: number;
  neverRun: number;
}

export interface BackupResponse {
  items: BackupItem[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    lastSyncAt?: string;
  };
  kpis: BackupKPIs;
}

export interface FilterParams {
  q?: string;
  status?: BackupStatus;
  page?: number;
  pageSize?: number;
}
