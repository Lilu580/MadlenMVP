import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      colors: { include: { images: { orderBy: { position: "asc" } } } },
      descriptions: { orderBy: { position: "asc" } },
    },
  });
  if (!product) {
    return NextResponse.json({ error: "Не знайдено" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();
  const { name, article, categoryId, priceMain, priceDiscount, colors, descriptions } = body;

  // Replace colors and descriptions completely
  await prisma.$transaction([
    prisma.productColor.deleteMany({ where: { productId: id } }),
    prisma.description.deleteMany({ where: { productId: id } }),
  ]);

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      article,
      categoryId,
      priceMain: Number(priceMain),
      priceDiscount: priceDiscount ? Number(priceDiscount) : null,
      colors: {
        create: (colors ?? []).map((c: {
          color: string;
          nameColor: string;
          stock: number;
          images: { url: string; position: number }[];
        }) => ({
          color: c.color,
          nameColor: c.nameColor,
          stock: Number(c.stock),
          images: {
            create: (c.images ?? []).map((img: { url: string; position: number }) => ({
              url: img.url,
              position: img.position,
            })),
          },
        })),
      },
      descriptions: {
        create: (descriptions ?? []).map((d: { title: string; body: string; position: number }) => ({
          title: d.title,
          body: d.body,
          position: d.position,
        })),
      },
    },
    include: {
      category: true,
      colors: { include: { images: true } },
      descriptions: true,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
