"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  const [bank, setBank] = useState(params.get("bank") || "");
  const [aprMin, setAprMin] = useState(params.get("aprMin") || "");
  const [aprMax, setAprMax] = useState(params.get("aprMax") || "");
  const [income, setIncome] = useState(params.get("income") || "");
  const [credit, setCredit] = useState(params.get("credit") || "");

  function applyFilters() {
    const q = new URLSearchParams();

    if (bank) q.set("bank", bank);
    if (aprMin) q.set("aprMin", aprMin);
    if (aprMax) q.set("aprMax", aprMax);
    if (income) q.set("income", income);
    if (credit) q.set("credit", credit);

    router.push(`/compare?${q.toString()}`);
  }

  return (
    <div className="p-6 rounded-xl shadow-lg bg-white/70 backdrop-blur">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Filters</h2>

      <div className="grid md:grid-cols-2 gap-4">

        <Input
          placeholder="Search Bank (HDFC, SBI...)"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
        />

        <Input
          placeholder="APR Min"
          type="number"
          value={aprMin}
          onChange={(e) => setAprMin(e.target.value)}
        />

        <Input
          placeholder="APR Max"
          type="number"
          value={aprMax}
          onChange={(e) => setAprMax(e.target.value)}
        />

        <Input
          placeholder="Minimum Income"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <Input
          placeholder="Minimum Credit Score"
          type="number"
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
        />
      </div>

      <Button className="mt-4 w-full" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  );
}
