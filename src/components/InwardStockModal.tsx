import React, { useState } from 'react';
import { X, PackagePlus, Truck, Check, AlertCircle } from 'lucide-react';
import { AnganwadiCentre } from '../types/poshan';

interface InwardStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  centre: AnganwadiCentre;
  onSubmitInward: (data: {
    challanNo: string;
    commodity: string;
    quantity: number;
    supplier: string;
    expiryDate: string;
  }) => Promise<void>;
  language: 'gu' | 'en';
}

export const InwardStockModal: React.FC<InwardStockModalProps> = ({
  isOpen,
  onClose,
  centre,
  onSubmitInward,
  language,
}) => {
  const [challanNo, setChallanNo] = useState(`CH-2026/${Math.floor(800 + Math.random() * 200)}`);
  const [commodity, setCommodity] = useState('Balbhog Packet (500g)');
  const [quantity, setQuantity] = useState(50);
  const [supplier, setSupplier] = useState('Taluka Central Civil Supplies Godown, Anand');
  const [expiryDate, setExpiryDate] = useState('Aug 2027');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmitInward({
        challanNo,
        commodity,
        quantity: Number(quantity),
        supplier,
        expiryDate,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PackagePlus className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                {language === 'gu' ? 'નવો સ્ટોક આવક નોંધણી (Inward Supply)' : 'Record Stock Inward Supply'}
              </h3>
              <p className="text-xs text-slate-400">
                {centre.nameEn} ({centre.code})
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {language === 'gu' ? 'ચલાન નંબર (Challan No)' : 'Delivery Challan No'}
            </label>
            <input
              type="text"
              required
              value={challanNo}
              onChange={(e) => setChallanNo(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {language === 'gu' ? 'સામગ્રી / વસ્તુ (Commodity)' : 'Commodity / Item'}
            </label>
            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 bg-white"
            >
              <option value="Balbhog Packet (500g)">Balbhog Packet (500g) [બાળ શક્તિ]</option>
              <option value="Matru Shakti (1kg)">Matru Shakti (1kg) [માતૃ શક્તિ]</option>
              <option value="Purna Shakti (1kg)">Purna Shakti (1kg) [પૂર્ણા શક્તિ]</option>
              <option value="Rice (Govt Stock)">Rice (Govt Stock) [ચોખા]</option>
              <option value="Toor Dal (Pulses)">Toor Dal (Pulses) [તુવેર દાળ]</option>
              <option value="Edible Oil (Fortified)">Edible Oil (Fortified) [તેલ]</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'gu' ? 'જથ્થો (Quantity)' : 'Quantity Received'}
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {language === 'gu' ? 'એક્સપાયરી તારીખ' : 'Batch Expiry'}
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-xs text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {language === 'gu' ? 'સપ્લાયર / ગોડાઉન' : 'Supplier / Source Godown'}
            </label>
            <input
              type="text"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs text-slate-800"
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-[11px] flex items-start gap-2">
            <Truck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>
              {language === 'gu'
                ? 'આ એન્ટ્રી સીધી RTDB માં સેવ થશે અને આંગણવાડી વર્કરના મોબાઈલમાં તુરંત અપડેટ દેખાશે.'
                : 'Submitting this inward challan directly synchronizes with Firebase RTDB and alerts the worker application.'}
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {language === 'gu' ? 'રદ કરો' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Syncing to RTDB...' : (language === 'gu' ? 'આવક કન્ફર્મ કરો' : 'Confirm Inward Stock')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
