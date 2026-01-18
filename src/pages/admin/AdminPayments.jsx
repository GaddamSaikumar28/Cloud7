
import React, { useEffect, useState } from 'react';
import { 
  DollarSign, RefreshCcw, AlertCircle, CheckCircle, 
  Search, CreditCard, Filter, ArrowUpRight, XCircle, 
  RotateCcw, Wallet, AlertTriangle, Loader2
} from 'lucide-react';
import { getFinancialRecords, processRefund, recordManualPayment } from '../../api/adminPaymentApi';
// import RefundModal from '../../components/admin/RefundModal';
import RefundModal from './RefundModal';
const AdminPayments = () => {
  // --- STATE ---
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  // Refund Modal State
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  // Manual Processing Lock
  const [processingId, setProcessingId] = useState(null);

  // --- LIFECYCLE ---
  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getFinancialRecords({ filterStatus: filter, search });
      setRecords(data);
    } catch (err) {
      console.error("Failed to load payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  // --- ACTIONS ---

  // 1. Initiate Refund (Opens Modal)
  const initiateRefund = (record) => {
    // Strict Gatekeeping: Only allow refund if order logic allows it
    const eligibleStatuses = ['cancelled', 'returned'];
    
    if (!eligibleStatuses.includes(record.order_status)) {
       alert(`⛔ Restriction: You cannot refund an active order.\n\nCurrent Status: ${record.order_status.toUpperCase()}\n\nPlease mark the order as 'Cancelled' or 'Returned' in the Order Management page first.`);
       return;
    }

    setSelectedRecord(record);
    setRefundModalOpen(true);
  };

  // 2. Confirm Refund (Called from Modal)
  const handleRefundConfirm = async (refundDetails) => {
    try {
      await processRefund(selectedRecord.order_id, selectedRecord.payment_id, refundDetails);
      setRefundModalOpen(false);
      setSelectedRecord(null);
      await loadData(); // Refresh table to show 'Refunded' status
      alert("Refund processed successfully.");
    } catch (err) {
      console.error(err);
      throw err; // Pass error back to modal for display
    }
  };

  // 3. Manual Payment (Wire/Cash)
  const handleManualPay = async (record) => {
    const confirmAmount = prompt(`Enter amount collected manually for Order #${record.order_id.substring(0,4)}:`, record.total_amount);
    
    if (!confirmAmount || isNaN(confirmAmount)) return;

    setProcessingId(record.order_id);
    try {
      await recordManualPayment(record.order_id, record.user_id, parseFloat(confirmAmount));
      await loadData();
      alert("Manual payment recorded.");
    } catch (err) {
      alert("Error recording payment: " + err.message);
    } finally {
      setProcessingId(null);
    }
  };

  // --- STATS CALCULATION ---
  const stats = {
    revenue: records
      .filter(r => r.payment_status === 'succeeded')
      .reduce((acc, r) => acc + Number(r.paid_amount || 0), 0),
    unpaidCount: records
      .filter(r => !r.payment_status || r.payment_status !== 'succeeded')
      .length
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      
      {/* HEADER & STATS */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
        <div>
           <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">Financial Console</h1>
           <p className="text-slate-400 text-sm">Reconcile payments, track revenue, and manage refunds.</p>
        </div>
        
        <div className="flex gap-4">
           {/* Revenue Card */}
           <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><DollarSign size={20}/></div>
              <div>
                 <p className="text-[10px] uppercase font-bold text-emerald-400/80">Net Revenue</p>
                 <p className="text-xl font-mono font-bold text-white">${stats.revenue.toLocaleString()}</p>
              </div>
           </div>
           {/* Unpaid Card */}
           <div className="bg-dark-900 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-slate-400"><AlertCircle size={20}/></div>
              <div>
                 <p className="text-[10px] uppercase font-bold text-slate-500">Unpaid Orders</p>
                 <p className="text-xl font-mono font-bold text-white">{stats.unpaidCount}</p>
              </div>
           </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-4 flex gap-4 shrink-0">
         <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Order UUID or Email..."
              className="w-full bg-dark-950 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-white text-sm focus:border-brand-glow outline-none"
            />
         </form>
         <div className="flex gap-2">
            {['All', 'Succeeded', 'Unpaid', 'Refunded'].map(s => (
               <button 
                 key={s} 
                 onClick={() => setFilter(s)}
                 className={`px-4 py-2 rounded-xl text-xs font-bold uppercase border transition-all ${filter === s ? 'bg-white text-black border-white' : 'text-slate-500 border-white/10 hover:border-white/30'}`}
               >
                 {s}
               </button>
            ))}
         </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 bg-dark-900 border border-white/10 rounded-2xl overflow-hidden relative flex flex-col shadow-xl">
         <div className="bg-white/5 border-b border-white/5 grid grid-cols-12 text-xs uppercase tracking-widest text-slate-400 font-bold shrink-0">
            <div className="col-span-3 p-4">Reference</div>
            <div className="col-span-3 p-4">Customer</div>
            <div className="col-span-2 p-4">Amount</div>
            <div className="col-span-2 p-4">Status Map</div>
            <div className="col-span-2 p-4 text-right">Action</div>
         </div>

         <div className="overflow-y-auto custom-scrollbar flex-1">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                <Loader2 className="animate-spin" size={32} />
                <p>Loading Financial Records...</p>
              </div>
            ) : records.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                <Wallet size={48} className="opacity-20"/>
                <p>No transactions found.</p>
              </div>
            ) : (
             records.map(row => {
               
               // --- RISK ANALYSIS LOGIC ---
               const isPaid = row.payment_status === 'succeeded';
               const isRefunded = row.payment_status === 'refunded';
               
               // Risks
               const refundRisk = row.order_status === 'cancelled' && isPaid; // Cancelled but we have their money
               const revenueRisk = row.order_status === 'shipped' && !isPaid && !isRefunded; // Shipped but they haven't paid

               // Row Styling based on Risk
               let rowClass = "hover:bg-white/5";
               if (refundRisk) rowClass = "bg-red-500/10 border-l-2 border-red-500";
               else if (revenueRisk) rowClass = "bg-orange-500/10 border-l-2 border-orange-500";

               // Button Logic
               const canRefund = isPaid && ['cancelled', 'returned'].includes(row.order_status);

               return (
                 <div key={row.order_id} className={`grid grid-cols-12 items-center border-b border-white/5 transition-colors ${rowClass}`}>
                    
                    {/* 1. REF */}
                    <div className="col-span-3 p-4">
                       <p className="text-white font-mono text-xs group-hover:text-brand-glow transition-colors">{row.order_id.substring(0,8)}...</p>
                       <p className="text-slate-500 text-[10px] mt-1">{new Date(row.order_date).toLocaleDateString()}</p>
                    </div>

                    {/* 2. CUSTOMER */}
                    <div className="col-span-3 p-4">
                       <p className="text-white text-sm font-bold truncate">{row.first_name || 'Guest'} {row.last_name}</p>
                       <p className="text-slate-500 text-[10px] truncate">{row.email || 'No Email'}</p>
                    </div>

                    {/* 3. AMOUNT */}
                    <div className="col-span-2 p-4">
                       <span className={`font-bold text-sm ${isPaid ? 'text-emerald-400' : isRefunded ? 'text-slate-400 line-through' : 'text-slate-400'}`}>
                          ${row.paid_amount || row.total_amount}
                       </span>
                       <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                          <CreditCard size={10} />
                          <span className="capitalize">{row.provider || 'N/A'}</span>
                       </div>
                    </div>

                    {/* 4. STATUS MAP */}
                    <div className="col-span-2 p-4">
                       <div className="flex flex-col gap-1">
                          {/* Order State */}
                          <div className="flex justify-between items-center text-[10px]">
                             <span className="text-slate-500 uppercase">Order:</span>
                             <span className={`font-bold uppercase ${['cancelled', 'returned'].includes(row.order_status) ? 'text-red-400' : 'text-slate-300'}`}>
                                {row.order_status}
                             </span>
                          </div>
                          {/* Payment State */}
                          <div className="flex justify-between items-center text-[10px]">
                             <span className="text-slate-500 uppercase">Pay:</span>
                             <span className={`font-bold uppercase ${
                                row.payment_status === 'succeeded' ? 'text-emerald-400' : 
                                row.payment_status === 'refunded' ? 'text-orange-400' :
                                'text-slate-400'
                             }`}>
                                {row.payment_status || 'Unpaid'}
                             </span>
                          </div>
                       </div>
                       
                       {/* Risk Badges */}
                       {refundRisk && <div className="mt-2 text-[9px] font-bold text-red-400 flex items-center gap-1 animate-pulse"><AlertTriangle size={10}/> REFUND REQ.</div>}
                       {revenueRisk && <div className="mt-2 text-[9px] font-bold text-orange-400 flex items-center gap-1"><AlertTriangle size={10}/> NOT PAID</div>}
                    </div>

                    {/* 5. ACTIONS */}
                    <div className="col-span-2 p-4 text-right flex justify-end gap-2">
                       {/* Manual Pay (Only if unpaid and not refunded) */}
                       {(!isPaid && !isRefunded) && (
                          <button 
                             disabled={processingId === row.order_id}
                             onClick={() => handleManualPay(row)}
                             title="Record Manual Payment (Cash/Wire)"
                             className="p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                          >
                             <CheckCircle size={16} />
                          </button>
                       )}

                       {/* Refund Button (Visible if Paid) */}
                       {isPaid && (
                          <button 
                             onClick={() => initiateRefund(row)}
                             disabled={processingId === row.order_id}
                             className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${
                                canRefund 
                                ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white' 
                                : 'bg-white/5 text-slate-600 cursor-not-allowed opacity-50'
                             }`}
                             title={canRefund ? "Process Refund" : "Order must be Cancelled/Returned first"}
                          >
                             <RotateCcw size={16} />
                          </button>
                       )}
                       
                       {isRefunded && (
                         <span className="text-xs text-orange-400 font-mono flex items-center gap-1 opacity-70 cursor-default">
                           <RotateCcw size={12}/> REFUNDED
                         </span>
                       )}
                    </div>

                 </div>
               );
             }))}
         </div>
      </div>

      {/* MODAL MOUNT POINT */}
      <RefundModal 
        isOpen={refundModalOpen} 
        onClose={() => setRefundModalOpen(false)}
        record={selectedRecord}
        onConfirm={handleRefundConfirm}
      />
    </div>
  );
};

export default AdminPayments;