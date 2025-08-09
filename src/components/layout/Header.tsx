"use client";

import React, { JSX, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Header = (): JSX.Element => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 w-full flex items-start justify-center z-50">
      <div className="max-w-8xl h-[65px] md:h-[83px] lg:h-[116px] flex gap-4 w-full items-center justify-between px-4 md:px-20 lg:px-[112px] rounded-b-4xl bg-white">
        <div className={"flex gap-2 items-center"}>
          <Button variant={"ghost"}>
            <Image
              alt="menu"
              src="/Burger.svg"
              width={24}
              height={24}
              className="block md:hidden"
            />
          </Button>
          <Image
            alt="Madlen Logo"
            src="/Logo.svg"
            width={185}
            height={67}
            className={
              "lg:w-[185px] lg:h-[67px] md:w-[140px] md:h-[51px] w-[112px] h-[41px]"
            }
          />
        </div>

        <nav className="gap-4 lg:gap-9 hidden md:flex">
          <Button variant={"link"} onClick={() => router.push("/catalog")}>
            Каталог
          </Button>
          <Button
            variant={"link"}
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Новинки
          </Button>
          <Button variant={"link"}>Категорії</Button>
          <Button
            variant={"link"}
            onClick={() =>
              document
                .getElementById("footer")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Контакти
          </Button>
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
