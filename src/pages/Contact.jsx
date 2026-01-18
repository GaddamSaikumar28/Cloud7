
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, ChevronDown, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAuth } from '../context/AuthContext';
import { contactApi } from '../api/contactApi';

// --- LEAFLET ICON FIX ---
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Contact = () => {
  const { user } = useAuth();
  
  // --- STATE ---
  const [pageLoading, setPageLoading] = useState(true);
  const [settings, setSettings] = useState({
    support_email: '',
    support_phone: '',
    office_address: '',
    map_latitude: 25.7617, // Default Miami
    map_longitude: -80.1918
  });
  const [faqs, setFaqs] = useState([]);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // --- INIT ---
  useEffect(() => {
    const initPage = async () => {
      try {
        const { contactInfo, faqs } = await contactApi.getPageData();
        if (contactInfo.id) setSettings(contactInfo); // Update if DB has data
        setFaqs(faqs);
      } catch (err) {
        console.error("Failed to load contact page", err);
      } finally {
        setPageLoading(false);
      }
    };

    initPage();
  }, []);

  // --- AUTO FILL ---
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: `${user.profile?.first_name || ''} ${user.profile?.last_name || ''}`.trim(),
        email: user.email || ''
      }));
    }
  }, [user]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await contactApi.sendMessage(formData, user?.id);
      setSubmitStatus('success');
      // Reset non-user fields
      setFormData(prev => ({ ...prev, subject: 'General Inquiry', message: '' }));
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pageLoading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><Loader2 className="animate-spin text-brand-glow" size={40} /></div>;

  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden">
      
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 pt-32 pb-20">
        
        {/* HERO HEADER */}
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500">Touch</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Have a question about our protocols or wholesale opportunities? Our team is ready to assist.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* LEFT: FORM & INFO */}
            <div className="space-y-12">
                
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ContactItem icon={Mail} title="Email Support" text={settings.support_email} href={`mailto:${settings.support_email}`} />
                    <ContactItem icon={Phone} title="Phone Line" text={settings.support_phone} href={`tel:${settings.support_phone}`} />
                </div>

                {/* Contact Form */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-2 gap-4">
                            <InputGroup 
                                label="Name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                placeholder="Your Name" 
                            />
                            <InputGroup 
                                label="Email" 
                                name="email" 
                                type="email"
                                value={formData.email} 
                                onChange={handleInputChange} 
                                placeholder="your@email.com" 
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Subject</label>
                            <div className="relative">
                                <select 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full bg-dark-950 border border-white/10 rounded-lg p-4 text-white appearance-none focus:border-brand-glow outline-none cursor-pointer"
                                >
                                    <option>General Inquiry</option>
                                    <option>Wholesale Inquiry</option>
                                    <option>Order Support</option>
                                    <option>Lab Report Request</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Message</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows="4" 
                                className="w-full bg-dark-950 border border-white/10 rounded-lg p-4 text-white focus:border-brand-glow focus:outline-none transition-colors placeholder:text-slate-600 resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400">
                                <CheckCircle size={20} />
                                <span className="text-sm font-bold">Message sent successfully! We'll reply shortly.</span>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                                <AlertCircle size={20} />
                                <span className="text-sm font-bold">Failed to send. Please try again later.</span>
                            </div>
                        )}

                        <button 
                            disabled={isSubmitting || !formData.message}
                            className="w-full py-4 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <Send size={20} />}
                            SEND MESSAGE
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT: MAP & FAQs */}
            <div className="space-y-8">
                
                {/* Dynamic Map */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    className="h-[300px] w-full rounded-3xl overflow-hidden border border-white/10 relative z-0"
                >
                    <MapContainer 
                        center={[settings.map_latitude, settings.map_longitude]} 
                        zoom={13} 
                        scrollWheelZoom={false} 
                        style={{ height: "100%", width: "100%" }}
                    >
                        {/* <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark Mode Tiles
                        /> */}
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[settings.map_latitude, settings.map_longitude]}>
                            <Popup>
                                <div className="text-dark-900 font-bold">
                                    Cloud 7 HQ <br /> {settings.office_address}
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </motion.div>
                
                {/* FAQs */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-brand-glow">///</span> Frequently Asked Questions
                    </h3>
                    
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                            <button 
                                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-bold text-sm text-slate-200">{faq.question}</span>
                                <ChevronDown 
                                    className={`text-slate-500 transition-transform ${openFaqIndex === index ? 'rotate-180 text-brand-glow' : ''}`} 
                                    size={18} 
                                />
                            </button>
                            <AnimatePresence>
                                {openFaqIndex === index && (
                                    <motion.div 
                                        initial={{ height: 0 }} 
                                        animate={{ height: "auto" }} 
                                        exit={{ height: 0 }} 
                                        className="overflow-hidden"
                                    >
                                        <div className="p-5 pt-0 text-sm text-slate-400 leading-relaxed border-t border-white/5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    {faqs.length === 0 && (
                         <div className="text-slate-500 text-sm italic">No FAQs configured yet.</div>
                    )}
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const InputGroup = ({ label, placeholder, type = "text", value, onChange, name }) => (
    <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
        <input 
            type={type} 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-dark-950 border border-white/10 rounded-lg p-4 text-white focus:border-brand-glow focus:outline-none transition-colors placeholder:text-slate-600"
        />
    </div>
);

const ContactItem = ({ icon: Icon, title, text, href }) => (
    <a href={href} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
        <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-brand-glow border border-white/5 group-hover:scale-110 transition-transform">
            <Icon size={18} />
        </div>
        <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{title}</div>
            <div className="text-white font-bold text-sm group-hover:text-brand-glow transition-colors">{text || 'Not configured'}</div>
        </div>
    </a>
);

export default Contact;