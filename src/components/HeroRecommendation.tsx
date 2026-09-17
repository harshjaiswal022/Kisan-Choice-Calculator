import React from 'react';
import { Award, CheckCircle2, TrendingUp, ArrowUpRight } from 'lucide-react';
import { RecommendationSummary, Language } from '../types';
import { TRANSLATIONS } from '../data/marketData';

interface HeroRecommendationProps {
  recommendation: RecommendationSummary;
  language: Language;
}

export const HeroRecommendation: React.FC<HeroRecommendationProps> = ({
  recommendation,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const { bestOption, extraProfitVsRunnerUp, extraProfitVsSellNow, bulletsEn, bulletsHi } =
    recommendation;

  const bullets = language === 'en' ? bulletsEn : bulletsHi;
  const bestTitle = language === 'en' ? bestOption.titleEn : bestOption.titleHi;

  // Extra profit calculation
  const showProfitDiff = extraProfitVsRunnerUp > 0;
  const diffAmount = extraProfitVsRunnerUp;

  return (
    <div
      id="hero-recommendation-card"
      className="bg-[#e8f5e9] border-2 border-[#2e7d32] rounded-2xl p-4 shadow-md transition-all relative overflow-hidden"
    >
      {/* Background watermark badge */}
      <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
        <Award className="w-32 h-32 text-[#1b5e20]" />
      </div>

      <div className="relative z-10 space-y-3">
        {/* Top badge */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2e7d32] text-white text-xs font-extrabold uppercase tracking-wide shadow-xs">
            <Award className="w-3.5 h-3.5" />
            <span>{t.heroBadge}</span>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-[#1b5e20] uppercase tracking-wider block">
              {t.netInHand}
            </span>
            <span className="text-2xl font-black text-[#1b5e20] tracking-tight">
              ₹{bestOption.netIncome.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Title */}
        <div>
          <h2 className="text-lg font-black text-gray-900 leading-snug">
            {bestTitle}
          </h2>
          <p className="text-xs font-semibold text-gray-600 mt-0.5">
            {language === 'en' ? bestOption.subtitleEn : bestOption.subtitleHi}
          </p>
        </div>

        {/* Extra profit in hand highlight */}
        {showProfitDiff ? (
          <div className="bg-white/90 border border-emerald-300 rounded-xl p-3 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#2e7d32] flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs text-gray-600 font-medium block">
                  {t.extraProfitPrefix}
                </span>
                <span className="text-xs text-gray-500 font-normal">
                  {t.vsRunnerUp}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-extrabold text-[#2e7d32] tracking-tight">
                +₹{diffAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 border border-emerald-300 rounded-xl p-2.5 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0" />
            <span>
              {language === 'en'
                ? 'Highest net return among all available post-harvest routes.'
                : 'सभी उपलब्ध बिक्री विकल्पों में सबसे अधिक सुरक्षित मुनाफा।'}
            </span>
          </div>
        )}

        {/* Plain language bullet points explaining why */}
        <div className="bg-white/75 rounded-xl p-3 border border-emerald-200/80 space-y-2">
          <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
            {language === 'en' ? 'Why this is recommended:' : 'यह विकल्प क्यों बेहतर है:'}
          </span>
          <ul className="space-y-1.5 text-xs text-gray-800">
            {bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32] mt-1.5 shrink-0" />
                <span className="leading-relaxed font-medium">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
