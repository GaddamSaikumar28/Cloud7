
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, Beaker, Phone, Calendar, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      
      // Group data for cleaner API call
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dob: formData.dob
      };

      const addressData = {
        streetAddress: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      };

      await signup(formData.email, formData.password, profileData, addressData);
      
      // Show Success Message and Redirect
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create an account');
      setLoading(false);
    } 
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-dark-900 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl p-6"
      >
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl transition-all duration-500">
          
          {success ? (
            /* --- SUCCESS POPUP VIEW --- */
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <CheckCircle className="text-green-400" size={48} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Account Created!</h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                Your researcher profile has been registered successfully.
              </p>
              <div className="flex items-center justify-center gap-2 text-brand-glow animate-pulse font-bold text-xs tracking-widest uppercase">
                Redirecting to Login...
              </div>
            </motion.div>
          ) : (
            /* --- FORM VIEW --- */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 mb-4 border border-purple-500/20">
                  <Beaker size={24} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                <p className="text-slate-400 text-sm">Join the research program.</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center gap-2 text-red-200 text-sm">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* --- Personal Info Section --- */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-brand-glow uppercase tracking-widest border-b border-white/10 pb-2">Personal Info</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">First Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input name="firstName" type="text" required value={formData.firstName} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="John" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input name="lastName" type="text" required value={formData.lastName} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="Doe" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="name@lab.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                  </div>
                  {/* DOB */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input name="dob" type="date" required value={formData.dob} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-glow focus:outline-none transition-colors [color-scheme:dark]" />
                    </div>
                  </div>
                </div>

                {/* --- Address Section --- */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-brand-glow uppercase tracking-widest border-b border-white/10 pb-2">Shipping Address</h3>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Street Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input name="streetAddress" type="text" required value={formData.streetAddress} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="123 Lab Street" />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-3">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">City</label>
                      <input name="city" type="text" required value={formData.city} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="New York" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">State</label>
                      <input name="state" type="text" required value={formData.state} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="NY" />
                    </div>
                    <div className="col-span-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Zip</label>
                      <input name="zipCode" type="text" required value={formData.zipCode} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="10001" />
                    </div>
                  </div>
                </div>

                {/* --- Security Section --- */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-brand-glow uppercase tracking-widest border-b border-white/10 pb-2">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input name="password" type="password" required value={formData.password} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="••••••••" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Confirm</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold tracking-wide hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2 group mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <span className="animate-pulse">Creating Profile...</span> : <>REGISTER ACCOUNT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-slate-400 text-sm">
                  Already have an account? <Link to="/login" className="text-white font-bold hover:text-brand-glow transition-colors ml-1">Sign In</Link>
                </p>
              </div>
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default Signup;