"use client";

import React, {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { IProductSelect } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge, Burger } from "@/components/svg";
import { Person } from "@/components/svg/Person";
import { categories } from "@/lib/mocks";
import { useAtom } from "jotai";
import { productCart } from "@/lib/store";
import Link from "next/link";
import { HeaderSearch } from "@/components/layout/HeaderSearch";

interface Props {
  setProducts?: Dispatch<SetStateAction<IProductSelect[]>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ setProducts, setLoading }: Props): JSX.Element => {
  const router = useRouter();
  const [basket] = useAtom(productCart);

  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const handleRoute = (route?: string) => {
    if (route) {
      router.push(route);
    }

    setIsOpen(false);

    if (!setLoading || !setProducts) return;
    setProducts([]);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full flex items-start justify-center z-40">
        <div className="max-w-8xl h-[65px] md:h-[83px] lg:h-[116px] flex gap-4 w-full items-center justify-between px-4 md:px-20 lg:px-[112px] rounded-b-4xl bg-white">
          <div
            className={cn("flex gap-2 items-center", {
              ["hidden md:flex"]: isOpen,
            })}
          >
            <Dialog open={dialog} modal onOpenChange={setDialog}>
              <DialogTrigger className={"cursor-pointer"}>
                <Burger size={24} className="block md:hidden" color={"black"} />
              </DialogTrigger>
              <DialogContent
                className={
                  "w-screen h-screen sm:max-w-screen max-w-screen rounded-b-3xl rounded-t-none px-4 py-8 md:hidden overflow-y-auto"
                }
              >
                <DialogHeader hidden>
                  <DialogTitle />
                  <DialogDescription />
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
                          className={"font-normal"}
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
            <Button variant={"ghost"} asChild>
              <Link href={"/"} onClick={() => handleRoute("/")}>
                <Image
                  alt="Madlen Logo"
                  src="/Logo.webp"
                  width={185}
                  height={67}
                  className={
                    "lg:w-[185px] lg:h-[67px] md:w-[140px] md:h-[51px] w-[112px] h-[41px]"
                  }
                />
              </Link>
            </Button>
          </div>

          <nav
            className={cn("gap-4 lg:gap-9 hidden md:flex", {
              ["md:hidden"]: isOpen,
            })}
          >
            <NavWrapper onClick={handleRoute}>
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

          <div
            className={cn(`flex items-center gap-4 lg:gap-8`, {
              ["justify-end w-full flex-1"]: isOpen,
            })}
          >
            <HeaderSearch
              setProducts={setProducts}
              setLoading={setLoading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <Button
              variant={"ghost"}
              className={cn("relative", {
                ["hidden md:flex"]: isOpen,
              })}
              onClick={() => router.push("/cart")}
            >
              <Badge
                size={24}
                color={"black"}
                className={"w-5 h-5 lg:w-6 lg:h-6"}
              />
              {basket.length > 0 && (
                <span
                  className={
                    "absolute text-[10px] lg:text-[11px] text-white font-normal -top-2 -right-1 lg:-right-2 leading-none lg:leading-5 py-0.5 px-1 lg:p-0 lg:w-5 lg:h-5 bg-gray-project-100 rounded-full max-w-[33px] text-ellipsis overflow-hidden text-nowrap"
                  }
                >
                  {basket.length > 99 ? "99+" : basket.length}
                </span>
              )}
            </Button>
            <Button
              variant={"ghost"}
              className={cn({
                ["hidden md:flex"]: isOpen,
              })}
            >
              <Person
                size={24}
                color={"black"}
                className={"w-5 h-5 lg:w-6 lg:h-6"}
              />
            </Button>
          </div>
        </div>
      </header>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn("absolute w-full h-full transition-all duration-300", {
          ["bg-gray-project-10/50 z-20"]: isOpen,
          ["pointer-events-none z-0"]: !isOpen,
        })}
      />
    </>
  );
};
