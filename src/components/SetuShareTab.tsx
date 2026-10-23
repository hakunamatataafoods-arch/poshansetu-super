import React, { useState } from 'react';
import {
  ArrowLeftRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Plus,
  Key,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';

interface SetuShareTabProps {
  currentCentre: AnganwadiCentre;
  language: 'gu' | 'en';
}

interface TransferRecord {
  id: string;
  dateTime: string;
  fromCentreEn: string;
  fromCentreGu: string;
  fromEndpoint: string;
  toCentreEn: string;
  toCentreGu: string;
  toEndpoint: string;
  commodityQtyEn: string;
  commodityQtyGu: string;
  otpCode: string;
  reasonEn: string;
  reasonGu: string;
  borrowerNoteEn: string;
  borrowerNoteGu: string;
  status: 'ACTIVE' | 'SETTLED';
  settledDate?: string;
}

export const SetuShareTab: React.FC<SetuShareTabProps> = ({
  currentCentre,
  language,
}) => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [lendingFrom, setLendingFrom] = useState('04-Vadtal');
  const [borrowingTo, setBorrowingTo] = useState('02-Mogri');
  const [commodity, setCommodity] = useState('Fortified Rice');
  const [quantity, setQuantity] = useState('5');
  const [reason, setReason] = useState('Temporary delivery delay from godown');

  const [transfers, setTransfers] = useState<TransferRecord[]>([
    {
      id: 'tx-1',
      dateTime: '2026-10-21, 02:38 pm',
      fromCentreEn: '04-Vadtal',
      fromCentreGu: '૦૪-વડતાલ',
      fromEndpoint: 'awc_awvad04',
      toCentreEn: '02-Mogri',
      toEndpoint: 'awc_awvad02',
      toCentreGu: '૦૨-મોગરી',
      commodityQtyEn: '5 kg Fortified Rice',
      commodityQtyGu: '૫ કિગ્રા ફોર્ટિફાઇડ ચોખા',
      otpCode: '#8491',
      reasonEn: 'Mogri godown delivery was delayed by 1 day; borrowed for midday khichdi.',
      reasonGu: 'મોગરી ગોડાઉન ડિલિવરીમાં ૧ દિવસનો વિલંબ થયો હતો; બપોરની ખીચડી માટે ઉછીના લીધા.',
      borrowerNoteEn: 'By: Smt. Kokilaben Vankar (Borrower)',
      borrowerNoteGu: 'મેળવનાર: શ્રીમતી કોકિલાબેન વણકર',
      status: 'ACTIVE',
    },
    {
      id: 'tx-2',
      dateTime: '2026-10-18, 10:15 am',
      fromCentreEn: '03-Karamsad',
      fromCentreGu: '૦૩-કરમસદ',
      fromEndpoint: 'awc_awvad03',
      toCentreEn: '04-Vadtal',
      toCentreGu: '૦૪-વડતાલ',
      toEndpoint: 'awc_awvad04',
      commodityQtyEn: '2 liter Fortified Edible Oil',
      commodityQtyGu: '૨ લિટર ફોર્ટિફાઇડ ખાદ્ય તેલ',
      otpCode: '#6218',
      reasonEn: 'Emergency requirement during Saturday community feast.',
      reasonGu: 'શનિવારના સામુદાયિક ભોજન દરમિયાન કટોકટીની જરૂરિયાત.',
      borrowerNoteEn: 'By: Smt. BhavnaBen Patel (Borrower)',
      borrowerNoteGu: 'મેળવનાર: શ્રીમતી ભાવનાબેન પટેલ',
      status: 'SETTLED',
      settledDate: '2026-10-20',
    },
    {
      id: 'tx-3',
      dateTime: '2026-10-20, 04:00 pm',
      fromCentreEn: '04-Vadtal',
      fromCentreGu: '૦૪-વડતાલ',
      fromEndpoint: 'awc_awvad04',
      toCentreEn: '05-Samarkha',
      toCentreGu: '૦૫-સામરખા',
      toEndpoint: 'awc_awvad05',
      commodityQtyEn: '4 packets Bal Shakti THR Packets',
      commodityQtyGu: '૪ પેકેટ્સ બાલ શક્તિ THR',
      otpCode: '#3902',
      reasonEn: 'Two new twin infants enrolled suddenly; needed immediate starter rations.',
      reasonGu: 'બે નવા જોડિયા બાળકોનું અચાનક નામાંકન થયું; તાત્કાલિક પ્રારંભિક રાશનની જરૂર હતી.',
      borrowerNoteEn: 'By: Smt. Daxaben Parmar (Borrower)',
      borrowerNoteGu: 'મેળવનાર: શ્રીમતી દક્ષાબેન પરમાર',
      status: 'ACTIVE',
    },
  ]);

  const handleMarkReturned = (id: string) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    setTransfers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: 'SETTLED', settledDate: todayStr } : t
      )
    );
  };

  const handleAuthorizeTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const newOtp = `#${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateFormatted = `${now.toISOString().slice(0, 10)}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}`;

    const newRecord: TransferRecord = {
      id: `tx-${Date.now()}`,
      dateTime: dateFormatted,
      fromCentreEn: lendingFrom,
      fromCentreGu: lendingFrom,
      fromEndpoint: lendingFrom.toLowerCase().replace(/[^a-z0-9]/g, ''),
      toCentreEn: borrowingTo,
      toCentreGu: borrowingTo,
      toEndpoint: borrowingTo.toLowerCase().replace(/[^a-z0-9]/g, ''),
      commodityQtyEn: `${quantity} ${commodity.includes('Oil') ? 'liter' : commodity.includes('Packets') ? 'packets' : 'kg'} ${commodity}`,
      commodityQtyGu: `${quantity} ${commodity.includes('Oil') ? 'લિટર' : commodity.includes('Packets') ? 'પેકેટ્સ' : 'કિગ્રા'} ${commodity}`,
      otpCode: newOtp,
      reasonEn: reason,
      reasonGu: reason,
      borrowerNoteEn: 'Authorized by Supervisor Shardaben Shah',
      borrowerNoteGu: 'સુપરવાઇઝર શારદાબેન શાહ દ્વારા અધિકૃત',
      status: 'ACTIVE',
    };

    setTransfers([newRecord, ...transfers]);
    setShowTransferModal(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Card matching Screenshot 5 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white via-blue-50/20 to-white">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {language === 'gu'
                ? 'સેતુ શેર — આંગણવાડી કેન્દ્રો વચ્ચે ઈમરજન્સી ટ્રાન્સફર'
                : 'Setu Share — Inter-AWC Emergency Transfers'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {language === 'gu'
              ? 'ડ્યુઅલ OTP ચકાસણી (#8491) સાથે કેન્દ્રો વચ્ચે સામગ્રીની આપ-લે · શૂન્ય-સ્ટોક નિવારણ નેટવર્ક'
              : 'Peer-to-peer commodity borrowing and lending with dual OTP verification (#8491) · Zero-stock prevention network across Anand Rural Circle'}
          </p>
        </div>

        <button
          onClick={() => setShowTransferModal(true)}
          className="bg-gradient-to-r from-[#0B6E4F] to-[#074D37] hover:from-[#074D37] hover:to-[#043324] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-900/15 shrink-0 cursor-pointer active:scale-95"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>
            {language === 'gu' ? '+ ઈમરજન્સી ટ્રાન્સફર અધિકૃત કરો' : '+ Authorize Emergency Transfer'}
          </span>
        </button>
      </div>

      {/* 2. Active & Settled Ledgers Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
            {language === 'gu'
              ? 'સક્રિય અને પતાવટ થયેલ આંગણવાડી ટ્રાન્સફર લેજર'
              : 'Active & Settled Inter-AWC Commodity Ledgers'}
          </h3>
          <span className="text-xs font-bold text-slate-600 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
            {language === 'gu' ? `કુલ ${transfers.length} વ્યવહારો` : `Total ${transfers.length} transactions`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">{language === 'gu' ? 'તારીખ અને સમય' : 'Date & Time'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'આપનાર કેન્દ્ર (From)' : 'Lending Centre (From)'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'મેળવનાર કેન્દ્ર (To)' : 'Borrowing Centre (To)'}</th>
                <th className="py-3 px-4">{language === 'gu' ? 'ઉછીની સામગ્રી' : 'Lent Commodity'}</th>
                <th className="py-3 px-3 text-center">{language === 'gu' ? 'ડ્યુઅલ OTP કોડ' : 'Dual OTP Code'}</th>
                <th className="py-3 px-5 max-w-xs">{language === 'gu' ? 'તાત્કાલિક કારણ' : 'Urgent Reason'}</th>
                <th className="py-3 px-3 text-center">{language === 'gu' ? 'પતાવટ સ્થિતિ' : 'Settlement Status'}</th>
                <th className="py-3 px-4 text-center">{language === 'gu' ? 'ક્રિયા' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transfers.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                    {tx.dateTime}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-slate-900 block">
                      {language === 'gu' ? tx.fromCentreGu : tx.fromCentreEn}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{tx.fromEndpoint}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-slate-900 block">
                      {language === 'gu' ? tx.toCentreGu : tx.toCentreEn}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{tx.toEndpoint}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-emerald-800 text-sm block">
                      {language === 'gu' ? tx.commodityQtyGu : tx.commodityQtyEn}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 font-mono font-black text-amber-900 bg-amber-50 border border-amber-300 px-2.5 py-1 rounded-lg text-xs shadow-2xs">
                      <Key className="w-3.5 h-3.5 text-amber-600" />
                      {tx.otpCode}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 text-[11px] leading-relaxed max-w-xs font-medium">
                    <div>{language === 'gu' ? tx.reasonGu : tx.reasonEn}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {language === 'gu' ? tx.borrowerNoteGu : tx.borrowerNoteEn}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {tx.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-amber-800 text-[11px] font-bold shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {language === 'gu' ? 'સક્રિય ઉછીનું' : 'Active Borrowing'}
                      </span>
                    ) : (
                      <div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-bold shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {language === 'gu' ? 'પરત થયેલ' : 'Settled & Returned'}
                        </span>
                        {tx.settledDate && (
                          <span className="text-[9px] text-slate-400 block mt-0.5">
                            {tx.settledDate}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {tx.status === 'ACTIVE' ? (
                      <button
                        onClick={() => handleMarkReturned(tx.id)}
                        className="bg-[#0F291E] hover:bg-[#071710] text-white font-bold text-[11px] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
                      >
                        {language === 'gu' ? 'પરત નોંધો' : 'Mark Returned'}
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-bold">
                        {language === 'gu' ? 'બંધ થયેલ' : 'Closed'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Authorize Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {language === 'gu' ? 'સેતુ શેર ટ્રાન્સફર અધિકૃત કરો' : 'Authorize Setu Share Transfer'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'gu' ? 'આંગણવાડીઓ વચ્ચે સામગ્રી આપ-લે' : 'Peer-to-peer Anganwadi commodity transfer'}
                </p>
              </div>
              <button
                onClick={() => setShowTransferModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAuthorizeTransfer} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'gu' ? 'આપનાર કેન્દ્ર (From)' : 'From (Lending)'}
                  </label>
                  <select
                    value={lendingFrom}
                    onChange={(e) => setLendingFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white"
                  >
                    <option value="04-Vadtal">04-Vadtal (વડતાલ)</option>
                    <option value="02-Mogri">02-Mogri (મોગરી)</option>
                    <option value="03-Karamsad">03-Karamsad (કરમસદ)</option>
                    <option value="05-Samarkha">05-Samarkha (સામરખા)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'gu' ? 'મેળવનાર કેન્દ્ર (To)' : 'To (Borrowing)'}
                  </label>
                  <select
                    value={borrowingTo}
                    onChange={(e) => setBorrowingTo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white"
                  >
                    <option value="02-Mogri">02-Mogri (મોગરી)</option>
                    <option value="04-Vadtal">04-Vadtal (વડતાલ)</option>
                    <option value="03-Karamsad">03-Karamsad (કરમસદ)</option>
                    <option value="05-Samarkha">05-Samarkha (સામરખા)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'gu' ? 'સામગ્રી' : 'Commodity'}
                  </label>
                  <select
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white"
                  >
                    <option value="Fortified Rice">{language === 'gu' ? 'ચોખા' : 'Fortified Rice'}</option>
                    <option value="Wheat Atta">{language === 'gu' ? 'ઘઉંનો લોટ' : 'Wheat Atta'}</option>
                    <option value="Tuver Dal">{language === 'gu' ? 'તુવેર દાળ' : 'Tuver Dal'}</option>
                    <option value="Fortified Edible Oil">{language === 'gu' ? 'ખાદ્ય તેલ' : 'Fortified Edible Oil'}</option>
                    <option value="Bal Shakti THR Packets">{language === 'gu' ? 'બાલ શક્તિ પેકેટ્સ' : 'Bal Shakti THR Packets'}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {language === 'gu' ? 'જથ્થો' : 'Quantity'}
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'gu' ? 'તાત્કાલિક જરૂરિયાતનું કારણ' : 'Urgent Justification'}
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
                  rows={2}
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900">
                {language === 'gu'
                  ? 'બંને આંગણવાડી કાર્યકરોના મોબાઈલ હેન્ડસેટ પર તરત જ ૪-અંકનો સુરક્ષિત ડ્યુઅલ-OTP મોકલવામાં આવશે.'
                  : 'A 4-digit cryptographically secure Dual-OTP will be dispatched immediately to both Anganwadi Worker mobile handsets.'}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  {language === 'gu' ? 'રદ કરો' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B6E4F] hover:bg-[#074D37] text-white shadow-md shadow-emerald-900/15"
                >
                  {language === 'gu' ? 'ડ્યુઅલ OTP બનાવો અને અધિકૃત કરો' : 'Generate Dual OTP & Authorize'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
