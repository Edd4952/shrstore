export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  currency: "USD";
  image: { src: string; alt: string };
  tags?: string[];
  amountInStock?: number;
};

export const products: Product[] = [
  {
    id: "p_lions_mane_001",
    name: "Lion’s Mane",
    description: "Cognitive-support mushroom. Capsules or powder.",
    priceCents: 2999,
    currency: "USD",
    image: { src: "/images/products/lions-mane.jpg", alt: "Lion's Mane" },
    tags: ["focus", "nootropic"],
    amountInStock: 20,
  },
  {
    id: "p_reishi_001",
    name: "Reishi",
    description: "Calm + sleep support. Double extracted.",
    priceCents: 2499,
    currency: "USD",
    image: { src: "/images/products/reishi.jpg", alt: "Reishi" },
    tags: ["sleep", "stress"],
    amountInStock: 15,
  },
];