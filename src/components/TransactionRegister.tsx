import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, MapPin, User, Package, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { AnganwadiCentre, TransactionHistoryItem } from '../types/poshan';

interface TransactionRegisterProps {
  transactions: TransactionHistoryItem[];
  centre: AnganwadiCentre;
  language: 'gu' | 'en';
}

export const TransactionRegister: React.FC<TransactionRegisterProps> = ({
  transactions,
  centre,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter and search logic
  const filteredList = useMemo(() => {
    return transactions.filter((item) => {
      // Action Filter
      if (actionFilter === 'INWARD') {
        const isIngress =
          item.lastAction.includes('Inward') ||
          item.lastAction.includes('આવક') ||
          item.change > 0;
        if (!isIngress) return false;
      } else if (actionFilter === 'DISTRIBUTION') {
        const isEgress =
          Boolean(item.beneficiary) ||
          item.lastAction.includes('Distribution') ||
          item.lastAction.includes('વિતરણ') ||
          item.change < 0;
        if (!isEgress) return false;
      } else if (actionFilter === 'BENEFICIARY_ONLY') {
        if (!item.beneficiary) return false;
      }

      // Search Filter
      if (!searchTerm) return true;
      const lower = searchTerm.toLowerCase();
      const matchBeneficiary = (item.beneficiary || '').toLowerCase().includes(lower);
      const matchCategory = (item.beneficiaryCategory || '').toLowerCase().includes(lower);
      const matchItems = (item.itemsSummary || '').toLowerCase().includes(lower);
      const matchVillage = (item.village || '').toLowerCase().includes(lower);
      const matchAction = (item.lastAction || '').toLowerCase().includes(lower);
      const matchWorker = (item.workerName || '').toLowerCase().includes(lower);
      const matchCommodity = (item.commodity || '').toLowerCase().includes(lower);
      const matchNote = (item.note || '').toLowerCase().includes(lower);

      return (
        matchBeneficiary ||
        matchCategory ||
        matchItems ||
        matchVillage ||
        matchAction ||
        matchWorker ||
        matchCommodity ||
        matchNote
      );
    });
  }, [transactions, actionFilter, searchTerm]);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatTimestamp = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      const datePart = date.toLocaleDateString('en-GB'); // 21/10/2026
      const timePart = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      return `${datePart}, ${timePart.toLowerCase()}`;
    } catch {
      return '21/10/2026, 2:58:59 pm';
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm mt-5">
      {/* Header and Filter Row matching Screenshot 2 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>
                {language === 'gu'
                  ? 'રીઅલ-ટાઇમ સ્ટોક ટ્રાન્ઝેક્શન્સ અને ઓડિટ રજિસ્ટર'
                  : 'Real-time Stock Transactions & Audit Register'}
              </span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                Worker App Coordinated
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'gu'
              ? `સ્માર્ટફોન એપ દ્વારા લાભાર્થીઓને વિતરણ અને પ્રાપ્ત આવક સ્ટોકનો કાલક્રમિક લોગ — ${centre.nameGu} (${centre.code})`
              : `Itemized chronological log of all stock received (inward) and distributed to beneficiaries by smartphone app — ${centre.nameEn} (${centre.code})`}
          </p>
        </div>

        {/* Search, Filter & Counter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Bar */}
          <div className="relative min-w-[240px] sm:min-w-[300px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                language === 'gu'
                  ? 'લાભાર્થીનું નામ, સામગ્રી અથવા ગામ શોધો...'
                  : 'Search beneficiary name, items, village or action...'
              }
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Action Filter */}
          <div className="relative">
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-3 pr-8 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 cursor-pointer"
            >
              <option value="ALL">{language === 'gu' ? 'બધી ક્રિયાઓ (All Records)' : 'All Actions & Distributions'}</option>
              <option value="BENEFICIARY_ONLY">{language === 'gu' ? '👤 માત્ર લાભાર્થી વિતરણ (Beneficiaries)' : '👤 Beneficiary Distributions Only'}</option>
              <option value="INWARD">{language === 'gu' ? '↘ માત્ર સ્ટોક આવક (Inward Supply)' : '↘ Inward Supply Only'}</option>
              <option value="DISTRIBUTION">{language === 'gu' ? '↗ તમામ વપરાશ/વિતરણ (All Usage)' : '↗ All Usage & Distribution'}</option>
            </select>
          </div>

          {/* Records Counter Pill */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
            {filteredList.length} {language === 'gu' ? 'રેકોર્ડ્સ' : 'Records'}
          </div>
        </div>
      </div>

      {/* Transaction Table matching Screenshot 2 with Beneficiary & Distributed Items */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3 w-12">#</th>
              <th className="py-3 px-3">TIMESTAMP (IST)</th>
              <th className="py-3 px-3">CENTRE / VILLAGE NAME</th>
              <th className="py-3 px-3">ACTION & BENEFICIARY NAME</th>
              <th className="py-3 px-3">ITEMS DISTRIBUTED / COMMODITY</th>
              <th className="py-3 px-3 text-right">QUANTITY CHANGED</th>
              <th className="py-3 px-3 text-right">RESULTING STOCK BALANCE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {paginatedList.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  {language === 'gu'
                    ? 'કોઈ રેકોર્ડ મળ્યા નથી. ફિલ્ટર્સ તપાસો.'
                    : 'No transaction or distribution records found matching your filters.'}
                </td>
              </tr>
            ) : (
              paginatedList.map((item, index) => {
                const rowNumber = (currentPage - 1) * itemsPerPage + index + 1;
                const isInward =
                  item.change > 0 ||
                  item.lastAction.includes('Inward') ||
                  item.lastAction.includes('આવક');

                return (
                  <tr
                    key={item.id || index}
                    className="hover:bg-amber-50/20 transition-colors group"
                  >
                    {/* Index */}
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                      {rowNumber}
                    </td>

                    {/* Timestamp */}
                    <td className="py-3 px-3 text-slate-600 font-medium whitespace-nowrap">
                      {formatTimestamp(item.timestamp)}
                    </td>

                    {/* Centre / Village Name */}
                    <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.village || centre.nameEn}</span>
                      </div>
                    </td>

                    {/* Action Taken & Beneficiary Name */}
                    <td className="py-3 px-3">
                      {item.beneficiary ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                              <User className="w-3 h-3 text-purple-600" />
                              <span>{item.beneficiary}</span>
                            </span>
                            {item.beneficiaryCategory && (
                              <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                                {item.beneficiaryCategory}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            ↗ – Daily Distribution (THR)
                          </div>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border bg-sky-50 text-sky-700 border-sky-200">
                          {isInward ? (
                            <>
                              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                              <span className="text-emerald-700 font-bold">
                                + Stock Received (Inward)
                              </span>
                            </>
                          ) : (
                            <>
                              <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
                              <span>↗ – Daily Distribution (Usage)</span>
                            </>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Distributed Items / Commodity Breakdown */}
                    <td className="py-3 px-3">
                      {item.itemsSummary ? (
                        <div className="flex flex-wrap items-center gap-1.5 max-w-md">
                          {Object.entries(item.itemsDistributed || {}).map(([iName, iQty]) => (
                            <span
                              key={iName}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded"
                            >
                              <Package className="w-3 h-3 text-emerald-600" />
                              <span>{iName}: <strong>{iQty}</strong></span>
                            </span>
                          ))}
                        </div>
                      ) : item.commodity ? (
                        <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700">
                          <Package className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.commodity}</span>
                          {item.challanNo && (
                            <span className="text-[10px] text-slate-400">({item.challanNo})</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">
                          {item.note || 'Standard Ration Usage'}
                        </span>
                      )}
                    </td>

                    {/* Quantity Changed */}
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <span
                        className={`font-bold font-mono text-xs px-2 py-0.5 rounded ${
                          isInward
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            : 'text-blue-700 bg-blue-50 border border-blue-200'
                        }`}
                      >
                        {isInward ? `+${item.change} pkts` : `${item.change} pkts`}
                      </span>
                    </td>

                    {/* Resulting Stock Balance */}
                    <td className="py-3 px-3 text-right font-bold text-slate-900 font-mono whitespace-nowrap">
                      {item.balance} pkts
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">
            {language === 'gu'
              ? `પેજ ${currentPage} / ${totalPages} (${filteredList.length} કુલ એન્ટ્રીઓ)`
              : `Showing page ${currentPage} of ${totalPages} (${filteredList.length} total entries)`}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
