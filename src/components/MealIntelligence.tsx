import React, { useState } from 'react';
import { Utensils, Clock, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { MealEntry } from '../types/poshan';

interface MealIntelligenceProps {
  mealEntries: MealEntry[];
  onAddMeal: (meal: {
    mealType: 'breakfast' | 'lunch';
    menuName: string;
    studentsPresent: number;
    totalGrams: number;
  }) => void;
  language: 'gu' | 'en';
}

export const MealIntelligence: React.FC<MealIntelligenceProps> = ({
  mealEntries,
  onAddMeal,
  language,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch'>('breakfast');
  const [menuName, setMenuName] = useState('Sukdi (Atta)');
  const [studentsPresent, setStudentsPresent] = useState(8);

  const calculateAutoGrams = (type: 'breakfast' | 'lunch', students: number) => {
    const perStudent = type === 'breakfast' ? 30 : 50;
    return students * perStudent;
  };

  const handleCreateMeal = (e: React.FormEvent) => {
    e.preventDefault();
    const totalGrams = calculateAutoGrams(mealType, studentsPresent);
    onAddMeal({
      mealType,
      menuName,
      studentsPresent,
      totalGrams,
    });
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {language === 'gu'
                  ? 'દૈનિક ભોજન અને કાચા અનાજનો વપરાશ (ભોજન ઇન્ટેલિજન્સ)'
                  : 'Daily Meal & Raw Staple Consumption (Meal Intelligence)'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Meal 1: Breakfast (30g/student) • Meal 2: Lunch (50g/student) [ICDS Gujarat Norms]
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold bg-[#F27A1A]/10 text-[#F27A1A] border border-[#F27A1A]/30 px-2.5 py-1 rounded-lg">
              30g / 50g Formula
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">TIME</th>
                <th className="py-2.5 px-3">MEAL TYPE</th>
                <th className="py-2.5 px-3">MENU SERVED</th>
                <th className="py-2.5 px-3">STUDENTS PRESENT</th>
                <th className="py-2.5 px-3">TOTAL GRAMS</th>
                <th className="py-2.5 px-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {mealEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    {language === 'gu' ? 'કોઈ ભોજન એન્ટ્રી મળી નથી' : 'No meal entries recorded today'}
                  </td>
                </tr>
              ) : (
                mealEntries.slice(0, 5).map((meal, idx) => {
                  const timeStr = meal.recordedAt
                    ? new Date(meal.recordedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                    : typeof meal.timestamp === 'number'
                    ? new Date(meal.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                    : '09:14 pm';

                  return (
                    <tr key={meal.id || idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                        {timeStr}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        {meal.mealType === 'breakfast'
                          ? (language === 'gu' ? 'ભોજન ૧ – નાસ્તો' : 'Meal 1 – Breakfast')
                          : (language === 'gu' ? 'ભોજન ૨ – બપોરનું ભોજન' : 'Meal 2 – Lunch')}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">
                        {meal.menuName}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        {meal.studentsPresent} {language === 'gu' ? 'બાળકો' : 'Students'}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-amber-800">
                        {meal.totalGrams} gm <span className="text-[10px] text-slate-400 font-normal">(Formula Auto)</span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                          Recorded ✓
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Meal Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 border border-slate-200">
            <h4 className="text-base font-bold text-slate-900 mb-3">
              {language === 'gu' ? 'દૈનિક ભોજન એન્ટ્રી રેકોર્ડ કરો' : 'Log Daily Meal Entry'}
            </h4>
            <form onSubmit={handleCreateMeal} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meal Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMealType('breakfast');
                      setMenuName('Sukdi (Atta)');
                    }}
                    className={`py-2 px-3 rounded font-bold border transition-colors ${
                      mealType === 'breakfast'
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Meal 1 – Breakfast (30g)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMealType('lunch');
                      setMenuName('Vegetable Khichdi (Rice + Dal)');
                    }}
                    className={`py-2 px-3 rounded font-bold border transition-colors ${
                      mealType === 'lunch'
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Meal 2 – Lunch (50g)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Menu Item</label>
                <select
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded text-xs bg-white text-slate-800"
                >
                  <option value="Sukdi (Atta)">Sukdi (Atta)</option>
                  <option value="Bal Shakti Sheera">Bal Shakti Sheera</option>
                  <option value="Vegetable Khichdi (Rice + Dal)">Vegetable Khichdi (Rice + Dal)</option>
                  <option value="Poha">Poha</option>
                  <option value="Muthiya (Wheat + Greens)">Muthiya (Wheat + Greens)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Students Present (Formula Auto calculation)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={studentsPresent}
                  onChange={(e) => setStudentsPresent(Number(e.target.value))}
                  className="w-full p-2 border border-slate-300 rounded text-xs"
                />
                <p className="mt-1 text-[11px] text-amber-700 font-semibold">
                  Auto Ration: {calculateAutoGrams(mealType, studentsPresent)} grams ({studentsPresent} × {mealType === 'breakfast' ? '30g' : '50g'})
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 font-semibold hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded shadow"
                >
                  Save & Sync RTDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
