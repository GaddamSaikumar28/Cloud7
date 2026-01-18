import React, { useState, useEffect } from 'react';
import { 
  Save, LayoutTemplate, Type, Link as LinkIcon, 
  ListPlus, Star, Trash2, Plus, Loader2, MessageSquare, ShieldCheck
} from 'lucide-react';
import { adminCtaApi } from '../../api/adminCtaApi';

const AdminCTA = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    heading_line_1: '',
    heading_line_2: '',
    body_text: '',
    cta_text: '',
    cta_link: '',
    features: [],
    review_stars: 5,
    review_title: '',
    review_quote: '',
    review_author_label: '',
    is_active: true
  });

  // Temporary state for the "Add Feature" input
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await adminCtaApi.getConfig();
      // Ensure features is an array even if DB returns null
      setFormData({
        ...data,
        features: data.features || []
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load CTA config.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Feature Array Logic
  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!newFeature.trim()) return;
    
    // Prevent duplicates
    if (formData.features.includes(newFeature.trim())) {
      alert("This tag already exists.");
      return;
    }

    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeature.trim()]
    }));
    setNewFeature('');
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== featureToRemove)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Basic Validation
      if (!formData.heading_line_1 || !formData.cta_link) {
        throw new Error("Headline and Link are required.");
      }

      const saved = await adminCtaApi.saveConfig(formData);
      setFormData(saved); // Update state with backend response (includes ID)
      alert("CTA Section updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/> Loading editor...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white pb-32">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Home CTA Config</h1>
          <p className="text-slate-400">Manage the "Level Up Your Biology" section.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COL: MAIN COPY */}
        <div className="space-y-6">
          
          {/* Headlines */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-6 text-brand-glow font-bold uppercase tracking-wider text-xs">
                <LayoutTemplate size={14} /> Main Copy
             </div>
             
             <div className="space-y-4">
                <InputGroup 
                  label="Heading Line 1 (White)" 
                  name="heading_line_1" 
                  value={formData.heading_line_1} 
                  onChange={handleChange} 
                  placeholder="Level Up" 
                />
                <InputGroup 
                  label="Heading Line 2 (Gradient)" 
                  name="heading_line_2" 
                  value={formData.heading_line_2} 
                  onChange={handleChange} 
                  placeholder="Your Biology" 
                />
                <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Body Text</label>
                   <textarea 
                     name="body_text"
                     value={formData.body_text}
                     onChange={handleChange}
                     rows={4}
                     className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none resize-none"
                   />
                </div>
             </div>
          </div>

          {/* Button Config */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-6 text-brand-glow font-bold uppercase tracking-wider text-xs">
                <LinkIcon size={14} /> Action Button
             </div>
             <div className="grid grid-cols-2 gap-4">
                <InputGroup label="Button Text" name="cta_text" value={formData.cta_text} onChange={handleChange} />
                <InputGroup label="Link Route" name="cta_link" value={formData.cta_link} onChange={handleChange} placeholder="/shop" />
             </div>
          </div>

          {/* Feature Tags Manager */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-6 text-brand-glow font-bold uppercase tracking-wider text-xs">
                <ListPlus size={14} /> Feature Tags
             </div>
             
             <div className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="New tag (e.g. Lab Verified)"
                  className="flex-1 bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddFeature(e)}
                />
                <button 
                  onClick={handleAddFeature}
                  className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors"
                >
                  <Plus size={20} />
                </button>
             </div>

             <div className="flex flex-wrap gap-2">
                {formData.features.length === 0 && <span className="text-slate-500 text-xs italic">No tags added yet.</span>}
                
                {formData.features.map((feat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-brand-glow/10 border border-brand-glow/20 rounded-lg text-brand-glow text-xs font-bold uppercase">
                     {feat}
                     <button onClick={() => handleRemoveFeature(feat)} className="hover:text-white transition-colors">
                        <Trash2 size={12} />
                     </button>
                  </span>
                ))}
             </div>
          </div>

        </div>

        {/* RIGHT COL: TESTIMONIAL & SETTINGS */}
        <div className="space-y-6">
           
           {/* Testimonial Config */}
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6 text-brand-glow font-bold uppercase tracking-wider text-xs">
                 <MessageSquare size={14} /> Featured Review
              </div>

              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Star Rating</label>
                    <div className="flex gap-1">
                       {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setFormData({...formData, review_stars: star})}
                            className={`transition-transform hover:scale-110 ${star <= formData.review_stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                          >
                             <Star size={24} />
                          </button>
                       ))}
                    </div>
                 </div>

                 <InputGroup label="Review Title" name="review_title" value={formData.review_title} onChange={handleChange} placeholder="5-Star Potency" />
                 
                 <div>
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Quote</label>
                   <textarea 
                     name="review_quote"
                     value={formData.review_quote}
                     onChange={handleChange}
                     rows={3}
                     className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none resize-none"
                   />
                </div>

                <InputGroup label="Author Label" name="review_author_label" value={formData.review_author_label} onChange={handleChange} placeholder="VERIFIED BUYER" />
              </div>
           </div>

           {/* Preview Card (Visual Aid) */}
           <div className="bg-dark-950 border border-white/10 rounded-2xl p-6 opacity-80">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <ShieldCheck size={14} /> Mini Preview
              </div>
              <div className="bg-dark-900/60 p-6 rounded-xl border border-white/10 text-center">
                 <div className="flex justify-center gap-1 mb-2">
                    {[...Array(formData.review_stars)].map((_, i) => (
                       <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                 </div>
                 <h4 className="text-white font-bold mb-2">"{formData.review_title || 'Title'}"</h4>
                 <p className="text-slate-400 text-xs italic mb-4">"{formData.review_quote || 'Quote text...'}"</p>
                 <span className="text-[10px] text-brand-glow font-bold uppercase tracking-widest bg-brand-glow/10 px-2 py-1 rounded">
                    {formData.review_author_label}
                 </span>
              </div>
           </div>

           {/* Status */}
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
              <div>
                 <h3 className="font-bold text-white">Section Status</h3>
                 <p className="text-xs text-slate-400">Hide this section from the homepage without deleting data.</p>
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

// Reusable Input Component
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

export default AdminCTA;