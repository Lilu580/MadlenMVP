"use client";

import React from "react";
import { CategoryCard } from "./CategoryCard";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { categories } from "@/lib/mocks";

interface Props {
  isLoading?: boolean;
}

export const Categories = ({ isLoading }: Props) => {
  return (
    <section className="relative flex flex-col w-full items-start gap-10 px-4 md:px-20 lg:px-[112px] py-[70px] bg-primary-project rounded-4xl">
      <h2 className="header-2 text-center w-full block">КАТЕГОРІЇ</h2>
      <div className="grid grid-cols-6 w-full gap-3">
        {isLoading
          ? "0123"
              .split("")
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className={cn(
                    "w-full h-[190px] sm:h-[270px] lg:h-[350px]",
                    getStyleGrid(index),
                  )}
                />
              ))
          : categories.map((categories, index) => {
              return (
                <CategoryCard
                  className={cn(getStyleGrid(index))}
                  key={index}
                  {...categories}
                />
              );
            })}
      </div>
    </section>
  );
};

const getStyleGrid = (index: number) => {
  const isEvenRow = Math.floor(index / 2) % 2 === 1;
  const isFirstInRow = index % 2 === 0;

  let colWidth = "";

  if (!isEvenRow) {
    colWidth = isFirstInRow
      ? "md:col-start-1 md:col-end-3 col-start-1 col-end-4"
      : "md:col-start-3 md:col-end-7 col-start-4 col-end-7";
  } else {
    colWidth = isFirstInRow
      ? "md:col-start-1 md:col-end-5 col-start-1 col-end-4"
      : "md:col-start-5 md:col-end-7 col-start-4 col-end-7";
  }
  return colWidth;
};
