import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { PageHeader, Button, FormInput, FormTextarea, FormSelect, SectionTitle } from '../components/common';
import { volunteersAPI } from '../services/api';

const areaOptions = ['Meditation Facilitation', 'Event Management', 'Social Media', 'Teaching', 'Temple Restoration', 'Admin Support', 'Himalayan Programs', 'Community Outreach', 'Content Creation', 'Tech & Website'];

export default function VolunteerPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', age: '', city: '', country: 'India',
    education: '', occupation: '', availability: '', experience: '',
    motivation: '', skills: '', type: 'volunteer', areas: []
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleArea = area => setForm(prev => ({
    ...prev,
    areas: prev.areas.includes(area) ? prev.areas.filter(a => a !== area) : [...prev.areas, area]
  }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.motivation) { toast.error('Please fill required fields'); return; }
    setLoading(true);
    try {
      const payload = {
        ...form,
        skills: form.skills.split(',').map(skill => skill.trim()).filter(Boolean),
      };

      if (payload.age === '') delete payload.age;

      await volunteersAPI.submit(payload);
      setSubmitted(true);
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: '🧘', title: 'Spiritual Growth', desc: 'Access to free programs, retreats, and teachings as a volunteer.' },
    { icon: '🤝', title: 'Sangha Community', desc: 'Become part of a dedicated community of conscious souls.' },
    { icon: '📜', title: 'Certification', desc: 'Receive certificates of service and letters of recommendation.' },
    { icon: '🌍', title: 'Make a Difference', desc: 'Directly contribute to preserving India\'s spiritual heritage.' },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-parchment pt-28 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg text-center bg-white p-12 rounded-3xl shadow-warm-lg"
        >
          <div className="text-8xl mb-6">✅</div>
          <h2 className="font-serif text-3xl font-bold text-earth-800 mb-3">Welcome to the Sangha!</h2>
          <p className="text-earth-500 mb-8">Your {form.type} application has been received. We'll review it and reach out within 5-7 days.</p>
          <button onClick={() => setSubmitted(false)} className="text-saffron-600 underline text-sm">Submit Another Application</button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Volunteer & Internship — Anubhuthi Foundation</title>
        <meta name="description" content="Volunteer or intern with Anubhuthi Foundation and contribute to spreading spiritual wisdom and community service." />
      </Helmet>

      <PageHeader title="Volunteer & Internship" subtitle="Serve With Love" breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Volunteer' }]} />

      {/* Benefits */}
      <section className="py-16 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Why Volunteer" title="The Gift of Seva" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-warm"
              >
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-serif font-bold text-earth-800 mb-1">{b.title}</h3>
                <p className="text-earth-500 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-earth-800 mb-3">Apply to Serve</h2>
            <p className="text-earth-500">Fill out the form below and we'll connect you with opportunities that match your skills and passion.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-parchment rounded-3xl p-8 space-y-5">
            {/* Type toggle */}
            <div className="flex rounded-xl overflow-hidden border border-earth-200">
              {['volunteer', 'intern'].map(t => (
                <button key={t} type="button" onClick={() => setForm(prev => ({ ...prev, type: t }))}
                  className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
                    form.type === t ? 'bg-saffron-500 text-white' : 'bg-white text-earth-600 hover:bg-earth-50'
                  }`}
                >
                  {t === 'volunteer' ? '🤝 Volunteer' : '🎓 Intern'}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="name" label="Full Name *" placeholder="Your name" value={form.name} onChange={handleChange} required />
              <FormInput name="email" type="email" label="Email *" placeholder="you@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <FormInput name="phone" label="Phone" placeholder="+91..." value={form.phone} onChange={handleChange} />
              <FormInput name="age" type="number" label="Age" placeholder="25" value={form.age} onChange={handleChange} />
              <FormInput name="city" label="City" placeholder="Bangalore" value={form.city} onChange={handleChange} />
            </div>
            <FormInput name="country" label="Country" placeholder="India" value={form.country} onChange={handleChange} />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput name="education" label="Education" placeholder="B.A. Philosophy" value={form.education} onChange={handleChange} />
              <FormInput name="occupation" label="Current Occupation" placeholder="Software Engineer" value={form.occupation} onChange={handleChange} />
            </div>
            <FormTextarea name="skills" label="Skills" placeholder="Teaching, design, coordination..." rows={2} value={form.skills} onChange={handleChange} />

            <FormSelect name="availability" label="Availability" value={form.availability} onChange={handleChange}>
              <option value="">Select availability</option>
              <option value="full-time">Full-time (40 hrs/week)</option>
              <option value="part-time">Part-time (15-20 hrs/week)</option>
              <option value="weekends">Weekends only</option>
              <option value="remote">Remote / Online only</option>
              <option value="flexible">Flexible</option>
            </FormSelect>

            {/* Areas */}
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">Areas of Interest</label>
              <div className="flex flex-wrap gap-2">
                {areaOptions.map(area => (
                  <button key={area} type="button" onClick={() => toggleArea(area)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      form.areas.includes(area) ? 'bg-saffron-500 text-white' : 'bg-white border border-earth-200 text-earth-600 hover:border-saffron-300'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <FormTextarea name="experience" label="Relevant Experience" placeholder="Any previous volunteer work, spiritual practice, or relevant skills..." rows={3} value={form.experience} onChange={handleChange} />
            <FormTextarea name="motivation" label="Why Do You Want to Serve? *" placeholder="What draws you to Anubhuthi Foundation and this work..." rows={4} value={form.motivation} onChange={handleChange} required />

            <Button type="submit" loading={loading} size="lg" className="w-full">
              Submit Application ✅
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
