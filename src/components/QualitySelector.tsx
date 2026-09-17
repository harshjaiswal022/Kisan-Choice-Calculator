import React from 'react';
import { QualityGrade, Language } from '../types';
import { TRANSLATIONS } from '../data/marketData';

interface QualitySelectorProps {
  selectedQuality: QualityGrade;
  onSelectQuality: (q: QualityGrade) => void;
  language: Language;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({
  selectedQuality,
  onSelectQuality,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const options: {
    id: QualityGrade;
    labelEn: string;
    labelHi: string;
    descEn: string;
    descHi: string;
    dotColor: string;
    selectedBorder: string;
    selectedBg: string;
  }[] = [
    {
      id: 'good',
      labelEn: t.qualityGood,
      labelHi: t.qualityGood,
      descEn: t.qualityGoodDesc,
      descHi: t.qualityGoodDesc,
      dotColor: 'bg-emerald-500 ring-emerald-200',
      selectedBorder: 'border-emerald-600',
      selectedBg: 'bg-emerald-50/80',
    },
    {
      id: 'average',
      labelEn: t.qualityAvg,
      labelHi: t.qualityAvg,
      descEn: t.qualityAvgDesc,
      descHi: t.qualityAvgDesc,
      dotColor: 'bg-amber-500 ring-amber-200',
      selectedBorder: 'border-amber-600',
      selectedBg: 'bg-amber-50/80',
    },
    {
      id: 'poor',
      labelEn: t.qualityPoor,
      labelHi: t.qualityPoor,
      descEn: t.qualityPoorDesc,
      descHi: t.qualityPoorDesc,
      dotColor: 'bg-rose-500 ring-rose-200',
      selectedBorder: 'border-rose-600',
      selectedBg: 'bg-rose-50/80',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-800">
          {t.qualityLabel}
        </label>
        <span className="text-xs text-gray-500 font-medium">
          {language === 'en' ? 'Affects transit & spoilage loss' : 'सड़न व वजन नुकसान तय करता है'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSelected = selectedQuality === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              id={`quality-chip-${opt.id}`}
              onClick={() => onSelectQuality(opt.id)}
              className={`flex flex-col items-center text-center p-2.5 rounded-xl border-2 transition-all cursor-pointer min-h-[72px] justify-center active:scale-95 ${
                isSelected
                  ? `${opt.selectedBorder} ${opt.selectedBg} shadow-xs font-bold text-gray-900 ring-2 ring-emerald-600/10`
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ring-2 ${opt.dotColor}`} />
                <span className="text-xs font-bold leading-tight">
                  {language === 'en' ? opt.labelEn : opt.labelHi}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 leading-tight line-clamp-2">
                {language === 'en' ? opt.descEn : opt.descHi}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
