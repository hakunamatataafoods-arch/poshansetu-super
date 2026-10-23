import React, { useState } from 'react';
import { Check, X, CheckCheck, Users, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AttendancePayload, StudentAttendanceRecord } from '../types/poshan';

interface StudentAttendanceProps {
  attendance: AttendancePayload;
  onToggleStudent: (studentId: number) => Promise<void>;
  onMarkAll: (present: boolean) => Promise<void>;
  isSyncing: boolean;
  language: 'gu' | 'en';
}

export const StudentAttendance: React.FC<StudentAttendanceProps> = ({
  attendance,
  onToggleStudent,
  onMarkAll,
  isSyncing,
  language,
}) => {
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const presentCount = attendance.records.filter((s) => s.present).length;
  const absentCount = attendance.records.length - presentCount;

  const handleToggle = async (id: number) => {
    try {
      setTogglingId(id);
      await onToggleStudent(id);

      // Check if after toggle all are present
      const targetStudent = attendance.records.find((s) => s.id === id);
      if (targetStudent && !targetStudent.present && presentCount + 1 === attendance.records.length) {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
        });
      }
    } finally {
      setTogglingId(null);
    }
  };

  const handleMarkAll = async (present: boolean) => {
    await onMarkAll(present);
    if (present) {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>{language === 'gu' ? 'આજની વિદ્યાર્થી હાજરી' : "Today's Student Attendance"}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {attendance.records.length} {language === 'gu' ? 'નોંધાયેલ મોડેલ રોસ્ટર (૦૪ વડતાલ)' : 'Registered Model Roster (04 Vadtal)'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Live Count Pill */}
            <div className="flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-lg">
              <span className="text-emerald-700">{presentCount} {language === 'gu' ? 'હાજર' : 'Present'}</span>
              <span className="text-slate-300">/</span>
              <span className={absentCount > 0 ? 'text-rose-600' : 'text-slate-500'}>
                {absentCount} {language === 'gu' ? 'ગેરહાજર' : 'Absent'}
              </span>
            </div>

            {isSyncing && (
              <span title="Syncing to RTDB...">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              </span>
            )}
          </div>
        </div>

        {/* Quick Bulk Actions */}
        <div className="flex items-center justify-between py-1.5 px-2 bg-slate-50 border border-slate-200/80 rounded-lg mb-3 text-[11px]">
          <span className="text-slate-500 font-medium">
            {language === 'gu' ? 'ક્વિક હાજરી એક્શન:' : 'Quick Attendance Action:'}
          </span>
          <div className="flex items-center gap-2 font-bold">
            <button
              onClick={() => handleMarkAll(true)}
              className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100/60 px-2 py-0.5 rounded transition-colors"
            >
              {language === 'gu' ? '✓ બધા હાજર કરો' : '✓ All Present'}
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => handleMarkAll(false)}
              className="text-rose-600 hover:text-rose-700 hover:bg-rose-100/60 px-2 py-0.5 rounded transition-colors"
            >
              {language === 'gu' ? '✕ બધા ગેરહાજર' : '✕ All Absent'}
            </button>
          </div>
        </div>

        {/* 2-Column Student Grid exactly as in screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {attendance.records.map((student) => {
            const isToggling = togglingId === student.id;
            return (
              <button
                key={student.id}
                onClick={() => handleToggle(student.id)}
                disabled={isToggling}
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all text-left group active:scale-[0.98] ${
                  student.present
                    ? 'bg-emerald-50/70 border-emerald-300/80 hover:bg-emerald-100/60 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
                title={`Click to mark ${student.present ? 'Absent' : 'Present'}`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Roll Number Pill */}
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      student.present
                        ? 'bg-emerald-200/70 text-emerald-900'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {String(student.id).padStart(2, '0')}
                  </span>

                  {/* Student Name */}
                  <div className="truncate">
                    <span
                      className={`text-xs font-bold block truncate ${
                        student.present ? 'text-slate-900' : 'text-slate-500 line-through'
                      }`}
                    >
                      {language === 'gu' ? student.nameGu : student.nameEn}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      {student.age} • {language === 'gu' ? student.nameEn : student.nameGu}
                    </span>
                  </div>
                </div>

                {/* Present Action Checkmark / Toggle Button */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-transform ${
                    isToggling ? 'animate-spin border-emerald-500' : ''
                  } ${
                    student.present
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-xs group-hover:scale-110'
                      : 'bg-white border-slate-300 text-slate-300 group-hover:border-slate-400'
                  }`}
                >
                  {student.present ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <X className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sync Footer Note */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>
          {language === 'gu'
            ? '💡 હાજરી ટૉગલ કરવા ક્લિક કરો — વર્કર એપ સાથે સીધું RTDB સિંક થાય છે'
            : '💡 Click to toggle attendance — instantly syncs with workers app via RTDB'}
        </span>
        <span className="font-semibold text-emerald-700">
          {Math.round((presentCount / (attendance.records.length || 1)) * 100)}% {language === 'gu' ? 'હાજરી' : 'Present'}
        </span>
      </div>
    </div>
  );
};
