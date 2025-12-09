// app/products/[id]/product-detail-client.tsx
"use client";

import { useState } from "react";
import ChatModal from "@/components/chat-modal";

export default function ProductDetailClient({ product }: { product: any }) {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-indigo-700">{product.name}</h1>
      <p className="text-gray-600 mt-1">{product.bank} • {product.type}</p>

      <div className="mt-6 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Loan Details</h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>APR:</strong> {product.rate_apr}%</p>
          <p><strong>Minimum Income:</strong> ₹{product.min_income}</p>
          <p><strong>Minimum Credit Score:</strong> {product.min_credit_score}</p>
          <p><strong>Tenure:</strong> {product.tenure_min_months}–{product.tenure_max_months} months</p>
          <p><strong>Processing Fee:</strong> {product.processing_fee_pct}%</p>
          <p><strong>Disbursal Speed:</strong> {product.disbursal_speed}</p>
          <p><strong>Documentation:</strong> {product.docs_level}</p>
          <p><strong>Summary:</strong> {product.summary}</p>
        </div>

        <button
          onClick={() => setOpenChat(true)}
          className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Ask AI About This Loan
        </button>
      </div>

      {product.faq?.length > 0 && (
        <div className="mt-6 bg-white shadow rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">FAQs</h2>
          {product.faq.map((f: any, idx: number) => (
            <div key={idx} className="mb-4">
              <p className="font-semibold">{f.q}</p>
              <p className="text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      )}

      {openChat && <ChatModal product={product} onClose={() => setOpenChat(false)} />}
    </div>
  );
}
