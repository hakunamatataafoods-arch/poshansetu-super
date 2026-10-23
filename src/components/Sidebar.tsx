import React from 'react';
import {
  LayoutGrid,
  Box,
  UtensilsCrossed,
  Receipt,
  ArrowLeftRight,
  HeartHandshake,
  FileSpreadsheet,
  PhoneCall,
  Info,
  Sparkles,
} from 'lucide-react';

export type TabKey = 'overview' | 'stock' | 'meal' | 'dbt' | 'transfers' | 'distribution' | 'mpr';

interface SidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  stockAlertCount?: number;
  mealCount?: number;
  pendingDbtCount?: number;
  language: 'gu' | 'en';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  stockAlertCount = 9,
  mealCount = 2,
  pendingDbtCount = 1,
  language,
}) => {
  const navItems: {
    key: TabKey;
    labelEn: string;
    labelGu: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
    iconColor: string;
    iconBg: string;
  }[] = [
    {
      key: 'overview',
      labelEn: 'Executive Overview',
      labelGu: 'એક્ઝિક્યુટિવ પરિદ્રશ્ય',
      icon: LayoutGrid,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
    {
      key: 'stock',
      labelEn: 'Live Stock & Inward Audit',
      labelGu: 'લાઈવ સ્ટોક અને ઇનવર્ડ ઓડિટ',
      icon: Box,
      badge: stockAlertCount,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
    },
    {
      key: 'meal',
      labelEn: 'Meal & Geotag Inspection',
      labelGu: 'ભોજન અને જીઓટેગ ચકાસણી',
      icon: UtensilsCrossed,
      badge: mealCount,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50',
    },
    {
      key: 'dbt',
      labelEn: 'DBT Bill Reimbursement',
      labelGu: 'DBT બિલ રિઇમ્બર્સમેન્ટ',
      icon: Receipt,
      badge: pendingDbtCount,
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-50',
    },
    {
      key: 'transfers',
      labelEn: 'Setu Share Transfers',
      labelGu: 'સેતુ શેર ઈમરજન્સી ટ્રાન્સફર',
      icon: ArrowLeftRight,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      key: 'distribution',
      labelEn: 'Beneficiary Distribution',
      labelGu: 'લાભાર્થી વિતરણ રજિસ્ટર',
      icon: HeartHandshake,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
    },
    {
      key: 'mpr',
      labelEn: 'Monthly Progress Report (MPR)',
      labelGu: 'માસિક પ્રગતિ અહેવાલ (MPR)',
      icon: FileSpreadsheet,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
    },
  ];

  return (
    <aside className="w-full lg:w-68 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 p-3 lg:p-4 min-h-[calc(100vh-65px)] shadow-xs">
      <div>
        <div className="px-3 mb-3 flex items-center justify-between">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
            {language === 'gu' ? 'સુપરવાઇઝરી વર્કસ્પેસ' : 'SUPERVISORY WORKSPACE'}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onSelectTab(item.key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0B6E4F] to-[#074D37] text-white shadow-md shadow-emerald-900/15'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-white/20 text-white' : `${item.iconBg} ${item.iconColor}`
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>
                  <span className="truncate">
                    {language === 'gu' ? item.labelGu : item.labelEn}
                  </span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full border shadow-2xs ${
                      isActive
                        ? 'bg-white/25 text-white border-white/30'
                        : item.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom CDPO Helpline Card with Attractive Styling */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-slate-50 border border-emerald-200/80 rounded-2xl p-3.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-emerald-900 text-xs font-extrabold mb-1">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{language === 'gu' ? 'CDPO સહાય હેલ્પલાઇન' : 'CDPO Helpline'}</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            {language === 'gu' ? 'આણંદ જિલ્લા ICDS સહાય:' : 'Anand District ICDS Support:'}{' '}
            <strong className="text-emerald-950 font-mono block sm:inline">02692-260144</strong>
          </p>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">
            {language === 'gu' ? '(સવારે ૦૯:૩૦ થી સાંજે ૦૬:૦૦)' : '(09:30 AM - 06:00 PM)'}
          </p>
        </div>
      </div>
    </aside>
  );
};
