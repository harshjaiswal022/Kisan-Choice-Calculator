import React from 'react';
import { Truck, MapPin, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Language, CropId } from '../types';
import { MANDIS, CROPS, FREIGHT_CONFIG, TRANSLATIONS } from '../data/marketData';

interface LocationTransportControlsProps {
  cropId: CropId;
  localMandiId: string;
  onSelectLocalMandi: (id: string) => void;
  districtMandiId: string;
  onSelectDistrictMandi: (id: string) => void;
  canTransport: boolean;
  onToggleTransport: (val: boolean) => void;
  distanceKm: number;
  onChangeDistance: (km: number) => void;
  customLocalPrice?: number;
  onChangeCustomLocalPrice: (val?: number) => void;
  customDistrictPrice?: number;
  onChangeCustomDistrictPrice: (val?: number) => void;
  language: Language;
}

export const LocationTransportControls: React.FC<LocationTransportControlsProps> = ({
  cropId,
  localMandiId,
  onSelectLocalMandi,
  districtMandiId,
  onSelectDistrictMandi,
  canTransport,
  onToggleTransport,
  distanceKm,
  onChangeDistance,
  customLocalPrice,
  onChangeCustomLocalPrice,
  customDistrictPrice,
  onChangeCustomDistrictPrice,
  language,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const t = TRANSLATIONS[language];
  const crop = CROPS.find((c) => c.id === cropId) || CROPS[0];

  const localMandis = MANDIS.filter((m) => m.isLocal);
  const districtMandis = MANDIS.filter((m) => !m.isLocal);

  const selectedDistrictMandi = MANDIS.find((m) => m.id === districtMandiId) || districtMandis[0];

  const activeLocalPrice = customLocalPrice ?? crop.defaultLocalPrice;
  const activeDistrictPrice = customDistrictPrice ?? crop.defaultDistrictPrice;

  return (
    <div className="space-y-3 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
      {/* Local Mandi Dropdown */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
          <span>{t.localMandiLabel}</span>
        </label>
        <div className="relative">
          <select
            id="local-mandi-select"
            value={localMandiId}
            onChange={(e) => onSelectLocalMandi(e.target.value)}
            className="w-full h-11 px-3 pr-8 rounded-xl border border-gray-300 bg-gray-50 text-sm font-semibold text-gray-800 focus:bg-white focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] outline-none appearance-none cursor-pointer"
          >
            {localMandis.map((m) => (
              <option key={m.id} value={m.id}>
                {language === 'en' ? `${m.nameEn} (~${m.distanceKm} km)` : `${m.nameHi} (~${m.distanceKm} किमी)`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Transport Toggle */}
      <div className="pt-1 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800 leading-tight">
              {t.transportToggleLabel}
            </div>
            <div className="text-xs text-gray-500">
              {canTransport ? t.transportEnabled : t.transportDisabled}
            </div>
          </div>
        </div>

        <button
          type="button"
          id="transport-available-toggle"
          role="switch"
          aria-checked={canTransport}
          onClick={() => onToggleTransport(!canTransport)}
          className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2e7d32] ${
            canTransport ? 'bg-[#2e7d32]' : 'bg-gray-300'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              canTransport ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* District Mandi Selector & Distance (active when Transport allowed) */}
      {canTransport && (
        <div className="space-y-2 pt-1 border-t border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-700" />
              <span>{t.districtMandiLabel}</span>
            </label>
            <div className="relative">
              <select
                id="district-mandi-select"
                value={districtMandiId}
                onChange={(e) => {
                  const mandi = districtMandis.find((m) => m.id === e.target.value);
                  onSelectDistrictMandi(e.target.value);
                  if (mandi) onChangeDistance(mandi.distanceKm);
                }}
                className="w-full h-11 px-3 pr-8 rounded-xl border border-gray-300 bg-gray-50 text-sm font-semibold text-gray-800 focus:bg-white focus:border-[#2e7d32] focus:ring-1 focus:ring-[#2e7d32] outline-none appearance-none cursor-pointer"
              >
                {districtMandis.map((m) => (
                  <option key={m.id} value={m.id}>
                    {language === 'en'
                      ? `${m.nameEn} (${m.districtEn}) - ${m.distanceKm} km`
                      : `${m.nameHi} (${m.districtHi}) - ${m.distanceKm} किमी`}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Distance Slider & Preview */}
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <span>{t.distanceLabel}:</span>
              <span className="text-[#1b5e20] font-bold text-sm">{distanceKm} km</span>
            </div>
            <input
              type="range"
              id="transport-distance-slider"
              min="10"
              max="150"
              step="2"
              value={distanceKm}
              onChange={(e) => onChangeDistance(parseInt(e.target.value, 10))}
              className="w-full accent-[#2e7d32] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-medium">
              <span>10 km</span>
              <span>
                {language === 'en'
                  ? `Freight rate: ₹${FREIGHT_CONFIG.baseFare} base + ₹${FREIGHT_CONFIG.distanceRatePerKm}/km`
                  : `अनुमानित भाड़ा: ₹${FREIGHT_CONFIG.baseFare} मूल + ₹${FREIGHT_CONFIG.distanceRatePerKm}/किमी`}
              </span>
              <span>150 km</span>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Price Customization Toggle */}
      <div className="pt-1">
        <button
          type="button"
          id="custom-prices-toggle-btn"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full py-1.5 px-2 flex items-center justify-between text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <span>
              {language === 'en'
                ? 'Adjust live mandi rates (₹/quintal)'
                : 'मंडी भाव खुद बदलें (₹/क्विंटल)'}
            </span>
          </span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-100 animate-fadeIn">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                {t.localPriceLabel}
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="custom-local-price-input"
                  value={activeLocalPrice}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    onChangeCustomLocalPrice(isNaN(v) ? undefined : v);
                  }}
                  className="w-full h-10 pl-6 pr-2 rounded-lg border border-gray-300 text-xs font-bold text-gray-800 focus:border-[#2e7d32] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                {t.districtPriceLabel}
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  ₹
                </span>
                <input
                  type="number"
                  id="custom-district-price-input"
                  value={activeDistrictPrice}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    onChangeCustomDistrictPrice(isNaN(v) ? undefined : v);
                  }}
                  className="w-full h-10 pl-6 pr-2 rounded-lg border border-gray-300 text-xs font-bold text-gray-800 focus:border-[#2e7d32] outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
