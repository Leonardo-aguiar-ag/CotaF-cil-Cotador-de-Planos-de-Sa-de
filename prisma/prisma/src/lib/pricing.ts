export interface BeneficiaryBand {
  minAge: number;
  maxAge: number;
  quantity: number;
}

export interface PriceRuleInput {
  minAge: number;
  maxAge: number;
  price: number;
}

export interface BandBreakdown {
  minAge: number;
  maxAge: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CalculationResult {
  breakdown: BandBreakdown[];
  total: number;
}

export function calculateTotal(
  rules: PriceRuleInput[],
  beneficiaries: BeneficiaryBand[],
): CalculationResult {
  const breakdown: BandBreakdown[] = [];
  let total = 0;

  for (const b of beneficiaries) {
    if (b.quantity <= 0) continue;
    const rule = rules.find(
      (r) => b.minAge >= r.minAge && b.minAge <= r.maxAge,
    );
    if (!rule) continue;
    const subtotal = +(rule.price * b.quantity).toFixed(2);
    total += subtotal;
    breakdown.push({
      minAge: rule.minAge,
      maxAge: rule.maxAge,
      quantity: b.quantity,
      unitPrice: rule.price,
      subtotal,
    });
  }

  return { breakdown, total: +total.toFixed(2) };
}

export const ANS_AGE_BANDS: { minAge: number; maxAge: number; label: string }[] = [
  { minAge: 0,  maxAge: 18,  label: "0 a 18" },
  { minAge: 19, maxAge: 23,  label: "19 a 23" },
  { minAge: 24, maxAge: 28,  label: "24 a 28" },
  { minAge: 29, maxAge: 33,  label: "29 a 33" },
  { minAge: 34, maxAge: 38,  label: "34 a 38" },
  { minAge: 39, maxAge: 43,  label: "39 a 43" },
  { minAge: 44, maxAge: 48,  label: "44 a 48" },
  { minAge: 49, maxAge: 53,  label: "49 a 53" },
  { minAge: 54, maxAge: 58,  label: "54 a 58" },
  { minAge: 59, maxAge: 120, label: "59+" },
];
