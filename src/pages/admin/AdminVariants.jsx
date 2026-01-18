
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Palette, Type, Archive, RotateCcw, 
  AlertCircle, CheckCircle, GripVertical
} from 'lucide-react';
import { 
  getVariantConfig, createVariantType, deleteVariantType, toggleVariantTypeStatus,
  createVariantOption, deleteVariantOption, toggleVariantOptionStatus 
} from '../../api/adminVariantApi';

const AdminVariants = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);

  // Form States
  const [isAddingType, setIsAddingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeStyle, setNewTypeStyle] = useState('pill');

  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionColor, setNewOptionColor] = useState('#3b82f6');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getVariantConfig();
      setTypes(data);
      if (selectedType) {
        const fresh = data.find(t => t.id === selectedType.id);
        setSelectedType(fresh || (data.length > 0 ? data[0] : null));
      } else if (data.length > 0) {
        setSelectedType(data[0]);
      }
    } catch (error) {
      console.error("Failed to load variants:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  const handleCreateType = async (e) => {
    e.preventDefault();
    if (!newTypeName) return;
    setIsSubmitting(true);
    try {
      await createVariantType(newTypeName, newTypeStyle, 'Custom type');
      setNewTypeName('');
      setIsAddingType(false);
      await loadData();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateOption = async (e) => {
    e.preventDefault();
    if (!newOptionName || !selectedType) return;
    setIsSubmitting(true);
    const metadata = selectedType.display_style === 'swatch' ? { color: newOptionColor } : null;
    
    try {
      await createVariantOption(selectedType.id, newOptionName, metadata);
      setNewOptionName('');
      await loadData();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSoftDeleteOption = async (option) => {
    try {
      await toggleVariantOptionStatus(option.id, option.is_active);
      await loadData();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleHardDeleteOption = async (id) => {
    if (!window.confirm("WARNING: This will permanently delete this option database record. Use only if created by mistake.")) return;
    try {
      await deleteVariantOption(id);
      await loadData();
    } catch (err) {
      alert(err.message); // Will show the friendly "Used by products" message
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading configuration...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Attributes</h1>
          <p className="text-slate-400">Configure global product options (Sizes, Flavors, Colors).</p>
        </div>
        <button 
          onClick={() => setIsAddingType(true)}
          className="bg-brand-glow text-dark-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-brand-glow/20"
        >
          <Plus size={18} /> New Attribute
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- LEFT: VARIANT TYPES --- */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Add Type Modal */}
          <AnimatePresence>
            {isAddingType && (
              <motion.form 
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                onSubmit={handleCreateType}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3 overflow-hidden mb-4"
              >
                <input 
                  autoFocus
                  placeholder="Attribute Name (e.g. Material)"
                  value={newTypeName}
                  onChange={e => setNewTypeName(e.target.value)}
                  className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-glow outline-none"
                />
                <div className="flex gap-2">
                   {['pill', 'swatch'].map(style => (
                     <button
                        type="button"
                        key={style}
                        onClick={() => setNewTypeStyle(style)}
                        className={`flex-1 py-1 text-[10px] uppercase font-bold rounded border ${newTypeStyle === style ? 'bg-brand-glow text-dark-900 border-brand-glow' : 'border-white/20 text-slate-400'}`}
                     >
                        {style}
                     </button>
                   ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="button" onClick={() => setIsAddingType(false)} className="flex-1 py-2 bg-white/5 rounded-lg text-xs font-bold hover:bg-white/10">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-2 bg-brand-glow text-dark-900 rounded-lg text-xs font-bold hover:bg-cyan-300">Save</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Types List */}
          <div className="space-y-2">
            {types.map(type => (
              <div 
                key={type.id}
                onClick={() => setSelectedType(type)}
                className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
                  selectedType?.id === type.id 
                  ? 'bg-brand-glow/10 border-brand-glow ring-1 ring-brand-glow' 
                  : type.is_active 
                    ? 'bg-white/5 border-white/5 hover:border-white/20'
                    : 'bg-dark-950 border-white/5 opacity-50 grayscale'
                }`}
              >
                {!type.is_active && <div className="absolute inset-0 bg-dashed-pattern opacity-10 pointer-events-none" />}
                
                <div className="flex items-center gap-3 relative z-10">
                  {type.display_style === 'swatch' ? <Palette size={18} className={selectedType?.id === type.id ? 'text-brand-glow' : 'text-slate-500'} /> : <Type size={18} className={selectedType?.id === type.id ? 'text-brand-glow' : 'text-slate-500'} />}
                  <div>
                    <span className="font-bold text-sm block">{type.name}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{type.options.length} Options</span>
                  </div>
                </div>

                <div className="relative z-10">
                   {type.is_active ? (
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleVariantTypeStatus(type.id, true).then(loadData); }}
                        className="p-2 text-slate-500 hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-colors"
                        title="Archive this Attribute"
                      >
                        <Archive size={16} />
                      </button>
                   ) : (
                      <div className="flex gap-1">
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleVariantTypeStatus(type.id, false).then(loadData); }}
                            className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg"
                            title="Restore"
                        >
                            <RotateCcw size={16} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); if(confirm('Delete Type?')) deleteVariantType(type.id).then(loadData); }}
                            className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                            title="Delete Permanently"
                        >
                            <Trash2 size={16} />
                        </button>
                      </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: OPTIONS --- */}
        {selectedType && (
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col h-full">
            
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    {selectedType.name}
                    {!selectedType.is_active && <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20 uppercase tracking-widest font-bold">Archived</span>}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Style: <span className="text-white font-mono bg-white/10 px-1 rounded">{selectedType.display_style}</span>
                  </p>
               </div>
            </div>

            {/* Options List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-3">
                {selectedType.options.map(option => (
                    <div 
                        key={option.id} 
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                            option.is_active 
                            ? 'bg-dark-900 border-white/5' 
                            : 'bg-dark-950 border-white/5 opacity-60'
                        }`}
                    >
                        {/* Status Icon */}
                        <div className={`shrink-0 ${option.is_active ? 'text-green-500' : 'text-slate-600'}`}>
                            {option.is_active ? <CheckCircle size={16} /> : <Archive size={16} />}
                        </div>

                        {/* Visual Preview */}
                        {selectedType.display_style === 'swatch' ? (
                            <div className="w-10 h-10 rounded-full border border-white/20 shadow-sm shrink-0" style={{ backgroundColor: option.metadata?.color || '#333' }} />
                        ) : (
                            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center font-bold text-slate-400 border border-white/10 shrink-0">
                                <Type size={16} />
                            </div>
                        )}

                        {/* Details */}
                        <div className="flex-1">
                            <p className={`font-bold text-sm ${!option.is_active && 'text-slate-500 line-through'}`}>{option.name}</p>
                            <p className="text-[10px] text-slate-500">{option.is_active ? 'Active on Store' : 'Hidden from Store'}</p>
                        </div>

                        {/* ACTIONS - CLEARLY LABELED */}
                        <div className="flex items-center gap-2">
                            {option.is_active ? (
                                <button 
                                    onClick={() => handleSoftDeleteOption(option)}
                                    className="px-3 py-1.5 bg-white/5 hover:bg-yellow-500/10 hover:text-yellow-400 border border-white/5 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                                >
                                    <Archive size={14} /> Archive
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => handleSoftDeleteOption(option)}
                                        className="px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                                    >
                                        <RotateCcw size={14} /> Restore
                                    </button>
                                    <button 
                                        onClick={() => handleHardDeleteOption(option.id)}
                                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
                                        title="Delete Permanently"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                
                {selectedType.options.length === 0 && (
                    <div className="text-center p-8 border border-dashed border-white/10 rounded-2xl text-slate-500">
                        No options created yet.
                    </div>
                )}
                </div>
            </div>

            {/* Create Bar */}
            {selectedType.is_active && (
                <div className="mt-6 pt-6 border-t border-white/10">
                    <form onSubmit={handleCreateOption} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">New {selectedType.name} Name</label>
                            <input 
                                value={newOptionName}
                                onChange={e => setNewOptionName(e.target.value)}
                                placeholder="Type name..."
                                className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
                            />
                        </div>
                        
                        {selectedType.display_style === 'swatch' && (
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Color</label>
                                <div className="flex items-center gap-2 bg-dark-950 border border-white/10 rounded-xl px-2 py-1.5">
                                    <input type="color" value={newOptionColor} onChange={e => setNewOptionColor(e.target.value)} className="w-8 h-8 rounded bg-transparent border-none cursor-pointer" />
                                </div>
                            </div>
                        )}

                        <button 
                            disabled={isSubmitting || !newOptionName}
                            className="h-[46px] px-6 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-brand-glow/20 disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                        >
                            <Plus size={18} /> Add
                        </button>
                    </form>
                    {errorMsg && <p className="text-red-400 text-xs mt-3 flex items-center gap-2"><AlertCircle size={12}/> {errorMsg}</p>}
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVariants;