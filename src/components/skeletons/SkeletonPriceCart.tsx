import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  variant?: "default" | "checkout" | "success";
}

export const SkeletonPriceCart = ({ variant = "default" }: Props) => {
  return (
    <div
      className={cn("flex flex-col gap-5 w-full", {
        ["px-2"]: variant === "checkout",
      })}
    >
      <span className={"flex w-full items-center justify-between"}>
        <p className={"text-r-1 text-gray-80"}>Проміжковий підсумок:</p>
        <Skeleton className={"w-full md:h-[22px] h-[25px] max-w-36"} />
      </span>
      <span className={"flex w-full items-center justify-between"}>
        <p className={"text-r-1 text-gray-80"}>Знижка:</p>
        <Skeleton className={"w-full md:h-[22px] h-[25px] max-w-36"} />
      </span>
      <span
        className={
          "flex w-full items-center justify-between border-t-[1px] border-gray-project-30 py-3"
        }
      >
        <p className={"header-4 text-gray-project-90"}>
          {variant === "default" ? "Загалом:" : "Загальна сума:"}
        </p>
        <Skeleton className={"w-full md:h-[27px] lg:h-[30px] max-w-36"} />
      </span>
    </div>
  );
};
