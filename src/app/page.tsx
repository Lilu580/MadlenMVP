import { Suspense } from "react";
import { Banner } from "@/components/home/Banner";
import { Categories } from "@/components/home/Categories";
import { Recommends } from "@/components/home/Recomends";

export const metadata = {
  title: "Home | Madlen",
  description: "Welcome to Madlen - Your Fashion Destination",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Suspense fallback={<Banner isLoading />}>
        <Banner />
      </Suspense>

      <Suspense fallback={<Recommends isLoading />}>
        <Recommends />
      </Suspense>

      <Suspense fallback={<Categories isLoading />}>
        <Categories />
      </Suspense>
    </div>
  );
}
