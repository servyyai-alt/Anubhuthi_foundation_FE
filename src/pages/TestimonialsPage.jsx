import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { FormInput, FormTextarea, LoadingPage, EmptyState, SectionTitle } from '../components/common';
import { testimonialsAPI } from '../services/api';
import heroImg from '../assets/testimonials_hero.png';

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange && onChange(n)}>
          <FaStar className={n <= value ? 'text-[#e7ad43] drop-shadow-[0_0_3px_rgba(231,173,67,0.5)]' : 'text-gray-300'} size={24} />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', designation: '', location: '', content: '', rating: 5, program: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Generate random positions once for particles
  const [particles] = useState(() => Array.from({ length: 25 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5
  })));

  useEffect(() => {
    testimonialsAPI.getAll()
      .then(res => setTestimonials(res.data.data || []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    else if (!/^[a-zA-Z\s]+$/.test(form.name)) newErrors.name = 'Name can only contain letters and spaces';

    if (!form.designation.trim()) newErrors.designation = 'Designation is required';
    if (!form.location.trim()) newErrors.location = 'City/Country is required';
    if (!form.program.trim()) newErrors.program = 'Program attended is required';
    
    if (!form.content.trim()) newErrors.content = 'Testimonial is required';
    else if (form.content.trim().length < 10) newErrors.content = 'Testimonial must be at least 10 characters';
    
    if (!form.rating) newErrors.rating = 'Please select a rating';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the validation errors');
      return;
    }
    setSubmitting(true);
    try {
      await testimonialsAPI.create(form);
      toast.success('Thank you! Your testimonial is under review.');
      setShowForm(false);
      setForm({ name: '', designation: '', location: '', content: '', rating: 5, program: '' });
      setErrors({});
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Testimonials — Anubhuthi Foundation</title>
        <meta name="description" content="Hear from seekers whose lives were transformed by Anubhuthi Foundation programs and retreats." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-16 md:px-6">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-[#011126]/30 mix-blend-multiply"></div>
          {/* Subtle radial gradients for ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(231,173,67,0.15)_0%,transparent_60%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#011126]/40 via-transparent to-transparent"></div>
        </div>

        {/* Floating particles - Framer Motion */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#e7ad43] rounded-full blur-[1px]"
              style={{ left: p.left, top: p.top }}
              animate={{
                y: [0, -150],
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.5]
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto mt-12 max-w-4xl px-2 text-center sm:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[#e7ad43] font-serif uppercase tracking-[0.2em] text-sm sm:text-base font-semibold mb-4 drop-shadow-md">
              Testimonials
            </h2>
            <h1 className="mb-6 font-serif text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-7xl">
              Voices of <span className="text-[#e7ad43]">Transformation</span>
            </h1>
            <p className="mb-10 max-w-2xl mx-auto text-base font-light text-[#bcccdc] drop-shadow-md md:mb-12 md:text-xl">
              Hear from seekers whose lives were deeply touched by Anubhuthi Foundation's programs, retreats, and sacred teachings.
            </p>
            
            {/* Share Your Story Button */}
            <motion.button 
              onClick={() => {
                setShowForm(true);
                setTimeout(() => document.getElementById('story-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-[#011126]/30 backdrop-blur-sm border-2 border-[#e7ad43] text-[#e7ad43] hover:text-[#011126] rounded-full px-8 py-3.5 font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(231,173,67,0.3)] hover:shadow-[0_0_25px_rgba(231,173,67,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#e7ad43] to-[#d89f3c] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
              <span className="relative z-10 flex items-center gap-3 text-sm tracking-wide uppercase">
                Share Your Story
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials List Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background motion */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(231,173,67,0.03)_0%,transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <SectionTitle subtitle="What Seekers Say" title="Stories of Awakening" />
          </div>

          {/* Submit form */}
          <AnimatePresence>
            {showForm && (
              <motion.div 
                id="story-form"
                initial={{ opacity: 0, height: 0, y: -20 }} 
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mx-auto mb-8 max-w-3xl rounded-3xl border border-earth-100 bg-[#faf9f6] p-4 shadow-xl sm:p-6"
              >
                <div className="flex justify-between items-center mb-4 border-b border-earth-200 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-[#011126]">Share Your Experience</h3>
                  <button onClick={() => setShowForm(false)} className="text-earth-400 hover:text-earth-700 transition-colors text-3xl leading-none">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <FormInput name="name" label="Your Name *" placeholder="Full name" value={form.name} onChange={handleChange} error={errors.name} required />
                    <FormInput name="designation" label="Designation / Profession *" placeholder="e.g. Yoga Teacher" value={form.designation} onChange={handleChange} error={errors.designation} required />
                    <FormInput name="location" label="City / Country *" placeholder="Mumbai, India" value={form.location} onChange={handleChange} error={errors.location} required />
                  </div>
                  <FormInput name="program" label="Program / Retreat Attended *" placeholder="e.g. Kedarnath Pilgrimage 2023" value={form.program} onChange={handleChange} error={errors.program} required />
                  <FormTextarea name="content" label="Your Testimonial *" placeholder="Share how Anubhuthi Foundation impacted your life..." rows={3} value={form.content} onChange={handleChange} error={errors.content} required />
                  <div className="bg-white p-3 rounded-xl inline-block border border-earth-100 shadow-sm">
                    <label className="block text-sm font-semibold text-[#011126] mb-1 uppercase tracking-wider">Rating <span className="text-red-500 font-bold">*</span></label>
                    <StarRating value={form.rating} onChange={r => { setForm(prev => ({ ...prev, rating: r })); if(errors.rating) setErrors(prev => ({...prev, rating: ''})); }} />
                    {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                  </div>
                  <div className="flex justify-stretch pt-2 sm:justify-end">
                    <motion.button 
                      type="submit" 
                      disabled={submitting} 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#011126] px-6 py-2 font-semibold text-white shadow-lg transition-colors hover:bg-[#021B3A] sm:w-auto"
                    >
                      {submitting ? 'Submitting...' : 'Submit Testimonial'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="py-20"><LoadingPage /></div>
          ) : testimonials.length === 0 ? (
            <div className="py-10">
              <EmptyState icon="✨" title="No Testimonials Yet" description="Be the first to share your transformation story!" />
            </div>
          ) : (
            <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3 lg:gap-8 lg:space-y-8">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={t._id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                  className="break-inside-avoid bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(231,173,67,0.1)] transition-shadow duration-300 border border-earth-50 relative group"
                >
                  <div className="absolute top-0 right-8 -translate-y-1/2 text-[80px] text-[#e7ad43] opacity-20 font-serif leading-none group-hover:opacity-40 transition-opacity">"</div>
                  
                  {/* Animated Stars */}
                  <motion.div 
                    className="flex mb-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                    }}
                  >
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <motion.div
                        key={j}
                        variants={{
                          hidden: { opacity: 0, scale: 0, rotate: -45 },
                          visible: { opacity: 1, scale: 1, rotate: 0 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 12 }}
                      >
                        <FaStar className="text-[#e7ad43] drop-shadow-[0_0_4px_rgba(231,173,67,0.6)] mr-1" size={18} />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <p className="relative z-10 mb-8 text-base italic leading-relaxed text-earth-700 sm:text-lg">"{t.content}"</p>
                  
                  <div className="flex items-center gap-4 pt-6 border-t border-earth-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#011126] to-[#021B3A] rounded-full flex items-center justify-center font-serif font-bold text-[#e7ad43] text-xl flex-shrink-0 shadow-inner">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-[#011126] text-base">{t.name}</div>
                      <div className="text-earth-500 text-sm font-medium">
                        {[t.designation, t.location].filter(Boolean).join(' · ')}
                      </div>
                      {t.program && <div className="text-[#e7ad43] text-xs mt-1 font-semibold tracking-wide uppercase">{t.program}</div>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
