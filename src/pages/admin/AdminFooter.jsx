import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  Save, Plus, Trash2, Edit2, LayoutTemplate, 
  Share2, Link as LinkIcon, Loader2, CheckCircle 
} from 'lucide-react';
import { adminFooterApi } from '../../api/adminFooterApi';

const AdminFooter = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general'); // general | links | social
  
  // Data
  const [settings, setSettings] = useState({});
  const [links, setLinks] = useState([]);
  const [socials, setSocials] = useState([]);

  // Edit States
  const [editingLink, setEditingLink] = useState(null);
  const [editingSocial, setEditingSocial] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [set, lnk, soc] = await Promise.all([
        adminFooterApi.getSettings(),
        adminFooterApi.getLinks(),
        adminFooterApi.getSocials()
      ]);
      setSettings(set);
      setLinks(lnk || []);
      setSocials(soc || []);
    } catch (err) {
      console.error(err);
      alert("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS: SETTINGS ---
  const handleSaveSettings = async () => {
    try {
      await adminFooterApi.saveSettings(settings);
      alert("Settings updated!");
    } catch(err) { alert(err.message) }
  };

  // --- HANDLERS: LINKS ---
  const handleSaveLink = async (e) => {
    e.preventDefault();
    try {
      await adminFooterApi.saveLink(editingLink);
      setEditingLink(null);
      loadData();
    } catch(err) { alert(err.message) }
  };

  const handleDeleteLink = async (id) => {
    if(!window.confirm("Delete link?")) return;
    await adminFooterApi.deleteLink(id);
    loadData();
  };

  // --- HANDLERS: SOCIALS ---
  const handleSaveSocial = async (e) => {
    e.preventDefault();
    try {
      await adminFooterApi.saveSocial(editingSocial);
      setEditingSocial(null);
      loadData();
    } catch(err) { alert(err.message) }
  };

  const handleDeleteSocial = async (id) => {
    if(!window.confirm("Delete social?")) return;
    await adminFooterApi.deleteSocial(id);
    loadData();
  };

  if(loading) return <div className="p-12 text-center"><Loader2 className="animate-spin inline"/></div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white pb-32">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Footer Config</h1>
          <p className="text-slate-400">Manage footer content, links, and social icons.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10">
        <TabButton active={activeTab==='general'} onClick={()=>setActiveTab('general')} icon={LayoutTemplate} label="General" />
        <TabButton active={activeTab==='links'} onClick={()=>setActiveTab('links')} icon={LinkIcon} label="Links" />
        <TabButton active={activeTab==='social'} onClick={()=>setActiveTab('social')} icon={Share2} label="Social Media" />
      </div>

      {/* --- TAB 1: GENERAL --- */}
      {activeTab === 'general' && (
        <div className="max-w-2xl space-y-6">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <InputGroup label="Tagline (Under Logo)">
                 <textarea 
                    value={settings.tagline || ''}
                    onChange={e => setSettings({...settings, tagline: e.target.value})}
                    className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white h-24"
                 />
              </InputGroup>
              <InputGroup label="Newsletter Heading">
                 <input 
                    value={settings.newsletter_heading || ''}
                    onChange={e => setSettings({...settings, newsletter_heading: e.target.value})}
                    className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white"
                 />
              </InputGroup>
              <InputGroup label="Copyright Text">
                 <input 
                    value={settings.copyright_text || ''}
                    onChange={e => setSettings({...settings, copyright_text: e.target.value})}
                    className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white"
                 />
              </InputGroup>
              <button onClick={handleSaveSettings} className="mt-4 px-6 py-2 bg-brand-glow text-dark-900 font-bold rounded-lg flex items-center gap-2">
                 <Save size={16}/> Save Settings
              </button>
           </div>
        </div>
      )}

      {/* --- TAB 2: LINKS --- */}
      {activeTab === 'links' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* List */}
           <div className="lg:col-span-2 space-y-4">
              {['product', 'company', 'support'].map(col => (
                 <div key={col} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-brand-glow uppercase tracking-wider text-xs mb-4">{col} Column</h3>
                    <div className="space-y-2">
                       {links.filter(l => l.column_name === col).map(link => (
                          <div key={link.id} className="flex justify-between items-center bg-dark-950 p-3 rounded-lg border border-white/5">
                             <div>
                                <div className="font-bold text-sm">{link.label}</div>
                                <div className="text-xs text-slate-500 font-mono">{link.path}</div>
                             </div>
                             <div className="flex gap-2">
                                <button onClick={() => setEditingLink(link)} className="p-2 hover:bg-white/10 rounded text-slate-400"><Edit2 size={14}/></button>
                                <button onClick={() => handleDeleteLink(link.id)} className="p-2 hover:bg-red-500/10 text-red-400 rounded"><Trash2 size={14}/></button>
                             </div>
                          </div>
                       ))}
                       <button 
                         onClick={() => setEditingLink({ label: '', path: '/', column_name: col, sort_order: 0, is_active: true })}
                         className="w-full py-2 border border-dashed border-white/10 rounded-lg text-slate-500 hover:text-white text-xs font-bold uppercase"
                       >
                         + Add Link
                       </button>
                    </div>
                 </div>
              ))}
           </div>

           {/* Editor */}
           {editingLink && (
              <div className="bg-dark-950 border border-white/10 rounded-2xl p-6 h-fit sticky top-6">
                 <h3 className="font-bold mb-4">{editingLink.id ? 'Edit Link' : 'New Link'}</h3>
                 <form onSubmit={handleSaveLink} className="space-y-4">
                    <InputGroup label="Label">
                       <input value={editingLink.label} onChange={e => setEditingLink({...editingLink, label: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white"/>
                    </InputGroup>
                    <InputGroup label="Path">
                       <input value={editingLink.path} onChange={e => setEditingLink({...editingLink, path: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white font-mono"/>
                    </InputGroup>
                    <InputGroup label="Column">
                       <select value={editingLink.column_name} onChange={e => setEditingLink({...editingLink, column_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white">
                          <option value="product">Product</option>
                          <option value="company">Company</option>
                          <option value="support">Support</option>
                       </select>
                    </InputGroup>
                    <div className="flex gap-2 pt-2">
                       <button type="button" onClick={() => setEditingLink(null)} className="flex-1 py-2 bg-white/10 rounded">Cancel</button>
                       <button type="submit" className="flex-1 py-2 bg-brand-glow text-dark-900 font-bold rounded">Save</button>
                    </div>
                 </form>
              </div>
           )}
        </div>
      )}

      {/* --- TAB 3: SOCIALS --- */}
      {activeTab === 'social' && (
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <div className="flex justify-between mb-4">
                  <h3 className="font-bold">Social Platforms</h3>
                  <button onClick={() => setEditingSocial({ platform: '', url: '', icon_name: 'Link', is_active: true })} className="text-xs bg-brand-glow text-dark-900 px-3 py-1 rounded font-bold">+ Add</button>
               </div>
               <div className="space-y-3">
                  {socials.map(soc => (
                     <div key={soc.id} className="flex items-center gap-4 bg-dark-950 p-3 rounded-lg border border-white/5">
                        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                           {LucideIcons[soc.icon_name] ? React.createElement(LucideIcons[soc.icon_name], { size: 16 }) : <LucideIcons.Link size={16}/>}
                        </div>
                        <div className="flex-1">
                           <div className="font-bold text-sm">{soc.platform}</div>
                           <div className="text-xs text-slate-500 truncate w-48">{soc.url}</div>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => setEditingSocial(soc)} className="p-2 hover:bg-white/10 rounded text-slate-400"><Edit2 size={14}/></button>
                           <button onClick={() => handleDeleteSocial(soc.id)} className="p-2 hover:bg-red-500/10 text-red-400 rounded"><Trash2 size={14}/></button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {editingSocial && (
               <div className="bg-dark-950 border border-white/10 rounded-2xl p-6 h-fit">
                  <h3 className="font-bold mb-4">{editingSocial.id ? 'Edit Social' : 'New Social'}</h3>
                  <form onSubmit={handleSaveSocial} className="space-y-4">
                     <InputGroup label="Platform Name">
                        <input value={editingSocial.platform} onChange={e => setEditingSocial({...editingSocial, platform: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white"/>
                     </InputGroup>
                     <InputGroup label="Profile URL">
                        <input value={editingSocial.url} onChange={e => setEditingSocial({...editingSocial, url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white"/>
                     </InputGroup>
                     <InputGroup label="Icon Name (Lucide React)">
                        <input value={editingSocial.icon_name} onChange={e => setEditingSocial({...editingSocial, icon_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white" placeholder="e.g. Instagram, Twitter"/>
                     </InputGroup>
                     
                     <div className="flex gap-2 pt-2">
                        <button type="button" onClick={() => setEditingSocial(null)} className="flex-1 py-2 bg-white/10 rounded">Cancel</button>
                        <button type="submit" className="flex-1 py-2 bg-brand-glow text-dark-900 font-bold rounded">Save</button>
                     </div>
                  </form>
               </div>
            )}
         </div>
      )}

    </div>
  );
};

// Helpers
const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-4 flex items-center gap-2 border-b-2 transition-colors ${active ? 'border-brand-glow text-white' : 'border-transparent text-slate-500 hover:text-white'}`}
  >
    <Icon size={16} /> <span className="font-bold uppercase tracking-wider text-xs">{label}</span>
  </button>
);

const InputGroup = ({ label, children }) => (
  <div>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
    {children}
  </div>
);

export default AdminFooter;