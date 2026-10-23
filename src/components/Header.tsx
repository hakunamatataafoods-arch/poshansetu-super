import React, { useState, useEffect } from 'react';
import { Globe, Calendar, Building2, ChevronDown, LogOut, CheckCircle2 } from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';

interface HeaderProps {
  language: 'gu' | 'en';
  onToggleLanguage: () => void;
  isRtdbLive: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  onDownloadPdf: () => void;
  currentUser?: { name: string; designation: string; username: string };
  onLogout?: () => void;
  currentCentre: AnganwadiCentre;
  onOpenCentreModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  isRtdbLive,
  currentUser = { name: 'Smt. Shardaben Shah', designation: 'Supervisor · Sector 04', username: 'superior' },
  onLogout,
  currentCentre,
  onOpenCentreModal,
}) => {
  const [currentDateStr, setCurrentDateStr] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = today.toLocaleString('en-US', { month: 'short' });
    const year = today.getFullYear();
    setCurrentDateStr(`${day}-${month}-${year}`);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official Poshan Setu Logo + Command Center title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-emerald-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
            <img
              src="/poshan-setu-logo.svg"
              alt="Poshan Setu"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/poshan-logo.png';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-tight">
                <span className="text-[#F27A1A]">Poshan</span>{' '}
                <span className="text-[#0B6E4F]">Setu</span>
              </span>
              <span className="bg-[#FFF4E5] text-[#B76E00] border border-[#FFE0B2] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                {language === 'gu' ? 'આણંદ જિલ્લો' : 'ANAND DISTRICT'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'gu'
                ? 'સુપરવાઇઝર કમાન્ડ સેન્ટર • આણંદ તાલુકો, આણંદ જિલ્લો'
                : 'Supervisor Command Center • Anand Taluka, Anand District'}
            </p>
          </div>
        </div>

        {/* Right Controls matching Screenshot */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Anganwadi Centre Selector Pill */}
          <button
            onClick={onOpenCentreModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/60 text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
            title="Switch Anganwadi Centre"
          >
            <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-[240px]">
              {language === 'gu' ? `${currentCentre.nameGu} (મુખ્ય)` : `${currentCentre.nameEn} (Primary)`}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </button>

          {/* Date Picker Button */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentDateStr || '22-Oct-2026'}</span>
          </div>

          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-xs font-bold text-emerald-900 transition-colors shadow-2xs cursor-pointer active:scale-95"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'gu' ? 'English' : 'ગુજરાતી'}</span>
          </button>

          {/* Real-time sync indicator dot */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] text-slate-600 font-semibold" title={isRtdbLive ? 'Real-time sync connected' : 'Connecting'}>
            <span className={`w-2 h-2 rounded-full ${isRtdbLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{isRtdbLive ? (language === 'gu' ? 'લાઈવ સિંક' : 'Live') : (language === 'gu' ? 'કનેક્ટ થઈ રહ્યું છે' : 'Syncing')}</span>
          </div>

          {/* Supervisor User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((p) => !p)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs ring-2 ring-emerald-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces"
                  alt="Supervisor"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span>SS</span>
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {currentUser.designation || 'Supervisor · Sector 04'}
                </div>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500">{currentUser.designation}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Sector Circle 04 Verified
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout?.();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === 'gu' ? 'લૉગ આઉટ' : 'Sign Out'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
