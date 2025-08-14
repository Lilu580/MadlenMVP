import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, Filter } from "@/components/svg";
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Range from "@/components/ui/range";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  state: { price: [number, number]; material: string[] };
  setPrice: Dispatch<SetStateAction<[number, number]>>;
  setMaterial: Dispatch<SetStateAction<string[]>>;
}

export const FilterPage = (props: Props) => {
  const [filter, setFilter] = React.useState(false);

  return (
    <>
      <Popover open={filter} onOpenChange={setFilter}>
        <PopoverTrigger className={"hidden md:flex"}>
          <FilterButton filter={filter} />
        </PopoverTrigger>
        <PopoverContent
          sideOffset={0}
          className={
            "hidden md:flex max-w-none md:max-w-[156px] lg:max-w-[236px] !rounded-t-none border-none bg-primary-project rounded-b-2xl shadow-xs p-2 gap-2 flex-col"
          }
        >
          <FilterContent {...props} />
        </PopoverContent>
      </Popover>
      <Dialog>
        <DialogTrigger className={"flex md:hidden"}>
          <FilterButton filter={filter} />
        </DialogTrigger>
        <DialogContent
          className={
            "bg-primary-project max-w-none w-screen h-screen m-0 rounded-t-2xl rounded-b-none items-start flex flex-col gap-6 p-4 sm:max-w-none"
          }
        >
          <DialogHeader>
            <DialogTitle>
              <div className={"flex items-center justify-center gap-2"}>
                <div className={"p-2.5"}>
                  <Filter size={16} color={"#0A0B0C"} />
                </div>
                <p className={"text-m-1 text-gray-project-100"}>Фільтр</p>
              </div>
            </DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          <FilterContent {...props} />
        </DialogContent>
      </Dialog>
    </>
  );
};

const FilterButton = ({ filter }: { filter: boolean }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between bg-primary-project w-[168px] md:w-[156px] lg:w-[236px] h-[52px] lg:h-[64px] rounded-xl md:px-1 lg:px-2 cursor-pointer",
      )}
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
    </div>
  );
};

const FilterContent = ({ state, setPrice, setMaterial }: Props) => {
  const [priceModal, setPriceModal] = React.useState(true);
  const [materialModal, setMaterialModal] = React.useState(true);

  return (
    <>
      <Collapsible
        onOpenChange={setPriceModal}
        open={priceModal}
        className="flex w-full flex-col gap-2"
      >
        <div
          className={
            "flex flex-col gap-5 px-2 py-4 md:py-2 md:px-1 lg::p-2 border rounded-lg border-gray-project-20"
          }
        >
          <CollapsibleTrigger className="w-full flex items-center justify-between gap-2">
            <p className="text-m-2 text-gray-project-90">Ціна</p>
            <div className={"p-2.5"}>
              <ArrowDown
                size={12}
                className={cn(
                  "transition-all duration-300",
                  priceModal ? "rotate-270" : "rotate-90",
                )}
                color={"#495057"}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-2">
            <Range
              onChange={(range) => setPrice(range)}
              initial={state.price}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>
      <Collapsible
        onOpenChange={setMaterialModal}
        open={materialModal}
        className="flex w-full flex-col gap-2"
      >
        <div
          className={
            "flex flex-col gap-5 px-2 py-4 md:py-2 md:px-1 lg::p-2 border rounded-lg border-gray-project-20"
          }
        >
          <CollapsibleTrigger className="w-full flex items-center justify-between gap-2">
            <p className="text-m-2 text-gray-project-90">Матеріал</p>
            <div className={"p-2.5"}>
              <ArrowDown
                size={14}
                className={cn(
                  "transition-all duration-300",
                  materialModal ? "rotate-270" : "rotate-90",
                )}
                color={"#495057"}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-3">
            {materials.map((item) => (
              <div key={item} className={"flex gap-2"}>
                <Checkbox
                  onClick={() =>
                    setMaterial((v) =>
                      v.includes(item)
                        ? v.filter((i) => i !== item)
                        : [...v, item],
                    )
                  }
                  checked={state.material.includes(item)}
                />
                <Label className={"text-r-2 text-gray-project-90"}>
                  {item}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </>
  );
};

const materials = ["Джинси", "Хлопок", "Бавовна", "Еластан"];
