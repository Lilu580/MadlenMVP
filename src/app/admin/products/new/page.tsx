import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true },
  });

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <h1 className="header-2 text-gray-project-100">Новий товар</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
