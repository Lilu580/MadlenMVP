"use client";

import React, { JSX } from "react";
import { CardMain } from "@/components/layout/CardMain";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardProduct } from "@/components/home/CardProduct";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FilterPage } from "@/components/catalog/FilterPage";

export default function Page(): JSX.Element {
  return (
    <CardMain className="lg:mt-8 gap-16">
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
            <BreadcrumbPage>Костюм</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className={"flex flex-col w-full gap-[30px]"}>
        <div className={"flex w-full items-center justify-between"}>
          <div className={"flex items-center justify-center gap-6"}>
            <FilterPage />
            <h2 className={"header-2 text-gray-project-100 uppercase"}>
              Костюми
            </h2>
          </div>
        </div>
        <div className={"flex flex-col gap-10 w-full"}>
          <div className={"flex flex-wrap gap-4"}>
            {products.map((item, index) => (
              <CardProduct key={index} product={item} size={"xs"} />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={true}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </CardMain>
  );
}

const products = Array(12).fill({
  name: "Назва товару",
  price: "1 000,00 грн",
  oldPrice: "1 000,00 грн",
  imageSrc: "/recommend-1.png",
});
