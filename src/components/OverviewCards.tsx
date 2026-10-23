import React from 'react';
import { Home, AlertTriangle, Clock, ShieldAlert, User, CheckCircle, Phone, Hash, AlertCircle, ChevronRight } from 'lucide-react';
import { AnganwadiCentre, InventoryStock } from '../types/poshan';

interface OverviewCardsProps {
  centre: AnganwadiCentre;
  inventory: InventoryStock;
  lastUpdated: string;
  onOpenSelectCentre: () => void;
  onOpenInwardModal?: () => void;
  language: 'gu' | 'en';
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  centre,
  inventory,
  lastUpdated,
  onOpenSelectCentre,
  language,
}) => {
  // Check critical thresholds across all items
  const lowItems: { name: string; count: number; unit: string; min: number }[] = [];

  if ((inventory.bal_shakti ?? 0) < 15) {
    lowItems.push({ name: 'Bal Shakti', count: inventory.bal_shakti ?? 0, unit: 'pkts', min: 15 });
  }
  if ((inventory.matru_shakti ?? 0) < 10) {
    lowItems.push({ name: 'Matru Shakti', count: inventory.matru_shakti ?? 0, unit: 'pkts', min: 10 });
  }
  if ((inventory.purna_shakti ?? 0) < 10) {
    lowItems.push({ name: 'Purna Shakti', count: inventory.purna_shakti ?? 0, unit: 'pkts', min: 10 });
  }
  if ((inventory.rice ?? 0) < 10) {
    lowItems.push({ name: 'Rice', count: inventory.rice ?? 0, unit: 'kg', min: 10 });
  }
  if ((inventory.atta ?? 0) < 10) {
    lowItems.push({ name: 'Atta', count: inventory.atta ?? 0, unit: 'kg', min: 10 });
  }
  if ((inventory.dal ?? 0) < 5) {
    lowItems.push({ name: 'Tuvar Dal', count: inventory.dal ?? 0, unit: 'kg', min: 5 });
  }
  if ((inventory.oil ?? 0) < 5) {
    lowItems.push({ name: 'Oil', count: inventory.oil ?? 0, unit: 'L', min: 5 });
  }

  const isCritical = lowItems.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4.5">
      {/* 1. Selected Anganwadi Centre & Worker Contact Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B6E4F]">
              {language === 'gu' ? 'પસંદ કરેલ આંગણવાડી કેન્દ્ર અને કાર્યકર સંપર્ક' : 'SELECTED ANGANWADI CENTRE & WORKER CONTACT'}
            </span>
            <span className="text-xs font-mono font-bold bg-[#F27A1A]/10 text-[#F27A1A] border border-[#F27A1A]/30 px-2.5 py-0.5 rounded-full">
              {centre.code}
            </span>
          </div>

          <div className="flex items-start gap-3.5 mt-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-[#0B6E4F] mt-0.5 shadow-xs">
              <Home className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {language === 'gu' ? centre.nameGu : centre.nameEn}
                </h3>
                <button
                  onClick={onOpenSelectCentre}
                  className="text-xs font-bold text-[#F27A1A] hover:text-[#d9670d] bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-lg transition-colors shadow-xs active:scale-95"
                >
                  {language === 'gu' ? 'કેન્દ્ર બદલો ⌵' : 'Change Centre ⌵'}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Taluka: <span className="text-slate-800 font-bold">{centre.taluka}</span> • Sector: <span className="text-slate-800 font-bold">{centre.sector}</span>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'gu' ? 'સુપરવાઇઝર:' : 'Supervisor:'} <span className="text-[#0B6E4F] font-bold">{centre.supervisorName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Worker Contact & Roll Number Information */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B6E4F]/10 border border-[#0B6E4F]/25 flex items-center justify-center text-[#0B6E4F] shrink-0">
              <User className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">{centre.workerName}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-[#0B6E4F] border border-emerald-300 px-1.5 py-0.5 rounded">
                  AWW
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-0.5 font-medium">
                <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700">
                  <Hash className="w-3 h-3 text-[#F27A1A]" />
                  <span>Roll: <strong>{centre.workerRollNo || 'AWW-9844'}</strong></span>
                  <span className="text-slate-400">({centre.workerLastFour || '9844'})</span>
                </span>
              </div>
            </div>
          </div>

          {centre.phone && (
            <a
              href={`tel:${centre.phone}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B6E4F] hover:bg-[#08523b] text-white font-bold text-xs shadow-sm transition-all active:scale-95 group"
            >
              <Phone className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform text-[#74BF44]" />
              <span>{centre.phone}</span>
            </a>
          )}
        </div>
      </div>

      {/* 2. Stock Alert Monitor (CDPO) Card */}
      <div
        className={`rounded-2xl p-5 border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow ${
          isCritical
            ? 'bg-gradient-to-br from-rose-50/70 via-white to-orange-50/40 border-rose-200'
            : 'bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 border-emerald-200'
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                {language === 'gu' ? 'સ્ટોક એલર્ટ મોનિટર (CDPO)' : 'STOCK ALERT MONITOR (CDPO)'}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#F27A1A] animate-ping"></span>
            </div>
            <span
              className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wide shadow-xs ${
                isCritical
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {isCritical
                ? language === 'gu'
                  ? 'ગંભીર એલર્ટ (CRITICAL)'
                  : 'CRITICAL ALERT'
                : language === 'gu'
                ? 'સંતોષકારક (ADEQUATE)'
                : 'ADEQUATE'}
            </span>
          </div>

          <div className="mt-1 flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${
                isCritical ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {isCritical ? <ShieldAlert className="w-5 h-5 stroke-[2.2]" /> : <CheckCircle className="w-5 h-5 stroke-[2.2]" />}
            </div>

            <div className="flex-1">
              <h4 className={`text-base font-extrabold ${isCritical ? 'text-rose-900' : 'text-[#0B6E4F]'}`}>
                {isCritical
                  ? language === 'gu'
                    ? 'ઓછા સ્ટોકનું સ્તર! તાત્કાલિક નવી સપ્લાય જરૂરી છે'
                    : 'Low Stock Level! Immediate replenishment required'
                  : language === 'gu'
                  ? 'તમામ રાશન અને સામગ્રી પર્યાપ્ત સ્તરે છે'
                  : 'All ration items maintained comfortably above buffer levels'}
              </h4>

              {isCritical ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {lowItems.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1 text-[11px] font-bold bg-white text-rose-700 border border-rose-300 px-2 py-0.5 rounded-md shadow-2xs"
                    >
                      <AlertCircle className="w-3 h-3 text-rose-500" />
                      <span>
                        {item.name}: <strong>{item.count} {item.unit}</strong> (Min {item.min})
                      </span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-600 mt-1">
                  All 7 Anganwadi commodities (Bal Shakti, Matru Shakti, Purna Shakti, Atta, Rice, Dal, Oil) are above required reserve safety thresholds.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {language === 'gu' ? 'છેલ્લે ચકાસાયેલ:' : 'Last verified:'} <strong className="text-slate-700">{lastUpdated || 'Just now'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#0B6E4F] bg-emerald-100/70 border border-emerald-300 px-2.5 py-1 rounded-lg">
              ✓ Supervisor Live Surveillance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
