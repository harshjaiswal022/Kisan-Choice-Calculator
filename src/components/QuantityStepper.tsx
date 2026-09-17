import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Language, WeightUnit } from '../types';
import { TRANSLATIONS } from '../data/marketData';

interface QuantityStepperProps {
  quantityQuintals: number;
  onChangeQuantity: (newQtyQuintals: number) => void;
  language: Language;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantityQuintals,
  onChangeQuantity,
  language,
}) => {
  const [unit, setUnit] = React.useState<WeightUnit>('quintal');
  const t = TRANSLATIONS[language];

  const displayedValue = unit === 'quintal' ? quantityQuintals : Math.round(quantityQuintals * 100);

  const handleStep = (direction: 'up' | 'down') => {
    const step = unit === 'quintal' ? 1 : 50;
    if (unit === 'quintal') {
      const next = direction === 'up' ? quantityQuintals + step : Math.max(1, quantityQuintals - step);
      onChangeQuantity(next);
    } else {
      const currentKg = quantityQuintals * 100;
      const nextKg = direction === 'up' ? currentKg + step : Math.max(50, currentKg - step);
      onChangeQuantity(Number((nextKg / 100).toFixed(2)));
    }
  };

  const handleDirectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val) || val <= 0) return;
    if (unit === 'quintal') {
      onChangeQuantity(Math.min(1000, val));
    } else {
      onChangeQuantity(Math.min(1000, Number((val / 100).toFixed(2))));
    }
  };

  const presets = [5, 15, 30, 60];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-800">
          {t.quantityLabel}
        </label>
        
        {/* Unit switch */}
        <div className="inline-flex rounded-lg bg-gray-100 p-0.5 border border-gray-200">
          <button
            type="button"
            onClick={() => setUnit('quintal')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
              unit === 'quintal'
                ? 'bg-white text-[#1b5e20] shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {language === 'en' ? 'Quintal (qtl)' : 'क्विंटल'}
          </button>
          <button
            type="button"
            onClick={() => setUnit('kg')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
              unit === 'kg'
                ? 'bg-white text-[#1b5e20] shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {language === 'en' ? 'Kg' : 'किलो'}
          </button>
        </div>
      </div>

      {/* Stepper with prominent flanked buttons */}
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          id="qty-decrement-btn"
          onClick={() => handleStep('down')}
          disabled={quantityQuintals <= (unit === 'quintal' ? 1 : 0.5)}
          className="w-14 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 disabled:pointer-events-none text-gray-800 flex items-center justify-center font-bold text-xl border border-gray-300 transition shrink-0 cursor-pointer shadow-xs"
          aria-label="Decrease harvest quantity"
        >
          <Minus className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="relative flex-1">
          <input
            type="number"
            id="harvest-quantity-input"
            value={displayedValue}
            onChange={handleDirectInput}
            min={unit === 'quintal' ? 1 : 50}
            max={unit === 'quintal' ? 1000 : 100000}
            step={unit === 'quintal' ? 1 : 25}
            className="w-full h-12 text-center text-xl font-extrabold text-gray-900 bg-white border-2 border-gray-200 focus:border-[#2e7d32] focus:ring-2 focus:ring-[#2e7d32]/20 rounded-xl outline-none transition px-2"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 pointer-events-none">
            {unit === 'quintal' ? (language === 'en' ? 'QTL' : 'क्वि.') : (language === 'en' ? 'KG' : 'कि.ग्रा.')}
          </span>
        </div>

        <button
          type="button"
          id="qty-increment-btn"
          onClick={() => handleStep('up')}
          className="w-14 h-12 rounded-xl bg-[#2e7d32] hover:bg-[#1b5e20] active:scale-95 text-white flex items-center justify-center font-bold text-xl transition shrink-0 cursor-pointer shadow-sm"
          aria-label="Increase harvest quantity"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Helper text & presets */}
      <div className="flex items-center justify-between gap-1 text-xs pt-0.5">
        <span className="text-gray-500">
          {unit === 'quintal'
            ? `= ${Math.round(quantityQuintals * 100).toLocaleString('en-IN')} kg`
            : `= ${(quantityQuintals).toFixed(1)} qtl`}
        </span>

        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 text-[11px]">{t.presetLabel}</span>
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChangeQuantity(p)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border transition cursor-pointer ${
                quantityQuintals === p
                  ? 'bg-[#1b5e20] text-white border-[#1b5e20]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {p}q
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
