"use client";
import { CardMain } from "@/components/layout/CardMain";
import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import React, { useMemo } from "react";
import { useAtom } from "jotai/index";
import { productBasket } from "@/lib/store";
import { CardProductBasket } from "@/components/Basket/CardProductBasket";
import {
  formatPrice,
  getPriceAllProducts,
  getPriceAllProductsDiscount,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [basket] = useAtom(productBasket);

  const priceWithoutDiscountProducts = useMemo(
    () => getPriceAllProducts(basket, true),
    [basket],
  );
  const priceWithDiscountProducts = useMemo(
    () => getPriceAllProductsDiscount(basket),
    [basket],
  );
  const priceAllProducts = useMemo(() => getPriceAllProducts(basket), [basket]);

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <BreadCrumbs
        mainTitle={"Корзина"}
        links={[{ link: "/", title: "Головна" }]}
      />
      <div className={"flex flex-col w-full gap-8"}>
        <h2 className={"header-2 text-gray-project-100 uppercase"}>Кошик</h2>
        <div className={"flex w-full gap-5 items-start"}>
          <ul
            className={
              "w-full flex flex-col gap-4 px-4 py-6 border border-gray-project-30 rounded-[16px]"
            }
          >
            {basket.length ? (
              basket.map((product, key) => (
                <CardProductBasket product={product} key={key} />
              ))
            ) : (
              <p className={"header-4 w-full text-center"}>
                В кошику немає товару
              </p>
            )}
          </ul>
          <div
            className={
              "flex flex-col border border-gray-project-30 rounded-[16px] p-5 gap-9 w-full max-w-[392px] h-auto"
            }
          >
            <p className={"header-3 text-gray-project-100 text-center"}>
              ЗАМОВЛЕННЯ
            </p>
            <div className={"flex flex-col gap-5"}>
              <span className={"flex w-full items-center justify-between"}>
                <p className={"text-r-1 text-gray-80"}>Проміжковий підсумок:</p>
                <p className={"text-r-1 text-gray-project-100 text-nowrap"}>
                  {formatPrice(priceWithoutDiscountProducts)}
                </p>
              </span>
              <span className={"flex w-full items-center justify-between"}>
                <p className={"text-r-1 text-gray-80"}>Знижка:</p>
                <p className={"text-r-1 text-gray-project-100 text-nowrap"}>
                  {formatPrice(priceWithDiscountProducts)}
                </p>
              </span>
              <span
                className={
                  "flex w-full items-center justify-between border-t-[1px] border-gray-project-30"
                }
              >
                <p className={"header-4 text-gray-project-90"}>Загалом:</p>
                <p className={"header-4 text-gray-project-100 text-nowrap"}>
                  {formatPrice(priceAllProducts)}
                </p>
              </span>
            </div>
            <Button>ПЕРЕЙТИ ДО ОФОРМЛЕННЯ</Button>
          </div>
        </div>
      </div>
    </CardMain>
  );
}
