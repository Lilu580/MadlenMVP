import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const SkeletonCardProductCart = () => (
  <li
    className={
      "flex w-full border-t border-gray-project-30 pt-4 first-of-type:pt-0 first-of-type:border-0"
    }
  >
    <Skeleton className={"w-full h-[168px] md:h-[130px] lg:h-[98px]"} />
  </li>
);
