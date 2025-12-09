// components/chat-modal.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Product = {
  id: string;
  name: string;
  bank: string;
};

export default function ChatModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: "user", content: text, created_at: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // send only productId — server fetches full product
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          message: text,
          history: [...messages, userMsg],
        }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "AI error. Try again later." },
        ]);
        setLoading(false);
        return;
      }

      const reply = json.answer ?? "No response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error("Network error:", e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end items-end p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm text-gray-500">{product.bank}</div>
          </div>
          <button onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {messages.length === 0 && (
            <div className="text-sm text-gray-500">
              Ask a question about this product (answers will use product data).
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`rounded px-3 py-2 max-w-[80%] ${
                m.role === "user" ? "ml-auto bg-indigo-100" : "bg-gray-100"
              }`}
            >
              {m.content}
            </div>
          ))}

          {loading && <div className="italic text-sm text-gray-500">AI is typing…</div>}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Ask something about this loan..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button onClick={sendMessage} className="bg-purple-600 text-white rounded px-4">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
