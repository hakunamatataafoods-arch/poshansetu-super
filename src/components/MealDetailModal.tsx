import React from 'react';
import { MapPin, CheckCircle2, ShieldCheck, Users, Calendar, Clock, Utensils } from 'lucide-react';

interface MealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: any;
  language: 'gu' | 'en';
}

export const MealDetailModal: React.FC<MealDetailModalProps> = ({
  isOpen,
  onClose,
  meal,
  language,
}) => {
  if (!isOpen || !meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {meal.title || meal.menuName || 'Hot Cooked Meal Inspection'}
              </h3>
              <p className="text-xs text-slate-500">
                GPS-Tagged Midday Meal Compliance & Geotag Verification
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

        {/* Photo with GPS Stamp */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-900">
          <img
            src={
              meal.imgSrc ||
              'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80'
            }
            alt="Meal Inspection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 flex flex-col justify-end text-white text-xs">
            <div className="flex items-center gap-1.5 text-amber-300 font-mono font-semibold">
              <MapPin className="w-4 h-4" />
              <span>{meal.gpsCoords || '22.58512° N, 72.93245° E (±4.2m)'}</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              {meal.address || '04-Vadtal Anganwadi Centre, Anand District'}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">
              {language === 'gu' ? 'તૈયાર કરનાર:' : 'Prepared By:'}
            </span>
            <span className="font-extrabold text-slate-900">
              {language === 'gu' ? 'શ્રીમતી ભાવનાબેન પટેલ' : meal.worker || 'AWW Smt. BhavnaBen Patel'}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">
              {language === 'gu' ? 'પીરસવાનો સમય:' : 'Serving Time:'}
            </span>
            <span className="font-extrabold text-slate-900">
              {language === 'gu' ? 'આજે, બપોરે ૧૨:૧૮ વાગ્યે' : meal.timeStr || 'Today, 12:18 PM'}
            </span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">
              {language === 'gu' ? 'બાળકોની સંખ્યા:' : 'Children Count:'}
            </span>
            <span className="font-extrabold text-slate-900">
              {meal.servedCount || 39} {language === 'gu' ? 'હાજર બાળકો' : 'children attended'}
            </span>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span className="text-emerald-800 block text-[10px] uppercase font-bold">
              {language === 'gu' ? 'સ્વચ્છતા સ્થિતિ:' : 'Hygiene Status:'}
            </span>
            <span className="font-extrabold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'gu' ? '૧૦૦% સરકારી ધોરણ મુજબ' : '100% ICDS Compliant'}
            </span>
          </div>
        </div>

        {/* Supervisor Remark */}
        <div className="mt-3 p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs">
          <div className="text-[10px] font-black text-emerald-800 uppercase tracking-wider mb-0.5">
            {language === 'gu' ? 'સુપરવાઇઝર ચકાસણી સ્ટેમ્પ:' : 'Supervisor Verification Stamp:'}
          </div>
          <p className="text-emerald-950 leading-relaxed font-medium">
            {language === 'gu'
              ? 'ગરમ ભોજન તાપમાન યોગ્ય, સ્વચ્છતા ચકાસાયેલ, હાજરી સાથે સુસંગત. સહી: શ્રીમતી શારદાબેન શાહ (સુપરવાઇઝર).'
              : meal.supervisorStamp ||
                'Food temperature steaming hot, hygiene verified, matches attendance mark. Signed by Smt. Shardaben Shah (Supervisor).'}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            {language === 'gu' ? 'વિગતો બંધ કરો' : 'Close Details'}
          </button>
        </div>
      </div>
    </div>
  );
};
