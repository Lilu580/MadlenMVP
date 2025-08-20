import { Skeleton } from "@/components/ui/skeleton";
import { cn, getStyleGridCategoriesCard } from "@/lib/utils";
import React from "react";

export const SkeletonCategories = () => {
  return (
    <section className="relative flex flex-col w-full items-start gap-10 px-4 md:px-20 lg:px-[112px] py-[70px] bg-primary-project rounded-4xl">
      <h2 className="header-2 text-center w-full block">КАТЕГОРІЇ</h2>
      <div className="grid grid-cols-6 w-full gap-3">
        {"0123".split("").map((_, index) => (
          <Skeleton
            key={index}
            className={cn(
              "w-full h-[190px] sm:h-[270px] lg:h-[350px]",
              getStyleGridCategoriesCard(index),
            )}
          />
        ))}
      </div>
    </section>
  );
};
