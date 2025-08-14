"use client";

import React, { JSX, useCallback, useEffect, useRef, useState } from "react";
import { CardMain } from "@/components/layout/CardMain";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductImage } from "@/components/product/ProductImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "@/components/svg";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page(): JSX.Element {
  const refSearch = useRef<NodeJS.Timeout | undefined>(undefined);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Головна</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/jeans">Костюми</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Костюм</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className={"flex items-start justify-start w-full gap-5"}>
        <ProductImage />
        <section
          className={"flex gap-10 items-start justify-start flex-col w-full"}
        >
          <section className={"flex flex-col gap-8 w-full"}>
            <section className={"flex flex-col gap-2 w-full"}>
              <h2 className={"header-2 text-gray-project-100"}>
                {products.name}
              </h2>
              <p className={"text-r-1 text-gray-project-80"}>Артикул №245456</p>
            </section>
            <section className={"flex gap-2 items-center justify-start"}>
              <span className={"flex gap-3"}>
                <h3 className={"header-3 text-gray-project-100"}>1 200,00 ₴</h3>
                <p className={"header-3 text-gray-project-50 line-through"}>
                  1 500,00 ₴
                </p>
              </span>
              <Badge variant="destructive">-10%</Badge>
            </section>
            <section
              className={"flex flex-col justify-start items-start gap-6"}
            >
              <div className={"flex flex-col gap-5"}>
                <p className={"text-m-1 text-gray-project-90"}>Вибір кольору</p>
                <RadioGroup defaultValue={colors[0]} className={"flex"}>
                  {colors.map((color, index) => (
                    <RadioGroupItem
                      key={index}
                      isCheck
                      value={color}
                      id="r1"
                      style={{
                        background: color,
                      }}
                      className={`w-[37px] h-[37px] border-none`}
                    />
                  ))}
                </RadioGroup>
              </div>
              <div className={"flex flex-col gap-5"}>
                <p className={"text-m-1 text-gray-project-90"}>
                  Вибір кількості
                </p>
                <div className={"flex items-center justify-start gap-2.5"}>
                  <Button size={"icon"} className={"!p-2 rounded-md"}>
                    <ArrowRight
                      className={"size-3 stroke-gray-project-10 rotate-180"}
                    />
                  </Button>
                  <Input
                    type={"number"}
                    placeholder={"1"}
                    className={
                      "border-none bg-gray-project-100 rounded-md placeholder:text-gray-project-20 text-gray-project-10 max-w-16 max-h-9 text-center"
                    }
                  />
                  <Button size={"icon"} className={"!p-2 rounded-md"}>
                    <ArrowRight className={"size-3 stroke-gray-project-10"} />
                  </Button>
                </div>
              </div>
            </section>
            <Button className={"w-[392px]"}>Додати в кошик</Button>
          </section>
          <section className={"flex gap-4 w-full"}>
            <Accordion type="multiple" className="w-full gap-4 flex flex-col">
              {according.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="w-full !border p-7 rounded-[20px]"
                >
                  <AccordionTrigger isCheck className={"p-0 items-center"}>
                    <h4 className={"header-4 text-gray-project-100"}>
                      {item.title}
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance mt-4 pb-0">
                    <p
                      className={
                        "text-r-2 text-gray-project-80 whitespace-pre-wrap"
                      }
                    >
                      {item.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </section>
      </div>
    </CardMain>
  );
}

const colors = ["#4F4631", "#314F4A", "#31344F"];

const products = {
  name: "Назва товару",
  price: "1 000,00 грн",
  oldPrice: "1 000,00 грн",
  imageSrc: "/recommend-1.png",
};

const according = [
  {
    title: "Опис / Склад та догляд",
    description:
      "Онови свій стиль з нашим якісним та трендовим одягом! Ця модель поєднує комфорт, елегантний дизайн та довговічні матеріали, що ідеально підходять для будь-яких випадків – від повсякденних прогулянок до особливих подій.",
  },
  {
    title: "Умови доставки та повернення",
    description:
      "Онови свій стиль з нашим якісним та трендовим одягом! Ця модель поєднує комфорт, елегантний дизайн та довговічні матеріали, що ідеально підходять для будь-яких випадків – від повсякденних прогулянок до особливих подій.",
  },
];
