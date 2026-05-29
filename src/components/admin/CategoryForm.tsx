"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface CategoryData {
  id?: string;
  slug?: string;
  title?: string;
  image?: string;
}

export function CategoryForm({ data }: { data?: CategoryData }) {
  const router = useRouter();
  const isEdit = Boolean(data?.id);

  const [title, setTitle] = useState(data?.title ?? "");
  const [slug, setSlug] = useState(data?.slug ?? "");
  const [image, setImage] = useState(data?.image ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEdit) {
      setSlug(
        value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, ""),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title || !slug || !image) {
      setError("Всі поля обов'язкові");
      return;
    }
    setLoading(true);

    const res = isEdit
      ? await fetch(`/api/categories/${data!.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, slug, image }),
        })
      : await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, slug, image }),
        });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/categories");
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error || "Помилка збереження");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-r-2 text-gray-project-80">Назва категорії*</label>
        <Input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Наприклад: Сукні"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-r-2 text-gray-project-80">Slug (URL)*</label>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="sukni"
          required
        />
        <p className="text-r-3 text-gray-project-60">
          URL буде: /catalog/{slug || "..."}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-r-2 text-gray-project-80">Зображення категорії*</label>
        <ImageUpload value={image} onChange={setImage} />
      </div>

      {error && <p className="text-r-3 text-red-project-50">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Збереження..." : isEdit ? "Зберегти" : "Створити"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/categories")}
        >
          Скасувати
        </Button>
      </div>
    </form>
  );
}
