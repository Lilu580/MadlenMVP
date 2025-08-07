"use client";

import React, { JSX } from "react";
import { Button } from "../Button/Button";
import image from "./image.png";
import property1Default from "./property-1-default.svg";
import { RecomendationCart } from "../Article/RecomendationCart";
const products = Array(4).fill({
  name: "Назва товару",
  price: "1 000,00 грн",
  oldPrice: "1 000,00 грн",
  imageSrc: image,
  frameSrc: property1Default,
});

export const Products = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start gap-[50px] py-[120px] px-[112px] relative">
      <div className="flex items-center justify-between w-full">
        <h2 className="header-2 text-gray-project-100">НОВИНКИ</h2>
        <Button content="Переглянути все" />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {products.map((product, index) => (
          <RecomendationCart
            key={`${product.name}-${index}`}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
