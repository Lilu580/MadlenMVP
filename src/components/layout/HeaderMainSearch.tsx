"use client";
import { Header } from "@/components/layout/Header";
import { useState } from "react";
import { IProductSelect } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { CardProduct } from "@/components/product/CardProduct";
import { SkeletonProduct } from "@/components/skeletons/SkeletonProduct";
import { CardMain } from "@/components/layout/CardMain";

interface Props {
  children: React.ReactNode;
}

export const HeaderMainSearch = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProductSelect[]>([]);
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
                Результат пошуку «{searchParams?.get("search")}»
              </h2>
              <p className={"text-r-2 text-gray-project-80"}>
                Знайдено {products.length} товара
              </p>
            </div>
            <div className={"flex flex-wrap gap-4"}>
              {products.map((product) => (
                <CardProduct
                  key={product.name}
                  product={product}
                  size={"xs"}
                  onClick={() => {
                    setProducts([]);
                    router.push(window.location.pathname);
                  }}
                />
              ))}
            </div>
          </CardMain>
        )}
      </main>
    </>
  );
};
