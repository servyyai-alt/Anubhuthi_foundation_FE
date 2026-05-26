import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaTimes } from 'react-icons/fa';
import { PageHeader, Card, Button, FormInput, FormTextarea, Badge, LoadingPage, EmptyState, SectionTitle } from '../components/common';
import { careersAPI } from '../services/api';

function ApplicationModal({ career, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '', resumeUrl: '', linkedIn: '', experience: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email required'); return; }
    setLoading(true);
    try {
      await careersAPI.apply(career._id, form);
      setSubmitted(true);
      toast.success('Application submitted!');
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-earth-100">
          <div>
            <h2 className="font-serif text-xl font-bold text-earth-800">Apply: {career.title}</h2>
            <p className="text-earth-400 text-sm">{career.department} · {career.type}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-earth-100 rounded-full flex items-center justify-center text-earth-500 hover:bg-earth-200 transition-colors">
            <FaTimes size={14} />
          </button>
        </div>
        {submitted ? (
          <div className="p-12 text-center">
            <div className="text-7xl mb-4">🙏</div>
            <h3 className="font-serif text-2xl font-bold text-earth-800 mb-2">Application Submitted!</h3>
            <p className="text-earth-500 mb-6">We'll review your application and get back to you within 7 days.</p>
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="name" label="Full Name *" placeholder="Your name" value={form.name} onChange={handleChange} required />
              <FormInput name="email" type="email" label="Email *" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="phone" label="Phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              <FormInput name="experience" label="Years of Experience" placeholder="e.g. 3 years" value={form.experience} onChange={handleChange} />
            </div>
            <FormInput name="resumeUrl" label="Resume Link (Google Drive / Dropbox)" placeholder="https://drive.google.com/..." value={form.resumeUrl} onChange={handleChange} />
            <FormInput name="linkedIn" label="LinkedIn Profile" placeholder="https://linkedin.com/in/..." value={form.linkedIn} onChange={handleChange} />
            <FormTextarea name="coverLetter" label="Cover Letter" placeholder="Tell us why you want to join Anubhuthi Foundation..." rows={5} value={form.coverLetter} onChange={handleChange} />
            <div className="flex gap-3 pt-2">
              <Button type="submit" loading={loading} size="lg" className="flex-1">Submit Application</Button>
              <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function CareersPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    careersAPI.getAll()
      .then(res => setCareers(res.data.data || []))
      .catch(() => setCareers([]))
      .finally(() => setLoading(false));
  }, []);

  const typeColors = { 'full-time': 'green', 'part-time': 'blue', contract: 'earth', internship: 'saffron', volunteer: 'saffron' };

  return (
    <>
      <Helmet>
        <title>Careers — Anubhuthi Foundation</title>
        <meta name="description" content="Join the Anubhuthi Foundation team. Careers in spiritual education, administration, outreach, and more." />
      </Helmet>

      <PageHeader title="Join Our Team" subtitle="Careers" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Careers' }]} />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionTitle subtitle="Work With Purpose" title="Build a Career Around Consciousness"
              description="At Anubhuthi Foundation, your work is your practice. We're looking for passionate, committed people to help grow our mission."
              center
            />
          </div>

          {loading ? <LoadingPage /> : careers.length === 0 ? (
            <EmptyState icon="💼" title="No Open Positions Right Now"
              description="We don't have open positions currently, but we love meeting passionate people. Send your profile to namaste@anubhuthifoundation.org"
            />
          ) : (
            <div className="space-y-5">
              {careers.map((career, i) => (
                <motion.div key={career._id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Card className="p-6 hover:border-saffron-200 border border-transparent transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-saffron-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FaBriefcase className="text-saffron-500" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-bold text-earth-800 mb-1">{career.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-earth-400 mb-2">
                            {career.department && <span>{career.department}</span>}
                            {career.location && <span className="flex items-center gap-1"><FaMapMarkerAlt size={10} />{career.location}</span>}
                            {career.isRemote && <Badge color="green">Remote</Badge>}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge color={typeColors[career.type] || 'earth'}>{career.type}</Badge>
                            {career.salary && <span className="text-xs text-earth-500 bg-earth-50 px-2 py-0.5 rounded-full">{career.salary}</span>}
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => setSelected(career)} variant="primary" size="md" className="flex-shrink-0">
                        Apply Now
                      </Button>
                    </div>
                    {career.description && (
                      <p className="text-earth-500 text-sm mt-4 leading-relaxed">{career.description.slice(0, 200)}...</p>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && <ApplicationModal career={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
