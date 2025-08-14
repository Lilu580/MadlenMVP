"use client";

import React, {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { TProduct } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge, Burger } from "@/components/svg";
import { Person } from "@/components/svg/Person";
import { Search } from "@/components/svg/Search";

interface Props {
  setProducts?: Dispatch<SetStateAction<TProduct[]>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ setProducts, setLoading }: Props): JSX.Element => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [search, setSearch] = useState("");

  const refSearch = useRef<NodeJS.Timeout | undefined>(undefined);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (search: string) => {
    setSearch(search);

    if (!setLoading || !setProducts) return;

    const params = new URLSearchParams(searchParams.toString());
    if (search.trim() !== "") {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);

    setLoading(true);
    clearTimeout(refSearch.current);

    refSearch.current = setTimeout(() => {
      if (search.trim() !== "") {
        const filtered = products.filter((item) =>
          item.name.toLowerCase().includes(search.trim().toLowerCase()),
        );
        setProducts(filtered);
      } else {
        setProducts([]);
      }
      setLoading(false);
    }, 500);
  };

  const handleRoute = (route?: string) => {
    if (route) {
      router.push(route);
    }

    setIsOpen(false);
    setSearch("");

    if (!setLoading || !setProducts) return;
    setProducts([]);
    setLoading(false);
  };

  useEffect(() => {
    const search = searchParams.get("search");

    if (search?.trim()) {
      handleSearch(search);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full flex items-start justify-center z-50">
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
            <Button variant={"ghost"} onClick={() => handleRoute("/")}>
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
            <div
              className={cn("relative max-w-8", {
                ["w-full max-w-none md:max-w-[304px] lg:max-w-[708px]"]: isOpen,
              })}
            >
              <Input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                name={"search"}
                type={"search"}
                className={cn("pr-36", {
                  ["w-full opacity-100"]: isOpen,
                  ["h-6 w-6 pointer-events-none opacity-0"]: !isOpen,
                })}
              />
              <div
                className={cn(
                  "absolute flex w-full h-full top-0 right-0 items-center justify-end pointer-events-none",
                  {
                    ["pr-4"]: isOpen,
                    ["pr-1"]: !isOpen,
                  },
                )}
              >
                <Button
                  variant={"ghost"}
                  className={"pointer-events-auto"}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <Search
                    size={24}
                    color={"black"}
                    className={"w-5 h-5 lg:w-6 lg:h-6"}
                  />
                </Button>
              </div>
            </div>
            <Button
              variant={"ghost"}
              className={cn({
                ["hidden md:flex"]: isOpen,
              })}
            >
              <Badge
                size={24}
                color={"black"}
                className={"w-5 h-5 lg:w-6 lg:h-6"}
              />
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

const categories = [
  {
    title: "Знижки",
    image: "/recommend-1.png",
  },
  {
    title: "Сукні",
    image: "/recommend-1.png",
  },
  {
    title: "Костюми",
    image: "/recommend-1.png",
  },
  {
    title: "Куртки",
    image: "/recommend-1.png",
  },
  {
    title: "Аксесуари",
    image: "/recommend-1.png",
  },
  {
    title: "Аксесуари",
    image: "/recommend-1.png",
  },
  {
    title: "Аксесуари",
    image: "/recommend-1.png",
  },
];

const products: TProduct[] = [
  {
    name: "Сукня вечірня",
    price: "1200₴",
    oldPrice: "1800₴",
    imageSrc: "/recommend-1.png",
  },
  {
    name: "Костюм класичний",
    price: "2500₴",
    oldPrice: "3200₴",
    imageSrc: "/recommend-1.png",
  },
  {
    name: "Куртка демісезонна",
    price: "1800₴",
    oldPrice: "2400₴",
    imageSrc: "/recommend-1.png",
  },
  {
    name: "Аксесуари набір",
    price: "800₴",
    oldPrice: "1200₴",
    imageSrc: "/recommend-1.png",
  },
  {
    name: "Сукня коктейльна",
    price: "1500₴",
    oldPrice: "2100₴",
    imageSrc: "/recommend-1.png",
  },
];
