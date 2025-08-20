"use client";

import { Suspense } from "react";
import { Banner } from "@/components/home/Banner";
import { Categories } from "@/components/home/Categories";
import { Recommends } from "@/components/home/Recomends";
import { SkeletonBanner } from "@/components/skeletons/SkeletonBanner";
import { SkeletonRecommends } from "@/components/skeletons/SkeletonRecommends";
import { SkeletonCategories } from "@/components/skeletons/SkeletonCategories";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Suspense fallback={<SkeletonBanner />}>
        <Banner />
      </Suspense>

      <Suspense fallback={<SkeletonRecommends />}>
        <Recommends />
      </Suspense>

      <Suspense fallback={<SkeletonCategories />}>
        <Categories />
      </Suspense>
    </div>
  );
}
