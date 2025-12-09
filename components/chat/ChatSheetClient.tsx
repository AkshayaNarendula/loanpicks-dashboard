"use client";

import React, { useEffect, useState } from "react";

export default function ChatSheetClient({ product }: { product: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product?.id) return;

    fetch("/api/ai/get-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setMessages(d.messages);
      });
  }, [product?.id]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const history = [...messages, userMsg];

    setMessages(history);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        message: input,
        history,
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (!json.ok) return alert(json.error);

    setMessages((prev) => [...prev, { role: "assistant", content: json.answer }]);
  }

  return (
    <div className="p-4">
      <div className="h-64 overflow-y-auto bg-gray-100 p-3 rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 my-2 rounded w-fit ${
              m.role === "assistant" ? "bg-purple-200" : "bg-blue-200 ml-auto"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <div className="text-purple-600">Thinking…</div>}
      </div>

      <div className="flex mt-2 gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-purple-600 text-white px-3 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
