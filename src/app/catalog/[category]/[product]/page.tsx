"use client";

import React, { JSX, useEffect, useState } from "react";
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
import { getDiscountPercent } from "@/lib/utils";
import { product } from "@/lib/mocks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState<string>(
    searchParams.get("color") || product.colors[0].color,
  );
  const [selectedCount, setSelectedCount] = useState<number>(1);

  const handleChangeColor = (value: string) => {
    setSelectedColor(value);
    const count = product.colors.find((v) => v.color === value)!.count;
    if (selectedCount > count) {
      setSelectedCount(count);
    }
  };

  const handleChangeCount = (value: number) => {
    const count = product.colors.find((v) => v.color === selectedColor)!.count;
    const valueNew = value >= count ? count : value <= 1 ? 1 : value;
    setSelectedCount(valueNew);
  };

  const handleChangeBtnLeft = () => {
    setSelectedCount(selectedCount - 1 <= 1 ? 1 : selectedCount - 1);
  };

  const handleChangeBtnRight = () => {
    const count = product.colors.find((v) => v.color === selectedColor)!.count;
    setSelectedCount(selectedCount + 1 >= count ? count : selectedCount + 1);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("color", selectedColor);
    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedColor]);

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
            <BreadcrumbLink href="/product">Костюми</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div
        className={
          "flex flex-col md:flex-row items-center md:items-start justify-start w-full gap-4 lg:gap-5"
        }
      >
        <ProductImage
          images={product.colors.find((v) => v.color === selectedColor)!.images}
          color={selectedColor}
        />
        <section
          className={
            "flex gap-8 lg:gap-10 items-start justify-start flex-col w-full"
          }
        >
          <section className={"flex flex-col gap-6 lg:gap-8 w-full"}>
            <section className={"flex flex-col gap-2 w-full"}>
              <h2 className={"header-2 text-gray-project-100"}>
                {product.name}
              </h2>
              <p className={"text-r-1 text-gray-project-80"}>
                Артикул №${product.article}
              </p>
            </section>
            <section className={"flex gap-4 items-center justify-start"}>
              {product.price.discount ? (
                <>
                  <span className={"flex gap-3"}>
                    <h3 className={"header-3 text-gray-project-100"}>
                      {product.price.discount} {product.price.currency}
                    </h3>
                    <p className={"header-3 text-gray-project-50 line-through"}>
                      {product.price.main} {product.price.currency}
                    </p>
                  </span>
                  <Badge variant="destructive">
                    -
                    {getDiscountPercent(
                      product.price.main,
                      product.price.discount,
                    )}
                    %
                  </Badge>
                </>
              ) : (
                <span className={"flex gap-3"}>
                  <h3 className={"header-3 text-gray-project-100"}>
                    ${product.price.main}
                    {product.price.currency}
                  </h3>
                </span>
              )}
            </section>
            <section
              className={"flex flex-col justify-start items-start gap-6"}
            >
              <div className={"flex flex-col gap-4 lg:gap-5"}>
                <p className={"text-m-1 text-gray-project-90"}>Вибір кольору</p>
                <RadioGroup
                  defaultValue={selectedColor}
                  value={selectedColor}
                  onValueChange={handleChangeColor}
                  className={"flex gap-4"}
                >
                  {product.colors.map(({ color }, index) => (
                    <RadioGroupItem
                      key={index}
                      isCheck
                      value={color}
                      id="r1"
                      style={{
                        background: color,
                      }}
                      className={`w-8 h-8 lg:w-[37px] lg:h-[37px] border-none`}
                    />
                  ))}
                </RadioGroup>
              </div>
              <div className={"flex flex-col gap-4 lg:gap-5"}>
                <p className={"text-m-1 text-gray-project-90"}>
                  Вибір кількості
                </p>
                <div className={"flex items-center justify-start gap-2.5"}>
                  <Button
                    size={"icon"}
                    className={"!p-2 rounded-[4px]"}
                    onClick={handleChangeBtnLeft}
                  >
                    <ArrowRight
                      className={"size-3 stroke-gray-project-10 rotate-180"}
                    />
                  </Button>
                  <Input
                    type={"number"}
                    value={selectedCount}
                    onChange={(e) => handleChangeCount(e.target.valueAsNumber)}
                    placeholder={"1"}
                    className={
                      "border-none bg-gray-project-100 rounded-[4px] placeholder:text-gray-project-20 text-gray-project-10 max-w-16 max-h-9 text-center"
                    }
                  />
                  <Button
                    size={"icon"}
                    className={"!p-2 rounded-[4px]"}
                    onClick={handleChangeBtnRight}
                  >
                    <ArrowRight className={"size-3 stroke-gray-project-10"} />
                  </Button>
                </div>
              </div>
            </section>
            <Dialog>
              <DialogTrigger asChild>
                <Button className={"w-full lg:max-w-[392px]"}>
                  Додати в кошик
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Товар успішно додано до кошика</DialogTitle>
                  <DialogDescription className={"hidden"}></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </section>
          <section className={"flex gap-4 w-full"}>
            <Accordion type="multiple" className="w-full gap-4 flex flex-col">
              {product.descriptions.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="w-full !border px-4 py-6 lg:p-7 rounded-[20px]"
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
