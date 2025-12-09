"use client";

import React, { useState } from "react";
import ChatSheetClient from "./ChatSheetClient";

export default function ChatSheet({ product }: { product: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Ask AI
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white h-full w-[400px] p-4 shadow-xl">
            <div className="flex justify-between">
              <h2 className="font-semibold">{product.name}</h2>
              <button onClick={() => setOpen(false)} className="text-red-500">
                Close
              </button>
            </div>

            <ChatSheetClient product={product} />
          </div>
        </div>
      )}
    </>
  );
}
