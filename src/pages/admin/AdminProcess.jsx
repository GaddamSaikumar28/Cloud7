import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  Save, Plus, Edit2, Trash2, ArrowUp, ArrowDown, 
  Search, X, Loader2, Layers, CheckCircle 
} from 'lucide-react';
import { adminProcessApi } from '../../api/adminProcessApi';

// Common icons relevant to the process/science theme
const SUGGESTED_ICONS = [
  "Leaf", "FlaskConical", "Pill", "ShieldCheck", "Microscope", "Activity", 
  "Droplet", "Sun", "Wind", "Thermometer", "Truck", "Package", "CheckCircle",
  "Box", "Clock", "Zap", "Award", "Beaker"
];

const AdminProcess = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Data State
  const [section, setSection] = useState(null);
  const [steps, setSteps] = useState([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null); // null = new
  const [stepForm, setStepForm] = useState({
    icon_name: 'Circle',
    label: '',
    description: '',
    accent_color: '#0ea5e9',
    is_active: true
  });
  const [iconSearch, setIconSearch] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await adminProcessApi.getData();
      setSection(data.section);
      setSteps(data.steps);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS: SECTION ---

  const handleSectionChange = (e) => {
    const { name, value } = e.target;
    setSection(prev => ({ ...prev, [name]: value }));
  };

  const saveSection = async () => {
    setSaving(true);
    try {
      const saved = await adminProcessApi.saveSection(section);
      setSection(saved);
      alert("Section Settings Saved!");
    } catch (err) {
      alert("Error saving section: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // --- HANDLERS: STEPS ---

  const openStepModal = (step = null) => {
    if (!section?.id) {
        return alert("Please save the 'Section Settings' first to create a container for your steps.");
    }
    if (step) {
      setEditingStep(step);
      setStepForm({ ...step });
    } else {
      setEditingStep(null);
      setStepForm({
        section_id: section.id,
        icon_name: 'Leaf',
        label: '',
        description: '',
        accent_color: '#0ea5e9',
        is_active: true,
        sort_order: steps.length + 1
      });
    }
    setIsModalOpen(true);
  };

  const handleStepSave = async (e) => {
    e.preventDefault();
    if(!stepForm.label) return alert("Label is required");

    setSaving(true);
    try {
      await adminProcessApi.saveStep(stepForm);
      setIsModalOpen(false);
      loadData(); // Refresh list
    } catch (err) {
      alert("Error saving step: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStep = async (id) => {
    if (!window.confirm("Delete this step?")) return;
    try {
      await adminProcessApi.deleteStep(id);
      loadData();
    } catch (err) {
      alert("Error deleting step");
    }
  };

  const handleMoveStep = async (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === steps.length - 1) return;

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    
    setSteps(newSteps); // Optimistic UI
    try {
      await adminProcessApi.reorderSteps(newSteps);
    } catch (err) {
      alert("Failed to save order");
      loadData();
    }
  };

  // Icon Filtering
  const filteredIcons = SUGGESTED_ICONS.filter(i => i.toLowerCase().includes(iconSearch.toLowerCase()));
  const CurrentIcon = LucideIcons[stepForm.icon_name] || LucideIcons.HelpCircle;

  if (loading) return <div className="p-12 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/> Loading...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white pb-40">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Process Config</h1>
          <p className="text-slate-400">Manage the "How it Works" animated steps.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* LEFT COL: SECTION CONFIG */}
        <div className="xl:col-span-1 space-y-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6 text-brand-glow font-bold uppercase tracking-wider text-xs">
                 <Layers size={14} /> Section Header
              </div>
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Heading</label>
                    <input 
                      type="text" 
                      name="heading"
                      value={section?.heading || ''} 
                      onChange={handleSectionChange}
                      className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none"
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Subheading</label>
                    <input 
                      type="text" 
                      name="subheading"
                      value={section?.subheading || ''} 
                      onChange={handleSectionChange}
                      className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none"
                    />
                 </div>
                 <button 
                   onClick={saveSection}
                   disabled={saving}
                   className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                 >
                   {saving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16} />} Save Header
                 </button>
              </div>
           </div>
        </div>

        {/* RIGHT COL: STEPS MANAGER */}
        <div className="xl:col-span-2">
           <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
                 <h2 className="font-bold text-white flex items-center gap-2">
                    <Layers size={18} className="text-brand-glow" /> Steps ({steps.length})
                 </h2>
                 <button 
                   onClick={() => openStepModal()}
                   className="px-4 py-2 bg-brand-glow text-dark-900 font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 text-sm"
                 >
                    <Plus size={16} /> Add Step
                 </button>
              </div>

              <div className="divide-y divide-white/5">
                 {steps.map((step, index) => {
                    const StepIcon = LucideIcons[step.icon_name] || LucideIcons.Circle;
                    return (
                       <div key={step.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group">
                          
                          {/* Reorder Controls */}
                          <div className="flex flex-col gap-1">
                             <button onClick={() => handleMoveStep(index, 'up')} disabled={index === 0} className="text-slate-600 hover:text-white disabled:opacity-20"><ArrowUp size={14}/></button>
                             <button onClick={() => handleMoveStep(index, 'down')} disabled={index === steps.length - 1} className="text-slate-600 hover:text-white disabled:opacity-20"><ArrowDown size={14}/></button>
                          </div>

                          {/* Visual Preview */}
                          <div 
                             className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0"
                             style={{ borderColor: step.accent_color, backgroundColor: `${step.accent_color}10` }}
                          >
                             <StepIcon size={20} style={{ color: step.accent_color }} />
                          </div>

                          {/* Text Info */}
                          <div className="flex-1 min-w-0">
                             <h4 className="font-bold text-white truncate">{step.label}</h4>
                             <p className="text-xs text-slate-400 truncate">{step.description}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => openStepModal(step)} className="p-2 bg-white/5 rounded hover:bg-white/20 text-white"><Edit2 size={16}/></button>
                             <button onClick={() => handleDeleteStep(step.id)} className="p-2 bg-red-500/10 rounded hover:bg-red-500 text-red-400 hover:text-white"><Trash2 size={16}/></button>
                          </div>
                       </div>
                    );
                 })}
                 {steps.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                       No steps yet. Save the header, then click "Add Step".
                    </div>
                 )}
              </div>
           </div>
        </div>

      </div>

      {/* --- STEP EDITOR MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="w-full max-w-2xl bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                 <h3 className="font-bold text-white text-lg">{editingStep ? 'Edit Step' : 'New Step'}</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={24}/></button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                 
                 {/* Live Preview */}
                 <div className="flex items-center justify-center mb-6">
                    <div className="flex flex-col items-center text-center">
                       <div 
                          className="w-20 h-20 rounded-full border flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                          style={{ borderColor: stepForm.accent_color, backgroundColor: `${stepForm.accent_color}10` }}
                       >
                          <CurrentIcon size={32} style={{ color: stepForm.accent_color }} />
                       </div>
                       <span className="font-bold text-white">{stepForm.label || 'Step Name'}</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Label</label>
                       <input 
                         type="text" 
                         value={stepForm.label}
                         onChange={e => setStepForm({...stepForm, label: e.target.value})}
                         className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none"
                         placeholder="e.g. Extraction"
                       />
                    </div>
                    <div className="col-span-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Description</label>
                       <textarea 
                         rows={2}
                         value={stepForm.description}
                         onChange={e => setStepForm({...stepForm, description: e.target.value})}
                         className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none resize-none"
                         placeholder="e.g. Cold-press nano extraction..."
                       />
                    </div>
                    
                    {/* Color Picker */}
                    <div className="col-span-2 md:col-span-1">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Accent Glow</label>
                       <div className="flex gap-2">
                          <input 
                             type="color" 
                             value={stepForm.accent_color}
                             onChange={e => setStepForm({...stepForm, accent_color: e.target.value})}
                             className="h-10 w-12 rounded bg-transparent cursor-pointer border-0 p-0"
                          />
                          <div className="flex-1 flex gap-1">
                             {['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ef4444'].map(c => (
                                <button 
                                  key={c}
                                  type="button"
                                  onClick={() => setStepForm({...stepForm, accent_color: c})}
                                  className="w-8 h-full rounded hover:scale-110 transition-transform"
                                  style={{ backgroundColor: c }}
                                />
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Icon Grid */}
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Icon</label>
                       <div className="relative">
                          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input 
                             type="text" 
                             placeholder="Search..." 
                             className="bg-dark-950 border border-white/10 rounded text-xs py-1 pl-6 text-white w-24 focus:border-brand-glow outline-none"
                             onChange={e => setIconSearch(e.target.value)}
                          />
                       </div>
                    </div>
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-40 overflow-y-auto bg-dark-950 p-2 rounded-xl border border-white/10 custom-scrollbar">
                       {filteredIcons.map(iconName => {
                          const Icon = LucideIcons[iconName];
                          return (
                             <button
                               key={iconName}
                               type="button"
                               onClick={() => setStepForm({...stepForm, icon_name: iconName})}
                               className={`p-2 rounded flex items-center justify-center transition-all ${stepForm.icon_name === iconName ? 'bg-brand-glow text-dark-900' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                               title={iconName}
                             >
                                <Icon size={20} />
                             </button>
                          )
                       })}
                    </div>
                 </div>

              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors">Cancel</button>
                 <button onClick={handleStepSave} disabled={saving} className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    {saving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />} Save Step
                 </button>
              </div>

           </div>
        </div>
      )}

    </div>
  );
};

export default AdminProcess;