// lib/openrouter.ts
export async function callOpenRouter({
  message,
  history = [],
  product,
}: {
  message: string;
  history?: { role: string; content: string }[];
  product: any;
}) {
  const systemPrompt = `
You are LoanPicks AI. Answer ONLY based on the loan product below.

Loan Details:
Name: ${product.name}
Bank: ${product.bank}
Type: ${product.type}
APR: ${product.rate_apr}%
Min Income: ₹${product.min_income}
Min Credit Score: ${product.min_credit_score}
Tenure: ${product.tenure_min_months}-${product.tenure_max_months} months
Processing Fee: ${product.processing_fee_pct}%
Docs: ${product.docs_level}
Disbursal Speed: ${product.disbursal_speed}
Summary: ${product.summary ?? "N/A"}

Rules:
- Use THESE exact numbers when responding.
- Answer clearly and concisely.
- If question is unrelated, say: "I can answer only about this loan."
`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemma-2-9b-it",
      messages,
    }),
  });

  const json = await res.json();
  return json?.choices?.[0]?.message?.content ?? "AI could not respond.";
}
