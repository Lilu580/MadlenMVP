"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: string;
  slug: string;
  count: number;
}

export function DeleteCategoryBtn({ slug, count }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (count > 0) {
    return (
      <span className="text-r-3 text-gray-project-50 cursor-not-allowed" title="Спочатку видаліть товари">
        Видалити
      </span>
    );
  }

  const handleDelete = async () => {
    if (!confirm("Видалити категорію?")) return;
    setLoading(true);
    await fetch(`/api/categories/${slug}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-r-3 text-red-project-50 hover:opacity-70 underline disabled:opacity-40"
    >
      Видалити
    </button>
  );
}
