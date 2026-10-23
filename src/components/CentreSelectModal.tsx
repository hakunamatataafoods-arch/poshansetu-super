import React from 'react';
import { X, Check, Building2, MapPin, User, ChevronRight } from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';
import { CENTRES } from '../services/firebaseRtdb';

interface CentreSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCentre: AnganwadiCentre;
  onSelectCentre: (centre: AnganwadiCentre) => void;
  language: 'gu' | 'en';
}

export const CentreSelectModal: React.FC<CentreSelectModalProps> = ({
  isOpen,
  onClose,
  currentCentre,
  onSelectCentre,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                {language === 'gu' ? 'આંગણવાડી કેન્દ્ર પસંદ કરો' : 'Select Anganwadi Centre'}
              </h3>
              <p className="text-xs text-slate-400">
                District: Anand • Taluka: Anand Rural • Sector: Vadtal-01
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Centres */}
        <div className="p-4 sm:p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {CENTRES.map((centre) => {
            const isSelected = centre.id === currentCentre.id;
            return (
              <div
                key={centre.id}
                onClick={() => {
                  onSelectCentre(centre);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20'
                    : 'bg-slate-50 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-500 group-hover:text-amber-600'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-white text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded">
                        {centre.code}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {language === 'gu' ? centre.nameGu : centre.nameEn}
                      </h4>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        <User className="w-3.5 h-3.5 text-[#0B6E4F]" />
                        <span>AWW: <strong>{centre.workerName}</strong></span>
                      </span>

                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold bg-[#F27A1A]/10 text-[#F27A1A] border border-[#F27A1A]/30 px-2 py-0.5 rounded">
                        Roll: {centre.workerRollNo || 'AWW-9844'} ({centre.workerLastFour || '9844'})
                      </span>

                      {centre.phone && (
                        <a
                          href={`tel:${centre.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 font-semibold text-[#0B6E4F] hover:underline bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]"
                        >
                          📞 {centre.phone}
                        </a>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      Supervisor: <strong className="text-slate-600">{centre.supervisorName}</strong> • {centre.endpoint}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-3">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            {language === 'gu' ? 'બંધ કરો' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
