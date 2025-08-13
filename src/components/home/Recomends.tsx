"use client";

import React from "react";
import { CardProduct } from "./CardProduct";
import { Button } from "@/components/ui/button";
import { SkeletonProduct } from "@/components/layout/SkeletonProduct";

interface Props {
  isLoading?: boolean;
}

export const Recommends = ({ isLoading }: Props) => {
  return (
    <section
      id={"products"}
      className="flex flex-col items-start gap-[50px] py-[60px] md:py-20 lg:py-[120px] px-4 md:px-20 lg:px-[112px] relative"
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="header-2 text-gray-project-100">НОВИНКИ</h2>
        <Button variant={"outline"}>Переглянути все</Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        {isLoading
          ? "0123".split("").map((_, index) => <SkeletonProduct key={index} />)
          : products.map((product, index) => (
              <CardProduct key={`${product.name}-${index}`} product={product} />
            ))}
      </div>
    </section>
  );
};

const products = Array(4).fill({
  name: "Назва товару",
  price: "1 000,00 грн",
  oldPrice: "1 000,00 грн",
  imageSrc: "/recommend-1.png",
});
