"use client";

import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import { CardProductCart } from "@/components/cart/CardProductCart";
import { CardMain } from "@/components/layout/CardMain";
import React from "react";
import { useAtomValue } from "jotai";
import { lastOrderAtom } from "@/lib/store";
import { CardInfoCheckout } from "@/components/success/CardInfoCheckout";
import { CardWrapperInfoCheckout } from "@/components/success/CardWrapperInfoCheckout";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DELIVERY_LABEL: Record<string, string> = {
  novapost: "Нова Пошта",
  ukrpost: "Укрпошта",
  department: "Відділення",
  courier: "Адресна доставка",
};

const PAYMENT_LABEL: Record<string, string> = {
  online: "Оплата онлайн",
  cash: "Оплата при отриманні",
};

export const Success = () => {
  const order = useAtomValue(lastOrderAtom);

  if (!order) {
    return (
      <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
        <div className="flex flex-col items-center justify-center gap-6 py-16">
          <p className="header-3 text-gray-project-100">Замовлення оформлено!</p>
          <p className="text-r-1 text-gray-project-80">
            Чекайте на дзвінок від нашого менеджера
          </p>
          <Button asChild>
            <Link href="/catalog">Продовжити покупки</Link>
          </Button>
        </div>
      </CardMain>
    );
  }

  const delivery = order.deliveryData;
  const deliveryAddress =
    delivery.office
      ? `${delivery.city}, відд. ${delivery.office}`
      : `${delivery.country ?? ""}, ${delivery.city}, ${delivery.address ?? ""}`;

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <BreadCrumbs
        mainTitle="Оформлення замовлення"
        links={[
          { link: "/", title: "Головна" },
          { link: "/cart", title: "Кошик" },
        ]}
      />
      <div className="flex flex-col w-full gap-[30px] md:gap-[70px] xl:gap-8">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="header-2 text-gray-project-100 uppercase md:text-left text-center">
            ЗАМОВЛЕННЯ ОФОРМЛЕНО
          </h2>
          <p className="text-m-1 text-gray-project-90">№ {order.orderNumber}</p>
        </div>

        <div className="flex flex-col xl:flex-row w-full gap-8 lg:gap-5 items-start">
          <div className="flex flex-col pt-4 gap-8 w-full">
            <div className="w-full flex flex-col gap-5 px-4 py-6 border border-gray-project-30 rounded-[16px]">
              <h4 className="header-4 text-gray-project-100">Деталі замовлення</h4>
              <ul className="flex flex-col gap-4">
                <CardWrapperInfoCheckout>
                  <CardInfoCheckout
                    title="ПІБ"
                    subtext={`${order.name} ${order.surname}`}
                  />
                  <CardInfoCheckout
                    title="Метод доставки"
                    subtext={`${DELIVERY_LABEL[order.deliveryType] ?? order.deliveryType} · ${DELIVERY_LABEL[delivery.type] ?? delivery.type}`}
                  />
                </CardWrapperInfoCheckout>
                <CardWrapperInfoCheckout>
                  <CardInfoCheckout title="E-mail" subtext={order.email} />
                  <CardInfoCheckout title="Адреса" subtext={deliveryAddress} />
                </CardWrapperInfoCheckout>
                <CardWrapperInfoCheckout>
                  <CardInfoCheckout
                    title="Метод оплати"
                    subtext={PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod}
                  />
                  <CardInfoCheckout title="Номер телефону" subtext={order.phone} />
                </CardWrapperInfoCheckout>
              </ul>
            </div>
            <p className="text-r-2 text-gray-project-90">
              Чекайте на дзвінок від нашого менеджера
            </p>
          </div>

          <div className="flex flex-col border border-gray-project-30 rounded-[16px] py-6 px-4 gap-8 w-full xl:max-w-[495px] h-auto">
            <ul className="w-full flex flex-col gap-4">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2.5 border-b border-gray-project-30 pb-4 last:border-0 last:pb-0"
                >
                  <div className="border-white border-4 relative overflow-hidden rounded-[12px] shadow-md w-[100px] h-[140px] md:w-[109px] md:h-[98px] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-center object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-m-1 text-gray-project-100">{item.name}</p>
                    <p className="text-r-3 text-gray-project-60">
                      Артикул: {item.article}
                    </p>
                    <p className="text-r-2 text-gray-project-80">
                      Колір: {item.nameColor}
                    </p>
                    <p className="text-r-2 text-gray-project-80">
                      {item.count} шт · {formatPrice(item.unitPrice * item.count)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-gray-project-30 pt-4">
              <p className="header-4 text-gray-project-90">Загальна сума:</p>
              <p className="header-4 text-gray-project-100">
                {formatPrice(order.totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardMain>
  );
};
