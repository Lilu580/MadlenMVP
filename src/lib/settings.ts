import { prisma } from "./prisma";

export const SETTING_DEFAULTS: Record<string, string> = {
  seo_indexing: "false",
  seo_title: "Madlen — жіночий одяг",
  seo_description:
    "Інтернет-магазин жіночого одягу Madlen. Сукні, костюми, куртки, аксесуари.",
  seo_keywords: "жіночий одяг, сукні, костюми, куртки, аксесуари, Madlen",
  seo_og_image: "",
};

export async function getSettings(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteSettings.findMany();
    const result = { ...SETTING_DEFAULTS };
    for (const row of rows) {
      result[row.key] = row.value;
    }
    return result;
  } catch {
    return { ...SETTING_DEFAULTS };
  }
}
