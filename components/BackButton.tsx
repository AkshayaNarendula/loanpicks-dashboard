"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-2 border px-3 py-2 rounded-lg hover:bg-gray-100"
    >
      <ArrowLeft className="h-4 w-4" /> Back
    </button>
  );
}
