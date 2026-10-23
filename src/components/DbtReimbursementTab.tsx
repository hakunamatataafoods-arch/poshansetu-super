import React, { useState } from 'react';
import {
  Receipt,
  CheckCircle2,
  Clock,
  RotateCcw,
  ExternalLink,
  Plus,
  Eye,
  CreditCard,
  DollarSign,
} from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';

interface DbtReimbursementTabProps {
  currentCentre: AnganwadiCentre;
  language: 'gu' | 'en';
}

interface ClaimItem {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  centre: string;
  timeStr: string;
  vendorName: string;
  category: 'Vegetables' | 'LPG Cylinder' | 'Sanitization' | 'Spices';
  categoryGu: string;
  amount: number;
  workerRemark: string;
  workerRemarkGu: string;
  status: 'PENDING' | 'APPROVED' | 'DISBURSED' | 'REUPLOAD';
  dbtRef?: string;
  receiptThumb: string;
}

export const DbtReimbursementTab: React.FC<DbtReimbursementTabProps> = ({
  currentCentre,
  language,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'DISBURSED' | 'REUPLOAD'>('ALL');
  const [selectedReceipt, setSelectedReceipt] = useState<ClaimItem | null>(null);

  const [claims, setClaims] = useState<ClaimItem[]>([
    {
      id: 'claim-1',
      invoiceNo: 'INV-SRV-2026-487',
      invoiceDate: '2026-10-21',
      centre: '04-Vadtal',
      timeStr: 'Yesterday, 02:45 PM',
      vendorName: 'Shri Ram Vegetable Mart, Subzi Mandi',
      category: 'Vegetables',
      categoryGu: 'તાજા શાકભાજી',
      amount: 295.0,
      workerRemark: 'Purchased fresh spinach, tomatoes, and pumpkin for midday vegetable khichdi.',
      workerRemarkGu: 'બપોરના ભોજનની ખીચડી માટે તાજી પાલક, ટામેટાં અને કોળું ખરીદ્યા.',
      status: 'PENDING',
      receiptThumb: 'https://images.unsplash.com/photo-1554415707-9e44667ff462?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'claim-2',
      invoiceNo: 'GAS-IND-451029',
      invoiceDate: '2026-10-19',
      centre: '04-Vadtal',
      timeStr: '19 Oct 2026, 04:10 PM',
      vendorName: 'Shri Vinayak Indane Gas Agency, Anand',
      category: 'LPG Cylinder',
      categoryGu: 'ઘરેલું ગેસ સિલિન્ડર',
      amount: 1128.0,
      workerRemark:
        '14.2 kg domestic LPG cylinder refill for cooking. Verified receipt against LPG counterfoil. Approved for DBT transfer. Ref: DBT-WCD-GJ-98214',
      workerRemarkGu:
        '૧૪.૨ કિગ્રા ઘરેલું રાંધણગેસ સિલિન્ડર રિફિલ. રસીદ ચકાસાયેલ છે. DBT ટ્રાન્સફર માટે મંજૂર. સંદર્ભ: DBT-WCD-GJ-98214',
      status: 'APPROVED',
      dbtRef: 'DBT-WCD-GJ-98214',
      receiptThumb: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=150&auto=format&fit=crop&q=80',
    },
  ]);

  const handleApprove = (id: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'APPROVED',
              dbtRef: `DBT-WCD-GJ-${Math.floor(10000 + Math.random() * 90000)}`,
              workerRemark: `${c.workerRemark} [Approved by Supervisor Shardaben Shah]`,
            }
          : c
      )
    );
  };

  const handleMarkDisbursed = (id: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'DISBURSED',
            }
          : c
      )
    );
  };

  const handleReupload = (id: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'REUPLOAD',
              workerRemark: `${c.workerRemark} [Re-upload requested]`,
            }
          : c
      )
    );
  };

  const totalAmount = claims.reduce((acc, c) => acc + c.amount, 0);

  const pendingCount = claims.filter((c) => c.status === 'PENDING').length;
  const approvedCount = claims.filter((c) => c.status === 'APPROVED').length;
  const disbursedCount = claims.filter((c) => c.status === 'DISBURSED').length;
  const reuploadCount = claims.filter((c) => c.status === 'REUPLOAD').length;

  const filteredClaims = claims.filter((c) => {
    if (activeFilter === 'ALL') return true;
    return c.status === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Card with Total Claims */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white via-orange-50/20 to-white">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {language === 'gu'
              ? 'સ્થાનિક ખરીદી અને DBT બિલ રિઇમ્બર્સમેન્ટ પોર્ટલ'
              : 'Local Field Purchase & DBT Reimbursement Portal'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'gu'
              ? 'બિન-સરકારી વિક્રેતા દાવાઓ (શાકભાજી, ગેસ સિલિન્ડર, સ્વચ્છતા) - આંગણવાડી કાર્યકરોને સીધા ખાતામાં ચૂકવણી'
              : 'Non-government vendor claims (vegetables, gas cylinder, sanitization) for direct transfer · Direct Benefit Transfer (DBT) clearance to Anganwadi Workers'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200 rounded-2xl px-5 py-2.5 text-right shrink-0 shadow-2xs">
          <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
            {language === 'gu' ? 'કુલ દાવા રકમ' : 'TOTAL CLAIMS LISTED'}
          </span>
          <span className="text-2xl font-black text-slate-900 font-mono">
            ₹{totalAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
            activeFilter === 'ALL'
              ? 'bg-[#0B6E4F] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {language === 'gu' ? `તમામ દાવાઓ (${claims.length})` : `All Claims (${claims.length})`}
        </button>
        <button
          onClick={() => setActiveFilter('PENDING')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
            activeFilter === 'PENDING'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {language === 'gu' ? `મંજૂરી બાકી (${pendingCount})` : `Pending Approval (${pendingCount})`}
        </button>
        <button
          onClick={() => setActiveFilter('APPROVED')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
            activeFilter === 'APPROVED'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {language === 'gu' ? `DBT મંજૂર (${approvedCount})` : `Approved for DBT (${approvedCount})`}
        </button>
        <button
          onClick={() => setActiveFilter('DISBURSED')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
            activeFilter === 'DISBURSED'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {language === 'gu' ? `ચૂકવેલ (${disbursedCount})` : `Disbursed (${disbursedCount})`}
        </button>
        <button
          onClick={() => setActiveFilter('REUPLOAD')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
            activeFilter === 'REUPLOAD'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {language === 'gu' ? `પુનઃ અપલોડ (${reuploadCount})` : `Re-upload Requested (${reuploadCount})`}
        </button>
      </div>

      {/* 3. Claims Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">{language === 'gu' ? 'બિલ રસીદ' : 'Receipt Slip'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'ઇનવોઇસ #' : 'Invoice #'}</th>
                <th className="py-3 px-3">{language === 'gu' ? 'આંગણવાડી કેન્દ્ર' : 'AWC Centre'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'વિક્રેતા અને શ્રેણી' : 'Vendor Name & Category'}</th>
                <th className="py-3 px-3">{language === 'gu' ? 'રકમ' : 'Amount'}</th>
                <th className="py-3 px-5 max-w-xs">{language === 'gu' ? 'કાર્યકર નોંધ' : 'Worker Remark'}</th>
                <th className="py-3 px-3 text-center">{language === 'gu' ? 'સ્થિતિ' : 'Status'}</th>
                <th className="py-3 px-4 text-center">{language === 'gu' ? 'સમીક્ષા ક્રિયા' : 'Review Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedReceipt(claim)}
                      className="w-12 h-12 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 block hover:ring-2 hover:ring-emerald-500 transition-all cursor-pointer shadow-2xs"
                    >
                      <img
                        src={claim.receiptThumb}
                        alt="Receipt"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-900 block">
                      {claim.invoiceNo}
                    </span>
                    <span className="text-[10px] text-slate-400">Date: {claim.invoiceDate}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 block">{claim.centre}</span>
                    <span className="text-[10px] text-slate-500">{claim.timeStr}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{claim.vendorName}</div>
                    <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                      {language === 'gu' ? claim.categoryGu : claim.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-mono font-black text-slate-900 whitespace-nowrap text-sm">
                    ₹{claim.amount.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-5 text-slate-600 text-[11px] leading-relaxed max-w-xs font-medium">
                    {language === 'gu' ? claim.workerRemarkGu : claim.workerRemark}
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    {claim.status === 'PENDING' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-800 text-[11px] font-bold shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {language === 'gu' ? 'મંજૂરી બાકી' : 'Pending Approval'}
                      </span>
                    )}
                    {claim.status === 'APPROVED' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-bold shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {language === 'gu' ? 'DBT મંજૂર' : 'Approved for DBT'}
                      </span>
                    )}
                    {claim.status === 'DISBURSED' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-blue-300 bg-blue-50 text-blue-800 text-[11px] font-bold shadow-2xs">
                        <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                        {language === 'gu' ? 'ચૂકવેલ' : 'Disbursed'}
                      </span>
                    )}
                    {claim.status === 'REUPLOAD' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-red-300 bg-red-50 text-red-800 text-[11px] font-bold shadow-2xs">
                        {language === 'gu' ? 'પુનઃ અપલોડ' : 'Re-upload Req.'}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {claim.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleApprove(claim.id)}
                            className="bg-[#0B6E4F] hover:bg-[#074D37] text-white font-bold text-[11px] px-3.5 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                          >
                            {language === 'gu' ? 'મંજૂર કરો' : 'Approve DBT'}
                          </button>
                          <button
                            onClick={() => handleReupload(claim.id)}
                            className="border border-red-300 hover:bg-red-50 text-red-700 font-bold text-[11px] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                          >
                            {language === 'gu' ? 'પુનઃ મોકલો' : 'Re-upload'}
                          </button>
                        </>
                      )}
                      {claim.status === 'APPROVED' && (
                        <button
                          onClick={() => handleMarkDisbursed(claim.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
                        >
                          {language === 'gu' ? 'ચૂકવણી પૂર્ણ કરો' : 'Mark Disbursed'}
                        </button>
                      )}
                      {claim.status === 'DISBURSED' && (
                        <span className="text-[11px] font-bold text-slate-400">
                          {language === 'gu' ? 'સંપન્ન' : 'Completed'}
                        </span>
                      )}
                      {claim.status === 'REUPLOAD' && (
                        <span className="text-[11px] font-bold text-red-500">
                          {language === 'gu' ? 'કાર્યકર પ્રતીક્ષા' : 'Awaiting Worker'}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Preview Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedReceipt.invoiceNo}
                </h3>
                <p className="text-xs text-slate-500">{selectedReceipt.vendorName}</p>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 max-h-80 bg-slate-100 flex items-center justify-center">
              <img
                src={selectedReceipt.receiptThumb}
                alt="Receipt Slip"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4 p-3.5 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'gu' ? 'રકમ:' : 'Amount:'}</span>
                <span className="font-bold font-mono">₹{selectedReceipt.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'gu' ? 'તારીખ:' : 'Date:'}</span>
                <span>{selectedReceipt.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'gu' ? 'શ્રેણી:' : 'Category:'}</span>
                <span className="font-semibold">
                  {language === 'gu' ? selectedReceipt.categoryGu : selectedReceipt.category}
                </span>
              </div>
              <div className="pt-1.5 text-[11px] text-slate-500 border-t border-slate-200">
                {language === 'gu' ? selectedReceipt.workerRemarkGu : selectedReceipt.workerRemark}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                {language === 'gu' ? 'બંધ કરો' : 'Close Preview'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
