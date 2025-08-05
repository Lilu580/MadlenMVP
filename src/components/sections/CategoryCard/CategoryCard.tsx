"use client";

import React from "react";

import Image, { StaticImageData } from "next/image";

export const CategoryCard = ({
  title,
  image,
  className
}: { title: string; image: StaticImageData; className: string }) => (

    <div className={`relative flex-1 w-full h-[180px] sm:h-[260px] lg:h-[350px] ${className}`}>
      <Image
        className=" w-full h-full rounded-[20px] object-cover object-top"
        alt={title}
        src={image}
      />
      <h3 className="absolute top-4 left-4 text-[#1a1a18] text-2xl font-medium [font-family:'EB_Garamond-Medium',Helvetica]">
        {title}
      </h3>
    </div>
);