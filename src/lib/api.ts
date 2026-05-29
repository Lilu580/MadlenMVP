import { IProductInsert, IProductSelect } from "./types";

// ─── API response types ───────────────────────────────────────────────────────

export interface ApiCategory {
  id: string;
  slug: string;
  title: string;
  image: string;
  _count?: { products: number };
}

export interface ApiImage {
  id: string;
  url: string;
  position: number;
}

export interface ApiColor {
  id: string;
  color: string;
  nameColor: string;
  stock: number;
  images: ApiImage[];
}

export interface ApiDescription {
  id: string;
  title: string;
  body: string;
  position: number;
}

export interface ApiProduct {
  id: string;
  name: string;
  article: string;
  priceMain: number;
  priceDiscount: number | null;
  category: { id: string; slug: string; title: string };
  colors: ApiColor[];
  descriptions?: ApiDescription[];
}

export interface ApiProductsResponse {
  products: ApiProduct[];
  total: number;
  page: number;
  pages: number;
}

export interface ApiOrder {
  id: string;
  orderNumber: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  deliveryType: string;
  deliveryData: Record<string, string>;
  paymentMethod: string;
  additionalInfo: string | null;
  totalPrice: number;
  items: {
    id: string;
    name: string;
    article: string;
    image: string;
    color: string;
    nameColor: string;
    count: number;
    unitPrice: number;
  }[];
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

export function mapToProductSelect(p: ApiProduct): IProductSelect {
  const firstColor = p.colors[0];
  const firstImage = firstColor?.images[0]?.url ?? "/image.png";
  return {
    id: p.id,
    name: p.name,
    article: p.article,
    price: {
      main: p.priceMain,
      ...(p.priceDiscount != null ? { discount: p.priceDiscount } : {}),
    },
    image: firstImage,
    color: firstColor?.color ?? "#000000",
    nameColor: firstColor?.nameColor ?? "",
    count: 1,
    maxCount: firstColor?.stock ?? 0,
    categorySlug: p.category?.slug,
  };
}

export function mapToProductInsert(p: ApiProduct): IProductInsert {
  return {
    id: p.id,
    name: p.name,
    article: p.article,
    price: {
      main: p.priceMain,
      ...(p.priceDiscount != null ? { discount: p.priceDiscount } : {}),
    },
    colors: p.colors.map((c) => ({
      color: c.color,
      nameColor: c.nameColor,
      count: c.stock,
      images: c.images.map((img) => ({ link: img.url, count: img.position })),
    })),
    descriptions: (p.descriptions ?? []).map((d) => ({
      title: d.title,
      description: d.body,
    })),
  };
}

// ─── Fetch helpers (client-side) ──────────────────────────────────────────────

export async function fetchProducts(params?: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<ApiProductsResponse> {
  const sp = new URLSearchParams();
  if (params?.category) sp.set("category", params.category);
  if (params?.search) sp.set("search", params.search);
  if (params?.sort) sp.set("sort", params.sort);
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  const res = await fetch(`/api/products?${sp}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: string): Promise<ApiProduct | null> {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) return [];
  return res.json();
}
