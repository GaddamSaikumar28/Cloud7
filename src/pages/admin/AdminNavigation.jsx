// import React, { useState, useEffect } from 'react';
// import { supabase } from '../../client/supabaseClient'; // Ensure correct import path
// import { Save, Plus, Trash2, GripVertical, UploadCloud, Loader2, Globe } from 'lucide-react';

// const AdminNavigation = () => {
//   const [loading, setLoading] = useState(true);
//   const [settings, setSettings] = useState({ site_name: '', logo_url: '' });
//   const [links, setLinks] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     // Fetch Settings
//     const { data: set } = await supabase.from('site_settings').select('*').single();
//     if(set) setSettings(set);

//     // Fetch Links
//     const { data: lnk } = await supabase.from('navbar_links').select('*').order('sort_order');
//     if(lnk) setLinks(lnk);
    
//     setLoading(false);
//   };

//   const handleSaveSettings = async () => {
//     await supabase.from('site_settings').update(settings).eq('id', settings.id);
//     alert('Settings Saved');
//   };

//   const handleSaveLinks = async () => {
//     // Upsert all links
//     const { error } = await supabase.from('navbar_links').upsert(links);
//     if(error) alert('Error saving links');
//     else alert('Links Saved');
//   };

//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if(!file) return;
    
//     setUploading(true);
//     const fileName = `logo-${Date.now()}`;
//     const { error } = await supabase.storage.from('Cloud7').upload(fileName, file);
    
//     if(!error) {
//       const { data } = supabase.storage.from('Cloud7').getPublicUrl(fileName);
//       setSettings({...settings, logo_url: data.publicUrl});
//     }
//     setUploading(false);
//   };

//   // Link Handlers
//   const updateLink = (index, field, value) => {
//     const newLinks = [...links];
//     newLinks[index][field] = value;
//     setLinks(newLinks);
//   };

//   const addLink = () => {
//     setLinks([...links, { label: 'New Link', path: '/', sort_order: links.length + 1, is_active: true }]);
//   };

//   const removeLink = async (index, id) => {
//     if(id) await supabase.from('navbar_links').delete().eq('id', id);
//     const newLinks = links.filter((_, i) => i !== index);
//     setLinks(newLinks);
//   };

//   if(loading) return <div className="p-10"><Loader2 className="animate-spin"/></div>;

//   return (
//     <div className="p-8 max-w-4xl mx-auto text-white">
//       <h1 className="text-3xl font-black italic uppercase mb-8">Navigation Config</h1>

//       {/* 1. IDENTITY SECTION */}
//       <section className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
//         <h2 className="flex items-center gap-2 font-bold mb-6 text-brand-glow uppercase tracking-wider text-sm">
//            <Globe size={16} /> Site Identity
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//            <div>
//               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Site Name</label>
//               <input 
//                 value={settings.site_name}
//                 onChange={e => setSettings({...settings, site_name: e.target.value})}
//                 className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white focus:border-brand-glow outline-none"
//               />
//            </div>
           
//            <div>
//               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Logo Upload</label>
//               <div className="flex gap-4 items-center">
//                  {settings.logo_url && (
//                     <div className="h-12 w-12 bg-white rounded-lg p-1">
//                        <img src={settings.logo_url} alt="Logo" className="w-full h-full object-contain"/>
//                     </div>
//                  )}
//                  <label className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-lg cursor-pointer hover:bg-brand-glow hover:text-dark-900 transition-colors">
//                     {uploading ? <Loader2 className="animate-spin" size={18}/> : <UploadCloud size={18}/>}
//                     <span className="text-sm font-bold">Upload New</span>
//                     <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
//                  </label>
//               </div>
//            </div>
//         </div>
//         <button onClick={handleSaveSettings} className="mt-6 px-6 py-2 bg-brand-glow text-dark-900 font-bold rounded-lg flex items-center gap-2">
//            <Save size={16}/> Save Identity
//         </button>
//       </section>

//       {/* 2. LINKS SECTION */}
//       <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
//         <div className="flex justify-between items-center mb-6">
//            <h2 className="flex items-center gap-2 font-bold text-brand-glow uppercase tracking-wider text-sm">
//               <GripVertical size={16} /> Menu Links
//            </h2>
//            <button onClick={addLink} className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20">
//               <Plus size={14}/> Add Link
//            </button>
//         </div>

//         <div className="space-y-3">
//            {links.map((link, idx) => (
//               <div key={idx} className="flex gap-3 items-center bg-dark-950 p-3 rounded-xl border border-white/5">
//                  <span className="text-slate-600 font-mono text-xs">#{idx + 1}</span>
                 
//                  <div className="flex-1 grid grid-cols-2 gap-3">
//                     <input 
//                       value={link.label} 
//                       onChange={e => updateLink(idx, 'label', e.target.value)}
//                       placeholder="Label"
//                       className="bg-transparent border-b border-white/10 focus:border-brand-glow outline-none text-sm p-1"
//                     />
//                     <input 
//                       value={link.path} 
//                       onChange={e => updateLink(idx, 'path', e.target.value)}
//                       placeholder="/path"
//                       className="bg-transparent border-b border-white/10 focus:border-brand-glow outline-none text-sm p-1 text-slate-400 font-mono"
//                     />
//                  </div>

//                  <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-500 uppercase font-bold mr-2">Active</label>
//                     <input 
//                       type="checkbox" 
//                       checked={link.is_active} 
//                       onChange={e => updateLink(idx, 'is_active', e.target.checked)}
//                       className="accent-brand-glow w-4 h-4"
//                     />
//                  </div>

//                  <button onClick={() => removeLink(idx, link.id)} className="p-2 text-slate-500 hover:text-red-500">
//                     <Trash2 size={16}/>
//                  </button>
//               </div>
//            ))}
//         </div>
        
//         <button onClick={handleSaveLinks} className="mt-6 px-6 py-2 bg-brand-glow text-dark-900 font-bold rounded-lg flex items-center gap-2">
//            <Save size={16}/> Save Links
//         </button>
//       </section>
//     </div>
//   );
// };

// export default AdminNavigation;
import React, { useState, useEffect, useRef } from 'react';
import { 
  Save, Plus, Trash2, GripVertical, UploadCloud, 
  Loader2, Globe, Layout, CheckCircle 
} from 'lucide-react';
import { adminNavigationApi } from '../../api/adminNavigationApi';

const AdminNavigation = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Data State
  const [settings, setSettings] = useState({ site_name: '', logo_url: '' });
  const [links, setLinks] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [fetchedSettings, fetchedLinks] = await Promise.all([
        adminNavigationApi.getSettings(),
        adminNavigationApi.getLinks()
      ]);
      
      // If no settings exist yet, provide defaults
      setSettings(fetchedSettings || { site_name: 'CLOUD7', logo_url: '' });
      setLinks(fetchedLinks || []);
    } catch (err) {
      console.error("Failed to load nav data:", err);
      alert("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      // 1. Upload to Cloud7 Bucket via API
      const publicUrl = await adminNavigationApi.uploadLogo(file);
      
      // 2. Update Local State immediately
      setSettings(prev => ({ ...prev, logo_url: publicUrl }));
      
      // Optional: Auto-save immediately after upload
      await adminNavigationApi.saveSettings({ ...settings, logo_url: publicUrl });

    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      await adminNavigationApi.saveSettings(settings);
      alert("Identity updated successfully!");
    } catch (err) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLinks = async () => {
    try {
      setSaving(true);
      // Re-assign sort_order based on current array index
      const linksToSave = links.map((link, index) => ({
        ...link,
        sort_order: index + 1
      }));
      
      await adminNavigationApi.saveLinks(linksToSave);
      await loadData(); // Reload to get confirmed IDs
      alert("Menu links saved!");
    } catch (err) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // --- LINK MANIPULATION ---
  const addLink = () => {
    setLinks([
      ...links, 
      { label: 'New Page', path: '/', is_active: true, sort_order: links.length + 1 }
    ]);
  };

  const updateLink = (index, field, value) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  const removeLink = async (index, id) => {
    if (!window.confirm("Remove this link?")) return;
    
    // If it has an ID, delete from DB
    if (id) {
      try {
        await adminNavigationApi.deleteLink(id);
      } catch (err) {
        alert("Delete failed: " + err.message);
        return;
      }
    }
    // Remove from UI
    const filtered = links.filter((_, i) => i !== index);
    setLinks(filtered);
  };

  if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-brand-glow"><Loader2 className="animate-spin" size={32}/></div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white pb-32">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Navigation Config</h1>
        <p className="text-slate-400">Manage your site logo and main menu links.</p>
      </div>

      {/* 1. BRAND IDENTITY CARD */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-brand-glow/5 blur-[100px] rounded-full pointer-events-none"/>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-brand-glow/10 rounded-lg text-brand-glow"><Globe size={20}/></div>
          <h2 className="text-xl font-bold uppercase tracking-wide">Brand Identity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Site Name Input */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Website Name</label>
            <input 
              value={settings.site_name}
              onChange={e => setSettings({...settings, site_name: e.target.value})}
              placeholder="e.g. CLOUD7"
              className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none transition-all font-bold"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Logo Image</label>
            <div className="flex gap-4 items-center">
              {/* Preview Box */}
              <div className="h-16 w-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
                ) : (
                  <Layout size={24} className="text-slate-600"/>
                )}
              </div>

              {/* Input Area */}
              <div className="flex-1">
                 <input 
                    type="text" 
                    value={settings.logo_url || ''} 
                    disabled 
                    placeholder="No logo uploaded"
                    className="w-full bg-dark-950/50 border border-white/5 rounded-lg p-2 text-xs text-slate-500 mb-2"
                 />
                 <div className="flex gap-2">
                    <input 
                       type="file" 
                       ref={fileInputRef}
                       onChange={handleLogoUpload} 
                       className="hidden" 
                       accept="image/*"
                    />
                    <button 
                       onClick={() => fileInputRef.current?.click()}
                       disabled={uploading}
                       className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                    >
                       {uploading ? <Loader2 className="animate-spin" size={14}/> : <UploadCloud size={14}/>}
                       Upload to Cloud7 Bucket
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
             onClick={handleSaveSettings} 
             disabled={saving}
             className="px-6 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-brand-glow/20"
          >
             {saving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
             Save Identity
          </button>
        </div>
      </section>

      {/* 2. MENU LINKS CARD */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-8">
         <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><GripVertical size={20}/></div>
               <h2 className="text-xl font-bold uppercase tracking-wide">Navbar Links</h2>
            </div>
            <button 
               onClick={addLink} 
               className="px-4 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
            >
               <Plus size={16}/> Add Link
            </button>
         </div>

         <div className="space-y-4">
            {links.length === 0 && <p className="text-slate-500 italic text-center py-8">No links configured.</p>}
            
            {links.map((link, idx) => (
               <div key={idx} className="bg-dark-950 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row gap-4 items-center group hover:border-white/20 transition-colors">
                  <span className="text-slate-600 font-mono text-xs w-6">#{idx + 1}</span>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                     <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Label</label>
                        <input 
                           value={link.label} 
                           onChange={e => updateLink(idx, 'label', e.target.value)}
                           className="w-full bg-transparent border-b border-white/10 focus:border-brand-glow outline-none text-sm py-1 font-bold text-white"
                        />
                     </div>
                     <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Path</label>
                        <input 
                           value={link.path} 
                           onChange={e => updateLink(idx, 'path', e.target.value)}
                           className="w-full bg-transparent border-b border-white/10 focus:border-blue-500 outline-none text-sm py-1 font-mono text-blue-400"
                        />
                     </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2 md:mt-0">
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                           type="checkbox" 
                           checked={link.is_active} 
                           onChange={e => updateLink(idx, 'is_active', e.target.checked)}
                           className="hidden peer"
                        />
                        <div className="w-10 h-6 bg-white/10 rounded-full peer-checked:bg-brand-glow peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all relative transition-colors"></div>
                        <span className="text-xs font-bold text-slate-500 peer-checked:text-white">Active</span>
                     </label>

                     <button 
                        onClick={() => removeLink(idx, link.id)} 
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                     >
                        <Trash2 size={18}/>
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-8 flex justify-end border-t border-white/10 pt-6">
            <button 
               onClick={handleSaveLinks} 
               disabled={saving}
               className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
               {saving ? <Loader2 className="animate-spin" size={18}/> : <CheckCircle size={18}/>}
               Update Menu Structure
            </button>
         </div>
      </section>

    </div>
  );
};

export default AdminNavigation;