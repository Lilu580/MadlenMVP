import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCheckoutSuccessInfo = () => {
  return (
    <div
      className={
        "flex md:flex-row flex-col gap-4 w-full border-b-[1px] md:border-b-0 border-gray-project-30 pb-2.5"
      }
    >
      <Skeleton className={"w-full h-[67px]"} />
    </div>
  );
};
