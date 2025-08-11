import { Suspense } from "react";
import { Banner } from "@/components/home/Banner/Banner";
import { Categories } from "@/components/home/Categories/Categories";
import { Products } from "@/components/home/Recomends/Recomends";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const metadata = {
  title: "Home | Madlen",
  description: "Welcome to Madlen - Your Fashion Destination",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Products />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Categories />
      </Suspense>
    </div>
  );
}
