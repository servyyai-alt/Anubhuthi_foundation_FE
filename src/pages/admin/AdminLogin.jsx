import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button } from '../../components/common';
import logo from '../../assets/logo-1.png';

const GOLD = '#D4A84F';
const GOLD_LIGHT = '#F5D07A';

function FloatingGoldParticles({ count = 15 }) {
  const particles = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 18 + 14,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.18 + 0.06,
      drift: (Math.random() - 0.5) * 80,
    })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, ${GOLD} 70%, transparent 100%)`,
            filter: 'blur(0.4px)',
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -120, 0, 80, 0],
            x: [0, p.drift, 0, -p.drift / 2, 0],
            opacity: [p.opacity, p.opacity * 1.6, p.opacity, p.opacity * 0.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b0f19 100%)`,
        backgroundSize: '400% 400%'
      }}
    >
      {/* Ambient background animations */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <FloatingGoldParticles count={15} />

      {/* Decorative ambient gold glow circles */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full opacity-15 pointer-events-none" style={{ background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, transparent 70%)`, filter: 'blur(50px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)`, filter: 'blur(60px)' }} />

      <motion.div 
        initial={{ opacity: 0, y: 25, scale: 0.96 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glassmorphic card */}
        <div className="bg-white/8 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.45)] p-10 md:p-12 relative overflow-hidden">
          {/* Subtle reflection border */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Logo container replacing the old FaOm container */}
          <div className="text-center mb-8 relative">
            <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#D4A84F]/30 p-1 shadow-[0_8px_30px_rgba(212,168,79,0.3)]">
              <img src={logo} alt="Anubhuthi Foundation Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">Admin Portal</h1>
            <p className="text-saffron-400 text-xs font-semibold tracking-[3px] uppercase mt-1">Anubhuthi Foundation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group flex items-center">
              <FaEnvelope 
                className="absolute left-4 text-[#F5D07A] group-focus-within:text-[#D4A84F] transition-colors" 
                size={16} 
              />
              <input
                name="email" 
                type="email" 
                placeholder="Admin email" 
                value={form.email} 
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-[#D4A84F] focus:bg-white/10 focus:ring-2 focus:ring-[#D4A84F]/20 transition-all duration-300 placeholder:text-white/30 text-sm"
                required
              />
            </div>
            
            <div className="relative group flex items-center">
              <FaLock 
                className="absolute left-4 text-[#F5D07A] group-focus-within:text-[#D4A84F] transition-colors" 
                size={16} 
              />
              <input
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                value={form.password} 
                onChange={handleChange}
                className="w-full pl-12 pr-11 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-[#D4A84F] focus:bg-white/10 focus:ring-2 focus:ring-[#D4A84F]/20 transition-all duration-300 placeholder:text-white/30 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[#F5D07A] opacity-70 hover:opacity-100 transition-opacity focus:outline-none flex items-center justify-center cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            <Button 
              type="submit" 
              loading={loading} 
              className="w-full mt-2 py-4 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-400 hover:to-saffron-500 text-white rounded-2xl shadow-[0_4px_25px_rgba(212,168,79,0.3)] hover:shadow-[0_4px_30px_rgba(212,168,79,0.5)] font-bold uppercase tracking-widest text-xs transition-all duration-300"
            >
              Sign In
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
