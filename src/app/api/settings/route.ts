import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { SETTING_DEFAULTS } from "@/lib/settings";

export async function GET() {
  const rows = await prisma.siteSettings.findMany();
  const result = { ...SETTING_DEFAULTS };
  for (const row of rows) {
    result[row.key] = row.value;
  }
  return NextResponse.json(result);
}

export async function PATCH(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const body = await request.json();

  for (const [key, value] of Object.entries(body)) {
    if (key in SETTING_DEFAULTS) {
      await prisma.siteSettings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
