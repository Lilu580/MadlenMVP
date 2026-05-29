import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Categories ──────────────────────────────────────────────────────────────
  const categoriesData = [
    { slug: "sukni", title: "Сукні", image: "/image-4.png" },
    { slug: "kostyumy", title: "Костюми", image: "/image-3.png" },
    { slug: "aksesuary", title: "Аксесуари", image: "/image-2.png" },
    { slug: "kurtky", title: "Куртки", image: "/image.png" },
  ];

  const categories: Record<string, { id: string }> = {};

  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { title: cat.title, image: cat.image },
      create: cat,
    });
    categories[cat.slug] = created;
    console.log(`  ✓ Category: ${cat.title}`);
  }

  // ─── Products ────────────────────────────────────────────────────────────────
  const productsData = [
    {
      name: "Футболка чоловіча",
      article: "TSHIRT001",
      categorySlug: "kostyumy",
      priceMain: 1500,
      priceDiscount: 1200,
      colors: [{ color: "#FFFFFF", nameColor: "Білий", stock: 10, images: ["/image.png"] }],
    },
    {
      name: "Кросівки спортивні",
      article: "SNEAKERS045",
      categorySlug: "aksesuary",
      priceMain: 3200,
      priceDiscount: 2800,
      colors: [{ color: "#000000", nameColor: "Чорний", stock: 5, images: ["/image-2.png"] }],
    },
    {
      name: "Рюкзак міський",
      article: "BACKPACK210",
      categorySlug: "aksesuary",
      priceMain: 2200,
      colors: [{ color: "#808080", nameColor: "Сірий", stock: 15, images: ["/image-3.png"] }],
    },
    {
      name: "Куртка демісезонна",
      article: "JACKET032",
      categorySlug: "kurtky",
      priceMain: 4800,
      priceDiscount: 4300,
      colors: [
        { color: "#0000FF", nameColor: "Синій", stock: 8, images: ["/image-4.png"] },
        { color: "#000000", nameColor: "Чорний", stock: 4, images: ["/image.png"] },
      ],
    },
    {
      name: "Сукня вечірня",
      article: "DRESS001",
      categorySlug: "sukni",
      priceMain: 3500,
      priceDiscount: 3000,
      colors: [
        { color: "#000000", nameColor: "Чорний", stock: 6, images: ["/image.png"] },
        { color: "#FF0000", nameColor: "Червоний", stock: 4, images: ["/image-2.png"] },
      ],
    },
    {
      name: "Піджак чоловічий",
      article: "BLAZER034",
      categorySlug: "kostyumy",
      priceMain: 6700,
      priceDiscount: 5999,
      colors: [{ color: "#808080", nameColor: "Сірий", stock: 4, images: ["/image-2.png"] }],
    },
  ];

  for (const p of productsData) {
    const categoryId = categories[p.categorySlug]?.id;
    if (!categoryId) continue;

    await prisma.product.upsert({
      where: { article: p.article },
      update: {},
      create: {
        name: p.name,
        article: p.article,
        categoryId,
        priceMain: p.priceMain,
        priceDiscount: p.priceDiscount ?? null,
        colors: {
          create: p.colors.map((c) => ({
            color: c.color,
            nameColor: c.nameColor,
            stock: c.stock,
            images: {
              create: c.images.map((url, position) => ({ url, position })),
            },
          })),
        },
        descriptions: {
          create: [
            {
              title: "Опис / Склад та догляд",
              body: "Онови свій стиль з нашим якісним та трендовим одягом! Ця модель поєднує комфорт, елегантний дизайн та довговічні матеріали.",
              position: 0,
            },
            {
              title: "Умови доставки та повернення",
              body: "Доставка Новою Поштою або Укрпоштою. Повернення протягом 14 днів з моменту отримання.",
              position: 1,
            },
          ],
        },
      },
    });

    console.log(`  ✓ Product: ${p.name}`);
  }

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
