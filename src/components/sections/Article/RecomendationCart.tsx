import React, { JSX } from "react";
import Image from "next/image";

interface RecomendationCartProps {
  product: {
    name: string;
    price: string;
    oldPrice: string;
    imageSrc: string;
    frameSrc: string;
  };
}
export const RecomendationCart = ({product}: RecomendationCartProps) => {
    return (
        <article
            className="p-1"
          >
            <div className="bg-white w-full rounded-[10px] overflow-hidden flex justify-center items-center">
              <Image
                className="w-full height-[214px]"
                alt={product.name}
                src={product.imageSrc}
              />
            </div>

            <div className="flex items-end justify-between">
              <div className="flex flex-col items-start gap-4 pl-1 py-1">
                <h3 className="font-[garamond] text-sm sm:text-base font-medium text-[#212529]">
                  {product.name}
                </h3>
                <div className="flex flex-col items-center gap-2">
                  <span className="font-[garamond] text-sm sm:text-base font-medium text-[#0A0B0C]">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[#868E96] text-xs sm:text-sm line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
              <Image width={40} height={40} alt="Frame" src={product.frameSrc} />
            </div>
          </article>
    )
}