import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { PageHeader, Button, FormInput, FormTextarea, FormSelect, LoadingPage, EmptyState, SectionTitle } from '../components/common';
import { testimonialsAPI } from '../services/api';

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange && onChange(n)}>
          <FaStar className={n <= value ? 'text-saffron-400' : 'text-earth-200'} size={20} />
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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    testimonialsAPI.getAll()
      .then(res => setTestimonials(res.data.data || []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.content) { toast.error('Name and testimonial required'); return; }
    setSubmitting(true);
    try {
      await testimonialsAPI.create(form);
      toast.success('Thank you! Your testimonial is under review.');
      setShowForm(false);
      setForm({ name: '', designation: '', location: '', content: '', rating: 5, program: '' });
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

      <PageHeader title="Voices of Transformation" subtitle="Testimonials" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Testimonials' }]} />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <SectionTitle subtitle="What Seekers Say" title="Stories of Awakening" />
            <Button onClick={() => setShowForm(!showForm)} variant="outline">
              {showForm ? 'Cancel' : '+ Share Your Story'}
            </Button>
          </div>

          {/* Submit form */}
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="mb-12 bg-parchment rounded-3xl p-8"
            >
              <h3 className="font-serif text-2xl font-bold text-earth-800 mb-6">Share Your Experience</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <FormInput name="name" label="Your Name *" placeholder="Full name" value={form.name} onChange={handleChange} required />
                  <FormInput name="designation" label="Designation / Profession" placeholder="e.g. Yoga Teacher" value={form.designation} onChange={handleChange} />
                  <FormInput name="location" label="City / Country" placeholder="Mumbai, India" value={form.location} onChange={handleChange} />
                </div>
                <FormInput name="program" label="Program / Retreat Attended" placeholder="e.g. Kedarnath Pilgrimage 2023" value={form.program} onChange={handleChange} />
                <FormTextarea name="content" label="Your Testimonial *" placeholder="Share how Anubhuthi Foundation impacted your life..." rows={5} value={form.content} onChange={handleChange} required />
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">Rating</label>
                  <StarRating value={form.rating} onChange={r => setForm(prev => ({ ...prev, rating: r }))} />
                </div>
                <Button type="submit" loading={submitting} size="lg">Submit Testimonial</Button>
              </form>
            </motion.div>
          )}

          {loading ? <LoadingPage /> : testimonials.length === 0 ? (
            <EmptyState icon="💬" title="No Testimonials Yet" description="Be the first to share your transformation story!" />
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {testimonials.map((t, i) => (
                <motion.div key={t._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="break-inside-avoid bg-parchment rounded-2xl p-6 mb-6"
                >
                  <div className="flex mb-3">
                    {[...Array(t.rating || 5)].map((_, j) => (
                      <FaStar key={j} className="text-saffron-400" size={14} />
                    ))}
                  </div>
                  <div className="text-saffron-400 text-4xl font-serif leading-none mb-2">"</div>
                  <p className="text-earth-600 leading-relaxed italic mb-5">{t.content}</p>
                  <div className="flex items-center gap-3 border-t border-earth-200 pt-4">
                    <div className="w-10 h-10 bg-saffron-200 rounded-full flex items-center justify-center font-serif font-bold text-saffron-700 flex-shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-earth-800 text-sm">{t.name}</div>
                      <div className="text-earth-400 text-xs">
                        {[t.designation, t.location].filter(Boolean).join(' · ')}
                      </div>
                      {t.program && <div className="text-saffron-500 text-xs mt-0.5">{t.program}</div>}
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
