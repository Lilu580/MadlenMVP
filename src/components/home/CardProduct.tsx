import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  product: {
    name: string;
    price: string;
    oldPrice: string;
    imageSrc: string;
    frameSrc: string;
  };
}
export const CardProduct = ({ product }: Props) => {
  return (
    <Card className="p-2 border-0 bg-primary-project rounded-[12px] shadow-lg cursor-pointer gap-2">
      <div className="bg-white w-full rounded-[10px] overflow-hidden flex justify-center items-center">
        <Image
          className="w-full h-[214px] lg:h-[264px] object-cover object-top"
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
          <Image
            width={20}
            height={20}
            alt="Frame"
            className={"lg:h-5 lg:w-5 w-3 h-3"}
            src={product.frameSrc}
          />
        </Button>
      </div>
    </Card>
  );
};
