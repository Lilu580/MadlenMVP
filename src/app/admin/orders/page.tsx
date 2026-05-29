import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { OrderStatus } from "@prisma/client";

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Новий",
  PROCESSING: "В обробці",
  SHIPPED: "Відправлено",
  DELIVERED: "Доставлено",
  CANCELLED: "Скасовано",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const DELIVERY_LABEL: Record<string, string> = {
  novapost: "Нова Пошта",
  ukrpost: "Укрпошта",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const { status, page: pageStr } = await searchParams;
  const page = Number(pageStr ?? 1);
  const limit = 20;

  const where = status && status in OrderStatus ? { status: status as OrderStatus } : {};

  const [total, orders] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { items: true } } },
    }),
  ]);

  const pages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="header-2 text-gray-project-100">
          Замовлення{" "}
          <span className="text-gray-project-60 text-base font-normal">({total})</span>
        </h1>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 flex-wrap">
        <Link
          href="/admin/orders"
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${!status ? "bg-gray-project-100 text-white" : "bg-white text-gray-project-60 hover:bg-gray-project-20"}`}
        >
          Всі
        </Link>
        {Object.entries(STATUS_LABEL).map(([key, label]) => (
          <Link
            key={key}
            href={`/admin/orders?status=${key}`}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${status === key ? "bg-gray-project-100 text-white" : "bg-white text-gray-project-60 hover:bg-gray-project-20"}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-16 text-center text-r-2 text-gray-project-60">
            Замовлень немає
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-project-10 border-b border-gray-project-30">
                  <tr>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">Номер</th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">Клієнт</th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">Доставка</th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">Товарів</th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">Сума</th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">Статус</th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">Дата</th>
                    <th className="py-3 px-5" />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-project-20 hover:bg-gray-project-10">
                      <td className="py-3 px-5">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-m-2 text-gray-project-100 hover:underline font-mono text-xs"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="py-3 px-5">
                        <p className="text-r-2 text-gray-project-100">
                          {order.name} {order.surname}
                        </p>
                        <p className="text-r-3 text-gray-project-60">{order.phone}</p>
                      </td>
                      <td className="py-3 px-5 text-r-2 text-gray-project-80">
                        {DELIVERY_LABEL[order.deliveryType] ?? order.deliveryType}
                      </td>
                      <td className="py-3 px-5 text-r-2 text-gray-project-80">
                        {order._count.items}
                      </td>
                      <td className="py-3 px-5 text-r-2 text-gray-project-100">
                        {order.totalPrice.toLocaleString("uk-UA")} ₴
                      </td>
                      <td className="py-3 px-5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_COLOR[order.status]}`}>
                          {STATUS_LABEL[order.status]}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-r-3 text-gray-project-60">
                        {new Date(order.createdAt).toLocaleDateString("uk-UA")}
                      </td>
                      <td className="py-3 px-5">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-r-3 text-gray-project-60 hover:text-gray-project-100 underline"
                        >
                          Деталі
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pages > 1 && (
              <div className="flex items-center justify-center gap-2 py-4 border-t border-gray-project-20">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/admin/orders?page=${p}${status ? `&status=${status}` : ""}`}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${p === page ? "bg-gray-project-100 text-white" : "text-gray-project-60 hover:bg-gray-project-20"}`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
