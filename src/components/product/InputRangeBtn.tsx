import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/svg";
import { Input } from "@/components/ui/input";
import React from "react";

interface Props {
  selectedCount: number;
  handleChangeBtnLeft: () => void;
  handleChangeBtnRight: () => void;
  handleChangeCount: (v: number) => void;
}

export const InputRangeBtn = ({
  handleChangeBtnLeft,
  handleChangeCount,
  selectedCount,
  handleChangeBtnRight,
}: Props) => {
  return (
    <div className={"flex items-center justify-start gap-2.5"}>
      <Button
        size={"icon"}
        className={"!p-2 rounded-[4px]"}
        onClick={handleChangeBtnLeft}
      >
        <ArrowRight className={"size-3 stroke-gray-project-10 rotate-180"} />
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
  );
};
