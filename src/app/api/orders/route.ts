import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

function generateOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `ORD-${date}-${random}`;
}

// Public: create order from checkout
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, surname, email, phone, address, payments, additionalInfo, isCall, items } = body;

  if (!name || !surname || !email || !phone || !address || !items?.length) {
    return NextResponse.json({ error: "Обов'язкові поля відсутні" }, { status: 400 });
  }

  const totalPrice = items.reduce(
    (sum: number, item: { unitPrice: number; count: number }) =>
      sum + item.unitPrice * item.count,
    0,
  );

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      name,
      surname,
      email,
      phone,
      deliveryType: address.type,
      deliveryData: address.delivery,
      paymentMethod: payments,
      additionalInfo: additionalInfo || null,
      isCall: Boolean(isCall),
      totalPrice,
      items: {
        create: items.map((item: {
          productId: string;
          name: string;
          article: string;
          image: string;
          color: string;
          nameColor: string;
          count: number;
          unitPrice: number;
        }) => ({
          productId: item.productId,
          name: item.name,
          article: item.article,
          image: item.image,
          color: item.color,
          nameColor: item.nameColor,
          count: item.count,
          unitPrice: item.unitPrice,
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}

// Admin only: list orders
export async function GET(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 20);

  const where = status ? { status: status as never } : {};

  const [total, orders] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  ]);

  return NextResponse.json({ orders, total, page, pages: Math.ceil(total / limit) });
}
