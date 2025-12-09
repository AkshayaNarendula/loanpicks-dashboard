// components/chat-sheet.tsx
"use client";

import React, { useState } from "react";
import ChatSheetClient from "@/components/ChatSheetClient";

export default function ChatSheet({ product }: { product: any }) {
  const [open, setOpen] = useState(false);

  if (!product) return null;

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg">
        Ask AI
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
          <div className="w-[400px] bg-white h-full shadow-xl flex flex-col animate-slide-left">
            <div className="border-b p-4 flex justify-between items-center text-lg font-semibold">
              <span>{product.name}</span>
              <button className="text-red-500 font-medium" onClick={() => setOpen(false)}>Close</button>
            </div>

            <div className="flex-1 overflow-hidden p-4">
              <ChatSheetClient product={product} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
