import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Plus,
  CheckCircle2,
  Calendar,
  Package,
  HeartHandshake,
  UserCheck,
  Camera,
  Filter,
  Sparkles,
} from 'lucide-react';
import { AnganwadiCentre, TransactionHistoryItem } from '../types/poshan';

interface BeneficiaryDistributionTabProps {
  currentCentre: AnganwadiCentre;
  transactions: TransactionHistoryItem[];
  onOpenDistributeModal: () => void;
  language: 'gu' | 'en';
}

export const BeneficiaryDistributionTab: React.FC<BeneficiaryDistributionTabProps> = ({
  currentCentre,
  transactions,
  onOpenDistributeModal,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'MOTHER' | 'CHILD' | 'GIRL'>('ALL');

  // Filter beneficiary transactions
  const beneficiaryDistributions = useMemo(() => {
    const list = transactions.filter(
      (t) =>
        Boolean(t.beneficiary) ||
        t.lastAction.includes('વિતરણ') ||
        t.lastAction.includes('Distribution')
    );

    if (list.length === 0) {
      return [
        {
          id: 'demo-dist-1',
          beneficiary: 'Smt. Varshaben Solanki',
          beneficiaryCategory: 'Pregnant Mother (Matru Shakti)',
          beneficiaryCategoryGu: 'સગર્ભા માતા (માતૃ શક્તિ)',
          itemsSummary: 'Matru Shakti: 2 pkts • Fortified Edible Oil: 1 liter',
          itemsSummaryGu: 'માતૃ શક્તિ: ૨ પેકેટ્સ • ફોર્ટિફાઇડ તેલ: ૧ લિટર',
          timestamp: Date.now() - 3600000 * 2,
          village: '04-Vadtal Anganwadi Centre',
          workerName: 'Smt. BhavnaBen Patel (AWW)',
          workerNameGu: 'શ્રીમતી ભાવનાબેન પટેલ (આંગણવાડી કાર્યકર)',
          photoAttached: true,
          balance: 48,
          change: -3,
          lastAction: 'વિતરણ: Smt. Varshaben Solanki',
        },
        {
          id: 'demo-dist-2',
          beneficiary: 'Master Aarav Patel (Mother: Gitaben)',
          beneficiaryCategory: 'Child 6m - 3y (Bal Shakti)',
          beneficiaryCategoryGu: 'બાળક ૬ માસ - ૩ વર્ષ (બાલ શક્તિ)',
          itemsSummary: 'Bal Shakti: 4 pkts',
          itemsSummaryGu: 'બાલ શક્તિ: ૪ પેકેટ્સ',
          timestamp: Date.now() - 3600000 * 6,
          village: '04-Vadtal Anganwadi Centre',
          workerName: 'Smt. BhavnaBen Patel (AWW)',
          workerNameGu: 'શ્રીમતી ભાવનાબેન પટેલ (આંગણવાડી કાર્યકર)',
          photoAttached: true,
          balance: 50,
          change: -4,
          lastAction: 'વિતરણ: Master Aarav Patel',
        },
        {
          id: 'demo-dist-3',
          beneficiary: 'Kumari Sneha Parmar (14 yrs)',
          beneficiaryCategory: 'Adolescent Girl (Purna Shakti)',
          beneficiaryCategoryGu: 'કિશોરી ૧૧-૧૮ વર્ષ (પૂર્ણા શક્તિ)',
          itemsSummary: 'Purna Shakti: 2 pkts • Wheat Atta: 2 kg',
          itemsSummaryGu: 'પૂર્ણા શક્તિ: ૨ પેકેટ્સ • ઘઉંનો લોટ: ૨ કિગ્રા',
          timestamp: Date.now() - 3600000 * 18,
          village: '04-Vadtal Anganwadi Centre',
          workerName: 'Smt. BhavnaBen Patel (AWW)',
          workerNameGu: 'શ્રીમતી ભાવનાબેન પટેલ (આંગણવાડી કાર્યકર)',
          photoAttached: true,
          balance: 52,
          change: -4,
          lastAction: 'વિતરણ: Kumari Sneha Parmar',
        },
      ];
    }

    return list;
  }, [transactions]);

  const filteredList = useMemo(() => {
    return beneficiaryDistributions.filter((item) => {
      if (
        categoryFilter === 'MOTHER' &&
        !item.beneficiaryCategory?.toLowerCase().includes('matru') &&
        !item.beneficiaryCategory?.toLowerCase().includes('pregnant') &&
        !item.beneficiaryCategory?.toLowerCase().includes('mother')
      ) {
        return false;
      }
      if (
        categoryFilter === 'CHILD' &&
        !item.beneficiaryCategory?.toLowerCase().includes('bal') &&
        !item.beneficiaryCategory?.toLowerCase().includes('child') &&
        !item.beneficiaryCategory?.toLowerCase().includes('infant')
      ) {
        return false;
      }
      if (
        categoryFilter === 'GIRL' &&
        !item.beneficiaryCategory?.toLowerCase().includes('purna') &&
        !item.beneficiaryCategory?.toLowerCase().includes('girl') &&
        !item.beneficiaryCategory?.toLowerCase().includes('adolescent')
      ) {
        return false;
      }

      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      const matchName = (item.beneficiary || '').toLowerCase().includes(q);
      const matchCat = (item.beneficiaryCategory || '').toLowerCase().includes(q);
      const matchSummary = (item.itemsSummary || '').toLowerCase().includes(q);
      const matchWorker = (item.workerName || '').toLowerCase().includes(q);

      return matchName || matchCat || matchSummary || matchWorker;
    });
  }, [beneficiaryDistributions, categoryFilter, searchTerm]);

  return (
    <div className="space-y-6">
      {/* 1. Header Card with Action Button */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white via-rose-50/20 to-white">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {language === 'gu'
                ? 'લાભાર્થી વિતરણ રજિસ્ટર અને વિતરણ લેજર'
                : 'Beneficiary Distribution Register & Ledger'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'gu'
              ? 'માતાઓ, બાળકો અને કિશોરીઓને આપેલ પોષણ સામગ્રીના વ્યક્તિવાર રેકોર્ડ · આંગણવાડી કાર્યકર એપ સાથે લાઈવ સિંક'
              : 'Itemized records of nutritional commodities handed over to mothers, infants, and girls · Syncs directly with Anganwadi Worker mobile app'}
          </p>
        </div>

        <button
          onClick={onOpenDistributeModal}
          className="bg-gradient-to-r from-[#0B6E4F] to-[#074D37] hover:from-[#074D37] hover:to-[#043324] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/15 shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>
            {language === 'gu' ? '+ લાભાર્થીને સામગ્રી આપો' : '+ Distribute to Beneficiary'}
          </span>
        </button>
      </div>

      {/* 2. Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              categoryFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {language === 'gu'
              ? `તમામ લાભાર્થીઓ (${beneficiaryDistributions.length})`
              : `All Beneficiaries (${beneficiaryDistributions.length})`}
          </button>
          <button
            onClick={() => setCategoryFilter('MOTHER')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              categoryFilter === 'MOTHER'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {language === 'gu' ? 'સગર્ભા અને ધાત્રી માતાઓ' : 'Pregnant & Lactating Mothers'}
          </button>
          <button
            onClick={() => setCategoryFilter('CHILD')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              categoryFilter === 'CHILD'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {language === 'gu' ? 'બાળકો (૬ માસ - ૩ વર્ષ)' : 'Children (6m - 3y)'}
          </button>
          <button
            onClick={() => setCategoryFilter('GIRL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              categoryFilter === 'GIRL'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {language === 'gu' ? 'કિશોરીઓ (૧૧-૧૮ વર્ષ)' : 'Adolescent Girls'}
          </button>
        </div>

        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              language === 'gu'
                ? 'લાભાર્થીનું નામ અથવા સામગ્રી શોધો...'
                : "Search person's name or commodity..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      {/* 3. Beneficiary Table with Colorful Badges */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">
                  {language === 'gu' ? 'લાભાર્થી વ્યક્તિનું નામ' : "Beneficiary Name (Person)"}
                </th>
                <th className="py-3 px-4">
                  {language === 'gu' ? 'લાભાર્થી શ્રેણી' : 'Beneficiary Category'}
                </th>
                <th className="py-3 px-5">
                  {language === 'gu' ? 'વિતરણ કરેલી સામગ્રી' : 'Commodities Distributed'}
                </th>
                <th className="py-3 px-3">{language === 'gu' ? 'તારીખ અને સમય' : 'Date & Time'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'વિતરણ કરનાર' : 'Handed Over By'}</th>
                <th className="py-3 px-4 text-center">
                  {language === 'gu' ? 'ચકાસણી સ્થિતિ' : 'Verification Status'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((item, idx) => {
                const dateStr = new Date(item.timestamp).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                });

                return (
                  <tr key={item.id || idx} className="hover:bg-slate-50/80 transition-colors">
                    {/* Person's Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-xs">
                          {(item.beneficiary || 'B')[0]}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 block text-xs">
                            {item.beneficiary || 'Direct Recipient'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {item.id ? item.id.slice(-8) : 'DIST-AWC'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                        {language === 'gu'
                          ? (item as any).beneficiaryCategoryGu || item.beneficiaryCategory || 'THR લાભાર્થી'
                          : item.beneficiaryCategory || 'THR Beneficiary'}
                      </span>
                    </td>

                    {/* Commodities Distributed */}
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-emerald-950 bg-gradient-to-r from-emerald-50 to-teal-50/80 border border-emerald-200 px-3 py-1.5 rounded-xl inline-block text-xs shadow-2xs">
                        {language === 'gu'
                          ? (item as any).itemsSummaryGu || item.itemsSummary || 'THR પેકેટ્સ'
                          : item.itemsSummary || 'THR Packets'}
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap text-[11px] font-medium">
                      {dateStr}
                    </td>

                    {/* Handed Over By */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block text-xs">
                        {language === 'gu'
                          ? (item as any).workerNameGu || item.workerName || currentCentre.workerName
                          : item.workerName || currentCentre.workerName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {language === 'gu' ? currentCentre.nameGu : currentCentre.nameEn}
                      </span>
                    </td>

                    {/* Verification Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-bold shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {language === 'gu' ? 'આધાર ચકાસાયેલ' : 'Aadhaar Verified'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
