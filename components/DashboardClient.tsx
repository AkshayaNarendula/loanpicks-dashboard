"use client";

import React from "react";
import ProductCard from "./product-card";

export default function DashboardClient({
  top5,
  products
}: {
  top5: any[];
  products: any[];
}) {
  if (!top5 || top5.length === 0)
    return <p className="p-10">No products available.</p>;

  const bestMatch = top5[0];
  const topMatches = top5.slice(1, 5);

  return (
    <div className="px-6 py-10">

      {/* BEST MATCH */}
      <h2 className="text-3xl font-bold mb-6">Your Best Match</h2>
      <div className="mb-12">
        <ProductCard product={bestMatch} highlightBest />
      </div>

      {/* TOP MATCHES */}
      <h2 className="text-3xl font-bold mb-6">Top Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {topMatches.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
