// components/product-card.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import ChatModal from "@/components/chat-modal";
import { generateBadges } from "@/lib/badge-generator";
import Badge from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type Product = {
  id: string;
  name: string;
  bank: string;
  type: string;
  rate_apr: number;
  min_income: number;
  min_credit_score: number;
  summary?: string;
  [k: string]: any;
};

export default function ProductCard({
  product,
  highlightBest = false,
}: {
  product: Product;
  highlightBest?: boolean;
}) {
  const badges = generateBadges(product);
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <Card className={`p-4 ${highlightBest ? "ring-2 ring-purple-300" : ""}`}>
        <CardHeader className="p-0">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <p className="text-sm text-gray-500">{product.bank} • {product.type}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-3">
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((b) => (
              <Badge key={b.key}>{b.label}</Badge>
            ))}
          </div>

          <div className="space-y-1">
            <p><strong>APR:</strong> {product.rate_apr}%</p>
            <p><strong>Income:</strong> ₹{product.min_income}</p>
            <p><strong>Credit score:</strong> {product.min_credit_score}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link href={`/products/${product.id}`}>
              <button className="bg-purple-600 text-white px-4 py-2 rounded">View Details</button>
            </Link>

            <button
              onClick={() => setOpenChat(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Ask AI
            </button>
          </div>
        </CardContent>
      </Card>

      {openChat && <ChatModal product={product} onClose={() => setOpenChat(false)} />}
    </>
  );
}
