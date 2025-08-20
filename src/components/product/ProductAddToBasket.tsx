"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useMemo } from "react";
import Image from "next/image";
import { IProductSelect } from "@/lib/types";
import { ProductPrice } from "@/components/product/ProductPrice";
import { useAtom } from "jotai/index";
import { productCart } from "@/lib/store";
import { formatPrice, getPriceAllProducts, getPriceProduct } from "@/lib/utils";

interface Props {
  product: IProductSelect;
}

export const ProductAddToBasket = ({ product }: Props) => {
  const [basket, setBasket] = useAtom(productCart);

  const priceProduct = useMemo(
    () => getPriceProduct(product.price, product.count),
    [product.price, product.count],
  );

  const priceAllProducts = useMemo(
    () => getPriceAllProducts([...basket, product]),
    [product, basket],
  );

  const handleAddToBasket = () => {
    setBasket(
      basket.find((pr) => pr.id === product.id) ? basket : [...basket, product],
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={"w-full lg:max-w-[392px]"}>Додати в кошик</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Товар успішно додано до кошика</DialogTitle>
          <DialogDescription className={"hidden"}></DialogDescription>
        </DialogHeader>
        <div
          className={
            "w-full grid gap-2.5 md:gap-4 lg:gap-8 grid-cols-[auto_1fr] lg:grid-cols-[auto_auto_1fr] items-start justify-start lg:justify-between pb-8 md:pb-10"
          }
        >
          <div
            className={
              "relative w-[92px] md:w-[168px] lg:w-[300px] h-auto mr-1 md:mr-0"
            }
          >
            <div
              className={
                "absolute w-full h-[99px] md:h-[181px] lg:h-[339px] rounded-[20px] overflow-hidden"
              }
            >
              <Image
                src={product.image}
                alt={""}
                fill
                className={"object-cover object-center"}
              />
            </div>
          </div>
          <div
            className={
              "flex flex-col gap-4 md:gap-6 items-start justify-start w-full"
            }
          >
            <div
              className={
                "flex flex-col md:flex-row lg:flex-col md:gap-[60px] gap-4 lg:gap-6 w-full items-start md:justify-between lg:justify-start"
              }
            >
              <div className={"flex flex-col gap-2"}>
                <h3 className={"header-3 text-gray-project-100 text-nowrap"}>
                  {product.name}
                </h3>
                <p className={"text-m-2 text-gray-project-80 text-nowrap"}>
                  Артикул №{product.article}
                </p>
              </div>
              <ProductPrice price={product.price} size={"sm"} />
            </div>
            <div
              className={
                "flex flex-col md:flex-row lg:flex-col gap-4 md:gap-8 lg:gap-2 w-full"
              }
            >
              <span className={"flex gap-2.5"}>
                <p className={"text-m-2 text-gray-project-90"}>Колір:</p>
                <p className={"text-r-2 text-gray-project-80"}>
                  {product.nameColor}
                </p>
              </span>
              <span className={"flex gap-2.5"}>
                <p className={"text-m-2 text-gray-project-90"}>Кількість:</p>
                <p className={"text-r-2 text-gray-project-80"}>
                  {product.count} шт.
                </p>
              </span>
            </div>
          </div>
          <div
            className={
              "col-span-2 md:col-span-full w-full flex flex-col gap-5 md:gap-6 lg:gap-8 md:border-t-[1px] lg:border-t-0 lg:border-l-[1px] border-gray-project-30 md:pt-4 lg:pt-0 lg:pl-8 md:col-start-2 lg:col-start-auto"
            }
          >
            <div
              className={
                "flex flex-col border border-gray-project-30 rounded-[16px] p-5 gap-6"
              }
            >
              <p className={"header-3 text-gray-project-100 text-center"}>
                У вашому кошику {basket.length} {pluralizeTovar(basket.length)}
              </p>
              <div className={"flex flex-col gap-5"}>
                <span className={"flex w-full items-center justify-between"}>
                  <p className={"text-r-1 text-gray-80"}>Разом:</p>
                  <p className={"text-r-1 text-gray-project-100"}>
                    {formatPrice(priceProduct)}
                  </p>
                </span>
                <span
                  className={
                    "flex w-full items-center justify-between border-t-[1px] border-gray-project-30"
                  }
                >
                  <p className={"header-4 text-gray-project-90"}>Всього:</p>
                  <p className={"header-4 text-gray-project-100"}>
                    {formatPrice(priceAllProducts)}
                  </p>
                </span>
              </div>
            </div>
            <div className={"flex flex-col w-full gap-1"}>
              <Button onClick={handleAddToBasket}>ДОДАТИ В КОШИК</Button>
              <DialogClose asChild>
                <Button
                  variant={"ghost"}
                  className={"px-6 lg:px-10 py-4 lg:py-5"}
                >
                  ПРОДОВЖИТИ ПОКУПКИ
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function pluralizeTovar(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return "товарів";
  }
  if (mod10 === 1) {
    return "товар";
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return "товари";
  }
  return "товарів";
}
