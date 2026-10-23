import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, User, Package, ShieldCheck } from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';

interface DistributeBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  centre: AnganwadiCentre;
  onSubmitDistribution: (data: {
    beneficiary: string;
    category: string;
    items: Record<string, number>;
  }) => Promise<void>;
  language: 'gu' | 'en';
}

export const DistributeBeneficiaryModal: React.FC<DistributeBeneficiaryModalProps> = ({
  isOpen,
  onClose,
  centre,
  onSubmitDistribution,
  language,
}) => {
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [category, setCategory] = useState('Pregnant Mother (Matru Shakti)');
  const [balShaktiQty, setBalShaktiQty] = useState('0');
  const [matruShaktiQty, setMatruShaktiQty] = useState('2');
  const [purnaShaktiQty, setPurnaShaktiQty] = useState('0');
  const [riceQty, setRiceQty] = useState('0');
  const [attaQty, setAttaQty] = useState('0');
  const [dalQty, setDalQty] = useState('0');
  const [oilQty, setOilQty] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beneficiaryName.trim()) return;

    const items: Record<string, number> = {};
    if (Number(balShaktiQty) > 0) items['bal_shakti'] = Number(balShaktiQty);
    if (Number(matruShaktiQty) > 0) items['matru_shakti'] = Number(matruShaktiQty);
    if (Number(purnaShaktiQty) > 0) items['purna_shakti'] = Number(purnaShaktiQty);
    if (Number(riceQty) > 0) items['rice'] = Number(riceQty);
    if (Number(attaQty) > 0) items['atta'] = Number(attaQty);
    if (Number(dalQty) > 0) items['dal'] = Number(dalQty);
    if (Number(oilQty) > 0) items['oil'] = Number(oilQty);

    if (Object.keys(items).length === 0) {
      alert(language === 'gu' ? 'કૃપા કરીને વિતરણ માટે ઓછામાં ઓછી એક સામગ્રી પસંદ કરો.' : 'Please specify at least one commodity quantity to distribute.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmitDistribution({
        beneficiary: beneficiaryName.trim(),
        category,
        items,
      });
      setBeneficiaryName('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                {language === 'gu' ? 'લાભાર્થીને સામગ્રી વિતરણ નોંધણી' : 'Distribute to Beneficiary'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'gu' ? centre.nameGu : centre.nameEn} ·{' '}
                {language === 'gu' ? 'સામગ્રી સોંપણી ફોર્મ' : 'Handover Form'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {language === 'gu' ? 'લાભાર્થી / વ્યક્તિનું પૂરું નામ *' : "Person / Beneficiary Full Name *"}
            </label>
            <input
              type="text"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              placeholder={language === 'gu' ? 'દા.ત. શ્રીમતી વર્ષાબેન સોલંકી' : 'e.g. Smt. Varshaben Solanki'}
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {language === 'gu' ? 'લાભાર્થી શ્રેણી' : 'Beneficiary Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white font-medium"
            >
              <option value="Pregnant Mother (Matru Shakti)">
                {language === 'gu'
                  ? 'સગર્ભા માતા (માતૃ શક્તિ)'
                  : 'Pregnant Mother (સગર્ભા માતા - Matru Shakti)'}
              </option>
              <option value="Lactating Mother (Matru Shakti)">
                {language === 'gu'
                  ? 'ધાત્રી માતા (માતૃ શક્તિ)'
                  : 'Lactating Mother (ધાત્રી માતા - Matru Shakti)'}
              </option>
              <option value="Infant / Child 6m - 3y (Bal Shakti)">
                {language === 'gu'
                  ? 'બાળક ૬ માસથી ૩ વર્ષ (બાલ શક્તિ)'
                  : 'Infant / Child 6m - 3y (બાળક ૬ માસથી ૩ વર્ષ - Bal Shakti)'}
              </option>
              <option value="Adolescent Girl (Purna Shakti)">
                {language === 'gu'
                  ? 'કિશોરી ૧૧-૧૮ વર્ષ (પૂર્ણા શક્તિ)'
                  : 'Adolescent Girl 11-18y (કિશોરી - Purna Shakti)'}
              </option>
              <option value="Severely Underweight Child (SAM)">
                {language === 'gu'
                  ? 'અતિ કુપોષિત બાળક (વિશેષ સંભાળ)'
                  : 'Underweight Child (અતિ કુપોષિત બાળક - Special Care)'}
              </option>
            </select>
          </div>

          {/* Commodities Breakdown Inputs */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              {language === 'gu'
                ? 'સોંપવામાં આવેલી સામગ્રી અને જથ્થો દાખલ કરો:'
                : 'Select Commodities & Quantities Handed Over:'}
            </label>
            <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1">
              <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-700 block">
                  {language === 'gu' ? 'માતૃ શક્તિ THR (પેકેટ્સ)' : 'Matru Shakti THR (pkts)'}
                </span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={matruShaktiQty}
                  onChange={(e) => setMatruShaktiQty(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-700 block">
                  {language === 'gu' ? 'બાલ શક્તિ THR (પેકેટ્સ)' : 'Bal Shakti THR (pkts)'}
                </span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={balShaktiQty}
                  onChange={(e) => setBalShaktiQty(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-700 block">
                  {language === 'gu' ? 'પૂર્ણા શક્તિ THR (પેકેટ્સ)' : 'Purna Shakti THR (pkts)'}
                </span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={purnaShaktiQty}
                  onChange={(e) => setPurnaShaktiQty(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-700 block">
                  {language === 'gu' ? 'ફોર્ટિફાઇડ ખાદ્ય તેલ (લિટર)' : 'Fortified Edible Oil (L)'}
                </span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={oilQty}
                  onChange={(e) => setOilQty(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-700 block">
                  {language === 'gu' ? 'ફોર્ટિફાઇડ ચોખા (કિગ્રા)' : 'Fortified Rice (kg)'}
                </span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={riceQty}
                  onChange={(e) => setRiceQty(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>

              <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50">
                <span className="text-[11px] font-bold text-slate-700 block">
                  {language === 'gu' ? 'ઘઉંનો લોટ (કિગ્રા)' : 'Wheat Atta (kg)'}
                </span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={attaQty}
                  onChange={(e) => setAttaQty(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {language === 'gu'
                ? 'આ વિતરણથી આંગણવાડી સ્ટોકમાંથી જથ્થો આપમેળે કપાશે અને કાર્યકર એપમાં તરત પ્રતિબિંબિત થશે.'
                : 'This distribution will immediately deduct stock from the Anganwadi pantry inventory and synchronize with the worker mobile app.'}
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              {language === 'gu' ? 'રદ કરો' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B6E4F] hover:bg-[#074D37] text-white shadow-md shadow-emerald-900/15"
            >
              {isSubmitting
                ? language === 'gu'
                  ? 'સિંક થઈ રહ્યું છે...'
                  : 'Syncing to RTDB...'
                : language === 'gu'
                ? 'સામગ્રી સોંપણી પુષ્ટિ કરો'
                : 'Confirm Handover & Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
