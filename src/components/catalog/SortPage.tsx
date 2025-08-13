import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, Sort } from "@/components/svg";
import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const SortPage = () => {
  const [filter, setFilter] = React.useState(false);

  return (
    <Popover open={filter} onOpenChange={setFilter}>
      <PopoverTrigger
        className={
          "flex items-center justify-between w-[220px] h-[32px] px-2 cursor-pointer"
        }
      >
        <div className={"flex items-center justify-center gap-2"}>
          <div className={"p-2.5"}>
            <Sort size={24} color={"#0A0B0C"} />
          </div>
          <p className={"text-m-1 text-gray-project-100"}>Сортування</p>
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
          "max-w-[220px] border-none rounded-2xl shadow-xs p-4 gap-2 flex flex-col"
        }
      >
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1" className={"text-r-2 text-gray-project-90"}>
              За зростання
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2" className={"text-r-2 text-gray-project-90"}>
              За падінням
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3" className={"text-r-2 text-gray-project-90"}>
              За алфавітом
            </Label>
          </div>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
};
