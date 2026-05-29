import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) {
    return NextResponse.json({ error: "Не знайдено" }, { status: 404 });
  }
  return NextResponse.json(category);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { slug } = await params;
  const body = await request.json();

  const category = await prisma.category.update({
    where: { slug },
    data: {
      title: body.title,
      image: body.image,
      ...(body.slug && body.slug !== slug ? { slug: body.slug } : {}),
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { slug } = await params;

  const productsCount = await prisma.product.count({
    where: { category: { slug } },
  });

  if (productsCount > 0) {
    return NextResponse.json(
      { error: "Спочатку видаліть всі товари цієї категорії" },
      { status: 409 },
    );
  }

  await prisma.category.delete({ where: { slug } });
  return NextResponse.json({ ok: true });
}
