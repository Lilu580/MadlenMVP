"use client";

import React, { JSX, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import image from "@/components/home/Recomends/image.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NavWrapper } from "@/components/layout/NavWrapper";
import { CardItemCategory } from "@/components/layout/CardItemCategory";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Header = (): JSX.Element => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const [dialog, setDialog] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex items-start justify-center z-50">
      <div className="max-w-8xl h-[65px] md:h-[83px] lg:h-[116px] flex gap-4 w-full items-center justify-between px-4 md:px-20 lg:px-[112px] rounded-b-4xl bg-white">
        <div className={"flex gap-2 items-center"}>
          <Dialog open={dialog} modal onOpenChange={setDialog}>
            <DialogTrigger>
              <Image
                alt="menu"
                src="/Burger.svg"
                width={24}
                height={24}
                className="block md:hidden"
              />
            </DialogTrigger>
            <DialogContent
              className={
                "w-screen h-screen sm:max-w-screen max-w-screen rounded-b-3xl rounded-t-none px-4 py-8 md:hidden"
              }
            >
              <DialogHeader className={"hidden"}>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div
                className={
                  "flex flex-col w-full items-start justify-start gap-4"
                }
              >
                <NavWrapper
                  onClick={() => {
                    setDialog(false);
                  }}
                >
                  <Accordion collapsible type={"single"} className={"w-full"}>
                    <AccordionItem value={"1"}>
                      <Button
                        className={"text-lg font-normal"}
                        variant={"link"}
                        asChild
                      >
                        <AccordionTrigger
                          className={"p-0 items-center justify-start"}
                        >
                          Категорії
                        </AccordionTrigger>
                      </Button>
                      <AccordionContent
                        className={
                          "grid !w-full grid-cols-2 gap-2 pt-4 pb-0 [&>button:last-of-type]:col-span-2"
                        }
                      >
                        {categories.map((item, index) => (
                          <CardItemCategory {...item} key={index} />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </NavWrapper>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant={"ghost"} onClick={() => router.push("/")}>
            <Image
              alt="Madlen Logo"
              src="/Logo.svg"
              width={185}
              height={67}
              className={
                "lg:w-[185px] lg:h-[67px] md:w-[140px] md:h-[51px] w-[112px] h-[41px]"
              }
            />
          </Button>
        </div>

        <nav className="gap-4 lg:gap-9 hidden md:flex">
          <NavWrapper>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"link"}>Категорії</Button>
              </PopoverTrigger>
              <PopoverContent
                align={"center"}
                className={
                  "md:mt-6 lg:mt-10 border-0 shadow-2xl py-8 lg:py-[70px] px-10 lg:px-[103px] hidden md:flex flex-wrap gap-2 lg:gap-[60px] !w-auto max-w-lg lg:max-w-5xl rounded-3xl"
                }
              >
                {categories.map((item, index) => (
                  <CardItemCategory {...item} key={index} />
                ))}
              </PopoverContent>
            </Popover>
          </NavWrapper>
        </nav>

        <div className={`flex items-center gap-4 lg:gap-8`}>
          <Button variant={"ghost"}>
            <Image
              alt="search"
              src="/Search.svg"
              width={24}
              height={24}
              className={"w-5 h-5 lg:w-6 lg:h-6"}
            />
          </Button>
          <Button variant={"ghost"}>
            <Image
              alt="search"
              src="/Badge.svg"
              width={24}
              height={24}
              className={"w-5 h-5 lg:w-6 lg:h-6"}
            />
          </Button>
          <Button variant={"ghost"}>
            <Image
              alt="search"
              src="/Person.svg"
              width={24}
              height={24}
              className={"w-5 h-5 lg:w-6 lg:h-6"}
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

const categories = [
  {
    title: "Знижки",
    image: image,
  },
  {
    title: "Сукні",
    image: image,
  },
  {
    title: "Костюми",
    image: image,
  },
  {
    title: "Куртки",
    image: image,
  },
  {
    title: "Аксесуари",
    image: image,
  },
  {
    title: "Аксесуари",
    image: image,
  },
  {
    title: "Аксесуари",
    image: image,
  },
];
