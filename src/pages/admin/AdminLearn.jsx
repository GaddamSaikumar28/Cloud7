
import React, { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  Plus, Edit2, Trash2, Save, X, Search, 
  Loader2, BookOpen, Image as ImageIcon, UploadCloud 
} from 'lucide-react';
import { adminLearnApi } from '../../api/adminLearnApi';

const AdminLearn = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // New state for upload spinner
  
  // Data State
  const [articles, setArticles] = useState([]);
  const [values, setValues] = useState([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  // Forms
  const [articleForm, setArticleForm] = useState(initialArticleForm);
  const [valueForm, setValueForm] = useState(initialValueForm);
  const [iconSearch, setIconSearch] = useState('');

  // Ref for hidden file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [artData, valData] = await Promise.all([
        adminLearnApi.getArticles(),
        adminLearnApi.getValues()
      ]);
      setArticles(artData || []);
      setValues(valData || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  const handleOpenModal = (type, item = null) => {
    setEditMode(!!item);
    if (type === 'article') {
      setArticleForm(item || initialArticleForm);
    } else {
      setValueForm(item || initialValueForm);
    }
    setIsModalOpen(true);
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    try {
      await adminLearnApi.saveArticle(articleForm);
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      alert("Error saving article: " + err.message);
    }
  };

  const handleSaveValue = async (e) => {
    e.preventDefault();
    try {
      await adminLearnApi.saveValue(valueForm);
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      alert("Error saving value: " + err.message);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      if (type === 'article') await adminLearnApi.deleteArticle(id);
      else await adminLearnApi.deleteValue(id);
      loadData();
    } catch (err) {
      alert("Error deleting item.");
    }
  };

  // --- NEW: IMAGE UPLOAD HANDLER ---
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const publicUrl = await adminLearnApi.uploadImage(file);
      
      // Automatically set the URL in the form
      setArticleForm(prev => ({ ...prev, image_url: publicUrl }));
      
    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
      // Reset input so same file can be selected again if needed
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // --- RENDER HELPERS ---
  const filteredIcons = iconList.filter(i => i.toLowerCase().includes(iconSearch.toLowerCase()));

  if (loading) return <div className="p-12 text-center text-slate-500"><Loader2 className="animate-spin inline mr-2"/> Loading...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white pb-32">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Research Hub Config</h1>
          <p className="text-slate-400">Manage articles and company mission values.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
           <button 
             onClick={() => setActiveTab('articles')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'articles' ? 'bg-brand-glow text-dark-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
           >
              Articles
           </button>
           <button 
             onClick={() => setActiveTab('values')}
             className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'values' ? 'bg-brand-glow text-dark-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
           >
              Company Values
           </button>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      {activeTab === 'articles' ? (
        <div className="space-y-6">
           {/* Add Button */}
           <button onClick={() => handleOpenModal('article')} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-slate-500 hover:border-brand-glow hover:text-brand-glow transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-wider">
              <Plus size={20} /> New Article
           </button>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {articles.map(article => (
                 <div key={article.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-brand-glow/30 transition-all flex flex-col h-full">
                    <div className="h-40 bg-dark-950 relative">
                       <img src={article.image_url || "https://via.placeholder.com/400"} laoding="lazy" alt={article.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                       <div className="absolute top-2 right-2 flex gap-2">
                          <button onClick={() => handleOpenModal('article', article)} className="p-2 bg-dark-900/80 backdrop-blur text-white rounded hover:bg-brand-glow hover:text-dark-900 transition-colors"><Edit2 size={14}/></button>
                          <button onClick={() => handleDelete('article', article.id)} className="p-2 bg-dark-900/80 backdrop-blur text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={14}/></button>
                       </div>
                    </div>
                    <div className="p-5 flex-1">
                       <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-glow bg-brand-glow/10 px-2 py-1 rounded">{article.category}</span>
                          <span className="text-xs text-slate-500">{article.read_time}</span>
                       </div>
                       <h3 className="font-bold text-white mb-2 line-clamp-1">{article.title}</h3>
                       <p className="text-xs text-slate-400 line-clamp-2">{article.excerpt}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      ) : (
        <div className="space-y-6">
           <button onClick={() => handleOpenModal('value')} className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-slate-500 hover:border-brand-glow hover:text-brand-glow transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-wider">
              <Plus size={20} /> Add Value Point
           </button>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map(val => {
                 const Icon = LucideIcons[val.icon_name] || LucideIcons.HelpCircle;
                 return (
                    <div key={val.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group hover:bg-white/10 transition-colors">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleOpenModal('value', val)} className="p-1.5 bg-dark-900/50 rounded hover:bg-brand-glow hover:text-dark-900"><Edit2 size={14}/></button>
                          <button onClick={() => handleDelete('value', val.id)} className="p-1.5 bg-dark-900/50 rounded hover:bg-red-500 hover:text-white text-red-400"><Trash2 size={14}/></button>
                       </div>
                       <div className="w-10 h-10 bg-brand-glow/10 text-brand-glow rounded-lg flex items-center justify-center mb-4">
                          <Icon size={20} />
                       </div>
                       <h3 className="font-bold text-white mb-2">{val.title}</h3>
                       <p className="text-sm text-slate-400">{val.description}</p>
                    </div>
                 )
              })}
           </div>
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="w-full max-w-2xl bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                 <h3 className="font-bold text-white text-lg">{editMode ? 'Edit Item' : 'Create New'}</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><X size={24}/></button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                 {activeTab === 'articles' ? (
                    <form id="articleForm" onSubmit={handleSaveArticle} className="space-y-4">
                       <Input label="Title" value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} />
                       <div className="grid grid-cols-2 gap-4">
                          <Input label="Category" value={articleForm.category} onChange={e => setArticleForm({...articleForm, category: e.target.value})} placeholder="Science, Usage..." />
                          <Input label="Read Time" value={articleForm.read_time} onChange={e => setArticleForm({...articleForm, read_time: e.target.value})} placeholder="5 min" />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Excerpt</label>
                          <textarea rows={3} value={articleForm.excerpt} onChange={e => setArticleForm({...articleForm, excerpt: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none resize-none" />
                       </div>
                       
                       {/* --- MODIFIED: IMAGE INPUT WITH UPLOAD BUTTON --- */}
                       <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Cover Image</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input 
                                        type="text" 
                                        value={articleForm.image_url} 
                                        onChange={e => setArticleForm({...articleForm, image_url: e.target.value})} 
                                        placeholder="https://..." 
                                        className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-brand-glow outline-none" 
                                    />
                                </div>
                                
                                {/* Hidden File Input */}
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleImageSelect} 
                                    className="hidden" 
                                    accept="image/*"
                                />
                                
                                {/* Visible Trigger Button */}
                                <button 
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="px-4 bg-white/5 border border-white/10 rounded-lg hover:bg-brand-glow hover:text-dark-900 transition-colors flex items-center justify-center min-w-[50px]"
                                >
                                    {uploading ? (
                                        <Loader2 size={20} className="animate-spin text-brand-glow" />
                                    ) : (
                                        <UploadCloud size={20} />
                                    )}
                                </button>
                            </div>
                            {/* Preview Thumbnail */}
                            {articleForm.image_url && (
                                <div className="mt-2 h-20 w-32 rounded-lg overflow-hidden border border-white/10 bg-dark-950">
                                    <img laoding="lazy" src={articleForm.image_url} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                       </div>

                    </form>
                 ) : (
                    <form id="valueForm" onSubmit={handleSaveValue} className="space-y-4">
                       <Input label="Title" value={valueForm.title} onChange={e => setValueForm({...valueForm, title: e.target.value})} />
                       <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Description</label>
                          <textarea rows={3} value={valueForm.description} onChange={e => setValueForm({...valueForm, description: e.target.value})} className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none resize-none" />
                       </div>
                       
                       {/* Icon Picker */}
                       <div>
                          <div className="flex justify-between items-center mb-2">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Icon</label>
                             <input type="text" placeholder="Search icons..." className="bg-dark-950 border border-white/10 rounded text-xs py-1 px-2 text-white w-32 outline-none" onChange={e => setIconSearch(e.target.value)} />
                          </div>
                          <div className="grid grid-cols-8 gap-2 max-h-32 overflow-y-auto bg-dark-950 p-2 rounded-xl border border-white/10 custom-scrollbar">
                             {filteredIcons.map(iconName => {
                                const Icon = LucideIcons[iconName];
                                return (
                                   <button type="button" key={iconName} onClick={() => setValueForm({...valueForm, icon_name: iconName})} className={`p-2 rounded flex items-center justify-center ${valueForm.icon_name === iconName ? 'bg-brand-glow text-dark-900' : 'text-slate-500 hover:text-white'}`}>
                                      <Icon size={18} />
                                   </button>
                                )
                             })}
                          </div>
                       </div>
                    </form>
                 )}
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 flex gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl">Cancel</button>
                 <button type="submit" form={activeTab === 'articles' ? 'articleForm' : 'valueForm'} className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    <Save size={18} /> Save
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// --- HELPERS ---
const Input = ({ label, value, onChange, placeholder, icon: Icon }) => (
   <div>
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
      <div className="relative">
         {Icon && <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />}
         <input type="text" value={value} onChange={onChange} placeholder={placeholder} className={`w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none ${Icon ? 'pl-10' : ''}`} />
      </div>
   </div>
);

const initialArticleForm = { title: '', excerpt: '', category: 'Science', read_time: '5 min', image_url: '', is_featured: false };
const initialValueForm = { title: '', description: '', icon_name: 'Zap' };
const iconList = ["Zap", "Activity", "Atom", "Award", "Beaker", "Binary", "BookOpen", "Box", "CheckCircle", "Clock", "Cloud", "Cpu", "Database", "Dna", "Droplet", "Eye", "FileSearch", "Flag", "FlaskConical", "Globe", "Heart", "Layers", "Leaf", "Lock", "Microscope", "Search", "Shield", "ShieldCheck", "Star", "Sun", "Thermometer", "Users"];

export default AdminLearn;