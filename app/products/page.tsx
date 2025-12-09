// app/products/page.tsx
export const runtime = "edge";
export const revalidate = 60;

import ProductsPageClient from "@/components/ProductsPageClient";
import { getProducts } from "@/lib/getProducts";

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsPageClient products={products} />;
}
