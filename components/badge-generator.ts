// components/badge-generator.ts
export function generateBadges(product: any) {
  const badges: string[] = [];
  if (product.rate_apr <= 8.5) badges.push("Low APR");
  else if (product.rate_apr <= 10) badges.push("Competitive APR");

  if (product.prepayment_allowed === false) badges.push("No Prepayment");
  else badges.push("Prepayment Allowed");

  if (product.docs_level === "low") badges.push("Low Docs");
  if (product.disbursal_speed === "fast") badges.push("Fast Disbursal");

  if (product.min_income && product.min_income <= 20000) badges.push(`Salary ≥ ₹${product.min_income}`);
  if (product.min_credit_score && product.min_credit_score <= 650) badges.push(`Credit Score ≥ ${product.min_credit_score}`);

  return badges;
}
