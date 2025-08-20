import { Button } from "@/components/ui/button";
import { CardMain } from "@/components/layout/CardMain";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonPriceCart } from "@/components/skeletons/SkeletonPriceCart";
import { SkeletonBreadcrumbs } from "@/components/skeletons/SkeletonBreadcrumbs";
import { SkeletonCardProductCart } from "@/components/skeletons/SkeletonCardProductCart";

export default function Page() {
  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <SkeletonBreadcrumbs />
      <div className={"flex flex-col w-full gap-8"}>
        <h2
          className={
            "header-2 text-gray-project-100 uppercase md:text-left text-center"
          }
        >
          ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
        </h2>
        <div className={"flex flex-col  xl:flex-row w-full gap-5 items-start"}>
          <form
            className={
              "w-full flex flex-col gap-8 px-4 py-6 border border-gray-project-30 rounded-[16px]"
            }
          >
            <section className={"gap-5 flex flex-col w-full"}>
              <h4 className={"header-4 text-gray-project-100"}>
                Контактні дані
              </h4>
              <div className={"flex w-full gap-4 flex-col"}>
                <div className={"flex w-full flex-col md:flex-row gap-4"}>
                  <Skeleton className={"w-full h-[85px]"} />
                  <Skeleton className={"w-full h-[85px]"} />
                </div>
                <div className={"flex w-full flex-col md:flex-row gap-4"}>
                  <Skeleton className={"w-full h-[85px]"} />
                  <Skeleton className={"w-full h-[85px]"} />
                </div>
              </div>
            </section>
            <section className={"gap-5 flex flex-col w-full"}>
              <h4 className={"header-4 text-gray-project-100"}>
                Спосіб доставки
              </h4>
              <Skeleton className={"w-full h-[324px]"} />
            </section>
            <section className={"gap-5 flex flex-col w-full"}>
              <h4 className={"header-4 text-gray-project-100"}>Метод оплати</h4>
              <div className={"flex flex-col gap-4 w-full"}>
                <Skeleton className={"w-full h-[68px]"} />
                <Skeleton className={"w-full h-[68px]"} />
              </div>
            </section>
            <section className={"gap-5 flex flex-col w-full"}>
              <h4 className={"header-4 text-gray-project-100"}>
                Додаткова інформація (необов’язково)
              </h4>
              <Skeleton className={"w-full h-[112px]"} />
              <Skeleton className={"w-full h-[25px]"} />
            </section>
          </form>
          <div
            className={
              "flex flex-col border border-gray-project-30 rounded-[16px] py-6 px-4 gap-8 w-full xl:max-w-[495px] h-auto"
            }
          >
            <ul className={"w-full flex flex-col gap-4"}>
              {"01234".split("").map((key) => (
                <SkeletonCardProductCart key={key} />
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
            <div className={"flex w-full items-center justify-center"}>
              <Button
                disabled
                className={"max-w-none md:max-w-[278px] xl:max-w-none w-full"}
              >
                ОФОРМИТИ ЗАМОВЛЕННЯ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardMain>
  );
}
