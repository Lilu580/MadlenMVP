"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface Settings {
  seo_indexing: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_og_image: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Завантаження...
      </div>
    );
  }

  const indexing = settings.seo_indexing === "true";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-project-100 mb-8">
        Налаштування SEO
      </h1>

      <div className="bg-white rounded-2xl p-6 flex flex-col gap-6 shadow-sm">

        {/* Indexing toggle */}
        <div className="flex items-center justify-between py-4 border-b border-gray-project-20">
          <div>
            <p className="font-medium text-gray-project-100">Індексація Google</p>
            <p className="text-sm text-gray-project-60 mt-0.5">
              {indexing
                ? "Google може індексувати сайт"
                : "Сайт прихований від пошукових систем"}
            </p>
          </div>
          <button
            onClick={() =>
              setSettings((s) =>
                s ? { ...s, seo_indexing: indexing ? "false" : "true" } : s,
              )
            }
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              indexing ? "bg-green-500" : "bg-gray-300"
            }`}
            aria-label="Перемкнути індексацію"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                indexing ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-project-80">
            Title сторінки
          </label>
          <Input
            value={settings.seo_title}
            onChange={(e) =>
              setSettings((s) => s ? { ...s, seo_title: e.target.value } : s)
            }
            placeholder="Madlen — жіночий одяг"
          />
          <p className="text-xs text-gray-project-50">
            Рекомендовано: 50–60 символів ({settings.seo_title.length}/60)
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-project-80">
            Meta description
          </label>
          <textarea
            value={settings.seo_description}
            onChange={(e) =>
              setSettings((s) =>
                s ? { ...s, seo_description: e.target.value } : s,
              )
            }
            rows={3}
            placeholder="Опис сайту для пошукових систем"
            className="w-full rounded-xl border border-gray-project-30 px-3 py-2 text-sm resize-none outline-none focus:border-gray-project-60 transition-colors"
          />
          <p className="text-xs text-gray-project-50">
            Рекомендовано: 150–160 символів ({settings.seo_description.length}/160)
          </p>
        </div>

        {/* Keywords */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-project-80">
            Ключові слова
          </label>
          <Input
            value={settings.seo_keywords}
            onChange={(e) =>
              setSettings((s) =>
                s ? { ...s, seo_keywords: e.target.value } : s,
              )
            }
            placeholder="жіночий одяг, сукні, куртки"
          />
          <p className="text-xs text-gray-project-50">
            Через кому
          </p>
        </div>

        {/* OG Image */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-project-80">
            OG Image (для соцмереж)
          </label>
          <ImageUpload
            value={settings.seo_og_image}
            onChange={(url) =>
              setSettings((s) => s ? { ...s, seo_og_image: url } : s)
            }
            label="Зображення для шер у соцмережах (1200×630)"
          />
        </div>

        <Button onClick={handleSave} disabled={saving} className="self-start">
          {saving ? "Збереження..." : saved ? "Збережено ✓" : "Зберегти"}
        </Button>
      </div>
    </div>
  );
}
