import React from 'react';
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  Calendar,
  Building,
  User,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';
import { DashboardData } from '../services/firebaseRtdb';

interface MprReportTabProps {
  currentCentre: AnganwadiCentre;
  dashboardData: DashboardData;
  onDownloadPdf: () => void;
  language: 'gu' | 'en';
}

export const MprReportTab: React.FC<MprReportTabProps> = ({
  currentCentre,
  dashboardData,
  onDownloadPdf,
  language,
}) => {
  const { inventory } = dashboardData;

  const exportCsv = () => {
    const rows = [
      ['Sr', 'Commodity', 'Unit', 'Opening Stock', 'Total Inward', 'Cooked Meal Usage', 'THR Distribution', 'Closing Balance'],
      ['1', 'Fortified Rice', 'kg', '40.0', '+50.0', '-56.5', '-0.0', `${inventory.rice || 33.5} kg`],
      ['2', 'Wheat Atta (Flour)', 'kg', '25.0', '+40.0', '-44.0', '-0.0', `${inventory.atta || 21.0} kg`],
      ['3', 'Fortified Edible Oil', 'liter', '10.0', '+15.0', '-14.5', '-0.0', `${inventory.oil || 10.5} liter`],
      ['4', 'Tuver Dal (Split Pea)', 'kg', '18.0', '+25.0', '-30.0', '-0.0', `${inventory.dal || 13.0} kg`],
      ['5', 'Bal Shakti THR (6m - 3y)', 'packets', '50.0', '+60.0', '-0.0', '-68.0', `${inventory.bal_shakti || 42.0} packets`],
      ['6', 'Matru Shakti THR (Mothers)', 'packets', '20.0', '+25.0', '-0.0', '-29.0', `${inventory.matru_shakti || 16.0} packets`],
      ['7', 'Purna Shakti THR (Girls)', 'packets', '15.0', '+20.0', '-0.0', '-27.0', `${inventory.purna_shakti || 8.0} packets`],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ICDS_MPR_Form3_${currentCentre.code}_Oct2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportItems = [
    {
      sr: 1,
      nameEn: 'Fortified Rice',
      nameGu: 'ફોર્ટિફાઇડ ચોખા',
      unitEn: 'kg',
      unitGu: 'કિગ્રા',
      opening: '40.0',
      inward: '+50.0',
      usage: '-56.5',
      distribution: '-0.0',
      closing: `${inventory.rice !== undefined ? inventory.rice : 33.5} kg`,
    },
    {
      sr: 2,
      nameEn: 'Wheat Atta (Flour)',
      nameGu: 'ઘઉંનો લોટ (આટો)',
      unitEn: 'kg',
      unitGu: 'કિગ્રા',
      opening: '25.0',
      inward: '+40.0',
      usage: '-44.0',
      distribution: '-0.0',
      closing: `${inventory.atta !== undefined ? inventory.atta : 21.0} kg`,
    },
    {
      sr: 3,
      nameEn: 'Fortified Edible Oil',
      nameGu: 'ફોર્ટિફાઇડ ખાદ્ય તેલ',
      unitEn: 'liter',
      unitGu: 'લિટર',
      opening: '10.0',
      inward: '+15.0',
      usage: '-14.5',
      distribution: '-0.0',
      closing: `${inventory.oil !== undefined ? inventory.oil : 10.5} liter`,
    },
    {
      sr: 4,
      nameEn: 'Tuver Dal (Split Pea)',
      nameGu: 'તુવેર દાળ',
      unitEn: 'kg',
      unitGu: 'કિગ્રા',
      opening: '18.0',
      inward: '+25.0',
      usage: '-30.0',
      distribution: '-0.0',
      closing: `${inventory.dal !== undefined ? inventory.dal : 13.0} kg`,
    },
    {
      sr: 5,
      nameEn: 'Bal Shakti THR (6m - 3y)',
      nameGu: 'બાલ શક્તિ THR (૬ માસ - ૩ વર્ષ)',
      unitEn: 'packets',
      unitGu: 'પેકેટ્સ',
      opening: '50.0',
      inward: '+60.0',
      usage: '-0.0',
      distribution: '-68.0',
      closing: `${inventory.bal_shakti !== undefined ? inventory.bal_shakti : 42.0} packets`,
    },
    {
      sr: 6,
      nameEn: 'Matru Shakti THR (Mothers)',
      nameGu: 'માતૃ શક્તિ THR (માતાઓ)',
      unitEn: 'packets',
      unitGu: 'પેકેટ્સ',
      opening: '20.0',
      inward: '+25.0',
      usage: '-0.0',
      distribution: '-29.0',
      closing: `${inventory.matru_shakti !== undefined ? inventory.matru_shakti : 16.0} packets`,
    },
    {
      sr: 7,
      nameEn: 'Purna Shakti THR (Girls)',
      nameGu: 'પૂર્ણા શક્તિ THR (કિશોરીઓ)',
      unitEn: 'packets',
      unitGu: 'પેકેટ્સ',
      opening: '15.0',
      inward: '+20.0',
      usage: '-0.0',
      distribution: '-27.0',
      closing: `${inventory.purna_shakti !== undefined ? inventory.purna_shakti : 8.0} packets`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Export Buttons */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white via-indigo-50/20 to-white">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {language === 'gu'
                ? 'ICDS માસિક પ્રગતિ અહેવાલ (MPR) — ફોર્મ નં. ૩'
                : 'ICDS Monthly Progress Report (MPR)'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'gu'
              ? 'ફોર્મ-૩ વૈધાનિક સામગ્રી સંતુલન પત્રક અને પોષણ વિતરણ ઓડિટ · અધિકૃત સરકારી ઓડિટ શીટ'
              : 'Form-3 statutory commodity balance sheet and nutritional distribution audit · Official Government Form-3 audit sheet'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={exportCsv}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>{language === 'gu' ? 'Excel માં નિકાસ (CSV)' : 'Export Excel (CSV)'}</span>
          </button>
          <button
            onClick={onDownloadPdf}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0B6E4F] to-[#074D37] hover:from-[#074D37] hover:to-[#043324] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-emerald-900/15 cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'gu' ? 'અધિકૃત PDF ડાઉનલોડ કરો' : 'Download Official PDF'}</span>
          </button>
        </div>
      </div>

      {/* 2. Official Government Form 3 Sheet Document Preview */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 max-w-5xl mx-auto space-y-6 text-slate-800">
        {/* Government Emblem & Header */}
        <div className="text-center pb-5 border-b border-slate-200">
          <div className="w-14 h-14 mx-auto mb-2">
            <img
              src="/poshan-setu-logo.svg"
              alt="Poshan Setu"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/poshan-logo.png';
              }}
            />
          </div>
          <div className="text-xs font-black tracking-widest text-[#F27A1A] uppercase">
            Poshan <span className="text-[#0B6E4F]">Setu</span>
          </div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">
            {language === 'gu'
              ? 'ગુજરાત સરકાર · મહિલા અને બાળ વિકાસ વિભાગ (ICDS મિશન)'
              : 'GOVERNMENT OF GUJARAT · ICDS MISSION'}
          </div>
          <div className="text-xs font-black text-slate-800 uppercase tracking-wider mt-1">
            {language === 'gu'
              ? 'મહિલા અને બાળ વિકાસ વિભાગ · ગુજરાત સરકાર'
              : 'WOMEN & CHILD DEVELOPMENT DEPARTMENT · GUJARAT'}
          </div>
          <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            INTEGRATED CHILD DEVELOPMENT SERVICES (ICDS)
          </h1>
          <p className="text-xs font-extrabold text-slate-700 mt-0.5">
            {language === 'gu'
              ? 'માસિક પ્રગતિ અહેવાલ (MPR) — ફોર્મ નં. ૩ (સામગ્રી અને THR બેલેન્સ શીટ)'
              : 'MONTHLY PROGRESS REPORT (MPR) — FORM NO. 3 (COMMODITY & THR BALANCE SHEET)'}
          </p>

          <div className="text-xs font-semibold text-slate-600 mt-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>
              {language === 'gu' ? 'જિલ્લો: ' : 'District: '}
              <strong>{language === 'gu' ? 'આણંદ (૦૭)' : 'Anand (07)'}</strong>
            </span>
            <span>•</span>
            <span>
              {language === 'gu' ? 'તાલુકો: ' : 'Taluka: '}
              <strong>{language === 'gu' ? 'આણંદ ગ્રામ્ય' : 'Anand Rural'}</strong>
            </span>
            <span>•</span>
            <span>
              {language === 'gu' ? 'સેક્ટર સર્કલ: ' : 'Sector Circle: '}
              <strong>{language === 'gu' ? 'સર્કલ ૦૪' : 'Circle 04'}</strong>
            </span>
            <span>•</span>
            <span>
              {language === 'gu' ? 'માસ: ' : 'Month: '}
              <strong>{language === 'gu' ? 'ઓક્ટોબર ૨૦૨૬' : 'October 2026'}</strong>
            </span>
          </div>
        </div>

        {/* 4 Metadata Info Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">
              {language === 'gu' ? 'સુપરવાઇઝર:' : 'Supervisor:'}
            </span>
            <span className="font-extrabold text-slate-900">
              {language === 'gu' ? 'શ્રીમતી શારદાબેન શાહ' : 'Smt. Shardaben Shah'}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">
              {language === 'gu' ? 'ઓડિટ કેન્દ્ર:' : 'Audited Centres:'}
            </span>
            <span className="font-extrabold text-slate-900">
              {language === 'gu' ? currentCentre.nameGu : currentCentre.nameEn}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 uppercase block font-bold">
              {language === 'gu' ? 'લાભાર્થી પહોંચ:' : 'Beneficiaries Reached:'}
            </span>
            <span className="font-extrabold text-slate-900">
              {language === 'gu' ? '૧૮૨ બાળકો / ૫૩ માતાઓ' : '182 Children / 53 Mothers'}
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
            <span className="text-[10px] text-emerald-800 uppercase block font-bold">
              {language === 'gu' ? 'ઓડિટ સ્થિતિ:' : 'Audit Status:'}
            </span>
            <span className="font-extrabold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'gu' ? 'ચકાસાયેલ અને મેળવેલ' : 'Verified & Reconciled'}
            </span>
          </div>
        </div>

        {/* Form No. 3 Balance Sheet Table */}
        <div className="border border-slate-300 rounded-xl overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-extrabold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 text-center w-12 border-r border-slate-200">
                  {language === 'gu' ? 'ક્રમ' : 'Sr.'}
                </th>
                <th className="py-3 px-4 border-r border-slate-200">
                  {language === 'gu' ? 'સામગ્રીનું નામ' : 'Commodity'}
                </th>
                <th className="py-3 px-3 border-r border-slate-200">
                  {language === 'gu' ? 'એકમ' : 'Unit'}
                </th>
                <th className="py-3 px-3 text-right border-r border-slate-200">
                  {language === 'gu' ? 'શરૂઆતનો સ્ટોક (૧લી)' : 'Opening Stock (1st)'}
                </th>
                <th className="py-3 px-3 text-right border-r border-slate-200">
                  {language === 'gu' ? 'કુલ આવક (GSCSC)' : 'Total Inward (GSCSC)'}
                </th>
                <th className="py-3 px-3 text-right border-r border-slate-200">
                  {language === 'gu' ? 'રાંધેલ ભોજન વપરાશ' : 'Cooked Meal Usage'}
                </th>
                <th className="py-3 px-3 text-right border-r border-slate-200">
                  {language === 'gu' ? 'THR વિતરણ' : 'THR Distribution'}
                </th>
                <th className="py-3 px-4 text-right bg-emerald-50/60 font-black text-slate-900">
                  {language === 'gu' ? 'આખર સ્ટોક બેલેન્સ' : 'Closing Balance'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {reportItems.map((item) => (
                <tr key={item.sr} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 text-center border-r border-slate-200 text-slate-500 font-sans">
                    {item.sr}
                  </td>
                  <td className="py-3 px-4 font-sans font-bold text-slate-900 border-r border-slate-200">
                    {language === 'gu' ? item.nameGu : item.nameEn}
                  </td>
                  <td className="py-3 px-3 border-r border-slate-200 text-slate-600 font-sans">
                    {language === 'gu' ? item.unitGu : item.unitEn}
                  </td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 text-slate-700 font-bold">
                    {item.opening}
                  </td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 font-black text-emerald-700">
                    {item.inward}
                  </td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 font-bold text-amber-700">
                    {item.usage}
                  </td>
                  <td className="py-3 px-3 text-right border-r border-slate-200 font-bold text-red-700">
                    {item.distribution}
                  </td>
                  <td className="py-3 px-4 text-right font-black text-slate-900 bg-emerald-50/40 text-sm">
                    {item.closing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 Summary Statistic Metric Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-2xs">
            <div className="text-[11px] text-slate-500 font-bold">
              {language === 'gu' ? 'પીરસાયેલ ગરમ ભોજન (માસિક)' : 'Cooked Meals Served (Month)'}
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">942 meals</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {language === 'gu' ? 'સરેરાશ ૩૯.૨ બાળકો/દિવસ વડતાલમાં' : 'Average 39.2 children / day in Vadtal'}
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-2xs">
            <div className="text-[11px] text-slate-500 font-bold">
              {language === 'gu' ? 'વિતરણ કરેલ THR રાશન' : 'THR Take-Home Ration Delivered'}
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">124 packets</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {language === 'gu' ? '૧૦૦% સગર્ભા અને ધાત્રી માતાઓ આવરી લીધી' : '100% pregnant & lactating mothers covered'}
            </div>
          </div>
          <div className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-2xs">
            <div className="text-[11px] text-slate-500 font-bold">
              {language === 'gu' ? 'ઓડિટ થયેલ DBT દાવા રકમ' : 'Reimbursement Claims Audited'}
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-mono">₹2,443.00</div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {language === 'gu' ? 'શાકભાજી, મસાલા અને ઘરેલું ગેસ સિલિન્ડર' : 'Vegetables, spices & domestic LPG cylinders'}
            </div>
          </div>
        </div>

        {/* Signatures & Statutory Certification */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <div className="text-[11px] text-slate-400 font-bold">
              {language === 'gu' ? 'ચકાસણી કરનાર આંગણવાડી કાર્યકર:' : 'Verified by Anganwadi Worker:'}
            </div>
            <div className="font-extrabold text-slate-900 text-sm mt-0.5">
              {language === 'gu' ? 'શ્રીમતી ભાવનાબેન પટેલ' : 'Smt. BhavnaBen Patel'}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {language === 'gu' ? 'કાર્યકર, ૦૪ વડતાલ આંગણવાડી કેન્દ્ર' : 'AWW, 04 Vadtal Anganwadi Centre'}
            </div>
            <div className="text-[10px] text-slate-400 mt-2 font-mono">
              {language === 'gu' ? 'ભૌતિક સ્ટોક લેજર પર સહી તારીખ: ૨૨-૧૦-૨૦૨૬' : 'Countersigned on store physical stock ledger: 22-10-2026'}
            </div>
          </div>
          <div className="md:text-right">
            <div className="text-[11px] text-slate-400 font-bold">
              {language === 'gu' ? 'મંજૂર અને પ્રમાણિત કરનાર:' : 'Approved & Certified by:'}
            </div>
            <div className="font-extrabold text-slate-900 text-sm mt-0.5">
              {language === 'gu' ? 'શ્રીમતી શારદાબેન શાહ' : 'Smt. Shardaben Shah'}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              {language === 'gu'
                ? 'આંગણવાડી સુપરવાઇઝર (મુખ્ય સેવિકા), આણંદ ગ્રામ્ય સર્કલ ૦૪'
                : 'Anganwadi Supervisor (Mukhya Sevika), Anand Rural Circle 04'}
            </div>
            <div className="text-[10px] text-emerald-700 mt-2 font-mono font-bold">
              Digital Signature ID: GJ-ICDS-AND-2026-9941 • CDPO Anand Rural
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
