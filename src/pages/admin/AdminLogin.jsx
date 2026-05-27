import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaOm, FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button, FormInput } from '../../components/common';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen bg-earth-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-saffron-500/5 rounded-full blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-saffron">
              <FaOm className="text-white text-2xl" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-earth-800">Admin Portal</h1>
            <p className="text-earth-400 text-sm mt-1">Anubhuthi Foundation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-300" size={14} />
              <input
                name="email" type="email" placeholder="Admin email" value={form.email} onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-xl text-earth-800 outline-none focus:border-saffron-400"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-300" size={14} />
              <input
                name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-xl text-earth-800 outline-none focus:border-saffron-400"
                required
              />
            </div>
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign In
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
