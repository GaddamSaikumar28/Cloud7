
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Upload, Plus, Trash, Layers, AlertCircle, Loader2, X } from 'lucide-react';
import { getConfigData, getProductForEdit, saveProduct, uploadProductImage } from '../../api/adminProductApi';

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditing = !!slug;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [config, setConfig] = useState({ categories: [], variantTypes: [], variantOptions: [] });

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    category_id: '',
    potency: '',
    image_color: 'from-cyan-500 to-blue-500', 
    features: [''],
    details: { highlights: [], ingredients: [], usage: [] },
    rating: '5.0',
    reviews_count: 0,
    cover_image_url: '',
    gallery_images: []
  });

  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [generatedVariants, setGeneratedVariants] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const configData = await getConfigData();
        setConfig(configData);

        if (isEditing) {
          const product = await getProductForEdit(slug);
          
          setFormData({
            id: product.id,
            name: product.name,
            slug: product.slug,
            tagline: product.tagline || '',
            description: product.description || '',
            category_id: product.category_id,
            potency: product.potency || '',
            image_color: product.image_color || 'from-cyan-500 to-blue-500',
            features: product.features || [''],
            details: product.details || { highlights: [], ingredients: [], usage: [] },
            rating: product.rating,
            reviews_count: product.reviews_count,
            cover_image_url: product.cover_image_url || '',
            gallery_images: product.gallery_images || []
          });

          if (product.product_variants) {
             const variants = product.product_variants.map(v => ({
               id: v.id, // KEEP ID for Update Logic
               sku: v.sku,
               price: v.price,
               stock_quantity: v.stock_quantity,
               optionIds: v.variant_selection_map.map(m => m.option.id),
               name: v.variant_selection_map.map(m => m.option.name).join(' / ')
             }));
             setGeneratedVariants(variants);
          }
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [slug, isEditing]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (idx, val) => {
    const newFeatures = [...formData.features];
    newFeatures[idx] = val;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleDetailChange = (key, idx, val) => {
    const newDetails = { ...formData.details };
    if (!newDetails[key]) newDetails[key] = [];
    newDetails[key][idx] = val;
    setFormData(prev => ({ ...prev, details: newDetails }));
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadProductImage(file);
      if (field === 'cover_image_url') {
        setFormData(prev => ({ ...prev, cover_image_url: url }));
      } else {
        setFormData(prev => ({ ...prev, gallery_images: [...prev.gallery_images, url] }));
      }
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  const removeGalleryImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== indexToRemove)
    }));
  };

  // --- VARIANT LOGIC ---
  const handleOptionToggle = (typeId, optionId) => {
    setSelectedOptions(prev => {
      const current = prev[typeId] || [];
      const updated = current.includes(optionId) 
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      return { ...prev, [typeId]: updated };
    });
  };

  const generateVariants = () => {
    const typeIds = Object.keys(selectedOptions).filter(k => selectedOptions[k].length > 0);
    if (typeIds.length === 0) return alert("Select at least one option.");

    let combinations = [[]];
    typeIds.forEach(typeId => {
      const optionIds = selectedOptions[typeId];
      const newCombinations = [];
      combinations.forEach(combo => {
        optionIds.forEach(optId => {
          newCombinations.push([...combo, optId]);
        });
      });
      combinations = newCombinations;
    });

    const newRows = [];
    let duplicateCount = 0;

    combinations.forEach(comboIds => {
      const newFingerprint = comboIds.map(Number).sort((a, b) => a - b).join('|');

      const exists = generatedVariants.some(v => {
        if (!v.optionIds) return false;
        const existingFingerprint = v.optionIds.map(Number).sort((a, b) => a - b).join('|');
        return existingFingerprint === newFingerprint;
      });

      if (exists) {
        duplicateCount++;
      } else {
        const names = comboIds.map(id => config.variantOptions.find(o => Number(o.id) === Number(id))?.name).join(' / ');
        const skuGen = `${formData.slug.substring(0,4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        
        newRows.push({
          id: null,
          sku: skuGen,
          price: 0,
          stock_quantity: 100,
          optionIds: comboIds,
          name: names
        });
      }
    });

    if (newRows.length === 0) {
      if (duplicateCount > 0) alert(`No new variants added. ${duplicateCount} combinations already exist.`);
    } else {
      setGeneratedVariants(prev => [...prev, ...newRows]);
    }
    
    setSelectedOptions({});
  };

  const handleVariantChange = (idx, field, val) => {
    const updated = [...generatedVariants];
    updated[idx][field] = val;
    setGeneratedVariants(updated);
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const cleanData = { ...formData };
      cleanData.features = cleanData.features.filter(f => f.trim() !== '');
      
      await saveProduct(cleanData, generatedVariants);
      
      navigate('/admin/products');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate('/admin/products')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-black text-white uppercase">{isEditing ? 'Edit Protocol' : 'New Protocol'}</h1>
        </div>
        <button type="submit" disabled={saving} className="px-8 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50">
           {saving ? <Loader2 className="animate-spin"/> : <Save size={18} />} Save Config
        </button>
      </div>

      {/* 1. BASIC INFO */}
      <div className="bg-dark-900 border border-white/10 rounded-3xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-brand-glow uppercase tracking-widest mb-4">Core Metadata</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Product Name</label>
            <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Slug (URL)</label>
            <input required name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none" />
          </div>
          <div className="space-y-2 col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Tagline</label>
            <input name="tagline" value={formData.tagline} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none" />
          </div>
          <div className="space-y-2 col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea rows={4} name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
            <select name="category_id" value={formData.category_id} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none appearance-none">
               <option value="">Select...</option>
               {config.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Potency Label</label>
            <input name="potency" value={formData.potency} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Theme Color</label>
            <select name="image_color" value={formData.image_color} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none">
              <option value="from-cyan-500 to-blue-500">Cyan / Blue</option>
              <option value="from-purple-500 to-pink-500">Purple / Pink</option>
              <option value="from-red-600 to-orange-600">Red / Orange</option>
              <option value="from-green-500 to-emerald-600">Green / Emerald</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. MEDIA UPLOAD */}
      <div className="bg-dark-900 border border-white/10 rounded-3xl p-8">
         <h3 className="text-lg font-bold text-brand-glow uppercase tracking-widest mb-4">Visual Assets</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Cover Image</label>
               <div className="relative aspect-square bg-dark-950 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group hover:border-brand-glow transition-colors">
                  {formData.cover_image_url ? (
                    <img  laoding="lazy" src={formData.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="text-slate-600" />
                  )}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'cover_image_url')} />
               </div>
            </div>
            <div>
               <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Gallery ({formData.gallery_images.length})</label>
               <div className="grid grid-cols-3 gap-2">
                  {formData.gallery_images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg bg-dark-950 overflow-hidden border border-white/10 group">
                      <img laoding="lazy" src={img} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <div className="aspect-square bg-dark-950 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center relative hover:border-brand-glow transition-colors">
                     <Plus className="text-slate-600" />
                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'gallery')} />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. DETAILS JSON BUILDER */}
      <div className="bg-dark-900 border border-white/10 rounded-3xl p-8">
         <h3 className="text-lg font-bold text-brand-glow uppercase tracking-widest mb-4">Product Details (JSON)</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['highlights', 'ingredients', 'usage'].map(section => (
               <div key={section} className="space-y-2">
                  <div className="flex justify-between">
                     <label className="text-xs font-bold text-slate-500 uppercase">{section}</label>
                     <button type="button" onClick={() => {
                        const newArr = [...(formData.details[section] || []), ''];
                        setFormData({...formData, details: {...formData.details, [section]: newArr}});
                     }} className="text-xs text-brand-glow font-bold">+ Add Line</button>
                  </div>
                  {formData.details[section]?.map((val, i) => (
                    <input 
                      key={i} 
                      value={val} 
                      onChange={(e) => handleDetailChange(section, i, e.target.value)}
                      className="w-full bg-dark-950 border border-white/10 rounded-lg p-2 text-white text-sm mb-1" 
                    />
                  ))}
               </div>
            ))}
         </div>
      </div>

      {/* 4. VARIANT CONFIGURATION */}
      <div className="bg-dark-900 border border-white/10 rounded-3xl p-8">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-brand-glow uppercase tracking-widest">SKU & Variants</h3>
         </div>
         
         {/* Generator UI */}
         <div className="bg-dark-950 rounded-2xl p-6 mb-8 border border-white/5">
            <h4 className="text-white font-bold mb-4">1. Select Options to Generate Combinations</h4>
            <div className="flex flex-wrap gap-8">
               {config.variantTypes.map(type => (
                 <div key={type.id}>
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">{type.name}</p>
                    <div className="flex flex-wrap gap-2">
                       {config.variantOptions.filter(o => o.type_id === type.id || (!o.type_id && type.name === 'Flavor')).map(opt => (
                         <button
                           key={opt.id}
                           type="button"
                           onClick={() => handleOptionToggle(type.id, opt.id)}
                           className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                             selectedOptions[type.id]?.includes(opt.id) 
                             ? 'bg-brand-glow text-dark-900 border-brand-glow' 
                             : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30'
                           }`}
                         >
                           {opt.name}
                         </button>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
            <button type="button" onClick={generateVariants} className="mt-6 w-full py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 border border-white/10 flex items-center justify-center gap-2">
               <Layers size={18} /> Generate Variant Matrix
            </button>
         </div>

         {/* Variants Table */}
         {generatedVariants.length > 0 ? (
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-slate-400">
               <thead className="bg-white/5 uppercase text-xs font-bold">
                 <tr>
                   <th className="p-3">Variant Name</th>
                   <th className="p-3">SKU</th>
                   <th className="p-3">Price ($)</th>
                   <th className="p-3">Stock</th>
                   <th className="p-3">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {generatedVariants.map((v, i) => (
                   <tr key={i}>
                     <td className="p-3 text-white font-bold">{v.name}</td>
                     <td className="p-3"><input value={v.sku} onChange={(e) => handleVariantChange(i, 'sku', e.target.value)} className="bg-dark-950 border border-white/10 rounded p-2 text-white w-full" /></td>
                     <td className="p-3"><input type="number" step="0.01" value={v.price} onChange={(e) => handleVariantChange(i, 'price', e.target.value)} className="bg-dark-950 border border-white/10 rounded p-2 text-white w-24" /></td>
                     <td className="p-3"><input type="number" value={v.stock_quantity} onChange={(e) => handleVariantChange(i, 'stock_quantity', e.target.value)} className="bg-dark-950 border border-white/10 rounded p-2 text-white w-20" /></td>
                     <td className="p-3">
                       <button type="button" onClick={() => setGeneratedVariants(prev => prev.filter((_, idx) => idx !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash size={16}/></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         ) : (
           <div className="text-center p-8 border-2 border-dashed border-white/10 rounded-2xl">
              <AlertCircle className="mx-auto text-slate-600 mb-2" />
              <p className="text-slate-500">No variants configured. Use the generator above.</p>
           </div>
         )}
      </div>

    </form>
  );
};

export default AdminProductForm;