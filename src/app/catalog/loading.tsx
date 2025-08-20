import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonProduct } from "@/components/layout/SkeletonProduct";
import { CardMain } from "@/components/layout/CardMain";
import React from "react";

export default function Page() {
  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <Skeleton className={"w-full h-4 lg:h-5"} />
      <div className={"flex flex-col w-full gap-[30px]"}>
        <Skeleton className={"w-full h-[27px] mb-6 md:hidden"} />
        <Skeleton className={"w-full h-[52px] lg:h-16"} />
        <div className={"flex flex-col gap-10 w-full"}>
          <div
            className={"flex flex-wrap gap-x-4 gap-y-6 md:gap-y-8 lg:gap-y-10 "}
          >
            {"012345".split("").map((key) => (
              <SkeletonProduct size={"xs"} key={key} />
            ))}
          </div>
          <Skeleton className={"w-full h-9"} />
        </div>
      </div>
    </CardMain>
  );
}
