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
import { Button } from "@/components/ui/button";

export const FilterPage = () => {
  const [filter, setFilter] = React.useState(false);

  return (
    <Popover open={filter} onOpenChange={setFilter}>
      <PopoverTrigger
        className={
          "flex items-center justify-between bg-primary-project w-[236px] h-[64px] rounded-xl px-2 cursor-pointer"
        }
      >
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"p-2.5"}>
            <Filter size={16} color={"black"} />
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
        <Collapsible className="flex w-full flex-col gap-2">
          <div
            className={
              "flex flex-col gap-5 p-2 border rounded-lg border-gray-project-20"
            }
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">Ціна</p>
              <ArrowDown size={12} className={"rotate-90"} color={"#495057"} />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-2">
              <div className="rounded-md border px-4 py-2 font-mono text-sm">
                @radix-ui/colors
              </div>
              <div className="rounded-md border px-4 py-2 font-mono text-sm">
                @stitches/react
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
        <div className={"border w-full"}></div>
      </PopoverContent>
    </Popover>
  );
};
