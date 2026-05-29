"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ACCEPTED_ATTR = ACCEPTED_TYPES.join(",");

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Клікніть або перетягніть зображення" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const validate = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Дозволені формати: JPG, PNG, WebP, GIF";
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `Максимальний розмір: ${MAX_SIZE_MB}MB`;
    }
    return null;
  };

  const upload = useCallback(
    async (file: File) => {
      const validationError = validate(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError("");
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Помилка завантаження");
          return;
        }

        onChange(data.url);
      } catch {
        setError("Помилка з'єднання. Перевірте інтернет.");
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Preview */}
      {value && (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-project-30 group">
          <Image src={value} alt="Прев'ю" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            aria-label="Видалити зображення"
          >
            <span className="text-white text-xs font-medium">Видалити</span>
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl px-5 py-4 text-center transition-colors select-none",
          uploading
            ? "opacity-60 cursor-wait border-gray-project-30"
            : isDragging
            ? "border-gray-project-100 bg-gray-project-10 cursor-copy"
            : "border-gray-project-30 hover:border-gray-project-50 cursor-pointer",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_ATTR}
          className="hidden"
          onChange={handleFileChange}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 border-2 border-gray-project-40 border-t-gray-project-100 rounded-full animate-spin" />
            <p className="text-r-3 text-gray-project-60">Завантаження...</p>
          </div>
        ) : (
          <>
            <p className="text-r-3 text-gray-project-80">
              {isDragging ? "Відпустіть файл" : label}
            </p>
            <p className="text-r-4 text-gray-project-50 mt-1">
              JPG, PNG, WebP, GIF · до {MAX_SIZE_MB}MB
            </p>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-r-3 text-red-project-50 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
