// components/product-detail-client.tsx
"use client";
import ChatSheet from "./chat/chat-sheet";

export default function ProductDetailClient({ product }: { product: any }) {

  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="text-sm text-gray-500">{product.bank} • {product.type}</div>

        <div className="mt-4 space-y-2">
          <p><strong>APR:</strong> {product.rate_apr}%</p>
          <p><strong>Min Income:</strong> ₹{product.min_income}</p>
          <p><strong>Min Credit Score:</strong> {product.min_credit_score}</p>
          <p><strong>Tenure:</strong> {product.tenure_min_months} - {product.tenure_max_months} months</p>
          <p className="mt-3">{product.summary}</p>
        </div>

        <div className="mt-6">
          <ChatSheet product={product} />
        </div>
      </div>
    </div>
  );
}
