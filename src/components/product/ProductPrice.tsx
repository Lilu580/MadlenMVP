"use client";
import { Badge } from "@/components/ui/badge";
import { cn, getDiscountPercent, formatPrice } from "@/lib/utils";
import React from "react";
import { TProductPrice } from "@/lib/types";

interface Props {
  price: TProductPrice;
  size?: "sm" | "xs";
}

export const ProductPrice = ({ price, size = "xs" }: Props) => {
  return (
    <section
      className={cn("flex gap-4 items-center justify-start flex-wrap", {
        ["flex-col md:flex-row items-start lg:items-center gap-1 md:gap-2 lg:gap-4"]:
          size === "sm",
      })}
    >
      {price.discount ? (
        <>
          <span className={"flex gap-3"}>
            <h3
              className={cn(
                {
                  ["text-m-1"]: size === "sm",
                  ["header-3"]: size === "xs",
                },
                "text-gray-project-100 text-nowrap",
              )}
            >
              {formatPrice(price.discount)}
            </h3>
            <p
              className={cn(
                {
                  ["text-m-1"]: size === "sm",
                  ["header-3"]: size === "xs",
                },
                "text-gray-project-50 line-through text-nowrap",
              )}
            >
              {formatPrice(price.main)}
            </p>
          </span>
          <Badge variant="destructive">
            -{getDiscountPercent(price.main, price.discount)}%
          </Badge>
        </>
      ) : (
        <span className={"flex gap-3"}>
          <h3
            className={cn(
              {
                ["text-m-1"]: size === "sm",
                ["header-3"]: size === "xs",
              },
              "text-gray-project-100 text-nowrap",
            )}
          >
            {formatPrice(price.main)}
          </h3>
        </span>
      )}
    </section>
  );
};
