import React from "react";
import { CategoryCard } from "./CategoryCard";
import { cn, getStyleGridCategoriesCard } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const Categories = async () => {
  let categories: { id: string; slug: string; title: string; image: string }[] = [];

  try {
    categories = await prisma.category.findMany({
      orderBy: { title: "asc" },
      select: { id: true, slug: true, title: true, image: true },
    });
  } catch {
    // DB not connected
  }

  if (categories.length === 0) return null;

  return (
    <section id="categories" className="relative flex flex-col w-full items-start gap-10 px-4 md:px-20 lg:px-[112px] py-[70px] bg-primary-project rounded-4xl">
      <h2 className="header-2 text-center w-full block">КАТЕГОРІЇ</h2>
      <div className="grid grid-cols-6 w-full gap-3">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            className={cn(getStyleGridCategoriesCard(index))}
            {...category}
          />
        ))}
      </div>
    </section>
  );
};
