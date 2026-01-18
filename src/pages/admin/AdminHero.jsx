import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, UploadCloud, Image as ImageIcon, Trash2, 
  LayoutTemplate, Type, MousePointer, Palette, Loader2, AlertCircle 
} from 'lucide-react';
import { adminHeroApi } from '../../api/adminHeroApi';

const AdminHero = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dbId, setDbId] = useState(null); // To track if we are updating or inserting

  // Text & Style State
  const [formData, setFormData] = useState({
    headline: '',
    subheadline: '',
    cta_text: '',
    cta_link: '',
    glow_color: '#3b82f6'
  });

  // Image State: Array of 4 slots. 
  // Each slot: { url: string | null, file: File | null, preview: string | null }
  const [imageSlots, setImageSlots] = useState([
    { label: 'Main Center (Largest)', url: null, file: null, preview: null },
    { label: 'Background Right (Blurred)', url: null, file: null, preview: null },
    { label: 'Foreground Left (Small)', url: null, file: null, preview: null },
    { label: 'Background Left (Far)', url: null, file: null, preview: null },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await adminHeroApi.getHeroConfig();
      if (data) {
        setDbId(data.id);
        setFormData({
          headline: data.headline,
          subheadline: data.subheadline,
          cta_text: data.cta_text,
          cta_link: data.cta_link,
          glow_color: data.glow_color || '#3b82f6'
        });

        // Map DB array strings to our local state object
        const dbImages = data.hero_images || [];
        setImageSlots(prev => prev.map((slot, index) => ({
          ...slot,
          url: dbImages[index] || null,
          file: null, 
          preview: null
        })));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load hero config");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageSlots(prev => {
        const newSlots = [...prev];
        newSlots[index] = { ...newSlots[index], file, preview: previewUrl };
        return newSlots;
      });
    }
  };

  const handleRemoveImage = (index) => {
    setImageSlots(prev => {
      const newSlots = [...prev];
      newSlots[index] = { ...newSlots[index], url: null, file: null, preview: null };
      return newSlots;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 1. Process Images (Upload new ones, keep old ones)
      const finalImageUrls = await Promise.all(imageSlots.map(async (slot) => {
        if (slot.file) {
          // Upload new file
          return await adminHeroApi.uploadHeroImage(slot.file);
        }
        // Return existing URL or null
        return slot.url;
      }));

      // 2. Prepare Payload
      const payload = {
        ...formData,
        hero_images: finalImageUrls
      };

      // 3. Save to DB
      const savedData = await adminHeroApi.saveHeroConfig(payload, dbId);
      
      // 4. Update local state with saved data
      setDbId(savedData.id);
      
      // Clean up file previews
      setImageSlots(prev => prev.map((slot, index) => ({
        ...slot,
        url: finalImageUrls[index],
        file: null,
        preview: null
      })));

      alert("Hero section updated successfully!");

    } catch (err) {
      console.error(err);
      alert("Error saving configuration: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading editor...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Hero Editor</h1>
          <p className="text-slate-400">Configure the main landing visual, text, and 3D parallax elements.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: TEXT & STYLING */}
        <div className="space-y-6">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-4 text-brand-glow font-bold uppercase tracking-wider text-xs">
                <Type size={14} /> Text Content
             </div>
             <div className="space-y-4">
                <InputGroup label="Headline" name="headline" value={formData.headline} onChange={handleTextChange} placeholder="Elevate Your Experience" />
                <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Subheadline</label>
                   <textarea 
                     name="subheadline"
                     value={formData.subheadline}
                     onChange={handleTextChange}
                     rows={3}
                     className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none resize-none"
                   />
                </div>
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-4 text-brand-glow font-bold uppercase tracking-wider text-xs">
                <MousePointer size={14} /> Call to Action
             </div>
             <div className="space-y-4">
                <InputGroup label="Button Text" name="cta_text" value={formData.cta_text} onChange={handleTextChange} />
                <InputGroup label="Button Link" name="cta_link" value={formData.cta_link} onChange={handleTextChange} placeholder="/shop" />
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-4 text-brand-glow font-bold uppercase tracking-wider text-xs">
                <Palette size={14} /> Aesthetics
             </div>
             <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Smoke Glow Color</label>
                <div className="flex items-center gap-4">
                   <input 
                     type="color" 
                     name="glow_color"
                     value={formData.glow_color}
                     onChange={handleTextChange}
                     className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-none"
                   />
                   <div className="text-sm font-mono text-slate-400">{formData.glow_color}</div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                   This color illuminates the background smoke effect behind the product.
                </p>
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 3D COMPOSITION */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2 text-brand-glow font-bold uppercase tracking-wider text-xs">
                    <LayoutTemplate size={14} /> 3D Parallax Composition
                 </div>
                 <div className="text-xs text-slate-500 flex items-center gap-1">
                    <AlertCircle size={12} /> Upload Transparent PNGs
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {imageSlots.map((slot, index) => (
                    <div key={index} className="relative group">
                       <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide flex justify-between">
                          <span>Layer {index + 1}: {slot.label}</span>
                          {(slot.url || slot.preview) && (
                             <button onClick={() => handleRemoveImage(index)} className="text-red-400 hover:text-red-300">Remove</button>
                          )}
                       </div>
                       
                       <label className={`block w-full aspect-square rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden relative ${
                          (slot.url || slot.preview) ? 'border-brand-glow/30 bg-dark-950' : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                       }`}>
                          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => handleImageSelect(index, e)} className="hidden" />
                          
                          {(slot.preview || slot.url) ? (
                             <div className="w-full h-full p-4 flex items-center justify-center">
                                <img 
                                  src={slot.preview || slot.url} 
                                  alt={`Layer ${index}`} 
                                  className="max-w-full max-h-full object-contain drop-shadow-2xl" 
                                  laoding="lazy"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                   <p className="text-white font-bold text-sm flex items-center gap-2"><UploadCloud size={16} /> Change Image</p>
                                </div>
                             </div>
                          ) : (
                             <div className="flex flex-col items-center justify-center h-full text-slate-500 group-hover:text-white transition-colors">
                                <ImageIcon size={32} className="mb-2" />
                                <span className="text-xs font-bold">Click to Upload</span>
                             </div>
                          )}
                       </label>
                    </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Helper
const InputGroup = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
    <input 
      type="text" 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none transition-colors"
    />
  </div>
);

export default AdminHero;