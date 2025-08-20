import { SkeletonBanner } from "@/components/skeletons/SkeletonBanner";
import { SkeletonRecommends } from "@/components/skeletons/SkeletonRecommends";
import { SkeletonCategories } from "@/components/skeletons/SkeletonCategories";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <SkeletonBanner />

      <SkeletonRecommends />

      <SkeletonCategories />
    </div>
  );
}
