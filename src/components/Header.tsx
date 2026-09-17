import React from 'react';
import { Languages, RotateCcw, Sprout } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/marketData';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onReset,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="bg-[#1b5e20] text-white px-4 py-3.5 shadow-md sticky top-0 z-40">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 border border-white/20 shadow-inner">
            <Sprout className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white leading-tight">
              {t.appTitle}
            </h1>
            <p className="text-[11px] text-emerald-100/90 font-medium line-clamp-1">
              {t.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onToggleLanguage}
            id="language-toggle-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold border border-emerald-400/40 shadow-sm transition active:scale-95 cursor-pointer min-h-[36px]"
            title="Toggle Language / भाषा बदलें"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-200" />
            <span>{t.languagePill}</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            id="reset-inputs-btn"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition active:scale-95 cursor-pointer"
            title="Reset form to defaults"
          >
            <RotateCcw className="w-4 h-4 text-emerald-100" />
          </button>
        </div>
      </div>
    </header>
  );
};
