import React from "react";
import { Checkout } from "@/components/pages/Checkout";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <Checkout />;
}
