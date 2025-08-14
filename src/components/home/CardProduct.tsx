import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TProduct } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Basket } from "@/components/svg";

interface Props {
  product: TProduct;
  size?: "sm" | "xs";
}

export const CardProduct = ({ product, size = "sm" }: Props) => {
  return (
    <Card className="p-2 border-0 bg-primary-project rounded-[12px] shadow-lg cursor-pointer gap-2 hover:bg-gray-project-40">
      <div className="w-full rounded-[10px] overflow-hidden flex justify-center items-center">
        <Image
          width={160}
          height={214}
          className={cn("object-cover object-top", {
            ["h-[214px] w-[160px] md:h-[214px] md:w-[132px] lg:h-[264px] lg:w-[211px]"]:
              size === "sm",
            ["h-[358px] w-[335px] md:h-[343px] md:w-[184px] lg:h-[362px] lg:w-[276px]"]:
              size === "xs",
          })}
          alt={product.name}
          src={product.imageSrc}
        />
      </div>

      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col items-start md:gap-2 md:pb-1 lg:gap-4 md:pl-1 lg:pl-2 lg:py-2">
          <p className="text-m-2 text-gray-project-90">{product.name}</p>
          <div className="flex flex-col lg:flex-row items-center gap-0.5 lg:gap-2">
            <p className="text-m-3 text-gray-project-100">{product.price}</p>
            {product.oldPrice && (
              <p className="text-m-3 text-gray-project-60 line-through">
                {product.oldPrice}
              </p>
            )}
          </div>
        </div>
        <Button variant={"secondary"} size={"icon"}>
          <Basket size={20} className={"lg:h-5 lg:w-5 w-3 h-3 "} />
        </Button>
      </div>
    </Card>
  );
};
