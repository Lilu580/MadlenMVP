"use client";

import React from "react";
import { CategoryCard } from "./CategoryCard";
import { cn, getStyleGridCategoriesCard } from "@/lib/utils";
import { categories } from "@/lib/mocks";

export const Categories = () => {
  return (
    <section className="relative flex flex-col w-full items-start gap-10 px-4 md:px-20 lg:px-[112px] py-[70px] bg-primary-project rounded-4xl">
      <h2 className="header-2 text-center w-full block">КАТЕГОРІЇ</h2>
      <div className="grid grid-cols-6 w-full gap-3">
        {categories.map((categories, index) => {
          return (
            <CategoryCard
              className={cn(getStyleGridCategoriesCard(index))}
              key={index}
              {...categories}
            />
          );
        })}
      </div>
    </section>
  );
};
