// app/compare/page.tsx
export const runtime = "edge";
export const revalidate = 60;

import CompareClient from "@/components/CompareClient";
import { getProducts } from "@/lib/getProducts";

export default async function ComparePage() {
  const products = await getProducts();
  return (
    <CompareClient initialProducts={products.sort((a, b) => a.name.localeCompare(b.name))} />
  );
}
