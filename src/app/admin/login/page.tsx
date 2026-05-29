"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      sessionStorage.setItem("adminJustLoggedIn", "1");
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "Помилка входу");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-project-20">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image src="/Logo.webp" alt="Madlen" width={150} height={55} />
        </div>

        <h1 className="header-3 text-gray-project-100 text-center mb-8">
          Адміністрування
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-r-2 text-gray-project-80">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@madlen.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-r-2 text-gray-project-80">Пароль</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-r-3 text-red-project-50 text-center">{error}</p>
          )}

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? "Вхід..." : "Увійти"}
          </Button>
        </form>
      </div>
    </div>
  );
}
