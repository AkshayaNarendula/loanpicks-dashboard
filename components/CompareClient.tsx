"use client";
import { useState, useRef } from "react";

export default function CompareClient({ initialProducts }: { initialProducts: any[] }) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<any[] | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  function toggle(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function compareNow() {
    const ids = Object.entries(selected)
      .filter(([_, val]) => val)
      .map(([id]) => id);

    if (ids.length < 2) {
      alert("Select at least two products to compare.");
      return;
    }

    const chosen = initialProducts.filter((product) => ids.includes(product.id));
    setResults(chosen);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-4">Compare Products</h1>

      <div className="mb-4">
        <button
          onClick={compareNow}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Compare Now
        </button>
      </div>

      {/* Product Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {initialProducts.map((p) => (
          <label
            key={p.id}
            className="
              flex items-center gap-3 border p-4 rounded-lg 
              bg-white
              hover:shadow-lg hover:border-purple-500 
              hover:-translate-y-1 transition-all cursor-pointer
            "
          >
            <input
              type="checkbox"
              checked={!!selected[p.id]}
              onChange={() => toggle(p.id)}
              className="accent-purple-600 w-5 h-5"
            />

            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-500">{p.bank} • {p.type}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Comparison Results */}
      {results && (
        <div ref={resultsRef} className="mt-10 animate-fadeIn">
          
          <h2 className="text-2xl font-semibold mb-4">Comparison Results</h2>

          <div className="overflow-x-auto border rounded-lg shadow bg-white">
            <table className="min-w-full">
              <thead>
                <tr className="bg-purple-50">
                  <th className="p-3 text-left font-semibold">Field</th>
                  {results.map((r) => (
                    <th key={r.id} className="p-3 text-left font-semibold">{r.name}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {[
                  { key: "APR", v: (p: any) => `${p.rate_apr}%` },
                  { key: "Min Income", v: (p: any) => `₹${p.min_income}` },
                  { key: "Credit Score", v: (p: any) => p.min_credit_score },
                  { key: "Tenure", v: (p: any) => `${p.tenure_min_months}-${p.tenure_max_months} months` },
                  { key: "Docs", v: (p: any) => p.docs_level },
                  { key: "Summary", v: (p: any) => p.summary },
                ].map((row, i) => (
                  <tr
                    key={row.key}
                    className={`
                      border-t animate-rowFade
                      ${i % 2 === 0 ? "bg-white" : "bg-purple-50/40"}
                      hover:bg-purple-100/40 transition
                    `}
                  >
                    <td className="p-3 font-medium">{row.key}</td>
                    {results.map((p) => (
                      <td key={p.id} className="p-3">{row.v(p)}</td>
                    ))}
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
