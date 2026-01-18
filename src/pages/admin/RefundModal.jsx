import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CreditCard, Landmark, ArrowRight } from 'lucide-react';

const RefundModal = ({ isOpen, onClose, record, onConfirm }) => {
  if (!isOpen || !record) return null;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [amount, setAmount] = useState(record.paid_amount);
  const [reason, setReason] = useState('customer_cancelled');
  const [notes, setNotes] = useState('');
  
  // Manual Refund Details
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    reference: ''
  });

  const isManual = record.provider === 'manual';

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onConfirm({
        amount,
        reason,
        notes,
        method: isManual ? 'manual_transfer' : 'original_source',
        bankDetails: isManual ? bankDetails : null
      });
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-900 border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Issue Refund
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/20 uppercase">
                {record.order_status}
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">Order #{record.order_id.substring(0,8)} • {record.email}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          
          {/* 1. Amount Check */}
          <div className="bg-dark-950 p-4 rounded-xl border border-white/10">
             <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Refund Amount</label>
             <div className="flex items-center gap-3">
                <span className="text-2xl text-slate-500">$</span>
                <input 
                  type="number" 
                  value={amount} 
                  max={record.paid_amount}
                  onChange={e => setAmount(e.target.value)}
                  className="bg-transparent text-3xl font-bold text-white w-full outline-none border-none p-0 focus:ring-0"
                />
             </div>
             <div className="h-px bg-white/10 my-2"></div>
             <div className="flex justify-between text-xs text-slate-400">
                <span>Max Refundable:</span>
                <span>${record.paid_amount}</span>
             </div>
          </div>

          {/* 2. Refund Destination Logic */}
          <div>
             <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Destination</label>
             {isManual ? (
               <div className="space-y-3">
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg flex gap-3">
                     <AlertTriangle className="text-orange-400 shrink-0" size={20} />
                     <p className="text-xs text-orange-200">
                       Original payment was <b>Manual/Cash</b>. You must manually transfer funds to the customer and record details here.
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="col-span-2">
                        <input 
                          placeholder="Beneficiary Bank Name" 
                          className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-brand-glow outline-none"
                          value={bankDetails.bankName}
                          onChange={e => setBankDetails({...bankDetails, bankName: e.target.value})}
                        />
                     </div>
                     <input 
                        placeholder="Account Number" 
                        className="bg-dark-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-brand-glow outline-none"
                        value={bankDetails.accountNumber}
                        onChange={e => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                     />
                     <input 
                        placeholder="Transaction Ref ID" 
                        className="bg-dark-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-brand-glow outline-none"
                        value={bankDetails.reference}
                        onChange={e => setBankDetails({...bankDetails, reference: e.target.value})}
                     />
                  </div>
               </div>
             ) : (
               <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-emerald-500/20 rounded text-emerald-400">
                        <CreditCard size={20} />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-white">Original Payment Method</p>
                        <p className="text-xs text-emerald-400/80">Refund will be sent to card ending in ****</p>
                     </div>
                  </div>
                  <CheckmarkIcon />
               </div>
             )}
          </div>

          {/* 3. Reason & Notes */}
          <div className="grid grid-cols-1 gap-4">
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Reason</label>
                <select 
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-brand-glow outline-none appearance-none"
                >
                   <option value="customer_cancelled">Customer Cancelled Request</option>
                   <option value="return_processed">Item Returned</option>
                   <option value="defective">Item Defective / Damaged</option>
                   <option value="fraud">Suspected Fraud</option>
                   <option value="other">Other</option>
                </select>
             </div>
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Internal Notes</label>
                <textarea 
                  rows="2"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Optional notes for the finance team..."
                  className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-brand-glow outline-none resize-none"
                />
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-dark-950 flex justify-end gap-3">
           <button onClick={onClose} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
             Cancel
           </button>
           <button 
             onClick={handleSubmit}
             disabled={loading || (isManual && !bankDetails.accountNumber)}
             className="px-6 py-3 rounded-xl text-sm font-bold text-dark-900 bg-white hover:bg-slate-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {loading ? 'Processing...' : `Confirm Refund $${amount}`}
             {!loading && <ArrowRight size={16} />}
           </button>
        </div>
      </div>
    </div>
  );
};

const CheckmarkIcon = () => (
  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-dark-900"><polyline points="20 6 9 17 4 12"></polyline></svg>
  </div>
);

export default RefundModal;