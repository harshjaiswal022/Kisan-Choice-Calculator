import React from 'react';
import { Warehouse, Calendar, Clock } from 'lucide-react';
import { StorageDuration, Language } from '../types';
import { TRANSLATIONS } from '../data/marketData';

interface StorageControlsProps {
  willingToStore: boolean;
  onToggleWillingToStore: (val: boolean) => void;
  storageDays: StorageDuration;
  onSelectStorageDays: (days: StorageDuration) => void;
  language: Language;
}

export const StorageControls: React.FC<StorageControlsProps> = ({
  willingToStore,
  onToggleWillingToStore,
  storageDays,
  onSelectStorageDays,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const durationOptions: { days: StorageDuration; labelEn: string; labelHi: string }[] = [
    { days: 3, labelEn: '3 Days', labelHi: '३ दिन' },
    { days: 7, labelEn: '7 Days (1 Wk)', labelHi: '७ दिन (१ हफ्ता)' },
    { days: 14, labelEn: '14 Days (2 Wk)', labelHi: '१४ दिन (२ हफ्ते)' },
  ];

  return (
    <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
      {/* Willing to Store Toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Warehouse className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 leading-tight">
              {t.storageToggleLabel}
            </div>
            <div className="text-xs text-gray-500">
              {willingToStore ? t.storageEnabled : t.storageDisabled}
            </div>
          </div>
        </div>

        <button
          type="button"
          id="willing-to-store-toggle"
          role="switch"
          aria-checked={willingToStore}
          onClick={() => onToggleWillingToStore(!willingToStore)}
          className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2e7d32] ${
            willingToStore ? 'bg-[#2e7d32]' : 'bg-gray-300'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              willingToStore ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Smoothly animated / displayed Duration Dropdown / Chips when Willing */}
      {willingToStore && (
        <div className="pt-2 border-t border-gray-100 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              {t.storageDurationLabel}
            </span>
            <span className="text-[11px] text-gray-500">
              {language === 'en' ? 'Godown rent: ~₹4-6/qtl/day' : 'गोदाम भाड़ा: ~₹४-६/क्वि./दिन'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {durationOptions.map((opt) => {
              const isSelected = storageDays === opt.days;
              return (
                <button
                  key={opt.days}
                  type="button"
                  id={`storage-days-${opt.days}`}
                  onClick={() => onSelectStorageDays(opt.days)}
                  className={`py-2 px-2 text-xs rounded-xl font-bold border transition cursor-pointer min-h-[44px] flex items-center justify-center gap-1 active:scale-95 ${
                    isSelected
                      ? 'border-[#2e7d32] bg-[#e8f5e9] text-[#1b5e20] shadow-xs ring-1 ring-[#2e7d32]/30'
                      : 'border-gray-200 bg-gray-50 hover:bg-white text-gray-700'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{language === 'en' ? opt.labelEn : opt.labelHi}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
