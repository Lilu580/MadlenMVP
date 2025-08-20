import Image from "next/image";
import { InputRangeBtn } from "@/components/product/InputRangeBtn";
import React, { useMemo } from "react";
import { IProductSelect } from "@/lib/types";
import { cn, formatPrice, getPriceProduct } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash } from "@/components/svg/Trash";
import { useAtom } from "jotai/index";
import { productCart } from "@/lib/store";

interface Props {
  product: IProductSelect;
  variant?: "default" | "checkout" | "success";
}

export const CardProductCart = ({ product, variant = "default" }: Props) => {
  const [basket, setBasket] = useAtom(productCart);

  const priceProduct = useMemo(
    () => getPriceProduct(product.price, product.count),
    [product.price, product.count],
  );

  const handleChangeCount = (value: number) => {
    const valueNew =
      value >= product.maxCount ? product.maxCount : value <= 1 ? 1 : value;
    setBasket(
      basket.map((item) => {
        if (item.id === product.id) {
          return { ...item, count: valueNew };
        }
        return item;
      }),
    );
  };

  const handleChangeBtnLeft = () => {
    const basketFind = basket.find((item) => item.id === product.id);
    if (basketFind) {
      const valueNew = basketFind.count - 1 <= 1 ? 1 : basketFind.count - 1;
      setBasket(
        basket.map((item) => {
          if (item.id === product.id) {
            return { ...item, count: valueNew };
          }
          return item;
        }),
      );
    }
  };

  const handleChangeBtnRight = () => {
    const basketFind = basket.find((item) => item.id === product.id);
    if (basketFind) {
      const valueNew =
        basketFind.count + 1 >= product.maxCount
          ? product.maxCount
          : basketFind.count + 1;
      setBasket(
        basket.map((item) => {
          if (item.id === product.id) {
            return { ...item, count: valueNew };
          }
          return item;
        }),
      );
    }
  };

  const handleDeleteProduct = () => {
    setBasket(basket.filter((item) => item.id !== product.id));
  };

  return (
    <li
      className={cn("flex gap-2.5 items-center w-full", {
        ["first-of-type:pt-0 first-of-type:border-0 border-t border-gray-project-30 pt-4"]:
          variant === "default",
        ["border-b border-gray-project-30 pb-4"]:
          variant === "checkout" || variant === "success",
      })}
    >
      <div
        className={cn(
          "border-white border-4 relative overflow-hidden rounded-[12px] shadow-md",
          {
            ["w-[100px] h-[168px] md:h-[130px] lg:w-[109px] lg:h-[98px]"]:
              variant === "default",
            ["w-[100px] h-[140px] md:w-[109px] md:h-[98px]"]:
              variant === "checkout" || variant === "success",
          },
        )}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={"object-center object-cover w-full h-full"}
        />
      </div>
      <div
        className={cn("grid w-full items-start ", {
          ["gap-4 lg:gap-10 grid-cols-[auto_auto] grid-rows-[auto_20px_32px_20px] md:grid-cols-[auto_auto_auto] md:grid-rows-[50px_auto] md:justify-between lg:grid-rows-1 lg:grid-cols-[1fr_auto_auto_auto_auto]"]:
            variant === "default",
          ["gap-1 grid-cols-[auto_auto] grid-rows-[auto_20px_20px_20px] md:grid-cols-[auto_auto_auto] md:grid-rows-[50px_auto] md:justify-between"]:
            variant === "checkout" || variant === "success",
        })}
      >
        <div
          className={cn("flex flex-col row-start-1 col-start-1", {
            ["md:gap-2 lg:gap-2.5"]: variant === "default",
            ["gap-1"]: variant === "checkout" || variant === "success",
          })}
        >
          <p className={"text-m-1 text-gray-project-100"}>{product.name}</p>
          <p className={"text-r-3 text-gray-project-60"}>
            Артикул: {product.article}
          </p>
        </div>
        <div
          className={cn("flex", {
            ["gap-2 row-start-2 col-start-1 col-span-2 md:col-span-1 md:flex-col md:gap-4 lg:gap-5 lg:col-start-2 lg:row-start-1 items-center"]:
              variant === "default",
            ["gap-1 md:gap-0 md:flex-col row-start-2 col-start-1 col-span-2 md:col-span-1 items-center"]:
              variant === "checkout" || variant === "success",
          })}
        >
          <p className={"text-r-2 text-gray-project-80"}>Колір</p>
          <p className={"text-m-2 text-gray-project-90"}>{product.nameColor}</p>
        </div>
        {variant === "default" ? (
          <div
            className={
              "flex md:flex-col items-center gap-2 md:gap-2.5 lg:gap-5 row-start-3 col-span-2 md:col-span-1 col-start-1 md:col-start-2 lg:col-start-3 md:row-start-2 lg:row-start-1"
            }
          >
            <p className={"text-r-2 text-gray-project-80"}>Кількість</p>
            <InputRangeBtn
              handleChangeBtnLeft={handleChangeBtnLeft}
              handleChangeBtnRight={handleChangeBtnRight}
              handleChangeCount={handleChangeCount}
              selectedCount={product.count}
            />
          </div>
        ) : (
          <div
            className={cn(
              "flex gap-1 md:gap-0 md:flex-col row-start-3 col-start-1 col-span-2 md:col-span-1 items-center md:col-start-2 md:row-start-2",
            )}
          >
            <p className={"text-r-2 text-gray-project-80"}>Кількість</p>
            <p className={"text-m-2 text-gray-project-90"}>
              {product.count} шт
            </p>
          </div>
        )}
        <div
          className={cn("flex", {
            ["w-full justify-between md:justify-start md:w-auto md:flex-col gap-2 md:gap-4 lg:gap-5 row-start-4 col-span-2 md:col-span-1 col-start-1 md:col-start-3 lg:col-start-4 md:row-start-2 lg:row-start-1 items-center"]:
              variant === "default",
            ["md:flex-col gap-1 md:gap-0 row-start-4 col-span-2 md:col-span-1 col-start-1 md:col-start-3 md:row-start-2 items-center"]:
              variant === "checkout" || variant === "success",
          })}
        >
          <p className={"text-r-2 text-gray-project-80"}>Ціна</p>
          <p className={"text-m-2 text-gray-project-90"}>
            {formatPrice(priceProduct)}
          </p>
        </div>
        <div
          className={cn("flex", {
            ["items-center justify-end md:justify-center h-full row-start-1 col-start-2 md:col-start-3 lg:col-start-5"]:
              variant === "default",
            ["items-center justify-end h-full row-start-1 col-start-2 md:col-start-3"]:
              variant === "checkout",
            ["hidden"]: variant === "success",
          })}
        >
          <Button
            variant={"ghost"}
            className={"p-1"}
            onClick={handleDeleteProduct}
          >
            <Trash className={"fill-red-project-50"} />
          </Button>
        </div>
      </div>
    </li>
  );
};
