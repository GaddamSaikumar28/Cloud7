// import React from 'react';
// import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-black py-16 border-t border-white/5">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
//         {/* Brand */}
//         <div>
//           <h3 className="text-2xl font-bold text-white mb-6">Cloud7</h3>
//           <div className="flex gap-4">
//             <SocialIcon icon={Facebook} />
//             <SocialIcon icon={Instagram} />
//             <SocialIcon icon={Twitter} />
//           </div>
//         </div>

//         {/* Links 1 */}
//         <div>
//           <ul className="space-y-3 text-sm text-slate-400">
//             <li className="hover:text-white cursor-pointer">Shop</li>
//             <li className="hover:text-white cursor-pointer">Science</li>
//             <li className="hover:text-white cursor-pointer">Contact</li>
//           </ul>
//         </div>

//         {/* Links 2 */}
//         <div>
//           <ul className="space-y-3 text-sm text-slate-400">
//             <li className="hover:text-white cursor-pointer">FAQs</li>
//             <li className="hover:text-white cursor-pointer">Learn</li>
//             <li className="hover:text-white cursor-pointer">Rewards</li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h4 className="text-white text-sm font-medium mb-4">Unlock Exclusive Access</h4>
//           <div className="relative">
//             <input 
//                 type="email" 
//                 placeholder="Enter your email" 
//                 className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 text-sm text-white focus:outline-none focus:border-white/30"
//             />
//             <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
//                 <ArrowRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// const SocialIcon = ({ icon: Icon }) => (
//     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-white">
//         <Icon size={14} />
//     </div>
// )

// export default Footer;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react'; // Dynamic Icons
import { ArrowRight, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { footerApi } from '../../api/footerApi';

const Footer = () => {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await footerApi.getFooterData();
        setData(result);
      } catch (err) {
        console.error("Footer load error:", err);
      }
    };
    load();
  }, []);

  if (!data) return null; // or a skeleton loader

  const { settings, logo, links, social } = data;

  // Helper to group flat links by column
  const groupedLinks = links.reduce((acc, link) => {
    if (!acc[link.column_name]) acc[link.column_name] = [];
    acc[link.column_name].push(link);
    return acc;
  }, {});

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-dark-950 pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-brand-glow to-transparent opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* --- BRAND COLUMN (Span 4) --- */}
          <div className="md:col-span-4 lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
                {logo.logo_url ? (
                    <img src={logo.logo_url} alt={logo.site_name} className="h-10 w-auto object-contain" />
                ) : (
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-brand-glow w-6 h-6" />
                        <span className="text-2xl font-black text-white tracking-tighter uppercase">{logo.site_name}</span>
                    </div>
                )}
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {settings.tagline || 'Engineering the future of botanical science.'}
            </p>

            <div className="flex gap-3">
              {social.map((item) => {
                const Icon = LucideIcons[item.icon_name] || LucideIcons.Link;
                return (
                  <SocialIcon key={item.id} href={item.url} icon={Icon} label={item.platform} />
                );
              })}
            </div>
          </div>

          {/* --- LINKS COLUMNS (Span 5) --- */}
          <div className="md:col-span-8 lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Column 1: Product */}
            <FooterColumn title="Product" links={groupedLinks['product']} />
            
            {/* Column 2: Company */}
            <FooterColumn title="Company" links={groupedLinks['company']} />
            
            {/* Column 3: Support */}
            <FooterColumn title="Support" links={groupedLinks['support']} />
            
          </div>

          {/* --- NEWSLETTER (Span 3) --- */}
          <div className="md:col-span-12 lg:col-span-3">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                   <h4 className="text-white font-bold mb-2">{settings.newsletter_heading}</h4>
                   <p className="text-xs text-slate-400 mb-4">Join our research list for updates.</p>
                   
                   <form onSubmit={handleSubscribe} className="relative">
                      <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address" 
                          className="w-full bg-dark-900 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-glow transition-colors placeholder:text-slate-600"
                      />
                      <button 
                         type="submit"
                         disabled={subscribed}
                         className={`absolute right-1 top-1 bottom-1 px-3 rounded-md flex items-center justify-center transition-all ${subscribed ? 'bg-green-500 text-dark-900' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                      >
                         {subscribed ? <CheckCircle size={16} /> : <ArrowRight size={16} />}
                      </button>
                   </form>
                </div>
                
                {/* Decorative Glow inside card */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-glow/10 rounded-full blur-2xl" />
             </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-xs text-slate-500">
              {settings.copyright_text}
           </p>
           <div className="flex gap-6">
              <Link to="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
           </div>
        </div>

      </div>
    </footer>
  );
};

// --- SUB-COMPONENTS ---

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{title}</h4>
    <ul className="space-y-3">
      {links?.map((link) => (
        <li key={link.id}>
          <Link 
            to={link.path} 
            className="text-sm text-slate-400 hover:text-brand-glow hover:translate-x-1 transition-all inline-block duration-300"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ href, icon: Icon, label }) => (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-glow hover:border-brand-glow hover:text-dark-900 transition-all duration-300"
      title={label}
    >
        <Icon size={18} />
    </motion.a>
);

export default Footer;