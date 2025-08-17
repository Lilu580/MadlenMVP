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
import { CardProduct } from "@/components/product/CardProduct";
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
import { SortPage } from "@/components/catalog/SortPage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SkeletonProduct } from "@/components/layout/SkeletonProduct";
import { products } from "@/lib/mocks";

export default function Page(): JSX.Element {
  const [price, setPrice] = useState<[number, number]>([0, 3000]);
  const [material, setMaterial] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("growth");
  const [loading, setLoading] = useState(false);

  const refSearch = useRef<NodeJS.Timeout | undefined>(undefined);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = useCallback(
    ({
      price,
      material,
      sort,
    }: {
      price: [number, number];
      material: string[];
      sort: string;
    }) => {
      // сбрасываем старый таймер
      if (refSearch.current) {
        clearTimeout(refSearch.current);
      }

      refSearch.current = setTimeout(async () => {
        try {
          setLoading(true);

          // формируем query
          const params = new URLSearchParams();

          if (price) params.set("price", JSON.stringify(price));
          if (material.length) params.set("material", JSON.stringify(material));
          if (sort) params.set("sort", sort);

          // пушим в адресную строку
          router.push(`${pathname}?${params.toString()}`, { scroll: false });

          // эмуляция запроса
          await new Promise((resolve) => setTimeout(resolve, 600));

          console.log("Фильтр применён:", { price, material, sort });
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }, 500);
    },
    [pathname, router],
  );

  useEffect(() => {
    const price = searchParams.get("price");
    const material = searchParams.get("material");
    const sort = searchParams.get("sort");
    if (price) setPrice(JSON.parse(price));
    if (material) setMaterial(JSON.parse(material));
    if (sort) setSort(sort);
  }, []);

  useEffect(() => {
    handleFilter({ price, material, sort });
  }, [price, material, sort]);

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/public">Головна</BreadcrumbLink>
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
        <div
          className={"flex w-full items-end md:items-center justify-between"}
        >
          <div
            className={
              "flex md:flex-row flex-col-reverse items-start md:items-center justify-center gap-6"
            }
          >
            <FilterPage
              state={{ price, material }}
              setMaterial={setMaterial}
              setPrice={setPrice}
            />
            <h2
              className={
                "header-2 md:text-[26px] text-gray-project-100 uppercase"
              }
            >
              Костюми
            </h2>
          </div>
          <SortPage sort={sort} setSort={setSort} />
        </div>
        <div className={"flex flex-col gap-10 w-full"}>
          <div
            className={"flex flex-wrap gap-x-4 gap-y-6 md:gap-y-8 lg:gap-y-10 "}
          >
            {loading
              ? "012345"
                  .split("")
                  .map((key) => <SkeletonProduct size={"xs"} key={key} />)
              : products.map((item, index) => (
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
