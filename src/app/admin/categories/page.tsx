import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { DeleteCategoryBtn } from "@/components/admin/DeleteCategoryBtn";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { title: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="header-2 text-gray-project-100">Категорії</h1>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-gray-project-100 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-project-90 transition-colors"
        >
          + Додати категорію
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="py-16 text-center text-r-2 text-gray-project-60">
            Категорій ще немає.{" "}
            <Link href="/admin/categories/new" className="underline">
              Створити першу
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-project-10 border-b border-gray-project-30">
              <tr>
                <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">
                  Зображення
                </th>
                <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">
                  Назва
                </th>
                <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">
                  Slug
                </th>
                <th className="text-left py-3 px-5 text-r-3 text-gray-project-60 font-normal">
                  Товарів
                </th>
                <th className="py-3 px-5" />
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-project-20 hover:bg-gray-project-10">
                  <td className="py-3 px-5">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-project-20">
                      {cat.image && (
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-5 text-m-2 text-gray-project-100">{cat.title}</td>
                  <td className="py-3 px-5 text-r-2 text-gray-project-60 font-mono">{cat.slug}</td>
                  <td className="py-3 px-5 text-r-2 text-gray-project-80">
                    {cat._count.products}
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        href={`/admin/categories/${cat.id}`}
                        className="text-r-3 text-gray-project-60 hover:text-gray-project-100 underline"
                      >
                        Редагувати
                      </Link>
                      <DeleteCategoryBtn id={cat.id} slug={cat.slug} count={cat._count.products} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
