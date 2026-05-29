"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@prisma/client";

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
  statusOptions: Record<string, string>;
}

export function ChangeStatusForm({ orderId, currentStatus, statusOptions }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as OrderStatus)}
        className="h-10 rounded-xl border border-gray-project-30 bg-white px-3 text-sm text-gray-project-90 focus:outline-none focus:ring-2 focus:ring-gray-project-100"
      >
        {Object.entries(statusOptions).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <Button
        onClick={handleSave}
        disabled={loading || status === currentStatus}
      >
        {saved ? "✓ Збережено" : loading ? "..." : "Зберегти"}
      </Button>
    </div>
  );
}
