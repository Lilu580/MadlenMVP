import {
  cn,
  formatPrice,
  getPriceAllProducts,
  getPriceAllProductsDiscount,
} from "@/lib/utils";
import React, { useMemo } from "react";
import { useAtom } from "jotai/index";
import { productCart } from "@/lib/store";

interface Props {
  variant?: "default" | "checkout" | "success";
}

export const CardGeneralPrice = ({ variant = "default" }: Props) => {
  const [basket] = useAtom(productCart);

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
    <div
      className={cn("flex flex-col gap-5", {
        ["px-2"]: variant === "checkout",
      })}
    >
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
          "flex w-full items-center justify-between border-t-[1px] border-gray-project-30 py-3"
        }
      >
        <p className={"header-4 text-gray-project-90"}>
          {variant === "default" ? "Загалом:" : "Загальна сума:"}
        </p>
        <p className={"header-4 text-gray-project-100 text-nowrap"}>
          {formatPrice(priceAllProducts)}
        </p>
      </span>
    </div>
  );
};
