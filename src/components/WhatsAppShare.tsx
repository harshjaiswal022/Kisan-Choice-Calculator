import React from 'react';
import { Share2, MessageCircle, Copy, Check } from 'lucide-react';
import { CalculationResult, Language } from '../types';
import { CROPS, TRANSLATIONS } from '../data/marketData';

interface WhatsAppShareProps {
  result: CalculationResult;
  language: Language;
}

export const WhatsAppShare: React.FC<WhatsAppShareProps> = ({ result, language }) => {
  const [copied, setCopied] = React.useState(false);
  const t = TRANSLATIONS[language];
  const { options, recommendation, inputs } = result;
  const crop = CROPS.find((c) => c.id === inputs.cropId) || CROPS[0];
  const cropName = language === 'en' ? crop.nameEn : crop.nameHi;

  const bestOpt = recommendation.bestOption;
  const extra = recommendation.extraProfitVsRunnerUp;

  // Build bilingual clean message text
  const generateShareText = () => {
    if (language === 'hi') {
      return `🌾 *किसान चॉइस कैलकुलेटर (Kisan Choice Calculator)*
📊 *फसल बिक्री हिसाब रिपोर्ट*

• *फसल:* ${crop.emoji} ${cropName}
• *मात्रा:* ${inputs.quantityQuintals} क्विंटल (${inputs.quantityQuintals * 100} किलो)
• *क्वालिटी:* ${inputs.quality === 'good' ? 'उत्तम' : inputs.quality === 'average' ? 'मध्यम' : 'कमजोर'}

🏆 *सर्वोत्तम फैसला:* ${bestOpt.titleHi}
💰 *हाथ में शुद्ध रकम:* ₹${bestOpt.netIncome.toLocaleString('en-IN')}
${extra > 0 ? `✨ *अतिरिक्त शुद्ध लाभ:* +₹${extra.toLocaleString('en-IN')} (अन्य विकल्प से अधिक)\n` : ''}
📋 *तीनों विकल्पों की तुलना:*
1️⃣ ${options[0].titleHi} 👉 ₹${options[0].netIncome.toLocaleString('en-IN')} (सर्वश्रेष्ठ)
2️⃣ ${options[1].titleHi} 👉 ₹${options[1].netIncome.toLocaleString('en-IN')}
3️⃣ ${options[2].titleHi} 👉 ₹${options[2].netIncome.toLocaleString('en-IN')}

💡 *सलाह:* ${recommendation.bulletsHi[0]}

_जांचें और हिसाब निकालें: Kisan Choice Calculator_`;
    }

    return `🌾 *Kisan Choice Calculator - Post-Harvest Decision Report*
📊 *Harvest Sale Analysis*

• *Crop:* ${crop.emoji} ${cropName}
• *Quantity:* ${inputs.quantityQuintals} quintals (${inputs.quantityQuintals * 100} kg)
• *Quality:* ${inputs.quality.toUpperCase()}

🏆 *Recommended Strategy:* ${bestOpt.titleEn}
💰 *Net Cash in Hand:* ₹${bestOpt.netIncome.toLocaleString('en-IN')}
${extra > 0 ? `✨ *Extra Profit:* +₹${extra.toLocaleString('en-IN')} vs second best choice\n` : ''}
📋 *Ranked Comparison:*
1️⃣ ${options[0].titleEn} ➔ ₹${options[0].netIncome.toLocaleString('en-IN')} (Best)
2️⃣ ${options[1].titleEn} ➔ ₹${options[1].netIncome.toLocaleString('en-IN')}
3️⃣ ${options[2].titleEn} ➔ ₹${options[2].netIncome.toLocaleString('en-IN')}

💡 *Key Reason:* ${recommendation.bulletsEn[0]}

_Calculated with Kisan Choice Calculator_`;
  };

  const handleWhatsAppShare = () => {
    const text = generateShareText();
    const encoded = encodeURIComponent(text);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    try {
      const text = generateShareText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-2 pt-2">
      <button
        type="button"
        id="share-whatsapp-btn"
        onClick={handleWhatsAppShare}
        className="w-full h-13 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md transition cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span>{t.shareWhatsApp}</span>
      </button>

      <button
        type="button"
        id="copy-summary-btn"
        onClick={handleCopy}
        className="w-full py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-bold">
              {language === 'en' ? 'Summary Copied to Clipboard!' : 'हिसाब कॉपी हो गया!'}
            </span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-gray-500" />
            <span>
              {language === 'en' ? 'Copy Text Summary' : 'हिसाब का टेक्स्ट कॉपी करें'}
            </span>
          </>
        )}
      </button>
    </div>
  );
};
