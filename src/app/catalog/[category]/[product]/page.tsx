import React from "react";
import { Product } from "@/pages/Product";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <Product />;
}
