import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Inbox, HelpCircle, Settings, Search, Trash2, CheckCircle, 
  Mail, MessageSquare, Save, Plus, Edit2, MapPin, Phone, 
  ChevronDown, ChevronUp, Loader2, ExternalLink, Reply
} from 'lucide-react';
import { adminContactApi } from '../../api/adminContactApi';

const AdminContact = () => {
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'faqs' | 'settings'
  const [loading, setLoading] = useState(true);
  
  // Data State
  const [submissions, setSubmissions] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [settings, setSettings] = useState({});
  
  // UI State
  const [search, setSearch] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [editingFaq, setEditingFaq] = useState(null); // null = list, {} = new, {id} = edit

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await adminContactApi.getDashboardData();
      setSettings(data.settings);
      setFaqs(data.faqs);
      setSubmissions(data.submissions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- INBOX HANDLERS ---
  const handleStatusUpdate = async (id, status, e) => {
    if(e) e.stopPropagation();
    try {
      await adminContactApi.updateSubmissionStatus(id, status);
      setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
      if (selectedSubmission?.id === id) setSelectedSubmission(prev => ({ ...prev, status }));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDeleteSubmission = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await adminContactApi.deleteSubmission(id);
      setSubmissions(prev => prev.filter(s => s.id !== id));
      setSelectedSubmission(null);
    } catch (err) {
      alert("Failed to delete");
    }
  };

  // --- FAQ HANDLERS ---
  const handleSaveFaq = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      question: formData.get('question'),
      answer: formData.get('answer'),
      display_order: parseInt(formData.get('display_order') || 0),
      is_active: formData.get('is_active') === 'on'
    };

    try {
      if (editingFaq.id) {
        const updated = await adminContactApi.updateFaq(editingFaq.id, payload);
        setFaqs(prev => prev.map(f => f.id === updated.id ? updated : f));
      } else {
        const created = await adminContactApi.createFaq(payload);
        setFaqs(prev => [...prev, created]);
      }
      setEditingFaq(null);
    } catch (err) {
      alert("Error saving FAQ");
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await adminContactApi.deleteFaq(id);
      setFaqs(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      alert("Error deleting FAQ");
    }
  };

  // --- SETTINGS HANDLERS ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      support_email: formData.get('support_email'),
      support_phone: formData.get('support_phone'),
      office_address: formData.get('office_address'),
      map_latitude: parseFloat(formData.get('map_latitude')),
      map_longitude: parseFloat(formData.get('map_longitude'))
    };

    try {
      await adminContactApi.updateSettings(settings.id, payload);
      setSettings(prev => ({ ...prev, ...payload }));
      alert("Settings updated successfully");
    } catch (err) {
      alert("Error updating settings");
    }
  };

  // Filter Logic
  const filteredSubmissions = submissions.filter(s => 
    s.email.toLowerCase().includes(search.toLowerCase()) || 
    s.subject?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-12 text-center text-slate-500">Loading dashboard...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Communications</h1>
          <p className="text-slate-400">Manage support tickets, FAQs, and contact details.</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-white/10 mb-8">
        {[
          { id: 'inbox', icon: Inbox, label: 'Inbox', count: submissions.filter(s => s.status === 'new').length },
          { id: 'faqs', icon: HelpCircle, label: 'FAQ Manager' },
          { id: 'settings', icon: Settings, label: 'Settings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-bold uppercase tracking-wider transition-colors ${
              activeTab === tab.id 
              ? 'border-brand-glow text-white bg-white/5' 
              : 'border-transparent text-slate-500 hover:text-white'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
            {tab.count > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-brand-glow text-dark-900 text-[10px] rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* --- TAB CONTENT: INBOX --- */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
          
          {/* List View */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  placeholder="Search emails..." 
                  className="w-full bg-dark-950 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-brand-glow outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredSubmissions.map(msg => (
                <div 
                  key={msg.id}
                  onClick={() => { setSelectedSubmission(msg); if(msg.status === 'new') handleStatusUpdate(msg.id, 'read'); }}
                  className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${selectedSubmission?.id === msg.id ? 'bg-white/10' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-bold truncate ${msg.status === 'new' ? 'text-brand-glow' : 'text-white'}`}>
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-slate-500">{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-bold mb-1 truncate">{msg.subject}</div>
                  <div className="text-xs text-slate-500 truncate">{msg.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 overflow-y-auto">
            {selectedSubmission ? (
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-glow text-dark-900 flex items-center justify-center font-bold text-xl">
                      {selectedSubmission.name[0]}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedSubmission.subject}</h2>
                      <p className="text-sm text-slate-400">From: {selectedSubmission.name} &lt;{selectedSubmission.email}&gt;</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <a 
                       href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                       onClick={() => handleStatusUpdate(selectedSubmission.id, 'replied')}
                       className="px-4 py-2 bg-brand-glow text-dark-900 rounded-lg text-xs font-bold flex items-center gap-2 hover:brightness-110"
                     >
                       <Reply size={16} /> Reply
                     </a>
                     <button 
                       onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                       className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                     >
                       <Trash2 size={18} />
                     </button>
                  </div>
                </div>

                <div className="bg-dark-950 border border-white/10 rounded-xl p-6 text-slate-300 leading-relaxed mb-6 whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 font-bold uppercase">Status:</span>
                  <div className="flex gap-2">
                    {['new', 'read', 'replied'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedSubmission.id, status)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-colors ${
                          selectedSubmission.status === status 
                            ? status === 'new' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' 
                            : status === 'replied' ? 'bg-green-500/20 text-green-400 border-green-500/50'
                            : 'bg-slate-500/20 text-slate-400 border-slate-500/50'
                            : 'border-white/10 text-slate-600 hover:border-white/30'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Mail size={48} className="mb-4 opacity-50" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: FAQS --- */}
      {activeTab === 'faqs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* List */}
           <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold">Existing Questions</h3>
                 <button onClick={() => setEditingFaq({})} className="flex items-center gap-2 text-brand-glow text-xs font-bold hover:underline">
                    <Plus size={14} /> Add New
                 </button>
              </div>
              {faqs.map(faq => (
                <div key={faq.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4 group hover:border-brand-glow/30 transition-colors">
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${faq.is_active ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-500'}`}>
                            {faq.is_active ? 'Active' : 'Draft'}
                         </span>
                         <span className="text-xs text-slate-500 font-mono">Order: {faq.display_order}</span>
                      </div>
                      <h4 className="font-bold text-white mb-1">{faq.question}</h4>
                      <p className="text-sm text-slate-400 line-clamp-2">{faq.answer}</p>
                   </div>
                   <div className="flex flex-col gap-2">
                      <button onClick={() => setEditingFaq(faq)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300">
                         <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteFaq(faq.id)} className="p-2 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-400">
                         <Trash2 size={16} />
                      </button>
                   </div>
                </div>
              ))}
           </div>

           {/* Editor */}
           <div className="lg:col-span-1">
              <AnimatePresence>
                 {editingFaq && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                       <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-6">
                          <h3 className="font-bold text-lg mb-4">{editingFaq.id ? 'Edit FAQ' : 'New FAQ'}</h3>
                          <form onSubmit={handleSaveFaq} className="space-y-4">
                             <InputGroup label="Question" name="question" defaultValue={editingFaq.question} required />
                             <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Answer</label>
                                <textarea name="answer" defaultValue={editingFaq.answer} rows="5" className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none" required />
                             </div>
                             <div className="flex gap-4">
                                <InputGroup label="Sort Order" name="display_order" type="number" defaultValue={editingFaq.display_order || 0} />
                                <div className="flex-1 pt-6">
                                   <label className="flex items-center gap-2 cursor-pointer">
                                      <input type="checkbox" name="is_active" defaultChecked={editingFaq.is_active !== false} className="w-4 h-4 rounded border-white/20 bg-dark-950 text-brand-glow focus:ring-0" />
                                      <span className="text-sm font-bold text-white">Visible on Site</span>
                                   </label>
                                </div>
                             </div>
                             <div className="flex gap-2 pt-2">
                                <button type="button" onClick={() => setEditingFaq(null)} className="flex-1 py-3 bg-white/5 rounded-xl font-bold text-xs">Cancel</button>
                                <button className="flex-1 py-3 bg-brand-glow text-dark-900 rounded-xl font-bold text-xs">Save FAQ</button>
                             </div>
                          </form>
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>
      )}

      {/* --- TAB CONTENT: SETTINGS --- */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl">
           <form onSubmit={handleSaveSettings} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                 <InputGroup label="Support Phone" name="support_phone" defaultValue={settings.support_phone} />
                 <InputGroup label="Support Email" name="support_email" defaultValue={settings.support_email} />
              </div>
              <InputGroup label="Physical Address" name="office_address" defaultValue={settings.office_address} />
              
              <div className="pt-4 border-t border-white/10">
                 <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-brand-glow uppercase tracking-widest flex items-center gap-2">
                       <MapPin size={14}/> Map Coordinates
                    </label>
                    <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-white flex items-center gap-1">
                       Get from Google Maps <ExternalLink size={10} />
                    </a>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <InputGroup label="Latitude" name="map_latitude" defaultValue={settings.map_latitude} placeholder="25.7617" />
                    <InputGroup label="Longitude" name="map_longitude" defaultValue={settings.map_longitude} placeholder="-80.1918" />
                 </div>
              </div>

              <button className="w-full py-4 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                 <Save size={18} /> Update Configuration
              </button>
           </form>
        </div>
      )}

    </div>
  );
};

const InputGroup = ({ label, name, type = "text", defaultValue, required, placeholder }) => (
  <div>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
    <input 
      type={type} 
      name={name} 
      defaultValue={defaultValue} 
      placeholder={placeholder}
      required={required}
      className="w-full bg-dark-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-brand-glow outline-none"
    />
  </div>
);

export default AdminContact;