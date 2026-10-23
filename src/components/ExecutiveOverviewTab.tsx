import React from 'react';
import {
  AlertTriangle,
  Receipt,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ChevronRight,
  MapPin,
  ShieldCheck,
  UtensilsCrossed,
  Sparkles,
  Users,
  Flame,
  Award,
} from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';
import { CENTRES, DashboardData } from '../services/firebaseRtdb';

interface ExecutiveOverviewTabProps {
  currentCentre: AnganwadiCentre;
  dashboardData: DashboardData;
  onNavigateTab: (tabKey: string) => void;
  onSelectCentre: (centre: AnganwadiCentre) => void;
  onInspectMeal: (meal: any) => void;
  language: 'gu' | 'en';
}

export const ExecutiveOverviewTab: React.FC<ExecutiveOverviewTabProps> = ({
  currentCentre,
  dashboardData,
  onNavigateTab,
  onSelectCentre,
  onInspectMeal,
  language,
}) => {
  const { inventory, attendance, mealEntries } = dashboardData;

  // Calculate low stock items count
  const commodities = [
    { nameEn: 'Fortified Rice', nameGu: 'ફોર્ટિફાઇડ ચોખા', qty: inventory.rice, threshold: 15, unitEn: 'kg', unitGu: 'કિગ્રા' },
    { nameEn: 'Wheat Atta (Wheat Flour)', nameGu: 'ઘઉંનો લોટ (આટો)', qty: inventory.atta, threshold: 12, unitEn: 'kg', unitGu: 'કિગ્રા' },
    { nameEn: 'Fortified Edible Oil', nameGu: 'ફોર્ટિફાઇડ તેલ', qty: inventory.oil, threshold: 5, unitEn: 'liter', unitGu: 'લિટર' },
    { nameEn: 'Tuver Dal', nameGu: 'તુવેર દાળ', qty: inventory.dal, threshold: 8, unitEn: 'kg', unitGu: 'કિગ્રા' },
    { nameEn: 'Bal Shakti THR', nameGu: 'બાલ શક્તિ THR', qty: inventory.bal_shakti, threshold: 20, unitEn: 'packets', unitGu: 'પેકેટ્સ' },
    { nameEn: 'Matru Shakti THR', nameGu: 'માતૃ શક્તિ THR', qty: inventory.matru_shakti, threshold: 10, unitEn: 'packets', unitGu: 'પેકેટ્સ' },
    { nameEn: 'Purna Shakti THR', nameGu: 'પૂર્ણા શક્તિ THR', qty: inventory.purna_shakti, threshold: 10, unitEn: 'packets', unitGu: 'પેકેટ્સ' },
  ];

  const lowStockItems = commodities.filter((c) => c.qty < c.threshold);
  const lowStockCount = lowStockItems.length;

  // Active verified hot meal from real-time data or latest entry
  const latestMeal = mealEntries[0] || {
    menuName: 'Paushtik Vegetable Khichdi & Tuver Dal',
    studentsPresent: 39,
    timestamp: 'Today, 12:18 PM',
    confirmedBy: 'Smt. BhavnaBen Patel',
    mealType: 'Hot Cooked Lunch',
    totalGrams: 3200,
  };

  const circleCentres = [
    {
      centre: CENTRES[0] || currentCentre,
      codeEn: '04-Vadtal Anganwadi Centre',
      codeGu: '૦૪-વડતાલ આંગણવાડી કેન્દ્ર',
      isPrimary: true,
      workerEn: 'AWW: Smt. BhavnaBen Patel · +91 98254 12044',
      workerGu: 'કાર્યકર: શ્રીમતી ભાવનાબેન પટેલ · +૯૧ ૯૮૨૫૪ ૧૨૦૪૪',
      attendance: `${attendance.present_count || 39}/${attendance.records.length || 48}`,
      pct: `${Math.round(((attendance.present_count || 39) / (attendance.records.length || 48)) * 100)}%`,
      mealStatus: 'Verified',
      stockAlertCount: lowStockCount || 6,
      pendingBills: 1,
    },
    {
      centre: CENTRES[2] || { ...currentCentre, id: 'awc_mog02', nameEn: '02 – Mogri (Anand)', nameGu: '૦૨ – મોગરી (આણંદ)', code: '02-Mogri' },
      codeEn: '02-Mogri Anganwadi Centre',
      codeGu: '૦૨-મોગરી આંગણવાડી કેન્દ્ર',
      isPrimary: false,
      workerEn: 'AWW: Smt. Kokilaben Vankar · +91 97140 88210',
      workerGu: 'કાર્યકર: શ્રીમતી કોકિલાબેન વણકર · +૯૧ ૯૭૧૪૦ ૮૮૨૧૦',
      attendance: '35/42',
      pct: '83%',
      mealStatus: 'Pending',
      stockAlertCount: 1,
      pendingBills: 0,
    },
    {
      centre: CENTRES[3] || { ...currentCentre, id: 'awc_kar05', nameEn: '03 – Karamsad (Anand)', nameGu: '૦૩ – કરમસદ (આણંદ)', code: '03-Karamsad' },
      codeEn: '03-Karamsad Anganwadi Centre',
      codeGu: '૦૩-કરમસદ આંગણવાડી કેન્દ્ર',
      isPrimary: false,
      workerEn: 'AWW: Smt. Hansaben Solanki · +91 94285 33491',
      workerGu: 'કાર્યકર: શ્રીમતી હંસાબેન સોલંકી · +૯૧ ૯૪૨૮૫ ૩૩૪૯૧',
      attendance: '46/52',
      pct: '88%',
      mealStatus: 'Verified',
      stockAlertCount: 0,
      pendingBills: 0,
    },
    {
      centre: { ...currentCentre, id: 'awc_sam05', nameEn: '05 – Samarkha (Anand)', nameGu: '૦૫ – સામરખા (આણંદ)', code: '05-Samarkha' },
      codeEn: '05-Samarkha Anganwadi Centre',
      codeGu: '૦૫-સામરખા આંગણવાડી કેન્દ્ર',
      isPrimary: false,
      workerEn: 'AWW: Smt. Daxaben Parmar · +91 99042 77150',
      workerGu: 'કાર્યકર: શ્રીમતી દક્ષાબેન પરમાર · +૯૧ ૯૯૦૪૨ ૭૭૧૫૦',
      attendance: '33/40',
      pct: '83%',
      mealStatus: 'Pending',
      stockAlertCount: 2,
      pendingBills: 0,
    },
    {
      centre: CENTRES[1] || { ...currentCentre, id: 'awc_10103', nameEn: '10103 – Kalyan Centre', nameGu: '૧૦૧૦૩ – કલ્યાણ કેન્દ્ર', code: '10103-Kalyan' },
      codeEn: '10103-Kalyan Anganwadi Centre',
      codeGu: '૧૦૧૦૩-કલ્યાણ આંગણવાડી કેન્દ્ર',
      isPrimary: false,
      workerEn: 'AWW: Anita Sharma · +91 98251 44021',
      workerGu: 'કાર્યકર: અનિતા શર્મા · +૯૧ ૯૮૨૫૧ ૪૪૦૨૧',
      attendance: '38/45',
      pct: '84%',
      mealStatus: 'Verified',
      stockAlertCount: 0,
      pendingBills: 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Critical Attention Banner with Vibrant Gradient & Glow */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm backdrop-blur-xs">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-start gap-3.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>
                {language === 'gu'
                  ? `ધ્યાન આપો: ${lowStockCount || 6} સામગ્રીનો સ્ટોક નિર્ણાયક રીતે ઓછો છે`
                  : `Attention Required: ${lowStockCount || 6} commodities critically low in stock`}
              </span>
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs animate-pulse">
                {language === 'gu' ? 'તાત્કાલિક' : 'ACTION REQ'}
              </span>
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {language === 'gu'
                ? `ફોર્ટિફાઇડ ચોખા (${inventory.rice} કિગ્રા), ઘઉંનો લોટ (${inventory.atta} કિગ્રા), તેલ (${inventory.oil} લિટર) + અન્ય ${Math.max(0, lowStockCount - 3)} વસ્તુઓ`
                : `Fortified Rice (${inventory.rice} kg), Wheat Atta (${inventory.atta} kg), Fortified Edible Oil (${inventory.oil} liter) +${Math.max(0, lowStockCount - 3)} more`}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('stock')}
          className="relative z-10 bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-600/25 shrink-0 cursor-pointer active:scale-95"
        >
          <span>{language === 'gu' ? 'લાઈવ સ્ટોક અને ઇનવર્ડ ઓડિટ' : 'Live Stock & Inward Audit'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Four Colorful & Attractive KPI Cards (Replaced children present & meal compliance with Recent Meal Transactions) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: RECENT MEAL DISTRIBUTION TRANSACTION (Special User Highlight) */}
        <div className="relative overflow-hidden rounded-2xl p-4.5 bg-gradient-to-br from-emerald-600 via-[#0B6E4F] to-[#074D37] text-white shadow-lg shadow-emerald-900/15 border border-emerald-400/30 flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                {language === 'gu' ? 'તાજેતરનું ભોજન વિતરણ' : 'RECENT MEAL TRANSACTION'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs text-white flex items-center justify-center shadow-xs">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
            </div>

            <div className="font-extrabold text-sm sm:text-base tracking-tight leading-tight line-clamp-1 text-white">
              {latestMeal.menuName}
            </div>

            <div className="mt-2.5 py-1.5 px-2.5 rounded-lg bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-between text-xs">
              <span className="text-emerald-100 font-semibold">
                {language === 'gu' ? 'પીરસાયેલ બાળકો:' : 'Students Served:'}
              </span>
              <span className="font-black text-amber-300 text-sm flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {latestMeal.studentsPresent}{' '}
                <span className="text-[10px] text-emerald-100 font-normal">
                  {language === 'gu' ? 'હાજર' : 'present'}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-100">
            <span className="truncate max-w-[150px] font-medium">
              📍 {language === 'gu' ? currentCentre.nameGu : currentCentre.nameEn}
            </span>
            <span className="font-mono text-emerald-200 font-bold">
              {typeof latestMeal.timestamp === 'string'
                ? latestMeal.timestamp
                : new Date(latestMeal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Card 2: LIVE MEAL SERVICE TRACKER (At this center) */}
        <div className="relative overflow-hidden rounded-2xl p-4.5 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-900/15 border border-indigo-400/30 flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-100">
                {language === 'gu' ? 'દૈનિક ભોજન સેવા સ્થિતિ' : 'MEAL SERVICE LEDGER'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs text-white flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-300" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black tracking-tight text-white">
                {mealEntries.length ? `${Math.min(3, mealEntries.length)} / 3` : '3 / 3'}
              </span>
              <span className="bg-emerald-400/90 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                {language === 'gu' ? 'ચકાસાયેલ' : 'Verified'}
              </span>
            </div>

            <div className="mt-2 text-xs text-indigo-100 line-clamp-2 leading-snug">
              {language === 'gu'
                ? `${currentCentre.nameGu} ખાતે ગરમ ભોજન અને પૌષ્ટિક નાસ્તો સફળતાપૂર્વક પીરસાયો`
                : `Hot cooked lunch & nutritious morning snack confirmed at ${currentCentre.nameEn}`}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-indigo-200">
            <span>{language === 'gu' ? 'રાંધેલ માત્રા:' : 'Cooked Quantity:'}</span>
            <span className="font-bold text-amber-300">
              {latestMeal.totalGrams ? `${(latestMeal.totalGrams / 1000).toFixed(1)} kg` : '3.2 kg'}
            </span>
          </div>
        </div>

        {/* Card 3: CRITICAL STOCK ALERTS (Vibrant Red/Amber styling) */}
        <div className="relative overflow-hidden rounded-2xl p-4.5 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white shadow-lg shadow-orange-900/15 border border-amber-400/30 flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-100">
                {language === 'gu' ? 'નિર્ણાયક સ્ટોક ચેતવણી' : 'CRITICAL STOCK ALERTS'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs text-white flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-200" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-white">
                {lowStockCount || 6}
              </span>
              <span className="text-xs font-semibold text-amber-100">
                {language === 'gu' ? 'વસ્તુઓ < ૫ દિવસ સ્ટોક' : 'items < 5 days stock'}
              </span>
            </div>

            <div className="mt-2 text-xs text-amber-100 leading-snug">
              {language === 'gu'
                ? 'પૂર્ણા શક્તિ અને દાળ માટે તાત્કાલિક ગોડાઉન આવકની જરૂર છે'
                : 'Purna Shakti & Tuver Dal need godown inward'}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px]">
            <button
              onClick={() => onNavigateTab('stock')}
              className="text-white hover:text-amber-200 font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'gu' ? 'ઓડિટ ખોલો' : 'View Inward Audit'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              GSCSC
            </span>
          </div>
        </div>

        {/* Card 4: PENDING DBT CLAIMS (Vibrant Purple/Pink gradient) */}
        <div className="relative overflow-hidden rounded-2xl p-4.5 bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800 text-white shadow-lg shadow-purple-900/15 border border-purple-400/30 flex flex-col justify-between">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-100">
                {language === 'gu' ? 'બાકી DBT દાવાઓ' : 'PENDING DBT CLAIMS'}
              </span>
              <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-xs text-white flex items-center justify-center">
                <Receipt className="w-4 h-4 text-fuchsia-200" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-white">1</span>
              <span className="text-xs font-semibold text-purple-100">
                {language === 'gu' ? 'દાવો (₹૨૯૫)' : 'claims (₹295)'}
              </span>
            </div>

            <div className="mt-2 text-xs text-purple-100 leading-snug">
              {language === 'gu'
                ? 'શાકભાજી ખરીદી માટે સુપરવાઇઝર મંજૂરી બાકી'
                : 'Awaiting Supervisor Approval for Fresh Vegetables'}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px]">
            <button
              onClick={() => onNavigateTab('dbt')}
              className="text-white hover:text-purple-200 font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'gu' ? 'દાવા મંજૂર કરો' : 'Review & Approve'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              DBT WCD
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Split View: Left Circle Audit Table & Right Verified Meal Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Circle 04 Centres Audit Table (8 cols on large screens) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>
                  {language === 'gu'
                    ? 'સર્કલ ૦૪ આંગણવાડી કેન્દ્રોનું ઓડિટ અને પ્રદર્શન'
                    : 'Circle 04 Anganwadi Centres Audit'}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'gu'
                  ? 'સુપરવાઇઝર શારદાબેન હેઠળ કાર્યરત ૫ કેન્દ્રોનું લાઈવ પ્રદર્શન'
                  : 'Real-time performance across 5 operational centres under Supervisor Shardaben'}
              </p>
            </div>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-300 shadow-2xs">
              {language === 'gu' ? '૫ સક્રિય કેન્દ્રો' : '5 Active Centres'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">{language === 'gu' ? 'કેન્દ્ર અને કાર્યકર' : 'Centre & Worker'}</th>
                  <th className="py-3 px-3 text-center">{language === 'gu' ? 'હાજરી' : 'Attendance'}</th>
                  <th className="py-3 px-3 text-center">{language === 'gu' ? 'ગરમ ભોજન' : 'Hot Meal'}</th>
                  <th className="py-3 px-3 text-center">{language === 'gu' ? 'સ્ટોક ચેતવણી' : 'Stock Alert'}</th>
                  <th className="py-3 px-3 text-center">{language === 'gu' ? 'બાકી બિલ' : 'Pending Bills'}</th>
                  <th className="py-3 px-4 text-right">{language === 'gu' ? 'ક્રિયા' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {circleCentres.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">
                          {language === 'gu' ? item.codeGu : item.codeEn}
                        </span>
                        {item.isPrimary && (
                          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                            {language === 'gu' ? 'મુખ્ય કેન્દ્ર' : 'PRIMARY'}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {language === 'gu' ? item.workerGu : item.workerEn}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className="font-black text-slate-900 block">{item.attendance}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block mt-0.5">
                        {item.pct}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      {item.mealStatus === 'Verified' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-bold shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {language === 'gu' ? 'ચકાસાયેલ' : 'Verified'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-[11px] font-bold shadow-2xs">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {language === 'gu' ? 'પ્રતીક્ષા' : 'Pending'}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      {item.stockAlertCount > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-red-300 bg-red-50 text-red-700 text-[11px] font-bold">
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                          {item.stockAlertCount} {language === 'gu' ? 'વસ્તુઓ' : 'items'}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          {language === 'gu' ? 'સામાન્ય' : 'Normal'}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      {item.pendingBills > 0 ? (
                        <span className="px-2.5 py-0.5 rounded-full border border-orange-300 bg-orange-50 text-orange-800 text-[11px] font-bold">
                          {item.pendingBills} {language === 'gu' ? 'દાવા' : 'claims'}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">0</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          onSelectCentre(item.centre);
                          onNavigateTab('stock');
                        }}
                        className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{language === 'gu' ? 'તપાસો' : 'Inspect'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Today's Verified Hot Meal Card (4 cols on large screens) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>{language === 'gu' ? 'આજનું ચકાસાયેલ ગરમ ભોજન' : "Today's Verified Hot Meal"}</span>
                  <Award className="w-4 h-4 text-amber-500" />
                </h3>
                <p className="text-[11px] text-slate-500">
                  {language === 'gu'
                    ? 'કાર્યકર: શ્રીમતી ભાવનાબેન પટેલ · બપોરે ૧૨:૧૮ વાગ્યે'
                    : 'AWW: Smt. BhavnaBen Patel · 12:18 PM'}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase border border-emerald-200">
                {language === 'gu' ? '૦૪-વડતાલ' : '04-Vadtal'}
              </span>
            </div>

            {/* Meal Image with GPS Watermark */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-900 shadow-inner group">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80"
                alt="Nutritious Vegetable Khichdi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* GPS Watermark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3.5 flex flex-col justify-end text-white text-[10px]">
                <div className="flex items-center gap-1 text-amber-300 font-mono font-bold">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>22.58512° N, 72.93245° E (±4.2m)</span>
                </div>
                <div className="font-extrabold text-xs text-white mt-0.5">
                  {language === 'gu'
                    ? 'પૌષ્ટિક વેજિટેબલ ખીચડી અને તુવેર દાળ'
                    : 'Paushtik Vegetable Khichdi & Tuver Dal'}
                </div>
                <div className="text-[10px] text-slate-300">
                  {language === 'gu'
                    ? 'આંગણવાડી ૦૪, સ્વામિનારાયણ મંદિર રોડ, વડતાલ, આણંદ જિલ્લો'
                    : 'AWC 04, Swaminarayan Temple Road, Vadtal, Anand Dist.'}
                </div>
              </div>
            </div>

            {/* Meal Inspection Details */}
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">
                  {language === 'gu' ? 'પીરસાયેલા બાળકો:' : 'Children Served:'}
                </span>
                <span className="font-extrabold text-slate-900 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'gu' ? '૩૯ બાળકો હાજર' : '39 children present'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">
                  {language === 'gu' ? 'સ્વચ્છતા અને ગુણવત્તા:' : 'Hygiene & Portions:'}
                </span>
                <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {language === 'gu' ? '૧૦૦% સરકારી માપદંડ મુજબ' : '100% ICDS Compliant'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">
                  {language === 'gu' ? 'સુપરવાઇઝર સહી/સ્ટેમ્પ:' : 'Supervisor Stamp:'}
                </span>
                <span className="font-bold text-slate-800 text-right">
                  {language === 'gu' ? 'શારદાબેન શાહ (બપોરે ૧૨:૪૫)' : 'Shardaben Shah (12:45 PM)'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
            <button
              onClick={() => onInspectMeal(latestMeal)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0F291E] to-[#071710] hover:from-[#173d2d] hover:to-[#0F291E] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-98"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'gu' ? 'ફોટો અને GPS ચકાસો' : 'Inspect Photo & GPS'}</span>
            </button>
            <button
              onClick={() => onNavigateTab('meal')}
              className="w-full text-center text-xs font-extrabold text-emerald-700 hover:text-emerald-900 hover:underline py-1"
            >
              {language === 'gu'
                ? 'તમામ કેન્દ્રોની ભોજન નોંધણીઓ જુઓ →'
                : 'View all circle meal submissions →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
