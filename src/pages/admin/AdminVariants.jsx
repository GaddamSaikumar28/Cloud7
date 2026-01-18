// // import React, { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { 
// //   Layers, Plus, Trash2, Edit2, Palette, Ruler, Type, 
// //   Save, X, Check, AlertCircle 
// // } from 'lucide-react';
// // import { 
// //   getVariantConfig, createVariantType, deleteVariantType, 
// //   createVariantOption, deleteVariantOption, updateVariantOption 
// // } from '../../api/adminVariantApi';

// // const AdminVariants = () => {
// //   const [types, setTypes] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedType, setSelectedType] = useState(null);

// //   // Modal / Form States
// //   const [isAddingType, setIsAddingType] = useState(false);
// //   const [newTypeName, setNewTypeName] = useState('');
// //   const [newTypeStyle, setNewTypeStyle] = useState('pill');

// //   // Option Form States
// //   const [newOptionName, setNewOptionName] = useState('');
// //   const [newOptionColor, setNewOptionColor] = useState('#3b82f6'); // Default Blue
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const data = await getVariantConfig();
// //       setTypes(data);
// //       // Auto-select first type if none selected
// //       if (!selectedType && data.length > 0) setSelectedType(data[0]);
// //       // If selected exists, refresh its data
// //       if (selectedType) {
// //         const fresh = data.find(t => t.id === selectedType.id);
// //         if (fresh) setSelectedType(fresh);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // --- TYPE HANDLERS ---

// //   const handleCreateType = async (e) => {
// //     e.preventDefault();
// //     if (!newTypeName) return;
// //     setIsSubmitting(true);
// //     try {
// //       await createVariantType(newTypeName, newTypeStyle, `Config for ${newTypeName}`);
// //       setNewTypeName('');
// //       setIsAddingType(false);
// //       await loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleDeleteType = async (id) => {
// //     if (!window.confirm("Delete this Variant Type? All associated options and product links will be removed!")) return;
// //     try {
// //       await deleteVariantType(id);
// //       setSelectedType(null);
// //       await loadData();
// //     } catch (err) {
// //       alert("Cannot delete: " + err.message);
// //     }
// //   };

// //   // --- OPTION HANDLERS ---

// //   const handleCreateOption = async (e) => {
// //     e.preventDefault();
// //     if (!newOptionName) return;
// //     setIsSubmitting(true);

// //     // Construct Metadata based on style
// //     let metadata = null;
// //     if (selectedType.display_style === 'swatch') {
// //       // For swatches, we save the Tailwind class or Hex code
// //       // Here we assume Hex/Tailwind mapping, but for simplicity let's save the exact class string or hex
// //       metadata = { color: newOptionColor }; 
// //     }

// //     try {
// //       await createVariantOption(selectedType.id, newOptionName, metadata);
// //       setNewOptionName('');
// //       await loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   const handleDeleteOption = async (id) => {
// //     if (!window.confirm("Delete this option?")) return;
// //     try {
// //       await deleteVariantOption(id);
// //       await loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   // --- ICONS ---
// //   const getIcon = (style) => {
// //     switch(style) {
// //       case 'swatch': return <Palette size={18} className="text-purple-400" />;
// //       case 'pill': return <Ruler size={18} className="text-blue-400" />;
// //       default: return <Type size={18} className="text-slate-400" />;
// //     }
// //   };

// //   if (loading) return <div className="p-10 text-center text-white">Loading Config...</div>;

// //   return (
// //     <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6 overflow-hidden">
      
// //       {/* LEFT COLUMN: VARIANT TYPES LIST */}
// //       <div className="w-full md:w-1/3 bg-dark-900 border border-white/10 rounded-2xl flex flex-col overflow-hidden">
// //         <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
// //           <h2 className="font-bold text-white uppercase tracking-widest text-sm flex items-center gap-2">
// //             <Layers size={16} /> Global Variants
// //           </h2>
// //           <button onClick={() => setIsAddingType(true)} className="p-2 bg-brand-glow text-dark-900 rounded-lg hover:brightness-110">
// //             <Plus size={16} />
// //           </button>
// //         </div>

// //         {/* Add Type Form */}
// //         <AnimatePresence>
// //           {isAddingType && (
// //             <motion.form 
// //               initial={{ height: 0, opacity: 0 }}
// //               animate={{ height: 'auto', opacity: 1 }}
// //               exit={{ height: 0, opacity: 0 }}
// //               onSubmit={handleCreateType}
// //               className="p-4 bg-brand-glow/10 border-b border-white/10 space-y-3"
// //             >
// //                <input 
// //                  autoFocus
// //                  placeholder="Type Name (e.g. Material)"
// //                  value={newTypeName}
// //                  onChange={e => setNewTypeName(e.target.value)}
// //                  className="w-full bg-dark-950 border border-white/10 rounded-lg p-2 text-white text-sm outline-none focus:border-brand-glow"
// //                />
// //                <div className="flex gap-2">
// //                  <select 
// //                    value={newTypeStyle}
// //                    onChange={e => setNewTypeStyle(e.target.value)}
// //                    className="bg-dark-950 border border-white/10 rounded-lg p-2 text-white text-xs outline-none flex-1"
// //                  >
// //                    <option value="pill">Pill (Text)</option>
// //                    <option value="swatch">Swatch (Color)</option>
// //                    <option value="dropdown">Dropdown</option>
// //                  </select>
// //                  <button disabled={isSubmitting} className="px-3 bg-brand-glow text-dark-900 rounded-lg font-bold text-xs">Add</button>
// //                  <button type="button" onClick={() => setIsAddingType(false)} className="px-3 bg-white/10 text-white rounded-lg"><X size={14}/></button>
// //                </div>
// //             </motion.form>
// //           )}
// //         </AnimatePresence>

// //         {/* Type List */}
// //         <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
// //           {types.map(type => (
// //             <div 
// //               key={type.id}
// //               onClick={() => setSelectedType(type)}
// //               className={`p-4 rounded-xl cursor-pointer border transition-all flex items-center justify-between group ${
// //                 selectedType?.id === type.id 
// //                 ? 'bg-white/10 border-brand-glow/50 shadow-lg' 
// //                 : 'bg-transparent border-transparent hover:bg-white/5'
// //               }`}
// //             >
// //               <div className="flex items-center gap-3">
// //                  <div className="p-2 rounded-lg bg-dark-950 border border-white/5">
// //                    {getIcon(type.display_style)}
// //                  </div>
// //                  <div>
// //                    <h3 className="text-white font-bold text-sm">{type.name}</h3>
// //                    <p className="text-slate-500 text-[10px] uppercase font-mono">{type.display_style}</p>
// //                  </div>
// //               </div>
// //               <button 
// //                 onClick={(e) => { e.stopPropagation(); handleDeleteType(type.id); }}
// //                 className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
// //               >
// //                 <Trash2 size={16} />
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* RIGHT COLUMN: OPTIONS EDITOR */}
// //       <div className="flex-1 bg-dark-900 border border-white/10 rounded-2xl flex flex-col overflow-hidden relative">
// //         {!selectedType ? (
// //           <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
// //             <Layers size={48} className="mb-4 opacity-20" />
// //             <p>Select a Variant Type to configure</p>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
// //                <div>
// //                   <h2 className="text-2xl font-black text-white italic uppercase">{selectedType.name} <span className="text-brand-glow">Options</span></h2>
// //                   <p className="text-slate-400 text-sm">Configure available values for {selectedType.name}.</p>
// //                </div>
// //                <div className="px-3 py-1 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase">
// //                   ID: {selectedType.id}
// //                </div>
// //             </div>

// //             {/* Options List */}
// //             <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
// //                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// //                   {selectedType.options?.map(opt => (
// //                     <motion.div 
// //                       layout
// //                       initial={{ opacity: 0, scale: 0.9 }}
// //                       animate={{ opacity: 1, scale: 1 }}
// //                       key={opt.id} 
// //                       className="flex items-center justify-between p-4 bg-dark-950 border border-white/5 rounded-xl group hover:border-white/20 transition-colors"
// //                     >
// //                        <div className="flex items-center gap-4">
// //                           {/* Visual Preview based on Type Style */}
// //                           {selectedType.display_style === 'swatch' ? (
// //                              <div 
// //                                className="w-10 h-10 rounded-full border border-white/20 shadow-inner"
// //                                style={{ backgroundColor: opt.metadata?.color || '#333' }}
// //                              />
// //                           ) : (
// //                              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 font-bold text-xs border border-white/5">
// //                                 Aa
// //                              </div>
// //                           )}
                          
// //                           <div>
// //                              <p className="text-white font-bold">{opt.name}</p>
// //                              {opt.metadata && Object.keys(opt.metadata).length > 0 && (
// //                                 <p className="text-[10px] text-slate-500 font-mono">
// //                                   {JSON.stringify(opt.metadata)}
// //                                 </p>
// //                              )}
// //                           </div>
// //                        </div>

// //                        <button 
// //                          onClick={() => handleDeleteOption(opt.id)}
// //                          className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
// //                        >
// //                          <Trash2 size={16} />
// //                        </button>
// //                     </motion.div>
// //                   ))}
// //                </div>
// //             </div>

// //             {/* Create Option Footer */}
// //             <div className="p-6 border-t border-white/10 bg-dark-800">
// //                <form onSubmit={handleCreateOption} className="flex gap-4 items-end">
// //                   <div className="flex-1 space-y-2">
// //                      <label className="text-xs font-bold text-slate-500 uppercase">Option Name</label>
// //                      <input 
// //                        value={newOptionName}
// //                        onChange={e => setNewOptionName(e.target.value)}
// //                        placeholder={`e.g. ${selectedType.name === 'Flavor' ? 'Sour Apple' : 'Small'}`}
// //                        className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-brand-glow"
// //                      />
// //                   </div>
                  
// //                   {/* Conditional Input for Color Swatches */}
// //                   {selectedType.display_style === 'swatch' && (
// //                     <div className="space-y-2">
// //                        <label className="text-xs font-bold text-slate-500 uppercase">Color Hex</label>
// //                        <div className="flex items-center gap-2">
// //                           <input 
// //                             type="color" 
// //                             value={newOptionColor}
// //                             onChange={e => setNewOptionColor(e.target.value)}
// //                             className="h-11 w-12 rounded bg-transparent cursor-pointer"
// //                           />
// //                           <input 
// //                             value={newOptionColor}
// //                             onChange={e => setNewOptionColor(e.target.value)}
// //                             className="w-24 bg-dark-950 border border-white/10 rounded-xl px-3 py-3 text-white text-sm font-mono uppercase"
// //                           />
// //                        </div>
// //                     </div>
// //                   )}

// //                   <button 
// //                     disabled={isSubmitting || !newOptionName}
// //                     className="h-11 px-6 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
// //                   >
// //                      <Plus size={18} /> Add Option
// //                   </button>
// //                </form>
// //             </div>
// //           </>
// //         )}
// //       </div>

// //     </div>
// //   );
// // };

// // export default AdminVariants;
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Layers, Plus, Trash2, Edit2, Palette, Ruler, Type, 
//   Save, X, Check, AlertCircle, Eye, EyeOff, RefreshCcw
// } from 'lucide-react';
// import { 
//   getVariantConfig, createVariantType, deleteVariantType, toggleVariantTypeStatus,
//   createVariantOption, deleteVariantOption, toggleVariantOptionStatus, updateVariantOption 
// } from '../../api/adminVariantApi';

// const AdminVariants = () => {
//   const [types, setTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedType, setSelectedType] = useState(null);

//   // Modal / Form States
//   const [isAddingType, setIsAddingType] = useState(false);
//   const [newTypeName, setNewTypeName] = useState('');
//   const [newTypeStyle, setNewTypeStyle] = useState('pill');

//   // Option Form States
//   const [newOptionName, setNewOptionName] = useState('');
//   const [newOptionColor, setNewOptionColor] = useState('#3b82f6'); // Default Blue
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const data = await getVariantConfig();
//       setTypes(data);
      
//       // Handle selection logic after refresh
//       if (selectedType) {
//         const fresh = data.find(t => t.id === selectedType.id);
//         setSelectedType(fresh || (data.length > 0 ? data[0] : null));
//       } else if (data.length > 0) {
//         setSelectedType(data[0]);
//       }
//     } catch (error) {
//       console.error("Failed to load variants:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- TYPE HANDLERS ---

//   const handleCreateType = async (e) => {
//     e.preventDefault();
//     if (!newTypeName) return;
//     setIsSubmitting(true);
//     try {
//       await createVariantType(newTypeName, newTypeStyle, 'Custom variant type');
//       setNewTypeName('');
//       setIsAddingType(false);
//       await loadData();
//     } catch (err) {
//       setErrorMsg(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleToggleType = async (id, currentStatus, e) => {
//     e.stopPropagation();
//     try {
//       await toggleVariantTypeStatus(id, currentStatus);
//       await loadData();
//     } catch (err) {
//       alert("Error updating status: " + err.message);
//     }
//   };

//   const handleDeleteType = async (id, e) => {
//     e.stopPropagation();
//     if (!window.confirm("PERMANENTLY DELETE this variant type? This will fail if products are using it.")) return;
//     try {
//       await deleteVariantType(id);
//       setSelectedType(null); // Clear selection to prevent errors
//       await loadData();
//     } catch (err) {
//       alert("Cannot delete: " + err.message);
//     }
//   };

//   // --- OPTION HANDLERS ---

//   const handleCreateOption = async (e) => {
//     e.preventDefault();
//     if (!newOptionName || !selectedType) return;
//     setIsSubmitting(true);
    
//     const metadata = selectedType.display_style === 'swatch' 
//       ? { color: newOptionColor } 
//       : null;

//     try {
//       await createVariantOption(selectedType.id, newOptionName, metadata);
//       setNewOptionName('');
//       await loadData();
//     } catch (err) {
//       setErrorMsg(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleToggleOption = async (option, e) => {
//     e.stopPropagation();
//     try {
//       await toggleVariantOptionStatus(option.id, option.is_active);
//       await loadData();
//     } catch (err) {
//       alert("Error updating option: " + err.message);
//     }
//   };

//   const handleDeleteOption = async (id) => {
//     if (!window.confirm("Permanently delete this option?")) return;
//     try {
//       await deleteVariantOption(id);
//       await loadData();
//     } catch (err) {
//       alert("Error deleting option: " + err.message);
//     }
//   };

//   if (loading) return <div className="p-8 text-white">Loading configuration...</div>;

//   return (
//     <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
//       <div className="flex justify-between items-end mb-8">
//         <div>
//           <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Variant Config</h1>
//           <p className="text-slate-400">Manage attributes like Flavors, Sizes, and Colors.</p>
//         </div>
//         <button 
//           onClick={() => setIsAddingType(true)}
//           className="bg-brand-glow text-dark-900 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
//         >
//           <Plus size={18} /> New Type
//         </button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
//         {/* --- LEFT COLUMN: TYPES LIST --- */}
//         <div className="lg:col-span-1 space-y-4">
          
//           {/* Add Type Form */}
//           <AnimatePresence>
//             {isAddingType && (
//               <motion.form 
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: 'auto', opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 onSubmit={handleCreateType}
//                 className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3 overflow-hidden"
//               >
//                 <input 
//                   autoFocus
//                   placeholder="Type Name (e.g. Strength)"
//                   value={newTypeName}
//                   onChange={e => setNewTypeName(e.target.value)}
//                   className="w-full bg-dark-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-glow outline-none"
//                 />
//                 <div className="flex gap-2">
//                    {['pill', 'swatch'].map(style => (
//                      <button
//                         type="button"
//                         key={style}
//                         onClick={() => setNewTypeStyle(style)}
//                         className={`flex-1 py-1 text-xs uppercase font-bold rounded border ${newTypeStyle === style ? 'bg-brand-glow text-dark-900 border-brand-glow' : 'border-white/20 text-slate-400'}`}
//                      >
//                         {style}
//                      </button>
//                    ))}
//                 </div>
//                 <div className="flex gap-2 pt-2">
//                   <button type="button" onClick={() => setIsAddingType(false)} className="flex-1 py-2 bg-white/5 rounded-lg text-xs font-bold hover:bg-white/10">Cancel</button>
//                   <button type="submit" disabled={isSubmitting} className="flex-1 py-2 bg-brand-glow text-dark-900 rounded-lg text-xs font-bold hover:bg-cyan-300">Save</button>
//                 </div>
//               </motion.form>
//             )}
//           </AnimatePresence>

//           {/* Types List */}
//           <div className="space-y-2">
//             {types.map(type => (
//               <div 
//                 key={type.id}
//                 onClick={() => setSelectedType(type)}
//                 className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
//                   selectedType?.id === type.id 
//                   ? 'bg-brand-glow/10 border-brand-glow' 
//                   : type.is_active 
//                     ? 'bg-white/5 border-white/5 hover:border-white/20'
//                     : 'bg-dark-950 border-white/5 opacity-60'
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   {type.display_style === 'swatch' ? <Palette size={18} className={selectedType?.id === type.id ? 'text-brand-glow' : 'text-slate-500'} /> : <Type size={18} className={selectedType?.id === type.id ? 'text-brand-glow' : 'text-slate-500'} />}
//                   <div>
//                     <span className={`font-bold text-sm ${!type.is_active && 'line-through text-slate-500'}`}>{type.name}</span>
//                     <div className="text-[10px] text-slate-500 uppercase tracking-wider">{type.options.length} Options</div>
//                   </div>
//                 </div>
                
//                 <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                    {/* Toggle Active Status */}
//                    <button 
//                       onClick={(e) => handleToggleType(type.id, type.is_active, e)}
//                       title={type.is_active ? "Archive" : "Restore"}
//                       className={`p-2 rounded-lg hover:bg-white/10 ${type.is_active ? 'text-slate-400 hover:text-yellow-400' : 'text-green-400'}`}
//                    >
//                       {type.is_active ? <Eye size={14} /> : <RefreshCcw size={14} />}
//                    </button>
                   
//                    {/* Hard Delete (Only if inactive) */}
//                    {!type.is_active && (
//                      <button 
//                         onClick={(e) => handleDeleteType(type.id, e)}
//                         title="Permanently Delete"
//                         className="p-2 rounded-lg hover:bg-red-500/20 text-slate-600 hover:text-red-400"
//                      >
//                         <Trash2 size={14} />
//                      </button>
//                    )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- RIGHT COLUMN: OPTIONS MANAGEMENT --- */}
//         {selectedType && (
//           <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
//             {!selectedType.is_active && (
//                 <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500/50 z-10" />
//             )}
            
//             <div className="flex justify-between items-start mb-8">
//                <div>
//                   <h2 className="text-2xl font-bold text-white flex items-center gap-3">
//                     {selectedType.name} Options
//                     {!selectedType.is_active && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">ARCHIVED</span>}
//                   </h2>
//                   <p className="text-sm text-slate-400 mt-1">
//                     Display Style: <span className="text-brand-glow uppercase font-bold">{selectedType.display_style}</span>
//                   </p>
//                </div>
//             </div>

//             {/* Options Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//                {selectedType.options.map(option => (
//                  <div 
//                     key={option.id} 
//                     className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all ${
//                         option.is_active 
//                         ? 'bg-dark-900 border-white/5' 
//                         : 'bg-dark-950 border-white/5 opacity-60 border-dashed'
//                     }`}
//                  >
//                     {/* Visual Preview */}
//                     {selectedType.display_style === 'swatch' ? (
//                        <div 
//                          className="w-10 h-10 rounded-full border border-white/20 shadow-sm" 
//                          style={{ backgroundColor: option.metadata?.color || '#333' }} 
//                        />
//                     ) : (
//                        <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center font-bold text-slate-400 border border-white/10">
//                           <Type size={16} />
//                        </div>
//                     )}

//                     <div className="flex-1">
//                        <p className={`font-bold text-sm ${!option.is_active && 'line-through text-slate-500'}`}>{option.name}</p>
//                        <p className="text-[10px] text-slate-500 font-mono">ID: {option.id}</p>
//                     </div>

//                     <div className="flex flex-col gap-1">
//                         <button 
//                             onClick={(e) => handleToggleOption(option, e)}
//                             title={option.is_active ? "Archive" : "Restore"}
//                             className={`p-1.5 rounded hover:bg-white/10 ${option.is_active ? 'text-slate-500 hover:text-yellow-400' : 'text-green-400'}`}
//                         >
//                             {option.is_active ? <EyeOff size={14} /> : <RefreshCcw size={14} />}
//                         </button>
                        
//                         {!option.is_active && (
//                             <button 
//                                 onClick={() => handleDeleteOption(option.id)}
//                                 className="p-1.5 rounded hover:bg-red-500/20 text-slate-600 hover:text-red-400"
//                             >
//                                 <Trash2 size={14} />
//                             </button>
//                         )}
//                     </div>
//                  </div>
//                ))}
//             </div>

//             {/* Add Option Form - Only if Type is Active */}
//             {selectedType.is_active ? (
//               <div className="max-w-md bg-dark-900 border border-white/10 rounded-2xl p-6">
//                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
//                     <Plus size={14} className="text-brand-glow"/> Add New {selectedType.name}
//                  </h3>
//                  <form onSubmit={handleCreateOption} className="space-y-4">
//                     <div className="space-y-2">
//                        <label className="text-xs font-bold text-slate-500 uppercase">Option Name</label>
//                        <input 
//                           value={newOptionName}
//                           onChange={e => setNewOptionName(e.target.value)}
//                           placeholder={`e.g. ${selectedType.name === 'Flavor' ? 'Mint' : 'Small'}`}
//                           className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
//                        />
//                     </div>

//                     {selectedType.display_style === 'swatch' && (
//                       <div className="space-y-2">
//                          <label className="text-xs font-bold text-slate-500 uppercase">Color Hex</label>
//                          <div className="flex items-center gap-2">
//                             <input 
//                               type="color" 
//                               value={newOptionColor}
//                               onChange={e => setNewOptionColor(e.target.value)}
//                               className="h-11 w-12 rounded bg-transparent cursor-pointer border-none"
//                             />
//                             <input 
//                               value={newOptionColor}
//                               onChange={e => setNewOptionColor(e.target.value)}
//                               className="w-24 bg-dark-950 border border-white/10 rounded-xl px-3 py-3 text-white text-sm font-mono uppercase focus:border-brand-glow outline-none"
//                             />
//                          </div>
//                       </div>
//                     )}

//                     {errorMsg && (
//                         <div className="text-red-400 text-xs flex items-center gap-2">
//                             <AlertCircle size={12} /> {errorMsg}
//                         </div>
//                     )}

//                     <button 
//                       disabled={isSubmitting || !newOptionName}
//                       className="w-full h-11 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
//                     >
//                        <Plus size={18} /> Add Option
//                     </button>
//                  </form>
//               </div>
//             ) : (
//                 <div className="text-center p-8 border border-dashed border-white/10 rounded-2xl">
//                     <AlertCircle className="mx-auto text-yellow-500 mb-2" size={24} />
//                     <p className="text-slate-400">Restore this Variant Type to add new options.</p>
//                 </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminVariants;

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