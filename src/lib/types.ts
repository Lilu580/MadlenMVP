export interface IProductInsert {
  id: string;
  name: string;
  article: string;
  colors: TProductColor[];
  price: TProductPrice;
  descriptions: TProductDescription[];
}

export type TProductDescription = { title: string; description: string };

export type TProductImage = { link: string; count: number };

export type TProductColor = {
  color: string;
  nameColor: string;
  count: number;
  images: TProductImage[];
};

export type TProductPrice = {
  main: number;
  discount?: number;
};

export interface IProductSelect
  extends Omit<IProductInsert, "colors" | "descriptions"> {
  image: string;
  color: string;
  nameColor: string;
  count: number;
  maxCount: number;
}

export type TDelivery =
  | { type: "department"; city: string; office: string }
  | {
      type: "courier";
      city: string;
      country: string;
      address: string;
      postIndex: string;
    };
