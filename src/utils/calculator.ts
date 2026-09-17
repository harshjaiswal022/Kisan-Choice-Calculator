import {
  CropId,
  QualityGrade,
  StorageDuration,
  CalculationResult,
  DecisionOption,
  OptionBreakdown,
  RecommendationSummary,
} from '../types';
import {
  CROPS,
  MANDIS,
  TRANSIT_LOSS_RATES,
  STORAGE_SPOILAGE_RATES,
  FREIGHT_CONFIG,
  MANDI_FEE_RATE,
} from '../data/marketData';

export interface CalculationParams {
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
  customFreightFare?: number;
  customDistanceKm?: number;
}

export function calculateDecisions(params: CalculationParams): CalculationResult {
  const {
    cropId,
    quantityQuintals,
    quality,
    willingToStore,
    storageDays,
    canTransport,
    localMandiId,
    districtMandiId,
  } = params;

  const crop = CROPS.find((c) => c.id === cropId) || CROPS[0];
  const localMandi = MANDIS.find((m) => m.id === localMandiId) || MANDIS[0];
  const districtMandi = MANDIS.find((m) => m.id === districtMandiId) || MANDIS[1];

  const localPrice = params.customLocalPrice ?? crop.defaultLocalPrice;
  const districtPrice = params.customDistrictPrice ?? crop.defaultDistrictPrice;
  const distanceKm = params.customDistanceKm ?? districtMandi.distanceKm;

  // 1. OPTION 1: Sell Now (Local Mandi)
  // Net = (Quantity * Local Price) - Mandi Fees (2%)
  const opt1Gross = Math.round(quantityQuintals * localPrice);
  const opt1MandiFees = Math.round(opt1Gross * MANDI_FEE_RATE);
  const opt1Net = opt1Gross - opt1MandiFees;

  const opt1Breakdown: OptionBreakdown = {
    grossRevenue: opt1Gross,
    mandiFees: opt1MandiFees,
    freightCost: 0,
    storageCost: 0,
    spoilagePercent: 0,
    spoilageLossKg: 0,
    spoilageLossRupees: 0,
    effectiveQuantityQuintals: quantityQuintals,
    effectiveQuantityKg: quantityQuintals * 100,
    pricePerQuintal: localPrice,
    netIncome: opt1Net,
  };

  // 2. OPTION 2: Transport to District Mandi
  // Net = (Effective Qty after Transit Loss) * District Price - Mandi Fees - Freight Cost
  // Freight Cost = Base Fare + Distance Rate + Quantity Rate
  const transitLossPct = TRANSIT_LOSS_RATES[cropId][quality];
  const opt2EffectiveQuintals = quantityQuintals * (1 - transitLossPct / 100);
  const opt2LossKg = Math.round(quantityQuintals * (transitLossPct / 100) * 100);
  const opt2Gross = Math.round(opt2EffectiveQuintals * districtPrice);
  const opt2SpoilageRupees = Math.round(
    quantityQuintals * (transitLossPct / 100) * districtPrice
  );
  const opt2MandiFees = Math.round(opt2Gross * MANDI_FEE_RATE);

  const baseFare = params.customFreightFare ?? FREIGHT_CONFIG.baseFare;
  const distanceFare = distanceKm * FREIGHT_CONFIG.distanceRatePerKm;
  const weightFare = quantityQuintals * FREIGHT_CONFIG.quantityRatePerQuintal;
  const opt2FreightCost = Math.round(baseFare + distanceFare + weightFare);

  const opt2Net = Math.round(opt2Gross - opt2MandiFees - opt2FreightCost);

  const opt2Breakdown: OptionBreakdown = {
    grossRevenue: opt2Gross,
    mandiFees: opt2MandiFees,
    freightCost: opt2FreightCost,
    storageCost: 0,
    spoilagePercent: transitLossPct,
    spoilageLossKg: opt2LossKg,
    spoilageLossRupees: opt2SpoilageRupees,
    effectiveQuantityQuintals: Number(opt2EffectiveQuintals.toFixed(2)),
    effectiveQuantityKg: Math.round(opt2EffectiveQuintals * 100),
    pricePerQuintal: districtPrice,
    netIncome: opt2Net,
  };

  // 3. OPTION 3: Store & Sell Later
  // Net = (Effective Qty after Time Decay) * Future Price Proxy - Mandi Fees - Storage Fees
  const storageLossPct = STORAGE_SPOILAGE_RATES[cropId][storageDays][quality];
  const opt3EffectiveQuintals = quantityQuintals * (1 - storageLossPct / 100);
  const opt3LossKg = Math.round(quantityQuintals * (storageLossPct / 100) * 100);

  // Future price proxy based on duration and ratio of user's local price
  let baseFuturePrice = crop.futurePriceProxy7Days;
  if (storageDays === 3) baseFuturePrice = crop.futurePriceProxy3Days;
  if (storageDays === 14) baseFuturePrice = crop.futurePriceProxy14Days;

  // Scale future proxy if user entered a custom local price
  const priceScale = localPrice / crop.defaultLocalPrice;
  const futurePrice = Math.round(baseFuturePrice * priceScale);

  const opt3Gross = Math.round(opt3EffectiveQuintals * futurePrice);
  const opt3SpoilageRupees = Math.round(
    quantityQuintals * (storageLossPct / 100) * futurePrice
  );
  const opt3MandiFees = Math.round(opt3Gross * MANDI_FEE_RATE);
  const opt3StorageCost = Math.round(storageDays * crop.storageDailyRate * quantityQuintals);

  const opt3Net = Math.round(opt3Gross - opt3MandiFees - opt3StorageCost);

  const opt3Breakdown: OptionBreakdown = {
    grossRevenue: opt3Gross,
    mandiFees: opt3MandiFees,
    freightCost: 0,
    storageCost: opt3StorageCost,
    spoilagePercent: storageLossPct,
    spoilageLossKg: opt3LossKg,
    spoilageLossRupees: opt3SpoilageRupees,
    effectiveQuantityQuintals: Number(opt3EffectiveQuintals.toFixed(2)),
    effectiveQuantityKg: Math.round(opt3EffectiveQuintals * 100),
    pricePerQuintal: futurePrice,
    netIncome: opt3Net,
  };

  // Build raw options
  const rawOptions: Omit<DecisionOption, 'rank' | 'deltaVsBest' | 'deltaVsNext' | 'badgeColor' | 'badgeEn' | 'badgeHi'>[] = [
    {
      id: 'sell_now',
      titleEn: 'Sell Now (Local Mandi)',
      titleHi: 'आज ही स्थानीय मंडी में बेचें',
      subtitleEn: 'Immediate cash, 0% spoilage risk',
      subtitleHi: 'तुरंत नकद भुगतान, शून्य सड़न जोखिम',
      netIncome: opt1Net,
      breakdown: opt1Breakdown,
      mandiNameEn: localMandi.nameEn,
      mandiNameHi: localMandi.nameHi,
    },
    {
      id: 'transport',
      titleEn: 'Transport to District Mandi',
      titleHi: 'जिला थोक मंडी ले जाकर बेचें',
      subtitleEn: `${districtMandi.nameEn} (${distanceKm} km)`,
      subtitleHi: `${districtMandi.nameHi} (${distanceKm} किमी)`,
      netIncome: opt2Net,
      breakdown: opt2Breakdown,
      mandiNameEn: districtMandi.nameEn,
      mandiNameHi: districtMandi.nameHi,
    },
    {
      id: 'store',
      titleEn: `Store & Sell Later (${storageDays} Days)`,
      titleHi: `रोकें और ${storageDays} दिन बाद बेचें`,
      subtitleEn: `Wait for anticipated price recovery`,
      subtitleHi: `बेहतर भाव की प्रतीक्षा (गोदाम सुरक्षित)`,
      netIncome: opt3Net,
      breakdown: opt3Breakdown,
      mandiNameEn: localMandi.nameEn,
      mandiNameHi: localMandi.nameHi,
    },
  ];

  // If user explicitly cannot transport, penalize ranking score priority or flag
  // Sort descending by net income
  const sorted = [...rawOptions].sort((a, b) => b.netIncome - a.netIncome);

  const bestNet = sorted[0].netIncome;

  const rankedOptions: DecisionOption[] = sorted.map((opt, idx) => {
    const rank = (idx + 1) as 1 | 2 | 3;
    const deltaVsBest = bestNet - opt.netIncome;
    const nextOption = sorted[idx + 1];
    const deltaVsNext = nextOption ? opt.netIncome - nextOption.netIncome : 0;

    let badgeColor: 'green' | 'amber' | 'red' = 'green';
    let badgeEn = 'BEST CHOICE';
    let badgeHi = 'सर्वश्रेष्ठ विकल्प';

    if (rank === 2) {
      badgeColor = 'amber';
      badgeEn = 'OKAY OPTION';
      badgeHi = 'मध्यम विकल्प';
    } else if (rank === 3) {
      badgeColor = 'red';
      badgeEn = 'HIGH RISK';
      badgeHi = 'उच्च जोखिम';
    }

    return {
      ...opt,
      rank,
      deltaVsBest,
      deltaVsNext,
      badgeColor,
      badgeEn,
      badgeHi,
    };
  });

  const bestOption = rankedOptions[0];
  const runnerUp = rankedOptions[1] || null;
  const sellNowOpt = rankedOptions.find((o) => o.id === 'sell_now') || rankedOptions[0];

  const extraProfitVsRunnerUp = runnerUp ? bestOption.netIncome - runnerUp.netIncome : 0;
  const extraProfitVsSellNow = bestOption.netIncome - sellNowOpt.netIncome;

  // Build plain-language explanation bullets
  const bullets = generateRecommendationBullets({
    bestOption,
    runnerUp,
    crop,
    quality,
    quantityQuintals,
    storageDays,
    canTransport,
    distanceKm,
    localPrice,
    districtPrice,
    futurePrice,
  });

  const recommendation: RecommendationSummary = {
    bestOption,
    runnerUpOption: runnerUp,
    extraProfitVsRunnerUp,
    extraProfitVsSellNow,
    headlineEn: bullets.headlineEn,
    headlineHi: bullets.headlineHi,
    bulletsEn: bullets.bulletsEn,
    bulletsHi: bullets.bulletsHi,
  };

  return {
    options: rankedOptions,
    recommendation,
    inputs: {
      cropId,
      quantityQuintals,
      quality,
      willingToStore,
      storageDays,
      canTransport,
      localMandiId,
      districtMandiId,
      customLocalPrice: params.customLocalPrice,
      customDistrictPrice: params.customDistrictPrice,
    },
  };
}

interface BulletGenParams {
  bestOption: DecisionOption;
  runnerUp: DecisionOption | null;
  crop: typeof CROPS[0];
  quality: QualityGrade;
  quantityQuintals: number;
  storageDays: StorageDuration;
  canTransport: boolean;
  distanceKm: number;
  localPrice: number;
  districtPrice: number;
  futurePrice: number;
}

function generateRecommendationBullets(p: BulletGenParams) {
  const { bestOption, runnerUp, crop, quality, distanceKm, districtPrice, localPrice, futurePrice } = p;
  const diff = runnerUp ? bestOption.netIncome - runnerUp.netIncome : 0;
  const formattedDiff = Math.abs(diff).toLocaleString('en-IN');

  let headlineEn = '';
  let headlineHi = '';
  const bulletsEn: string[] = [];
  const bulletsHi: string[] = [];

  const qualityNameEn = quality === 'good' ? 'Good Grade' : quality === 'average' ? 'Average Grade' : 'Poor Grade';
  const qualityNameHi = quality === 'good' ? 'उत्तम क्वालिटी' : quality === 'average' ? 'मध्यम क्वालिटी' : 'कमजोर क्वालिटी';

  if (bestOption.id === 'transport') {
    headlineEn = `Transporting to ${bestOption.mandiNameEn} earns the highest return!`;
    headlineHi = `${bestOption.mandiNameHi} ले जाकर बेचना सबसे अधिक लाभदायक है!`;

    const priceDiff = districtPrice - localPrice;
    bulletsEn.push(
      `District price of ₹${districtPrice.toLocaleString('en-IN')}/qtl (+₹${priceDiff}/qtl) creates ₹${bestOption.breakdown.grossRevenue.toLocaleString('en-IN')} gross value, easily absorbing freight of ₹${bestOption.breakdown.freightCost.toLocaleString('en-IN')}.`
    );
    bulletsHi.push(
      `जिला मंडी में ₹${districtPrice.toLocaleString('en-IN')}/क्विंटल (+₹${priceDiff}) का ऊंचा भाव ₹${bestOption.breakdown.freightCost.toLocaleString('en-IN')} के कुल भाड़े से कहीं ज्यादा मुनाफा दे रहा है।`
    );

    bulletsEn.push(
      `${qualityNameEn} produce keeps transit loss to only ${bestOption.breakdown.spoilagePercent}% across ${distanceKm} km, giving you +₹${formattedDiff} extra profit in-hand vs second best choice.`
    );
    bulletsHi.push(
      `${qualityNameHi} माल होने से ${distanceKm} किमी रास्ते में सिर्फ ${bestOption.breakdown.spoilagePercent}% नुकसान होगा और आपको दूसरे विकल्प से ₹${formattedDiff} ज्यादा शुद्ध रकम मिलेगी।`
    );
  } else if (bestOption.id === 'sell_now') {
    headlineEn = `Selling today at ${bestOption.mandiNameEn} protects your hard-earned money!`;
    headlineHi = `आज ही ${bestOption.mandiNameHi} में बेचना सबसे सुरक्षित और फायदेमंद फैसला है!`;

    bulletsEn.push(
      `Zero transport costs and 0% spoilage loss protects ₹${bestOption.netIncome.toLocaleString('en-IN')} immediately without vehicle delays or transit damage.`
    );
    bulletsHi.push(
      `शून्य परिवहन खर्च और ०% सड़न जोखिम के साथ पूरे ₹${bestOption.netIncome.toLocaleString('en-IN')} तुरंत हाथ में सुरक्षित मिलते हैं।`
    );

    if (crop.perishability === 'high') {
      bulletsEn.push(
        `Perishable ${crop.nameEn} spoils rapidly (${bestOption.breakdown.spoilagePercent || '15-35'}% decay in storage). Selling now avoids painful spoilage deductions and warehouse rent.`
      );
      bulletsHi.push(
        `जल्दी खराब होने वाले ${crop.nameHi} को रोकने पर भारी सड़न का नुकसान होता। आज ही बेचने से यह भारी कटौती बच जाती है।`
      );
    } else {
      bulletsEn.push(
        `Local price of ₹${localPrice.toLocaleString('en-IN')}/qtl offers optimal margin without risking market price drops or freight expenses.`
      );
      bulletsHi.push(
        `स्थानीय मंडी में ₹${localPrice.toLocaleString('en-IN')}/क्विंटल का भाव बिना भाड़े या नुकसान के सर्वोत्तम मुनाफा दे रहा है।`
      );
    }
  } else {
    // Store
    headlineEn = `Storing for ${p.storageDays} days yields maximum net income!`;
    headlineHi = `फसल को ${p.storageDays} दिन गोदाम में रोककर बेचना सर्वोत्तम रहेगा!`;

    bulletsEn.push(
      `Projected price rise to ₹${futurePrice.toLocaleString('en-IN')}/qtl adds substantial gross revenue, easily surpassing the small storage rent of ₹${bestOption.breakdown.storageCost.toLocaleString('en-IN')}.`
    );
    bulletsHi.push(
      `भाव बढ़कर ₹${futurePrice.toLocaleString('en-IN')}/क्विंटल होने का अनुमान है, जो गोदाम किराये (₹${bestOption.breakdown.storageCost.toLocaleString('en-IN')}) से कहीं अधिक मुनाफा देगा।`
    );

    bulletsEn.push(
      `${qualityNameEn} crop retains excellent firmness during storage with minimal decay (${bestOption.breakdown.spoilagePercent}%), securing +₹${formattedDiff} extra profit.`
    );
    bulletsHi.push(
      `${qualityNameHi} होने के कारण गोदाम में वजन/सड़न नुकसान मात्र ${bestOption.breakdown.spoilagePercent}% रहेगा, जिससे ₹${formattedDiff} का अतिरिक्त लाभ मिलेगा।`
    );
  }

  return { headlineEn, headlineHi, bulletsEn, bulletsHi };
}
