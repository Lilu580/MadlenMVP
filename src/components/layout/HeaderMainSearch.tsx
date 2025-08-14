"use client";
import { Header } from "@/components/layout/Header";
import { useState } from "react";
import { TProduct } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { CardProduct } from "@/components/home/CardProduct";
import { SkeletonProduct } from "@/components/layout/SkeletonProduct";
import { CardMain } from "@/components/layout/CardMain";

interface Props {
  children: React.ReactNode;
}

export const HeaderMainSearch = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<TProduct[]>([]);
  const searchParams = useSearchParams();

  return (
    <>
      <Header setLoading={setLoading} setProducts={setProducts} />
      <main className="mx-auto max-w-8xl w-full">
        {loading ? (
          <CardMain className={"md:mt-10 lg:mt-[60px] mt-10"}>
            <Skeleton className={"h-[43px] w-full"} />
            <div className={"flex flex-wrap gap-4"}>
              {"01234567".split("").map((item) => (
                <SkeletonProduct key={item} size={"xs"} />
              ))}
            </div>
          </CardMain>
        ) : products.length === 0 ? (
          children
        ) : (
          <CardMain className={"md:mt-10 lg:mt-[60px] mt-10"}>
            <div className={"flex w-full items-center justify-between"}>
              <h2 className={"header-2 text-gray-project-90"}>
                Результат пошуку «{searchParams.get("search")}»
              </h2>
              <p className={"text-r-2 text-gray-project-80"}>
                Знайдено {products.length} товара
              </p>
            </div>
            <div className={"flex flex-wrap gap-4"}>
              {products.map((product) => (
                <CardProduct key={product.name} product={product} size={"xs"} />
              ))}
            </div>
          </CardMain>
        )}
      </main>
    </>
  );
};
