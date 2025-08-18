import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IProductSelect, TProductPrice } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDiscountPercent(oldPrice: number, newPrice: number): number {
  if (oldPrice <= 0) throw new Error("Old price must be more than 0.");
  const discount = ((oldPrice - newPrice) / oldPrice) * 100;
  return Math.round(discount * 100) / 100;
}

export const formatPrice = (value: number) => {
  return (
    value.toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " ₴"
  );
};

export const getPriceProduct = (
  price: TProductPrice,
  count: number,
  isDiscount?: boolean,
) => {
  if (price.discount && !isDiscount) {
    return price.discount * count;
  }

  return price.main * count;
};

export const getPriceAllProducts = (
  products: IProductSelect[],
  isDiscount?: boolean,
) => {
  let priceAllProducts = 0;
  products.forEach((product) => {
    priceAllProducts += getPriceProduct(
      product.price,
      product.count,
      isDiscount,
    );
  });
  return priceAllProducts;
};

export const getPriceAllProductsDiscount = (products: IProductSelect[]) => {
  const withDiscount = getPriceAllProducts(products, true);
  const withoutDiscount = getPriceAllProducts(products);
  return withDiscount - withoutDiscount;
};
