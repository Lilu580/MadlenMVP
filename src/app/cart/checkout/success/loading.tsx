import { CardMain } from "@/components/layout/CardMain";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonPriceCart } from "@/components/skeletons/SkeletonPriceCart";
import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import { CardWrapperInfoCheckout } from "@/components/success/CardWrapperInfoCheckout";
import { SkeletonCheckoutSuccessInfo } from "@/components/skeletons/SkeletonCheckoutSuccessInfo";

export default function Page() {
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
          <Skeleton className={"w-full h-5 lg:h-6 max-w-64"} />
        </div>
        <div className={"flex flex-col xl:flex-row w-full gap-5 items-start"}>
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
                  <SkeletonCheckoutSuccessInfo />
                  <SkeletonCheckoutSuccessInfo />
                </CardWrapperInfoCheckout>
                <CardWrapperInfoCheckout>
                  <SkeletonCheckoutSuccessInfo />
                  <SkeletonCheckoutSuccessInfo />
                </CardWrapperInfoCheckout>
                <CardWrapperInfoCheckout>
                  <SkeletonCheckoutSuccessInfo />
                  <SkeletonCheckoutSuccessInfo />
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
              {"01234".split("").map((key) => (
                <li
                  key={key}
                  className={
                    "flex w-full border-t border-gray-project-30 pt-4 first-of-type:pt-0 first-of-type:border-0"
                  }
                >
                  <Skeleton
                    className={"w-full h-[168px] md:h-[130px] lg:h-[98px]"}
                  />
                </li>
              ))}
            </ul>
            <h4
              className={
                "header-4 text-gray-project-90 text-center xl:text-left w-full"
              }
            >
              Сума замовлення:
            </h4>
            <SkeletonPriceCart variant={"checkout"} />
          </div>
        </div>
      </div>
    </CardMain>
  );
}
