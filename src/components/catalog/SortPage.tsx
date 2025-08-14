import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDown, Sort } from "@/components/svg";
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}

export const SortPage = (props: Props) => {
  const [sort, setSort] = React.useState(false);

  return (
    <>
      <Popover open={sort} onOpenChange={setSort}>
        <PopoverTrigger className={"hidden md:flex"}>
          <SortButton sort={sort} />
        </PopoverTrigger>
        <PopoverContent
          className={
            "max-w-[156px] lg:max-w-[220px] border-none rounded-2xl shadow-xs p-4 gap-2 flex flex-col"
          }
        >
          <SortContent {...props} />
        </PopoverContent>
      </Popover>
      <Dialog>
        <DialogTrigger className={"md:hidden"}>
          <SortButton sort={sort} />
        </DialogTrigger>
        <DialogContent
          className={
            "max-w-none w-screen h-screen m-0 rounded-t-2xl rounded-b-none items-start flex flex-col gap-6 p-4 sm:max-w-none"
          }
        >
          <DialogHeader>
            <DialogTitle>
              <div className={"flex items-center justify-start gap-2"}>
                <div className={"p-2.5"}>
                  <Sort size={24} color={"#0A0B0C"} />
                </div>
                <p className={"text-m-1 text-gray-project-100"}>Сортування</p>
              </div>
            </DialogTitle>
            <DialogDescription hidden></DialogDescription>
          </DialogHeader>
          <SortContent {...props} />
        </DialogContent>
      </Dialog>
    </>
  );
};

const SortButton = ({ sort }: { sort: boolean }) => {
  return (
    <div
      className={
        "flex items-center justify-between w-[156px] lg:w-[220px] h-[52px] md:px-1 lg:px-2 cursor-pointer"
      }
    >
      <div className={"flex items-center justify-center gap-2"}>
        <div className={"lg:p-2.5"}>
          <Sort size={24} color={"#0A0B0C"} />
        </div>
        <p className={"text-m-1 text-gray-project-100"}>Сортування</p>
      </div>
      <div className={"p-2.5"}>
        <ArrowDown
          color={"#495057"}
          size={12}
          className={cn("rotate-90", sort && "rotate-270")}
        />
      </div>
    </div>
  );
};

const SortContent = ({ sort, setSort }: Props) => {
  return (
    <RadioGroup defaultValue="growth" value={sort} onValueChange={setSort}>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="growth" id="r1" />
        <Label htmlFor="r1" className={"text-r-2 text-gray-project-90"}>
          За зростання
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="fall" id="r2" />
        <Label htmlFor="r2" className={"text-r-2 text-gray-project-90"}>
          За падінням
        </Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="alphabetic" id="r3" />
        <Label htmlFor="r3" className={"text-r-2 text-gray-project-90"}>
          За алфавітом
        </Label>
      </div>
    </RadioGroup>
  );
};
