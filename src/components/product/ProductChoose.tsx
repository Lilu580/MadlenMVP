import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { TProductColor } from "@/lib/types";
import { InputRangeBtn } from "@/components/product/InputRangeBtn";

interface Props {
  selectedColor: TProductColor;
  selectedCount: number;
  handleChangeColor: (v: TProductColor) => void;
  handleChangeBtnLeft: () => void;
  handleChangeBtnRight: () => void;
  handleChangeCount: (v: number) => void;
  colors: TProductColor[];
}

export const ProductChoose = ({
  selectedCount,
  handleChangeBtnLeft,
  handleChangeBtnRight,
  handleChangeCount,
  handleChangeColor,
  selectedColor,
  colors,
}: Props) => {
  return (
    <section className={"flex flex-col justify-start items-start gap-6"}>
      <div className={"flex flex-col gap-4 lg:gap-5"}>
        <p className={"text-m-1 text-gray-project-90"}>Вибір кольору</p>
        <RadioGroup
          defaultValue={selectedColor.color}
          value={selectedColor.color}
          onValueChange={(value) =>
            handleChangeColor(
              colors.find((color) => color.color === value) as TProductColor,
            )
          }
          className={"flex gap-4"}
        >
          {colors.map(({ color }, index) => (
            <RadioGroupItem
              key={index}
              isCheck
              value={color}
              id="r1"
              style={{
                background: color,
              }}
              className={`w-8 h-8 lg:w-[37px] lg:h-[37px] border-none`}
            />
          ))}
        </RadioGroup>
      </div>
      <div className={"flex flex-col gap-4 lg:gap-5"}>
        <p className={"text-m-1 text-gray-project-90"}>Вибір кількості</p>
        <InputRangeBtn
          handleChangeBtnLeft={handleChangeBtnLeft}
          handleChangeBtnRight={handleChangeBtnRight}
          handleChangeCount={handleChangeCount}
          selectedCount={selectedCount}
        />
      </div>
    </section>
  );
};
