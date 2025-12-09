// components/ProductsFilter.tsx
"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Card-style Product Filters (manual numeric entry)
 * Option C — uses shadcn style components (Card, Input, Button)
 *
 * Props:
 *  - onApply(filters): called with { bank, maxApr, maxIncome, minCredit }
 */

export default function ProductsFilter({ onApply }: { onApply: (f: any) => void }) {
  const [bank, setBank] = useState("");
  const [maxApr, setMaxApr] = useState<number | "">("");
  const [maxIncome, setMaxIncome] = useState<number | "">("");
  const [minCredit, setMinCredit] = useState<number | "">("");

  function applyFilters() {
    const parsed = {
      bank: bank.trim(),
      maxApr: maxApr === "" ? undefined : Number(maxApr),
      maxIncome: maxIncome === "" ? undefined : Number(maxIncome),
      minCredit: minCredit === "" ? undefined : Number(minCredit),
    };
    onApply(parsed);
  }

  function resetFilters() {
    setBank("");
    setMaxApr("");
    setMaxIncome("");
    setMinCredit("");
    onApply({ bank: "", maxApr: undefined, maxIncome: undefined, minCredit: undefined });
  }

  return (
    <Card className="p-4 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filter Products</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Bank */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Bank</label>
          <Input
            placeholder="Search by bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            aria-label="Search by bank"
          />
        </div>

        {/* Max APR */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Max APR (%)</label>
          <Input
            type="number"
            placeholder="e.g. 12"
            value={maxApr as any}
            onChange={(e) => setMaxApr(e.target.value === "" ? "" : Number(e.target.value))}
            aria-label="Maximum APR"
          />
        </div>

        {/* Max Income */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Max Income (₹)</label>
          <Input
            type="number"
            placeholder="e.g. 30000"
            value={maxIncome as any}
            onChange={(e) => setMaxIncome(e.target.value === "" ? "" : Number(e.target.value))}
            aria-label="Maximum income"
          />
        </div>

        {/* Min Credit Score */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Min Credit Score</label>
          <Input
            type="number"
            placeholder="e.g. 700"
            value={minCredit as any}
            onChange={(e) => setMinCredit(e.target.value === "" ? "" : Number(e.target.value))}
            aria-label="Minimum credit score"
          />
        </div>
      </CardContent>

      <div className="mt-4 flex gap-3">
        <Button className="bg-purple-600 text-white" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
