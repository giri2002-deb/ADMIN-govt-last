export interface CropDetails {
  name: string;
  acres: number;
  breakdown: {
    cents: number;
    motham: number;
    rokkam: number;
    uram_1: number;
    uram_2: number;
    vithai: number;
    thozhu_uram: number;
    poochi_marundhu: number;
  };
  perCentRate: {
    motham: number;
    rokkam: number;
    uram_1: number;
    uram_2: number;
    vithai: number;
    thozhu_uram: number;
    poochi_marundhu: number;
  };
}

export interface GuarantorDetails {
  type: 'gold' | 'friend' | 'own_property';
  goldDetails?: {
    jl: string;
  };
  friendDetails?: {
    u_number: string;
    name: string;
  };
  ownProperty?: {
    op: string;
  };
}

export interface Member {
  id: string;
  serialNo: string;
  memberName: string;
  category: string;
  landArea: number;
  farmerType: string;
  classification: string;
  aadhaarNo: string;
  accountNo: string;
  vkaNumber: string;
  selectedCrops: CropDetails[];
  totalAmount: number;
  date: string;
  guarantorDetails: GuarantorDetails;
}

export interface SummaryItem {
  id: number;
  description: string;
  count: number;
  rate: number;
  amount: number;
}