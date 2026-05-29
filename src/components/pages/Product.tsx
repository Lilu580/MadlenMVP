"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { CardMain } from "@/components/layout/CardMain";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductImage } from "@/components/product/ProductImage";
import { BreadCrumbs } from "@/components/layout/BreadCrumbs";
import { ProductAccording } from "@/components/product/ProductAccording";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductChoose } from "@/components/product/ProductChoose";
import { ProductAddToBasket } from "@/components/product/ProductAddToBasket";
import { TProductColor } from "@/lib/types";
import { SkeletonProducts } from "@/components/skeletons/SkeletonProducts";
import { fetchProduct, mapToProductInsert } from "@/lib/api";
import { IProductInsert } from "@/lib/types";

function ProductInitial() {
  const params = useParams<{ category: string; product: string }>();
  const productId = params.product;
  const categorySlug = params.category;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [productData, setProductData] = useState<IProductInsert | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!productId) return;
    fetchProduct(productId).then((raw) => {
      if (!raw) { setNotFound(true); return; }
      setProductData(mapToProductInsert(raw));
      setCategoryTitle(raw.category?.title ?? "");
    });
  }, [productId]);

  const [selectedColor, setSelectedColor] = useState<TProductColor | null>(null);
  const [selectedCount, setSelectedCount] = useState<number>(1);

  // Set initial color when product loads
  useEffect(() => {
    if (!productData) return;
    const colorFromUrl = searchParams?.get("color");
    const initial =
      productData.colors.find((c) => c.color === colorFromUrl) ??
      productData.colors[0];
    setSelectedColor(initial ?? null);
  }, [productData, searchParams]);

  const color = useMemo(
    () =>
      productData?.colors.find((c) => c.color === selectedColor?.color) ?? null,
    [productData, selectedColor],
  );

  // Sync selected color to URL
  useEffect(() => {
    if (!selectedColor) return;
    const p = new URLSearchParams(searchParams?.toString());
    p.set("color", selectedColor.color);
    router.replace(`${pathname}?${p.toString()}`);
  }, [selectedColor]);

  const handleChangeColor = (value: TProductColor) => {
    setSelectedColor(value);
    if (color && selectedCount > color.count) setSelectedCount(color.count);
  };

  const handleChangeCount = (value: number) => {
    if (!color) return;
    setSelectedCount(value >= color.count ? color.count : value <= 1 ? 1 : value);
  };

  const handleChangeBtnLeft = () => {
    setSelectedCount((prev) => (prev - 1 <= 1 ? 1 : prev - 1));
  };

  const handleChangeBtnRight = () => {
    if (!color) return;
    setSelectedCount((prev) => (prev + 1 >= color.count ? color.count : prev + 1));
  };

  if (notFound) {
    return (
      <CardMain className="mt-6 lg:mt-8">
        <p className="text-r-1 text-gray-project-60 text-center py-16">
          Товар не знайдено
        </p>
      </CardMain>
    );
  }

  if (!productData || !selectedColor || !color) {
    return <SkeletonProducts />;
  }

  return (
    <CardMain className="mt-6 lg:mt-8 md:gap-11 lg:gap-16">
      <BreadCrumbs
        mainTitle={productData.name}
        links={[
          { link: "/", title: "Головна" },
          { link: "/catalog", title: "Каталог" },
          ...(categorySlug
            ? [{ link: `/catalog/${categorySlug}`, title: categoryTitle || categorySlug }]
            : []),
        ]}
      />
      <div className="flex flex-col md:flex-row items-center md:items-start justify-start w-full gap-4 lg:gap-5">
        <ProductImage images={color.images} color={selectedColor.color} />
        <section className="flex gap-8 lg:gap-10 items-start justify-start flex-col w-full">
          <section className="flex flex-col gap-6 lg:gap-8 w-full">
            <section className="flex flex-col gap-2 w-full">
              <h2 className="header-2 text-gray-project-100">{productData.name}</h2>
              <p className="text-r-1 text-gray-project-80">
                Артикул №{productData.article}
              </p>
            </section>
            <ProductPrice price={productData.price} />
            <ProductChoose
              handleChangeColor={handleChangeColor}
              handleChangeBtnLeft={handleChangeBtnLeft}
              handleChangeBtnRight={handleChangeBtnRight}
              handleChangeCount={handleChangeCount}
              selectedColor={selectedColor}
              selectedCount={selectedCount}
              colors={productData.colors}
            />
            <ProductAddToBasket
              product={{
                ...productData,
                image: color.images[0]?.link ?? "",
                color: selectedColor.color,
                count: selectedCount,
                nameColor: selectedColor.nameColor,
                maxCount: color.count,
                id: `${productData.id}_${selectedColor.color}`,
                categorySlug,
              }}
            />
          </section>
          <ProductAccording descriptions={productData.descriptions} />
        </section>
      </div>
    </CardMain>
  );
}

export function Product() {
  return (
    <Suspense fallback={<SkeletonProducts />}>
      <ProductInitial />
    </Suspense>
  );
}
