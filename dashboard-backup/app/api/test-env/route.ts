import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    env_check: {
      COVE_API_KEY: process.env.COVE_API_KEY ? 
        `${process.env.COVE_API_KEY.substring(0, 10)}...` : 
        'NOT DEFINED',
      COVE_PARTNER_ID: process.env.COVE_PARTNER_ID || 'NOT DEFINED',
      NODE_ENV: process.env.NODE_ENV || 'NOT DEFINED'
    },
    all_cove_vars: Object.keys(process.env)
      .filter(key => key.startsWith('COVE'))
      .reduce((acc, key) => {
        acc[key] = key.includes('KEY') ? 
          `${process.env[key]?.substring(0, 10)}...` : 
          process.env[key] || 'undefined';
        return acc;
      }, {} as Record<string, string>)
  });
}
