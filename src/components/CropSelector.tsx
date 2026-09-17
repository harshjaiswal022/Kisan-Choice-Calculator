import React from 'react';
import { CropId, Language } from '../types';
import { CROPS, TRANSLATIONS } from '../data/marketData';

interface CropSelectorProps {
  selectedCropId: CropId;
  onSelectCrop: (id: CropId) => void;
  language: Language;
}

export const CropSelector: React.FC<CropSelectorProps> = ({
  selectedCropId,
  onSelectCrop,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-800">
          {t.cropLabel}
        </label>
        <span className="text-xs text-gray-500 font-medium">
          {language === 'en' ? 'Tap to choose' : 'चुनने के लिए दबाएं'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {CROPS.slice(0, 3).map((crop) => {
          const isSelected = crop.id === selectedCropId;
          const name = language === 'en' ? crop.nameEn : crop.nameHi;
          const perishabilityLabel =
            crop.perishability === 'high'
              ? language === 'en' ? 'Perishable' : 'जल्द खराब'
              : crop.perishability === 'medium'
              ? language === 'en' ? 'Semi-perishable' : 'मध्यम टिकाऊ'
              : language === 'en' ? 'Grain / Long shelf' : 'अनाज / टिकाऊ';

          return (
            <button
              key={crop.id}
              type="button"
              id={`crop-select-${crop.id}`}
              onClick={() => onSelectCrop(crop.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer min-h-[96px] text-center active:scale-[0.98] ${
                isSelected
                  ? 'border-[#2e7d32] bg-[#e8f5e9] shadow-sm ring-2 ring-[#2e7d32]/20 text-[#1b5e20]'
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700 shadow-xs'
              }`}
            >
              <span className="text-3xl mb-1 filter drop-shadow-xs select-none">
                {crop.emoji}
              </span>
              <span className="font-bold text-sm leading-tight">{name}</span>
              <span
                className={`text-[10px] mt-1 px-1.5 py-0.5 rounded-full font-medium ${
                  crop.perishability === 'high'
                    ? 'bg-red-100 text-red-700'
                    : crop.perishability === 'medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {perishabilityLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary crops (Onion, Potato) */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        {CROPS.slice(3).map((crop) => {
          const isSelected = crop.id === selectedCropId;
          const name = language === 'en' ? crop.nameEn : crop.nameHi;
          return (
            <button
              key={crop.id}
              type="button"
              id={`crop-select-${crop.id}`}
              onClick={() => onSelectCrop(crop.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all cursor-pointer min-h-[48px] active:scale-[0.98] ${
                isSelected
                  ? 'border-[#2e7d32] bg-[#e8f5e9] shadow-xs text-[#1b5e20] font-semibold'
                  : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600'
              }`}
            >
              <span className="text-xl select-none">{crop.emoji}</span>
              <div className="text-left text-xs">
                <div className="font-bold">{name}</div>
                <div className="text-[10px] text-gray-500">
                  ₹{crop.defaultLocalPrice}/qtl
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
