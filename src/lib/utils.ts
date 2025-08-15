import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDiscountPercent(oldPrice: number, newPrice: number): number {
  if (oldPrice <= 0) throw new Error("Old price must be more than 0.");
  const discount = ((oldPrice - newPrice) / oldPrice) * 100;
  return Math.round(discount * 100) / 100;
}
