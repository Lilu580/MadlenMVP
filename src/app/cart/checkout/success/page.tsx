import React from "react";
import { Success } from "@/pages/Success";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <Success />;
}
