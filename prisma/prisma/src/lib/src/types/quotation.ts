import type { AccommodationType, CopayType, CoverageType, PlanCategory } from "@prisma/client";

export type WizardStep = 1 | 2 | 3 | 4;

export interface WizardState {
  step: WizardStep;
  category: PlanCategory | null;
  client: { name: string; phone: string; email: string };
  beneficiaries: { minAge: number; maxAge: number; quantity: number }[];
  location: { state: string; city: string };
  filters: {
    accommodation: AccommodationType[];
    copay: CopayType[];
    coverage: CoverageType[];
  };
  selectedPlanIds: string[];
}

export interface PlanWithPrice {
  planId: string;
  operatorName: string;
  operatorLogo?: string;
  tableName: string;
  planName: string;
  accommodation: AccommodationType;
  copay: CopayType;
  coverage: CoverageType;
  ambulatorial: boolean;
  refundInfo?: string;
  registrationFee?: number;
  breakdown: { minAge: number; maxAge: number; quantity: number; unitPrice: number; subtotal: number }[];
  total: number;
}
