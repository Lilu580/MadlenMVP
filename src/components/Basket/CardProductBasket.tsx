import Image from "next/image";
import { InputRangeBtn } from "@/components/product/InputRangeBtn";
import React, { useMemo, useState } from "react";
import { IProductSelect } from "@/lib/types";
import { formatPrice, getPriceProduct } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash } from "@/components/svg/Trash";
import { useAtom } from "jotai/index";
import { productBasket } from "@/lib/store";

interface Props {
  product: IProductSelect;
}

export const CardProductBasket = ({ product }: Props) => {
  const [basket, setBasket] = useAtom(productBasket);

  const [selectedCount, setSelectedCount] = useState<number>(product.count);

  const priceProduct = useMemo(
    () => getPriceProduct(product.price, product.count),
    [product.price, product.count],
  );

  const handleChangeCount = (value: number) => {
    const valueNew =
      value >= product.count ? product.count : value <= 1 ? 1 : value;
    setSelectedCount(valueNew);
  };

  const handleChangeBtnLeft = () => {
    setSelectedCount(selectedCount - 1 <= 1 ? 1 : selectedCount - 1);
  };

  const handleChangeBtnRight = () => {
    setSelectedCount(
      selectedCount + 1 >= product.count ? product.count : selectedCount + 1,
    );
  };

  const handleDeleteProduct = () => {
    setBasket(basket.filter((item) => item.id !== product.id));
  };

  return (
    <li
      className={
        "flex gap-2.5 items-center w-full border-t border-gray-project-30 pt-4 first-of-type:pt-0 first-of-type:border-0"
      }
    >
      <div
        className={
          "border-white border-4 w-[109px] h-[98px] relative overflow-hidden rounded-[12px] shadow-md"
        }
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={"object-center object-cover w-full h-full"}
        />
      </div>
      <div
        className={
          "grid w-full grid-cols-[1fr_auto_auto_auto_auto] items-start gap-x-10"
        }
      >
        <div className={"flex flex-col gap-2.5"}>
          <p className={"text-m-1 text-gray-project-100"}>{product.name}</p>
          <p className={"text-r-3 text-gray-project-60"}>
            Артикул: {product.article}
          </p>
        </div>
        <div className={"flex flex-col gap-5"}>
          <p className={"text-r-2 text-gray-project-80"}>Колір</p>
          <p className={"text-m-2 text-gray-project-90"}>{product.nameColor}</p>
        </div>
        <div className={"flex flex-col gap-5 items-center"}>
          <p className={"text-r-2 text-gray-project-80"}>Кількість</p>
          <InputRangeBtn
            handleChangeBtnLeft={handleChangeBtnLeft}
            handleChangeBtnRight={handleChangeBtnRight}
            handleChangeCount={handleChangeCount}
            selectedCount={selectedCount}
          />
        </div>
        <div className={"flex flex-col gap-5"}>
          <p className={"text-r-2 text-gray-project-80"}>Ціна</p>
          <p className={"text-m-2 text-gray-project-90"}>
            {formatPrice(priceProduct)}
          </p>
        </div>
        <div className={"flex items-center justify-center h-full"}>
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
