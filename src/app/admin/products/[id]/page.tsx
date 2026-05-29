import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        colors: { include: { images: { orderBy: { position: "asc" } } } },
        descriptions: { orderBy: { position: "asc" } },
      },
    }),
    prisma.category.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    }),
  ]);

  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <h1 className="header-2 text-gray-project-100">
        Редагування: {product.name}
      </h1>
      <ProductForm categories={categories} data={product} />
    </div>
  );
}
