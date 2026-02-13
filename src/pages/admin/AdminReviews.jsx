import React, { useEffect, useState } from 'react';
import { 
  MessageSquare, Star, Trash2, CheckCircle, XCircle, 
  Search, Filter, Edit3, Save, User, MessageCircle, AlertTriangle 
} from 'lucide-react';
import { getAdminReviews, updateReviewStatus, deleteReview, updateAdminResponse } from '../../api/adminReviewApi';
import { motion, AnimatePresence } from 'framer-motion';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  
  // Interaction State
  const [editingId, setEditingId] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => { 
    loadData();
  }, [filterStatus]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAdminReviews({ status: filterStatus, search });
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  console.log(reviews);
  // --- ACTIONS ---

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReviewStatus(id, newStatus);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this review?")) return;
    try {
      await deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const openReply = (review) => {
    setEditingId(review.id);
    setReplyText(review.admin_response || '');
  };

  const saveReply = async (id) => {
    try {
      await updateAdminResponse(id, replyText);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, admin_response: replyText } : r));
      setEditingId(null);
    } catch (err) {
      alert("Failed to save response");
    }
  };

  // --- UI HELPERS ---
  const getRatingStars = (rating) => (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={12} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-slate-700" : ""} />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Review Moderation</h1>
           <p className="text-slate-400 text-sm">Manage customer feedback and reputation.</p>
        </div>
        <div className="flex gap-2 text-xs font-mono text-slate-500">
           <span>Avg Rating: {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)}</span>
           <span>•</span>
           <span>Total: {reviews.length}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-4 flex gap-4 shrink-0">
         <form onSubmit={handleSearch} className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search comments..."
              className="w-full bg-dark-950 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-white text-sm focus:border-brand-glow outline-none"
            />
         </form>
         <div className="flex gap-2">
            {['All', 'Approved', 'Pending', 'Hidden'].map(s => (
               <button 
                 key={s} 
                 onClick={() => setFilterStatus(s)}
                 className={`px-4 py-2 rounded-xl text-xs font-bold uppercase border transition-all ${filterStatus === s ? 'bg-white text-black border-white' : 'text-slate-500 border-white/10 hover:border-white/30'}`}
               >
                 {s}
               </button>
            ))}
         </div>
      </div>

      {/* Reviews List */}
      <div className="flex-1 bg-dark-900 border border-white/10 rounded-2xl overflow-hidden relative flex flex-col shadow-xl">
         <div className="overflow-y-auto custom-scrollbar flex-1 p-4 space-y-4">
            {loading ? <div className="text-center p-10 text-slate-500">Loading Reviews...</div> : 
             reviews.length === 0 ? <div className="text-center p-10 text-slate-500">No reviews found.</div> :
             reviews.map(review => (
               <motion.div 
                 layout
                 key={review.id} 
                 className={`p-4 rounded-xl border transition-all ${review.status === 'hidden' ? 'bg-red-500/5 border-red-500/10' : 'bg-dark-950 border-white/5 hover:border-white/10'}`}
               >
                  <div className="flex justify-between items-start gap-4">
                     
                     {/* User & Product Info */}
                     <div className="flex items-start gap-4 min-w-[200px]">
                        <div className="w-10 h-10 rounded-lg bg-dark-800 border border-white/10 overflow-hidden shrink-0">
                           {review.product?.cover_image_url ? (
                              <img laoding="lazy" src={review.product.cover_image_url} className="w-full h-full object-cover" />
                           ) : (
                              <div className="flex items-center justify-center h-full text-slate-600"><MessageSquare size={16}/></div>
                           )}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                              <h4 className="text-white font-bold text-sm">{review?.first_name + " " + review?.last_name || 'Guest'}</h4>
                              {review.verified_purchase && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1 rounded border border-emerald-500/20">VERIFIED</span>}
                           </div>
                           <p className="text-xs text-slate-500 truncate max-w-[150px]">{review.product?.name}</p>
                           <div className="mt-1">{getRatingStars(review.rating)}</div>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="flex-1">
                        <p className="text-slate-300 text-sm leading-relaxed mb-2">"{review.comment}"</p>
                        
                        {/* Admin Response Section */}
                        {editingId === review.id ? (
                           <div className="mt-3 flex gap-2">
                              <input 
                                autoFocus
                                value={replyText}
                                onChange={e => setReplyText(e.target.value)}
                                placeholder="Write a response..."
                                className="flex-1 bg-dark-900 border border-brand-glow/50 rounded-lg px-3 py-2 text-xs text-white outline-none"
                              />
                              <button onClick={() => saveReply(review.id)} className="p-2 bg-brand-glow text-dark-900 rounded-lg hover:brightness-110"><Save size={14}/></button>
                              <button onClick={() => setEditingId(null)} className="p-2 bg-white/10 text-white rounded-lg"><XCircle size={14}/></button>
                           </div>
                        ) : review.admin_response && (
                           <div className="mt-2 pl-3 border-l-2 border-brand-glow/30">
                              <p className="text-xs text-brand-glow font-bold uppercase mb-1">Response:</p>
                              <p className="text-xs text-slate-400">{review.admin_response}</p>
                           </div>
                        )}
                     </div>

                     {/* Actions */}
                     <div className="flex flex-col gap-2 shrink-0">
                        <div className="flex items-center gap-1 bg-dark-900 rounded-lg p-1 border border-white/5">
                           <button 
                             onClick={() => handleStatusChange(review.id, 'approved')}
                             className={`p-1.5 rounded transition-colors ${review.status === 'approved' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-500 hover:text-emerald-400'}`}
                             title="Approve"
                           >
                              <CheckCircle size={16} />
                           </button>
                           <button 
                             onClick={() => handleStatusChange(review.id, 'hidden')}
                             className={`p-1.5 rounded transition-colors ${review.status === 'hidden' ? 'bg-red-500 text-white shadow-lg' : 'text-slate-500 hover:text-red-400'}`}
                             title="Hide"
                           >
                              <AlertTriangle size={16} />
                           </button>
                        </div>

                        <div className="flex gap-2 justify-end">
                           <button 
                             onClick={() => openReply(review)} 
                             className="text-xs font-bold text-slate-500 hover:text-brand-glow flex items-center gap-1"
                           >
                              <MessageCircle size={14} /> Reply
                           </button>
                           <button 
                             onClick={() => handleDelete(review.id)} 
                             className="text-xs font-bold text-slate-500 hover:text-red-400 flex items-center gap-1"
                           >
                              <Trash2 size={14} />
                           </button>
                        </div>
                        <span className="text-[10px] text-slate-600 text-right mt-1">{new Date(review.created_at).toLocaleDateString()}</span>
                     </div>
                  </div>
               </motion.div>
             ))
            }
         </div>
      </div>
    </div>
  );
};

export default AdminReviews;