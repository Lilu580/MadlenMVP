import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  const [totalOrders, pendingOrders, totalProducts, totalRevenue, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.product.count(),
      prisma.order.aggregate({ _sum: { totalPrice: true } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
    ]);

  return { totalOrders, pendingOrders, totalProducts, totalRevenue, recentOrders };
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Новий",
  PROCESSING: "В обробці",
  SHIPPED: "Відправлено",
  DELIVERED: "Доставлено",
  CANCELLED: "Скасовано",
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function AdminDashboard() {
  const { totalOrders, pendingOrders, totalProducts, totalRevenue, recentOrders } =
    await getStats();

  const revenue = totalRevenue._sum.totalPrice ?? 0;

  const stats = [
    { label: "Всього замовлень", value: totalOrders, icon: "📋", href: "/admin/orders" },
    { label: "Нових замовлень", value: pendingOrders, icon: "🔔", href: "/admin/orders?status=PENDING" },
    { label: "Товарів", value: totalProducts, icon: "📦", href: "/admin/products" },
    {
      label: "Виручка",
      value: revenue.toLocaleString("uk-UA", { minimumFractionDigits: 0 }) + " ₴",
      icon: "💰",
      href: "/admin/orders",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="header-2 text-gray-project-100">Дашборд</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
          >
            <span className="text-3xl">{stat.icon}</span>
            <p className="text-r-2 text-gray-project-60">{stat.label}</p>
            <p className="header-3 text-gray-project-100">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="header-4 text-gray-project-100">Останні замовлення</h2>
          <Link
            href="/admin/orders"
            className="text-r-2 text-gray-project-60 hover:text-gray-project-100 underline"
          >
            Всі замовлення →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-r-2 text-gray-project-60 text-center py-8">
            Замовлень ще немає
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-project-30">
                  <th className="text-left py-3 px-2 text-r-3 text-gray-project-60 font-normal">
                    Номер
                  </th>
                  <th className="text-left py-3 px-2 text-r-3 text-gray-project-60 font-normal">
                    Клієнт
                  </th>
                  <th className="text-left py-3 px-2 text-r-3 text-gray-project-60 font-normal">
                    Сума
                  </th>
                  <th className="text-left py-3 px-2 text-r-3 text-gray-project-60 font-normal">
                    Статус
                  </th>
                  <th className="text-left py-3 px-2 text-r-3 text-gray-project-60 font-normal">
                    Дата
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-project-20 hover:bg-gray-project-10"
                  >
                    <td className="py-3 px-2">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-m-2 text-gray-project-100 hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-2 text-r-2 text-gray-project-80">
                      {order.name} {order.surname}
                    </td>
                    <td className="py-3 px-2 text-r-2 text-gray-project-100">
                      {order.totalPrice.toLocaleString("uk-UA")} ₴
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_COLOR[order.status]}`}
                      >
                        {STATUS_LABEL[order.status]}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-r-3 text-gray-project-60">
                      {new Date(order.createdAt).toLocaleDateString("uk-UA")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
