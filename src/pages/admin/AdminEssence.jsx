import React, { useState, useEffect } from 'react';
import { 
  Save, Layout, Type, Palette, AlignLeft, 
  Loader2, CheckCircle, AlertTriangle, Atom 
} from 'lucide-react';
import { adminEssenceApi } from '../../api/adminEssenceApi';

const AdminEssence = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    heading: '',
    subheading: '',
    paragraph_1: '',
    paragraph_2: '',
    footer_text: '',
    glow_color: '#0ea5e9',
    is_active: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await adminEssenceApi.getConfig();
      setFormData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Color Preset Helper
  const applyColor = (color) => {
    setFormData(prev => ({ ...prev, glow_color: color }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      if (!formData.heading.trim()) throw new Error("Heading is required.");
      
      const saved = await adminEssenceApi.saveConfig(formData);
      setFormData(saved); // Update local state with the saved ID
      alert("Essence Section updated!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 flex items-center justify-center text-slate-500"><Loader2 className="animate-spin mr-2"/> Loading...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white pb-32">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2 flex items-center gap-3">
             <Atom className="text-brand-glow" /> Essence Config
          </h1>
          <p className="text-slate-400">Manage the "Cloud7 Essence" 3D molecule section.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
           <AlertTriangle size={20} /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- LEFT COL: TEXT CONTENT --- */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-6 text-brand-glow font-bold uppercase tracking-wider text-xs">
                <Type size={14} /> Text Content
             </div>
             
             <div className="space-y-4">
                <InputGroup 
                   label="Main Heading" 
                   name="heading" 
                   value={formData.heading} 
                   onChange={handleChange} 
                   placeholder="The Cloud7 Essence"
                />
                <InputGroup 
                   label="Subheading (Small Tag)" 
                   name="subheading" 
                   value={formData.subheading} 
                   onChange={handleChange} 
                   placeholder="Bio-Available Engineering"
                />
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-6 text-brand-glow font-bold uppercase tracking-wider text-xs">
                <AlignLeft size={14} /> Paragraphs
             </div>
             
             <div className="space-y-4">
                <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Paragraph 1 (Intro)</label>
                   <textarea 
                     name="paragraph_1"
                     value={formData.paragraph_1}
                     onChange={handleChange}
                     rows={3}
                     className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none resize-none"
                   />
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Paragraph 2 (Highlight)</label>
                   <textarea 
                     name="paragraph_2"
                     value={formData.paragraph_2}
                     onChange={handleChange}
                     rows={3}
                     className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none resize-none"
                   />
                </div>
             </div>
          </div>
        </div>

        {/* --- RIGHT COL: VISUALS & SETTINGS --- */}
        <div className="space-y-6">
           
           {/* Color Theme */}
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6 text-brand-glow font-bold uppercase tracking-wider text-xs">
                 <Palette size={14} /> Appearance
              </div>

              <div className="mb-6">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Glow Color</label>
                 <div className="flex items-center gap-4">
                    <input 
                       type="color" 
                       name="glow_color"
                       value={formData.glow_color}
                       onChange={handleChange}
                       className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                    />
                    <div className="flex gap-2">
                       {/* Preset Swatches */}
                       <ColorSwatch color="#0ea5e9" onClick={() => applyColor('#0ea5e9')} active={formData.glow_color === '#0ea5e9'} />
                       <ColorSwatch color="#8b5cf6" onClick={() => applyColor('#8b5cf6')} active={formData.glow_color === '#8b5cf6'} />
                       <ColorSwatch color="#10b981" onClick={() => applyColor('#10b981')} active={formData.glow_color === '#10b981'} />
                       <ColorSwatch color="#f43f5e" onClick={() => applyColor('#f43f5e')} active={formData.glow_color === '#f43f5e'} />
                    </div>
                 </div>
              </div>

              <InputGroup 
                 label="Footer Text" 
                 name="footer_text" 
                 value={formData.footer_text} 
                 onChange={handleChange} 
                 placeholder="SINCE INCEPTION..."
              />
           </div>

           {/* Live Preview Card */}
           <div className="bg-dark-950 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
               <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Mini Preview</div>
               
               {/* Simulating the frontend card */}
               <div className="relative bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-md">
                  {/* Dynamic Glow */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: formData.glow_color }}
                  />
                  
                  <div className="flex items-center gap-2 mb-2">
                     <div className="w-1 h-3 rounded-full" style={{ backgroundColor: formData.glow_color }} />
                     <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: formData.glow_color }}>
                        {formData.subheading || 'Subheading'}
                     </span>
                  </div>

                  <h3 className="text-xl font-light text-white mb-3">
                     {formData.heading || 'Heading'}
                  </h3>
                  
                  <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
                     <p className="line-clamp-2">{formData.paragraph_1 || 'Para 1...'}</p>
                  </div>
               </div>
           </div>

           {/* Visibility Toggle */}
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
              <div>
                 <h3 className="font-bold text-white">Section Visibility</h3>
                 <p className="text-xs text-slate-400">Toggle "On" to show on homepage.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                 <input 
                   type="checkbox" 
                   name="is_active"
                   checked={formData.is_active} 
                   onChange={handleChange} 
                   className="sr-only peer" 
                 />
                 <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-glow"></div>
              </label>
           </div>

        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

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

const ColorSwatch = ({ color, onClick, active }) => (
   <button
     type="button"
     onClick={onClick}
     className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${active ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70'}`}
     style={{ backgroundColor: color }}
   />
);

export default AdminEssence;