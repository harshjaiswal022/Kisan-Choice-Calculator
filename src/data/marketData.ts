import { CropInfo, MandiInfo, CropId, QualityGrade, StorageDuration } from '../types';

export const CROPS: CropInfo[] = [
  {
    id: 'tomato',
    nameEn: 'Tomato',
    nameHi: 'टमाटर',
    emoji: '🍅',
    perishability: 'high',
    defaultLocalPrice: 1800, // ₹/quintal (18 ₹/kg)
    defaultDistrictPrice: 2750, // ₹/quintal (27.5 ₹/kg)
    futurePriceProxy3Days: 2100,
    futurePriceProxy7Days: 2400,
    futurePriceProxy14Days: 2500,
    storageDailyRate: 6, // ₹6/quintal/day for cold/ventilated crate
  },
  {
    id: 'guava',
    nameEn: 'Guava',
    nameHi: 'अमरूद',
    emoji: '🥑',
    perishability: 'medium',
    defaultLocalPrice: 2200, // ₹/quintal (22 ₹/kg)
    defaultDistrictPrice: 3200, // ₹/quintal (32 ₹/kg)
    futurePriceProxy3Days: 2500,
    futurePriceProxy7Days: 2900,
    futurePriceProxy14Days: 3100,
    storageDailyRate: 5,
  },
  {
    id: 'wheat',
    nameEn: 'Wheat',
    nameHi: 'गेहूं',
    emoji: '🌾',
    perishability: 'low',
    defaultLocalPrice: 2275, // MSP benchmark ₹2,275/quintal
    defaultDistrictPrice: 2520, // District commercial mill rate
    futurePriceProxy3Days: 2320,
    futurePriceProxy7Days: 2390,
    futurePriceProxy14Days: 2480,
    storageDailyRate: 3, // dry godown
  },
  {
    id: 'onion',
    nameEn: 'Onion',
    nameHi: 'प्याज़',
    emoji: '🧅',
    perishability: 'medium',
    defaultLocalPrice: 1600,
    defaultDistrictPrice: 2350,
    futurePriceProxy3Days: 1750,
    futurePriceProxy7Days: 2000,
    futurePriceProxy14Days: 2200,
    storageDailyRate: 4,
  },
  {
    id: 'potato',
    nameEn: 'Potato',
    nameHi: 'आलू',
    emoji: '🥔',
    perishability: 'low',
    defaultLocalPrice: 1200,
    defaultDistrictPrice: 1700,
    futurePriceProxy3Days: 1280,
    futurePriceProxy7Days: 1400,
    futurePriceProxy14Days: 1550,
    storageDailyRate: 3,
  },
];

export const MANDIS: MandiInfo[] = [
  {
    id: 'local_nashik',
    nameEn: 'Pimpalgaon Village Mandi',
    nameHi: 'पिंपलगांव ग्रामीण मंडी',
    districtEn: 'Nashik',
    districtHi: 'नासिक',
    distanceKm: 4,
    isLocal: true,
  },
  {
    id: 'dist_nashik',
    nameEn: 'Nashik Central APMC',
    nameHi: 'नासिक मुख्य एपीएमसी',
    districtEn: 'Nashik',
    districtHi: 'नासिक',
    distanceKm: 34,
    isLocal: false,
  },
  {
    id: 'local_kolar',
    nameEn: 'Malur Local Yard',
    nameHi: 'मालूर स्थानीय यार्ड',
    districtEn: 'Kolar',
    districtHi: 'कोलार',
    distanceKm: 6,
    isLocal: true,
  },
  {
    id: 'dist_bangalore',
    nameEn: 'K.R. Market (Bangalore)',
    nameHi: 'के.आर. मार्केट (बेंगलुरु)',
    districtEn: 'Bangalore Urban',
    districtHi: 'बेंगलुरु शहर',
    distanceKm: 48,
    isLocal: false,
  },
  {
    id: 'local_varanasi',
    nameEn: 'Rohania Sub-Yard',
    nameHi: 'रोहनिया उप-मंडी',
    districtEn: 'Varanasi',
    districtHi: 'वाराणसी',
    distanceKm: 5,
    isLocal: true,
  },
  {
    id: 'dist_varanasi',
    nameEn: 'Chandpur Wholesale APMC',
    nameHi: 'चांदपुर थोक एपीएमसी',
    districtEn: 'Varanasi',
    districtHi: 'वाराणसी',
    distanceKm: 28,
    isLocal: false,
  },
];

// Transit loss rates (%) during transport based on crop perishability and quality
export const TRANSIT_LOSS_RATES: Record<CropId, Record<QualityGrade, number>> = {
  tomato: {
    good: 3.0,
    average: 6.5,
    poor: 12.0,
  },
  guava: {
    good: 2.0,
    average: 4.5,
    poor: 8.5,
  },
  wheat: {
    good: 0.2,
    average: 0.5,
    poor: 1.0,
  },
  onion: {
    good: 1.5,
    average: 3.5,
    poor: 7.0,
  },
  potato: {
    good: 1.0,
    average: 2.5,
    poor: 5.0,
  },
};

// Storage decay / spoilage loss (%) based on crop, quality, and duration (days)
export const STORAGE_SPOILAGE_RATES: Record<
  CropId,
  Record<StorageDuration, Record<QualityGrade, number>>
> = {
  tomato: {
    3: { good: 6.0, average: 12.0, poor: 22.0 },
    7: { good: 18.0, average: 32.0, poor: 55.0 },
    14: { good: 42.0, average: 70.0, poor: 92.0 },
  },
  guava: {
    3: { good: 4.0, average: 8.5, poor: 16.0 },
    7: { good: 12.0, average: 22.0, poor: 40.0 },
    14: { good: 28.0, average: 50.0, poor: 75.0 },
  },
  wheat: {
    3: { good: 0.1, average: 0.2, poor: 0.5 },
    7: { good: 0.2, average: 0.4, poor: 0.9 },
    14: { good: 0.4, average: 0.8, poor: 1.6 },
  },
  onion: {
    3: { good: 2.0, average: 4.5, poor: 9.0 },
    7: { good: 5.5, average: 11.0, poor: 22.0 },
    14: { good: 12.0, average: 24.0, poor: 45.0 },
  },
  potato: {
    3: { good: 1.5, average: 3.0, poor: 6.5 },
    7: { good: 3.5, average: 7.0, poor: 14.0 },
    14: { good: 8.0, average: 16.0, poor: 30.0 },
  },
};

// Freight parameters: Freight Cost = Base Fare + (Distance * Distance Rate) + (Quantity * Quantity Rate)
export const FREIGHT_CONFIG = {
  baseFare: 250, // ₹ Base fixed truck/tempo loading fare
  distanceRatePerKm: 18, // ₹ per km
  quantityRatePerQuintal: 12, // ₹ per quintal weight surcharge
  defaultDistanceKm: 32, // Default distance to District APMC
};

// Mandi fee rate = 2%
export const MANDI_FEE_RATE = 0.02;

// Translations for bilingual English / Hindi experience
export const TRANSLATIONS = {
  en: {
    appTitle: 'Kisan Choice Calculator',
    appSubtitle: 'Post-Harvest Sale Decision Tool for Smallholder Farmers',
    tagline: 'Behtar Daam Ka Asaan Hisab • Real-time Net Rupee Comparison',
    languagePill: 'हिंदी में देखें',
    changeLang: 'हिंदी',
    
    // Steps
    step1Title: '1. Select Crop & Quantity',
    step2Title: '2. Crop Quality Grade',
    step3Title: '3. Mandi & Transport',
    step4Title: '4. Storage Willingness',
    
    // Inputs
    cropLabel: 'Crop Type',
    quantityLabel: 'Harvest Quantity',
    unitQuintal: 'Quintals (क्विंटल)',
    unitKg: 'Kg (किलो)',
    presetLabel: 'Quick presets:',
    
    qualityLabel: 'Quality Grade',
    qualityGood: 'Good',
    qualityGoodDesc: 'Firm, uniform, fresh harvest',
    qualityAvg: 'Average',
    qualityAvgDesc: 'Mixed size, slight blemishes',
    qualityPoor: 'Poor',
    qualityPoorDesc: 'Over-ripe or damaged',
    
    localMandiLabel: 'Your Local Mandi',
    districtMandiLabel: 'District Wholesale Mandi',
    localPriceLabel: 'Local Mandi Price',
    districtPriceLabel: 'District Mandi Price',
    distanceLabel: 'Distance to District Mandi',
    transportToggleLabel: 'Willing / Able to Transport to District Mandi?',
    transportEnabled: 'Yes, vehicle / tempo arranged',
    transportDisabled: 'No, local sale only',
    
    storageToggleLabel: 'Willing to Store & Sell Later?',
    storageEnabled: 'Yes, godown / storage available',
    storageDisabled: 'No, immediate cash needed',
    storageDurationLabel: 'Storage Duration',
    days3: '3 Days',
    days7: '7 Days (1 Week)',
    days14: '14 Days (2 Weeks)',
    
    calculateBtn: 'Calculate Best Sale Option',
    recalculateBtn: 'Edit Inputs & Recalculate',
    quickAdjust: 'Adjust Details',
    
    // Results
    resultsHeader: 'Comparison of 3 Sale Options',
    resultsSub: 'Sorted strictly by highest net money in hand (₹) after all costs & spoilage',
    heroBadge: 'RECOMMENDED STRATEGY',
    extraProfitPrefix: 'Extra Profit in-hand:',
    vsSellNow: 'vs selling locally today',
    vsRunnerUp: 'vs 2nd best choice',
    
    rank1Badge: 'BEST CHOICE',
    rank2Badge: 'OKAY OPTION',
    rank3Badge: 'HIGH RISK / LOSS',
    
    optionSellNow: 'Option 1: Sell Now (Local Mandi)',
    optionSellNowSub: 'Immediate payment, zero transit risk',
    optionTransport: 'Option 2: Transport to District Mandi',
    optionTransportSub: 'Higher city price minus freight & transit loss',
    optionStore: 'Option 3: Store & Sell Later',
    optionStoreSub: 'Anticipated price rise minus storage fee & spoilage decay',
    
    netInHand: 'Net In-Hand Money',
    grossValue: 'Gross Crop Value',
    transportCost: 'Freight & Transport Cost',
    mandiFees: 'Mandi Fees (2%)',
    spoilageLoss: 'Spoilage & Weight Loss',
    storageFees: 'Storage Rent / Fees',
    effectiveSaleQty: 'Final Saleable Quantity',
    assumedPrice: 'Sale Price',
    
    tapToExpand: 'Tap to see cost breakdown',
    tapToCollapse: 'Hide breakdown',
    
    shareWhatsApp: 'Share Summary via WhatsApp',
    disclaimer: 'Note: Prices and transit loss formulas are calibrated with Agmarknet benchmarks & regional mandi guidelines.',
  },
  hi: {
    appTitle: 'किसान चॉइस कैलकुलेटर',
    appSubtitle: 'फसल कटाई के बाद बिक्री का सही फैसला',
    tagline: 'बेहतर दाम का आसान हिसाब • हाथ में शुद्ध रुपये की तुलना',
    languagePill: 'View in English',
    changeLang: 'English',
    
    // Steps
    step1Title: '१. फसल और मात्रा चुनें',
    step2Title: '२. फसल की गुणवत्ता (क्वालिटी)',
    step3Title: '३. मंडी और परिवहन',
    step4Title: '४. भंडारण (स्टोरेज) की इच्छा',
    
    // Inputs
    cropLabel: 'फसल का प्रकार',
    quantityLabel: 'फसल की कुल मात्रा',
    unitQuintal: 'क्विंटल',
    unitKg: 'किलोग्राम',
    presetLabel: 'त्वरित मात्रा:',
    
    qualityLabel: 'फसल की गुणवत्ता',
    qualityGood: 'उत्तम (Good)',
    qualityGoodDesc: 'ताजा, एक समान आकार, कोई दाग नहीं',
    qualityAvg: 'मध्यम (Average)',
    qualityAvgDesc: 'मिला-जुला आकार, मामूली दाग',
    qualityPoor: 'कमजोर (Poor)',
    qualityPoorDesc: 'ज्यादा पका या खराब माल',
    
    localMandiLabel: 'आपकी स्थानीय मंडी',
    districtMandiLabel: 'जिला थोक मंडी',
    localPriceLabel: 'स्थानीय मंडी भाव',
    districtPriceLabel: 'जिला मंडी भाव',
    distanceLabel: 'जिला मंडी की दूरी',
    transportToggleLabel: 'क्या जिला मंडी तक माल ले जा सकते हैं?',
    transportEnabled: 'हाँ, गाड़ी/टेंपो का प्रबंध संभव है',
    transportDisabled: 'नहीं, केवल स्थानीय बिक्री',
    
    storageToggleLabel: 'क्या कुछ दिन रोककर बेचने को तैयार हैं?',
    storageEnabled: 'हाँ, गोदाम/भंडारण की जगह है',
    storageDisabled: 'नहीं, तुरंत नकद पैसे चाहिए',
    storageDurationLabel: 'कितने दिन रोक सकते हैं?',
    days3: '३ दिन',
    days7: '७ दिन (१ हफ्ता)',
    days14: '१४ दिन (२ हफ्ते)',
    
    calculateBtn: 'सर्वोत्तम बिक्री विकल्प निकालें',
    recalculateBtn: 'विवरण बदलें व दोबारा जांचें',
    quickAdjust: 'विवरण सुधारें',
    
    // Results
    resultsHeader: 'तीनों बिक्री विकल्पों की तुलना',
    resultsSub: 'सभी खर्चे, भाड़ा और सड़न नुकसान घटाकर हाथ में शुद्ध मुनाफे अनुसार क्रमबद्ध',
    heroBadge: 'सर्वोत्तम सलाह (Best Strategy)',
    extraProfitPrefix: 'हाथ में अतिरिक्त शुद्ध लाभ:',
    vsSellNow: 'आज स्थानीय मंडी में बेचने की तुलना में',
    vsRunnerUp: 'दूसरे विकल्प की तुलना में',
    
    rank1Badge: 'सर्वश्रेष्ठ विकल्प (BEST)',
    rank2Badge: 'मध्यम विकल्प (OKAY)',
    rank3Badge: 'उच्च जोखिम (HIGH RISK)',
    
    optionSellNow: 'विकल्प १: आज स्थानीय मंडी में बेचें',
    optionSellNowSub: 'तुरंत नकद, रास्ते का कोई जोखिम नहीं',
    optionTransport: 'विकल्प २: जिला मंडी ले जाकर बेचें',
    optionTransportSub: 'बड़ा बाजार, ज्यादा भाव minus भाड़ा व सड़न',
    optionStore: 'विकल्प ३: रोककर बाद में बेचें',
    optionStoreSub: 'भविष्य में भाव बढ़त minus गोदाम भाड़ा व वजन गिरावट',
    
    netInHand: 'हाथ में शुद्ध रकम',
    grossValue: 'फसल का कुल मूल्य',
    transportCost: 'भाड़ा और परिवहन खर्च',
    mandiFees: 'मंडी शुल्क (२%)',
    spoilageLoss: 'सड़न/वजन नुकसान',
    storageFees: 'गोदाम किराया',
    effectiveSaleQty: 'बिकने योग्य शेष वजन',
    assumedPrice: 'बिक्री भाव',
    
    tapToExpand: 'खर्चों का पूरा ब्यौरा देखने के लिए छुएं',
    tapToCollapse: 'ब्यौरा छुपाएं',
    
    shareWhatsApp: 'व्हाट्सएप पर हिसाब शेयर करें',
    disclaimer: 'सूचना: यह हिसाब एग्मार्कनेट मानकों और क्षेत्रीय मंडी डेटा पर आधारित है।',
  },
};
