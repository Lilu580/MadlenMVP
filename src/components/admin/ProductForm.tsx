"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Textarea } from "@/components/ui/textarea";

interface CategoryOption {
  id: string;
  title: string;
}

interface ColorData {
  id?: string;
  color: string;
  nameColor: string;
  stock: number;
  images: { url: string; position: number }[];
}

interface DescriptionData {
  id?: string;
  title: string;
  body: string;
  position: number;
}

interface ProductData {
  id?: string;
  name?: string;
  article?: string;
  categoryId?: string;
  priceMain?: number;
  priceDiscount?: number | null;
  colors?: ColorData[];
  descriptions?: DescriptionData[];
}

interface Props {
  categories: CategoryOption[];
  data?: ProductData;
}

export function ProductForm({ categories, data }: Props) {
  const router = useRouter();
  const isEdit = Boolean(data?.id);

  const [name, setName] = useState(data?.name ?? "");
  const [article, setArticle] = useState(data?.article ?? "");
  const [categoryId, setCategoryId] = useState(data?.categoryId ?? "");
  const [priceMain, setPriceMain] = useState(data?.priceMain?.toString() ?? "");
  const [priceDiscount, setPriceDiscount] = useState(data?.priceDiscount?.toString() ?? "");
  const [colors, setColors] = useState<ColorData[]>(data?.colors ?? []);
  const [descriptions, setDescriptions] = useState<DescriptionData[]>(
    data?.descriptions ?? [],
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ─── Color helpers ──────────────────────────────────────────────────────────
  const addColor = () =>
    setColors((prev) => [
      ...prev,
      { color: "#000000", nameColor: "", stock: 0, images: [] },
    ]);

  const updateColor = (index: number, field: keyof ColorData, value: unknown) =>
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    );

  const removeColor = (index: number) =>
    setColors((prev) => prev.filter((_, i) => i !== index));

  const addImageToColor = (colorIndex: number, url: string) =>
    setColors((prev) =>
      prev.map((c, i) =>
        i === colorIndex
          ? { ...c, images: [...c.images, { url, position: c.images.length }] }
          : c,
      ),
    );

  const removeImageFromColor = (colorIndex: number, imgIndex: number) =>
    setColors((prev) =>
      prev.map((c, i) =>
        i === colorIndex
          ? {
              ...c,
              images: c.images
                .filter((_, j) => j !== imgIndex)
                .map((img, j) => ({ ...img, position: j })),
            }
          : c,
      ),
    );

  // ─── Description helpers ────────────────────────────────────────────────────
  const addDescription = () =>
    setDescriptions((prev) => [
      ...prev,
      { title: "", body: "", position: prev.length },
    ]);

  const updateDescription = (index: number, field: keyof DescriptionData, value: string | number) =>
    setDescriptions((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d)),
    );

  const removeDescription = (index: number) =>
    setDescriptions((prev) =>
      prev.filter((_, i) => i !== index).map((d, i) => ({ ...d, position: i })),
    );

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !article || !categoryId || !priceMain) {
      setError("Заповніть обов'язкові поля");
      return;
    }
    if (colors.length === 0) {
      setError("Додайте хоча б один колір");
      return;
    }

    setLoading(true);

    const payload = {
      name,
      article,
      categoryId,
      priceMain: Number(priceMain),
      priceDiscount: priceDiscount ? Number(priceDiscount) : null,
      colors,
      descriptions: descriptions.map((d, i) => ({ ...d, position: i })),
    };

    const res = isEdit
      ? await fetch(`/api/products/${data!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      const d = await res.json();
      setError(d.error || "Помилка збереження");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Basic info */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
        <h2 className="header-4 text-gray-project-100">Основна інформація</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5 col-span-2">
            <label className="text-r-2 text-gray-project-80">Назва товару*</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Назва товару" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-r-2 text-gray-project-80">Артикул*</label>
            <Input value={article} onChange={(e) => setArticle(e.target.value)} placeholder="SHIRT001" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-r-2 text-gray-project-80">Категорія*</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="h-10 w-full rounded-xl border border-gray-project-30 bg-white px-3 text-sm text-gray-project-90 focus:outline-none focus:ring-2 focus:ring-gray-project-100"
            >
              <option value="">Оберіть категорію</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-r-2 text-gray-project-80">Ціна (грн)*</label>
            <Input
              type="number"
              value={priceMain}
              onChange={(e) => setPriceMain(e.target.value)}
              placeholder="1500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-r-2 text-gray-project-80">Ціна зі знижкою (грн)</label>
            <Input
              type="number"
              value={priceDiscount}
              onChange={(e) => setPriceDiscount(e.target.value)}
              placeholder="1200"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="header-4 text-gray-project-100">Кольори та зображення</h2>
          <Button type="button" variant="outline" onClick={addColor} className="text-sm">
            + Додати колір
          </Button>
        </div>

        {colors.length === 0 && (
          <p className="text-r-2 text-gray-project-60 text-center py-4">
            Додайте хоча б один колір
          </p>
        )}

        {colors.map((color, ci) => (
          <div key={ci} className="border border-gray-project-30 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-m-2 text-gray-project-90">Колір {ci + 1}</h3>
              <button
                type="button"
                onClick={() => removeColor(ci)}
                className="text-r-3 text-red-project-50 hover:opacity-70"
              >
                Видалити
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-r-3 text-gray-project-60">HEX колір</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color.color}
                    onChange={(e) => updateColor(ci, "color", e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-project-30 cursor-pointer p-0.5"
                  />
                  <Input
                    value={color.color}
                    onChange={(e) => updateColor(ci, "color", e.target.value)}
                    placeholder="#000000"
                    className="font-mono"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-r-3 text-gray-project-60">Назва кольору</label>
                <Input
                  value={color.nameColor}
                  onChange={(e) => updateColor(ci, "nameColor", e.target.value)}
                  placeholder="Чорний"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-r-3 text-gray-project-60">Залишок (шт)</label>
                <Input
                  type="number"
                  value={color.stock}
                  onChange={(e) => updateColor(ci, "stock", Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-r-3 text-gray-project-60">
                Зображення ({color.images.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {color.images.map((img, ii) => (
                  <div key={ii} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-project-30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImageFromColor(ci, ii)}
                      className="absolute top-0.5 right-0.5 bg-white/80 rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <ImageUpload
                  value=""
                  onChange={(url) => { if (url) addImageToColor(ci, url); }}
                  label="+ Фото"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Descriptions */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="header-4 text-gray-project-100">Описи</h2>
          <Button type="button" variant="outline" onClick={addDescription} className="text-sm">
            + Додати блок
          </Button>
        </div>

        {descriptions.map((desc, di) => (
          <div key={di} className="border border-gray-project-30 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-r-3 text-gray-project-60">Блок {di + 1}</span>
              <button
                type="button"
                onClick={() => removeDescription(di)}
                className="text-r-3 text-red-project-50 hover:opacity-70"
              >
                Видалити
              </button>
            </div>
            <Input
              value={desc.title}
              onChange={(e) => updateDescription(di, "title", e.target.value)}
              placeholder="Заголовок блоку"
            />
            <Textarea
              value={desc.body}
              onChange={(e) => updateDescription(di, "body", e.target.value)}
              placeholder="Текст опису..."
              rows={4}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-r-3 text-red-project-50">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Збереження..." : isEdit ? "Зберегти зміни" : "Створити товар"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Скасувати
        </Button>
      </div>
    </form>
  );
}
