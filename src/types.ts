export type Language = 'en' | 'hi';

export type CropId = 'tomato' | 'guava' | 'wheat' | 'onion' | 'potato';

export type QualityGrade = 'good' | 'average' | 'poor';

export type StorageDuration = 3 | 7 | 14;

export type WeightUnit = 'quintal' | 'kg';

export interface CropInfo {
  id: CropId;
  nameEn: string;
  nameHi: string;
  emoji: string;
  perishability: 'high' | 'medium' | 'low';
  defaultLocalPrice: number; // ₹ per quintal
  defaultDistrictPrice: number; // ₹ per quintal
  futurePriceProxy3Days: number; // ₹ per quintal
  futurePriceProxy7Days: number;
  futurePriceProxy14Days: number;
  storageDailyRate: number; // ₹ per quintal per day
}

export interface MandiInfo {
  id: string;
  nameEn: string;
  nameHi: string;
  districtEn: string;
  districtHi: string;
  distanceKm: number;
  isLocal: boolean;
}

export interface OptionBreakdown {
  grossRevenue: number;
  mandiFees: number; // Mandi fees (2%)
  freightCost: number; // Base fare + distance rate + quantity rate
  storageCost: number; // Duration * daily rate * quantity
  spoilagePercent: number;
  spoilageLossKg: number;
  spoilageLossRupees: number;
  effectiveQuantityQuintals: number;
  effectiveQuantityKg: number;
  pricePerQuintal: number;
  netIncome: number;
}

export interface DecisionOption {
  id: 'sell_now' | 'transport' | 'store';
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  badgeEn: string;
  badgeHi: string;
  badgeColor: 'green' | 'amber' | 'red';
  netIncome: number;
  deltaVsBest: number;
  deltaVsNext: number;
  rank: 1 | 2 | 3;
  breakdown: OptionBreakdown;
  mandiNameEn: string;
  mandiNameHi: string;
}

export interface RecommendationSummary {
  bestOption: DecisionOption;
  runnerUpOption: DecisionOption | null;
  extraProfitVsRunnerUp: number;
  extraProfitVsSellNow: number;
  headlineEn: string;
  headlineHi: string;
  bulletsEn: string[];
  bulletsHi: string[];
}

export interface CalculationResult {
  options: DecisionOption[];
  recommendation: RecommendationSummary;
  inputs: {
    cropId: CropId;
    quantityQuintals: number;
    quality: QualityGrade;
    willingToStore: boolean;
    storageDays: StorageDuration;
    canTransport: boolean;
    localMandiId: string;
    districtMandiId: string;
    customLocalPrice?: number;
    customDistrictPrice?: number;
  };
}
