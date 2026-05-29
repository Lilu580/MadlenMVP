import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { DeleteProductBtn } from "@/components/admin/DeleteProductBtn";
import { formatPrice } from "@/lib/utils";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const page = Number(pageStr ?? 1);
  const limit = 15;

  const [total, products] = await Promise.all([
    prisma.product.count(),
    prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        colors: { include: { images: { orderBy: { position: "asc" }, take: 1 } } },
      },
    }),
  ]);

  const pages = Math.ceil(total / limit);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="header-2 text-gray-project-100">
          Товари <span className="text-gray-project-60 text-base font-normal">({total})</span>
        </h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-gray-project-100 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-project-90 transition-colors"
        >
          + Додати товар
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="py-16 text-center text-r-2 text-gray-project-60">
            Товарів ще немає.{" "}
            <Link href="/admin/products/new" className="underline">
              Додати перший
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-project-10 border-b border-gray-project-30">
                  <tr>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal w-16">
                      Фото
                    </th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">
                      Назва / Артикул
                    </th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">
                      Категорія
                    </th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">
                      Ціна
                    </th>
                    <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">
                      Залишок
                    </th>
                    <th className="py-3 px-5" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    const firstImage = product.colors[0]?.images[0]?.url;
                    const totalStock = product.colors.reduce((s, c) => s + c.stock, 0);
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-gray-project-20 hover:bg-gray-project-10"
                      >
                        <td className="py-3 px-5">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-project-20">
                            {firstImage && (
                              <Image
                                src={firstImage}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-5">
                          <p className="text-m-2 text-gray-project-100">{product.name}</p>
                          <p className="text-r-3 text-gray-project-60 font-mono">
                            #{product.article}
                          </p>
                        </td>
                        <td className="py-3 px-5 text-r-2 text-gray-project-80">
                          {product.category.title}
                        </td>
                        <td className="py-3 px-5">
                          <p className="text-r-2 text-gray-project-100">
                            {formatPrice(product.priceMain)}
                          </p>
                          {product.priceDiscount && (
                            <p className="text-r-3 text-gray-project-60 line-through">
                              {formatPrice(product.priceDiscount)}
                            </p>
                          )}
                        </td>
                        <td className="py-3 px-5">
                          <span
                            className={`text-r-2 ${totalStock === 0 ? "text-red-project-50" : "text-gray-project-80"}`}
                          >
                            {totalStock} шт
                          </span>
                        </td>
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-3 justify-end">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="text-r-3 text-gray-project-60 hover:text-gray-project-100 underline"
                            >
                              Редагувати
                            </Link>
                            <DeleteProductBtn id={product.id} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {pages > 1 && (
              <div className="flex items-center justify-center gap-2 py-4 border-t border-gray-project-20">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/admin/products?page=${p}`}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                      p === page
                        ? "bg-gray-project-100 text-white"
                        : "text-gray-project-60 hover:bg-gray-project-20"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
