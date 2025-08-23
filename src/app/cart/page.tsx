import { Cart } from "@/components/pages/Cart";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <Cart />;
}
