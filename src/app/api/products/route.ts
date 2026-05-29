import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort") ?? "newest";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 12);

  const where = {
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { article: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [total, products] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy:
        sort === "growth"
          ? { priceMain: "asc" }
          : sort === "fall"
          ? { priceMain: "desc" }
          : sort === "alphabetic"
          ? { name: "asc" }
          : { createdAt: "desc" },
      include: {
        category: { select: { id: true, slug: true, title: true } },
        colors: {
          include: {
            images: { orderBy: { position: "asc" }, take: 1 },
          },
        },
      },
    }),
  ]);

  return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const body = await request.json();
  const { name, article, categoryId, priceMain, priceDiscount, colors, descriptions } = body;

  if (!name || !article || !categoryId || !priceMain) {
    return NextResponse.json({ error: "Обов'язкові поля відсутні" }, { status: 400 });
  }

  const product = await prisma.product.create({
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

  return NextResponse.json(product, { status: 201 });
}
