
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, UploadCloud, Trash2, CheckCircle, AlertCircle, 
  Search, Calendar, Save, X, Microscope, Image as ImageIcon
} from 'lucide-react';
import { adminLabApi } from '../../api/adminLabApi';

const AdminLabConfig = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [editingVariant, setEditingVariant] = useState(null); 
  // Added variantFile and existingImageUrl to state
  const [formData, setFormData] = useState({ 
    batch_number: '', 
    tested_at: '', 
    reportFile: null, 
    existingReportUrl: '',
    variantFile: null,
    existingImageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await adminLabApi.getVariantReports();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- MODAL HANDLERS ---

  const openEditModal = (variant) => {
    setEditingVariant(variant);
    setFormData({
      batch_number: variant.batch_number || '',
      tested_at: variant.tested_at || '',
      existingReportUrl: variant.lab_report_url || '',
      reportFile: null,
      existingImageUrl: variant.image_url || '',
      variantFile: null
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.batch_number) return alert("Batch Number is required.");
    
    setIsSubmitting(true);
    try {
      let finalReportUrl = formData.existingReportUrl;
      let finalImageUrl = formData.existingImageUrl;

      // 1. Upload new Report if selected
      if (formData.reportFile) {
        finalReportUrl = await adminLabApi.uploadReportFile(formData.reportFile);
      }

      // 2. Upload new Variant Image if selected
      if (formData.variantFile) {
        finalImageUrl = await adminLabApi.uploadVariantImage(formData.variantFile);
      }

      if (!finalReportUrl && !formData.reportFile) {
         // Optional: warning if saving without a report, but maybe they just want to save the image
      }

      // 3. Update Database
      await adminLabApi.updateVariantReport(editingVariant.id, {
        batch_number: formData.batch_number,
        tested_at: formData.tested_at || new Date().toISOString().split('T')[0],
        lab_report_url: finalReportUrl,
        image_url: finalImageUrl
      });

      alert("Configuration updated successfully!");
      setEditingVariant(null);
      loadData(); 
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReport = async () => {
    if (!window.confirm("Remove this report? Batch info will be cleared.")) return;
    setIsSubmitting(true);
    try {
      await adminLabApi.deleteVariantReport(editingVariant.id);
      setEditingVariant(null);
      loadData();
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FILTERING ---
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.variants.some(v => v.batch_number?.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <div className="p-12 text-center text-slate-500">Loading configuration...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Lab & Image Config</h1>
          <p className="text-slate-400">Manage COAs, Batch IDs, and Product Variant Images.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 w-64 md:w-80 text-white focus:border-brand-glow outline-none transition-colors"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            
            {/* Product Header */}
            <div className="p-4 bg-black/20 border-b border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden shrink-0 border border-white/10">
                {product.cover_image_url && <img src={product.cover_image_url} loading="lazy" alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-white">{product.name}</h3>
                <p className="text-xs text-slate-500">{product.variants.length} Variants</p>
              </div>
            </div>

            {/* Variants Grid */}
            <div className="p-4 grid gap-4">
              {product.variants.map(variant => (
                <div key={variant.id} className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-glow/30 transition-all">
                  
                  {/* Variant Image Thumbnail */}
                  <div className="w-16 h-16 bg-black/40 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {variant.image_url ? (
                      <img src={variant.image_url} alt="Variant" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon size={20} className="text-slate-600" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${variant.lab_report_url ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <span className="font-bold text-sm">{variant.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      {variant.batch_number ? (
                        <span className="text-brand-glow font-bold bg-brand-glow/10 px-2 rounded">Batch: {variant.batch_number}</span>
                      ) : (
                        <span className="text-orange-400 flex items-center gap-1"><AlertCircle size={10}/> Missing Report</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    {variant.lab_report_url && (
                      <a href={variant.lab_report_url} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg" title="View PDF">
                        <FileText size={18} />
                      </a>
                    )}
                    <button 
                      onClick={() => openEditModal(variant)}
                      className="px-4 py-2 bg-brand-glow text-dark-900 font-bold text-xs rounded-lg hover:brightness-110 flex items-center gap-2"
                    >
                      <Microscope size={14} /> Edit Config
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingVariant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditingVariant(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-dark-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h2 className="text-2xl font-bold text-white">Configure Variant</h2>
                    <p className="text-slate-400 text-sm mt-1">{editingVariant.name}</p>
                 </div>
                 <button onClick={() => setEditingVariant(null)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} className="text-slate-400" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                
                {/* 1. Batch ID & Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Batch Number</label>
                    <input 
                        value={formData.batch_number}
                        onChange={e => setFormData({...formData, batch_number: e.target.value})}
                        placeholder="e.g. B-101"
                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Date Tested</label>
                    <input 
                      type="date"
                      value={formData.tested_at}
                      onChange={e => setFormData({...formData, tested_at: e.target.value})}
                      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
                    />
                  </div>
                </div>

                {/* 2. VARIANT IMAGE UPLOAD */}
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">Variant Image (Optional)</label>
                   
                   {formData.existingImageUrl && !formData.variantFile && (
                     <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-2">
                        <ImageIcon size={16} className="text-blue-500" />
                        <span className="text-xs text-blue-400 font-bold truncate flex-1">Has Existing Image</span>
                        <a href={formData.existingImageUrl} target="_blank" rel="noreferrer" className="text-xs underline text-white">View</a>
                     </div>
                   )}

                   <div className="relative group cursor-pointer">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFormData(prev => ({ ...prev, variantFile: e.target.files[0] }))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center bg-white/5 group-hover:border-brand-glow/50 group-hover:bg-brand-glow/5 transition-all">
                         <ImageIcon size={24} className="text-slate-500 mb-2 group-hover:text-brand-glow" />
                         <p className="text-xs font-bold text-white">{formData.variantFile ? formData.variantFile.name : 'Upload Product Photo'}</p>
                      </div>
                   </div>
                </div>

                {/* 3. REPORT UPLOAD */}
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase">Lab Report (PDF/Image)</label>
                   
                   {formData.existingReportUrl && !formData.reportFile && (
                     <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl mb-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-xs text-green-400 font-bold truncate flex-1">Report on File</span>
                        <a href={formData.existingReportUrl} target="_blank" rel="noreferrer" className="text-xs underline text-white">View</a>
                     </div>
                   )}

                   <div className="relative group cursor-pointer">
                      <input 
                        type="file" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFormData(prev => ({ ...prev, reportFile: e.target.files[0] }))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center bg-white/5 group-hover:border-brand-glow/50 group-hover:bg-brand-glow/5 transition-all">
                         <UploadCloud size={24} className="text-slate-500 mb-2 group-hover:text-brand-glow" />
                         <p className="text-xs font-bold text-white">{formData.reportFile ? formData.reportFile.name : 'Upload Lab Report'}</p>
                      </div>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                   {formData.existingReportUrl && (
                     <button 
                       type="button" 
                       onClick={handleDeleteReport}
                       className="px-4 py-3 bg-red-500/10 text-red-400 font-bold rounded-xl hover:bg-red-500/20 border border-red-500/20"
                       title="Delete Report"
                     >
                        <Trash2 size={18} />
                     </button>
                   )}
                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                   >
                      <Save size={18} />
                      Save Changes
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

export default AdminLabConfig;