import { Button } from "@/components/ui/button";
import { CardMain } from "@/components/layout/CardMain";
import React from "react";
import { SkeletonPriceCart } from "@/components/skeletons/SkeletonPriceCart";
import { SkeletonBreadcrumbs } from "@/components/skeletons/SkeletonBreadcrumbs";
import { SkeletonCardProductCart } from "@/components/skeletons/SkeletonCardProductCart";

export default function Page() {
  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <SkeletonBreadcrumbs />
      <div className={"flex flex-col w-full gap-8"}>
        <h2 className={"header-2 text-gray-project-100 uppercase"}>Кошик</h2>
        <div className={"flex flex-col  xl:flex-row w-full gap-5 items-start"}>
          <ul
            className={
              "w-full flex flex-col gap-4 px-4 py-6 border border-gray-project-30 rounded-[16px]"
            }
          >
            {"01234".split("").map((key) => (
              <SkeletonCardProductCart key={key} />
            ))}
          </ul>
          <div
            className={
              "flex flex-col border border-gray-project-30 rounded-[16px] p-5 gap-9 w-full xl:max-w-[392px] h-auto"
            }
          >
            <p className={"header-3 text-gray-project-100 text-center"}>
              ЗАМОВЛЕННЯ
            </p>
            <SkeletonPriceCart />
            <Button disabled>ПЕРЕЙТИ ДО ОФОРМЛЕННЯ</Button>
          </div>
        </div>
      </div>
    </CardMain>
  );
}
