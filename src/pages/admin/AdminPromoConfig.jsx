import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, UploadCloud, Trash2, Edit2, Save, X, 
  Image as ImageIcon, Video, PlayCircle, Loader2, Eye, EyeOff
} from 'lucide-react';
import { adminPromoApi } from '../../api/adminPromoApi';

const AdminPromoConfig = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const data = await adminPromoApi.getBanners();
      setBanners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  const openModal = (banner = null) => {
    if (banner) {
      setFormData({ ...banner, file: null }); // Edit Mode
    } else {
      setFormData(initialFormState); // Create Mode
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalUrl = formData.media_url;

      // 1. Upload File if selected
      if (formData.file) {
        finalUrl = await adminPromoApi.uploadMedia(formData.file);
      }

      if (!finalUrl) {
        alert("Please upload an image or video.");
        setIsSubmitting(false);
        return;
      }

      // 2. Prepare Payload
      const payload = {
        id: formData.id, // If null, API handles insert
        title: formData.title,
        media_type: formData.media_type,
        media_url: finalUrl,
        link_url: formData.link_url,
        sort_order: parseInt(formData.sort_order),
        desktop_height_px: parseInt(formData.desktop_height_px),
        mobile_height_px: parseInt(formData.mobile_height_px),
        is_active: formData.is_active
      };

      // 3. Save to DB
      await adminPromoApi.saveBanner(payload);
      
      setIsModalOpen(false);
      loadBanners();

    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await adminPromoApi.deleteBanner(id);
      loadBanners();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleActive = async (banner) => {
    try {
      await adminPromoApi.toggleActive(banner.id, banner.is_active);
      loadBanners();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500"><Loader2 className="animate-spin mx-auto"/> Loading...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Home Banners</h1>
          <p className="text-slate-400">Manage images, videos, and GIFs for the main carousel.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="px-6 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-brand-glow/20"
        >
          <Plus size={20} /> New Banner
        </button>
      </div>

      {/* BANNER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-glow/30 transition-all">
            
            {/* Media Preview */}
            <div className="relative aspect-video bg-black">
              {banner.media_type === 'video' ? (
                <video 
                  src={banner.media_url} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  muted 
                  playsInline
                />
              ) : (
                <img 
                  src={banner.media_url} 
                  alt={banner.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              )}
              
              {/* Type Badge */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase flex items-center gap-1">
                {banner.media_type === 'video' ? <Video size={12}/> : <ImageIcon size={12}/>}
                {banner.media_type}
              </div>

              {/* Status Badge */}
              <button 
                 onClick={() => handleToggleActive(banner)}
                 className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 transition-colors ${banner.is_active ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}
              >
                {banner.is_active ? <Eye size={12}/> : <EyeOff size={12}/>}
                {banner.is_active ? 'Active' : 'Hidden'}
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg truncate">{banner.title}</h3>
                 <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">Order: {banner.sort_order}</span>
               </div>
               <p className="text-xs text-slate-400 truncate mb-4">
                 Link: <span className="text-brand-glow">{banner.link_url || 'None'}</span>
               </p>

               <div className="flex gap-2">
                 <button 
                   onClick={() => openModal(banner)}
                   className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                 >
                   <Edit2 size={14} /> Edit
                 </button>
                 <button 
                   onClick={() => handleDelete(banner.id)}
                   className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                 >
                   <Trash2 size={16} />
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT/CREATE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-dark-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-white">
                   {formData.id ? 'Edit Banner' : 'New Banner'}
                 </h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} className="text-slate-400" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                
                {/* 1. Media Type Selector */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, media_type: 'image' })}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.media_type === 'image' ? 'bg-brand-glow/10 border-brand-glow text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'}`}
                  >
                    <ImageIcon size={24} className={formData.media_type === 'image' ? 'text-brand-glow' : ''} />
                    <span className="text-xs font-bold uppercase">Image / GIF</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, media_type: 'video' })}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${formData.media_type === 'video' ? 'bg-brand-glow/10 border-brand-glow text-white' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'}`}
                  >
                    <Video size={24} className={formData.media_type === 'video' ? 'text-brand-glow' : ''} />
                    <span className="text-xs font-bold uppercase">Video (MP4)</span>
                  </button>
                </div>

                {/* 2. File Upload */}
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">Upload Media</label>
                   
                   {/* Existing Preview */}
                   {formData.media_url && !formData.file && (
                     <div className="relative h-32 bg-black rounded-xl overflow-hidden mb-2 border border-white/10">
                        {formData.media_type === 'video' ? (
                          <video src={formData.media_url} className="w-full h-full object-cover opacity-60" />
                        ) : (
                          <img src={formData.media_url} alt="Preview" className="w-full h-full object-cover opacity-60" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold bg-black/50 px-3 py-1 rounded backdrop-blur">Current Media</span>
                        </div>
                     </div>
                   )}

                   <div className="relative group cursor-pointer">
                      <input 
                        type="file" 
                        accept={formData.media_type === 'video' ? "video/mp4,video/webm" : "image/png,image/jpeg,image/gif,image/webp"}
                        onChange={(e) => setFormData(prev => ({ ...prev, file: e.target.files[0] }))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 group-hover:border-brand-glow/50 group-hover:bg-brand-glow/5 transition-all">
                         <UploadCloud size={32} className="text-slate-500 mb-2 group-hover:text-brand-glow" />
                         <p className="text-sm font-bold text-white">{formData.file ? formData.file.name : 'Click to Upload New File'}</p>
                         <p className="text-xs text-slate-500 mt-1 uppercase">{formData.media_type === 'video' ? 'MP4 or WebM' : 'JPG, PNG or GIF'}</p>
                      </div>
                   </div>
                </div>

                {/* 3. Text Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Title (Alt Text)</label>
                    <input 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
                      placeholder="e.g. Summer Sale"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Link URL (Optional)</label>
                    <input 
                      value={formData.link_url}
                      onChange={e => setFormData({...formData, link_url: e.target.value})}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
                      placeholder="e.g. /shop"
                    />
                  </div>
                </div>

                {/* 4. Configuration */}
                <div className="grid grid-cols-3 gap-4">
                   <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sort Order</label>
                    <input 
                      type="number"
                      value={formData.sort_order}
                      onChange={e => setFormData({...formData, sort_order: e.target.value})}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Mobile Height</label>
                    <input 
                      type="number"
                      value={formData.mobile_height_px}
                      onChange={e => setFormData({...formData, mobile_height_px: e.target.value})}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Desktop Height</label>
                    <input 
                      type="number"
                      value={formData.desktop_height_px}
                      onChange={e => setFormData({...formData, desktop_height_px: e.target.value})}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-white/10">
                   <button 
                     type="button" 
                     onClick={() => setIsModalOpen(false)}
                     className="px-6 py-3 bg-white/5 text-slate-400 font-bold rounded-xl hover:bg-white/10"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                   >
                      {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
                      Save Banner
                   </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

const initialFormState = {
  id: null,
  title: '',
  media_type: 'image',
  media_url: '',
  link_url: '',
  sort_order: 0,
  desktop_height_px: 600,
  mobile_height_px: 400,
  is_active: true,
  file: null
};

export default AdminPromoConfig;