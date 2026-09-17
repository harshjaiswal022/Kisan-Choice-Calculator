import React, { useState, useMemo, useRef } from 'react';
import {
  Calculator,
  ArrowDown,
  ArrowUp,
  RotateCcw,
  Sparkles,
  Info,
  BadgePercent,
  CheckCheck,
} from 'lucide-react';
import { Language, CropId, QualityGrade, StorageDuration } from './types';
import { TRANSLATIONS, MANDIS, CROPS } from './data/marketData';
import { calculateDecisions } from './utils/calculator';
import { Header } from './components/Header';
import { CropSelector } from './components/CropSelector';
import { QuantityStepper } from './components/QuantityStepper';
import { QualitySelector } from './components/QualitySelector';
import { StorageControls } from './components/StorageControls';
import { LocationTransportControls } from './components/LocationTransportControls';
import { HeroRecommendation } from './components/HeroRecommendation';
import { RankedCard } from './components/RankedCard';
import { WhatsAppShare } from './components/WhatsAppShare';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [cropId, setCropId] = useState<CropId>('tomato');
  const [quantityQuintals, setQuantityQuintals] = useState<number>(25);
  const [quality, setQuality] = useState<QualityGrade>('good');
  const [willingToStore, setWillingToStore] = useState<boolean>(false);
  const [storageDays, setStorageDays] = useState<StorageDuration>(7);
  const [canTransport, setCanTransport] = useState<boolean>(true);
  const [localMandiId, setLocalMandiId] = useState<string>('local_nashik');
  const [districtMandiId, setDistrictMandiId] = useState<string>('dist_nashik');
  const [distanceKm, setDistanceKm] = useState<number>(34);
  const [customLocalPrice, setCustomLocalPrice] = useState<number | undefined>(undefined);
  const [customDistrictPrice, setCustomDistrictPrice] = useState<number | undefined>(undefined);
  const [expandedCardId, setExpandedCardId] = useState<string | null>('rank-1');

  const inputsRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];

  // Perform calculation
  const calculationResult = useMemo(() => {
    return calculateDecisions({
      cropId,
      quantityQuintals,
      quality,
      willingToStore,
      storageDays,
      canTransport,
      localMandiId,
      districtMandiId,
      customLocalPrice,
      customDistrictPrice,
      customDistanceKm: distanceKm,
    });
  }, [
    cropId,
    quantityQuintals,
    quality,
    willingToStore,
    storageDays,
    canTransport,
    localMandiId,
    districtMandiId,
    customLocalPrice,
    customDistrictPrice,
    distanceKm,
  ]);

  const handleReset = () => {
    setCropId('tomato');
    setQuantityQuintals(25);
    setQuality('good');
    setWillingToStore(false);
    setStorageDays(7);
    setCanTransport(true);
    setLocalMandiId('local_nashik');
    setDistrictMandiId('dist_nashik');
    setDistanceKm(34);
    setCustomLocalPrice(undefined);
    setCustomDistrictPrice(undefined);
    setExpandedCardId('rank-1');
  };

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToInputs = () => {
    inputsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // When crop changes, reset custom prices to match new crop defaults
  const handleSelectCrop = (newCropId: CropId) => {
    setCropId(newCropId);
    setCustomLocalPrice(undefined);
    setCustomDistrictPrice(undefined);
  };

  const bestOption = calculationResult.recommendation.bestOption;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'))}
        onReset={handleReset}
      />

      {/* Main Container - Mobile-first width (360px - 440px), centered */}
      <main className="w-full max-w-md mx-auto px-3.5 py-4 space-y-4 flex-1">
        {/* Banner / Value Proposition */}
        <div className="bg-gradient-to-r from-[#1b5e20] to-[#2e7d32] text-white p-3.5 rounded-2xl shadow-sm flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {language === 'en' ? 'Smart Post-Harvest AI' : 'स्मार्ट मंडी सलाह'}
            </span>
            <div className="text-sm font-bold leading-tight">
              {language === 'en'
                ? 'Sell Now, Transport, or Store?'
                : 'स्थानीय बेचें, मंडी भेजें या रोकें?'}
            </div>
            <div className="text-[11px] text-emerald-100 leading-tight">
              {language === 'en'
                ? 'Compare real net rupees in hand after transport & spoilage.'
                : 'भाड़ा, आढ़त और सड़न काटकर शुद्ध मुनाफे की सही तुलना।'}
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToResults}
            id="jump-to-result-badge"
            className="px-3 py-2 rounded-xl bg-white text-[#1b5e20] font-extrabold text-xs shrink-0 shadow-xs hover:bg-emerald-50 transition active:scale-95 cursor-pointer flex items-center gap-1"
          >
            <span>{language === 'en' ? 'View #1' : 'नतीजा देखें'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* SECTION: INPUTS */}
        <div
          ref={inputsRef}
          id="inputs-section"
          className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200/80 space-y-4"
        >
          <div className="flex items-center justify-between pb-1 border-b border-gray-100">
            <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-wide flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#2e7d32]" />
              <span>{language === 'en' ? 'Harvest Parameters' : 'फसल विवरण भरें'}</span>
            </h2>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {language === 'en' ? 'Live Auto-Update' : 'तुरंत गणना'}
            </span>
          </div>

          {/* 1. Crop Selector */}
          <CropSelector
            selectedCropId={cropId}
            onSelectCrop={handleSelectCrop}
            language={language}
          />

          {/* 2. Quantity Stepper */}
          <QuantityStepper
            quantityQuintals={quantityQuintals}
            onChangeQuantity={setQuantityQuintals}
            language={language}
          />

          {/* 3. Crop Quality Chips */}
          <QualitySelector
            selectedQuality={quality}
            onSelectQuality={setQuality}
            language={language}
          />

          {/* 4. Location & Transport Controls */}
          <LocationTransportControls
            cropId={cropId}
            localMandiId={localMandiId}
            onSelectLocalMandi={setLocalMandiId}
            districtMandiId={districtMandiId}
            onSelectDistrictMandi={setDistrictMandiId}
            canTransport={canTransport}
            onToggleTransport={setCanTransport}
            distanceKm={distanceKm}
            onChangeDistance={setDistanceKm}
            customLocalPrice={customLocalPrice}
            onChangeCustomLocalPrice={setCustomLocalPrice}
            customDistrictPrice={customDistrictPrice}
            onChangeCustomDistrictPrice={setCustomDistrictPrice}
            language={language}
          />

          {/* 5. Storage Controls (with dynamic toggle & duration selector) */}
          <StorageControls
            willingToStore={willingToStore}
            onToggleWillingToStore={setWillingToStore}
            storageDays={storageDays}
            onSelectStorageDays={setStorageDays}
            language={language}
          />

          {/* Calculate Button */}
          <button
            type="button"
            id="calculate-main-btn"
            onClick={scrollToResults}
            className="w-full h-13 rounded-2xl bg-[#1b5e20] hover:bg-[#154a19] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98] cursor-pointer"
          >
            <Calculator className="w-5 h-5 text-emerald-300" />
            <span>{t.calculateBtn}</span>
            <ArrowDown className="w-4 h-4 text-emerald-300" />
          </button>
        </div>

        {/* SECTION: RESULTS DASHBOARD */}
        <div ref={resultsRef} id="results-section" className="space-y-4 pt-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-gray-900 tracking-tight">
                {t.resultsHeader}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {t.resultsSub}
              </p>
            </div>

            {/* Recalculate / Adjust Button */}
            <button
              type="button"
              id="recalculate-scroll-btn"
              onClick={scrollToInputs}
              className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold border border-gray-200 flex items-center gap-1 transition active:scale-95 cursor-pointer shrink-0"
              title="Edit inputs and recalculate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.quickAdjust}</span>
            </button>
          </div>

          {/* 1. Hero Recommendation Banner */}
          <HeroRecommendation
            recommendation={calculationResult.recommendation}
            language={language}
          />

          {/* 2. Ranked Option Cards (3 Vertically Stacked Cards) */}
          <div className="space-y-3">
            {calculationResult.options.map((option, idx) => {
              const cardKey = `rank-${option.rank}`;
              const isExpanded = expandedCardId === cardKey || (expandedCardId === null && idx === 0);

              return (
                <RankedCard
                  key={option.id}
                  option={option}
                  isExpanded={isExpanded}
                  onToggleExpand={() =>
                    setExpandedCardId(isExpanded ? null : cardKey)
                  }
                  language={language}
                />
              );
            })}
          </div>

          {/* 3. WhatsApp Sharing & Text Copy */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <CheckCheck className="w-4 h-4 text-[#2e7d32]" />
              <span>
                {language === 'en'
                  ? 'Share this calculation with family or transport partners'
                  : 'यह हिसाब परिवार या साथी किसान के साथ शेयर करें'}
              </span>
            </div>

            <WhatsAppShare result={calculationResult} language={language} />
          </div>

          {/* Recalculate Bottom Action Button */}
          <button
            type="button"
            id="recalculate-bottom-btn"
            onClick={scrollToInputs}
            className="w-full py-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-gray-500" />
            <span>{t.recalculateBtn}</span>
          </button>

          {/* Disclaimer & Transparency Note */}
          <div className="p-3 rounded-xl bg-gray-100/80 border border-gray-200 text-[11px] text-gray-500 flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{t.disclaimer}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto px-4 py-4 text-center text-xs text-gray-400 border-t border-gray-200/60 mt-6">
        <p className="font-semibold text-gray-500">
          Kisan Choice Calculator • किसान चॉइस कैलकुलेटर
        </p>
        <p className="text-[10px] mt-0.5">
          Empowering smallholder farmers with transparent net in-hand post-harvest analytics
        </p>
      </footer>
    </div>
  );
}
