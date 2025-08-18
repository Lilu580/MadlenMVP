"use client";

import React, { JSX, useEffect, useMemo, useState } from "react";
import { CardMain } from "@/components/layout/CardMain";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductImage } from "@/components/product/ProductImage";
import { product } from "@/lib/mocks";
import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import { ProductAccording } from "@/components/product/ProductAccording";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductChoose } from "@/components/product/ProductChoose";
import { ProductAddToBasket } from "@/components/product/ProductAddToBasket";
import { TProductColor } from "@/lib/types";

export default function Page(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState<TProductColor>(
    product.colors.find((v) => v.color === searchParams.get("color")) ||
      product.colors[0],
  );
  const [selectedCount, setSelectedCount] = useState<number>(1);

  const color = useMemo(
    () => product.colors.find((v) => v.color === selectedColor.color)!,
    [selectedColor],
  );

  const handleChangeColor = (value: TProductColor) => {
    setSelectedColor(value);
    if (selectedCount > color.count) {
      setSelectedCount(color.count);
    }
  };

  const handleChangeCount = (value: number) => {
    const valueNew =
      value >= color.count ? color.count : value <= 1 ? 1 : value;
    setSelectedCount(valueNew);
  };

  const handleChangeBtnLeft = () => {
    setSelectedCount(selectedCount - 1 <= 1 ? 1 : selectedCount - 1);
  };

  const handleChangeBtnRight = () => {
    setSelectedCount(
      selectedCount + 1 >= color.count ? color.count : selectedCount + 1,
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("color", selectedColor.color);
    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedColor]);

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <BreadCrumbs
        mainTitle={product.name}
        links={[
          { link: "/", title: "Головна" },
          { link: "/catalog", title: "Каталог" },
          { link: "/product", title: "Костюми" },
        ]}
      />
      <div
        className={
          "flex flex-col md:flex-row items-center md:items-start justify-start w-full gap-4 lg:gap-5"
        }
      >
        <ProductImage images={color.images} color={selectedColor.color} />
        <section
          className={
            "flex gap-8 lg:gap-10 items-start justify-start flex-col w-full"
          }
        >
          <section className={"flex flex-col gap-6 lg:gap-8 w-full"}>
            <section className={"flex flex-col gap-2 w-full"}>
              <h2 className={"header-2 text-gray-project-100"}>
                {product.name}
              </h2>
              <p className={"text-r-1 text-gray-project-80"}>
                Артикул №{product.article}
              </p>
            </section>
            <ProductPrice price={product.price} />
            <ProductChoose
              handleChangeColor={handleChangeColor}
              handleChangeBtnLeft={handleChangeBtnLeft}
              handleChangeBtnRight={handleChangeBtnRight}
              handleChangeCount={handleChangeCount}
              selectedColor={selectedColor}
              selectedCount={selectedCount}
              colors={product.colors}
            />
            <ProductAddToBasket
              product={{
                ...product,
                image: color.images[0].link,
                color: selectedColor.color,
                count: selectedCount,
                nameColor: selectedColor.nameColor,
                maxCount: color.count,
                id: crypto.randomUUID(),
              }}
            />
          </section>
          <ProductAccording descriptions={product.descriptions} />
        </section>
      </div>
    </CardMain>
  );
}
