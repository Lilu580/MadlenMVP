"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { CardMain } from "@/components/layout/CardMain";
import { CardProduct } from "@/components/product/CardProduct";
import { FilterPage } from "@/components/catalog/FilterPage";
import { SortPage } from "@/components/catalog/SortPage";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { SkeletonProduct } from "@/components/skeletons/SkeletonProduct";
import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import { PaginationCatalog } from "@/components/layout/Pagination";
import { SkeletonCatalog } from "@/components/skeletons/SkeletonCatalog";
import { IProductSelect } from "@/lib/types";
import { fetchCategories, fetchProducts, mapToProductSelect } from "@/lib/api";

function CatalogInitial() {
  const params = useParams<{ category?: string }>();
  const categorySlug = params.category;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // ─── Filter state (restored from URL on mount) ───────────────────────────────
  const [price, setPrice] = useState<[number, number]>(() => {
    const p = searchParams?.get("price");
    return p ? JSON.parse(p) : [0, 10000];
  });
  const [material, setMaterial] = useState<string[]>(() => {
    const m = searchParams?.get("material");
    return m ? JSON.parse(m) : [];
  });
  const [sort, setSort] = useState<string>(
    () => searchParams?.get("sort") ?? "growth",
  );
  const [page, setPage] = useState(1);

  // ─── Data state ───────────────────────────────────────────────────────────────
  const [products, setProducts] = useState<IProductSelect[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isFirstRender = useRef(true);

  // Load category title once
  useEffect(() => {
    if (!categorySlug) { setCategoryTitle("Каталог"); return; }
    fetchCategories()
      .then((cats) => setCategoryTitle(cats.find((c) => c.slug === categorySlug)?.title ?? categorySlug))
      .catch(() => setCategoryTitle(categorySlug));
  }, [categorySlug]);

  // Single fetch function
  const load = (currentPage: number, currentSort: string) => {
    setLoading(true);
    fetchProducts({ category: categorySlug, page: currentPage, limit: 12, sort: currentSort })
      .then((data) => {
        setProducts(data.products.map(mapToProductSelect));
        setPages(data.pages);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  };

  // On mount — load immediately
  useEffect(() => {
    load(1, sort);
  }, []);

  // On page change — load immediately
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    load(page, sort);
  }, [page]);

  // On filter/sort change — debounce + sync URL
  useEffect(() => {
    if (isFirstRender.current) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const p = new URLSearchParams();
      p.set("price", JSON.stringify(price));
      if (material.length) p.set("material", JSON.stringify(material));
      p.set("sort", sort);
      router.push(`${pathname}?${p.toString()}`, { scroll: false });
      setPage(1);
      load(1, sort);
    }, 400);
  }, [price, material, sort]);

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <BreadCrumbs
        mainTitle={categoryTitle || "Каталог"}
        links={[{ link: "/", title: "Головна" }]}
      />
      <div className="flex flex-col w-full gap-[30px]">
        <div className="flex w-full items-end md:items-center justify-between">
          <div className="flex md:flex-row flex-col-reverse items-start md:items-center justify-center gap-6">
            <FilterPage state={{ price, material }} setMaterial={setMaterial} setPrice={setPrice} />
            <h2 className="header-2 md:text-[26px] text-gray-project-100 uppercase">
              {categoryTitle}
            </h2>
          </div>
          <SortPage sort={sort} setSort={setSort} />
        </div>

        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-wrap gap-x-4 gap-y-6 md:gap-y-8 lg:gap-y-10">
            {loading
              ? "012345".split("").map((k) => <SkeletonProduct size="xs" key={k} />)
              : products.length > 0
              ? products.map((product) => (
                  <CardProduct key={product.id} product={product} size="xs" />
                ))
              : (
                  <p className="text-r-2 text-gray-project-60 py-8 w-full text-center">
                    Товарів не знайдено
                  </p>
                )}
          </div>
          {pages > 1 && (
            <PaginationCatalog page={page} pages={pages} setPage={setPage} />
          )}
        </div>
      </div>
    </CardMain>
  );
}

export function Catalog() {
  return (
    <Suspense fallback={<SkeletonCatalog />}>
      <CatalogInitial />
    </Suspense>
  );
}
