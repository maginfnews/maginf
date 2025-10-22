import { NextResponse } from "next/server";

export async function GET() {
  const profiles = {
    profiles: {
      maginf: {
        name: "MAGINF Tecnologia",
        api_key: "Vp?Fm$k@il!1M6298b0B!y$v",
        partner_id: "2871061",
        status: "blocked_until_28min"
      },
      bonneville: {
        name: "Bonneville",
        api_key: "9WC!cvB2j?%h3h$4^iA6p%y2", 
        partner_id: "BONNEVILLE",
        status: "blocked_until_16min"
      }
    },
    active: process.env.COVE_PARTNER_ID === "2871061" ? "maginf" : "bonneville",
    demo_mode: true,
    current_env: {
      api_key: process.env.COVE_API_KEY ? 
        `${process.env.COVE_API_KEY.substring(0, 10)}...` : 
        'NOT DEFINED',
      partner_id: process.env.COVE_PARTNER_ID || 'NOT DEFINED'
    }
  };

  return NextResponse.json(profiles);
}
