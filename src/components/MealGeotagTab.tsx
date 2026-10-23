import React, { useState } from 'react';
import {
  UtensilsCrossed,
  MapPin,
  CheckCircle2,
  Clock,
  Plus,
  Users,
  Calendar,
  Sparkles,
  ShieldCheck,
  Eye,
  Award,
} from 'lucide-react';
import { AnganwadiCentre, MealEntry } from '../types/poshan';

interface MealGeotagTabProps {
  currentCentre: AnganwadiCentre;
  mealEntries: MealEntry[];
  onAddMeal: (meal: {
    mealType: 'breakfast' | 'lunch';
    menuName: string;
    studentsPresent: number;
    totalGrams: number;
  }) => Promise<void>;
  onInspectMeal: (meal: any) => void;
  language: 'gu' | 'en';
}

export const MealGeotagTab: React.FC<MealGeotagTabProps> = ({
  currentCentre,
  mealEntries,
  onAddMeal,
  onInspectMeal,
  language,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMealType, setNewMealType] = useState<'breakfast' | 'lunch'>('lunch');
  const [newMenuName, setNewMenuName] = useState('Paushtik Vegetable Khichdi');
  const [newStudents, setNewStudents] = useState('39');
  const [newGrams, setNewGrams] = useState('3200');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuName.trim()) return;
    try {
      setIsSubmitting(true);
      await onAddMeal({
        mealType: newMealType,
        menuName: newMenuName,
        studentsPresent: Number(newStudents) || 35,
        totalGrams: Number(newGrams) || 3000,
      });
      setShowAddModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const mealCards = [
    {
      id: 'meal-1',
      centreEn: '04-Vadtal',
      centreGu: '૦૪-વડતાલ',
      titleEn: 'Paushtik Vegetable Khichdi & Tuver Dal',
      titleGu: 'પૌષ્ટિક વેજિટેબલ ખીચડી અને તુવેર દાળ',
      workerEn: 'AWW: Smt. BhavnaBen Patel',
      workerGu: 'કાર્યકર: શ્રીમતી ભાવનાબેન પટેલ',
      timeStrEn: 'Today, 12:18 PM',
      timeStrGu: 'આજે, બપોરે ૧૨:૧૮ વાગ્યે',
      servedCount: 39,
      plannedCount: 42,
      mealTypeEn: 'Hot Cooked Lunch',
      mealTypeGu: 'ગરમ રાંધેલું બપોરનું ભોજન',
      gpsCoords: '22.58512° N, 72.93245° E (±4.2m)',
      addressEn: 'AWC 04, Swaminarayan Temple Road, Vadtal, Anand Dist.',
      addressGu: 'આંગણવાડી ૦૪, સ્વામિનારાયણ મંદિર રોડ, વડતાલ, આણંદ જિલ્લો',
      imgSrc: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&auto=format&fit=crop&q=80',
      supervisorStampEn: 'Food temperature steaming hot, hygiene verified, matches attendance mark.',
      supervisorStampGu: 'ગરમ ભોજન તાપમાન યોગ્ય, સ્વચ્છતા ચકાસાયેલ, હાજરી સાથે સુસંગત.',
      status: 'Verified',
    },
    {
      id: 'meal-2',
      centreEn: '04-Vadtal',
      centreGu: '૦૪-વડતાલ',
      titleEn: 'Wheat Halwa / Fortified Sheera with Dry Fruits',
      titleGu: 'સુખડી / શીરો (ડ્રાય ફ્રુટ્સ સાથે)',
      workerEn: 'AWW: Smt. BhavnaBen Patel',
      workerGu: 'કાર્યકર: શ્રીમતી ભાવનાબેન પટેલ',
      timeStrEn: 'Today, 09:34 AM',
      timeStrGu: 'આજે, સવારે ૦૯:૩૪ વાગ્યે',
      servedCount: 38,
      plannedCount: 40,
      mealTypeEn: 'Morning Snack',
      mealTypeGu: 'સવારનો પૌષ્ટિક નાસ્તો',
      gpsCoords: '22.58589° N, 72.93241° E (±3.8m)',
      addressEn: 'AWC 04, Swaminarayan Temple Road, Vadtal, Anand Dist.',
      addressGu: 'આંગણવાડી ૦૪, સ્વામિનારાયણ મંદિર રોડ, વડતાલ, આણંદ જિલ્લો',
      imgSrc: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=80',
      supervisorStampEn: 'Morning snack served within designated schedule window.',
      supervisorStampGu: 'સવારનો નાસ્તો નિયત સમયગાળામાં યોગ્ય રીતે પીરસાયેલ છે.',
      status: 'Verified',
    },
  ];

  const auditEntries = [
    {
      centre: '04-Vadtal',
      time: '12:15 PM',
      typeEn: 'Hot Cooked Lunch',
      typeGu: 'ગરમ રાંધેલું ભોજન',
      nameEn: 'Paushtik Vegetable Khichdi & Tuver Dal',
      nameGu: 'પૌષ્ટિક વેજિટેબલ ખીચડી અને દાળ',
      served: 39,
      planned: 42,
      commoditiesEn: 'Fortified Rice: 3.2kg • Tuver Dal: 1.6kg • Fortified Oil: 0.6kg',
      commoditiesGu: 'ચોખા: ૩.૨ કિગ્રા • તુવેર દાળ: ૧.૬ કિગ્રા • તેલ: ૦.૬ લિટર',
    },
    {
      centre: '04-Vadtal',
      time: '09:30 AM',
      typeEn: 'Morning Snack',
      typeGu: 'સવારનો નાસ્તો',
      nameEn: 'Fortified Wheat Halwa (Sheera) with Crushed Nuts',
      nameGu: 'ઘઉંનો શીરો / સુખડી',
      served: 38,
      planned: 40,
      commoditiesEn: 'Wheat Atta: 2.2kg • Fortified Oil: 0.5kg',
      commoditiesGu: 'ઘઉંનો લોટ: ૨.૨ કિગ્રા • તેલ: ૦.૫ લિટર',
    },
    ...mealEntries.slice(0, 3).map((m) => ({
      centre: '04-Vadtal',
      time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      typeEn: m.mealType === 'lunch' ? 'Hot Cooked Lunch' : 'Morning Snack',
      typeGu: m.mealType === 'lunch' ? 'ગરમ રાંધેલું ભોજન' : 'સવારનો નાસ્તો',
      nameEn: m.menuName,
      nameGu: m.menuName,
      served: m.studentsPresent,
      planned: m.studentsPresent + 2,
      commoditiesEn: `Total Grams: ${(m.totalGrams / 1000).toFixed(1)}kg`,
      commoditiesGu: `કુલ વજન: ${(m.totalGrams / 1000).toFixed(1)} કિગ્રા`,
    })),
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Stats & Add Button */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white via-teal-50/20 to-white">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {language === 'gu'
              ? 'દૈનિક રાંધેલું ભોજન અને જીઓટેગ ચકાસણી'
              : 'Daily Cooked Meal & Geotag Verification'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'gu'
              ? 'GPS વોટરમાર્ક સાથે ફીલ્ડ કાર્યકરના ફોટો અપલોડ, બાળકની સંખ્યા અને રેસીપી ચકાસણી'
              : 'Field worker photo uploads with GPS watermarks, child headcounts, and recipes · Daily hot lunch and morning snack inspection'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl px-3.5 py-1.5 text-xs shadow-2xs">
            <div className="text-center px-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">
                {language === 'gu' ? 'કુલ' : 'All'}
              </span>
              <span className="font-black text-slate-900 font-mono text-sm">
                {mealCards.length + mealEntries.length}
              </span>
            </div>
            <div className="h-6 w-px bg-emerald-200" />
            <div className="text-center px-1">
              <span className="text-[10px] text-amber-600 font-bold block uppercase">
                {language === 'gu' ? 'બાકી' : 'Pending'}
              </span>
              <span className="font-black text-amber-600 font-mono text-sm">0</span>
            </div>
            <div className="h-6 w-px bg-emerald-200" />
            <div className="text-center px-1">
              <span className="text-[10px] text-emerald-700 font-bold block uppercase">
                {language === 'gu' ? 'ચકાસાયેલ' : 'Verified'}
              </span>
              <span className="font-black text-emerald-700 font-mono text-sm">
                {mealCards.length + mealEntries.length}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-[#0B6E4F] to-[#074D37] hover:from-[#074D37] hover:to-[#043324] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-emerald-900/15 cursor-pointer shrink-0 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'gu' ? '+ ભોજન એન્ટ્રી નોંધો' : '+ Record Meal Entry'}</span>
          </button>
        </div>
      </div>

      {/* 2. Side-by-side Meal Photo Cards with GPS Watermark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mealCards.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Photo Header */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                <img
                  src={meal.imgSrc}
                  alt={meal.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                  {language === 'gu' ? meal.centreGu : meal.centreEn}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {language === 'gu' ? 'ચકાસાયેલ' : 'Verified'}
                </div>

                {/* GPS Watermark Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3.5 text-white">
                  <div className="flex items-center gap-1 text-amber-300 font-mono text-[10px] font-bold">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{meal.gpsCoords}</span>
                  </div>
                  <div className="text-[10px] text-slate-300 truncate mt-0.5">
                    {language === 'gu' ? meal.addressGu : meal.addressEn}
                  </div>
                </div>
              </div>

              {/* Meal Card Body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {language === 'gu' ? meal.titleGu : meal.titleEn}
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 shrink-0">
                    {language === 'gu' ? meal.mealTypeGu : meal.mealTypeEn}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  {language === 'gu' ? meal.workerGu : meal.workerEn} &nbsp;·&nbsp;{' '}
                  {language === 'gu' ? meal.timeStrGu : meal.timeStrEn}
                </div>

                <div className="mt-3.5 py-2 px-3 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50/30 border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-bold">
                    {language === 'gu' ? 'પીરસાયેલ બાળકો:' : 'Children Served:'}
                  </span>
                  <span className="font-black text-slate-900 flex items-center gap-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                    {meal.servedCount}{' '}
                    <span className="text-slate-500 font-normal">
                      / {meal.plannedCount} ({language === 'gu' ? 'હાજર' : 'present'})
                    </span>
                  </span>
                </div>

                <div className="mt-3.5 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950">
                  <div className="font-extrabold text-[10px] text-emerald-800 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'gu' ? 'સુપરવાઇઝર ચકાસણી સ્ટેમ્પ:' : 'Supervisor Stamp:'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed font-medium">
                    {language === 'gu' ? meal.supervisorStampGu : meal.supervisorStampEn}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => onInspectMeal(meal)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {language === 'gu'
                    ? 'ચકાસણી વિગતો અને રેસીપી જુઓ'
                    : 'Review Verification Details'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Daily Cooked Menu & Commodity Consumption Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
            {language === 'gu'
              ? 'દૈનિક રાંધેલ ભોજન અને સામગ્રી વપરાશ ઓડિટ રજિસ્ટર'
              : 'Daily Cooked Menu & Commodity Consumption Audit'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'gu'
              ? 'સ્ટોર રજિસ્ટરમાંથી કાચા ચોખા, દાળ અને તેલની કપાત સામે બાળકોની સંખ્યાની ચકાસણી'
              : 'Cross-verification of children served against raw rice, dal, and oil deducted from store register'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">{language === 'gu' ? 'આંગણવાડી કેન્દ્ર' : 'AWC Centre'}</th>
                <th className="py-3 px-3">{language === 'gu' ? 'ભોજન પ્રકાર' : 'Meal Type'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'પોષણયુક્ત મેનુ' : 'Nutritional Menu'}</th>
                <th className="py-3 px-3 text-center">{language === 'gu' ? 'પીરસાયેલ / નિયત' : 'Served / Planned'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'વપરાયેલ સામગ્રી' : 'Commodities Consumed'}</th>
                <th className="py-3 px-4 text-center">{language === 'gu' ? 'ઓડિટ સ્થિતિ' : 'Audit Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditEntries.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-slate-900">{row.centre}</span>
                    <span className="text-[10px] text-slate-500 block">
                      {language === 'gu' ? `સમય: ${row.time}` : `Time: ${row.time}`}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700 whitespace-nowrap">
                    {language === 'gu' ? row.typeGu : row.typeEn}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-slate-900 block">
                      {language === 'gu' ? row.nameGu : row.nameEn}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="font-black text-slate-900">
                      {row.served} / {row.planned}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-900 font-bold text-xs">
                    {language === 'gu' ? row.commoditiesGu : row.commoditiesEn}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-bold shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {language === 'gu' ? 'ઓડિટ થયેલ' : 'Audited'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Meal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-extrabold text-slate-900">
                {language === 'gu' ? 'દૈનિક રાંધેલ ભોજન નોંધો' : 'Log Daily Cooked Meal'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitMeal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'gu' ? 'ભોજન પ્રકાર' : 'Meal Type'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewMealType('lunch')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      newMealType === 'lunch'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {language === 'gu' ? 'ગરમ બપોરનું ભોજન' : 'Hot Cooked Lunch'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewMealType('breakfast')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      newMealType === 'breakfast'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {language === 'gu' ? 'સવારનો નાસ્તો' : 'Morning Snack'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'gu' ? 'મેનુ અને રેસીપીનું નામ' : 'Menu & Recipe Name'}
                </label>
                <input
                  type="text"
                  value={newMenuName}
                  onChange={(e) => setNewMenuName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Paushtik Vegetable Khichdi & Tuver Dal"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'gu' ? 'હાજર બાળકોની સંખ્યા' : 'Children Served'}
                  </label>
                  <input
                    type="number"
                    value={newStudents}
                    onChange={(e) => setNewStudents(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'gu' ? 'કુલ વજન (ગ્રામ)' : 'Total Quantity (Grams)'}
                  </label>
                  <input
                    type="number"
                    value={newGrams}
                    onChange={(e) => setNewGrams(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    min="100"
                    step="50"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  {language === 'gu' ? 'રદ કરો' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0B6E4F] hover:bg-[#074D37] text-white flex items-center gap-1.5 shadow-2xs"
                >
                  {isSubmitting
                    ? language === 'gu'
                      ? 'સિંક થઈ રહ્યું છે...'
                      : 'Recording...'
                    : language === 'gu'
                    ? 'RTDB માં સાચવો'
                    : 'Submit to RTDB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
