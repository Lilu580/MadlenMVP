import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { title: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { slug, title, image } = await request.json();

  if (!slug || !title || !image) {
    return NextResponse.json({ error: "Всі поля обов'язкові" }, { status: 400 });
  }

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug вже існує" }, { status: 409 });
  }

  const category = await prisma.category.create({
    data: { slug, title, image },
  });

  return NextResponse.json(category, { status: 201 });
}
