import { Home } from "@/pages/Home";

export const metadata = {
  title: "Home | Madlen",
  description: "Welcome to Madlen - Your Fashion Destination",
};

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <Home />;
}
