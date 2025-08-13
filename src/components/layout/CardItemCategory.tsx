"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  image: string;
  className?: string;
}

export const CardItemCategory = ({ title, image, className }: Props) => {
  return (
    <Button
      variant={"ghost"}
      className={cn("flex flex-col gap-2 lg:gap-5", className)}
    >
      <div
        className={
          "lg:w-[153px] lg:h-[175px] md:w-[99px] md:h-[110px] w-full h-[136px] relative"
        }
      >
        <Image
          className={"object-cover object-center rounded-[10px] w-full h-full"}
          fill
          src={image}
          alt={title}
        />
      </div>
      <p className={"text-m-1 text-center w-full"}>{title}</p>
    </Button>
  );
};
