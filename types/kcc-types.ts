import { KCCMember } from "@/components/pages/KccAHsheets/kcc-page-1";

export interface CropDetail {
  cropName: string;
  extent: number;
  expenses: {
    cash: number;
    seeds: number;
    pesticide: number;
    fertilizer: number;
    others: number;
    insurance: number;
  };
  total: number;
  cropsWithAmounts?: string;
}

export interface LoanDetails {
  type: string;
  shareAmount: number;
  selectedCrops: Array<{
    crop: {
      motham: number;
      rokkam: number;
      uram_1: number;
      uram_2: number;
      vithai: number;
      crop_code: number;
      thozhu_uram: number;
      name_of_crop: string;
      poochi_marundhu: number;
    };
    acres: number;
    breakdown: any;
    surveyNumber: string;
    eligibleAmount: number;
  }>;
  cropsBreakdown: Array<{
    acres: number;
    cents: number;
    index: number;
    breakdown: any;
    crop_code: number;
    name_of_crop: string;
    surveyNumber: string;
  }>;
  principleAmount: number;
  totalEligibleAmount: number;
}

export interface KCCData {
  members: KCCMember[];
  financial: {
    transitAccount: number;
    loanComponents: {
      seeds: number;
      fertilizer: number;
      pesticide: number;
      insurance: number;
      others: number;
    };
    total: number;
  };
  loanDetails: LoanDetails; // Changed from cropDetails to loanDetails
  // ... rest of your KCCData interface
}