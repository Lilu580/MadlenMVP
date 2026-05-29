"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IProductSelect } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { Basket } from "@/components/svg";
import Link from "next/link";

interface Props {
  product: IProductSelect;
  size?: "sm" | "xs";
  onClick?: () => void;
}

export const CardProduct = ({ product, size = "sm", onClick }: Props) => {
  const [price, discount] = useMemo(
    () => [
      formatPrice(product.price.main),
      product.price.discount ? formatPrice(product.price.discount) : null,
    ],
    [product.price],
  );

  const href = product.categorySlug
    ? `/catalog/${product.categorySlug}/${product.id}`
    : `/catalog`;

  return (
    <Link href={href} onClick={onClick}>
      <Card className="p-1 lg:p-2 border-0 w-min bg-primary-project rounded-[12px] shadow-lg cursor-pointer gap-2 hover:bg-gray-project-40">
        <div
          className={cn(
            "relative rounded-[10px] overflow-hidden flex justify-center items-center",
            {
              ["h-[214px] w-[160px] md:h-[214px] md:w-[132px] lg:h-[264px] lg:w-[211px]"]:
                size === "sm",
              ["h-[358px] w-[335px] md:h-[343px] md:w-[184px] lg:h-[362px] lg:w-[276px]"]:
                size === "xs",
            },
          )}
        >
          <Image
            fill
            className={cn("object-cover object-center")}
            alt={product.name}
            src={product.image}
          />
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col items-start md:gap-2 md:pb-1 lg:gap-4 md:pl-1 lg:pl-2 lg:py-2">
            <p className="text-m-2 text-gray-project-90">{product.name}</p>
            <div className="flex flex-col lg:flex-row items-center gap-0.5 lg:gap-2">
              <p
                className="text-m-3 text-gray-project-100"
                suppressHydrationWarning
              >
                {price}
              </p>
              {discount && (
                <p
                  className="text-m-3 text-gray-project-60 line-through"
                  suppressHydrationWarning
                >
                  {discount}
                </p>
              )}
            </div>
          </div>
          <Button variant={"secondary"} size={"icon"}>
            <Basket size={20} className={"lg:h-5 lg:w-5 w-3 h-3"} />
          </Button>
        </div>
      </Card>
    </Link>
  );
};
