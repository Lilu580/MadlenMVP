import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, Filter } from "@/components/svg";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Range from "@/components/ui/range";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const FilterPage = () => {
  const [filter, setFilter] = React.useState(false);
  const [price, setPrice] = React.useState(true);
  const [material, setMaterial] = React.useState(true);

  return (
    <Popover open={filter} onOpenChange={setFilter}>
      <PopoverTrigger
        className={
          "flex items-center justify-between bg-primary-project w-[236px] h-[64px] rounded-xl px-2 cursor-pointer"
        }
      >
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"p-2.5"}>
            <Filter size={16} color={"#0A0B0C"} />
          </div>
          <p className={"text-m-1 text-gray-project-100"}>Фільтр</p>
        </div>
        <div className={"p-2.5"}>
          <ArrowDown
            color={"#495057"}
            size={12}
            className={cn("rotate-90", filter && "rotate-270")}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={
          "max-w-[236px] -mt-3 !rounded-t-none border-none bg-primary-project rounded-b-2xl shadow-xs p-2 gap-2 flex flex-col"
        }
      >
        <Collapsible
          onOpenChange={setPrice}
          open={price}
          className="flex w-full flex-col gap-2"
        >
          <div
            className={
              "flex flex-col gap-5 p-2 border rounded-lg border-gray-project-20"
            }
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">Ціна</p>
              <ArrowDown
                size={12}
                className={cn(
                  "transition-all duration-300",
                  price ? "rotate-270" : "rotate-90",
                )}
                color={"#495057"}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-2">
              <Range />
            </CollapsibleContent>
          </div>
        </Collapsible>
        <Collapsible
          onOpenChange={setMaterial}
          open={material}
          className="flex w-full flex-col gap-2"
        >
          <div
            className={
              "flex flex-col gap-5 p-2 border rounded-lg border-gray-project-20"
            }
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">Матеріал</p>
              <ArrowDown
                size={12}
                className={cn(
                  "transition-all duration-300",
                  material ? "rotate-270" : "rotate-90",
                )}
                color={"#495057"}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-3">
              <div className={"flex gap-2"}>
                <Checkbox />
                <Label className={"text-r-2 text-gray-project-90"}>
                  Джинси
                </Label>
              </div>
              <div className={"flex gap-2"}>
                <Checkbox />
                <Label className={"text-r-2 text-gray-project-90"}>
                  Хлопок
                </Label>
              </div>
              <div className={"flex gap-2"}>
                <Checkbox />
                <Label className={"text-r-2 text-gray-project-90"}>
                  Бавовна
                </Label>
              </div>
              <div className={"flex gap-2"}>
                <Checkbox />
                <Label className={"text-r-2 text-gray-project-90"}>
                  Еластан
                </Label>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </PopoverContent>
    </Popover>
  );
};
