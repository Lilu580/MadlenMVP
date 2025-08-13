"use client";

import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  image: string;
  className?: string;
}

export const CategoryCard = ({ title, image, className }: Props) => (
  <Button
    variant={"ghost"}
    className={`relative w-full h-[190px] sm:h-[270px] lg:h-[350px] border-4 lg:border-8 shadow-md border-white rounded-[20px] overflow-hidden ${className}`}
  >
    <Image
      className="w-full h-full object-cover object-top"
      alt={title}
      src={image}
      fill
    />
    <p className="absolute top-4 left-4 text-gray-project-100 text-m-1">
      {title}
    </p>
  </Button>
);
