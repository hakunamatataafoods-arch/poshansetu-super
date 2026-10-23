import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Truck,
  Calendar,
  Building,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { AnganwadiCentre, InventoryStock } from '../types/poshan';

interface LiveStockTabProps {
  currentCentre: AnganwadiCentre;
  inventory: InventoryStock;
  onOpenInwardModal: () => void;
  language: 'gu' | 'en';
}

export const LiveStockTab: React.FC<LiveStockTabProps> = ({
  currentCentre,
  inventory,
  onOpenInwardModal,
  language,
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'GRAINS' | 'PULSES' | 'OIL' | 'THR'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 7 Commodities model matching Screenshot 2 with bilingual labels
  const stockItems = [
    {
      id: 'rice',
      nameEn: 'Fortified Rice',
      nameGu: 'ફોર્ટિફાઇડ ચોખા',
      batch: 'RIC-VAD-26-44',
      quantity: inventory.rice,
      unitEn: 'kg',
      unitGu: 'કિગ્રા',
      dailyUsageEn: '3.5 kg/day',
      dailyUsageGu: '૩.૫ કિગ્રા/દિવસ',
      threshold: 15,
      thresholdLabelEn: '15 kg',
      thresholdLabelGu: '૧૫ કિગ્રા',
      category: 'GRAINS',
      estimatedDays: Math.max(1, Math.round(inventory.rice / 3.5)) || 4,
      accentColor: 'from-amber-500 to-orange-500',
    },
    {
      id: 'atta',
      nameEn: 'Wheat Atta (Wheat Flour)',
      nameGu: 'ઘઉંનો લોટ (આટો)',
      batch: 'GSCSC-ATTA-24-A08',
      quantity: inventory.atta,
      unitEn: 'kg',
      unitGu: 'કિગ્રા',
      dailyUsageEn: '2.5 kg/day',
      dailyUsageGu: '૨.૫ કિગ્રા/દિવસ',
      threshold: 12,
      thresholdLabelEn: '12 kg',
      thresholdLabelGu: '૧૨ કિગ્રા',
      category: 'GRAINS',
      estimatedDays: Math.max(1, Math.round(inventory.atta / 2.5)) || 2,
      accentColor: 'from-yellow-500 to-amber-600',
    },
    {
      id: 'oil',
      nameEn: 'Fortified Edible Oil',
      nameGu: 'ફોર્ટિફાઇડ ખાદ્ય તેલ',
      batch: 'OIL-GUJ-24-99',
      quantity: inventory.oil,
      unitEn: 'liter',
      unitGu: 'લિટર',
      dailyUsageEn: '0.8 liter/day',
      dailyUsageGu: '૦.૮ લિટર/દિવસ',
      threshold: 5,
      thresholdLabelEn: '5 liter',
      thresholdLabelGu: '૫ લિટર',
      category: 'OIL',
      estimatedDays: Math.max(1, Math.round(inventory.oil / 0.8)) || 6,
      accentColor: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'dal',
      nameEn: 'Tuver Dal (Split Pigeon Pea)',
      nameGu: 'તુવેર દાળ',
      batch: 'DAL-TUVER-24-41',
      quantity: inventory.dal,
      unitEn: 'kg',
      unitGu: 'કિગ્રા',
      dailyUsageEn: '1.8 kg/day',
      dailyUsageGu: '૧.૮ કિગ્રા/દિવસ',
      threshold: 8,
      thresholdLabelEn: '8 kg',
      thresholdLabelGu: '૮ કિગ્રા',
      category: 'PULSES',
      estimatedDays: Math.max(1, Math.round(inventory.dal / 1.8)) || 2,
      accentColor: 'from-orange-500 to-red-500',
    },
    {
      id: 'bal_shakti',
      nameEn: 'Bal Shakti THR (6m - 3y)',
      nameGu: 'બાલ શક્તિ THR (૬ માસ - ૩ વર્ષ)',
      batch: 'CH-2026-921',
      quantity: inventory.bal_shakti,
      unitEn: 'packets',
      unitGu: 'પેકેટ્સ',
      dailyUsageEn: '4 packets/day',
      dailyUsageGu: '૪ પેકેટ્સ/દિવસ',
      threshold: 20,
      thresholdLabelEn: '20 packets',
      thresholdLabelGu: '૨૦ પેકેટ્સ',
      category: 'THR',
      estimatedDays: Math.max(1, Math.round(inventory.bal_shakti / 4)) || 12,
      accentColor: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'matru_shakti',
      nameEn: 'Matru Shakti THR (Pregnant/Lactating)',
      nameGu: 'માતૃ શક્તિ THR (ધાત્રી/સગર્ભા માતા)',
      batch: 'AMUL-MS-OCT26-84',
      quantity: inventory.matru_shakti,
      unitEn: 'packets',
      unitGu: 'પેકેટ્સ',
      dailyUsageEn: '2 packets/day',
      dailyUsageGu: '૨ પેકેટ્સ/દિવસ',
      threshold: 10,
      thresholdLabelEn: '10 packets',
      thresholdLabelGu: '૧૦ પેકેટ્સ',
      category: 'THR',
      estimatedDays: Math.max(1, Math.round(inventory.matru_shakti / 2)) || 2,
      accentColor: 'from-pink-500 to-rose-600',
    },
    {
      id: 'purna_shakti',
      nameEn: 'Purna Shakti THR (Adolescent Girls)',
      nameGu: 'પૂર્ણા શક્તિ THR (કિશોરીઓ)',
      batch: 'AMUL-PS-OCT26-02',
      quantity: inventory.purna_shakti,
      unitEn: 'packets',
      unitGu: 'પેકેટ્સ',
      dailyUsageEn: '2 packets/day',
      dailyUsageGu: '૨ પેકેટ્સ/દિવસ',
      threshold: 10,
      thresholdLabelEn: '10 packets',
      thresholdLabelGu: '૧૦ પેકેટ્સ',
      category: 'THR',
      estimatedDays: Math.max(1, Math.round(inventory.purna_shakti / 2)) || 2,
      accentColor: 'from-purple-500 to-violet-600',
    },
  ];

  // Filtering
  const filteredStock = useMemo(() => {
    return stockItems.filter((item) => {
      if (activeCategory !== 'ALL' && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.nameEn.toLowerCase().includes(q) ||
          item.nameGu.toLowerCase().includes(q) ||
          item.batch.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, searchQuery, stockItems]);

  const challans = [
    {
      challanNo: 'INW-2026-1044',
      truckNo: 'Truck: GJ-23-AX-4819',
      supplierEn: 'District Food & Civil Supplies Godown, Anand',
      supplierGu: 'જિલ્લા પુરવઠા અને ગોડાઉન વિભાગ, આણંદ',
      receiverEn: 'Recv: Smt. BhavnaBen Patel (AWW)',
      receiverGu: 'સ્વીકારનાર: શ્રીમતી ભાવનાબેન પટેલ',
      arrivalDate: '18-Oct-2026',
      itemsEn: 'Fortified Rice: 5 kg',
      itemsGu: 'ફોર્ટિફાઇડ ચોખા: ૫ કિગ્રા',
      batchExpiry: 'RIC-VAD-26-44 (Exp: 12-2027)',
      statusEn: 'Supervisor Verified',
      statusGu: 'સુપરવાઇઝર ચકાસાયેલ',
    },
    {
      challanNo: 'CH-2345',
      truckNo: 'Truck: GJ-23-AX-4819',
      supplierEn: 'GSCSC District Godown, Anand',
      supplierGu: 'GSCSC જિલ્લો ગોડાઉન, આણંદ',
      receiverEn: 'Recv: Smt. BhavnaBen Patel (AWW)',
      receiverGu: 'સ્વીકારનાર: શ્રીમતી ભાવનાબેન પટેલ',
      arrivalDate: '2026-10-18',
      itemsEn: 'Nutritious Commodity Ration: 50 packets',
      itemsGu: 'પૌષ્ટિક અનાજ રાશન: ૫૦ પેકેટ્સ',
      batchExpiry: 'GSCSC-GEN (Exp: 2027-06-30)',
      statusEn: 'Supervisor Verified',
      statusGu: 'સુપરવાઇઝર ચકાસાયેલ',
    },
    {
      challanNo: 'CH-9133',
      truckNo: 'Truck: GJ-23-AX-4819',
      supplierEn: 'GSCSC District Godown, Anand',
      supplierGu: 'GSCSC જિલ્લો ગોડાઉન, આણંદ',
      receiverEn: 'Recv: Smt. BhavnaBen Patel (AWW)',
      receiverGu: 'સ્વીકારનાર: શ્રીમતી ભાવનાબેન પટેલ',
      arrivalDate: '2026-10-17',
      itemsEn: 'Nutritious Commodity Ration: 50 packets',
      itemsGu: 'પૌષ્ટિક અનાજ રાશન: ૫૦ પેકેટ્સ',
      batchExpiry: 'GSCSC-GEN (Exp: 2027-06-30)',
      statusEn: 'Supervisor Verified',
      statusGu: 'સુપરવાઇઝર ચકાસાયેલ',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Card: Warehouse & Pantry Balance with Colorful Accent */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white via-emerald-50/20 to-white">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase">
              {currentCentre.code || 'GJ-AND-VAD-04'}
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {language === 'gu' ? currentCentre.nameGu : currentCentre.nameEn} ·{' '}
              {language === 'gu' ? 'ગોડાઉન અને પેન્ટ્રી સ્ટોક બેલેન્સ' : 'Warehouse & Pantry Balance'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'gu'
              ? `રીઅલ-ટાઇમ સામગ્રી સ્ટોક, વપરાશ અને મુદત ટ્રેકિંગ · કાર્યકર: ${currentCentre.workerName}`
              : `Real-time commodity levels, consumption burn-rate, and expiry tracking · AWW: ${currentCentre.workerName}`}
          </p>
        </div>

        <button
          onClick={onOpenInwardModal}
          className="bg-gradient-to-r from-[#0B6E4F] to-[#074D37] hover:from-[#074D37] hover:to-[#043324] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/15 shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'gu' ? '+ સ્ટોક ચલાન આવક નોંધો' : '+ Log Inward Challan'}</span>
        </button>
      </div>

      {/* 2. Filter Pills and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { key: 'ALL', labelEn: 'All Items', labelGu: 'બધી વસ્તુઓ' },
              { key: 'GRAINS', labelEn: 'Grains', labelGu: 'અનાજ' },
              { key: 'PULSES', labelEn: 'Pulses', labelGu: 'કઠોળ' },
              { key: 'OIL', labelEn: 'Oil', labelGu: 'તેલ' },
              { key: 'THR', labelEn: 'THR Packets', labelGu: 'THR પેકેટ્સ' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                activeCategory === tab.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {language === 'gu' ? tab.labelGu : tab.labelEn}
            </button>
          ))}
        </div>

        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'gu' ? 'સામગ્રી અથવા બેચ શોધો...' : 'Search stock item...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      {/* 3. Commodity Stock Cards Grid with Colorful Accents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStock.map((item) => {
          const isLow = item.quantity < item.threshold;
          return (
            <div
              key={item.id}
              className={`relative overflow-hidden bg-white rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md ${
                isLow ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200/90'
              }`}
            >
              {/* Colorful Top Accent Stripe */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.accentColor}`}
              />

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {language === 'gu' ? item.nameGu : item.nameEn}
                  </h3>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Batch: {item.batch}
                  </div>
                </div>
                {isLow ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-red-300 bg-red-50 text-red-700 text-[10px] font-black shrink-0">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    {language === 'gu' ? 'ઓછો સ્ટોક' : 'Low Stock'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-black shrink-0">
                    {language === 'gu' ? 'પૂરતો સ્ટોક' : 'Adequate'}
                  </span>
                )}
              </div>

              {/* Quantity display with bold typography */}
              <div className="mt-3.5 flex items-baseline justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-900 tracking-tight font-mono">
                    {item.quantity}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {language === 'gu' ? item.unitGu : item.unitEn}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                  ~{item.estimatedDays} {language === 'gu' ? 'દિવસ બાકી' : 'days left'}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2.5 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isLow
                      ? 'bg-gradient-to-r from-red-500 to-rose-600'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                  }`}
                  style={{
                    width: `${Math.min(100, Math.max(10, (item.quantity / (item.threshold * 2)) * 100))}%`,
                  }}
                />
              </div>

              {/* Daily usage and threshold */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div>
                  {language === 'gu' ? 'દૈનિક વપરાશ:' : 'Daily Usage:'}{' '}
                  <span className="font-bold text-slate-800">
                    {language === 'gu' ? item.dailyUsageGu : item.dailyUsageEn}
                  </span>
                </div>
                <div>
                  {language === 'gu' ? 'મર્યાદા:' : 'Threshold:'}{' '}
                  <span className="font-bold text-slate-800">
                    {language === 'gu' ? item.thresholdLabelGu : item.thresholdLabelEn}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Recent Government Challans Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
              {language === 'gu'
                ? 'તાજેતરના સરકારી ચલાન (GSCSC ગોડાઉન આવક)'
                : 'Recent Government Challans (GSCSC Godown)'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'gu'
                ? 'ભૌતિક રસીદો, ટ્રક ડિલિવરી નંબર અને એક્સપાયરી પાલન ચકાસણી'
                : 'Physical receipts, truck delivery numbers and expiry compliance verification'}
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {language === 'gu' ? '૭૪ ચલાન ઓડિટ થયેલ' : '74 Challans Audited'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">{language === 'gu' ? 'ચલાન નંબર' : 'Challan #'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'પુરવઠો ગોડાઉન' : 'Supplier Godown'}</th>
                <th className="py-3 px-3">{language === 'gu' ? 'આગમન તારીખ' : 'Arrival Date'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'સામગ્રી અને જથ્થો' : 'Items & Quantities'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'બેચ અને મુદત' : 'Batch & Expiry'}</th>
                <th className="py-3 px-4 text-center">{language === 'gu' ? 'ઓડિટ સ્થિતિ' : 'Audit Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {challans.map((ch, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">{ch.challanNo}</span>
                        <span className="text-[10px] text-slate-400 block">{ch.truckNo}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">
                      {language === 'gu' ? ch.supplierGu : ch.supplierEn}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {language === 'gu' ? ch.receiverGu : ch.receiverEn}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700 whitespace-nowrap">
                    {ch.arrivalDate}
                  </td>
                  <td className="py-3.5 px-4 font-black text-emerald-800">
                    {language === 'gu' ? ch.itemsGu : ch.itemsEn}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-[11px] font-mono">
                    {ch.batchExpiry}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-bold shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {language === 'gu' ? ch.statusGu : ch.statusEn}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
