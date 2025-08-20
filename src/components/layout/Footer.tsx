"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Facebook, Instagram, TikTok } from "@/components/svg";

export const Footer = () => {
  const router = useRouter();

  return (
    <footer id={"footer"} className="w-full flex items-center justify-center">
      <div className="grid grid-cols-2 grid-rows-[1fr_auto] gap-5 md:gap-0 md:grid-cols-12 md:grid-rows-1 w-full items-start max-w-8xl px-4 md:px-20 py-[50px] lg:px-[112px] lg:py-[70px]">
        <div className="flex flex-col gap-10 md:col-span-2 md:col-start-1 md:row-start-1 lg:pt-8">
          <Button
            className={"items-start justify-start"}
            variant={"ghost"}
            onClick={() => router.push("/", { scroll: true })}
          >
            <Image alt="Madlen Logo" src="/Logo.webp" width={185} height={68} />
          </Button>

          <div className={"flex flex-col gap-4 items-start justify-start"}>
            <span className="flex flex-col gap-2">
              <p className="text-r-3 text-gray-project-90">+380 67 665 23 22</p>
              <p className="text-r-3 text-gray-project-90">madlen@gmail.com</p>
              <p className="text-r-3 text-gray-project-90">
                м. Київ, вул. Незалежності буд. 32
              </p>
            </span>
            <div className="flex gap-2">
              <Button className={"!p-2"} asChild>
                <a href="">
                  <Instagram color={"white"} />
                </a>
              </Button>

              <Button className={"!p-2"} asChild>
                <a href="">
                  <Facebook color={"white"} />
                </a>
              </Button>

              <Button className={"!p-2"} asChild>
                <a href="">
                  <TikTok color={"white"} />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <nav className="md:col-span-2 md:col-start-5 md:row-start-1 lg:flex lg:col-start-4 lg:col-span-4 lg:justify-between lg:pt-8">
          <span className="flex flex-col gap-2 pt-5 md:pt-0 pb-4">
            <Button className={"text-r-3 justify-start"} variant={"link"}>
              Каталог
            </Button>
            <Button className={"text-r-3 justify-start"} variant={"link"}>
              Новинки
            </Button>
            <Button className={"text-r-3 justify-start"} variant={"link"}>
              Категорії
            </Button>
            <Button className={"text-r-3 justify-start"} variant={"link"}>
              Контакти
            </Button>
          </span>
          <span className="flex flex-col gap-2 pb-2">
            <Button className={"text-r-3 justify-start"} variant={"link"}>
              Політика конфіденційності
            </Button>
            <Button className={"text-r-3 justify-start"} variant={"link"}>
              Умови використання
            </Button>
          </span>
        </nav>
        <div className="flex flex-col justify-between md:h-full md:mt-0 col-span-2 row-start-2 md:row-start-1 md:col-start-9 md:col-span-9 lg:col-start-9 xl:col-start-9 xl:col-span-8 lg:pt-8">
          <div className={"flex flex-col gap-3 pb-6 md:pb-0"}>
            <p className={"text-r-3 text-gray-project-100 mb-1.5"}>
              БУДЬТЕ НА ЗВ&#39;ЯЗКУ
            </p>
            <p className="text-r-3 text-gray-project-80">
              Підпишіться на новини про наші останні надходження, ексклюзивні
              акції та події
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Введіть ваш e-mail"
                className="rounded-lg !pr-20"
              />
              <Button
                type="submit"
                className={"absolute right-0 top-0 !p-3 lg:!p-5"}
              >
                <ArrowRight size={18} color={"white"} />
              </Button>
            </form>
          </div>
          <p className="text-center md:text-right text-gray-project-60 text-r-4 w-full">
            © 2025 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
