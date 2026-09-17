import React from 'react';
import {
  ChevronDown,
  ChevronUp,
  Truck,
  Store,
  Clock,
  Coins,
  Receipt,
  Scale,
  Percent,
} from 'lucide-react';
import { DecisionOption, Language } from '../types';
import { TRANSLATIONS } from '../data/marketData';

interface RankedCardProps {
  option: DecisionOption;
  isExpanded: boolean;
  onToggleExpand: () => void;
  language: Language;
}

export const RankedCard: React.FC<RankedCardProps> = ({
  option,
  isExpanded,
  onToggleExpand,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const { rank, breakdown, badgeColor, deltaVsBest } = option;

  const title = language === 'en' ? option.titleEn : option.titleHi;
  const subtitle = language === 'en' ? option.subtitleEn : option.subtitleHi;
  const badgeText = language === 'en' ? option.badgeEn : option.badgeHi;

  // Visual styling based on rank / badge color
  let borderColor = 'border-gray-200';
  let badgeClasses = 'bg-gray-100 text-gray-700';
  let accentBarColor = 'bg-gray-400';
  let cardBg = 'bg-white';

  if (rank === 1) {
    borderColor = 'border-[#2e7d32] shadow-sm';
    badgeClasses = 'bg-[#2e7d32] text-white';
    accentBarColor = 'bg-[#2e7d32]';
    cardBg = 'bg-[#f4fbf5]';
  } else if (rank === 2) {
    borderColor = 'border-amber-400/80';
    badgeClasses = 'bg-amber-600 text-white';
    accentBarColor = 'bg-amber-500';
    cardBg = 'bg-[#fffdf7]';
  } else {
    borderColor = 'border-rose-200';
    badgeClasses = 'bg-rose-600 text-white';
    accentBarColor = 'bg-rose-500';
    cardBg = 'bg-[#fffaf9]';
  }

  const getIcon = () => {
    if (option.id === 'sell_now') return <Store className="w-5 h-5 text-emerald-700" />;
    if (option.id === 'transport') return <Truck className="w-5 h-5 text-blue-700" />;
    return <Clock className="w-5 h-5 text-amber-700" />;
  };

  return (
    <div
      id={`ranked-card-${option.id}`}
      className={`rounded-2xl border-2 ${borderColor} ${cardBg} transition-all overflow-hidden shadow-xs`}
    >
      {/* Clickable Card Header */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full p-4 text-left cursor-pointer transition active:bg-black/5 select-none"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-xs flex items-center justify-center shrink-0 mt-0.5">
              {getIcon()}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider shadow-2xs ${badgeClasses}`}
                >
                  {badgeText}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {language === 'en' ? `Rank #${rank}` : `रैंक #${rank}`}
                </span>
              </div>

              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-tight">
                {title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
              ₹{option.netIncome.toLocaleString('en-IN')}
            </div>

            {deltaVsBest > 0 ? (
              <span className="text-[11px] font-bold text-rose-600 block mt-0.5">
                -₹{deltaVsBest.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] font-normal text-gray-400">
                  {language === 'en' ? 'vs #1' : 'कम'}
                </span>
              </span>
            ) : (
              <span className="text-[11px] font-extrabold text-[#2e7d32] block mt-0.5">
                {language === 'en' ? 'Top Net Return' : 'अधिकतम मुनाफा'}
              </span>
            )}
          </div>
        </div>

        {/* Expand / Collapse Indicator */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-200/60 text-xs font-semibold text-gray-600">
          <span className="text-[11px] text-gray-500 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-gray-400" />
            {isExpanded ? t.tapToCollapse : t.tapToExpand}
          </span>
          <div className="flex items-center gap-1 text-gray-500">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </div>
        </div>
      </button>

      {/* Accordion Breakdown Body */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 bg-white border-t border-gray-100 text-xs space-y-2.5 animate-fadeIn">
          <div className="space-y-2 py-1">
            {/* Gross Value */}
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Receipt className="w-3.5 h-3.5 text-gray-400" />
                <span>{t.grossValue}</span>
                <span className="text-[10px] text-gray-400">
                  ({breakdown.effectiveQuantityQuintals} qtl @ ₹{breakdown.pricePerQuintal}/qtl)
                </span>
              </span>
              <span className="font-bold text-gray-900">
                ₹{breakdown.grossRevenue.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Mandi Fees (2%) */}
            <div className="flex items-center justify-between text-gray-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Percent className="w-3.5 h-3.5 text-gray-400" />
                <span>{t.mandiFees}</span>
              </span>
              <span className="font-semibold text-rose-600">
                -₹{breakdown.mandiFees.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Freight / Transport Costs */}
            {breakdown.freightCost > 0 && (
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t.transportCost}</span>
                </span>
                <span className="font-semibold text-rose-600">
                  -₹{breakdown.freightCost.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {/* Storage Fees */}
            {breakdown.storageCost > 0 && (
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.storageFees}</span>
                </span>
                <span className="font-semibold text-rose-600">
                  -₹{breakdown.storageCost.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {/* Spoilage / Transit Loss */}
            {breakdown.spoilagePercent > 0 && (
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <Scale className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t.spoilageLoss}</span>
                  <span className="text-[10px] text-rose-600 font-semibold">
                    ({breakdown.spoilagePercent}% ≈ {breakdown.spoilageLossKg} kg)
                  </span>
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  ~₹{breakdown.spoilageLossRupees.toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>

          {/* Net Result Bar */}
          <div className="pt-2 border-t border-dashed border-gray-200 flex items-center justify-between bg-gray-50 p-2.5 rounded-xl font-bold">
            <span className="text-gray-800">{t.netInHand}:</span>
            <span className="text-base text-gray-900 font-black">
              ₹{breakdown.netIncome.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
