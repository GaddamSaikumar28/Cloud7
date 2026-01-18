
import React, { useEffect, useState } from 'react';
import { 
  Search, Save, RefreshCw, AlertTriangle, CheckCircle, 
  Package, DollarSign, Filter, TrendingUp 
} from 'lucide-react';
import { getInventory, updateSku } from '../../api/adminInventoryApi';

const AdminInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Low Stock'

  // Tracking changes: { [variantId]: { field: value } }
  const [edits, setEdits] = useState({});
  const [saving, setSaving] = useState({}); // Track individual row saving states

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (err) {
      console.error("Failed to load inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- EDIT HANDLERS ---

  const handleEdit = (id, field, value) => {
    // Validate Numeric Inputs
    if (field === 'stock' || field === 'price') {
        if (value === '') value = 0; // Handle empty backspace
        if (value < 0) return; // Prevent negative
    }

    setEdits(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const saveRow = async (id) => {
    const changes = edits[id];
    if (!changes) return;

    setSaving(prev => ({ ...prev, [id]: true }));

    try {
      // Map UI fields back to DB columns
      const payload = {};
      if (changes.stock !== undefined) payload.stock_quantity = parseInt(changes.stock);
      if (changes.price !== undefined) payload.price = parseFloat(changes.price);
      if (changes.sku !== undefined) payload.sku = changes.sku;

      await updateSku(id, payload);

      // Update local master state so the "Save" button disappears
      setInventory(prev => prev.map(item => 
        item.id === id ? { ...item, ...changes } : item
      ));

      // Clear edits for this ID
      setEdits(prev => {
        const newEdits = { ...prev };
        delete newEdits[id];
        return newEdits;
      });

    } catch (error) {
      alert(`Save Failed: ${error.message}`);
    } finally {
      setSaving(prev => ({ ...prev, [id]: false }));
    }
  };

  // --- HELPER: Get value from Edits or Original ---
  const getDisplayValue = (item, field) => {
    if (edits[item.id] && edits[item.id][field] !== undefined) {
      return edits[item.id][field];
    }
    return item[field];
  };

  // --- FILTER LOGIC ---
  const filteredInventory = inventory.filter(item => {
    // 1. Text Search (Name, SKU, Variant)
    const query = search.toLowerCase();
    const matchesSearch = 
      item.productName.toLowerCase().includes(query) ||
      item.variantName.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    // 2. Status Filter
    if (filter === 'Low Stock') {
      return getDisplayValue(item, 'stock') < 10;
    }

    return true;
  });

  if (loading) return <div className="p-12 text-center text-slate-500">Loading inventory...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Inventory</h1>
          <p className="text-slate-400">Real-time stock management across all active variants.</p>
        </div>

        {/* METRICS */}
        <div className="flex gap-4">
           <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
              <span className="text-xs font-bold text-slate-500 uppercase block">Total Value</span>
              <span className="text-xl font-bold text-green-400 flex items-center gap-1">
                 <DollarSign size={16}/> 
                 {inventory.reduce((acc, i) => acc + (i.price * i.stock), 0).toLocaleString()}
              </span>
           </div>
           <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
              <span className="text-xs font-bold text-slate-500 uppercase block">Low Stock Items</span>
              <span className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                 <AlertTriangle size={16}/> 
                 {inventory.filter(i => i.stock < 10).length}
              </span>
           </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            placeholder="Search by Product, Flavor, or SKU..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-brand-glow outline-none transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
           <button 
             onClick={() => setFilter('All')}
             className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors border ${filter === 'All' ? 'bg-brand-glow text-dark-900 border-brand-glow' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
           >
             All Items
           </button>
           <button 
             onClick={() => setFilter('Low Stock')}
             className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors border flex items-center gap-2 ${filter === 'Low Stock' ? 'bg-yellow-500 text-dark-900 border-yellow-500' : 'bg-transparent border-white/10 hover:bg-white/5'}`}
           >
             <AlertTriangle size={14} /> Low Stock
           </button>
        </div>
      </div>

      {/* DATA GRID */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
         {/* HEADER */}
         <div className="grid grid-cols-12 gap-4 p-4 bg-white/5 border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-5">Product / Variant</div>
            <div className="col-span-3">SKU</div>
            <div className="col-span-2 text-center">Price ($)</div>
            <div className="col-span-1 text-center">Stock</div>
            <div className="col-span-1 text-center">Action</div>
         </div>

         {/* ROWS */}
         <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto custom-scrollbar">
            {filteredInventory.length === 0 ? (
               <div className="p-12 text-center text-slate-500 italic">No inventory found matching your filters.</div>
            ) : (
               filteredInventory.map(item => {
                  const isDirty = !!edits[item.id]; // Has unsaved changes?
                  
                  return (
                     <div key={item.id} className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors ${getDisplayValue(item, 'stock') === 0 ? 'opacity-50 grayscale' : ''}`}>
                        
                        {/* 1. PRODUCT INFO */}
                        <div className="col-span-5 flex items-center gap-4">
                           <div className="w-10 h-10 bg-white/10 rounded-lg overflow-hidden shrink-0">
                              {item.productImage && <img src={item.productImage} laoding="lazy" className="w-full h-full object-cover" />}
                           </div>
                           <div>
                              <div className="font-bold text-sm truncate">{item.productName}</div>
                              <div className="text-xs text-brand-glow font-mono mt-0.5">{item.variantName}</div>
                           </div>
                        </div>

                        {/* 2. SKU INPUT */}
                        <div className="col-span-3">
                           <input 
                              type="text"
                              value={getDisplayValue(item, 'sku')}
                              onChange={(e) => handleEdit(item.id, 'sku', e.target.value)}
                              className={`w-full bg-dark-950 border rounded-lg px-3 py-2 text-xs font-mono focus:border-brand-glow outline-none transition-colors ${isDirty && edits[item.id]?.sku !== undefined ? 'border-yellow-500/50 text-yellow-500' : 'border-white/10 text-slate-400'}`}
                           />
                        </div>

                        {/* 3. PRICE INPUT */}
                        <div className="col-span-2">
                           <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">$</span>
                              <input 
                                type="number"
                                min="0"
                                step="0.01"
                                value={getDisplayValue(item, 'price')}
                                onChange={(e) => handleEdit(item.id, 'price', e.target.value)}
                                className={`w-full bg-dark-950 border rounded-lg pl-6 pr-2 py-2 text-xs font-bold text-center focus:border-brand-glow outline-none ${isDirty && edits[item.id]?.price !== undefined ? 'border-yellow-500/50 text-yellow-500' : 'border-white/10'}`}
                              />
                           </div>
                        </div>

                        {/* 4. STOCK INPUT */}
                        <div className="col-span-1">
                           <div className="relative group">
                              <input 
                                type="number"
                                min="0"
                                value={getDisplayValue(item, 'stock')}
                                onChange={(e) => handleEdit(item.id, 'stock', e.target.value)}
                                className={`w-full bg-dark-950 border rounded-lg px-1 py-2 text-xs font-bold text-center focus:border-brand-glow outline-none ${
                                    isDirty && edits[item.id]?.stock !== undefined 
                                    ? 'border-yellow-500/50 text-yellow-500' 
                                    : getDisplayValue(item, 'stock') < 10 
                                       ? 'border-red-500/50 text-red-400' 
                                       : 'border-white/10'
                                }`}
                              />
                              {getDisplayValue(item, 'stock') < 10 && (
                                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              )}
                           </div>
                        </div>

                        {/* 5. ACTIONS */}
                        <div className="col-span-1 flex justify-center">
                           {isDirty ? (
                              <button 
                                onClick={() => saveRow(item.id)}
                                disabled={saving[item.id]}
                                className="w-8 h-8 flex items-center justify-center bg-brand-glow text-dark-900 rounded-lg hover:brightness-110 shadow-lg shadow-brand-glow/20 transition-all active:scale-95"
                                title="Save Changes"
                              >
                                {saving[item.id] ? <RefreshCw size={14} className="animate-spin"/> : <Save size={14} />}
                              </button>
                           ) : (
                              <div className="text-slate-600 opacity-20">
                                 <CheckCircle size={18} />
                              </div>
                           )}
                        </div>
                     </div>
                  );
               })
            )}
         </div>
      </div>
    </div>
  );
};

export default AdminInventory;