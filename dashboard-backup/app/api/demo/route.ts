import { NextResponse } from "next/server";
import { BackupResponse } from "@/lib/types";

// Dados de demonstração mais realistas
const generateDemoData = (partnerId: string) => {
  const devices = [
    { name: "SRV-DC01", status: "Success", lastBackup: "2025-10-20T18:30:00Z" },
    { name: "SRV-FILE01", status: "Success", lastBackup: "2025-10-20T19:15:00Z" },
    { name: "SRV-SQL01", status: "CompletedWithErrors", lastBackup: "2025-10-20T17:45:00Z" },
    { name: "WS-ADMIN01", status: "Failed", lastBackup: "2025-10-19T22:30:00Z" },
    { name: "SRV-WEB01", status: "Success", lastBackup: "2025-10-20T20:00:00Z" },
    { name: "SRV-BACKUP01", status: "InProgress", lastBackup: null },
    { name: "WS-DEV01", status: "Success", lastBackup: "2025-10-20T16:20:00Z" },
    { name: "SRV-MAIL01", status: "NeverRun", lastBackup: null }
  ];

  const items = devices.map((device, index) => ({
    id: `demo-${partnerId}-${index}`,
    deviceName: device.name,
    kind: "Server" as const,
    source: "A" as const,
    lastStatus: device.status as any,
    lastCompletedAt: device.lastBackup || undefined,
    raw: {
      demo: true,
      partnerId,
      device: device.name
    }
  }));

  const kpis = {
    total: items.length,
    success: items.filter(i => i.lastStatus === "Success").length,
    warnings: items.filter(i => i.lastStatus === "CompletedWithErrors").length,
    failed: items.filter(i => i.lastStatus === "Failed").length,
    inProgress: items.filter(i => i.lastStatus === "InProgress").length,
    neverRun: items.filter(i => i.lastStatus === "NeverRun").length
  };

  return { items, kpis };
};

export async function GET() {
  const demoData = generateDemoData("DEMO");
  
  const response: BackupResponse = {
    items: demoData.items,
    meta: {
      total: demoData.items.length,
      page: 1,
      pageSize: 50,
      lastSyncAt: new Date().toISOString()
    },
    kpis: demoData.kpis
  };

  return NextResponse.json(response);
}
