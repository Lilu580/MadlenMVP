import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/svg";
import { Input } from "@/components/ui/input";
import React from "react";
import { TProductColor } from "@/lib/types";

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
        <div className={"flex items-center justify-start gap-2.5"}>
          <Button
            size={"icon"}
            className={"!p-2 rounded-[4px]"}
            onClick={handleChangeBtnLeft}
          >
            <ArrowRight
              className={"size-3 stroke-gray-project-10 rotate-180"}
            />
          </Button>
          <Input
            type={"number"}
            value={selectedCount}
            onChange={(e) => handleChangeCount(e.target.valueAsNumber)}
            placeholder={"1"}
            className={
              "border-none bg-gray-project-100 rounded-[4px] placeholder:text-gray-project-20 text-gray-project-10 max-w-16 max-h-9 text-center"
            }
          />
          <Button
            size={"icon"}
            className={"!p-2 rounded-[4px]"}
            onClick={handleChangeBtnRight}
          >
            <ArrowRight className={"size-3 stroke-gray-project-10"} />
          </Button>
        </div>
      </div>
    </section>
  );
};
