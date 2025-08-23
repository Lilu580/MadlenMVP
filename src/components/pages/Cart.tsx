"use client";
import { CardMain } from "@/components/layout/CardMain";
import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import React from "react";
import { useAtom } from "jotai/index";
import { productCart } from "@/lib/store";
import { CardProductCart } from "@/components/cart/CardProductCart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CardGeneralPrice } from "@/components/cart/CardGeneralPrice";

export function Cart() {
  const router = useRouter();
  const [basket] = useAtom(productCart);

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <BreadCrumbs
        mainTitle={"Корзина"}
        links={[{ link: "/", title: "Головна" }]}
      />
      <div className={"flex flex-col w-full gap-8"}>
        <h2 className={"header-2 text-gray-project-100 uppercase"}>Кошик</h2>
        <div className={"flex flex-col  xl:flex-row w-full gap-5 items-start"}>
          <ul
            className={
              "w-full flex flex-col gap-4 px-4 py-6 border border-gray-project-30 rounded-[16px]"
            }
          >
            {basket.length ? (
              basket.map((product, key) => (
                <CardProductCart product={product} key={key} />
              ))
            ) : (
              <p className={"header-4 w-full text-center"}>
                В кошику немає товару
              </p>
            )}
          </ul>
          <div
            className={
              "flex flex-col border border-gray-project-30 rounded-[16px] p-5 gap-9 w-full xl:max-w-[392px] h-auto"
            }
          >
            <p className={"header-3 text-gray-project-100 text-center"}>
              ЗАМОВЛЕННЯ
            </p>
            <CardGeneralPrice />
            <div className={"flex w-full items-center justify-center"}>
              <Button
                onClick={() => router.push("/cart/checkout")}
                className={"max-w-none md:max-w-[278px] xl:max-w-none w-full"}
              >
                ПЕРЕЙТИ ДО ОФОРМЛЕННЯ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardMain>
  );
}
