"use client";

import React, { JSX } from "react";
import image2 from "./image-2.png";
import image3 from "./image-3.png";
import image4 from "./image-4.png";
import image from "./image.png";
import { CategoryCard } from "../CategoryCard/CategoryCard";

const categories = [
  {
    title: "Сукні",
    image: image3,
    width: "w-[495px]",
    className: "sm:col-span-2",
  },
  {
    title: "Костюми",
    image: image2,
    width: "w-[701px]",
    className: "sm:col-span-4",
  },
  {
    title: "Аксесуари",
    image: image4,
    width: "w-[701px]",
    className: "sm:col-span-4",
  },
  {
    title: "Куртки",
    image: image,
    width: "w-[495px]",
    className: "sm:col-span-2",
  },
];

export const Categories = (): JSX.Element => {
  return (
    <section className="relative flex flex-col w-full items-start gap-10 px-[112px] py-[70px]">
      <h2 className="header-2 text-center w-full block">КАТЕГОРІЇ</h2>
      <div className="grid grid-cols-2 w-full gap-3 sm:grid-cols-6">
        <CategoryCard {...categories[0]} />
        <CategoryCard {...categories[1]} />
        <CategoryCard {...categories[2]} />
        <CategoryCard {...categories[3]} />
      </div>
      <div className="absolute top-0 left-[calc(-50vw+50%)] w-[100vw] h-full bg-primary-project z-[-1]" />
    </section>
  );
};
