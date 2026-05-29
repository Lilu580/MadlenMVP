import type { MetadataRoute } from "next";
import { getSettings } from "@/lib/settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  const indexing = settings.seo_indexing === "true";

  return {
    rules: {
      userAgent: "*",
      disallow: indexing ? undefined : "/",
      allow: indexing ? "/" : undefined,
    },
  };
}
