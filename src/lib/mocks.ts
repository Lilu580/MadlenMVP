import { IProductInsert, IProductSelect } from "@/lib/types"; // замени на свой путь

export const products: IProductSelect[] = [
  {
    name: "Футболка чоловіча",
    article: "TSHIRT001",
    price: { main: 1500, discount: 1200, currency: "₴" },
    image: "/image.png",
    color: "#FFFFFF",
    count: 10,
  },
  {
    name: "Кросівки спортивні",
    article: "SNEAKERS045",
    price: { main: 3200, discount: 2800, currency: "₴" },
    image: "/image-2.png",
    color: "#000000",
    count: 5,
  },
  {
    name: "Рюкзак міський",
    article: "BACKPACK210",
    price: { main: 2200, currency: "₴" },
    image: "/image-3.png",
    color: "#808080",
    count: 15,
  },
  {
    name: "Куртка демісезонна",
    article: "JACKET032",
    price: { main: 4800, discount: 4300, currency: "₴" },
    image: "/image-4.png",
    color: "#0000FF",
    count: 8,
  },
  {
    name: "Джинси чоловічі",
    article: "JEANS119",
    price: { main: 2600, discount: 2300, currency: "₴" },
    image: "/image.png",
    color: "#0A1F44",
    count: 12,
  },
  {
    name: "Сумка поясна",
    article: "WAISTBAG007",
    price: { main: 900, currency: "₴" },
    image: "/image-2.png",
    color: "#000000",
    count: 20,
  },
  {
    name: "Годинник наручний",
    article: "WATCH501",
    price: { main: 5500, discount: 4999, currency: "₴" },
    image: "/image-3.png",
    color: "#C0C0C0",
    count: 6,
  },
  {
    name: "Окуляри сонцезахисні",
    article: "SUNGLASSES042",
    price: { main: 1800, discount: 1500, currency: "₴" },
    image: "/image-4.png",
    color: "#000000",
    count: 25,
  },
  {
    name: "Сорочка класична",
    article: "SHIRT223",
    price: { main: 2000, currency: "₴" },
    image: "/image.png",
    color: "#FFFFFF",
    count: 9,
  },
  {
    name: "Піджак чоловічий",
    article: "BLAZER034",
    price: { main: 6700, discount: 5999, currency: "₴" },
    image: "/image-2.png",
    color: "#808080",
    count: 4,
  },
];

export const categories = [
  {
    title: "Сукні",
    image: "/image-4.png",
  },
  {
    title: "Костюми",
    image: "/image-3.png",
  },
  {
    title: "Аксесуари",
    image: "/image-2.png",
  },
  {
    title: "Куртки",
    image: "/image.png",
  },
];

export const product: IProductInsert = {
  name: "Назва товару",
  article: "245456",
  price: {
    main: 1500,
    discount: 1000,
    currency: "₴",
  },
  colors: [
    {
      color: "#4F4631",
      count: 10,
      images: [
        { link: "/image.png", count: 0 },
        { link: "/image-2.png", count: 1 },
        { link: "/image-3.png", count: 2 },
        { link: "/image-4.png", count: 3 },
      ],
    },
    {
      color: "#314F4A",
      count: 30,
      images: [
        { link: "/image.png", count: 0 },
        { link: "/image-2.png", count: 2 },
        { link: "/image-3.png", count: 3 },
        { link: "/image-4.png", count: 1 },
      ],
    },
    {
      color: "#31344F",
      count: 5,
      images: [
        { link: "/image.png", count: 0 },
        { link: "/image-2.png", count: 1 },
        { link: "/image-3.png", count: 3 },
        { link: "/image-4.png", count: 2 },
      ],
    },
  ],
  descriptions: [
    {
      title: "Опис / Склад та догляд",
      description:
        "Онови свій стиль з нашим якісним та трендовим одягом! Ця модель поєднує комфорт, елегантний дизайн та довговічні матеріали, що ідеально підходять для будь-яких випадків – від повсякденних прогулянок до особливих подій.",
    },
    {
      title: "Умови доставки та повернення",
      description:
        "Онови свій стиль з нашим якісним та трендовим одягом! Ця модель поєднує комфорт, елегантний дизайн та довговічні матеріали, що ідеально підходять для будь-яких випадків – від повсякденних прогулянок до особливих подій.",
    },
  ],
};
