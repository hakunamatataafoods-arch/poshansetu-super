import React from 'react';
import { MapPin, SlidersHorizontal, ChevronDown, CheckCircle2 } from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';

interface LocationBarProps {
  currentCentre: AnganwadiCentre;
  onOpenSelectModal: () => void;
  language: 'gu' | 'en';
}

export const LocationBar: React.FC<LocationBarProps> = ({
  currentCentre,
  onOpenSelectModal,
  language,
}) => {
  return (
    <div className="bg-[#09261B] text-emerald-100/90 border-b border-[#0B6E4F]/30 text-xs py-2 px-4 sm:px-6">
      <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Hierarchy Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-medium">
          {/* District */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#F27A1A]" />
            <span className="text-[#F27A1A] font-bold">{language === 'gu' ? 'જિલ્લો:' : 'District:'}</span>
            <span className="font-bold text-white bg-[#0D3828] px-2 py-0.5 rounded border border-[#0B6E4F]/40">
              {language === 'gu' ? 'આણંદ (Anand)' : 'Anand'}
            </span>
          </div>

          <span className="text-[#0B6E4F] hidden sm:inline">|</span>

          {/* Taluka */}
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-200/70">{language === 'gu' ? 'તાલુકો:' : 'Taluka:'}</span>
            <div className="flex items-center gap-1 bg-[#0D3828] text-white px-2.5 py-1 rounded border border-[#0B6E4F]/40">
              <span className="font-semibold">{currentCentre.taluka}</span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </div>
          </div>

          <span className="text-[#0B6E4F] hidden sm:inline">|</span>

          {/* Sector */}
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-200/70">{language === 'gu' ? 'સેક્ટર:' : 'Sector:'}</span>
            <div className="flex items-center gap-1 bg-[#0D3828] text-white px-2.5 py-1 rounded border border-[#0B6E4F]/40">
              <span className="font-semibold">{currentCentre.sector}</span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </div>
          </div>

          <span className="text-[#0B6E4F] hidden sm:inline">|</span>

          {/* Project */}
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-200/70">{language === 'gu' ? 'પ્રોજેક્ટ:' : 'Project:'}</span>
            <span className="text-[#74BF44] font-bold">ICDS PoshanSetu</span>
          </div>
        </div>

        {/* Right actions: Select Centre button + Endpoint Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSelectModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F27A1A] hover:bg-[#d9670d] text-white font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{language === 'gu' ? 'કેન્દ્ર બદલો / પસંદ કરો' : 'Change / Select Centre'}</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] bg-[#051C13] px-2.5 py-1 rounded-md border border-[#0B6E4F]/40">
            <span className="text-emerald-200/60">Endpoint:</span>
            <span className="font-mono text-[#74BF44] font-bold">{currentCentre.endpoint}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
