import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react'; // Import all to render dynamically
import { 
  Plus, Edit2, Trash2, ArrowUp, ArrowDown, 
  Save, X, Search, CheckCircle, AlertCircle, Loader2 
} from 'lucide-react';
import { adminBannerApi } from '../../api/adminBannerApi';

// A curated list of icons relevant to a Supplement/Science brand
// This prevents overwhelming the user with 1000+ icons
const ICON_OPTIONS = [
  "Microscope", "Leaf", "FlaskConical", "Flag", "Truck", "Zap", "Star", 
  "ShieldCheck", "Activity", "Award", "Beaker", "Box", "CheckCircle", 
  "Clock", "Cloud", "Droplet", "Globe", "Heart", "Layers", "Lock", 
  "MapPin", "Package", "Percent", "Shield", "Sun", "Tag", "Thermometer", 
  "ThumbsUp", "Users", "ZapOff"
];

const AdminBanner = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null = create mode
  const [formData, setFormData] = useState({ text: '', icon_name: 'Sparkles', is_active: true });
  const [searchTerm, setSearchTerm] = useState(''); // For icon search

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await adminBannerApi.getAllItems();
      setItems(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load banner items");
    } finally {
      setLoading(false);
    }
  };

  // --- CRUD HANDLERS ---

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ text: item.text, icon_name: item.icon_name, is_active: item.is_active });
    } else {
      setEditingItem(null);
      setFormData({ text: '', icon_name: 'Sparkles', is_active: true });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.text || !formData.icon_name) return alert("Text and Icon are required.");

    try {
      if (editingItem) {
        await adminBannerApi.updateItem(editingItem.id, formData);
      } else {
        await adminBannerApi.addItem(formData);
      }
      setIsModalOpen(false);
      loadItems();
    } catch (err) {
      alert("Error saving item: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await adminBannerApi.deleteItem(id);
      loadItems();
    } catch (err) {
      alert("Error deleting item");
    }
  };

  const handleMove = async (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap in local array
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    
    // Optimistic Update
    setItems(newItems);

    try {
      await adminBannerApi.reorderItems(newItems);
    } catch (err) {
      alert("Failed to save order");
      loadItems(); // Revert on error
    }
  };

  // --- RENDER HELPERS ---
  const filteredIcons = ICON_OPTIONS.filter(icon => 
    icon.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CurrentIcon = LucideIcons[formData.icon_name] || LucideIcons.HelpCircle;

  if (loading) return <div className="p-12 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/> Loading configuration...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Infinite Banner</h1>
          <p className="text-slate-400">Manage the scrolling text and icons on the homepage.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-black/20">
          <div className="col-span-1 text-center">Order</div>
          <div className="col-span-1 text-center">Icon</div>
          <div className="col-span-5">Text Content</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y divide-white/5">
          {items.map((item, index) => {
             const ItemIcon = LucideIcons[item.icon_name] || LucideIcons.HelpCircle;
             return (
               <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group">
                  
                  {/* Sorting */}
                  <div className="col-span-1 flex flex-col items-center gap-1">
                     <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="text-slate-500 hover:text-brand-glow disabled:opacity-20"><ArrowUp size={14}/></button>
                     <button onClick={() => handleMove(index, 'down')} disabled={index === items.length - 1} className="text-slate-500 hover:text-brand-glow disabled:opacity-20"><ArrowDown size={14}/></button>
                  </div>

                  {/* Icon Preview */}
                  <div className="col-span-1 flex justify-center">
                     <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-glow">
                        <ItemIcon size={18} />
                     </div>
                  </div>

                  {/* Text */}
                  <div className="col-span-5 font-bold text-sm text-white">{item.text}</div>

                  {/* Status */}
                  <div className="col-span-2 flex justify-center">
                     {item.is_active ? (
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase rounded border border-green-500/20">Active</span>
                     ) : (
                        <span className="px-2 py-1 bg-slate-500/10 text-slate-500 text-[10px] font-bold uppercase rounded border border-slate-500/20">Hidden</span>
                     )}
                  </div>

                  {/* Actions */}
                  <div className="col-span-3 flex justify-end gap-2">
                     <button onClick={() => handleOpenModal(item)} className="p-2 bg-white/5 hover:bg-brand-glow hover:text-dark-900 rounded-lg transition-colors"><Edit2 size={16}/></button>
                     <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/5 hover:bg-red-500 hover:text-white rounded-lg transition-colors"><Trash2 size={16}/></button>
                  </div>
               </div>
             );
          })}
          {items.length === 0 && (
             <div className="p-8 text-center text-slate-500">No banner items found. Add one to start.</div>
          )}
        </div>
      </div>

      {/* EDIT MODAL */}
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
              className="relative w-full max-w-2xl bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                 <h2 className="text-xl font-bold text-white">{editingItem ? 'Edit Item' : 'New Banner Item'}</h2>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                 <form id="bannerForm" onSubmit={handleSave} className="space-y-6">
                    
                    {/* Live Preview */}
                    <div className="bg-gradient-to-r from-[#004d61] to-[#022c36] p-4 rounded-xl border border-white/10 flex items-center justify-center gap-3">
                        <CurrentIcon className="text-brand-glow" size={20} />
                        <span className="text-white font-bold tracking-widest uppercase text-xs">
                           {formData.text || 'YOUR TEXT HERE'}
                        </span>
                    </div>

                    {/* Text Input */}
                    <div>
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Banner Text</label>
                       <input 
                         type="text" 
                         value={formData.text}
                         onChange={e => setFormData({...formData, text: e.target.value})}
                         placeholder="e.g. FREE SHIPPING"
                         className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none"
                       />
                    </div>

                    {/* Icon Picker */}
                    <div>
                       <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Select Icon</label>
                          <div className="relative">
                             <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
                             <input 
                               type="text" 
                               value={searchTerm}
                               onChange={e => setSearchTerm(e.target.value)}
                               placeholder="Search icons..."
                               className="bg-dark-950 border border-white/10 rounded-md pl-6 pr-2 py-1 text-xs text-white focus:border-brand-glow outline-none w-32"
                             />
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 bg-dark-950 border border-white/10 rounded-xl custom-scrollbar">
                          {filteredIcons.map(iconName => {
                             const Icon = LucideIcons[iconName];
                             const isSelected = formData.icon_name === iconName;
                             return (
                                <button
                                  key={iconName}
                                  type="button"
                                  onClick={() => setFormData({...formData, icon_name: iconName})}
                                  title={iconName}
                                  className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                                    isSelected 
                                       ? 'bg-brand-glow text-dark-900 shadow-[0_0_10px_rgba(14,165,233,0.5)] scale-110' 
                                       : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                   <Icon size={20} />
                                </button>
                             )
                          })}
                       </div>
                       <p className="text-[10px] text-slate-500 mt-2 text-right">Showing {filteredIcons.length} icons</p>
                    </div>

                    {/* Active Toggle */}
                    <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer border border-white/5 hover:border-white/20 transition-colors">
                       <input 
                         type="checkbox" 
                         checked={formData.is_active}
                         onChange={e => setFormData({...formData, is_active: e.target.checked})}
                         className="w-5 h-5 rounded border-white/20 bg-dark-950 text-brand-glow focus:ring-0"
                       />
                       <div>
                          <div className="text-sm font-bold text-white">Active Status</div>
                          <div className="text-xs text-slate-500">Show this item on the live website</div>
                       </div>
                    </label>

                 </form>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">Cancel</button>
                 <button type="submit" form="bannerForm" className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    <Save size={18} /> Save Item
                 </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminBanner;