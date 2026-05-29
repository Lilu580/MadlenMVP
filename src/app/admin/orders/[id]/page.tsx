import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ChangeStatusForm } from "@/components/admin/ChangeStatusForm";
import { formatPrice } from "@/lib/utils";

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Новий",
  PROCESSING: "В обробці",
  SHIPPED: "Відправлено",
  DELIVERED: "Доставлено",
  CANCELLED: "Скасовано",
};

const PAYMENT_LABEL: Record<string, string> = {
  online: "Карткою онлайн",
  cash: "Оплата при отриманні",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  const delivery = order.deliveryData as Record<string, string>;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="text-r-2 text-gray-project-60 hover:text-gray-project-100"
        >
          ← Замовлення
        </Link>
        <h1 className="header-2 text-gray-project-100">{order.orderNumber}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Customer info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <h2 className="header-4 text-gray-project-100">Клієнт</h2>
          <Row label="ПІБ" value={`${order.name} ${order.surname}`} />
          <Row label="Email" value={order.email} />
          <Row label="Телефон" value={order.phone} />
          {order.additionalInfo && (
            <Row label="Примітка" value={order.additionalInfo} />
          )}
          {order.isCall && (
            <p className="text-r-3 text-gray-project-60 italic">
              ✓ Не передзвонювати
            </p>
          )}
        </div>

        {/* Delivery & Payment */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <h2 className="header-4 text-gray-project-100">Доставка та оплата</h2>
          <Row
            label="Служба"
            value={order.deliveryType === "novapost" ? "Нова Пошта" : "Укрпошта"}
          />
          {delivery.city && <Row label="Місто" value={delivery.city} />}
          {delivery.office && <Row label="Відділення" value={delivery.office} />}
          {delivery.address && <Row label="Адреса" value={delivery.address} />}
          {delivery.postIndex && (
            <Row label="Індекс" value={delivery.postIndex} />
          )}
          <Row
            label="Оплата"
            value={PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod}
          />
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        <h2 className="header-4 text-gray-project-100">Товари</h2>
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 border-b border-gray-project-20 pb-3 last:border-0 last:pb-0"
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-project-20 flex-shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-m-2 text-gray-project-100">{item.name}</p>
                <p className="text-r-3 text-gray-project-60">
                  Артикул: {item.article} · Колір: {item.nameColor}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-r-2 text-gray-project-80">{item.count} шт</p>
                <p className="text-m-2 text-gray-project-100">
                  {formatPrice(item.unitPrice * item.count)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-gray-project-30 pt-4">
          <p className="header-4 text-gray-project-90">Загальна сума:</p>
          <p className="header-4 text-gray-project-100">{formatPrice(order.totalPrice)}</p>
        </div>
      </div>

      {/* Status change */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="header-4 text-gray-project-100 mb-4">Статус замовлення</h2>
        <ChangeStatusForm
          orderId={order.id}
          currentStatus={order.status}
          statusOptions={STATUS_LABEL}
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-r-2 text-gray-project-60 w-24 flex-shrink-0">{label}:</span>
      <span className="text-r-2 text-gray-project-90">{value}</span>
    </div>
  );
}
