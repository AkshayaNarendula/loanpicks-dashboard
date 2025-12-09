// lib/badge-generator.ts
export type Badge = { key: string; label: string; priority?: number };

export function generateBadges(product: any): Badge[] {
  const badges: Badge[] = [];

  if (typeof product.rate_apr === "number") {
    if (product.rate_apr <= 8) badges.push({ key: "low_apr", label: "Low APR", priority: 10 });
    else if (product.rate_apr <= 10) badges.push({ key: "fair_apr", label: "Competitive APR", priority: 7 });
  }

  if (product.docs_level === "low") badges.push({ key: "low_docs", label: "Low Docs", priority: 9 });
  else if (product.docs_level === "standard") badges.push({ key: "std_docs", label: "Standard Docs", priority: 4 });

  if (product.disbursal_speed === "fast") badges.push({ key: "fast_disbursal", label: "Fast Disbursal", priority: 8 });

  if (product.prepayment_allowed === true) badges.push({ key: "prepay_ok", label: "Prepayment Allowed", priority: 5 });
  else if (product.prepayment_allowed === false) badges.push({ key: "no_prepay", label: "No Prepayment", priority: 3 });

  if (typeof product.tenure_min_months === "number" && typeof product.tenure_max_months === "number") {
    const span = product.tenure_max_months - product.tenure_min_months;
    if (span >= 36) badges.push({ key: "flex_tenure", label: "Flexible Tenure", priority: 6 });
  }

  if (typeof product.min_income === "number") badges.push({ key: "salary", label: `Salary ≥ ₹${product.min_income}`, priority: 2 });
  if (typeof product.min_credit_score === "number") badges.push({ key: "credit", label: `Credit Score ≥ ${product.min_credit_score}`, priority: 2 });

  if (product.limited_time_offer) badges.push({ key: "limited", label: "Limited Time Offer", priority: 1 });

  badges.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  return badges.slice(0, 6);
}
