import { CategoryForm } from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h1 className="header-2 text-gray-project-100">Нова категорія</h1>
      <CategoryForm />
    </div>
  );
}
