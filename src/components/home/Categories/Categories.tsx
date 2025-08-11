"use client";

import React from "react";
import image2 from "./image-2.png";
import image3 from "./image-3.png";
import image4 from "./image-4.png";
import image from "./image.png";
import { CategoryCard } from "../CategoryCard";
import { cn } from "@/lib/utils";

export const Categories = () => {
  return (
    <section className="relative flex flex-col w-full items-start gap-10 px-4 md:px-20 lg:px-[112px] py-[70px] bg-primary-project rounded-4xl">
      <h2 className="header-2 text-center w-full block">КАТЕГОРІЇ</h2>
      <div className="grid grid-cols-6 w-full gap-3">
        {categories.map((categories, index) => {
          const isEvenRow = Math.floor(index / 2) % 2 === 1; // четный ряд (2-й, 4-й, ...)
          const isFirstInRow = index % 2 === 0; // первый элемент в ряду

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

          return (
            <CategoryCard
              className={cn(colWidth)}
              key={index}
              {...categories}
            />
          );
        })}
      </div>
    </section>
  );
};

const categories = [
  {
    title: "Сукні",
    image: image3,
  },
  {
    title: "Костюми",
    image: image2,
  },
  {
    title: "Аксесуари",
    image: image4,
  },
  {
    title: "Куртки",
    image: image,
  },
];
