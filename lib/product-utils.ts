export function generateBadges(product: any) {
  const badges: string[] = [];

  if (product.rate_apr < 10) badges.push("Low APR");
  if (product.disbursal_speed === "fast") badges.push("Fast Disbursal");
  if (product.docs_level === "low") badges.push("Low Docs");
  if (product.prepayment_allowed) badges.push("Prepayment Allowed");
  if (product.min_credit_score <= 700) badges.push("Easy Approval");
  if (product.processing_fee_pct === 0) badges.push("No Processing Fee");

  // keep only 3 badges
  return badges.slice(0, 3);
}
