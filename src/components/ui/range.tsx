"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Range = [number, number];

export default function PriceRange({
  min = 0,
  max = 10000,
  step = 50,
  initial = [500, 3000] as Range,
  onChange,
}: {
  min?: number;
  max?: number;
  step?: number;
  initial?: Range;
  onChange?: (range: Range) => void;
}) {
  const [range, setRange] = React.useState<Range>(initial);

  const update = (next: Range) => {
    setRange(next);
    onChange?.(next);
  };

  // Обновление из полей ввода
  const setMin = (v: string) => {
    const n = Number(v);
    if (Number.isNaN(n)) return;
    const clamped = Math.max(min, Math.min(n, range[1]));
    update([clamped, range[1]]);
  };
  const setMax = (v: string) => {
    const n = Number(v);
    if (Number.isNaN(n)) return;
    const clamped = Math.min(max, Math.max(n, range[0]));
    update([range[0], clamped]);
  };

  return (
    <div className="w-full max-w-xl space-y-4">
      <div className="flex items-end gap-3">
        <div className="flex-1 space-y-1">
          <Label htmlFor="min">Мінімум</Label>
          <Input
            id="min"
            type="number"
            inputMode="numeric"
            value={range[0]}
            min={min}
            max={range[1]}
            step={step}
            onChange={(e) => setMin(e.target.value)}
          />
        </div>
        <div className="flex-1 space-y-1">
          <Label htmlFor="max">Максимум</Label>
          <Input
            id="max"
            type="number"
            inputMode="numeric"
            value={range[1]}
            min={range[0]}
            max={max}
            step={step}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      </div>

      <Slider
        // два «ползунка» — два значения
        value={range}
        onValueChange={(v) => update([v[0], v[1]] as Range)}
        min={min}
        max={max}
        step={step}
        // минимальный зазор между ползунками в шагах (опционально)
        minStepsBetweenThumbs={1}
        className="py-4"
      />

      <div className="text-sm text-muted-foreground">
        Обраний діапазон: {range[0]} – {range[1]}
      </div>
    </div>
  );
}
