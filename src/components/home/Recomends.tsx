import React from "react";
import { CardProduct } from "@/components/product/CardProduct";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { mapToProductSelect } from "@/lib/api";
import Link from "next/link";

export const Recommends = async () => {
  let products: ReturnType<typeof mapToProductSelect>[] = [];

  try {
    const raw = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { id: true, slug: true, title: true } },
        colors: {
          include: { images: { orderBy: { position: "asc" }, take: 1 } },
          take: 1,
        },
      },
    });

    products = raw.map((p) =>
      mapToProductSelect({
        ...p,
        priceMain: p.priceMain,
        priceDiscount: p.priceDiscount,
        colors: p.colors.map((c) => ({
          ...c,
          images: c.images.map((img) => ({ ...img, url: img.url })),
        })),
      }),
    );
  } catch {
    // DB not connected — render empty state
  }

  return (
    <section
      id="products"
      className="flex flex-col items-start gap-[50px] py-[60px] md:py-20 lg:py-[120px] px-4 md:px-20 lg:px-[112px] relative"
    >
      <div className="flex items-center justify-between w-full">
        <h2 className="header-2 text-gray-project-100">НОВИНКИ</h2>
        <Button variant="outline" asChild>
          <Link href="/catalog">Переглянути все</Link>
        </Button>
      </div>

      {products.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-r-2 text-gray-project-60 text-center w-full py-8">
          Товарів поки немає
        </p>
      )}
    </section>
  );
};
