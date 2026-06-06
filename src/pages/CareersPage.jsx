import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaTimes, FaRegCheckCircle, FaMapMarkerAlt, FaBriefcase as FaBriefcaseSolid, FaClock } from 'react-icons/fa';
import { FiHome, FiTrendingUp, FiGlobe, FiBriefcase, FiAward } from 'react-icons/fi';
import { Button, FormInput, FormTextarea, LoadingPage } from '../components/common';
import { careersAPI } from '../services/api';
import careersBg from '../assets/careers.png';
import volunteerImg from '../assets/volunteer.png';
import communityImg from '../assets/community.png';
import meditationJourneyImg from '../assets/meditationJourney.png';


function ApplicationModal({ career, onClose }) {
  const [step, setStep] = useState(career._id === 'general-application' ? 'form' : 'details');
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', linkedIn: '', portfolio: '', notes: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleFileChange = (e, fileSetter, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, [fieldName]: 'File must be a PDF' }));
        fileSetter(null);
      } else if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File must be under 5MB' }));
        fileSetter(null);
      } else {
        fileSetter(file);
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = 'Name must contain letters and spaces only';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[0-9\s+-]+$/.test(form.phone)) {
      newErrors.phone = 'Phone must contain numbers only';
    }

    if (!resumeFile) {
      newErrors.resume = 'Resume is required';
    }

    if (coverLetterFile && coverLetterFile.type !== 'application/pdf') {
      newErrors.coverLetter = 'Cover Letter must be PDF';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the validation errors.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('experience', form.experience);
      formData.append('linkedIn', form.linkedIn);
      formData.append('portfolio', form.portfolio);
      formData.append('notes', form.notes);
      
      if (resumeFile) formData.append('resume', resumeFile);
      if (coverLetterFile) formData.append('coverLetter', coverLetterFile);

      await careersAPI.apply(career._id, formData);
      setSubmitted(true);
      toast.success('Application submitted!');
      // Reset form fields
      setForm({ name: '', email: '', phone: '', experience: '', linkedIn: '', portfolio: '', notes: '' });
      setResumeFile(null);
      setCoverLetterFile(null);
      setErrors({});
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-serif text-xl font-bold text-gray-800">
              {step === 'details' ? 'Role Details' : `Apply: ${career.title}`}
            </h2>
            <p className="text-gray-500 text-sm">{career.department} · {career.type}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <FaTimes size={14} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 flex-1">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="text-7xl mb-4">✅</div>
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
              <p className="text-gray-500 mb-6">We'll review your application and get back to you within 7 days.</p>
              <Button onClick={onClose} variant="outline">Close</Button>
            </div>
          ) : step === 'details' ? (
            <div className="space-y-6">
              {/* Core Attributes */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl text-sm">
                <div>
                  <span className="text-gray-400 block font-medium uppercase text-[11px] tracking-wider">Salary</span>
                  <span className="text-gray-800 font-semibold">{career.salary || 'Disclosed on request'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium uppercase text-[11px] tracking-wider">Location</span>
                  <span className="text-gray-800 font-semibold">{career.location} {career.isRemote && '(Remote)'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium uppercase text-[11px] tracking-wider">Employment Type</span>
                  <span className="text-gray-800 font-semibold uppercase">{career.type}</span>
                </div>
                {career.applicationDeadline && (
                  <div>
                    <span className="text-gray-400 block font-medium uppercase text-[11px] tracking-wider">Deadline</span>
                    <span className="text-gray-800 font-semibold">{new Date(career.applicationDeadline).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="font-serif text-lg font-bold text-gray-800 mb-2">Job Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{career.description}</p>
              </div>

              {/* Responsibilities */}
              {career.responsibilities && career.responsibilities.length > 0 && (
                <div>
                  <h4 className="font-serif text-lg font-bold text-gray-800 mb-2">Key Responsibilities</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm">
                    {career.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {career.requirements && career.requirements.length > 0 && (
                <div>
                  <h4 className="font-serif text-lg font-bold text-gray-800 mb-2">Requirements</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm">
                    {career.requirements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {career.benefits && career.benefits.length > 0 && (
                <div>
                  <h4 className="font-serif text-lg font-bold text-gray-800 mb-2">Benefits</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-sm">
                    {career.benefits.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer CTA */}
              <div className="pt-4">
                <Button onClick={() => setStep('form')} className="w-full justify-center !bg-[#C58A2B] hover:!bg-[#b07821] !text-white !border-none">Apply for this Role</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormInput name="name" label="Full Name" placeholder="Your name" value={form.name} onChange={handleChange} required error={errors.name} />
                <FormInput name="email" type="email" label="Email" placeholder="you@email.com" value={form.email} onChange={handleChange} required error={errors.email} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormInput name="phone" label="Phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required error={errors.phone} />
                <FormInput name="experience" label="Years of Experience" placeholder="e.g. 3 years" value={form.experience} onChange={handleChange} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormInput name="linkedIn" label="LinkedIn Profile" placeholder="https://linkedin.com/in/..." value={form.linkedIn} onChange={handleChange} />
                <FormInput name="portfolio" label="Portfolio URL" placeholder="https://portfolio.com" value={form.portfolio} onChange={handleChange} />
              </div>

              {/* File Uploads */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1.5">
                    Upload Resume <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, setResumeFile, 'resume')}
                    className="w-full px-3 py-2 bg-white border border-earth-200 rounded-xl text-earth-800 text-sm outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-saffron-50 file:text-saffron-700 hover:file:bg-saffron-100"
                  />
                  {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                  {resumeFile && <p className="text-green-600 text-xs mt-1">✓ {resumeFile.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1.5">
                    Upload Cover Letter (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, setCoverLetterFile, 'coverLetter')}
                    className="w-full px-3 py-2 bg-white border border-earth-200 rounded-xl text-earth-800 text-sm outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-saffron-50 file:text-saffron-700 hover:file:bg-saffron-100"
                  />
                  {errors.coverLetter && <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>}
                  {coverLetterFile && <p className="text-green-600 text-xs mt-1">✓ {coverLetterFile.name}</p>}
                </div>
              </div>

              <FormTextarea name="notes" label="Message / cover letter notes" placeholder="Tell us why you want to join Anubhuthi Foundation..." rows={4} value={form.notes} onChange={handleChange} />

              <div className="flex gap-3 pt-2">
                <Button type="submit" loading={loading} size="lg" className="flex-1 !bg-[#C58A2B] hover:!bg-[#b07821] !text-white !border-none">Submit Application</Button>
                {career._id !== 'general-application' && (
                  <Button type="button" variant="outline" onClick={() => setStep('details')}>Back to Details</Button>
                )}
                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function CareersPage() {
  const [selected, setSelected] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const openRoles = [
    'Retreat Coordinators',
    'Travel & Retreat Executives',
    'Content Creators',
    'Social Media Managers',
    'Teaching Support Facilitators',
  ];

  const idealCandidates = [
    'Great communication skills',
    'English/Hindi/Bilingual language fluency',
    'Positive personality',
    'Team player mindset',
    'Passion for awareness and human growth',
    'Discipline and integrity'
  ];

  const benefits = [
    { text: 'Stay & Food Provided', icon: FiHome },
    { text: 'Training & Personal Growth', icon: FiTrendingUp },
    { text: 'Purpose-Driven Environment', icon: FiGlobe },
    { text: 'Meaningful Work Experience', icon: FiBriefcase },
    { text: 'Career Development Opportunities', icon: FiAward }
  ];

  const careerGrowth = [
    'Purpose-Driven Career',
    'Personal Development',
    'Humanitarian Impact',
    'Leadership Opportunities'
  ];

  useEffect(() => {
    careersAPI.getAll()
      .then(res => setCareers(res.data.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const generalCareer = {
    _id: 'general-application',
    title: 'General Application',
    department: 'Foundation',
    type: 'Full-Time / Part-Time'
  };

  return (
    <>
      <Helmet>
        <title>Careers & Opportunities — Anubhuthi Foundation</title>
        <meta name="description" content="Work with Purpose. Join our passionate team contributing to humanity." />
      </Helmet>

      {/* Main wrapper */}
      <div 
        className="relative min-h-screen flex flex-col bg-cream"
        style={{
          backgroundImage: `url(${careersBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle premium dark overlay for readability */}
        <div className="absolute inset-0 bg-[#020b16]/30 pointer-events-none z-0" />
        
        {/* HERO SECTION */}
        <section className="relative z-10 w-full pt-20 pb-12 lg:pt-24 lg:pb-16">
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-sans font-bold text-white text-5xl md:text-6xl lg:text-[72px] tracking-tight mb-4"
            >
              WORK WITH PURPOSE
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-white text-lg md:text-xl lg:text-[22px] max-w-2xl leading-relaxed opacity-95 font-medium"
            >
              We are looking for passionate individuals who want to make a real difference while contributing to humanity.
            </motion.p>
          </div>
        </section>

        {/* CAREERS JOURNEY LAYOUT */}
        <section className="relative z-20 max-w-6xl mx-auto mb-20 lg:mb-28 w-full px-6 lg:px-8">
          
          {/* Section 1 - Open Roles */}
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-20">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2 flex flex-col items-start text-left"
            >
              <div className="mb-6 inline-block group cursor-pointer">
                <h2 className="relative inline-block pb-3 text-white font-sans text-3xl md:text-4xl lg:text-5xl font-bold tracking-[2px] uppercase">
                  Open Roles
                  <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#D4A84F] transition-all duration-500 group-hover:w-full"></span>
                </h2>
              </div>
              <ul className="space-y-4">
                {openRoles.map((role, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A84F] shadow-[0_0_8px_rgba(212,168,79,0.8)] flex-shrink-0" />
                    <span className="text-white text-base md:text-lg font-medium tracking-wide leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{role}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="w-full max-w-[500px] overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img 
                  src={volunteerImg} 
                  alt="Open Roles - Retreat Team" 
                  className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-500 ease-in-out"
                />
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="text-center text-[#D4A84F] my-16 md:my-24 text-lg tracking-[0.2em] font-light opacity-60 select-none">
            ──────── ────────
          </div>

          {/* Section 2 - Ideal Candidates */}
          <div className="flex flex-col-reverse md:flex-row items-start gap-8 md:gap-12 lg:gap-20">
            {/* Image Left */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="w-full max-w-[500px] overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img 
                  src={communityImg} 
                  alt="Ideal Candidates - Community" 
                  className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-500 ease-in-out"
                />
              </div>
            </motion.div>

            {/* Content Right */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right"
            >
              <div className="mb-6 inline-block group cursor-pointer">
                <h2 className="relative inline-block pb-3 text-white font-sans text-3xl md:text-4xl lg:text-5xl font-bold tracking-[2px] uppercase">
                  Ideal Candidates
                  <span className="absolute bottom-0 right-0 left-0 md:left-auto w-12 h-[2px] bg-[#D4A84F] transition-all duration-500 group-hover:w-full"></span>
                </h2>
              </div>
              <ul className="space-y-4 flex flex-col items-start md:items-end">
                {idealCandidates.map((candidate, idx) => (
                  <li key={idx} className="flex items-start md:items-center gap-3">
                    <span className="text-[#D4A84F] text-lg font-bold leading-none shadow-[0_0_8px_rgba(212,168,79,0.5)]">✓</span>
                    <span className="text-white text-base md:text-lg font-medium tracking-wide leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{candidate}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="text-center text-[#D4A84F] my-16 md:my-24 text-lg tracking-[0.2em] font-light opacity-60 select-none">
            ──────── ────────
          </div>

          {/* Section 3 - Benefits */}
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-20">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2 flex flex-col items-start text-left"
            >
              <div className="mb-6 inline-block group cursor-pointer">
                <h2 className="relative inline-block pb-3 text-white font-sans text-3xl md:text-4xl lg:text-5xl font-bold tracking-[2px] uppercase">
                  Benefits
                  <span className="absolute bottom-0 left-0 w-12 h-[2px] bg-[#D4A84F] transition-all duration-500 group-hover:w-full"></span>
                </h2>
              </div>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => {
                  const emojis = ['🏠', '📈', '🌍', '💼', '🚀'];
                  const emoji = emojis[idx] || '✨';
                  return (
                    <li key={idx} className="flex items-start gap-4">
                      <span className="text-2xl leading-none flex-shrink-0">{emoji}</span>
                      <span className="text-white text-base md:text-lg font-medium tracking-wide leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{benefit.text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Include Career Growth as part of Careers Content */}
              {careerGrowth && careerGrowth.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-md">
                  <h4 className="text-[#D4A84F] font-sans font-bold tracking-[2px] uppercase text-sm mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>Career Evolution</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {careerGrowth.map((growth, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#D4A84F]/80 flex-shrink-0" />
                        <span className="text-white text-sm font-medium tracking-wide" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>{growth}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="w-full max-w-[500px] overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img 
                  src={meditationJourneyImg} 
                  alt="Benefits - Spiritual Growth" 
                  className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-500 ease-in-out"
                />
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="text-center text-[#D4A84F] my-16 md:my-24 text-lg tracking-[0.2em] font-light opacity-60 select-none">
            ──────── ────────
          </div>

          {/* Section 4 - Apply Now */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center max-w-2xl mx-auto py-12"
          >
            <div className="mb-6 inline-block group cursor-pointer">
              <h2 className="relative inline-block pb-3 text-white font-sans text-3xl md:text-4xl lg:text-5xl font-bold tracking-[2px] uppercase">
                Start Your Journey
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#D4A84F] transition-all duration-500 group-hover:w-full"></span>
              </h2>
            </div>
            
            <p className="text-white/80 text-lg md:text-xl lg:text-2xl font-light italic mb-10 leading-relaxed" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Join a mission larger than yourself
            </p>

            <motion.button
              onClick={() => setSelected(generalCareer)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="relative px-6 py-4 sm:px-10 sm:py-5 bg-[#D4A84F] hover:bg-[#C58A2B] text-white font-bold tracking-[2px] text-base sm:text-lg uppercase rounded-full shadow-[0_0_20px_rgba(212,168,79,0.3)] hover:shadow-[0_0_35px_rgba(212,168,79,0.8),0_0_50px_rgba(212,168,79,0.4)] transition-all duration-300"
            >
              Apply Now
            </motion.button>
          </motion.div>

        </section>

        {/* CURRENT OPPORTUNITIES SECTION */}
        <section className="relative z-20 w-full max-w-[94%] lg:max-w-6xl mx-auto mb-20 lg:mb-32 flex-1">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-wide mb-4">
              Current Opportunities
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Explore the latest opportunities available within Anubhuthi Foundation.
            </p>
          </div>

          {loading ? (
            <div className="bg-white/5 backdrop-blur-md rounded-[20px] p-8 md:p-12 text-center shadow-lg border border-white/10">
              <LoadingPage />
            </div>
          ) : error ? (
            <div className="bg-white/5 backdrop-blur-md rounded-[20px] p-8 md:p-12 text-center shadow-lg border border-white/10">
              <p className="text-white text-lg font-medium">Unable to load opportunities at the moment.</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-md rounded-[20px] p-8 md:p-12 text-center shadow-lg border border-white/10">
              <p className="text-white text-lg font-medium">No opportunities are currently available. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {careers.map((career) => (
                <div key={career._id} className="bg-[#FAF7F0] rounded-[16px] shadow-lg p-7 flex flex-col h-full hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-xl text-[#1A1A1A] mb-4">{career.title}</h3>
                    <div className="flex flex-col gap-2.5 text-[15px] font-medium text-gray-700 mb-6">
                      {career.department && <span className="flex items-center gap-2.5"><FaBriefcaseSolid className="text-[#C58A2B] text-lg" /> {career.department}</span>}
                      {career.location && (
                        <span className="flex items-center gap-2.5">
                          <FaMapMarkerAlt className="text-[#C58A2B] text-lg" /> {career.location}
                          {career.isRemote && <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Remote</span>}
                        </span>
                      )}
                      {career.type && <span className="flex items-center gap-2.5"><FaClock className="text-[#C58A2B] text-lg" /> {career.type}</span>}
                      {career.salary && <span className="flex items-center gap-2.5"><span className="text-[#C58A2B] text-lg font-bold">₹</span> Salary: {career.salary}</span>}
                      {career.applicationDeadline && (
                        <span className="flex items-center gap-2.5 text-red-600">
                          <span className="text-[#C58A2B] text-lg">📅</span> Deadline: {new Date(career.applicationDeadline).toLocaleDateString(undefined, { dateStyle: 'short' })}
                        </span>
                      )}
                    </div>
                      {career.description && (
                        <p className="text-gray-600 text-[15px] leading-relaxed mb-6 line-clamp-4">
                          {career.description}
                        </p>
                      )}
                      {career.requirements && career.requirements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-bold text-[#1A1A1A] text-sm mb-1">Requirements:</h4>
                          <ul className="list-disc list-inside text-gray-600 text-sm line-clamp-2">
                            {career.requirements.slice(0, 2).map((req, i) => <li key={i}>{req}</li>)}
                          </ul>
                        </div>
                      )}
                      {career.benefits && career.benefits.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-bold text-[#1A1A1A] text-sm mb-1">Benefits:</h4>
                          <ul className="list-disc list-inside text-gray-600 text-sm line-clamp-2">
                            {career.benefits.slice(0, 2).map((ben, i) => <li key={i}>{ben}</li>)}
                          </ul>
                        </div>
                      )}
                  </div>
                  <button
                    onClick={() => setSelected(career)}
                    className="w-full mt-4 bg-transparent border-2 border-[#C58A2B] text-[#C58A2B] hover:bg-[#C58A2B] hover:text-white font-semibold py-3 rounded-xl transition-colors duration-300 text-[15px] uppercase tracking-wide"
                  >
                    View Details & Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* BOTTOM MOTTO STRIP */}
        <div className="relative z-20 bg-[#07284A] py-6 w-full text-center border-t border-[#C58A2B]/10 mt-auto">
          <p className="text-[#C58A2B] font-medium tracking-wide text-[15px] md:text-[17px]">
            One Purpose • One Humanity • One Journey • One Evolution
          </p>
        </div>

      </div>

      <AnimatePresence>
        {selected && <ApplicationModal career={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
