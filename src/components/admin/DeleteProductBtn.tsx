"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductBtn({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Видалити товар?")) return;
    setLoading(true);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
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
