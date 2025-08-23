"use client";
import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import { CardProductCart } from "@/components/cart/CardProductCart";
import { CardGeneralPrice } from "@/components/cart/CardGeneralPrice";
import { CardMain } from "@/components/layout/CardMain";
import React from "react";
import { useAtom } from "jotai/index";
import { productCart } from "@/lib/store";
import { CardInfoCheckout } from "@/components/success/CardInfoCheckout";
import { CardWrapperInfoCheckout } from "@/components/success/CardWrapperInfoCheckout";

export const Success = () => {
  const [basket] = useAtom(productCart);

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <BreadCrumbs
        mainTitle={"Оформлення замовлення"}
        links={[
          { link: "/", title: "Головна" },
          { link: "/cart", title: "Кошик" },
        ]}
      />
      <div className={"flex flex-col w-full gap-[30px] md:gap-[70px] xl:gap-8"}>
        <div className={"flex flex-col items-center justify-center w-full"}>
          <h2
            className={
              "header-2 text-gray-project-100 uppercase md:text-left text-center"
            }
          >
            ЗАМОВЛЕННЯ ОФОРМЛЕНО
          </h2>
          <p className={"text-m-1 text-gray-project-90"}>№ 1985658485</p>
        </div>
        <div
          className={
            "flex flex-col xl:flex-row w-full gap-8 lg:gap-5 items-start"
          }
        >
          <div className={"flex flex-col pt-4 gap-8 w-full"}>
            <div
              className={
                "w-full flex flex-col gap-5 px-4 py-6 border border-gray-project-30 rounded-[16px]"
              }
            >
              <h4 className={"header-4 text-gray-project-100"}>
                Деталі замовлення
              </h4>
              <ul className={"flex flex-col gap-4"}>
                <CardWrapperInfoCheckout>
                  <CardInfoCheckout
                    title={"ПІБ"}
                    subtext={"Коваленко Олександ"}
                  />
                  <CardInfoCheckout
                    title={"Метод доставки"}
                    subtext={"Адресна доставка"}
                  />
                </CardWrapperInfoCheckout>
                <CardWrapperInfoCheckout>
                  <CardInfoCheckout title={"E-mail"} subtext={"Ваш e-mail"} />
                  <CardInfoCheckout
                    title={"Адреса"}
                    subtext={"Вулиця, будинок, квартира, під’їзд"}
                  />
                </CardWrapperInfoCheckout>
                <CardWrapperInfoCheckout>
                  <CardInfoCheckout
                    title={"Метод оплати"}
                    subtext={"Оплата онлайн"}
                  />
                  <CardInfoCheckout
                    title={"Номер телефону"}
                    subtext={"Ваш номер"}
                  />
                </CardWrapperInfoCheckout>
              </ul>
            </div>
            <p className={"text-r-2 text-gray-project-90"}>
              Чекайте на дзвінок від нашого менеджера
            </p>
          </div>

          <div
            className={
              "flex flex-col border border-gray-project-30 rounded-[16px] py-6 px-4 gap-8 w-full xl:max-w-[495px] h-auto"
            }
          >
            <ul className={"w-full flex flex-col gap-4"}>
              {basket.length ? (
                basket.map((product, key) => (
                  <CardProductCart
                    variant={"success"}
                    product={product}
                    key={key}
                  />
                ))
              ) : (
                <p className={"header-4 w-full text-center"}>
                  В кошику немає товару
                </p>
              )}
            </ul>
            <h4
              className={
                "header-4 text-gray-project-90 text-center xl:text-left w-full"
              }
            >
              Сума замовлення:
            </h4>
            <CardGeneralPrice variant={"checkout"} />
          </div>
        </div>
      </div>
    </CardMain>
  );
};
