// components/ChatSheetClient.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";

type Msg = {
  role: "user" | "assistant";
  content: string;
  created_at?: string;
};

export default function ChatSheetClient({ product }: { product: any }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!product?.id) return;

    fetch("/api/ai/get-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, userId: "demo-user-123" }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          // normalize older DB rows shape if necessary
          const normalized = (json.messages || []).map((m: any) => ({
            role: m.role,
            content: m.content,
            created_at: m.created_at,
          }));
          setMessages(normalized);
          setTimeout(() => scrollToBottom(), 50);
        }
      })
      .catch((e) => console.error("[chat-client] history load error:", e));
  }, [product?.id]);

  function scrollToBottom() {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }

  async function sendMessage() {
    if (!input.trim()) return;
    if (!product?.id) {
      alert("Missing product ID");
      return;
    }

    const userMsg: Msg = { role: "user", content: input, created_at: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          message: userMsg.content,
          userId: "demo-user-123",
          history: [...messages, userMsg],
        }),
      });

      const json = await res.json();
      setLoading(false);

      if (!json.ok) {
        alert(json.error || "AI error");
        return;
      }

      const assistantMsg: Msg = { role: "assistant", content: json.answer, created_at: new Date().toISOString() };
      setMessages((prev) => [...prev, assistantMsg]);
      setTimeout(() => scrollToBottom(), 50);
    } catch (e) {
      setLoading(false);
      console.error("[chat-client] send error:", e);
      alert("Failed to send message");
    }
  }

  return (
    <div className="p-4 bg-white w-full border rounded h-full flex flex-col">
      <h3 className="text-lg font-semibold">{product?.name}</h3>

      <div ref={listRef} className="flex-1 overflow-auto bg-gray-50 p-3 rounded mt-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-2 p-2 rounded max-w-[80%] ${m.role === "assistant" ? "bg-purple-100 text-purple-900" : "bg-blue-100 text-blue-900 ml-auto"}`}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="my-2 p-2 bg-purple-100 rounded text-purple-800">Thinking…</div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="bg-purple-600 text-white px-4 rounded disabled:opacity-50" onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
