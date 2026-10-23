import React from 'react';
import { Package, Plus, Sparkles, Layers, ArrowDownToLine, RefreshCw } from 'lucide-react';
import { AnganwadiCentre, InventoryStock } from '../types/poshan';

interface PantryInventoryProps {
  inventory: InventoryStock;
  centre: AnganwadiCentre;
  onOpenInwardModal: () => void;
  language: 'gu' | 'en';
}

export const PantryInventory: React.FC<PantryInventoryProps> = ({
  inventory,
  centre,
  onOpenInwardModal,
  language,
}) => {
  // All 7 commodities requested by the user with real-time inward additions
  const items = [
    {
      id: 'bal_shakti',
      labelEn: 'Bal Shakti (500g)',
      labelGu: 'બાળ શક્તિ (૫૦૦ ગ્રામ)',
      val: inventory.bal_shakti ?? 0,
      todayInward: inventory.todayInward?.bal_shakti ?? 0,
      unit: 'Pkts',
      isLow: (inventory.bal_shakti ?? 0) < 15,
      type: 'Take-Home Ration',
      badgeColor: 'border-[#F27A1A]/40 bg-[#F27A1A]/10 text-[#F27A1A]',
    },
    {
      id: 'matru_shakti',
      labelEn: 'Matru Shakti (1kg)',
      labelGu: 'માતૃ શક્તિ (૧ કિગ્રા)',
      val: inventory.matru_shakti ?? 0,
      todayInward: inventory.todayInward?.matru_shakti ?? 0,
      unit: 'Pkts',
      isLow: (inventory.matru_shakti ?? 0) < 10,
      type: 'Take-Home Ration',
      badgeColor: 'border-[#0B6E4F]/40 bg-[#0B6E4F]/10 text-[#0B6E4F]',
    },
    {
      id: 'purna_shakti',
      labelEn: 'Purna Shakti (1kg)',
      labelGu: 'પૂર્ણા શક્તિ (૧ કિગ્રા)',
      val: inventory.purna_shakti ?? 0,
      todayInward: inventory.todayInward?.purna_shakti ?? 0,
      unit: 'Pkts',
      isLow: (inventory.purna_shakti ?? 0) < 10,
      type: 'Take-Home Ration',
      badgeColor: 'border-[#74BF44]/40 bg-[#74BF44]/10 text-[#74BF44]',
    },
    {
      id: 'atta',
      labelEn: 'Atta (Flour)',
      labelGu: 'ઘઉંનો લોટ (Atta)',
      val: inventory.atta ?? 0,
      todayInward: inventory.todayInward?.atta ?? 0,
      unit: 'kg',
      isLow: (inventory.atta ?? 0) < 10,
      type: 'Raw Staple',
      badgeColor: 'border-amber-400 bg-amber-50 text-amber-800',
    },
    {
      id: 'rice',
      labelEn: 'Rice (Grain)',
      labelGu: 'ચોખા (અનાજ)',
      val: inventory.rice ?? 0,
      todayInward: inventory.todayInward?.rice ?? 0,
      unit: 'kg',
      isLow: (inventory.rice ?? 0) < 10,
      type: 'Raw Staple',
      badgeColor: 'border-emerald-400 bg-emerald-50 text-emerald-800',
    },
    {
      id: 'dal',
      labelEn: 'Tuvar Dal',
      labelGu: 'તુવેર દાળ',
      val: inventory.dal ?? 0,
      todayInward: inventory.todayInward?.dal ?? 0,
      unit: 'kg',
      isLow: (inventory.dal ?? 0) < 5,
      type: 'Pulses',
      badgeColor: 'border-orange-400 bg-orange-50 text-orange-800',
    },
    {
      id: 'oil',
      labelEn: 'Edible Oil',
      labelGu: 'ખાદ્ય તેલ',
      val: inventory.oil ?? 0,
      todayInward: inventory.todayInward?.oil ?? 0,
      unit: 'L',
      isLow: (inventory.oil ?? 0) < 5,
      type: 'Cooking Oil',
      badgeColor: 'border-teal-400 bg-teal-50 text-teal-800',
    },
  ];

  const totalInwardTodayCount = Object.values(inventory.todayInward || {}).reduce((acc, v) => acc + (v || 0), 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F27A1A]"></span>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              {language === 'gu'
                ? 'આંગણવાડી પેન્ટ્રી ઇન્વેન્ટરી (સ્ટોક લેજર)'
                : 'Anganwadi Pantry Inventory (Stock Ledger)'}
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[#0B6E4F] text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#74BF44] animate-pulse"></span>
              <span>{language === 'gu' ? 'કાર્યકર એપ સાથે લાઈવ સિંક' : 'Live Sync with Worker App'}</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'gu'
              ? 'ટેક-હોમ રાશન (THR), ઘઉંનો લોટ અને બલ્ક રાંધણ સામગ્રી સિલક'
              : 'Take-Home Rations (THR), wheat flour and bulk cooking staple balance'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold bg-[#0B6E4F]/10 text-[#0B6E4F] border border-[#0B6E4F]/30 px-3 py-1 rounded-lg">
            {centre.code} {language === 'gu' ? 'પેન્ટ્રી લેજર' : 'Pantry Ledger'}
          </span>
          <button
            onClick={onOpenInwardModal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>{language === 'gu' ? '+ સ્ટોક આવક' : '+ Inward Supply'}</span>
          </button>
        </div>
      </div>

      {/* Real-time Inward Activity Banner if supplies received today */}
      {totalInwardTodayCount > 0 && inventory.latestInwardSummary && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold">
              {language === 'gu' ? 'એપ દ્વારા તાજેતરમાં ઉમેરાયેલ સ્ટોક આવક:' : 'Stock Added via Mobile App (Live Synced):'}
            </span>
            <span className="font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
              {inventory.latestInwardSummary}
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">
            {language === 'gu' ? 'બોર્ડ પર તાત્કાલિક અપડેટ થયેલ' : 'Instantly reflected on board'}
          </span>
        </div>
      )}

      {/* 7 Metric Cards in Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {items.map((item) => {
          const displayVal =
            typeof item.val === 'number'
              ? Number.isInteger(item.val)
                ? item.val
                : Number(item.val.toFixed(2))
              : item.val;

          return (
            <div
              key={item.id}
              className={`rounded-xl p-3.5 border transition-all text-center relative overflow-hidden group hover:shadow-md ${
                item.isLow
                  ? 'bg-rose-50/20 border-rose-200 hover:border-rose-300'
                  : 'bg-slate-50/80 border-slate-200/80 hover:border-[#0B6E4F]/40'
              }`}
            >
              <span className="text-[11px] font-bold text-slate-700 block truncate">
                {language === 'gu' ? item.labelGu : item.labelEn}
              </span>

              <div className="mt-2.5 flex items-baseline justify-center gap-1">
                <span
                  className={`text-3xl font-extrabold tracking-tight ${
                    item.isLow ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {displayVal}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {item.unit}
                </span>
              </div>

              {/* Inward addition tag if received today */}
              {item.todayInward > 0 ? (
                <div className="mt-2 flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-300/70 rounded-md py-0.5 px-1.5">
                  <ArrowDownToLine className="w-2.5 h-2.5" />
                  <span>+{item.todayInward} {item.unit} {language === 'gu' ? 'આવક' : 'added'}</span>
                </div>
              ) : (
                <div className="mt-2.5">
                  {item.isLow ? (
                    <span className="inline-block text-[10px] font-bold text-rose-700 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-md">
                      {language === 'gu' ? 'ઓછો સ્ટોક' : 'Low Buffer'}
                    </span>
                  ) : (
                    <span className="inline-block text-[10px] font-semibold text-[#0B6E4F] bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {language === 'gu' ? 'પર્યાપ્ત' : 'Stock OK'}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
