import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="header-2 text-gray-project-100">Редагування категорії</h1>
      <CategoryForm data={category} />
    </div>
  );
}
