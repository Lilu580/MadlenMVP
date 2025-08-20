import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { IProductSelect, TProductPrice } from "@/lib/types";
import { FormikErrors } from "formik";

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

export function getFieldError<T extends object>(
  errors: FormikErrors<T>,
  field: keyof T,
): string | undefined {
  const val = errors?.[field];
  return typeof val === "string" ? val : undefined;
}

export const getStyleGridCategoriesCard = (index: number) => {
  const isEvenRow = Math.floor(index / 2) % 2 === 1;
  const isFirstInRow = index % 2 === 0;

  let colWidth = "";

  if (!isEvenRow) {
    colWidth = isFirstInRow
      ? "md:col-start-1 md:col-end-3 col-start-1 col-end-4"
      : "md:col-start-3 md:col-end-7 col-start-4 col-end-7";
  } else {
    colWidth = isFirstInRow
      ? "md:col-start-1 md:col-end-5 col-start-1 col-end-4"
      : "md:col-start-5 md:col-end-7 col-start-4 col-end-7";
  }
  return colWidth;
};
