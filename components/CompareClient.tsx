// components/CompareClient.tsx
"use client";
import { useState } from "react";

export default function CompareClient({ initialProducts }: { initialProducts: any[] }) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<any[] | null>(null);

  function toggle(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function compareNow() {
    const ids = Object.entries(selected).filter(([_, v]) => v).map(([k]) => k);
    if (ids.length < 2) {
      alert("Select at least two products to compare.");
      return;
    }
    const chosen = initialProducts.filter((p) => ids.includes(p.id));
    setResults(chosen);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Compare Products</h1>

      <div className="mb-4">
        <button onClick={compareNow} className="bg-purple-600 text-white px-4 py-2 rounded">Compare Now</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {initialProducts.map((p) => (
          <label key={p.id} className="flex items-center gap-3 border p-3 rounded">
            <input type="checkbox" checked={!!selected[p.id]} onChange={() => toggle(p.id)} />
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-500">{p.bank} • {p.type}</div>
            </div>
          </label>
        ))}
      </div>

      {results && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Comparison Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Field</th>
                  {results.map((r) => <th key={r.id} className="p-3 text-left">{r.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "APR", v: (p: any) => `${p.rate_apr}%` },
                  { key: "Min Income", v: (p: any) => `₹${p.min_income}` },
                  { key: "Credit Score", v: (p: any) => p.min_credit_score },
                  { key: "Tenure", v: (p: any) => `${p.tenure_min_months}-${p.tenure_max_months}` },
                  { key: "Docs", v: (p: any) => p.docs_level },
                  { key: "Summary", v: (p: any) => p.summary },
                ].map((row) => (
                  <tr key={row.key} className="border-t">
                    <td className="p-3 font-medium">{row.key}</td>
                    {results.map((p) => <td key={p.id} className="p-3">{row.v(p)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
